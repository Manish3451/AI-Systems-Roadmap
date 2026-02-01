import { motion } from 'framer-motion';
import { Play, CheckCircle, Clock, Layers, ChevronRight, Code2, Sparkles, BookOpen } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const difficultyColors = {
  'Advanced': 'from-amber-500 to-orange-500',
  'Expert': 'from-red-500 to-rose-500',
};

const statusIcons = {
  'locked': BookOpen,
  'available': Play,
  'in-progress': Play,
  'completed': CheckCircle,
};

const statusColors = {
  'locked': 'text-slate-500 bg-slate-800/50',
  'available': 'text-emerald-400 bg-emerald-500/10',
  'in-progress': 'text-amber-400 bg-amber-500/10',
  'completed': 'text-emerald-400 bg-emerald-500/10',
};

const statusLabels = {
  'locked': 'Not Started',
  'available': 'Start Project',
  'in-progress': 'Continue',
  'completed': 'Completed',
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const StatusIcon = statusIcons[project.status];
  
  // Calculate total hours
  const totalHours = project.phases.reduce(
    (acc, phase) => acc + phase.steps.reduce((s, step) => s + (step.estimatedHours || 0), 0),
    0
  );
  
  // Calculate total steps
  const totalSteps = project.phases.reduce((acc, phase) => acc + phase.steps.length, 0);
  
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="
        relative overflow-hidden rounded-2xl border transition-all duration-300
        bg-slate-900/60 border-slate-700/50 cursor-pointer 
        hover:border-slate-600 hover:shadow-xl hover:shadow-emerald-500/5
      "
    >
      {/* Gradient accent */}
      <div className={`
        absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${difficultyColors[project.difficulty]}
      `} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`
                text-xs font-medium px-2.5 py-0.5 rounded-full
                ${project.difficulty === 'Expert' 
                  ? 'bg-red-500/10 text-red-400' 
                  : 'bg-amber-500/10 text-amber-400'
                }
              `}>
                {project.difficulty}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                {project.industryStandard}
              </span>
              {/* Recommended badge for prerequisites */}
              {project.prerequisites.length > 0 && project.status === 'locked' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Recommended: {project.prerequisites.length} modules
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2">
              {project.tagline}
            </p>
          </div>
          
          {/* Status indicator */}
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${statusColors[project.status]}
          `}>
            <StatusIcon className="w-5 h-5" />
          </div>
        </div>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
        
        {/* Stats & Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {totalHours}h
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              {totalSteps} steps
            </span>
          </div>
          
          {/* Progress bar or CTA */}
          {project.status === 'completed' ? (
            <span className="text-sm text-emerald-400 font-medium flex items-center gap-1">
              Completed
              <CheckCircle className="w-4 h-4" />
            </span>
          ) : project.status === 'in-progress' ? (
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.completionPercentage}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full"
                />
              </div>
              <span className="text-sm text-emerald-400 font-medium">
                {project.completionPercentage}%
              </span>
            </div>
          ) : (
            <span className="text-sm text-emerald-400 font-medium flex items-center gap-1 group">
              {statusLabels[project.status]}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
        
        {/* Prerequisites info (non-blocking) */}
        {project.prerequisites.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/50">
            <p className="text-xs text-slate-500">
              <span className="text-blue-400">Recommended background:</span>{' '}
              {project.prerequisites.map(p => {
                const moduleMap: Record<string, string> = {
                  'module-0': 'Architecture',
                  'module-1': 'DSA',
                  'module-2': 'LLD',
                  'module-3': 'Python',
                  'module-4': 'AI Systems',
                  'module-5': 'MLOps',
                  'module-4.6': 'Multimodal Foundations',
                  'module-4.7': 'Speech & Voice',
                  'module-4.8': 'Multimodal Agents'
                };
                return moduleMap[p] || p;
              }).join(', ')}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
