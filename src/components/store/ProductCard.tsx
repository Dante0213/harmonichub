
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useProductPurchase } from "@/hooks/use-product-purchase";
import { ProductPurchaseModals } from "./common/ProductPurchaseModals";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  category?: string;
}

export const ProductCard = ({ name, price, description }: ProductCardProps) => {
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
        isProduct={true}
      />
    </>
  );
};
