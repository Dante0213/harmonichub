
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="flex items-center gap-2 mb-2 cursor-pointer" onClick={handleUserClick}>
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
          {reel.isTeacher && (
            <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
          )}
        </div>
      </div>
    </div>
  );
};
