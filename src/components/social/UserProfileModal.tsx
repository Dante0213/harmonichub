
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ChatDialog } from "./chat/ChatDialog";
import { UserProfileModalContent } from "./profile/UserProfileModalContent";
import { Reel } from "./reels/ReelsData";
import { TeacherScheduleModal } from "../teachers/TeacherScheduleModal";

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
        
        <UserProfileModalContent 
          user={user}
          onChatOpen={handleChatOpen}
          onScheduleOpen={handleScheduleOpen}
        />
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
          teacherName={user.user || "선생님"}
          teacherId={typeof user.id === 'string' ? parseInt(user.id, 10) : user.id}
        />
      )}
    </Dialog>
  );
};
