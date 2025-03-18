
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface VodCardProps {
  name: string;
  price: number;
  description: string;
  instructor: string;
  level: string;
  duration: string;
}

export const VodCard = ({ name, price, description, instructor, level, duration }: VodCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
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

      {/* 미리보기 모달 */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{name} - 미리보기</DialogTitle>
            <DialogDescription>강의 미리보기 영상입니다.</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">미리보기 영상</p>
              <p className="text-xs text-muted-foreground">미리보기 영상은 실제 강의 내용의 일부를 담고 있습니다.</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-1">강의 정보</h4>
            <p className="text-sm text-muted-foreground mb-2">강사: {instructor}</p>
            <p className="text-sm text-muted-foreground mb-2">난이도: {level}</p>
            <p className="text-sm text-muted-foreground">총 길이: {duration}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 구매하기 모달 */}
      <Dialog open={purchaseOpen} onOpenChange={setPurchaseOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>결제하기</DialogTitle>
            <DialogDescription>강의를 구매하려면 아래 정보를 확인하세요.</DialogDescription>
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
            <Button className="w-full">결제 진행하기</Button>
            <Button variant="outline" onClick={() => setPurchaseOpen(false)}>취소</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
