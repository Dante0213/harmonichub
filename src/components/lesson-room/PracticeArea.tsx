
import { PianoKeyboard } from "./PianoKeyboard";
import { useState, useEffect, useRef } from "react";
import { SheetDisplay } from "./SheetDisplay";
import { AudioPlayer } from "./AudioPlayer";

// 컴포넌트 인터페이스 정의
interface PracticeAreaProps {
  onTogglePracticeMode: () => void;
  practiceMode: boolean;
  selectedSheet?: string | null;
  sheetFile?: File | null;
}

// 메인 컴포넌트
export function PracticeArea({ 
  onTogglePracticeMode, 
  practiceMode, 
  selectedSheet, 
  sheetFile 
}: PracticeAreaProps) {
  // 상태 관리
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

  // 이벤트 핸들러 및 유틸리티 함수
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
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

  // 렌더링
  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-auto">
        {/* 악보 영역 */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4">
          {/* 악보 표시 영역 */}
          <div 
            className="w-full aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center mb-4 overflow-hidden"
            ref={pdfContainerRef}
          >
            <SheetDisplay pdfObjectUrl={pdfObjectUrl} selectedSheet={selectedSheet || null} />
          </div>
          
          {/* 음원 플레이어 UI */}
          <AudioPlayer 
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isPlaying={isPlaying}
            selectedSheet={selectedSheet || null}
            onProgressChange={handleProgressChange}
            onVolumeChange={handleVolumeChange}
            onTogglePlay={togglePlay}
          />
        </div>
      </div>
    </div>
  );
}
