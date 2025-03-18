
import { Layout } from "@/components/layout/Layout";
import { useState, useRef, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { PracticeArea } from "@/components/lesson-room/PracticeArea";
import { ControlBar } from "@/components/lesson-room/ControlBar";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MidiConnectionPanel } from "@/components/lesson-room/MidiConnectionPanel";
import { createMetronomeClick } from "@/components/lesson-room/metronomeUtils";
import { SheetLibrary } from "@/components/lesson-room/SheetLibrary";
import { MetronomePanel } from "@/components/lesson-room/MetronomePanel";

const PracticeRoom = () => {
  const [activeTab, setActiveTab] = useState("library");
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [metronomeTempo, setMetronomeTempo] = useState(120);
  const [metronomeVolume, setMetronomeVolume] = useState(50);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetFile, setSheetFile] = useState<File | null>(null);
  const metronomeIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // 연습 모드는 항상 true (이 페이지는 연습실이므로)
  const practiceMode = true;

  // 메트로놈 정리 (언마운트 시)
  useEffect(() => {
    return () => {
      if (metronomeIntervalRef.current) {
        window.clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    };
  }, []);

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

  const handleEndSession = () => {
    if (confirm("연습을 종료하시겠습니까?")) {
      toast.info("연습이 종료되었습니다.");
      // 메트로놈 정리
      if (metronomeIntervalRef.current) {
        window.clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      // 홈으로 이동
      window.location.href = '/';
    }
  };

  const handleSheetSelect = (sheetTitle: string) => {
    setSelectedSheet(sheetTitle);
    setSheetFile(null);
    toast.success(`'${sheetTitle}' 악보가 로드되었습니다.`);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSheetFile(file);
        setSelectedSheet(null);
        toast.success(`'${file.name}' 파일이 업로드되었습니다.`);
      } else {
        toast.error("PDF 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleMetronomeTempoChange = (value: number) => {
    setMetronomeTempo(value);
    if (metronomeActive && metronomeIntervalRef.current) {
      // 템포 변경 시 메트로놈 재시작
      window.clearInterval(metronomeIntervalRef.current);
      const intervalTime = 60000 / value;
      metronomeIntervalRef.current = window.setInterval(() => {
        createMetronomeClick(audioContextRef, metronomeVolume);
      }, intervalTime);
    }
  };

  const handleMetronomeVolumeChange = (value: number) => {
    setMetronomeVolume(value);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-4">연습실</h1>
        
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>
            연습실에서 악보를 보고 직접 연습할 수 있습니다. 메트로놈, MIDI 연결 등의 기능을 활용해 보세요.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-16rem)]">
          {/* 메인 영역 - 3/4 */}
          <div className="col-span-1 md:col-span-3 h-full flex flex-col border rounded-lg overflow-hidden">
            {/* 연습 영역 (악보 및 피아노 건반) */}
            <PracticeArea 
              onTogglePracticeMode={() => {}} 
              practiceMode={practiceMode}
              selectedSheet={selectedSheet}
              sheetFile={sheetFile}
            />
            
            {/* 컨트롤 바 */}
            <ControlBar 
              micEnabled={false}
              videoEnabled={false}
              metronomeActive={metronomeActive}
              metronomeTempo={metronomeTempo}
              metronomeVolume={metronomeVolume}
              onToggleMic={() => {}}
              onToggleVideo={() => {}}
              onShareScreen={() => {}}
              onFileUpload={handleFileUpload}
              onEndLesson={handleEndSession}
              setActiveTab={setActiveTab}
              setMetronomeTempo={setMetronomeTempo}
              setMetronomeVolume={setMetronomeVolume}
              onToggleMetronome={handleToggleMetronome}
              onToggleMidiPanel={() => setActiveTab('midi')}
              practiceMode={practiceMode}
              onTogglePracticeMode={() => {}}
            />
          </div>
          
          {/* 사이드바 - 1/4 */}
          <div className="col-span-1 h-full border rounded-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
                <TabsTrigger value="library">라이브러리</TabsTrigger>
                <TabsTrigger value="midi">MIDI</TabsTrigger>
                <TabsTrigger value="metronome">메트로놈</TabsTrigger>
              </TabsList>
              
              <TabsContent value="library" className="flex-1 overflow-y-auto p-4">
                <SheetLibrary 
                  selectedSheet={selectedSheet}
                  onSheetSelect={handleSheetSelect}
                  onFileUpload={handleFileUpload}
                  fileInputRef={fileInputRef}
                  onFileChange={handleFileChange}
                />
              </TabsContent>
              
              <TabsContent value="midi" className="flex-1 overflow-y-auto p-4">
                <MidiConnectionPanel />
              </TabsContent>
              
              <TabsContent value="metronome" className="flex-1 overflow-y-auto p-4">
                <MetronomePanel 
                  isActive={metronomeActive}
                  tempo={metronomeTempo}
                  volume={metronomeVolume}
                  onToggle={handleToggleMetronome}
                  onTempoChange={handleMetronomeTempoChange}
                  onVolumeChange={handleMetronomeVolumeChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticeRoom;
