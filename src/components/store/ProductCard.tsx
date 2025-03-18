
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();
  
  const handlePayment = () => {
    setPurchaseOpen(false);
    setPaymentMethodOpen(true);
  };

  const processPayment = () => {
    // 실제로는 여기서 결제 처리 API를 호출할 것입니다
    setPaymentMethodOpen(false);
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
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{name} - 미리보기</DialogTitle>
            <DialogDescription>상품 미리보기 이미지입니다.</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">미리보기 이미지</p>
              <p className="text-xs text-muted-foreground">미리보기 이미지는 실제 상품과 차이가 있을 수 있습니다.</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-1">상품 정보</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 구매하기 모달 */}
      <Dialog open={purchaseOpen} onOpenChange={setPurchaseOpen}>
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
            <Button className="w-full" onClick={handlePayment}>결제 진행하기</Button>
            <Button variant="outline" onClick={() => setPurchaseOpen(false)}>취소</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 결제 수단 선택 모달 */}
      <Dialog open={paymentMethodOpen} onOpenChange={setPaymentMethodOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>결제 수단 선택</DialogTitle>
            <DialogDescription>원하시는 결제 수단을 선택해주세요.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">신용카드 / 체크카드</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex-1 cursor-pointer">계좌이체</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone" className="flex-1 cursor-pointer">휴대폰 결제</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="virtual" id="virtual" />
                <Label htmlFor="virtual" className="flex-1 cursor-pointer">가상계좌</Label>
              </div>
            </RadioGroup>

            {paymentMethod === "card" && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="card-number">카드 번호</Label>
                  <Input id="card-number" placeholder="0000-0000-0000-0000" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">유효기간</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="000" className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="bank">은행 선택</Label>
                  <select id="bank" className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option>KB국민은행</option>
                    <option>신한은행</option>
                    <option>우리은행</option>
                    <option>하나은행</option>
                    <option>IBK기업은행</option>
                    <option>NH농협은행</option>
                  </select>
                </div>
              </div>
            )}

            {paymentMethod === "phone" && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="phone-number">휴대폰 번호</Label>
                  <Input id="phone-number" placeholder="010-0000-0000" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="carrier">통신사</Label>
                  <select id="carrier" className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option>SKT</option>
                    <option>KT</option>
                    <option>LG U+</option>
                    <option>알뜰폰</option>
                  </select>
                </div>
              </div>
            )}
            
            {paymentMethod === "virtual" && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  가상계좌는 결제 후 발급된 계좌로 입금하시면 결제가 완료됩니다.
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={processPayment}>결제하기</Button>
            <Button variant="outline" onClick={() => setPaymentMethodOpen(false)}>취소</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 결제 성공 알림 */}
      <AlertDialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>결제 완료</AlertDialogTitle>
            <AlertDialogDescription>
              {name} 상품 결제가 성공적으로 완료되었습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setPaymentSuccess(false)}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
