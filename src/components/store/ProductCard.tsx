
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PurchaseModal } from "./modals/PurchaseModal";
import { PaymentMethodModal } from "./modals/PaymentMethodModal";
import { PreviewModal } from "./modals/PreviewModal";
import { PaymentSuccessModal } from "./modals/PaymentSuccessModal";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  category?: string;
}

export const ProductCard = ({ name, price, description }: ProductCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();
  
  const handlePayment = () => {
    setPurchaseOpen(false);
    setPaymentMethodOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    
    // 3초 후에 성공 알림 닫기
    setTimeout(() => {
      setPaymentSuccess(false);
      toast({
        title: "결제가 완료되었습니다",
        description: `${name} 상품을 성공적으로 구매하셨습니다.`,
      });
    }, 2000);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{name}</CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast({ title: "장바구니에 추가되었습니다" })}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-32 mb-4 bg-muted rounded-md flex items-center justify-center">
            <span className="text-muted-foreground">상품 이미지</span>
          </div>
          <p className="mb-4 text-sm">{description}</p>
          <p className="text-lg font-semibold">₩{price.toLocaleString()}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={() => setPurchaseOpen(true)}>구매하기</Button>
          <Button className="flex-1" variant="outline" onClick={() => setPreviewOpen(true)}>미리보기</Button>
        </CardFooter>
      </Card>

      {/* 미리보기 모달 */}
      <PreviewModal 
        isOpen={previewOpen}
        onOpenChange={setPreviewOpen}
        name={name}
        description={description}
        isProduct={true}
      />

      {/* 구매하기 모달 */}
      <PurchaseModal 
        isOpen={purchaseOpen}
        onOpenChange={setPurchaseOpen}
        onPurchase={handlePayment}
        name={name}
        price={price}
        description={description}
      />

      {/* 결제 수단 선택 모달 */}
      <PaymentMethodModal 
        isOpen={paymentMethodOpen}
        onOpenChange={setPaymentMethodOpen}
        onSuccess={handlePaymentSuccess}
        productName={name}
      />

      {/* 결제 성공 알림 */}
      <PaymentSuccessModal 
        isOpen={paymentSuccess}
        onOpenChange={setPaymentSuccess}
        productName={name}
      />
    </>
  );
};
