
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, MessageSquare, PenSquare, Heart } from "lucide-react";
import { Reel } from "@/components/social/reels/ReelsData";
import { useSocial } from "@/pages/Social";
import { useProfileSocial } from "@/context/ProfileSocialContext";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  // 현재 경로에 따라 적절한 컨텍스트 사용
  const isProfilePage = location.pathname === "/profile";
  const socialContext = isProfilePage ? useProfileSocial() : useSocial();
  
  const { isFollowing, followUser, unfollowUser, isFavoriteTeacher, addFavoriteTeacher, removeFavoriteTeacher } = socialContext;
  const following = isFollowing(userData.id);
  const isFavorite = isFavoriteTeacher(userData.id);
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

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavoriteTeacher(userData.id);
      toast({
        title: "찜 취소됨",
        description: `${userData.userHandle}님을 찜 목록에서 제거했습니다.`,
        duration: 1000
      });
    } else {
      addFavoriteTeacher(userData);
      toast({
        title: "찜 추가됨",
        description: `${userData.userHandle}님을 찜 목록에 추가했습니다.`,
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

  // 전문가 사용자 여부 확인 (실제 구현 시 사용자 데이터에서 가져와야 함)
  const isProfessional = userData.isProfessional || false;

  return (
    <div className="flex gap-2 flex-wrap">
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
      
      {isProfessional && (
        <Button 
          variant={isFavorite ? "outline" : "secondary"} 
          className="flex-1 h-10"
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          {isFavorite ? '찜 취소' : '찜하기'}
        </Button>
      )}
      
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
