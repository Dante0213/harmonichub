
import { PurchaseModal } from "../modals/PurchaseModal";
import { PaymentMethodModal } from "../modals/PaymentMethodModal";
import { PreviewModal } from "../modals/PreviewModal";
import { PaymentSuccessModal } from "../modals/PaymentSuccessModal";

interface ProductPurchaseModalsProps {
  name: string;
  price: number;
  description: string;
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  purchaseOpen: boolean;
  setPurchaseOpen: (open: boolean) => void;
  paymentMethodOpen: boolean;
  setPaymentMethodOpen: (open: boolean) => void;
  paymentSuccess: boolean;
  setPaymentSuccess: (open: boolean) => void;
  handlePayment: () => void;
  handlePaymentSuccess: () => void;
  // VOD specific props
  isProduct?: boolean;
  instructorInfo?: string;
  levelInfo?: string;
  durationInfo?: string;
}

export const ProductPurchaseModals = ({
  name,
  price,
  description,
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
  isProduct = true,
  instructorInfo,
  levelInfo,
  durationInfo
}: ProductPurchaseModalsProps) => {
  return (
    <>
      {/* 미리보기 모달 */}
      <PreviewModal 
        isOpen={previewOpen}
        onOpenChange={setPreviewOpen}
        name={name}
        description={description}
        isProduct={isProduct}
        instructorInfo={instructorInfo}
        levelInfo={levelInfo}
        durationInfo={durationInfo}
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
