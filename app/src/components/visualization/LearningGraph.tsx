import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Play, Circle } from 'lucide-react';
import { useProgressStore } from '@/store/progress';
import type { ModuleStatus } from '@/types';

interface LearningGraphProps {
  onNodeClick?: (moduleId: string) => void;
  height?: string;
}

interface CustomNodeData {
  label: string;
  moduleId: string;
  status: ModuleStatus;
  isLocked: boolean;
  progress: number;
  description: string;
  estimatedDays: number;
  color: string;
  [key: string]: unknown;
}

const getStatusIcon = (status: ModuleStatus, isLocked: boolean) => {
  if (isLocked) return <Lock className="w-4 h-4 text-slate-500" />;
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    case 'in-progress':
      return <Play className="w-4 h-4 text-amber-400" />;
    default:
      return <Circle className="w-4 h-4 text-slate-400" />;
  }
};

const getNodeColor = (status: ModuleStatus, isLocked: boolean, color: string) => {
  if (isLocked) return 'bg-slate-800 border-slate-700';
  switch (status) {
    case 'completed':
      return `bg-${color}-500/20 border-${color}-500 glow-${color}`;
    case 'in-progress':
      return 'bg-amber-500/20 border-amber-500 glow-amber';
    default:
      return `bg-${color}-500/10 border-${color}-500/50`;
  }
};

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  const icon = getStatusIcon(data.status, data.isLocked);
  const nodeClass = getNodeColor(data.status, data.isLocked, data.color);
  
  return (
    <div className={`relative group`}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-48 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
          ${nodeClass}
          ${data.status === 'in-progress' ? 'animate-pulse-slow' : ''}
        `}
      >
        {/* Progress ring */}
        <div className="absolute -top-2 -right-2">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-800"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 16}`}
              strokeDashoffset={`${2 * Math.PI * 16 * (1 - data.progress / 100)}`}
              className={`
                ${data.status === 'completed' ? 'text-emerald-400' : ''}
                ${data.status === 'in-progress' ? 'text-amber-400' : ''}
                ${data.status === 'available' ? 'text-slate-600' : ''}
                ${data.isLocked ? 'text-slate-700' : ''}
                transition-all duration-500
              `}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="pr-8">
          <h3 className="font-semibold text-sm text-slate-100 mb-1">{data.label}</h3>
          <p className="text-xs text-slate-400 line-clamp-2 mb-2">{data.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full ${
              data.status === 'completed' ? 'bg-emerald-500/30 text-emerald-300' :
              data.status === 'in-progress' ? 'bg-amber-500/30 text-amber-300' :
              data.isLocked ? 'bg-slate-700 text-slate-400' :
              'bg-slate-700 text-slate-300'
            }`}>
              {data.isLocked ? 'Locked' : data.status === 'completed' ? 'Done' : data.status === 'in-progress' ? 'Active' : 'Available'}
            </span>
            <span className="text-slate-500">{data.estimatedDays}d</span>
          </div>
        </div>
        
        {/* Progress bar */}
        {data.progress > 0 && (
          <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                data.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </div>
        )}
      </motion.div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export function LearningGraph({ onNodeClick, height = '600px' }: LearningGraphProps) {
  const modules = useProgressStore(state => state.modules);
  
  const initialNodes: Node<CustomNodeData>[] = useMemo(() => [
    // Module 0 - Center top
    {
      id: 'module-0',
      type: 'custom',
      position: { x: 400, y: 0 },
      data: {
        label: 'Module 0',
        moduleId: 'module-0',
        status: modules[0]?.status || 'available',
        isLocked: modules[0]?.isLocked || false,
        progress: modules[0]?.completionPercentage || 0,
        description: 'Universal Problem-Solving Mindset',
        estimatedDays: modules[0]?.estimatedDays || 1,
        color: 'slate',
      },
    },
    // Module 1 - DSA (left branch)
    {
      id: 'module-1',
      type: 'custom',
      position: { x: 100, y: 200 },
      data: {
        label: 'Module 1',
        moduleId: 'module-1',
        status: modules[1]?.status || 'locked',
        isLocked: modules[1]?.isLocked || true,
        progress: modules[1]?.completionPercentage || 0,
        description: 'Pattern-Based DSA Mastery',
        estimatedDays: modules[1]?.estimatedDays || 45,
        color: 'emerald',
      },
    },
    // Module 2 - LLD (center branch)
    {
      id: 'module-2',
      type: 'custom',
      position: { x: 400, y: 200 },
      data: {
        label: 'Module 2',
        moduleId: 'module-2',
        status: modules[2]?.status || 'locked',
        isLocked: modules[2]?.isLocked || true,
        progress: modules[2]?.completionPercentage || 0,
        description: 'Low Level Design Mastery',
        estimatedDays: modules[2]?.estimatedDays || 30,
        color: 'blue',
      },
    },
    // Module 3 - Python (right branch)
    {
      id: 'module-3',
      type: 'custom',
      position: { x: 700, y: 200 },
      data: {
        label: 'Module 3',
        moduleId: 'module-3',
        status: modules[3]?.status || 'locked',
        isLocked: modules[3]?.isLocked || true,
        progress: modules[3]?.completionPercentage || 0,
        description: 'Python Advanced & Async',
        estimatedDays: modules[3]?.estimatedDays || 6,
        color: 'yellow',
      },
    },
    // Module 4 - AI Systems (requires 1 & 3)
    {
      id: 'module-4',
      type: 'custom',
      position: { x: 400, y: 400 },
      data: {
        label: 'Module 4',
        moduleId: 'module-4',
        status: modules[4]?.status || 'locked',
        isLocked: modules[4]?.isLocked || true,
        progress: modules[4]?.completionPercentage || 0,
        description: 'AI Systems Fundamentals',
        estimatedDays: modules[4]?.estimatedDays || 17,
        color: 'violet',
      },
    },
    // Module 5 - MLOps (requires 3 & 4)
    {
      id: 'module-5',
      type: 'custom',
      position: { x: 400, y: 550 },
      data: {
        label: 'Module 5',
        moduleId: 'module-5',
        status: modules[5]?.status || 'locked',
        isLocked: modules[5]?.isLocked || true,
        progress: modules[5]?.completionPercentage || 0,
        description: 'Production Engineering & MLOps',
        estimatedDays: modules[5]?.estimatedDays || 9,
        color: 'orange',
      },
    },
  ], [modules]);
  
  const initialEdges: Edge[] = useMemo(() => [
    // Module 0 to all parallel modules
    { 
      id: 'e0-1', 
      source: 'module-0', 
      target: 'module-1',
      animated: modules[1]?.status === 'in-progress',
      style: { 
        stroke: modules[1]?.status === 'completed' ? '#10b981' : modules[1]?.isLocked ? '#475569' : '#64748b',
        strokeWidth: 2,
      },
    },
    { 
      id: 'e0-2', 
      source: 'module-0', 
      target: 'module-2',
      animated: modules[2]?.status === 'in-progress',
      style: { 
        stroke: modules[2]?.status === 'completed' ? '#10b981' : modules[2]?.isLocked ? '#475569' : '#64748b',
        strokeWidth: 2,
      },
    },
    { 
      id: 'e0-3', 
      source: 'module-0', 
      target: 'module-3',
      animated: modules[3]?.status === 'in-progress',
      style: { 
        stroke: modules[3]?.status === 'completed' ? '#10b981' : modules[3]?.isLocked ? '#475569' : '#64748b',
        strokeWidth: 2,
      },
    },
    // Module 1 & 3 to Module 4
    { 
      id: 'e1-4', 
      source: 'module-1', 
      target: 'module-4',
      animated: modules[4]?.status === 'in-progress',
      style: { 
        stroke: modules[4]?.status === 'completed' ? '#10b981' : modules[4]?.isLocked ? '#475569' : '#64748b',
        strokeWidth: 2,
      },
    },
    { 
      id: 'e3-4', 
      source: 'module-3', 
      target: 'module-4',
      animated: modules[4]?.status === 'in-progress',
      style: { 
        stroke: modules[4]?.status === 'completed' ? '#10b981' : modules[4]?.isLocked ? '#475569' : '#64748b',
        strokeWidth: 2,
      },
    },
    // Module 4 to Module 5
    { 
      id: 'e4-5', 
      source: 'module-4', 
      target: 'module-5',
      animated: modules[5]?.status === 'in-progress',
      style: { 
        stroke: modules[5]?.status === 'completed' ? '#10b981' : modules[5]?.isLocked ? '#475569' : '#64748b',
        strokeWidth: 2,
      },
    },
  ], [modules]);
  
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  
  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const data = node.data as CustomNodeData;
    if (onNodeClick && data?.moduleId) {
      onNodeClick(data.moduleId);
    }
  }, [onNodeClick]);
  
  return (
    <div style={{ height, width: '100%' }} className="rounded-xl overflow-hidden border border-slate-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="#334155" 
          gap={20} 
          size={1}
          className="bg-slate-950"
        />
        <Controls 
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
