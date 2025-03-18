
import { Music, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  currentTime: number;
  duration: number;
  volume: number[];
  isPlaying: boolean;
  selectedSheet: string | null;
  onProgressChange: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  onTogglePlay: () => void;
}

export function AudioPlayer({ 
  currentTime, 
  duration, 
  volume, 
  isPlaying, 
  selectedSheet, 
  onProgressChange, 
  onVolumeChange, 
  onTogglePlay 
}: AudioPlayerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-gray-600" />
          <span className="font-medium">{selectedSheet || "선택된 악보가 없습니다"}</span>
        </div>
        <div className="text-sm text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      
      {/* 재생 프로그레스 바 */}
      <Slider 
        value={[currentTime]} 
        max={duration} 
        step={1}
        onValueChange={onProgressChange}
        className="mb-4"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-1/3">
          <span className="text-sm">음량:</span>
          <Slider 
            value={volume} 
            max={100} 
            step={1}
            onValueChange={onVolumeChange}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTogglePlay}
          className="flex items-center gap-1"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{isPlaying ? "일시정지" : "재생"}</span>
        </Button>
      </div>
    </div>
  );
}
