
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Music, Image as ImageIcon, Video, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Homework {
  title: string;
  date: string;
  teacher: string;
  status: string;
  feedback: string;
  fileType?: "image" | "audio" | "video" | "document";
  fileUrl?: string;
}

interface HomeworkDetailModalProps {
  homework: Homework | null;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmit: (feedback: string) => void;
  isTeacherView?: boolean;
}

export const HomeworkDetailModal = ({
  homework,
  isOpen,
  onClose,
  onFeedbackSubmit,
  isTeacherView = false
}: HomeworkDetailModalProps) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!homework) return null;

  const getFileIcon = () => {
    switch (homework.fileType) {
      case "image":
        return <ImageIcon className="h-10 w-10 text-blue-500" />;
      case "audio":
        return <Music className="h-10 w-10 text-purple-500" />;
      case "video":
        return <Video className="h-10 w-10 text-red-500" />;
      default:
        return <FileText className="h-10 w-10 text-green-500" />;
    }
  };

  const getFilePreview = () => {
    if (!homework.fileUrl) {
      return (
        <div className="flex items-center justify-center bg-muted h-40 rounded-md">
          {getFileIcon()}
          <p className="ml-2 text-muted-foreground">미리보기를 사용할 수 없습니다</p>
        </div>
      );
    }

    switch (homework.fileType) {
      case "image":
        return (
          <div className="flex justify-center">
            <img
              src={homework.fileUrl}
              alt={homework.title}
              className="max-h-80 object-contain rounded-md"
            />
          </div>
        );
      case "audio":
        return (
          <audio controls className="w-full my-4">
            <source src={homework.fileUrl} />
            브라우저가 오디오 재생을 지원하지 않습니다.
          </audio>
        );
      case "video":
        return (
          <video controls className="w-full max-h-80 object-contain rounded-md">
            <source src={homework.fileUrl} />
            브라우저가 비디오 재생을 지원하지 않습니다.
          </video>
        );
      default:
        return (
          <div className="flex items-center justify-center bg-muted h-40 rounded-md">
            {getFileIcon()}
            <p className="ml-2">문서 파일 ({homework.fileUrl.split('.').pop()})</p>
          </div>
        );
    }
  };

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      toast({
        title: "피드백을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // 실제 구현에서는 여기에 API 호출을 하고 응답을 기다린 후 처리합니다
    setTimeout(() => {
      onFeedbackSubmit(feedback);
      setFeedback("");
      setIsSubmitting(false);
      toast({
        title: "피드백 제출 완료",
        description: "학생에게 피드백이 전송되었습니다.",
      });
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{homework.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 과제 정보 */}
          <div className="flex flex-wrap justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">제출일:</span>
              <span>{homework.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">선생님:</span>
              <span>{homework.teacher}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">상태:</span>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                homework.status === "완료" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {homework.status}
              </span>
            </div>
          </div>

          {/* 파일 미리보기 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">과제 파일</h3>
            {getFilePreview()}
          </div>

          {/* 피드백 표시 (학생 뷰) */}
          {!isTeacherView && homework.feedback && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                선생님 피드백
              </h3>
              <p className="text-sm whitespace-pre-line">{homework.feedback}</p>
            </div>
          )}

          {/* 피드백 입력 (선생님 뷰) */}
          {isTeacherView && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">피드백 작성</h3>
              <Textarea
                placeholder="학생에게 전달할 피드백을 작성해주세요..."
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          {isTeacherView ? (
            <Button 
              onClick={handleSubmitFeedback} 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? "제출 중..." : (
                <>
                  <Send className="h-4 w-4" />
                  피드백 제출
                </>
              )}
            </Button>
          ) : (
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
