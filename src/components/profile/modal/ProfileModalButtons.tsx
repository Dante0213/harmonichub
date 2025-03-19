
import { Button } from "@/components/ui/button";

interface ProfileModalButtonsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ProfileModalButtons = ({ onCancel, isSubmitting = false }: ProfileModalButtonsProps) => {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <Button type="button" variant="outline" onClick={onCancel}>
        취소
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
};
