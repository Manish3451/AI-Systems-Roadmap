import { motion } from 'framer-motion';
import { 
  Lock, 
  CheckCircle2, 
  Play, 
  Circle, 
  Clock, 
  Target,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import type { Module } from '@/types';
import { Button } from '@/components/ui/button';

interface ModuleHeaderProps {
  module: Module;
  onStart?: () => void;
}

const getStatusConfig = (module: Module) => {
  if (module.isLocked) {
    return {
      icon: <Lock className="w-6 h-6" />,
      label: 'Locked',
      color: 'text-slate-500',
      bgColor: 'bg-slate-800',
      borderColor: 'border-slate-700',
      progressColor: 'bg-slate-700',
    };
  }
  if (module.isCompleted) {
    return {
      icon: <CheckCircle2 className="w-6 h-6" />,
      label: 'Completed',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50',
      progressColor: 'bg-emerald-500',
    };
  }
  if (module.status === 'in-progress') {
    return {
      icon: <Play className="w-6 h-6" />,
      label: 'In Progress',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50',
      progressColor: 'bg-amber-500',
    };
  }
  return {
    icon: <Circle className="w-6 h-6" />,
    label: 'Available',
    color: 'text-slate-300',
    bgColor: 'bg-slate-800',
    borderColor: 'border-slate-600',
    progressColor: 'bg-slate-600',
  };
};

const getModuleColor = (color: string) => {
  const colors: Record<string, string> = {
    slate: 'from-slate-500/20 to-slate-600/10',
    emerald: 'from-emerald-500/20 to-emerald-600/10',
    blue: 'from-blue-500/20 to-blue-600/10',
    yellow: 'from-yellow-500/20 to-yellow-600/10',
    violet: 'from-violet-500/20 to-violet-600/10',
    orange: 'from-orange-500/20 to-orange-600/10',
  };
  return colors[color] || colors.slate;
};

export function ModuleHeader({ module, onStart }: ModuleHeaderProps) {
  const status = getStatusConfig(module);
  const gradientColor = getModuleColor(module.color);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative overflow-hidden rounded-2xl border-2 p-6 md:p-8
        ${status.borderColor}
        bg-gradient-to-br ${gradientColor}
      `}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left: Title and description */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`
                p-2 rounded-lg ${status.bgColor} ${status.color}
              `}>
                {status.icon}
              </div>
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${status.bgColor} ${status.color}
              `}>
                {status.label}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
              {module.title}
            </h1>
            <p className="text-slate-400 max-w-2xl">
              {module.description}
            </p>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{module.estimatedDays} days estimated</span>
              </div>
              {module.targetProblems && (
                <div className="flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>{module.targetProblems} problems</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{module.checklist.filter(i => i.isCompleted).length} of {module.checklist.length} completed</span>
              </div>
            </div>
            
            {/* Prerequisites */}
            {module.prerequisites.length > 0 && (
              <div className="flex items-center gap-2 mt-4 text-sm">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                <span className="text-slate-500">Prerequisites:</span>
                <div className="flex gap-2">
                  {module.prerequisites.map(prereq => (
                    <span 
                      key={prereq}
                      className="px-2 py-0.5 bg-slate-800 rounded text-slate-400 text-xs"
                    >
                      {prereq.replace('module-', 'Module ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right: Progress ring and action */}
          <div className="flex flex-col items-center gap-4">
            {/* Circular progress */}
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-800"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 40 * (1 - module.completionPercentage / 100) 
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  strokeDasharray={2 * Math.PI * 40}
                  className={status.progressColor}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-100">
                  {module.completionPercentage}%
                </span>
              </div>
            </div>
            
            {/* Action button */}
            {!module.isLocked && !module.isCompleted && (
              <Button
                onClick={onStart}
                className={`
                  ${module.status === 'in-progress' 
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-emerald-500 hover:bg-emerald-600'
                  } text-slate-950 font-medium
                `}
              >
                {module.status === 'in-progress' ? 'Continue' : 'Start Module'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            
            {module.isCompleted && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
                Completed
              </div>
            )}
          </div>
        </div>
        
        {/* Linear progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${module.completionPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${status.progressColor}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
