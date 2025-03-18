
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { AlignJustify, Zap } from "lucide-react";

import { ScheduleCalendar } from "./ScheduleCalendar";
import { TimeSlotSelection } from "./TimeSlotSelection";
import { TeacherScheduleModalProps, ScheduleItem } from "./types";
import { getTimeSlotsForDate, generateMockSchedule } from "./scheduleUtils";

export function TeacherScheduleModal({ isOpen, onClose, teacherName, teacherId }: TeacherScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isOnePointModalOpen, setIsOnePointModalOpen] = useState(false);
  const [onePointNote, setOnePointNote] = useState("");
  const [onePointRequested, setOnePointRequested] = useState(false);
  const { toast } = useToast();

  // 선생님 일정 데이터 불러오기
  useEffect(() => {
    // 실제로는 API를 통해 데이터를 가져와야 함
    // 여기서는 임시 데이터 사용
    const mockSchedule = generateMockSchedule();
    setSchedule(mockSchedule);
  }, [teacherId]);

  // 레슨 예약 처리
  const handleBookLesson = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "시간을 선택해주세요",
        description: "레슨 시간을 선택해야 예약이 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    // 실제로는 API를 통해 예약 처리
    toast({
      title: "레슨 예약 완료",
      description: `${teacherName} 선생님과 ${format(selectedDate, "yyyy년 MM월 dd일")} ${selectedTimeSlot} 레슨이 예약되었습니다.`,
    });
    onClose();
  };

  // 원포인트 레슨 요청 처리
  const handleOnePointRequest = () => {
    // 이미 요청했거나 쿨다운 시간이 끝나지 않았으면 요청 불가
    if (onePointRequested) {
      toast({
        title: "요청 제한",
        description: "원포인트 레슨은 1시간에 한 번만 요청할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }

    setIsOnePointModalOpen(true);
  };

  // 원포인트 레슨 요청 제출
  const handleSubmitOnePointRequest = () => {
    if (!onePointNote.trim()) {
      toast({
        title: "내용을 입력해주세요",
        description: "원포인트 레슨에 대한 내용을 입력해야 요청이 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    // 선생님의 메시지함으로 원포인트 레슨 요청 전송
    // 실제 구현에서는 API를 통해 데이터베이스에 저장
    sendOnePointRequestToTeacher(teacherId, teacherName, onePointNote);
    
    toast({
      title: "원포인트 레슨 요청 완료",
      description: "선생님께 원포인트 레슨 요청이 전송되었습니다.",
    });
    
    setOnePointRequested(true);
    setIsOnePointModalOpen(false);
    setOnePointNote("");
    
    // 1시간 후 다시 요청 가능하도록 설정
    setTimeout(() => {
      setOnePointRequested(false);
    }, 60 * 60 * 1000); // 1시간(밀리초)
  };

  // 선생님에게 원포인트 레슨 요청 메시지 전송
  const sendOnePointRequestToTeacher = (teacherId: number, teacherName: string, content: string) => {
    // 실제 구현에서는 이 부분이 API 호출이 됨
    // 여기서는 로컬 스토리지를 통해 시뮬레이션
    
    try {
      // 기존 메시지 가져오기 (실제로는 DB에서 가져와야 함)
      const storedMessages = localStorage.getItem('teacherMessages');
      let teacherMessages = storedMessages ? JSON.parse(storedMessages) : {};
      
      // 해당 선생님에 대한 메시지 배열이 없으면 생성
      if (!teacherMessages[teacherId]) {
        teacherMessages[teacherId] = [];
      }
      
      // 새 메시지 추가
      const newMessage = {
        id: Date.now(),
        sender: '학생', // 실제로는 로그인한 유저 정보 사용
        senderAvatar: 'ST', // 실제로는 유저 아바타 사용
        text: `원포인트 레슨 요청: ${content}`,
        timestamp: new Date(),
        read: false,
        isOnePointRequest: true
      };
      
      teacherMessages[teacherId].push(newMessage);
      
      // 저장 (실제로는 DB에 저장)
      localStorage.setItem('teacherMessages', JSON.stringify(teacherMessages));
      
      // 로컬 스토리지에 원포인트 레슨 요청 이벤트 트리거
      const onePointEvent = {
        type: 'onePointRequest',
        teacherId,
        teacherName,
        message: newMessage
      };
      localStorage.setItem('onePointRequestEvent', JSON.stringify(onePointEvent));
      
      // 이벤트 발생 알림을 위한 커스텀 이벤트 발생
      const event = new CustomEvent('onePointRequest', { detail: onePointEvent });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('원포인트 레슨 요청 전송 중 오류 발생:', error);
      toast({
        title: "요청 실패",
        description: "원포인트 레슨 요청을 전송하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>레슨 예약</DialogTitle>
          <DialogDescription>
            {teacherName} 선생님의 레슨 가능 시간을 확인하고 예약하세요
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-6">
            <ScheduleCalendar 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              schedule={schedule}
            />
          </div>

          <TimeSlotSelection 
            timeSlots={getTimeSlotsForDate(schedule, selectedDate)}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
          />
        </div>

        {/* 원포인트 레슨 요청 버튼 */}
        <div className="mt-6">
          <Button 
            variant="secondary" 
            className="w-full" 
            onClick={handleOnePointRequest}
            disabled={onePointRequested}
          >
            <Zap className="w-4 h-4 mr-2" />
            5~10분 단위 원포인트 레슨 원해요
          </Button>
          {onePointRequested && (
            <p className="text-xs text-muted-foreground text-center mt-1">
              1시간 후에 다시 요청할 수 있습니다
            </p>
          )}
        </div>

        {/* 추가 정보 입력란 */}
        <div className="mt-6">
          <div className="flex items-center text-sm font-medium mb-2">
            <AlignJustify className="w-4 h-4 mr-2" /> 추가 정보 입력
          </div>
          <Textarea
            placeholder="배우고 싶은 내용이나 목적, 목표 등을 자유롭게 써주세요."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">선택 정보</div>
            <div className="text-sm text-muted-foreground">
              {selectedDate && (
                <span>날짜: {format(selectedDate, "yyyy년 MM월 dd일")}</span>
              )}
              {selectedTimeSlot && (
                <span className="ml-2">시간: {selectedTimeSlot}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button onClick={handleBookLesson}>
              예약하기
            </Button>
          </div>
        </div>

        {/* 원포인트 레슨 모달 */}
        <Dialog open={isOnePointModalOpen} onOpenChange={setIsOnePointModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>원포인트 레슨 요청</DialogTitle>
              <DialogDescription>
                배우고 싶은 내용이나 목적, 목표 등을 자유롭게 써주세요.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Textarea
                placeholder="예시: 피아노 기초 자세를 배우고 싶어요. / 특정 곡의 어려운 부분을 집중적으로 배우고 싶어요."
                className="min-h-[120px]"
                value={onePointNote}
                onChange={(e) => setOnePointNote(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOnePointModalOpen(false)}>
                취소
              </Button>
              <Button onClick={handleSubmitOnePointRequest}>
                요청하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
