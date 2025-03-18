
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  description: string;
  videoUrl?: string;
  isProduct?: boolean;
}

export const PreviewModal = ({ 
  isOpen, 
  onOpenChange, 
  name,
  description,
  videoUrl,
  isProduct = false
}: PreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{name} - 미리보기</DialogTitle>
          <DialogDescription>상품 미리보기 이미지입니다.</DialogDescription>
        </DialogHeader>
        
        {isProduct ? (
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">미리보기 이미지</p>
              <p className="text-xs text-muted-foreground">미리보기 이미지는 실제 상품과 차이가 있을 수 있습니다.</p>
            </div>
          </div>
        ) : videoUrl ? (
          <div className="aspect-video">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full rounded-md"
              poster="/placeholder.svg"
            >
              브라우저가 비디오 재생을 지원하지 않습니다
            </video>
          </div>
        ) : (
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">비디오 미리보기를 사용할 수 없습니다</p>
          </div>
        )}
        
        <div className="mt-4">
          <h4 className="font-medium mb-1">상품 정보</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
