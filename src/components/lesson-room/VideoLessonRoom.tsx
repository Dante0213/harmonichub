
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { VideoArea } from "./VideoArea";
import { ControlBar } from "./ControlBar";
import { ChatPanel } from "./ChatPanel";
import { MidiConnectionPanel } from "./MidiConnectionPanel";
import { VideoLessonRoomProps, ChatMessage } from "./types";
import { createMetronomeClick } from "./metronomeUtils";
import { PracticeArea } from "./PracticeArea";

export function VideoLessonRoom({ isOpen, onClose, lessonInfo }: VideoLessonRoomProps) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("video");
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [metronomeTempo, setMetronomeTempo] = useState(120);
  const [metronomeVolume, setMetronomeVolume] = useState(50);
  const [showMidiPanel, setShowMidiPanel] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const metronomeIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 초기 채팅 메시지
  const initialChatMessages: ChatMessage[] = [
    {sender: "시스템", text: "레슨이 시작되었습니다. 화상 통화 및 다양한 기능을 사용할 수 있습니다."},
    {sender: lessonInfo.teacherName, text: "안녕하세요! 오늘 레슨을 시작하겠습니다."}
  ];

  // 메트로놈 관련 효과
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 메트로놈 정리
    return () => {
      if (metronomeIntervalRef.current) {
        window.clearInterval(metronomeIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleToggleMic = () => {
    setMicEnabled(prev => !prev);
    toast(micEnabled ? "마이크가 꺼졌습니다." : "마이크가 켜졌습니다.");
  };

  const handleToggleVideo = () => {
    setVideoEnabled(prev => !prev);
    toast(videoEnabled ? "카메라가 꺼졌습니다." : "카메라가 켜졌습니다.");
  };

  const handleShareScreen = () => {
    toast.info("화면 공유 기능을 시작합니다...");
    // 실제 구현에서는 navigator.mediaDevices.getDisplayMedia() 사용
  };

  const handleFileUpload = () => {
    // 파일 선택 다이얼로그
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        toast.success(`파일 "${file.name}"이(가) 공유 준비되었습니다.`);
        // 실제 구현에서는 WebRTC 데이터 채널을 통해 파일 전송 구현
      }
    };
    input.click();
  };

  const handleToggleMidiPanel = () => {
    setShowMidiPanel(prev => !prev);
    if (!showMidiPanel) {
      setActiveTab("midi");
    }
  };

  const handleTogglePracticeMode = () => {
    setPracticeMode(prev => !prev);
    toast.info(practiceMode ? "레슨 모드로 전환합니다." : "연습 모드로 전환합니다.");
  };

  const handleToggleMetronome = () => {
    if (metronomeActive) {
      if (metronomeIntervalRef.current) {
        window.clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      setMetronomeActive(false);
      toast.info("메트로놈이 중지되었습니다.");
    } else {
      const intervalTime = 60000 / metronomeTempo;
      metronomeIntervalRef.current = window.setInterval(() => {
        createMetronomeClick(audioContextRef, metronomeVolume);
      }, intervalTime);
      setMetronomeActive(true);
      toast.info("메트로놈이 시작되었습니다.");
    }
  };

  const handleEndLesson = () => {
    if (confirm("정말 레슨을 종료하시겠습니까?")) {
      toast.info("레슨이 종료되었습니다.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex justify-between items-center">
            <span>{lessonInfo.title} - {lessonInfo.teacherName} 선생님</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-4 h-[calc(90vh-4rem)]">
          {/* 메인 화상 영역 - 3/4 */}
          <div className="col-span-1 md:col-span-3 h-full flex flex-col">
            {/* 비디오 영역 또는 연습 영역 */}
            {practiceMode ? (
              <PracticeArea />
            ) : (
              <VideoArea videoEnabled={videoEnabled} micEnabled={micEnabled} />
            )}
            
            {/* 컨트롤 바 */}
            <ControlBar 
              micEnabled={micEnabled}
              videoEnabled={videoEnabled}
              metronomeActive={metronomeActive}
              metronomeTempo={metronomeTempo}
              metronomeVolume={metronomeVolume}
              onToggleMic={handleToggleMic}
              onToggleVideo={handleToggleVideo}
              onShareScreen={handleShareScreen}
              onFileUpload={handleFileUpload}
              onEndLesson={handleEndLesson}
              setActiveTab={setActiveTab}
              setMetronomeTempo={setMetronomeTempo}
              setMetronomeVolume={setMetronomeVolume}
              onToggleMetronome={handleToggleMetronome}
              onToggleMidiPanel={handleToggleMidiPanel}
              practiceMode={practiceMode}
              onTogglePracticeMode={handleTogglePracticeMode}
            />
          </div>
          
          {/* 사이드바 - 1/4 */}
          <div className="col-span-1 h-full border-l">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
                <TabsTrigger value="video">라이브러리</TabsTrigger>
                <TabsTrigger value="chat">채팅</TabsTrigger>
                <TabsTrigger value="midi">MIDI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="video" className="flex-1 overflow-y-auto p-4">
                {/* 라이브러리 내용 */}
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">라이브러리</h3>
                  <p className="text-xs text-muted-foreground">
                    여기에 악보, 연습곡 및 교재 자료가 나타납니다.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="flex-1 flex flex-col h-full">
                <ChatPanel 
                  initialMessages={initialChatMessages}
                  teacherName={lessonInfo.teacherName}
                />
              </TabsContent>
              
              <TabsContent value="midi" className="flex-1 overflow-y-auto p-4">
                <MidiConnectionPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
