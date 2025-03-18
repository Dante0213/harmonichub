
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HomeworkFeedbackProps {
  feedback?: string;
  isTeacherView?: boolean;
  onSubmit?: (feedback: string) => void;
  onClose?: () => void;
}

export const HomeworkFeedback = ({ 
  feedback, 
  isTeacherView = false, 
  onSubmit,
  onClose
}: HomeworkFeedbackProps) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      toast({
        title: "피드백을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // 실제 구현에서는 여기에 API 호출을 하고 응답을 기다린 후 처리합니다
    setTimeout(() => {
      onSubmit?.(feedbackText);
      setFeedbackText("");
      setIsSubmitting(false);
      toast({
        title: "피드백 제출 완료",
        description: "학생에게 피드백이 전송되었습니다.",
      });
      onClose?.();
    }, 1000);
  };

  // 학생 뷰에서 피드백 표시
  if (!isTeacherView && feedback) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2 flex items-center">
          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
          선생님 피드백
        </h3>
        <p className="text-sm whitespace-pre-line">{feedback}</p>
      </div>
    );
  }

  // 선생님 뷰에서 피드백 입력
  if (isTeacherView) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">피드백 작성</h3>
        <Textarea
          placeholder="학생에게 전달할 피드백을 작성해주세요..."
          rows={5}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="resize-none"
        />
        <div className="flex justify-end mt-4">
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
        </div>
      </div>
    );
  }

  return null;
};
