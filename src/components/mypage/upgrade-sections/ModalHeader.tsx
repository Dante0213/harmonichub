
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ModalHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="text-center text-xl">전문가 회원 전환</DialogTitle>
      <DialogDescription className="text-center">
        전문가 회원으로 전환하려면 아래 정보를 입력해주세요.
      </DialogDescription>
    </DialogHeader>
  );
}
