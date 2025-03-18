
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  description: string;
  videoUrl?: string;
  isProduct?: boolean;
  instructorInfo?: string;
  levelInfo?: string;
  durationInfo?: string;
}

export const PreviewModal = ({ 
  isOpen, 
  onOpenChange, 
  name,
  description,
  videoUrl,
  isProduct = false,
  instructorInfo,
  levelInfo,
  durationInfo
}: PreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{name} - 미리보기</DialogTitle>
          <DialogDescription>
            {isProduct ? "상품 미리보기 이미지입니다." : "강의 미리보기 영상입니다."}
          </DialogDescription>
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
            <div className="text-center">
              <p className="text-muted-foreground mb-2">미리보기 영상</p>
              <p className="text-xs text-muted-foreground">미리보기 영상은 실제 강의 내용의 일부를 담고 있습니다.</p>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <h4 className="font-medium mb-1">
            {isProduct ? "상품 정보" : "강의 정보"}
          </h4>
          {!isProduct && instructorInfo && (
            <p className="text-sm text-muted-foreground mb-2">강사: {instructorInfo}</p>
          )}
          {!isProduct && levelInfo && (
            <p className="text-sm text-muted-foreground mb-2">난이도: {levelInfo}</p>
          )}
          {!isProduct && durationInfo && (
            <p className="text-sm text-muted-foreground mb-2">총 길이: {durationInfo}</p>
          )}
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
