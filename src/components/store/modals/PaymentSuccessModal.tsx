
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export const PaymentSuccessModal = ({ isOpen, onOpenChange, productName }: PaymentSuccessModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>결제 완료</AlertDialogTitle>
          <AlertDialogDescription>
            {productName} 상품 결제가 성공적으로 완료되었습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
