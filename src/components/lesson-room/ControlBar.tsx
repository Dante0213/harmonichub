
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, ScreenShare, FileUp, MessageSquare, Bluetooth } from "lucide-react";
import { MetronomePopover } from "./MetronomePopover";
import { ControlBarProps } from "./types";

interface ControlBarExtendedProps extends ControlBarProps {
  metronomeTempo: number;
  metronomeVolume: number;
  setMetronomeTempo: (tempo: number) => void;
  setMetronomeVolume: (volume: number) => void;
  onToggleMetronome: () => void;
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
  onToggleMidiPanel
}: ControlBarExtendedProps) {
  return (
    <div className="h-16 bg-background border-t flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
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
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onShareScreen}>
          <ScreenShare className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={onFileUpload}>
          <FileUp className="h-5 w-5" />
        </Button>
        
        {/* 메트로놈 팝오버 */}
        <MetronomePopover
          metronomeActive={metronomeActive}
          metronomeTempo={metronomeTempo}
          metronomeVolume={metronomeVolume}
          setMetronomeTempo={setMetronomeTempo}
          setMetronomeVolume={setMetronomeVolume}
          onToggleMetronome={onToggleMetronome}
        />
        
        {/* MIDI 연결 버튼 추가 */}
        <Button variant="outline" size="icon" onClick={onToggleMidiPanel}>
          <Bluetooth className="h-5 w-5" />
        </Button>
        
        <Button variant="outline" size="icon" onClick={() => setActiveTab("chat")}>
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
      
      <div>
        <Button variant="destructive" onClick={onEndLesson}>
          레슨 종료
        </Button>
      </div>
    </div>
  );
}
