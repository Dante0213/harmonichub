
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PurchaseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: () => void;
  name: string;
  price: number;
  description: string;
}

export const PurchaseModal = ({ 
  isOpen, 
  onOpenChange, 
  onPurchase,
  name,
  price,
  description
}: PurchaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>결제하기</DialogTitle>
          <DialogDescription>상품을 구매하려면 아래 정보를 확인하세요.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <h4 className="font-medium text-lg">{name}</h4>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <span>상품가격</span>
            <span className="font-semibold">₩{price.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={onPurchase}>결제 진행하기</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
