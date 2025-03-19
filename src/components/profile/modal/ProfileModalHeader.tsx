
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProfileModalHeaderProps {
  title: string;
}

export const ProfileModalHeader = ({ title }: ProfileModalHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>
  );
};
