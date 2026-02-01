import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Module, Resource, ProgressState, DailyActivity, Project, AudioMetrics } from '@/types';
import { modules as initialModules } from '@/data/roadmap';
import { projects as initialProjects, calculateProjectProgress, checkProjectPrerequisites, isPhaseUnlocked } from '@/data/projects';

interface ProjectState {
  completedSteps: string[];
  activeProject: string | null;
  projects: Project[];
  toggleStepComplete: (stepId: string) => void;
  setActiveProject: (projectId: string | null) => void;
  calculateProjectProgress: (projectId: string) => number;
  isProjectAvailable: (projectId: string) => boolean;
  isPhaseUnlocked: (projectId: string, phaseIndex: number) => boolean;
  updateProjectStatuses: () => void;
}

interface MultimodalState {
  watchedVideos: string[];
  audioMetrics: AudioMetrics;
  markVideoWatched: (videoId: string) => void;
  updateAudioMetrics: (metrics: Partial<AudioMetrics>) => void;
  isVideoWatched: (videoId: string) => boolean;
}

interface ProgressStore extends ProgressState, ProjectState, MultimodalState {
  // Actions
  toggleChecklistItem: (moduleId: string, itemId: string) => void;
  toggleResourceComplete: (moduleId: string, resourceId: string) => void;
  toggleResourceFavorite: (moduleId: string, resourceId: string) => void;
  markModuleCompleted: (moduleId: string, completed: boolean) => void;
  updateModuleProgress: (moduleId: string) => void;
  unlockModule: (moduleId: string) => void;
  setStrictMode: (enabled: boolean) => void;
  addTimeInvested: (minutes: number) => void;
  resetProgress: () => void;
  importProgress: (state: ProgressState & { completedSteps?: string[]; projects?: Project[] }) => void;
  exportProgress: () => string;
  
  // Getters
  getCompletedCount: () => number;
  getTotalCount: () => number;
  getModuleProgress: (moduleId: string) => number;
  getSkillDistribution: () => Record<string, number>;
  getDailyActivity: (days?: number) => DailyActivity[];
  getCurrentStreak: () => number;
  getNextMilestone: () => { moduleId: string; title: string; remaining: number } | null;
  getAllResources: () => Resource[];
  getResourcesByType: (type: Resource['type']) => Resource[];
  getFavoriteResources: () => Resource[];
  getProblemStats: () => { total: number; solved: number; byDifficulty: Record<string, number> };
  getCompletedModules: () => string[];
}

