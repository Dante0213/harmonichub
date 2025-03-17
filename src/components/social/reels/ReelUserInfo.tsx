
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music, Heart, MessageSquare, Share2, Volume2 } from "lucide-react";
import { Reel } from "./ReelsData";

interface ReelUserInfoProps {
  reel: Reel;
  onUserClick?: (user: Reel) => void;
}

export const ReelUserInfo = ({ reel, onUserClick }: ReelUserInfoProps) => {
  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(reel);
    }
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1 cursor-pointer" onClick={handleUserClick}>
        <Avatar>
          {reel.imageUrl ? (
            <AvatarImage src={reel.imageUrl} alt={reel.user} />
          ) : (
            <AvatarFallback>{reel.avatar}</AvatarFallback>
          )}
        </Avatar>
        <div className="text-white">
          <div className="flex items-center gap-1">
            <p className="font-semibold">{reel.userHandle}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70 text-white"
        >
          <Heart className="w-5 h-5" />
        </Button>
        
        <Button 
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70 text-white"
        >
          <MessageSquare className="w-5 h-5" />
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
          className="rounded-full bg-black/50 hover:bg-black/70 text-white"
        >
          <Volume2 className="w-5 h-5" />
        </Button>
        
        {reel.isTeacher && (
          <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
        )}
      </div>
    </div>
  );
};
