
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reel } from "@/components/social/reels/ReelsData";

interface UserProfileSectionProps {
  userData: Reel;
}

export const UserProfileSection = ({ userData }: UserProfileSectionProps) => {
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
        <div className="text-center flex-1">
          <p className="font-bold">42</p>
          <p className="text-sm text-muted-foreground">게시물</p>
        </div>
        <div className="text-center flex-1">
          <p className="font-bold">156</p>
          <p className="text-sm text-muted-foreground">팔로워</p>
        </div>
        <div className="text-center flex-1">
          <p className="font-bold">98</p>
          <p className="text-sm text-muted-foreground">팔로잉</p>
        </div>
      </div>
    </div>
  );
};
