
import { PianoKeyboard } from "./PianoKeyboard";
import { Music, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function PracticeArea({ onTogglePracticeMode, practiceMode }: { onTogglePracticeMode: () => void, practiceMode: boolean }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3분 (예시)
  const [volume, setVolume] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-auto">
        {/* 악보 영역 */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">연습 모드</h2>
            
            {/* 연습모드 전환 버튼 제거됨 */}
          </div>
          
          {/* 악보 표시 영역 */}
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center mb-4">
            <p className="text-gray-500">여기에 악보가 표시됩니다</p>
          </div>
          
          {/* 음원 플레이어 UI */}
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-gray-600" />
                <span className="font-medium">쇼팽 녹턴 Op.9 No.2</span>
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
              onValueChange={(value) => setCurrentTime(value[0])}
              className="mb-4"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-1/3">
                <span className="text-sm">음량:</span>
                <Slider 
                  value={volume} 
                  max={100} 
                  step={1}
                  onValueChange={setVolume}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={togglePlay}
                className="flex items-center gap-1"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? "일시정지" : "재생"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 피아노 건반 */}
      <PianoKeyboard />
    </div>
  );
}
