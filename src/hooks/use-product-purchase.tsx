
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductPurchaseProps {
  name: string;
  price: number;
  description: string;
}

export const useProductPurchase = ({ name, price, description }: ProductPurchaseProps) => {
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
        description: `${name} ${price.toLocaleString()}원 결제가 완료되었습니다.`,
      });
    }, 2000);
  };
  
  const addToCart = () => {
    toast({ title: "장바구니에 추가되었습니다" });
  };

  return {
    previewOpen,
    setPreviewOpen,
    purchaseOpen,
    setPurchaseOpen,
    paymentMethodOpen,
    setPaymentMethodOpen,
    paymentSuccess, 
    setPaymentSuccess,
    handlePayment,
    handlePaymentSuccess,
    addToCart
  };
};
