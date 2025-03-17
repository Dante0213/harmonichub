
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ChatDialog } from "./chat/ChatDialog";
import { ProfileModalInfo } from "./profile/ProfileModalInfo";
import { ProfileTabsContent } from "./profile/ProfileTabsContent";
import { Reel } from "./reels/ReelsData";

interface UserProfileModalProps {
  user: Reel;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const handleChatOpen = () => {
    setIsChatOpen(true);
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
    </Dialog>
  );
};
