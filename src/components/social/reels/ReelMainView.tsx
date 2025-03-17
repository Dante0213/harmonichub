
import { ReelUserInfo } from "./ReelUserInfo";
import { Reel } from "./ReelsData";
import { useState, useRef } from "react";
import { ReelVideoPlayer } from "./ReelVideoPlayer";
import { ReelInteractionButtons } from "./ReelInteractionButtons";
import { ReelComments } from "./ReelComments";
import { useToast } from "@/hooks/use-toast";

interface ReelMainViewProps {
  reel: Reel;
  onUserClick?: (user: Reel) => void;
}

export const ReelMainView = ({ reel, onUserClick }: ReelMainViewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(reel.isLiked || false);
  const [likeCount, setLikeCount] = useState(reel.likeCount || reel.likes || 0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { toast } = useToast();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const copyLinkToClipboard = () => {
    const reelUrl = `${window.location.origin}/reel/${reel.id}`;
    navigator.clipboard.writeText(reelUrl);
    toast({
      title: "링크가 복사되었습니다",
      duration: 2000
    });
  };

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
      <ReelVideoPlayer
        videoUrl={reel.videoUrl || "https://example.com/placeholder.mp4"}
        isMuted={isMuted}
        volume={volume}
        onVideoClick={togglePlay}
        isPlaying={isPlaying}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <ReelInteractionButtons
            isLiked={isLiked}
            likeCount={likeCount}
            commentCount={reel.commentCount || reel.comments || 0}
            isMuted={isMuted}
            volume={volume}
            onLikeToggle={toggleLike}
            onCommentToggle={() => setIsCommentsOpen(true)}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={toggleMute}
            onCopyLink={copyLinkToClipboard}
          />
          
          <ReelUserInfo reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
          
          <div className="mb-12">
            <p className="text-base mb-2">{reel.description || reel.content}</p>
            <div className="flex flex-wrap gap-2">
              {reel.hashtags && reel.hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ReelComments 
        reel={reel} 
        isOpen={isCommentsOpen} 
        onOpenChange={setIsCommentsOpen} 
      />
    </div>
  );
};
