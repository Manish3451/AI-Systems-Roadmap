import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check,
  Volume2,
  Image as ImageIcon,
  Mic
} from 'lucide-react';
import type { ImplementationTask } from '@/types';
import { toast } from 'sonner';

interface TaskCardProps {
  task: ImplementationTask;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

const categoryConfig = {
  vision: { color: 'bg-violet-500/10 text-violet-400', icon: ImageIcon, label: 'Vision' },
  audio: { color: 'bg-amber-500/10 text-amber-400', icon: Volume2, label: 'Audio' },
  voice: { color: 'bg-rose-500/10 text-rose-400', icon: Mic, label: 'Voice' },
  integration: { color: 'bg-emerald-500/10 text-emerald-400', icon: Code2, label: 'Integration' },
};

export function TaskCard({ task, isCompleted = false, onToggleComplete }: TaskCardProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const CategoryIcon = categoryConfig[task.category].icon;

  const handleCopyCode = async () => {
    if (!task.codeTemplate) return;
    await navigator.clipboard.writeText(task.codeTemplate);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-xl border overflow-hidden transition-all
        ${isCompleted 
          ? 'bg-emerald-500/5 border-emerald-500/20' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
        }
      `}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Completion Toggle */}
          <button
            onClick={onToggleComplete}
            className={`
              shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5
              ${isCompleted 
                ? 'bg-emerald-500 border-emerald-500' 
                : 'border-slate-600 hover:border-emerald-500'
              }
            `}
          >
            {isCompleted && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
          </button>

          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${categoryConfig[task.category].color}`}>
                <CategoryIcon className="w-3 h-3" />
                {categoryConfig[task.category].label}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {task.estimatedHours}h
              </span>
            </div>

            {/* Title */}
            <h4 className={`font-medium mb-2 ${isCompleted ? 'text-emerald-400' : 'text-slate-200'}`}>
              {task.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-slate-400 mb-3">
              {task.description}
            </p>

            {/* Code Template Toggle */}
            {task.codeTemplate && (
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mb-3"
              >
                <Code2 className="w-3 h-3" />
                {showCode ? 'Hide Code' : 'View Code Template'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Code Section */}
      {showCode && task.codeTemplate && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-slate-800"
        >
          <div className="relative">
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto bg-slate-950">
              <code className="text-sm text-slate-300 font-mono whitespace-pre">
                {task.codeTemplate}
              </code>
            </pre>
          </div>
        </motion.div>
      )}

      {/* Validation Steps */}
      <div className="px-4 pb-4">
        <div className="pt-3 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Validation Criteria:
          </p>
          <ul className="space-y-1.5">
            {task.validationSteps.map((step, index) => (
              <li 
                key={index}
                className="text-xs text-slate-400 flex items-start gap-2"
              >
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
