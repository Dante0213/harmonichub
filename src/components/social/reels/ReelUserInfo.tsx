
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { Reel } from "./ReelsData";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex items-center gap-2 mb-2" onClick={handleUserClick}>
      <Avatar className="cursor-pointer border-2 border-white/30 hover:border-primary transition-colors">
        {reel.imageUrl ? (
          <AvatarImage src={reel.imageUrl} alt={reel.user} />
        ) : (
          <AvatarFallback>{reel.avatar}</AvatarFallback>
        )}
      </Avatar>
      <div className="text-white">
        <div className="flex items-center gap-1">
          <p className="font-semibold cursor-pointer hover:text-primary transition-colors">{reel.userHandle}</p>
          {reel.isVerified && (
            <Badge variant="outline" className="text-xs px-1 py-0 h-5 border-purple-500 text-purple-400">인증됨</Badge>
          )}
          {reel.isTeacher && (
            <Music className="h-4 w-4 text-purple-500" />
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 text-xs h-6 border-white/30 text-white hover:bg-white/10"
          >
            팔로우
          </Button>
        </div>
        <p className="text-xs text-gray-300">{reel.followers || "0"} 팔로워</p>
      </div>
    </div>
  );
};
