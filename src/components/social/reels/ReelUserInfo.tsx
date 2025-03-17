
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
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
    <div className="flex items-center gap-3 mb-2">
      <div 
        className="flex items-center gap-1 cursor-pointer" 
        onClick={handleUserClick}
      >
        <Avatar>
          <AvatarFallback>{reel.avatar}</AvatarFallback>
        </Avatar>
        <div className="text-white">
          <div className="flex items-center gap-1">
            <p className="font-semibold">{reel.userHandle}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {reel.isTeacher && (
          <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
        )}
        <Button 
          size="sm" 
          variant="secondary"
        >
          팔로우
        </Button>
      </div>
    </div>
  );
};
