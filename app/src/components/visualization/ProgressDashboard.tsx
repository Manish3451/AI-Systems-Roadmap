import { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Circle, 
  Trophy,
  Calendar
} from 'lucide-react';
import { useProgressStore } from '@/store/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProgressDashboard() {
  const {
    getSkillDistribution,
    getDailyActivity,
    getCurrentStreak,
    getCompletedCount,
    getTotalCount,
    getNextMilestone,
    getProblemStats,
    totalTimeInvested,
    modules,
  } = useProgressStore();
  
  const skillDistribution = getSkillDistribution();
  const dailyActivity = getDailyActivity(30);
  const streak = getCurrentStreak();
  const completedCount = getCompletedCount();
  const totalCount = getTotalCount();
  const nextMilestone = getNextMilestone();
  const problemStats = getProblemStats();
  
  // Radar chart data
  const radarData = useMemo(() => [
    { subject: 'DSA', A: skillDistribution.DSA, fullMark: 100 },
    { subject: 'LLD', A: skillDistribution.LLD, fullMark: 100 },
    { subject: 'Python', A: skillDistribution.Python, fullMark: 100 },
    { subject: 'AI Systems', A: skillDistribution['AI Systems'], fullMark: 100 },
    { subject: 'MLOps', A: skillDistribution.MLOps, fullMark: 100 },
    { subject: 'Architecture', A: skillDistribution.Architecture, fullMark: 100 },
  ], [skillDistribution]);
  
  // Heatmap data (last 7 days)
  const heatmapData = useMemo(() => {
    const last7Days = dailyActivity.slice(-7);
    return last7Days.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: day.date,
      count: day.itemsCompleted,
      intensity: day.itemsCompleted === 0 ? 0 : 
                 day.itemsCompleted < 3 ? 1 : 
                 day.itemsCompleted < 6 ? 2 : 3,
    }));
  }, [dailyActivity]);
  
  const overallProgress = Math.round((completedCount / totalCount) * 100);
  
  const getHeatmapColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-slate-800';
      case 1: return 'bg-emerald-900';
      case 2: return 'bg-emerald-700';
      case 3: return 'bg-emerald-500';
      default: return 'bg-slate-800';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Overall Progress</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-100">{overallProgress}%</div>
              <p className="text-xs text-slate-500 mt-1">
                {completedCount} of {totalCount} items completed
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Current Streak</CardTitle>
              <Flame className="w-4 h-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-100">{streak} days</div>
              <p className="text-xs text-slate-500 mt-1">
                Keep it up! Consistency is key
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Problems Solved</CardTitle>
              <Target className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-100">{problemStats.solved}</div>
              <p className="text-xs text-slate-500 mt-1">
                of {problemStats.total} LeetCode problems
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-violet-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Time Invested</CardTitle>
              <Clock className="w-4 h-4 text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-100">
                {Math.round(totalTimeInvested / 60)}h
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Total learning time
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart - Skills Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card h-[400px]">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-emerald-400" />
                Skills Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card h-[400px]">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-[100px] gap-2 mb-6">
                {heatmapData.map((day, index) => (
                  <motion.div
                    key={day.fullDate}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max((day.count / Math.max(...heatmapData.map(d => d.count), 1)) * 100, 10)}%` }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`flex-1 rounded-t-lg ${getHeatmapColor(day.intensity)}`}
                    title={`${day.date}: ${day.count} items`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                {heatmapData.map(day => (
                  <span key={day.fullDate}>{day.date}</span>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-slate-800 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-900 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-700 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Module Progress Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg text-slate-100">Module Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module, index) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {module.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : module.isLocked ? (
                      <Circle className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-amber-400" />
                    )}
                    <span className={module.isLocked ? 'text-slate-500' : 'text-slate-200'}>
                      {module.shortTitle}
                    </span>
                  </div>
                  <span className={`text-xs ${
                    module.isCompleted ? 'text-emerald-400' : 
                    module.isLocked ? 'text-slate-600' : 'text-amber-400'
                  }`}>
                    {module.completionPercentage}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.completionPercentage}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      module.isCompleted ? 'bg-emerald-500' :
                      module.status === 'in-progress' ? 'bg-amber-500' :
                      module.isLocked ? 'bg-slate-700' : 'bg-slate-600'
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Next Milestone */}
      {nextMilestone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="glass-card border-violet-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-400" />
                Next Milestone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Complete <span className="text-violet-400 font-semibold">{nextMilestone.title}</span> module
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {nextMilestone.remaining} items remaining
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
