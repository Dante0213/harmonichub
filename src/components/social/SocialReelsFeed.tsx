
import { useState, useEffect } from "react";
import { reelsData } from "./reels/ReelsData";
import { ReelMainView } from "./reels/ReelMainView";
import { ReelsThumbnailGrid } from "./reels/ReelsThumbnailGrid";
import { ReelUploadButton } from "./reels/ReelUploadButton";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SocialReelsFeed = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  // 다음 릴 보기
  const nextReel = () => {
    setActiveReelIndex((prev) => (prev + 1) % reelsData.length);
  };

  // 이전 릴 보기
  const prevReel = () => {
    setActiveReelIndex((prev) => (prev - 1 + reelsData.length) % reelsData.length);
  };

  // 좋아요 토글
  const toggleLike = (reelId: number) => {
    setLikes(prev => {
      const newLikes = { ...prev };
      newLikes[reelId] = !prev[reelId];
      
      if (newLikes[reelId]) {
        toast({
          title: "릴스를 좋아합니다",
          description: "이 릴스를 좋아요 목록에 추가했습니다",
        });
      }
      
      return newLikes;
    });
  };

  // 댓글 작성하기
  const handleComment = () => {
    toast({
      title: "댓글 작성",
      description: "댓글 작성 기능은 준비 중입니다",
    });
  };

  // 공유하기
  const handleShare = () => {
    toast({
      title: "릴스 공유",
      description: "릴스 공유 기능은 준비 중입니다",
    });
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

  const currentReel = reelsData[activeReelIndex];
  const isLiked = likes[currentReel.id] || false;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">릴스</h2>
        <ReelUploadButton />
      </div>
      
      <ReelMainView 
        reel={currentReel}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onPrevReel={prevReel}
        onNextReel={nextReel}
      />
      
      <div className="flex justify-between items-center py-3 border-b mb-4">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${isLiked ? 'text-red-500' : 'text-foreground'} flex items-center gap-1 p-0`}
            onClick={() => toggleLike(currentReel.id)}
          >
            <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
            <span>{isLiked ? currentReel.likes + 1 : currentReel.likes}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-foreground flex items-center gap-1 p-0"
            onClick={handleComment}
          >
            <MessageSquare className="w-5 h-5" />
            <span>{currentReel.comments}</span>
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-foreground flex items-center gap-1 p-0"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
          <span>공유</span>
        </Button>
      </div>
      
      <ReelsThumbnailGrid 
        reels={reelsData}
        activeReelIndex={activeReelIndex}
        onReelSelect={(index) => setActiveReelIndex(index)}
      />
    </>
  );
};
