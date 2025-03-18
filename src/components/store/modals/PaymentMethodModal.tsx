
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  productName: string;
}

export const PaymentMethodModal = ({ 
  isOpen, 
  onOpenChange, 
  onSuccess,
  productName
}: PaymentMethodModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const processPayment = () => {
    // 여기에서 결제 처리 로직을 구현할 수 있습니다
    onOpenChange(false);
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
