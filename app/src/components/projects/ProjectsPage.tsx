import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Sparkles, BookOpen } from 'lucide-react';
import { useProgressStore } from '@/store/progress';
import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '@/types';

export function ProjectsPage() {
  const { projects } = useProgressStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Sort: in-progress first, then by difficulty (Expert before Advanced)
  const sortedProjects = [...projects].sort((a, b) => {
    const statusOrder = { 'in-progress': 0, 'available': 1, 'completed': 2, 'locked': 3 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    // Same status - sort by difficulty (Expert first)
    const difficultyOrder = { 'Expert': 0, 'Advanced': 1 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
  
  const inProgressCount = projects.filter(p => p.status === 'in-progress').length;
  const completedCount = projects.filter(p => p.status === 'completed').length;
  
  if (selectedProject) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)} 
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-3">
          <FolderGit2 className="w-8 h-8 text-emerald-400" />
          Projects Lab
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Industry-grade projects that bridge theory and practice. Explore all projects freely, 
          track your progress optionally, and build a portfolio that stands out.
        </p>
      </div>
      
      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">{projects.length}</div>
          <div className="text-sm text-slate-500">Total Projects</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-amber-400">{inProgressCount}</div>
          <div className="text-sm text-slate-500">In Progress</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-emerald-400">{completedCount}</div>
          <div className="text-sm text-slate-500">Completed</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-blue-400">{projects.filter(p => p.difficulty === 'Expert').length}</div>
          <div className="text-sm text-slate-500">Expert Level</div>
        </div>
      </div>
      
      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-violet-300 mb-1">How Projects Work</h3>
          <p className="text-sm text-violet-400/80">
            All projects are fully viewable without prerequisites. Browse any project to see phases, 
            steps, videos, and code. Check off steps as you complete them in real life - progress 
            tracking is optional but helps you stay organized.
          </p>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">All Projects</h2>
          <span className="text-sm text-slate-500 flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            Browse freely, track optionally
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
