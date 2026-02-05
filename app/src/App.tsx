import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  BarChart3, 
  Library, 
  Settings, 
  Menu, 
  X,
  ChevronRight,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Target,
  Code2,
  Cpu,
  Terminal,
  Cloud,
  FolderGit2,
  Image,
  Mic,
  Bot,
  Shield
} from 'lucide-react';
import { useProgressStore } from '@/store/progress';
import { LearningGraph } from '@/components/visualization/LearningGraph';
import { ProgressDashboard } from '@/components/visualization/ProgressDashboard';
import { ModuleHeader } from '@/components/modules/ModuleHeader';
import { ChecklistSection } from '@/components/modules/ChecklistSection';
import { ResourceHub } from '@/components/modules/ResourceHub';
import { DSAProblems } from '@/components/modules/DSAProblems';
import { ProjectsPage } from '@/components/projects';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

type View = 'home' | 'module' | 'progress' | 'resources' | 'projects';

const moduleIcons: Record<string, React.ElementType> = {
  'module-0': Target,
  'module-1': Code2,
  'module-2': Cpu,
  'module-3': Terminal,
  'module-4': BookOpen,
  'module-4.6': Image,
  'module-4.7': Mic,
  'module-4.8': Bot,
  'module-4.9': Shield,
  'module-5': Cloud,
};

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const { 
    modules: progressModules, 
    strictMode, 
    setStrictMode, 
    exportProgress, 
    importProgress, 
    resetProgress 
  } = useProgressStore();
  
  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleModuleClick = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentView('module');
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  
  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-roadmap-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Progress exported successfully!');
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        importProgress(data);
        toast.success('Progress imported successfully!');
      } catch (error) {
        toast.error('Failed to import progress. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };
  
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      toast.success('Progress reset successfully!');
    }
  };
  
  const selectedModule = progressModules.find(m => m.id === selectedModuleId);
  
  const overallProgress = Math.round(
    progressModules.reduce((acc, m) => acc + m.completionPercentage, 0) / progressModules.length
  );
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">AI Roadmap</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-400"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`
                fixed lg:static inset-y-0 left-0 z-50 w-72 
                bg-slate-900/95 backdrop-blur-xl border-r border-slate-800
                flex flex-col
              `}
            >
              {/* Logo */}
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-slate-100">AI Roadmap</h1>
                    <p className="text-xs text-slate-500">Master AI Systems</p>
                  </div>
                </div>
                
                {/* Overall progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-400">Overall Progress</span>
                    <span className="text-emerald-400 font-medium">{overallProgress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin">
                <button
                  onClick={() => {
                    setCurrentView('home');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${currentView === 'home' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }
                  `}
                >
                  <Target className="w-4 h-4" />
                  Learning Path
                </button>
                
                <button
                  onClick={() => {
                    setCurrentView('progress');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${currentView === 'progress' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }
                  `}
                >
                  <BarChart3 className="w-4 h-4" />
                  Progress Dashboard
                </button>
                
                <button
                  onClick={() => {
                    setCurrentView('resources');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${currentView === 'resources' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }
                  `}
                >
                  <Library className="w-4 h-4" />
                  Resource Hub
                </button>
                
                <button
                  onClick={() => {
                    setCurrentView('projects');
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${currentView === 'projects' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }
                  `}
                >
                  <FolderGit2 className="w-4 h-4" />
                  Projects Lab
                </button>
                
                <div className="pt-4 pb-2">
                  <p className="px-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Modules
                  </p>
                </div>
                
                {/* Main modules only (exclude multimodal sub-modules) */}
                {progressModules
                  .filter(module => !module.id.match(/^module-4\.[6-9]$/))
                  .map((module) => {
                    const Icon = moduleIcons[module.id] || Target;
                    return (
                      <button
                        key={module.id}
                        onClick={() => handleModuleClick(module.id)}
                        disabled={module.isLocked}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${selectedModuleId === module.id && currentView === 'module'
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : module.isLocked
                              ? 'text-slate-600 cursor-not-allowed'
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="flex-1 text-left truncate">{module.shortTitle}</span>
                        {module.isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {module.isLocked && <span className="text-xs">🔒</span>}
                      </button>
                    );
                  })}
              </nav>
              
              {/* Footer */}
              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors w-full"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        
        {/* Overlay for mobile */}
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Home View */}
              {currentView === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Hero */}
                  <div className="text-center py-8 md:py-12">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="text-gradient">AI Systems Engineer</span>
                        <br />
                        <span className="text-slate-100">Roadmap</span>
                      </h1>
                    </motion.div>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                      Comprehensive DSA, LLD, and AI System Design curriculum with 
                      progress visualization and interactive learning paths.
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                      <Button
                        onClick={() => handleModuleClick('module-0')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-medium px-6"
                      >
                        Start Learning
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentView('progress')}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Progress
                      </Button>
                    </div>
                  </div>
                  
                  {/* Learning Graph */}
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-400" />
                      Learning Path
                    </h2>
                    <LearningGraph 
                      onNodeClick={handleModuleClick}
                      height="500px"
                    />
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Modules', value: '6', icon: BookOpen },
                      { label: 'Resources', value: '200+', icon: Library },
                      { label: 'Problems', value: '75+', icon: Code2 },
                      { label: 'Days', value: '108', icon: Target },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center"
                      >
                        <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Module View */}
              {currentView === 'module' && selectedModule && (
                <motion.div
                  key="module"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <ModuleHeader 
                    module={selectedModule}
                    onStart={() => {
                      // Scroll to content
                      document.getElementById('module-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  
                  {/* Module Content */}
                  <div id="module-content">
                    {selectedModule.id === 'module-1' ? (
                      // DSA Module - Show Problems List
                      <DSAProblems moduleId={selectedModule.id} />
                    ) : (
                      // Other Modules - Show Checklist
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2" id="checklist">
                          <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-xl font-semibold text-slate-100">Checklist</h2>
                          </div>
                          <ChecklistSection
                            items={selectedModule.checklist}
                            resources={selectedModule.resources}
                            moduleId={selectedModule.id}
                          />
                        </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Library className="w-5 h-5 text-violet-400" />
                        <h2 className="text-xl font-semibold text-slate-100">Resources</h2>
                      </div>
                      <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin pr-2">
                        {selectedModule.resources.slice(0, 6).map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm text-slate-300 line-clamp-2">{resource.title}</h4>
                              <span className="text-xs text-slate-500 whitespace-nowrap">{resource.estimatedMinutes}m</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`
                                text-xs px-2 py-0.5 rounded-full
                                ${resource.type === 'video' ? 'bg-red-500/10 text-red-400' :
                                  resource.type === 'article' ? 'bg-blue-500/10 text-blue-400' :
                                  resource.type === 'leetcode' ? 'bg-amber-500/10 text-amber-400' :
                                  resource.type === 'book' ? 'bg-violet-500/10 text-violet-400' :
                                  'bg-emerald-500/10 text-emerald-400'
                                }
                              `}>
                                {resource.type}
                              </span>
                              {resource.difficulty && (
                                <span className={`
                                  text-xs px-2 py-0.5 rounded-full
                                  ${resource.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                                    resource.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                    'bg-red-500/10 text-red-400'
                                  }
                                `}>
                                  {resource.difficulty}
                                </span>
                              )}
                            </div>
                          </a>
                        ))}
                        {selectedModule.resources.length > 6 && (
                          <button
                            onClick={() => setCurrentView('resources')}
                            className="w-full py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            View all {selectedModule.resources.length} resources
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
              
              {/* Progress View */}
              {currentView === 'progress' && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Progress Dashboard</h1>
                    <p className="text-slate-400">Track your learning journey and visualize your growth.</p>
                  </div>
                  <ProgressDashboard />
                </motion.div>
              )}
              
              {/* Resources View */}
              {currentView === 'resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Resource Hub</h1>
                    <p className="text-slate-400">All learning materials in one place. Filter, search, and track your progress.</p>
                  </div>
                  <ResourceHub />
                </motion.div>
              )}
              
              {/* Projects View */}
              {currentView === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ProjectsPage />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-100 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage your learning preferences and progress data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Strict Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">Strict Mode</p>
                <p className="text-sm text-slate-500">Require checkpoint validation before progressing</p>
              </div>
              <Switch
                checked={strictMode}
                onCheckedChange={setStrictMode}
              />
            </div>
            
            {/* Export/Import */}
            <div className="space-y-3">
              <p className="text-slate-200 font-medium">Data Management</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </span>
                  </Button>
                </label>
              </div>
            </div>
            
            {/* Reset */}
            <div className="pt-4 border-t border-slate-800">
              <Button
                variant="destructive"
                onClick={handleReset}
                className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All Progress
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
