import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioWaveformProps {
  isRecording?: boolean;
  isPlaying?: boolean;
  duration?: number;
  currentTime?: number;
  onPlayPause?: () => void;
  onSeek?: (time: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
}

export function AudioWaveform({
  isRecording = false,
  isPlaying: controlledPlaying = false,
  duration = 0,
  currentTime = 0,
  onPlayPause,
  onSeek,
  size = 'md',
  showControls = true,
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(controlledPlaying);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const sizeConfig = {
    sm: { height: 40, barCount: 30, barWidth: 2 },
    md: { height: 60, barCount: 50, barWidth: 3 },
    lg: { height: 100, barCount: 80, barWidth: 4 },
  };

  const { height, barCount, barWidth } = sizeConfig[size];

  // Generate simulated waveform data
  const generateWaveform = () => {
    const bars: number[] = [];
    for (let i = 0; i < barCount; i++) {
      // Create a more realistic waveform pattern
      const baseHeight = Math.random() * 0.5 + 0.2;
      const variation = Math.sin(i * 0.2) * 0.3;
      bars.push(Math.max(0.1, Math.min(1, baseHeight + variation)));
    }
    return bars;
  };

  const [waveformData] = useState(() => generateWaveform());

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, height);

      const gap = 2;
      const totalBarWidth = barWidth + gap;
      const startX = (rect.width - barCount * totalBarWidth) / 2;

      // Calculate progress
      const progress = duration > 0 ? currentTime / duration : 0;
      const progressIndex = Math.floor(progress * barCount);

      waveformData.forEach((amplitude, i) => {
        const x = startX + i * totalBarWidth;
        const barHeight = amplitude * height * 0.8;
        const y = (height - barHeight) / 2;

        // Color based on progress
        const isPlayed = i <= progressIndex;
        const hue = isRecording ? 0 : isPlayed ? 150 : 210; // Red for recording, green for played, blue for unplayed
        const saturation = isRecording ? 70 : isPlayed ? 60 : 30;
        const lightness = isRecording ? 50 : isPlayed ? 50 : 40;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // Add glow effect for playing state
        if (isPlaying && i >= progressIndex - 2 && i <= progressIndex + 2) {
          ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`;
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw rounded bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      });

      // Draw progress line
      if (duration > 0) {
        const progressX = startX + progressIndex * totalBarWidth;
        ctx.strokeStyle = 'hsl(150, 60%, 50%)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(progressX, 0);
        ctx.lineTo(progressX, height);
        ctx.stroke();
      }
    };

    draw();

    // Animation loop for recording/playing
    if (isRecording || isPlaying) {
      const animate = () => {
        draw();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waveformData, isPlaying, isRecording, currentTime, duration, height, barCount, barWidth]);

  const handlePlayPause = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    onPlayPause?.();
  };

  const handleSeek = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !duration) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const gap = 2;
    const totalBarWidth = barWidth + gap;
    const startX = (rect.width - barCount * totalBarWidth) / 2;
    
    const clickedIndex = Math.floor((x - startX) / totalBarWidth);
    const newTime = Math.max(0, Math.min(duration, (clickedIndex / barCount) * duration));
    
    onSeek?.(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {/* Waveform Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full cursor-pointer"
          style={{ height }}
          onClick={handleSeek}
        />
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-2 right-2 flex items-center gap-2 px-2 py-1 rounded-full bg-red-500/20">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-red-400">Recording</span>
          </div>
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between mt-3 px-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <div className="text-sm text-slate-400">
              <span className="text-slate-200">{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-20 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
