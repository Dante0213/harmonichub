
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Reel } from "@/components/social/reels/ReelsData";
import { ProfileModalHeader } from "./modal/ProfileModalHeader";
import { ProfileModalForm } from "./modal/ProfileModalForm";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Reel;
  onUpdate: (updatedData: Reel) => void;
}

export const ProfileEditModal = ({ isOpen, onClose, userData, onUpdate }: ProfileEditModalProps) => {
  const handleSubmit = async (updatedData: Reel) => {
    onUpdate(updatedData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <ProfileModalHeader title="프로필 수정" />
        <ProfileModalForm 
          userData={userData} 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};
