
import { Reel } from "@/components/social/reels/ReelsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";

interface UserProfileSectionProps {
  userData: Reel;
}

export const UserProfileSection = ({ userData }: UserProfileSectionProps) => {
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
      </div>
    </div>
  );
};
