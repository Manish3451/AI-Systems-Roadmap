import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  ExternalLink, 
  Play,
  FileText,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import type { DSAPattern, Difficulty } from '@/types';
import { allDSAPatterns, dsaStats } from '@/data/dsaPatterns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROBLEMS_PER_PAGE = 20;

interface DSAProblemsProps {
  moduleId: string;
}

export function DSAProblems({ moduleId }: DSAProblemsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());

  // Flatten all problems from all patterns
  const allProblems = useMemo(() => {
    const problems: Array<{
      problemId: string;
      title: string;
      difficulty: Difficulty;
      pattern: string;
      patternId: string;
    }> = [];
    
    allDSAPatterns.forEach(pattern => {
      pattern.problems.forEach(problem => {
        problems.push({
          problemId: problem.problemId,
          title: problem.title,
          difficulty: problem.difficulty,
          pattern: pattern.name,
          patternId: pattern.id,
        });
      });
    });
    
    return problems;
  }, []);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return allProblems.filter(problem => {
      const matchesPattern = selectedPattern === 'all' || problem.patternId === selectedPattern;
      const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           problem.pattern.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPattern && matchesDifficulty && matchesSearch;
    });
  }, [allProblems, selectedPattern, selectedDifficulty, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + PROBLEMS_PER_PAGE);

  // Helper to create LeetCode URL
  const createLeetCodeUrl = (title: string): string => {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return `https://leetcode.com/problems/${slug}/`;
  };

  // Helper to create solution URL
  const createSolutionUrl = (title: string): string => {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return `/learn/dsa/${slug}`;
  };

  // Helper to create YouTube URL
  const createYouTubeUrl = (title: string): string => {
    const query = encodeURIComponent(`${title} Leetcode`);
    return `https://www.youtube.com/results?search_query=${query}`;
  };

  const toggleProblem = (problemId: string) => {
    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const completedCount = completedProblems.size;
  const progress = Math.round((completedCount / allProblems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-2xl font-bold text-slate-100">{allProblems.length}</p>
          <p className="text-sm text-slate-500">Total Problems</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-2xl font-bold text-emerald-400">{completedCount}</p>
          <p className="text-sm text-slate-500">Completed</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-2xl font-bold text-blue-400">{progress}%</p>
          <p className="text-sm text-slate-500">Progress</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-2xl font-bold text-violet-400">{allDSAPatterns.length}</p>
          <p className="text-sm text-slate-500">Patterns</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Overall Progress</span>
          <span className="text-sm font-medium text-slate-200">{completedCount} / {allProblems.length}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full"
          />
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
          <span className="text-emerald-400">Easy: {dsaStats.easy}</span>
          <span className="text-amber-400">Medium: {dsaStats.medium}</span>
          <span className="text-red-400">Hard: {dsaStats.hard}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-slate-900/50 border-slate-800 text-slate-200 placeholder:text-slate-600"
          />
        </div>
        <Select
          value={selectedPattern}
          onValueChange={(value) => {
            setSelectedPattern(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[200px] bg-slate-900/50 border-slate-800 text-slate-200">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Pattern" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            <SelectItem value="all">All Patterns</SelectItem>
            {allDSAPatterns.map(pattern => (
              <SelectItem key={pattern.id} value={pattern.id}>
                {pattern.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedDifficulty}
          onValueChange={(value) => {
            setSelectedDifficulty(value as Difficulty | 'all');
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[150px] bg-slate-900/50 border-slate-800 text-slate-200">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Problems List */}
      <div className="space-y-2">
        {paginatedProblems.map((problem, index) => (
          <motion.div
            key={problem.problemId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className={`
              group p-4 rounded-xl border transition-all duration-200
              ${completedProblems.has(problem.problemId)
                ? 'bg-emerald-500/5 border-emerald-500/20' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <button
                onClick={() => toggleProblem(problem.problemId)}
                className={`
                  flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center
                  transition-all duration-200
                  ${completedProblems.has(problem.problemId)
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-slate-600 hover:border-emerald-500/50 bg-slate-800/50'
                  }
                `}
              >
                {completedProblems.has(problem.problemId) && (
                  <Check className="w-4 h-4 text-slate-950" />
                )}
              </button>

              {/* Problem Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className={`text-sm font-medium truncate ${
                    completedProblems.has(problem.problemId) 
                      ? 'text-slate-400 line-through' 
                      : 'text-slate-200'
                  }`}>
                    {problem.title}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                    {problem.pattern}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={createLeetCodeUrl(problem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Open on LeetCode"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={createSolutionUrl(problem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                  title="View Solution"
                >
                  <FileText className="w-4 h-4" />
                </a>
                <a
                  href={createYouTubeUrl(problem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                  title="Watch Video"
                >
                  <Play className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-500">
            Showing {startIndex + 1}-{Math.min(startIndex + PROBLEMS_PER_PAGE, filteredProblems.length)} of {filteredProblems.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-slate-400 px-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {filteredProblems.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>No problems found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default DSAProblems;
