
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ChatDialog } from "./chat/ChatDialog";
import { ProfileModalInfo } from "./profile/ProfileModalInfo";
import { ProfileTabsContent } from "./profile/ProfileTabsContent";
import { Reel } from "./reels/ReelsData";
import { TeacherScheduleModal } from "../teachers/TeacherScheduleModal";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface UserProfileModalProps {
  user: Reel;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  
  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleScheduleOpen = () => {
    setIsScheduleOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1000px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>사용자 프로필</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="md:w-1/3">
            <ProfileModalInfo 
              user={user} 
              onChatOpen={handleChatOpen} 
            />
            
            {/* 레슨 예약 버튼 추가 - 선생님인 경우에만 표시 */}
            {user.instruments && user.instruments.length > 0 && (
              <div className="mt-4">
                <Button 
                  className="w-full" 
                  onClick={handleScheduleOpen}
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
      </DialogContent>
      
      {isChatOpen && (
        <ChatDialog 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          user={user} 
        />
      )}

      {isScheduleOpen && (
        <TeacherScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          teacherName={user.user || "선생님"} // user.username 대신 user.user 사용
          teacherId={typeof user.id === 'string' ? parseInt(user.id, 10) : user.id} // ID를 number로 변환
        />
      )}
    </Dialog>
  );
};
