
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

// 선생님의 일정 정보 타입
interface ScheduleItem {
  date: Date;
  timeSlots: {
    time: string;
    isBooked: boolean;
  }[];
}

// 레슨 예약 모달 props 타입
interface TeacherScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: number;
}

export function TeacherScheduleModal({ isOpen, onClose, teacherName, teacherId }: TeacherScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const { toast } = useToast();

  // 선생님 일정 데이터 불러오기
  useEffect(() => {
    // 실제로는 API를 통해 데이터를 가져와야 함
    // 여기서는 임시 데이터 사용
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const mockSchedule: ScheduleItem[] = [
      {
        date: today,
        timeSlots: [
          { time: "09:00", isBooked: true },
          { time: "10:00", isBooked: false },
          { time: "11:00", isBooked: false },
          { time: "13:00", isBooked: true },
          { time: "14:00", isBooked: false },
          { time: "15:00", isBooked: false },
        ],
      },
      {
        date: tomorrow,
        timeSlots: [
          { time: "09:00", isBooked: false },
          { time: "10:00", isBooked: false },
          { time: "11:00", isBooked: true },
          { time: "13:00", isBooked: false },
          { time: "14:00", isBooked: false },
          { time: "15:00", isBooked: true },
        ],
      },
      {
        date: dayAfter,
        timeSlots: [
          { time: "09:00", isBooked: false },
          { time: "10:00", isBooked: false },
          { time: "11:00", isBooked: false },
          { time: "13:00", isBooked: false },
          { time: "14:00", isBooked: true },
          { time: "15:00", isBooked: false },
        ],
      },
    ];

    setSchedule(mockSchedule);
  }, [teacherId]);

  // 선택된 날짜의 시간 슬롯 가져오기
  const getTimeSlotsForSelectedDate = () => {
    const selectedDateSchedule = schedule.find(
      (item) => format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );
    return selectedDateSchedule?.timeSlots || [];
  };

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

  // 예약 가능한 날짜 하이라이트
  const hasAvailableSlotOnDate = (date: Date) => {
    const dateSchedule = schedule.find(
      (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
    return dateSchedule?.timeSlots.some(slot => !slot.isBooked) || false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>레슨 예약</DialogTitle>
          <DialogDescription>
            {teacherName} 선생님의 레슨 가능 시간을 확인하고 예약하세요
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="text-sm font-medium mb-2 flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" /> 날짜 선택
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="border rounded-md"
              modifiers={{
                available: (date) => hasAvailableSlotOnDate(date),
              }}
              modifiersClassNames={{
                available: "border-2 border-green-500",
              }}
              disabled={(date) => {
                const now = new Date();
                const twoWeeksLater = new Date(now);
                twoWeeksLater.setDate(now.getDate() + 14);
                
                return (
                  date < now ||
                  date > twoWeeksLater ||
                  !schedule.some(
                    (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                  )
                );
              }}
            />
          </div>

          <div>
            <div className="text-sm font-medium mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> 시간 선택
            </div>
            <div className="space-y-2">
              {getTimeSlotsForSelectedDate().length > 0 ? (
                getTimeSlotsForSelectedDate().map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                    className={cn(
                      "w-full mb-2",
                      slot.isBooked ? "opacity-50 cursor-not-allowed" : "",
                      selectedTimeSlot === slot.time ? "bg-primary" : ""
                    )}
                    onClick={() => !slot.isBooked && setSelectedTimeSlot(slot.time)}
                    disabled={slot.isBooked}
                  >
                    {slot.time}
                    {slot.isBooked && (
                      <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                        예약됨
                      </Badge>
                    )}
                  </Button>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  선택한 날짜에 예약 가능한 시간이 없습니다
                </p>
              )}
            </div>
          </div>
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
      </DialogContent>
    </Dialog>
  );
}