const calculateStreak = (dailyActivity: Record<string, number>, lastActiveDate: string | null): number => {
  if (!lastActiveDate) return 0;
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (lastActiveDate !== today && lastActiveDate !== yesterday) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (dailyActivity[dateStr] && dailyActivity[dateStr] > 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

const checkPrerequisites = (module: Module, allModules: Module[]): boolean => {
  if (module.prerequisites.length === 0) return true;
  return module.prerequisites.every(prereqId => {
    const prereq = allModules.find(m => m.id === prereqId);
    return prereq?.isCompleted || false;
  });
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      // Roadmap state
      modules: initialModules,
      dailyActivity: {},
      currentStreak: 0,
      lastActiveDate: null,
      strictMode: false,
      totalTimeInvested: 0,
      
      // Project state
      completedSteps: [],
      activeProject: null,
      projects: initialProjects,
      
      // Multimodal state
      watchedVideos: [],
      audioMetrics: {
        project4WER: 0,
        project4Latency: 0,
        project4MOS: 0,
      },

      toggleChecklistItem: (moduleId: string, itemId: string) => {
        set((state: ProgressStore) => {
          const today = new Date().toISOString().split('T')[0];
          const newModules = state.modules.map((module: Module) => {
            if (module.id !== moduleId) return module;
            
            const newChecklist = module.checklist.map(item => {
              if (item.id !== itemId) return item;
              return { ...item, isCompleted: !item.isCompleted };
            });
            
            const completedCount = newChecklist.filter(i => i.isCompleted).length;
            const progress = Math.round((completedCount / newChecklist.length) * 100);
            const isCompleted = progress === 100;
            
            let status: Module['status'] = module.status;
            if (isCompleted) {
              status = 'completed';
            } else if (progress > 0) {
              status = 'in-progress';
            }
            
            return {
              ...module,
              checklist: newChecklist,
              completionPercentage: progress,
              isCompleted,
              status,
            };
          }) as Module[];
          
          const newDailyActivity = { ...state.dailyActivity };
          newDailyActivity[today] = (newDailyActivity[today] || 0) + 1;
          
          const updatedModules = newModules.map((module: Module) => {
            if (module.isLocked && checkPrerequisites(module, newModules)) {
              return { ...module, isLocked: false, status: 'available' as const };
            }
            return module;
          }) as Module[];
          
          // Update project statuses based on completed modules
          const completedModules = updatedModules.filter(m => m.isCompleted).map(m => m.id);
          const updatedProjects = state.projects.map((project: Project) => {
            const isAvailable = checkProjectPrerequisites(project, completedModules);
            const progress = calculateProjectProgress(project, state.completedSteps);
            let status: Project['status'] = project.status;
            if (progress === 100) {
              status = 'completed';
            } else if (progress > 0) {
              status = 'in-progress';
            } else if (isAvailable) {
              status = 'available';
            }
            return { ...project, status, completionPercentage: progress };
          }) as Project[];
          
          return {
            modules: updatedModules,
            dailyActivity: newDailyActivity,
            lastActiveDate: today,
            currentStreak: calculateStreak(newDailyActivity, today),
            projects: updatedProjects,
          };
        });
      },

      toggleResourceComplete: (moduleId: string, resourceId: string) => {
        set((state: ProgressStore) => {
          const newModules = state.modules.map((module: Module) => {
            if (module.id !== moduleId) return module;
            
            const newResources = module.resources.map(resource => {
              if (resource.id !== resourceId) return resource;
              return { ...resource, isCompleted: !resource.isCompleted };
            });
            
            return { ...module, resources: newResources };
          }) as Module[];
          
          return { modules: newModules };
        });
      },

      toggleResourceFavorite: (moduleId: string, resourceId: string) => {
        set((state: ProgressStore) => {
          const newModules = state.modules.map((module: Module) => {
            if (module.id !== moduleId) return module;
            
            const newResources = module.resources.map(resource => {
              if (resource.id !== resourceId) return resource;
              return { ...resource, isFavorite: !resource.isFavorite };
            });
            
            return { ...module, resources: newResources };
          }) as Module[];
          
          return { modules: newModules };
        });
      },

      markModuleCompleted: (moduleId: string, completed: boolean) => {
        set((state: ProgressStore) => {
          const newModules = state.modules.map((module: Module) => {
            if (module.id !== moduleId) return module;
            
            const newChecklist = module.checklist.map(item => ({
              ...item,
              isCompleted: completed,
            }));
            
            return {
              ...module,
              checklist: newChecklist,
              isCompleted: completed,
              completionPercentage: completed ? 100 : 0,
              status: (completed ? 'completed' : 'available') as Module['status'],
            };
          }) as Module[];
          
          const updatedModules = newModules.map((module: Module) => {
            if (module.isLocked && checkPrerequisites(module, newModules)) {
              return { ...module, isLocked: false, status: 'available' as const };
            }
            return module;
          }) as Module[];
          
          return { modules: updatedModules };
        });
      },

      updateModuleProgress: (moduleId: string) => {
        set((state: ProgressStore) => {
          const newModules = state.modules.map((module: Module) => {
            if (module.id !== moduleId) return module;
            
            const completedCount = module.checklist.filter(i => i.isCompleted).length;
            const progress = Math.round((completedCount / module.checklist.length) * 100);
            
            let status: Module['status'] = module.status;
            if (progress === 100) {
              status = 'completed';
            } else if (progress > 0) {
              status = 'in-progress';
            }
            
            return {
              ...module,
              completionPercentage: progress,
              isCompleted: progress === 100,
              status,
            };
          }) as Module[];
          
          return { modules: newModules };
        });
      },

      unlockModule: (moduleId: string) => {
        set((state: ProgressStore) => ({
          modules: state.modules.map((module: Module) =>
            module.id === moduleId
              ? { ...module, isLocked: false, status: 'available' as const }
              : module
          ) as Module[],
        }));
      },

      setStrictMode: (enabled: boolean) => {
        set({ strictMode: enabled });
      },

      addTimeInvested: (minutes: number) => {
        set((state: ProgressStore) => ({
          totalTimeInvested: state.totalTimeInvested + minutes,
        }));
      },

      resetProgress: () => {
        set({
          modules: initialModules,
          dailyActivity: {},
          currentStreak: 0,
          lastActiveDate: null,
          totalTimeInvested: 0,
          completedSteps: [],
          activeProject: null,
          projects: initialProjects,
          watchedVideos: [],
          audioMetrics: {
            project4WER: 0,
            project4Latency: 0,
            project4MOS: 0,
          },
        });
      },

      importProgress: (importedState: ProgressState & { completedSteps?: string[]; projects?: Project[]; watchedVideos?: string[]; audioMetrics?: AudioMetrics }) => {
        set({
          modules: importedState.modules,
          dailyActivity: importedState.dailyActivity,
          currentStreak: importedState.currentStreak,
          lastActiveDate: importedState.lastActiveDate,
          strictMode: importedState.strictMode,
          totalTimeInvested: importedState.totalTimeInvested,
          completedSteps: importedState.completedSteps || [],
          projects: importedState.projects || initialProjects,
          watchedVideos: importedState.watchedVideos || [],
          audioMetrics: importedState.audioMetrics || {
            project4WER: 0,
            project4Latency: 0,
            project4MOS: 0,
          },
        });
      },

      exportProgress: () => {
        const state = get();
        return JSON.stringify({
          modules: state.modules,
          dailyActivity: state.dailyActivity,
          currentStreak: state.currentStreak,
          lastActiveDate: state.lastActiveDate,
          strictMode: state.strictMode,
          totalTimeInvested: state.totalTimeInvested,
          completedSteps: state.completedSteps,
          projects: state.projects,
          watchedVideos: state.watchedVideos,
          audioMetrics: state.audioMetrics,
        }, null, 2);
      },

      getCompletedCount: () => {
        return get().modules.reduce(
          (acc, module) => acc + module.checklist.filter(i => i.isCompleted).length,
          0
        );
      },

      getTotalCount: () => {
        return get().modules.reduce((acc, module) => acc + module.checklist.length, 0);
      },

      getModuleProgress: (moduleId: string) => {
        const module = get().modules.find(m => m.id === moduleId);
        if (!module) return 0;
        const completed = module.checklist.filter(i => i.isCompleted).length;
        return Math.round((completed / module.checklist.length) * 100);
      },

      getSkillDistribution: () => {
        const state = get();
        const distribution: Record<string, number> = {
          DSA: 0,
          LLD: 0,
          Python: 0,
          'AI Systems': 0,
          MLOps: 0,
          Architecture: 0,
        };
        
        state.modules.forEach(module => {
          const completed = module.checklist.filter(i => i.isCompleted).length;
          const total = module.checklist.length;
          const percentage = total > 0 ? (completed / total) * 100 : 0;
          
          switch (module.id) {
            case 'module-0':
              distribution.Architecture = Math.round(percentage);
              break;
            case 'module-1':
              distribution.DSA = Math.round(percentage);
              break;
            case 'module-2':
              distribution.LLD = Math.round(percentage);
              break;
            case 'module-3':
              distribution.Python = Math.round(percentage);
              break;
            case 'module-4':
              distribution['AI Systems'] = Math.round(percentage);
              break;
            case 'module-5':
              distribution.MLOps = Math.round(percentage);
              break;
          }
        });
        
        return distribution;
      },

      getDailyActivity: (days = 30) => {
        const state = get();
        const result: DailyActivity[] = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          result.push({
            date: dateStr,
            itemsCompleted: state.dailyActivity[dateStr] || 0,
          });
        }
        
        return result;
      },

      getCurrentStreak: () => {
        return get().currentStreak;
      },

      getNextMilestone: () => {
        const state = get();
        
        for (const module of state.modules) {
          if (!module.isCompleted) {
            const remaining = module.checklist.filter(i => !i.isCompleted).length;
            return {
              moduleId: module.id,
              title: module.shortTitle,
              remaining,
            };
          }
        }
        
        return null;
      },

      getAllResources: () => {
        return get().modules.flatMap(module => module.resources);
      },

      getResourcesByType: (type: Resource['type']) => {
        return get().modules.flatMap(module => 
          module.resources.filter(r => r.type === type)
        );
      },

      getFavoriteResources: () => {
        return get().modules.flatMap(module => 
          module.resources.filter(r => r.isFavorite)
        );
      },

      getProblemStats: () => {
        const resources = get().modules.find(m => m.id === 'module-1')?.resources || [];
        const problems = resources.filter(r => r.type === 'leetcode');
        
        const byDifficulty: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
        let solved = 0;
        
        problems.forEach(p => {
          if (p.difficulty) {
            byDifficulty[p.difficulty] = (byDifficulty[p.difficulty] || 0) + 1;
          }
          if (p.isCompleted) solved++;
        });
        
        return {
          total: problems.length,
          solved,
          byDifficulty,
        };
      },

      getCompletedModules: () => {
        return get().modules.filter(m => m.isCompleted).map(m => m.id);
      },

      // Project methods
      toggleStepComplete: (stepId: string) => {
        set((state: ProgressStore) => {
          const isComplete = state.completedSteps.includes(stepId);
          const newCompletedSteps = isComplete 
            ? state.completedSteps.filter(id => id !== stepId)
            : [...state.completedSteps, stepId];
          
          // Update project progress
          const updatedProjects = state.projects.map((project: Project) => {
            const progress = calculateProjectProgress(project, newCompletedSteps);
            let status: Project['status'] = project.status;
            if (progress === 100) {
              status = 'completed';
            } else if (progress > 0) {
              status = 'in-progress';
            }
            return { ...project, completionPercentage: progress, status };
          }) as Project[];
          
          return { 
            completedSteps: newCompletedSteps,
            projects: updatedProjects,
          };
        });
      },

      setActiveProject: (projectId: string | null) => {
        set({ activeProject: projectId });
      },

      calculateProjectProgress: (projectId: string) => {
        const state = get();
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return 0;
        return calculateProjectProgress(project, state.completedSteps);
      },

      isProjectAvailable: (projectId: string) => {
        const state = get();
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return false;
        const completedModules = state.modules.filter(m => m.isCompleted).map(m => m.id);
        return checkProjectPrerequisites(project, completedModules);
      },

      isPhaseUnlocked: (projectId: string, phaseIndex: number) => {
        const state = get();
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return false;
        return isPhaseUnlocked(project, phaseIndex, state.completedSteps);
      },

      updateProjectStatuses: () => {
        set((state: ProgressStore) => {
          const completedModules = state.modules.filter(m => m.isCompleted).map(m => m.id);
          const updatedProjects = state.projects.map((project: Project) => {
            const isAvailable = checkProjectPrerequisites(project, completedModules);
            const progress = calculateProjectProgress(project, state.completedSteps);
            let status: Project['status'] = project.status;
            if (progress === 100) {
              status = 'completed';
            } else if (progress > 0) {
              status = 'in-progress';
            } else if (isAvailable) {
              status = 'available';
            } else {
              status = 'locked';
            }
            return { ...project, status, completionPercentage: progress };
          }) as Project[];
          
          return { projects: updatedProjects };
        });
      },

      // Multimodal methods
      markVideoWatched: (videoId: string) => {
        set((state: ProgressStore) => {
          const isWatched = state.watchedVideos.includes(videoId);
          if (isWatched) {
            return {
              watchedVideos: state.watchedVideos.filter(id => id !== videoId)
            };
          }
          return {
            watchedVideos: [...state.watchedVideos, videoId]
          };
        });
      },

      updateAudioMetrics: (metrics: Partial<AudioMetrics>) => {
        set((state: ProgressStore) => ({
          audioMetrics: {
            ...state.audioMetrics,
            ...metrics
          }
        }));
      },

      isVideoWatched: (videoId: string) => {
        return get().watchedVideos.includes(videoId);
      },
    }),
    {
      name: 'ai-roadmap-progress',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export default useProgressStore;
