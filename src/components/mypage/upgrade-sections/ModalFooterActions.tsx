
import { Button } from "@/components/ui/button";

interface ModalFooterActionsProps {
  verifying: boolean;
  handleVerification: () => void;
  onCancel: () => void;
}

export function ModalFooterActions({ 
  verifying, 
  handleVerification, 
  onCancel 
}: ModalFooterActionsProps) {
  return (
    <>
      <Button variant="outline" onClick={onCancel}>
        취소
      </Button>
      <Button onClick={handleVerification} disabled={verifying}>
        {verifying ? "검증 중..." : "전문가 전환 신청"}
      </Button>
    </>
  );
}
