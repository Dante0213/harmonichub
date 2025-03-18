
import { useToast } from "@/hooks/use-toast";

interface OnePointLessonRequest {
  teacherId: number;
  teacherName: string;
  studentName: string;
  date: string;
  time: string;
  instrument: string;
  level: string;
  additionalInfo: string;
}

export function useOnePointLesson() {
  const { toast } = useToast();

  const sendOnePointRequest = (request: OnePointLessonRequest) => {
    try {
      // 1. 로컬 스토리지에 요청 저장 (실제 구현에서는 API 호출로 대체)
      const storedRequests = localStorage.getItem('onePointRequests');
      const requests = storedRequests ? JSON.parse(storedRequests) : [];
      requests.push({
        ...request,
        id: Date.now(),
        status: 'pending',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('onePointRequests', JSON.stringify(requests));

      // 2. 이벤트 발생 - 채팅 시스템에 알림
      const onePointEvent = new CustomEvent('onePointLessonRequest', {
        detail: {
          teacherId: request.teacherId,
          teacherName: request.teacherName,
          message: `안녕하세요, ${request.teacherName} 선생님! ${request.date} ${request.time}에 ${request.instrument} 원포인트 레슨 요청드립니다. 레벨: ${request.level}, 추가 정보: ${request.additionalInfo}`
        }
      });
      window.dispatchEvent(onePointEvent);

      toast({
        title: "원포인트 레슨 요청 완료",
        description: `${request.teacherName} 선생님에게 원포인트 레슨 요청을 보냈습니다.`,
        duration: 1000,
      });

      return true;
    } catch (error) {
      console.error("원포인트 레슨 요청 실패:", error);
      toast({
        title: "요청 실패",
        description: "원포인트 레슨 요청 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 1000,
      });
      return false;
    }
  };

  return { sendOnePointRequest };
}
