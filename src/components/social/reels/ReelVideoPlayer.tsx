
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

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

  // IntersectionObserver to handle video playback based on visibility
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (isPlaying && videoRef.current) {
            videoRef.current.play().catch(err => {
              console.log("Video play failed:", err);
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
  }, [isPlaying]);

  // Handle play/pause state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.log("Video play failed:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume and mute changes
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
      
      {/* Play/pause button in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!isPlaying && (
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
    </>
  );
};
