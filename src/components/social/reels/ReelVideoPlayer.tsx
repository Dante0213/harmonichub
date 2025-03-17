
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
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
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl || "https://example.com/placeholder.mp4"}
        loop
        muted={isMuted}
        playsInline
        onClick={onVideoClick}
      />
      
      {/* 재생/일시정지 버튼 중앙에 배치 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white w-16 h-16"
            onClick={onVideoClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </Button>
        )}
      </div>
    </>
  );
};
