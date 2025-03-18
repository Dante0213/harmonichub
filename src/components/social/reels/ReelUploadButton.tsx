
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const ReelUploadButton = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "파일을 선택해주세요",
        variant: "destructive",
        duration: 1000
      });
      return;
    }

    setIsUploading(true);
    
    // 실제 업로드 로직은 여기에 구현합니다
    // 현재는 시뮬레이션만 합니다
    setTimeout(() => {
      setIsUploading(false);
      setOpen(false);
      setFile(null);
      setContent("");
      
      toast({
        title: "릴스 업로드 완료",
        description: "릴스가 성공적으로 업로드되었습니다",
        duration: 1000
      });
    }, 1500);
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        size="sm"
        className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <Upload className="h-4 w-4" />
        릴스 올리기
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-purple-400" />
              새 릴스 업로드
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="reelVideo" className="text-sm font-medium">
                음악 릴스 동영상
              </label>
              <Input
                id="reelVideo"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-xs text-muted-foreground">
                  선택됨: {file.name}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="reelContent" className="text-sm font-medium">
                내용
              </label>
              <Textarea
                id="reelContent"
                placeholder="릴스에 대한 설명을 입력하세요. 해시태그를 사용해보세요!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isUploading}
            >
              취소
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? "업로드 중..." : "업로드"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
