
import { ProfileModalInfo } from "./ProfileModalInfo";
import { ProfileTabsContent } from "./ProfileTabsContent";
import { Reel } from "../reels/ReelsData";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface UserProfileModalContentProps {
  user: Reel;
  onChatOpen: () => void;
  onScheduleOpen: () => void;
}

export const UserProfileModalContent = ({ 
  user, 
  onChatOpen, 
  onScheduleOpen 
}: UserProfileModalContentProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      <div className="md:w-1/3">
        <ProfileModalInfo 
          user={user} 
          onChatOpen={onChatOpen} 
        />
        
        {/* 레슨 예약 버튼 추가 - 선생님인 경우에만 표시 */}
        {user.instruments && user.instruments.length > 0 && (
          <div className="mt-4">
            <Button 
              className="w-full" 
              onClick={onScheduleOpen}
              variant="secondary"
            >
              <Calendar className="w-4 h-4 mr-2" />
              레슨 예약하기
            </Button>
          </div>
        )}
      </div>
      
      <div className="md:w-2/3">
        <ProfileTabsContent user={user} />
      </div>
    </div>
  );
};
