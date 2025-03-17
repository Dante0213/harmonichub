
import { useState, useEffect } from "react";
import { reelsData } from "./reels/ReelsData";
import { ReelMainView } from "./reels/ReelMainView";
import { ReelsThumbnailGrid } from "./reels/ReelsThumbnailGrid";

export const SocialReelsFeed = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // 다음 릴 보기
  const nextReel = () => {
    setActiveReelIndex((prev) => (prev + 1) % reelsData.length);
  };

  // 이전 릴 보기
  const prevReel = () => {
    setActiveReelIndex((prev) => (prev - 1 + reelsData.length) % reelsData.length);
  };

  // 자동 재생 기능
  useEffect(() => {
    let timer: number | undefined;
    if (isPlaying) {
      timer = window.setTimeout(() => {
        nextReel();
      }, 10000); // 10초마다 다음 릴로 넘어감
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, activeReelIndex]);

  return (
    <>
      <ReelMainView 
        reel={reelsData[activeReelIndex]}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onPrevReel={prevReel}
        onNextReel={nextReel}
      />
      
      <ReelsThumbnailGrid 
        reels={reelsData}
        activeReelIndex={activeReelIndex}
        onReelSelect={(index) => setActiveReelIndex(index)}
      />
    </>
  );
};
