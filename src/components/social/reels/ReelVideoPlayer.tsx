
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReelVideoPlayerProps {
  videoUrl: string;
  isMuted: boolean;
  volume: number;
  onVideoClick: () => void;
  isPlaying: boolean;
}

export const ReelVideoPlayer = ({ 
  videoUrl, 
  isMuted, 
  volume, 
  onVideoClick, 
  isPlaying 
}: ReelVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // IntersectionObserver를 사용하여 화면에 보이는지 여부에 따라 비디오 재생 관리
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (isPlaying && videoRef.current && !error) {
            videoRef.current.play().catch(err => {
              console.log("비디오 재생 실패:", err);
              setError(true);
            });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isPlaying, error]);

  // 재생/일시정지 상태 변경 처리
  useEffect(() => {
    if (videoRef.current && !error) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.log("비디오 재생 실패:", err);
          setError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, error]);

  // 볼륨 및 음소거 변경 처리
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // 비디오 로드 에러 처리
  const handleVideoError = () => {
    console.log("비디오 로드 중 오류 발생");
    setError(true);
  };

  // 비디오 타임라인 업데이트
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((currentTime / duration) * 100);
        setCurrentTime(currentTime);
      }
    }
  };

  // 비디오 메타데이터 로드 시 실행 - 동영상 길이 설정
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // 시간을 분:초 형식으로 변환
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      {error ? (
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center text-white">
          <div className="text-center p-4">
            <p className="text-lg">비디오를 로드할 수 없습니다</p>
            <p className="text-sm text-gray-400 mt-2">나중에 다시 시도해주세요</p>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl || "https://example.com/placeholder.mp4"}
          loop
          muted={isMuted}
          playsInline
          onClick={onVideoClick}
          onError={handleVideoError}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
      
      {/* 재생/일시정지 버튼 중앙 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!isPlaying && !error && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white w-16 h-16 pointer-events-auto"
            onClick={onVideoClick}
          >
            <Play className="w-8 h-8" />
          </Button>
        )}
      </div>

      {/* 비디오 타임라인 */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-xs">{formatTime(currentTime)}</span>
          <Progress value={progress} className="h-1 flex-1" />
          <span className="text-white text-xs">{formatTime(duration)}</span>
        </div>
      </div>
    </>
  );
};
