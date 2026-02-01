import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Clock, 
  Star, 
  Check, 
  Filter,
  Search,
  Video,
  FileText,
  Code,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import type { Resource, ResourceType } from '@/types';
import { useProgressStore } from '@/store/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ResourceSectionProps {
  resources: Resource[];
  moduleId: string;
}

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

function ResourceCard({ resource, moduleId }: { resource: Resource; moduleId: string }) {
  const { toggleResourceComplete, toggleResourceFavorite } = useProgressStore();
  const typeConfig = resourceTypeConfig[resource.type];
  const TypeIcon = typeConfig.icon;
  
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
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${typeConfig.color}`}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <Badge variant="outline" className={`text-xs ${typeConfig.color}`}>
            {typeConfig.label}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Favorite button */}
          <button
            onClick={() => toggleResourceFavorite(moduleId, resource.id)}
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
          
          {/* Complete button */}
          <button
            onClick={() => toggleResourceComplete(moduleId, resource.id)}
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
      <h4 className={`font-medium mb-2 line-clamp-2 ${
        resource.isCompleted ? 'text-slate-400 line-through' : 'text-slate-200'
      }`}>
        {resource.title}
      </h4>
      
      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
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
          flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium transition-all
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

export function ResourceSection({ resources, moduleId }: ResourceSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesFavorite = !showFavoritesOnly || resource.isFavorite;
      return matchesSearch && matchesType && matchesFavorite;
    });
  }, [resources, searchQuery, selectedType, showFavoritesOnly]);
  
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: resources.length };
    resources.forEach(r => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  }, [resources]);
  
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800 text-slate-200 placeholder:text-slate-600"
          />
        </div>
        
        {/* Type filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
            className={`
              whitespace-nowrap
              ${selectedType === 'all' 
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-600' 
                : 'border-slate-700 text-slate-400 hover:bg-slate-800'
              }
            `}
          >
            All ({typeCounts.all})
          </Button>
          
          {(Object.keys(resourceTypeConfig) as ResourceType[]).map(type => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`
                whitespace-nowrap
                ${selectedType === type 
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-600' 
                  : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                }
              `}
            >
              {resourceTypeConfig[type].label} ({typeCounts[type] || 0})
            </Button>
          ))}
        </div>
        
        {/* Favorites toggle */}
        <Button
          variant={showFavoritesOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`
            whitespace-nowrap
            ${showFavoritesOnly 
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-600' 
              : 'border-slate-700 text-slate-400 hover:bg-slate-800'
            }
          `}
        >
          <Star className={`w-4 h-4 mr-1 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          Favorites
        </Button>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-slate-500">
        Showing {filteredResources.length} of {resources.length} resources
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ResourceCard resource={resource} moduleId={moduleId} />
          </motion.div>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No resources match your filters.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setShowFavoritesOnly(false);
            }}
            className="mt-4 border-slate-700 text-slate-400 hover:bg-slate-800"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
