
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { createMetronomeClick } from "../metronomeUtils";
import { ChatMessage } from "../types";

export function useVideoLessonState(teacherName: string) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("video");
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [metronomeTempo, setMetronomeTempo] = useState(120);
  const [metronomeVolume, setMetronomeVolume] = useState(50);
  const [showMidiPanel, setShowMidiPanel] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetFile, setSheetFile] = useState<File | null>(null);
  const metronomeIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 초기 채팅 메시지
  const initialChatMessages: ChatMessage[] = [
    {sender: "시스템", text: "레슨이 시작되었습니다. 화상 통화 및 다양한 기능을 사용할 수 있습니다."},
    {sender: teacherName, text: "안녕하세요! 오늘 레슨을 시작하겠습니다."}
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
        if (file.type === 'application/pdf') {
          setSheetFile(file);
          setSelectedSheet(null);
          toast.success(`파일 "${file.name}"이(가) 공유 준비되었습니다.`);
        } else {
          toast.error("PDF 파일만 업로드 가능합니다.");
        }
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

  return {
    micEnabled,
    videoEnabled,
    activeTab,
    metronomeActive,
    metronomeTempo,
    metronomeVolume,
    showMidiPanel,
    practiceMode,
    selectedSheet,
    sheetFile,
    initialChatMessages,
    metronomeIntervalRef,
    audioContextRef,
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
  };
}
