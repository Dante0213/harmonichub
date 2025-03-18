
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reel } from "@/components/social/reels/ReelsData";
import { Button } from "@/components/ui/button";

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
  const isProfessional = userData.isProfessional || false;
  
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-32 w-32 mb-4">
        {userData.imageUrl ? (
          <AvatarImage src={userData.imageUrl} alt={userData.user} />
        ) : (
          <AvatarFallback className="text-4xl">{userData.avatar}</AvatarFallback>
        )}
      </Avatar>
      <h1 className="text-2xl font-bold">{userData.user}</h1>
      <p className="text-muted-foreground">@{userData.userHandle}</p>
      
      <div className="flex justify-between w-full mt-6 mb-2">
        <Button 
          variant="ghost" 
          className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
          onClick={onFollowersClick}
        >
          <p className="font-bold">156</p>
          <p className="text-sm text-muted-foreground">팔로워</p>
        </Button>
        <Button 
          variant="ghost" 
          className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
          onClick={onFollowingClick}
        >
          <p className="font-bold">98</p>
          <p className="text-sm text-muted-foreground">팔로잉</p>
        </Button>
        {isProfessional && (
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={onFavoritesClick}
          >
            <p className="font-bold">42</p>
            <p className="text-sm text-muted-foreground">찜한 선생님</p>
          </Button>
        )}
      </div>
    </div>
  );
};
