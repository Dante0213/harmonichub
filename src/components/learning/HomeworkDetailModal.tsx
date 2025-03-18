
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePreview } from "./FilePreview";
import { HomeworkFeedback } from "./HomeworkFeedback";

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
  if (!homework) return null;

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
            <FilePreview 
              fileType={homework.fileType} 
              fileUrl={homework.fileUrl} 
              title={homework.title}
            />
          </div>

          {/* 피드백 표시 / 입력 */}
          <HomeworkFeedback 
            feedback={homework.feedback}
            isTeacherView={isTeacherView}
            onSubmit={onFeedbackSubmit}
            onClose={onClose}
          />
        </div>

        <DialogFooter>
          {!isTeacherView && (
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
