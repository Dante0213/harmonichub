
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reel } from "@/components/social/reels/ReelsData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FollowersView } from "@/components/social/profile/FollowersView";
import { FollowingView } from "@/components/social/profile/FollowingView";
import { FavoriteTeachersView } from "@/components/social/profile/FavoriteTeachersView";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PenSquare } from "lucide-react";
import { ProfileSections } from "./profile-sections/ProfileSections";

interface UserProfileSectionProps {
  userData: Reel;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
  onFavoritesClick?: () => void;
  onEditClick?: () => void;
  isCurrentUser?: boolean;
}

export const UserProfileSection = ({ 
  userData, 
  onFollowersClick, 
  onFollowingClick,
  onFavoritesClick,
  onEditClick,
  isCurrentUser = false
}: UserProfileSectionProps) => {
  const isProfessional = userData.isProfessional || false;
  
  const [activeSheet, setActiveSheet] = useState<'followers' | 'following' | 'favorites' | null>(null);
  
  const handleFollowersClick = () => {
    if (onFollowersClick) {
      onFollowersClick();
    } else {
      setActiveSheet('followers');
    }
  };
  
  const handleFollowingClick = () => {
    if (onFollowingClick) {
      onFollowingClick();
    } else {
      setActiveSheet('following');
    }
  };
  
  const handleFavoritesClick = () => {
    if (onFavoritesClick) {
      onFavoritesClick();
    } else {
      setActiveSheet('favorites');
    }
  };
  
  return (
    <>
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
        
        {/* 프로필 수정 버튼 - 닉네임 바로 아래로 이동 */}
        {isCurrentUser && (
          <Button
            className="w-full mt-2"
            variant="outline"
            onClick={onEditClick}
          >
            <PenSquare className="h-4 w-4 mr-2" />
            프로필 수정
          </Button>
        )}
        
        <div className="flex justify-between w-full mt-6 mb-2">
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={handleFollowersClick}
          >
            <p className="font-bold">156</p>
            <p className="text-sm text-muted-foreground">팔로워</p>
          </Button>
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={handleFollowingClick}
          >
            <p className="font-bold">98</p>
            <p className="text-sm text-muted-foreground">팔로잉</p>
          </Button>
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={handleFavoritesClick}
          >
            <p className="font-bold">42</p>
            <p className="text-sm text-muted-foreground">찜한 선생님</p>
          </Button>
        </div>
      </div>
      
      {/* 프로필 정보 섹션 - 분리된 컴포넌트 사용 */}
      <ProfileSections userData={userData} />
      
      {/* Sheet for followers */}
      <Sheet open={activeSheet === 'followers'} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>팔로워</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FollowersView onBack={() => setActiveSheet(null)} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Sheet for following */}
      <Sheet open={activeSheet === 'following'} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>팔로잉</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FollowingView onBack={() => setActiveSheet(null)} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Sheet for favorites */}
      <Sheet open={activeSheet === 'favorites'} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>찜한 선생님</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FavoriteTeachersView onBack={() => setActiveSheet(null)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
