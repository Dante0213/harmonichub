
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Reel } from "../reels/ReelsData";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { UserProfileSection } from "@/components/profile/UserProfileSection";
import { ProfileActionButtons } from "@/components/profile/ProfileActionButtons";

interface ProfileModalInfoProps {
  user: Reel;
  onChatOpen: () => void;
}

export const ProfileModalInfo = ({ user, onChatOpen }: ProfileModalInfoProps) => {
  return (
    <>
      <div className="mb-4">
        <Card>
          <CardHeader className="relative pb-0">
            <UserProfileSection userData={user} />
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
