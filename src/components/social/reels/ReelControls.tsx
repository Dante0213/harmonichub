
import { Button } from "@/components/ui/button";
import { 
  Heart, MessageSquare, Share2, Play, 
  Pause, Volume2, VolumeX
} from "lucide-react";

interface ReelControlsProps {
  isPlaying: boolean;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  onPlayToggle: () => void;
  onLikeToggle: () => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
}

export const ReelControls = ({ 
  isPlaying, 
  isLiked,
  likeCount,
  commentCount,
  onPlayToggle,
  onLikeToggle,
  isMuted,
  onMuteToggle
}: ReelControlsProps) => {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full bg-black/50 hover:bg-black/70 text-white ${isLiked ? 'text-red-500' : ''}`}
        onClick={onLikeToggle}
      >
        <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
        <span className="text-xs absolute -bottom-5">{likeCount}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/50 hover:bg-black/70 text-white"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs absolute -bottom-5">{commentCount}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/50 hover:bg-black/70 text-white"
      >
        <Share2 className="w-5 h-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/50 hover:bg-black/70 text-white mt-4"
        onClick={onPlayToggle}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </Button>
      
      {onMuteToggle && (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70 text-white"
          onClick={onMuteToggle}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      )}
    </div>
  );
};
