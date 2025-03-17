
import { useState, useEffect, useRef } from "react";
import { reelsData } from "./reels/ReelsData";
import { ReelMainView } from "./reels/ReelMainView";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reel } from "./reels/ReelsData";
import { UserProfileModal } from "./UserProfileModal";

export const SocialReelsFeed = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Reel | null>(null);
  const { toast } = useToast();
  const reelsContainerRef = useRef<HTMLDivElement>(null);

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

  // 사용자 프로필 보기
  const handleUserClick = (reel: Reel) => {
    setSelectedUser(reel);
    setShowProfileModal(true);
  };

  // 스크롤 이벤트로 릴스 전환
  useEffect(() => {
    const handleScroll = () => {
      if (!reelsContainerRef.current) return;
      
      const scrollPos = reelsContainerRef.current.scrollTop;
      const reelHeight = reelsContainerRef.current.clientHeight;
      const newIndex = Math.floor(scrollPos / reelHeight);
      
      if (newIndex !== activeReelIndex && newIndex >= 0 && newIndex < reelsData.length) {
        setActiveReelIndex(newIndex);
      }
    };

    const reelsContainer = reelsContainerRef.current;
    if (reelsContainer) {
      reelsContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (reelsContainer) {
        reelsContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeReelIndex]);

  const currentReel = reelsData[activeReelIndex];
  const isLiked = likes[currentReel.id] || false;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">릴스</h2>
      </div>
      
      <div ref={reelsContainerRef} className="h-[700px] overflow-y-auto snap-y snap-mandatory">
        {reelsData.map((reel, index) => (
          <div 
            key={reel.id} 
            className="h-[700px] snap-start snap-always"
          >
            <ReelMainView 
              reel={reel}
              isPlaying={isPlaying && activeReelIndex === index}
              isMuted={isMuted}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
              onMuteToggle={() => setIsMuted(!isMuted)}
              onPrevReel={prevReel}
              onNextReel={nextReel}
              onUserClick={() => handleUserClick(reel)}
            />
            
            <div className="flex justify-between items-center py-3 border-b mb-4">
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${isLiked ? 'text-red-500' : 'text-foreground'} flex items-center gap-1 p-0`}
                  onClick={() => toggleLike(reel.id)}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                  <span>{isLiked ? reel.likes + 1 : reel.likes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-foreground flex items-center gap-1 p-0"
                  onClick={handleComment}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{reel.comments}</span>
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
          </div>
        ))}
      </div>
      
      {showProfileModal && selectedUser && (
        <UserProfileModal 
          user={selectedUser} 
          isOpen={showProfileModal} 
          onClose={() => setShowProfileModal(false)} 
        />
      )}
    </>
  );
};
