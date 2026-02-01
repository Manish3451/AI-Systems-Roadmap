import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ExternalLink, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Trophy
} from 'lucide-react';
import type { ChecklistItem, Resource } from '@/types';
import { useProgressStore } from '@/store/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  resources: Resource[];
  moduleId: string;
}

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: ChecklistItem | null;
}

function ValidationModal({ isOpen, onClose, onConfirm, item }: ValidationModalProps) {
  if (!item) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Checkpoint Validation
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Before marking this checkpoint as complete, confirm you have met the requirements.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-200 font-medium">{item.text}</p>
            {item.timeEstimate && item.timeEstimate > 0 && (
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>Estimated time: {item.timeEstimate} minutes</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-start gap-2 text-sm text-amber-400">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Be honest with yourself. This roadmap is designed for your growth. 
              Skipping validations will only hurt your learning.
            </p>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Not Yet
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-medium"
          >
            <Check className="w-4 h-4 mr-2" />
            I Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ChecklistItemComponent({ 
  item, 
  resources, 
  onToggle 
}: { 
  item: ChecklistItem; 
  resources: Resource[];
  onToggle: (item: ChecklistItem) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const linkedResources = resources.filter(r => item.resourceLinks.includes(r.id));
  const isCheckpoint = item.isCheckpoint;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        group relative p-4 rounded-xl border transition-all duration-300
        ${item.isCompleted 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
        }
        ${isCheckpoint ? 'border-l-4 border-l-amber-500' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(item)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center
            transition-all duration-200 mt-0.5
            ${item.isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-slate-600 hover:border-emerald-500/50 bg-slate-800/50'
            }
          `}
        >
          {item.isCompleted && <Check className="w-4 h-4 text-slate-950" />}
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm ${item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
              {item.text}
            </p>
            
            {linkedResources.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex-shrink-0 p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          
          {/* Meta info */}
          <div className="flex items-center gap-3 mt-2">
            {isCheckpoint && (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full font-medium">
                Checkpoint
              </span>
            )}
            {item.timeEstimate && item.timeEstimate > 0 && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {item.timeEstimate} min
              </span>
            )}
            <span className="text-xs text-slate-600">{item.category}</span>
          </div>
          
          {/* Linked resources */}
          <AnimatePresence>
            {isExpanded && linkedResources.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                  <p className="text-xs text-slate-500 mb-2">Related Resources:</p>
                  {linkedResources.map(resource => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group/link"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover/link:text-emerald-400 transition-colors" />
                      <span className="text-sm text-slate-400 group-hover/link:text-slate-200 transition-colors flex-1 truncate">
                        {resource.title}
                      </span>
                      <span className="text-xs text-slate-600">
                        {resource.estimatedMinutes}m
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function ChecklistSection({ items, resources, moduleId }: ChecklistSectionProps) {
  const toggleChecklistItem = useProgressStore(state => state.toggleChecklistItem);
  const [validationItem, setValidationItem] = useState<ChecklistItem | null>(null);
  const [pendingToggle, setPendingToggle] = useState<string | null>(null);
  
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);
  
  const handleToggle = (item: ChecklistItem) => {
    if (item.isCheckpoint && !item.isCompleted) {
      setValidationItem(item);
      setPendingToggle(item.id);
    } else {
      toggleChecklistItem(moduleId, item.id);
    }
  };
  
  const handleValidationConfirm = () => {
    if (pendingToggle) {
      toggleChecklistItem(moduleId, pendingToggle);
      setValidationItem(null);
      setPendingToggle(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <ValidationModal
        isOpen={!!validationItem}
        onClose={() => {
          setValidationItem(null);
          setPendingToggle(null);
        }}
        onConfirm={handleValidationConfirm}
        item={validationItem}
      />
      
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {category}
          </h3>
          <div className="space-y-2">
            {categoryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ChecklistItemComponent
                  item={item}
                  resources={resources}
                  onToggle={handleToggle}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>No checklist items available for this module.</p>
        </div>
      )}
    </div>
  );
}
