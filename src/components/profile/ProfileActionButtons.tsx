
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, MessageSquare, PenSquare } from "lucide-react";
import { Reel } from "@/components/social/reels/ReelsData";
import { useSocial } from "@/pages/Social";
import { useToast } from "@/hooks/use-toast";

interface ProfileActionButtonsProps {
  userData: Reel;
  isCurrentUser?: boolean;
  onEditClick?: () => void;
  onChatOpen?: () => void;
}

export const ProfileActionButtons = ({ 
  userData, 
  isCurrentUser = false, 
  onEditClick,
  onChatOpen
}: ProfileActionButtonsProps) => {
  const { isFollowing, followUser, unfollowUser } = useSocial();
  const following = isFollowing(userData.id);
  const { toast } = useToast();
  
  const handleFollowToggle = () => {
    if (following) {
      unfollowUser(userData.id);
      toast({
        title: "팔로우 취소됨",
        description: `${userData.userHandle}님을 더 이상 팔로우하지 않습니다.`,
        duration: 1000
      });
    } else {
      followUser(userData);
      toast({
        title: "팔로우 추가됨",
        description: `${userData.userHandle}님을 팔로우합니다.`,
        duration: 1000
      });
    }
  };

  if (isCurrentUser) {
    return (
      <Button 
        className="w-full h-10" 
        variant="outline"
        onClick={onEditClick}
      >
        <PenSquare className="h-4 w-4 mr-2" />
        프로필 수정
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button 
        className="flex-1 h-10"
        onClick={handleFollowToggle}
        variant={following ? "outline" : "default"}
      >
        {following ? (
          <>
            <UserCheck className="h-4 w-4 mr-2" />
            팔로잉
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4 mr-2" />
            팔로우
          </>
        )}
      </Button>
      <Button 
        variant="outline" 
        className="flex-1 h-10"
        onClick={onChatOpen}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        1:1 대화하기
      </Button>
    </div>
  );
};
