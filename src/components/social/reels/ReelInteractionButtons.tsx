
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Volume2, VolumeX, Link, Send } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface ReelInteractionButtonsProps {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isMuted: boolean;
  volume: number;
  onLikeToggle: () => void;
  onCommentToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  onMuteToggle: () => void;
  onCopyLink: () => void;
}

export const ReelInteractionButtons = ({
  isLiked,
  likeCount,
  commentCount,
  isMuted,
  volume,
  onLikeToggle,
  onCommentToggle,
  onVolumeChange,
  onMuteToggle,
  onCopyLink
}: ReelInteractionButtonsProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full bg-black/40 hover:bg-black/60 text-white ${isLiked ? 'text-pastel-pink' : ''}`}
        onClick={onLikeToggle}
      >
        <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
        <span className="text-xs absolute -bottom-5">{likeCount}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/40 hover:bg-black/60 text-white"
        onClick={onCommentToggle}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs absolute -bottom-5">{commentCount}</span>
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 bg-black/80 border-none text-white glass-effect">
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCopyLink}
              className="flex items-center gap-2 text-white hover:bg-white/20"
            >
              <Link className="w-4 h-4" />
              <span>링크 복사</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2 text-white hover:bg-white/20"
            >
              <Send className="w-4 h-4" />
              <span>다른 유저에게 보내기</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
            onClick={onMuteToggle}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 bg-black/80 border-none glass-effect">
          <div className="h-24 flex flex-col items-center justify-center">
            <Slider
              orientation="vertical"
              value={[volume]}
              onValueChange={onVolumeChange}
              max={100}
              step={1}
              className="h-full"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
