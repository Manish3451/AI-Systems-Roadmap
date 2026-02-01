import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Code2, 
  ExternalLink,
  Play,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Video,
  FileCode,
  ListChecks,
  Info
} from 'lucide-react';
import type { Project } from '@/types';
import { useProgressStore } from '@/store/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { VideoCard } from '@/components/multimodal/VideoCard';

type MediaTab = 'overview' | 'videos' | 'code' | 'validation';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// Extract YouTube video ID from URL
const extractYoutubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match?.[1] || '';
};

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { 
    completedSteps, 
    toggleStepComplete
  } = useProgressStore();
  
  const [activeTab, setActiveTab] = useState<MediaTab>('overview');
  const [expandedPhases, setExpandedPhases] = useState<string[]>(
    project.phases.map(p => p.name)
  );
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  
  const togglePhase = (phaseName: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseName) 
        ? prev.filter(p => p !== phaseName)
        : [...prev, phaseName]
    );
  };
  
  const handleCopyCode = async (code: string, stepId: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedSnippet(stepId);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedSnippet(null), 2000);
  };
  
  const getModuleName = (moduleRef: string) => {
    const moduleMap: Record<string, string> = {
      'module-0': 'System Architecture',
      'module-1': 'DSA',
      'module-2': 'LLD',
      'module-3': 'Python',
      'module-4': 'AI Systems',
      'module-5': 'MLOps',
      'module-4.6': 'Multimodal Foundations',
      'module-4.7': 'Speech & Voice',
      'module-4.8': 'Multimodal Agents',
      'module-4.9': 'Production Optimization'
    };
    return moduleMap[moduleRef] || moduleRef;
  };
  
  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  
  // All phases are viewable - no restrictions (function kept for future use)
  
  const totalSteps = project.phases.reduce((acc, p) => acc + p.steps.length, 0);
  const completedCount = project.phases.reduce((acc, p) => 
    acc + p.steps.filter(s => isStepCompleted(s.id)).length, 0
  );
  const totalHours = project.phases.reduce((acc, p) => 
    acc + p.steps.reduce((s, step) => s + (step.estimatedHours || 0), 0), 0
  );

  // Collect all videos from project resources
  const allVideos = project.phases.flatMap(phase => 
    phase.steps.flatMap(step => 
      step.resources?.filter(r => r.type === 'video').map(r => ({
        id: `${step.id}-video`,
        title: r.title,
        youtubeId: extractYoutubeId(r.url),
        duration: 'Tutorial',
        channel: 'YouTube',
        type: 'tutorial' as const
      })) || []
    )
  );

  // Collect all code snippets
  const allCodeSnippets = project.phases.flatMap(phase =>
    phase.steps.filter(s => s.codeSnippet).map(s => ({
      stepId: s.id,
      title: s.title,
      code: s.codeSnippet!,
      phase: phase.name
    }))
  );
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0 text-slate-400 hover:text-slate-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`
              text-xs font-medium px-2.5 py-0.5 rounded-full
              ${project.difficulty === 'Expert' 
                ? 'bg-red-500/10 text-red-400' 
                : 'bg-amber-500/10 text-amber-400'
              }
            `}>
              {project.difficulty}
            </span>
            <span className="text-xs text-slate-500">{project.industryStandard}</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
            {project.title}
          </h1>
          <p className="text-slate-400">{project.tagline}</p>
        </div>
      </div>
      
      {/* Progress overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-emerald-400">{completedCount}/{totalSteps}</div>
          <div className="text-sm text-slate-500">Steps Completed</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-violet-400">{project.completionPercentage}%</div>
          <div className="text-sm text-slate-500">Overall Progress</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-amber-400">{totalHours}h</div>
          <div className="text-sm text-slate-500">Estimated Time</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-blue-400">{project.phases.length}</div>
          <div className="text-sm text-slate-500">Phases</div>
        </div>
      </div>
      
      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-sm px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Media Tabs */}
      <div className="border-b border-slate-800">
        <div className="flex gap-1">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'videos', label: 'Videos', icon: Video },
            { id: 'code', label: 'Code', icon: FileCode },
            { id: 'validation', label: 'Validation', icon: ListChecks },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MediaTab)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2
                ${activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'videos' && allVideos.length > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-500">
                  {allVideos.length}
                </span>
              )}
              {tab.id === 'code' && allCodeSnippets.length > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-500">
                  {allCodeSnippets.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <PhasesSection />
          </motion.div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {allVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allVideos.map((video) => (
                  video.youtubeId && (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      title={video.title}
                      youtubeId={video.youtubeId}
                      duration={video.duration}
                      channel={video.channel}
                      type={video.type}
                    />
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No video resources for this project yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {allCodeSnippets.length > 0 ? (
              allCodeSnippets.map((snippet) => (
                <div key={snippet.stepId} className="rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500">{snippet.phase}</span>
                      <h4 className="text-sm font-medium text-slate-200">{snippet.title}</h4>
                    </div>
                    <button
                      onClick={() => handleCopyCode(snippet.code, snippet.stepId)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {copiedSnippet === snippet.stepId ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto bg-slate-950">
                    <code className="text-sm text-slate-300 font-mono whitespace-pre">
                      {snippet.code}
                    </code>
                  </pre>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">
                <FileCode className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No code snippets for this project yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Validation Tab */}
        {activeTab === 'validation' && (
          <motion.div
            key="validation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {project.phases.map((phase) => (
              <div key={phase.name} className="rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800">
                  <h4 className="font-medium text-slate-200">{phase.name}</h4>
                  <span className="text-xs text-slate-500">{phase.duration}</span>
                </div>
                <div className="p-4 space-y-3">
                  {phase.steps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className={`
                        w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                        ${isStepCompleted(step.id) ? 'bg-emerald-500' : 'bg-slate-700'}
                      `}>
                        {isStepCompleted(step.id) && <Check className="w-3 h-3 text-slate-950" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300">{step.title}</p>
                        <ul className="mt-2 space-y-1">
                          {step.validationCriteria.map((criteria, i) => (
                            <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                              <span className="text-emerald-500">•</span>
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Inner component for phases section
  function PhasesSection() {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          Implementation Phases
        </h2>
        
        {project.phases.map((phase, phaseIndex) => {
          const phaseCompletedSteps = phase.steps.filter(s => isStepCompleted(s.id)).length;
          const isExpanded = expandedPhases.includes(phase.name);
          
          return (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIndex * 0.1 }}
              className="rounded-xl border overflow-hidden bg-slate-900/50 border-slate-800"
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.name)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  {phaseCompletedSteps === phase.steps.length ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : phaseCompletedSteps > 0 ? (
                    <Play className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-slate-100">{phase.name}</h3>
                    <p className="text-sm text-slate-500">{phase.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    {phaseCompletedSteps}/{phase.steps.length} steps
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-slate-500"
                  >
                    <ChevronLeft className="w-5 h-5 rotate-[-90deg]" />
                  </motion.div>
                </div>
              </button>
              
              {/* Phase Steps */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-800"
                  >
                    <div className="p-4 space-y-4">
                      {phase.steps.map((step, stepIndex) => {
                        const completed = isStepCompleted(step.id);
                        
                        return (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: stepIndex * 0.05 }}
                            className={`
                              p-4 rounded-lg border transition-all
                              ${completed 
                                ? 'bg-emerald-500/5 border-emerald-500/20' 
                                : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
                              }
                            `}
                          >
                            {/* Step Header */}
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleStepComplete(step.id)}
                                className={`
                                  shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                  ${completed 
                                    ? 'bg-emerald-500 border-emerald-500' 
                                    : 'border-slate-500 hover:border-emerald-500'
                                  }
                                `}
                              >
                                {completed && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                              </button>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h4 className={`font-medium ${completed ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {step.title}
                                  </h4>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-500">
                                    {getModuleName(step.moduleRef)}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-400 mb-2">{step.description}</p>
                                
                                {/* Meta info */}
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                  {step.estimatedHours && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {step.estimatedHours}h
                                    </span>
                                  )}
                                  {step.resources && step.resources.length > 0 && (
                                    <span className="flex items-center gap-1">
                                      <ExternalLink className="w-3 h-3" />
                                      {step.resources.length} resources
                                    </span>
                                  )}
                                </div>
                                
                                {/* Code Snippet */}
                                {step.codeSnippet && (
                                  <div className="relative mb-3">
                                    <div className="absolute top-2 right-2">
                                      <button
                                        onClick={() => handleCopyCode(step.codeSnippet!, step.id)}
                                        className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                                      >
                                        {copiedSnippet === step.id ? (
                                          <Check className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                          <Copy className="w-4 h-4" />
                                        )}
                                      </button>
                                    </div>
                                    <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto">
                                      <code className="text-sm text-slate-300 font-mono">
                                        {step.codeSnippet}
                                      </code>
                                    </pre>
                                  </div>
                                )}
                                
                                {/* Resources */}
                                {step.resources && step.resources.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {step.resources.map((resource) => (
                                      <a
                                        key={resource.title}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        {resource.title}
                                      </a>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Validation Criteria */}
                                {step.validationCriteria.length > 0 && (
                                  <div className="space-y-1">
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                      <AlertCircle className="w-3 h-3" />
                                      Validation Criteria:
                                    </p>
                                    <ul className="space-y-1">
                                      {step.validationCriteria.map((criteria, i) => (
                                        <li 
                                          key={i}
                                          className="text-xs text-slate-400 flex items-start gap-2"
                                        >
                                          <span className="text-emerald-500 mt-0.5">•</span>
                                          {criteria}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }
}
