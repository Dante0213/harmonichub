
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Reel } from "../reels/ReelsData";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { UserProfileSection } from "@/components/profile/UserProfileSection";
import { ProfileActionButtons } from "@/components/profile/ProfileActionButtons";
import { useState } from "react";
import { FavoriteTeachersView } from "./FavoriteTeachersView";
import { FollowingView } from "./FollowingView";
import { FollowersView } from "./FollowersView";

interface ProfileModalInfoProps {
  user: Reel;
  onChatOpen: () => void;
}

export const ProfileModalInfo = ({ user, onChatOpen }: ProfileModalInfoProps) => {
  const [activeView, setActiveView] = useState<'profile' | 'followers' | 'following' | 'favorites'>('profile');
  
  const handleFollowersClick = () => {
    setActiveView('followers');
  };
  
  const handleFollowingClick = () => {
    setActiveView('following');
  };
  
  const handleFavoritesClick = () => {
    setActiveView('favorites');
  };
  
  if (activeView === 'followers') {
    return <FollowersView onBack={() => setActiveView('profile')} />;
  }
  
  if (activeView === 'following') {
    return <FollowingView onBack={() => setActiveView('profile')} />;
  }
  
  if (activeView === 'favorites') {
    return <FavoriteTeachersView onBack={() => setActiveView('profile')} />;
  }
  
  return (
    <>
      <div className="mb-4">
        <Card>
          <CardHeader className="relative pb-0">
            <UserProfileSection 
              userData={user}
              onFollowersClick={handleFollowersClick}
              onFollowingClick={handleFollowingClick}
              onFavoritesClick={handleFavoritesClick}
            />
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">소개</h3>
              <p className="text-sm">{user.bio}</p>
            </div>
            
            <ProfileActionButtons 
              userData={user}
              onChatOpen={onChatOpen}
            />
          </CardContent>
        </Card>
      </div>
      
      <ProfileInfo userData={user} />
    </>
  );
};
