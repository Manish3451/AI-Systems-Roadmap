import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  Clock, 
  Check,
  Video,
  FileText,
  Code,
  BookOpen,
  GraduationCap,
  X
} from 'lucide-react';
import type { Resource, ResourceType } from '@/types';
import { useProgressStore } from '@/store/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const resourceTypeConfig: Record<ResourceType, { icon: React.ElementType; label: string; color: string }> = {
  video: { icon: Video, label: 'Video', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
  article: { icon: FileText, label: 'Article', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  leetcode: { icon: Code, label: 'LeetCode', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  book: { icon: BookOpen, label: 'Book', color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' },
  doc: { icon: GraduationCap, label: 'Documentation', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  code: { icon: Code, label: 'Code', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
};

const difficultyConfig = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/30',
};

const moduleColors: Record<string, string> = {
  'module-0': 'slate',
  'module-1': 'emerald',
  'module-2': 'blue',
  'module-3': 'yellow',
  'module-4': 'violet',
  'module-5': 'orange',
};

function ResourceCard({ 
  resource, 
  onToggleComplete, 
  onToggleFavorite 
}: { 
  resource: Resource;
  onToggleComplete: () => void;
  onToggleFavorite: () => void;
}) {
  const typeConfig = resourceTypeConfig[resource.type];
  const TypeIcon = typeConfig.icon;
  const moduleColor = moduleColors[resource.moduleId] || 'slate';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        group relative p-4 rounded-xl border transition-all duration-300
        ${resource.isCompleted 
          ? 'bg-emerald-500/5 border-emerald-500/30' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
        }
      `}
    >
      {/* Module indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl bg-${moduleColor}-500`} />
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pl-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`p-2 rounded-lg ${typeConfig.color}`}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <Badge variant="outline" className={`text-xs ${typeConfig.color}`}>
            {typeConfig.label}
          </Badge>
          <Badge variant="outline" className={`text-xs bg-${moduleColor}-500/10 text-${moduleColor}-400 border-${moduleColor}-500/30`}>
            {resource.moduleId.replace('module-', 'M')}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleFavorite}
            className={`
              p-1.5 rounded-lg transition-colors
              ${resource.isFavorite 
                ? 'text-amber-400 bg-amber-500/20' 
                : 'text-slate-600 hover:text-amber-400 hover:bg-slate-800'
              }
            `}
          >
            <Star className={`w-4 h-4 ${resource.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onToggleComplete}
            className={`
              p-1.5 rounded-lg transition-colors
              ${resource.isCompleted 
                ? 'text-emerald-400 bg-emerald-500/20' 
                : 'text-slate-600 hover:text-emerald-400 hover:bg-slate-800'
              }
            `}
          >
            <Check className={`w-4 h-4 ${resource.isCompleted ? 'stroke-[3]' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Title */}
      <h4 className={`font-medium mb-2 line-clamp-2 pl-2 ${
        resource.isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'
      }`}>
        {resource.title}
      </h4>
      
      {/* Meta */}
      <div className="flex items-center gap-3 mb-3 pl-2 flex-wrap">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="w-3 h-3" />
          {resource.estimatedMinutes}m
        </span>
        {resource.difficulty && (
          <Badge variant="outline" className={`text-xs ${difficultyConfig[resource.difficulty]}`}>
            {resource.difficulty}
          </Badge>
        )}
        {resource.pattern && (
          <span className="text-xs text-slate-600">
            {resource.pattern}
          </span>
        )}
      </div>
      
      {/* Action */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium transition-all ml-2
          ${resource.isCompleted
            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
          }
        `}
      >
        <ExternalLink className="w-4 h-4" />
        Open Resource
      </a>
    </motion.div>
  );
}

export function ResourceHub() {
  const { getAllResources, getFavoriteResources, toggleResourceComplete, toggleResourceFavorite } = useProgressStore();
  const allResources = getAllResources();
  const favoriteResources = getFavoriteResources();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  
  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesModule = selectedModule === 'all' || resource.moduleId === selectedModule;
      return matchesSearch && matchesType && matchesModule;
    });
  }, [allResources, searchQuery, selectedType, selectedModule]);
  
  const stats = useMemo(() => {
    const completed = allResources.filter(r => r.isCompleted).length;
    const favorites = allResources.filter(r => r.isFavorite).length;
    const byType = allResources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return { completed, favorites, total: allResources.length, byType };
  }, [allResources]);
  
  const handleToggleComplete = (moduleId: string, resourceId: string) => {
    toggleResourceComplete(moduleId, resourceId);
  };
  
  const handleToggleFavorite = (moduleId: string, resourceId: string) => {
    toggleResourceFavorite(moduleId, resourceId);
  };
  
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-2xl font-bold text-slate-100">{stats.total}</div>
          <div className="text-sm text-slate-500">Total Resources</div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
          <div className="text-sm text-emerald-500/70">Completed</div>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <div className="text-2xl font-bold text-amber-400">{stats.favorites}</div>
          <div className="text-sm text-amber-500/70">Favorites</div>
        </div>
        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/30">
          <div className="text-2xl font-bold text-violet-400">
            {Math.round((stats.completed / Math.max(stats.total, 1)) * 100)}%
          </div>
          <div className="text-sm text-violet-500/70">Progress</div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-900/50 border border-slate-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
            All Resources
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950">
            Favorites
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search all resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-800 text-slate-200 placeholder:text-slate-600"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ResourceType | 'all')}
                className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Types</option>
                {Object.entries(resourceTypeConfig).map(([type, config]) => (
                  <option key={type} value={type}>{config.label}</option>
                ))}
              </select>
              
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Modules</option>
                <option value="module-0">Module 0: Mindset</option>
                <option value="module-1">Module 1: DSA</option>
                <option value="module-2">Module 2: LLD</option>
                <option value="module-3">Module 3: Python</option>
                <option value="module-4">Module 4: AI Systems</option>
                <option value="module-5">Module 5: MLOps</option>
              </select>
              
              {(searchQuery || selectedType !== 'all' || selectedModule !== 'all') && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                    setSelectedModule('all');
                  }}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Results */}
          <div className="text-sm text-slate-500">
            Showing {filteredResources.length} of {allResources.length} resources
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onToggleComplete={() => handleToggleComplete(resource.moduleId, resource.id)}
                onToggleFavorite={() => handleToggleFavorite(resource.moduleId, resource.id)}
              />
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No resources match your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onToggleComplete={() => handleToggleComplete(resource.moduleId, resource.id)}
                onToggleFavorite={() => handleToggleFavorite(resource.moduleId, resource.id)}
              />
            ))}
          </div>
          
          {favoriteResources.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No favorites yet. Star resources to save them here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
