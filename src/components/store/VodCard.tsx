
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useProductPurchase } from "@/hooks/use-product-purchase";
import { ProductPurchaseModals } from "./common/ProductPurchaseModals";

interface VodCardProps {
  name: string;
  price: number;
  description: string;
  instructor: string;
  level: string;
  duration: string;
}

export const VodCard = ({ name, price, description, instructor, level, duration }: VodCardProps) => {
  const {
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
  } = useProductPurchase({ name, price, description });
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">
              {name}
            </CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={addToCart}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
            <span className="text-muted-foreground">강의 썸네일</span>
          </div>
          <p className="mb-4 text-sm">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
              {level}
            </div>
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
              {duration}
            </div>
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
              강사: {instructor}
            </div>
          </div>
          <p className="text-lg font-semibold">₩{price.toLocaleString()}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={() => setPurchaseOpen(true)}>구매하기</Button>
          <Button className="flex-1" variant="outline" onClick={() => setPreviewOpen(true)}>미리보기</Button>
        </CardFooter>
      </Card>

      <ProductPurchaseModals
        name={name}
        price={price}
        description={description}
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        purchaseOpen={purchaseOpen}
        setPurchaseOpen={setPurchaseOpen}
        paymentMethodOpen={paymentMethodOpen}
        setPaymentMethodOpen={setPaymentMethodOpen}
        paymentSuccess={paymentSuccess}
        setPaymentSuccess={setPaymentSuccess}
        handlePayment={handlePayment}
        handlePaymentSuccess={handlePaymentSuccess}
        isProduct={false}
        instructorInfo={instructor}
        levelInfo={level}
        durationInfo={duration}
      />
    </>
  );
};
