
import { ReelUserInfo } from "./ReelUserInfo";
import { ReelControls } from "./ReelControls";
import { Reel } from "./ReelsData";
import { useState, useRef, useEffect } from "react";

interface ReelMainViewProps {
  reel: Reel;
  onUserClick?: (user: Reel) => void;
}

export const ReelMainView = ({ reel, onUserClick }: ReelMainViewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likeCount, setLikeCount] = useState(reel.likeCount);
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
          setIsPlaying(true);
          videoRef.current?.play();
        } else {
          setIsPlaying(false);
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

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={reel.videoUrl}
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <ReelUserInfo reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
          
          <div className="mb-4">
            <p className="text-base mb-2">{reel.description}</p>
            <div className="flex flex-wrap gap-2">
              {reel.hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ReelControls
        isPlaying={isPlaying}
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={reel.commentCount}
        onPlayToggle={togglePlay}
        onLikeToggle={toggleLike}
      />
    </div>
  );
};
