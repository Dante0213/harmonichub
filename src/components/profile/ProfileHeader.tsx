
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reel } from "@/components/social/reels/ReelsData";
import { useState } from "react";
import { ChatDialog } from "@/components/social/chat/ChatDialog";
import { UserProfileSection } from "./UserProfileSection";
import { ProfileActionButtons } from "./ProfileActionButtons";

interface ProfileHeaderProps {
  userData: Reel;
  onEditClick?: () => void;
  isCurrentUser?: boolean;
}

export const ProfileHeader = ({ userData, onEditClick, isCurrentUser = true }: ProfileHeaderProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="relative pb-0">
          <UserProfileSection 
            userData={userData} 
            onEditClick={onEditClick}
            isCurrentUser={isCurrentUser}
          />
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-2">소개</h3>
            <p className="text-sm">{userData.bio}</p>
          </div>
          
          <ProfileActionButtons 
            userData={userData}
            isCurrentUser={isCurrentUser}
            onEditClick={onEditClick}
            onChatOpen={handleChatOpen}
          />
        </CardContent>
      </Card>
      
      {!isCurrentUser && (
        <ChatDialog 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          user={userData} 
        />
      )}
    </>
  );
};
