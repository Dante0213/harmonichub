
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BasicInfoForm } from "./BasicInfoForm";
import { useBasicInfo } from "./useBasicInfo";

interface BasicInfoChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BasicInfoChangeModal({ open, onOpenChange }: BasicInfoChangeModalProps) {
  const { isSubmitting, handleSubmit, initialValues } = useBasicInfo(open, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>기본 정보 변경</DialogTitle>
          <DialogDescription>
            회원 정보를 수정하세요. 입력이 완료되면 저장 버튼을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <BasicInfoForm 
          defaultValues={initialValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
