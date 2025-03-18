
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { VideoLessonRoomProps } from "./types";
import { useVideoLessonState } from "./hooks/useVideoLessonState";
import { VideoContent } from "./VideoContent";

export function VideoLessonRoom({ isOpen, onClose, lessonInfo }: VideoLessonRoomProps) {
  const {
    micEnabled,
    videoEnabled,
    activeTab,
    metronomeActive,
    metronomeTempo,
    metronomeVolume,
    practiceMode,
    selectedSheet,
    sheetFile,
    initialChatMessages,
    setActiveTab,
    setMetronomeTempo,
    setMetronomeVolume,
    handleToggleMic,
    handleToggleVideo,
    handleShareScreen,
    handleFileUpload,
    handleToggleMidiPanel,
    handleTogglePracticeMode,
    handleToggleMetronome
  } = useVideoLessonState(lessonInfo.teacherName);

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
        
        <VideoContent
          videoEnabled={videoEnabled}
          micEnabled={micEnabled}
          activeTab={activeTab}
          metronomeActive={metronomeActive}
          metronomeTempo={metronomeTempo}
          metronomeVolume={metronomeVolume}
          practiceMode={practiceMode}
          selectedSheet={selectedSheet}
          sheetFile={sheetFile}
          initialChatMessages={initialChatMessages}
          teacherName={lessonInfo.teacherName}
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
          onTogglePracticeMode={handleTogglePracticeMode}
        />
      </DialogContent>
    </Dialog>
  );
}
