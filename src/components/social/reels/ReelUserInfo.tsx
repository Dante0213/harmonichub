
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { Reel } from "./ReelsData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSocial } from "@/pages/Social";

interface ReelUserInfoProps {
  reel: Reel;
  onUserClick?: (user: Reel) => void;
}

export const ReelUserInfo = ({ reel, onUserClick }: ReelUserInfoProps) => {
  const { isFollowing, followUser, unfollowUser } = useSocial();
  const following = isFollowing(reel.id);
  const { toast } = useToast();

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(reel);
    }
  };

  const handleFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    
    if (following) {
      unfollowUser(reel.id);
    } else {
      followUser(reel);
    }
    
    toast({
      title: following ? "팔로우 취소됨" : "팔로우 추가됨",
      description: following ? `${reel.userHandle}님을 더 이상 팔로우하지 않습니다.` : `${reel.userHandle}님을 팔로우합니다.`,
      duration: 2000
    });
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="cursor-pointer" onClick={handleUserClick}>
        <Avatar className="border-2 border-white/30 hover:border-primary transition-colors">
          {reel.imageUrl ? (
            <AvatarImage src={reel.imageUrl} alt={reel.user} />
          ) : (
            <AvatarFallback>{reel.avatar}</AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className="text-white flex-grow">
        <div className="flex items-center gap-1">
          <p 
            className="font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={handleUserClick}
          >
            {reel.userHandle}
          </p>
          {reel.isTeacher && (
            <>
              <Music className="h-4 w-4 text-purple-500" />
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-6 border-white/30 text-white hover:bg-white/10 ml-1"
                onClick={handleFollowToggle}
              >
                {following ? "팔로잉" : "팔로우"}
              </Button>
            </>
          )}
        </div>
        <p className="text-xs text-gray-300">{reel.followers || "0"} 팔로워</p>
      </div>
    </div>
  );
};
