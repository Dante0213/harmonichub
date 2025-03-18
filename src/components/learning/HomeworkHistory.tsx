
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText } from "lucide-react";
import { HomeworkDetailModal } from "./HomeworkDetailModal";
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

interface HomeworkHistoryProps {
  homeworks?: Homework[];
  showSubmitted?: boolean;
}

export const HomeworkHistory = ({ homeworks, showSubmitted = true }: HomeworkHistoryProps) => {
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const homeworkItems = homeworks || [
    { 
      title: "피아노 스케일 연습", 
      date: "2023-06-15", 
      teacher: "김지수", 
      status: "완료", 
      feedback: "스케일 연습이 많이 향상되었습니다. 계속해서 연습하세요.",
      fileType: "audio",
      fileUrl: "/samples/piano-scale.mp3"
    },
    { 
      title: "기타 코드 연습", 
      date: "2023-06-10", 
      teacher: "박현우", 
      status: "완료", 
      feedback: "코드 전환이 자연스러워졌습니다. 다음 수업에서는 스트로크 패턴을 연습해봅시다.",
      fileType: "video",
      fileUrl: "/samples/guitar-practice.mp4"
    },
    { 
      title: "드럼 리듬 패턴", 
      date: "2023-06-05", 
      teacher: "정태현", 
      status: "검토 중", 
      feedback: "",
      fileType: "document",
      fileUrl: "/samples/drum-notes.pdf"
    }
  ];

  const submittedHomeworks = [
    { 
      title: "바이올린 활 사용법", 
      date: "2023-06-20", 
      teacher: "이민지", 
      status: "제출 완료", 
      feedback: "",
      fileType: "video",
      fileUrl: "/samples/violin-bow.mp4"
    },
    { 
      title: "색소폰 음계 연습", 
      date: "2023-06-18", 
      teacher: "김지수", 
      status: "검토 중", 
      feedback: "",
      fileType: "audio",
      fileUrl: "/samples/saxophone-scales.mp3"
    }
  ];

  const handleViewDetail = (homework: Homework) => {
    setSelectedHomework(homework);
    setIsModalOpen(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    if (selectedHomework) {
      // 실제 애플리케이션에서는 API를 통해 피드백을 저장하고
      // 성공 시 상태를 업데이트합니다.
      
      // 예시 코드 - 실제로는 API 호출 후 갱신된 데이터를 받아와야 합니다
      const updatedHomeworks = homeworkItems.map(hw => {
        if (hw.title === selectedHomework.title && 
            hw.date === selectedHomework.date && 
            hw.teacher === selectedHomework.teacher) {
          return { ...hw, feedback, status: "완료" };
        }
        return hw;
      });

      // 실제 구현에서는 여기서 상태를 업데이트합니다
      // setHomeworkItems(updatedHomeworks);
      
      toast({
        title: "피드백이 저장되었습니다",
        description: "학생의 과제에 피드백이 반영되었습니다.",
      });
    }
  };

  return (
    <div className="space-y-4">
      {homeworkItems.map((homework, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg">{homework.title}</CardTitle>
                  <CardDescription>
                    {homework.date} | {homework.teacher} 선생님
                  </CardDescription>
                </div>
              </div>
              <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                homework.status === "완료" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {homework.status}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {homework.feedback ? (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">{homework.feedback}</p>
              </div>
            ) : (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">아직 피드백이 없습니다.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => handleViewDetail(homework)}>자세히 보기</Button>
            {homework.status === "완료" && (
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ClipboardCheck className="h-4 w-4" />
                다음 과제 확인
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}

      {/* 과제 상세 모달 */}
      <HomeworkDetailModal 
        homework={selectedHomework}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFeedbackSubmit={handleFeedbackSubmit}
        isTeacherView={false} // 학생 뷰 기준
      />
    </div>
  );
};
