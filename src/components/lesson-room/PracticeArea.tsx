
import { PianoKeyboard } from "./PianoKeyboard";
import { Music, Play, Pause, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef } from "react";

interface PracticeAreaProps {
  onTogglePracticeMode: () => void;
  practiceMode: boolean;
  selectedSheet?: string | null;
  sheetFile?: File | null;
}

export function PracticeArea({ 
  onTogglePracticeMode, 
  practiceMode, 
  selectedSheet, 
  sheetFile 
}: PracticeAreaProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3분 (예시)
  const [volume, setVolume] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  
  // PDF 객체 URL
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);

  // 선택된 악보나 파일이 변경되면 PDF 객체 URL 업데이트
  useEffect(() => {
    if (sheetFile) {
      const objectUrl = URL.createObjectURL(sheetFile);
      setPdfObjectUrl(objectUrl);
      
      // 컴포넌트 언마운트시 객체 URL 해제
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPdfObjectUrl(null);
    }
  }, [sheetFile]);

  // 오디오 객체를 통한 재생 처리
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // 선택된 악보에 따라 오디오 파일 설정 (예시)
      if (selectedSheet) {
        // 실제로는 서버에서 해당 악보에 맞는 오디오 파일 URL을 가져와야 함
        audioRef.current.src = `/audio/${selectedSheet}.mp3`;
      } else {
        audioRef.current.src = '/audio/default-piano.mp3';
      }
      
      // 오디오 이벤트 리스너
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current = null;
      }
    };
  }, [selectedSheet]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current && value.length > 0) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current && value.length > 0) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  // 악보 표시 컴포넌트
  const SheetDisplay = () => {
    if (pdfObjectUrl) {
      return (
        <object 
          data={pdfObjectUrl} 
          type="application/pdf" 
          width="100%" 
          height="100%"
          className="w-full h-full"
        >
          <p>PDF를 표시할 수 없습니다. <a href={pdfObjectUrl} target="_blank" rel="noopener noreferrer">다운로드</a></p>
        </object>
      );
    }
    
    if (selectedSheet) {
      return (
        <div className="flex flex-col items-center justify-center">
          <FileText className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">{selectedSheet}</p>
          <p className="text-gray-500 text-sm">선택된 악보가 표시됩니다</p>
        </div>
      );
    }
    
    return (
      <p className="text-gray-500">왼쪽 라이브러리에서 악보를 선택하세요</p>
    );
  };

  // 오디오 플레이어 컴포넌트
  const AudioPlayer = () => {
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
          onValueChange={(value) => handleProgressChange(value)}
          className="mb-4"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-1/3">
            <span className="text-sm">음량:</span>
            <Slider 
              value={volume} 
              max={100} 
              step={1}
              onValueChange={handleVolumeChange}
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
    );
  };

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-auto">
        {/* 악보 영역 */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4">
          {/* 연습 모드 텍스트 제거 */}
          
          {/* 악보 표시 영역 */}
          <div 
            className="w-full aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center mb-4 overflow-hidden"
            ref={pdfContainerRef}
          >
            <SheetDisplay />
          </div>
          
          {/* 음원 플레이어 UI */}
          <AudioPlayer />
        </div>
      </div>
      
      {/* 피아노 건반 */}
      <PianoKeyboard />
    </div>
  );
}
