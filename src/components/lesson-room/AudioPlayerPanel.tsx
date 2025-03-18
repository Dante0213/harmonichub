
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Stop, Volume2, VolumeX } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface AudioPlayerPanelProps {
  audioSrc?: string;
}

export function AudioPlayerPanel({ audioSrc = "/audio/default-piano.mp3" }: AudioPlayerPanelProps) {
  // 상태 관리
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // 오디오 객체 초기화
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.volume = volume / 100;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    audioRef.current = audio;
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 정지
  const stopAudio = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  // 음소거 토글
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };
  
  // 볼륨 변경
  const changeVolume = (value: number[]) => {
    if (!audioRef.current || value.length === 0) return;
    
    const newVolume = value[0];
    audioRef.current.volume = newVolume / 100;
    setVolume(newVolume);
    
    // 볼륨이 0이면 음소거 상태로 설정
    if (newVolume === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };
  
  // 시간 형식 변환 (초 -> MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // 재생 시간 변경
  const changePlayPosition = (value: number[]) => {
    if (!audioRef.current || value.length === 0) return;
    
    const newPosition = value[0];
    audioRef.current.currentTime = newPosition;
    setCurrentTime(newPosition);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">음원 플레이어</h2>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div className="flex items-center space-x-2">
          <Toggle pressed={isMuted} onPressedChange={toggleMute}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Toggle>
          <Slider 
            value={[volume]} 
            max={100} 
            step={1} 
            onValueChange={changeVolume}
            className="w-24"
          />
        </div>
      </div>
      
      <Slider 
        value={[currentTime]} 
        max={duration || 100} 
        step={0.1} 
        onValueChange={changePlayPosition}
        className="mb-4"
      />
      
      <div className="flex items-center justify-center space-x-4">
        <Button variant="outline" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button variant="outline" size="icon" onClick={stopAudio}>
          <Stop className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
