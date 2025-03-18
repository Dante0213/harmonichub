
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Zap } from "lucide-react";
import { TimeSlot } from "./types";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TimeSlotSelectionProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (time: string) => void;
}

export function TimeSlotSelection({ 
  timeSlots, 
  selectedTimeSlot, 
  setSelectedTimeSlot 
}: TimeSlotSelectionProps) {
  const [isOnePointModalOpen, setIsOnePointModalOpen] = useState(false);
  const [onePointNote, setOnePointNote] = useState("");
  const [onePointRequested, setOnePointRequested] = useState(false);
  const { toast } = useToast();

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

  const handleSubmitOnePointRequest = () => {
    // 원포인트 레슨 요청 제출 및 쿨다운 시작
    toast({
      title: "원포인트 레슨 요청 완료",
      description: "선생님께 원포인트 레슨 요청이 전송되었습니다.",
    });
    
    setOnePointRequested(true);
    setIsOnePointModalOpen(false);
    
    // 1시간 후 다시 요청 가능하도록 설정
    setTimeout(() => {
      setOnePointRequested(false);
    }, 60 * 60 * 1000); // 1시간(밀리초)
  };

  return (
    <div>
      <div className="text-sm font-medium mb-2 flex items-center">
        <Clock className="w-4 h-4 mr-2" /> 시간 선택
      </div>
      <div className="space-y-2">
        {timeSlots && timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
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
    </div>
  );
}
