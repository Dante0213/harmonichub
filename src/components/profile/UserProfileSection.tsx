
import { Reel } from "@/components/social/reels/ReelsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";

interface UserProfileSectionProps {
  userData: Reel;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
  onFavoritesClick?: () => void;
}

export const UserProfileSection = ({ 
  userData, 
  onFollowersClick,
  onFollowingClick,
  onFavoritesClick
}: UserProfileSectionProps) => {
  // 팔로워, 팔로잉, 찜한 선생님 수를 표시하는 통계 섹션 추가
  const handleFollowersClick = () => {
    if (onFollowersClick) onFollowersClick();
  };

  const handleFollowingClick = () => {
    if (onFollowingClick) onFollowingClick();
  };

  const handleFavoritesClick = () => {
    if (onFavoritesClick) onFavoritesClick();
  };

  return (
    <div className="relative">
      <div className="h-24 w-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-t-md"></div>
      <div className="absolute -bottom-12 left-6 flex items-end">
        <Avatar className="h-20 w-20 border-4 border-background">
          {userData.imageUrl ? (
            <AvatarImage src={userData.imageUrl} alt={userData.user} />
          ) : (
            <AvatarFallback className="text-2xl">{userData.avatar}</AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className="flex justify-end pb-2">
        {userData.isProfessional && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Music className="h-3 w-3" fill="currentColor" />
            <span>전문가</span>
          </Badge>
        )}
      </div>
      <div className="mt-12 ml-6">
        <h2 className="text-2xl font-bold">{userData.user}</h2>
        <p className="text-muted-foreground">@{userData.userHandle}</p>
        
        {/* 통계 섹션 추가 */}
        <div className="flex space-x-4 mt-3">
          <button 
            onClick={handleFollowersClick}
            className="text-sm hover:underline focus:outline-none"
          >
            <span className="font-semibold">0</span> 팔로워
          </button>
          <button 
            onClick={handleFollowingClick}
            className="text-sm hover:underline focus:outline-none"
          >
            <span className="font-semibold">0</span> 팔로잉
          </button>
          <button 
            onClick={handleFavoritesClick}
            className="text-sm hover:underline focus:outline-none"
          >
            <span className="font-semibold">0</span> 찜한 선생님
          </button>
        </div>
      </div>
    </div>
  );
};
