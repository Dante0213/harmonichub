
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoArea } from "./VideoArea";
import { ControlBar } from "./ControlBar";
import { ChatPanel } from "./ChatPanel";
import { MidiConnectionPanel } from "./MidiConnectionPanel";
import { PracticeArea } from "./PracticeArea";
import { ChatMessage } from "./types";

interface VideoContentProps {
  videoEnabled: boolean;
  micEnabled: boolean;
  activeTab: string;
  metronomeActive: boolean;
  metronomeTempo: number;
  metronomeVolume: number;
  practiceMode: boolean;
  selectedSheet: string | null;
  sheetFile: File | null;
  initialChatMessages: ChatMessage[];
  teacherName: string;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onShareScreen: () => void;
  onFileUpload: () => void;
  onEndLesson: () => void;
  setActiveTab: (tab: string) => void;
  setMetronomeTempo: (tempo: number) => void;
  setMetronomeVolume: (volume: number) => void;
  onToggleMetronome: () => void;
  onToggleMidiPanel: () => void;
  onTogglePracticeMode: () => void;
}

export function VideoContent({
  videoEnabled,
  micEnabled,
  activeTab,
  metronomeActive,
  metronomeTempo,
  metronomeVolume,
  practiceMode,
  selectedSheet,
  sheetFile,
  initialChatMessages,
  teacherName,
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
  onTogglePracticeMode
}: VideoContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-[calc(90vh-4rem)]">
      {/* 메인 화상 영역 - 3/4 */}
      <div className="col-span-1 md:col-span-3 h-full flex flex-col">
        {/* 비디오 영역 또는 연습 영역 */}
        {practiceMode ? (
          <PracticeArea 
            onTogglePracticeMode={onTogglePracticeMode} 
            practiceMode={practiceMode}
            selectedSheet={selectedSheet}
            sheetFile={sheetFile}
          />
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
          onToggleMic={onToggleMic}
          onToggleVideo={onToggleVideo}
          onShareScreen={onShareScreen}
          onFileUpload={onFileUpload}
          onEndLesson={onEndLesson}
          setActiveTab={setActiveTab}
          setMetronomeTempo={setMetronomeTempo}
          setMetronomeVolume={setMetronomeVolume}
          onToggleMetronome={onToggleMetronome}
          onToggleMidiPanel={onToggleMidiPanel}
          practiceMode={practiceMode}
          onTogglePracticeMode={onTogglePracticeMode}
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
              teacherName={teacherName}
            />
          </TabsContent>
          
          <TabsContent value="midi" className="flex-1 overflow-y-auto p-4">
            <MidiConnectionPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
