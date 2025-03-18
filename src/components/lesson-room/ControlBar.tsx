
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, ScreenShare, FileUp, MessageSquare, Music, Play, Pause } from "lucide-react";
import { MetronomePopover } from "./MetronomePopover";
import { ControlBarProps } from "./types";
import { useState } from "react";

interface ControlBarExtendedProps extends ControlBarProps {
  metronomeTempo: number;
  metronomeVolume: number;
  setMetronomeTempo: (tempo: number) => void;
  setMetronomeVolume: (volume: number) => void;
  onToggleMetronome: () => void;
  practiceMode: boolean;
  onTogglePracticeMode: () => void;
}

export function ControlBar({
  micEnabled,
  videoEnabled,
  metronomeActive,
  metronomeTempo,
  metronomeVolume,
  onToggleMic,
  onToggleVideo,
  onShareScreen,
  onFileUpload,
  onEndLesson,
  setActiveTab,
  setMetronomeTempo,
  setMetronomeVolume,
  onToggleMetronome,
  onToggleMidiPanel,
  practiceMode,
  onTogglePracticeMode
}: ControlBarExtendedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-16 bg-background border-t flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        {/* 오디오/비디오 컨트롤은 레슨 모드에서만 표시 */}
        {!practiceMode && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleMic}
              className={!micEnabled ? "bg-red-100 text-red-500 border-red-200" : ""}
            >
              {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleVideo}
              className={!videoEnabled ? "bg-red-100 text-red-500 border-red-200" : ""}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {/* 연습/레슨 모드 전환 버튼 제거 */}
        
        {/* 레슨 모드에서만 표시할 버튼들 */}
        {!practiceMode && (
          <>
            <Button variant="outline" size="icon" onClick={onShareScreen}>
              <ScreenShare className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={onFileUpload}>
              <FileUp className="h-5 w-5" />
            </Button>
          </>
        )}
        
        {/* 메트로놈 - 두 모드 모두 표시 */}
        <MetronomePopover
          metronomeActive={metronomeActive}
          metronomeTempo={metronomeTempo}
          metronomeVolume={metronomeVolume}
          setMetronomeTempo={setMetronomeTempo}
          setMetronomeVolume={setMetronomeVolume}
          onToggleMetronome={onToggleMetronome}
        />
        
        {/* 연습 모드일 때만 표시할 플레이어 컨트롤 */}
        {practiceMode && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={togglePlay}
            className={isPlaying ? "bg-primary/20" : ""}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        )}
        
        {/* 레슨 모드에서만 채팅 아이콘 표시 */}
        {!practiceMode && (
          <Button variant="outline" size="icon" onClick={() => setActiveTab("chat")}>
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div>
        <Button variant="destructive" onClick={onEndLesson}>
          레슨 종료
        </Button>
      </div>
    </div>
  );
}
