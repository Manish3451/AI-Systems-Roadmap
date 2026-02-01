import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, Clock, ExternalLink, Eye, Volume2 } from 'lucide-react';
import { useProgressStore } from '@/store/progress';
import { toast } from 'sonner';

interface VideoCardProps {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  channel: string;
  type: 'tutorial' | 'paper-explanation' | 'implementation' | 'course';
  url?: string;
}

const typeConfig = {
  tutorial: { color: 'bg-emerald-500/10 text-emerald-400', icon: Play },
  'paper-explanation': { color: 'bg-violet-500/10 text-violet-400', icon: Volume2 },
  implementation: { color: 'bg-amber-500/10 text-amber-400', icon: ExternalLink },
  course: { color: 'bg-blue-500/10 text-blue-400', icon: Eye },
};

export function VideoCard({ id, title, youtubeId, duration, channel, type, url }: VideoCardProps) {
  const { watchedVideos, markVideoWatched } = useProgressStore();
  const isWatched = watchedVideos.includes(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const TypeIcon = typeConfig[type].icon;

  const handleMarkWatched = () => {
    markVideoWatched(id);
    if (!isWatched) {
      toast.success('Marked as watched!');
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // For external course URLs
  if (url && !youtubeId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
      >
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-4"
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${typeConfig[type].color}`}>
              <ExternalLink className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeConfig[type].color}`}>
                  {type}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
              </div>
              <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                {title}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{channel}</p>
            </div>
          </div>
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
    >
      {/* Video Player Area */}
      <div className="relative aspect-video bg-slate-950">
        {!isPlaying ? (
          // Thumbnail with play button
          <>
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
              onError={(e) => {
                // Fallback to default thumbnail if maxres is not available
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            {/* Play Button */}
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center group/play"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover/play:scale-110 transition-transform">
                <Play className="w-7 h-7 text-slate-950 ml-1" fill="currentColor" />
              </div>
            </button>

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-slate-950/80 text-xs text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </div>

            {/* Watched Badge */}
            {isWatched && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-emerald-500/20 text-xs text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Watched
              </div>
            )}
          </>
        ) : (
          // YouTube Embed
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeConfig[type].color}`}>
                <TypeIcon className="w-3 h-3 inline mr-1" />
                {type}
              </span>
            </div>
            <h4 className="text-sm font-medium text-slate-200 line-clamp-2 mb-1">
              {title}
            </h4>
            <p className="text-xs text-slate-500">{channel}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800">
          <button
            onClick={handleMarkWatched}
            className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all
              ${isWatched 
                ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }
            `}
          >
            <Check className={`w-4 h-4 ${isWatched ? 'text-emerald-400' : ''}`} />
            {isWatched ? 'Watched' : 'Mark Watched'}
          </button>
          
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
