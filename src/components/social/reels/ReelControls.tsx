
import { Button } from "@/components/ui/button";
import { 
  Heart, MessageSquare, Share2, Play, 
  Pause, Volume2, VolumeX
} from "lucide-react";
import { Reel } from "./ReelsData";

interface ReelControlsProps {
  reel: Reel;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}

export const ReelControls = ({ 
  reel, 
  isPlaying, 
  isMuted, 
  onPlayToggle, 
  onMuteToggle 
}: ReelControlsProps) => {
  return (
    <div className="flex items-center justify-between text-white">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" className="text-white flex items-center gap-1 p-0">
          <Heart className="w-5 h-5" />
          <span>{reel.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-white flex items-center gap-1 p-0">
          <MessageSquare className="w-5 h-5" />
          <span>{reel.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-white flex items-center gap-1 p-0">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-white p-0"
          onClick={onPlayToggle}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white p-0"
          onClick={onMuteToggle}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};
