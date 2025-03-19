
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { generateMockSchedule } from "./scheduleUtils";
import { TeacherScheduleModalProps } from "./types";
import { AdditionalInfoForm } from "./AdditionalInfoForm";
import { TimeSlotSelection } from "./TimeSlotSelection";
import { OnePointLessonModal } from "./OnePointLessonModal";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { PaymentMethodModal } from "../store/modals/PaymentMethodModal";

const formSchema = z.object({
  instrument: z.string({
    required_error: "악기를 선택해주세요.",
  }),
  level: z.string({
    required_error: "레벨을 선택해주세요.",
  }),
  additionalInfo: z.string().optional(),
});

export function TeacherScheduleModal({
  isOpen,
  onClose,
  teacherName,
  teacherId,
  lessonPrice = 100000,
  lessonCount = 4,
}: TeacherScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [onePointModalOpen, setOnePointModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const schedule = generateMockSchedule();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instrument: "",
      level: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedTime) {
      toast({
        description: "레슨 시간을 선택해주세요.",
        duration: 1000,
      });
      return;
    }

    // 결제 모달 열기
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // 예약 정보 저장
    console.log("예약 정보:", {
      teacherId,
      teacherName,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      ...form.getValues(),
      lessonPrice,
      lessonCount,
    });

    toast({
      description: `${teacherName} 선생님과 ${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}에 레슨이 예약되었습니다.`,
      duration: 1000,
    });

    form.reset();
    setSelectedTime(null);
    onClose();
  };

  const handleOnePointLessonClick = () => {
    setOnePointModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{teacherName} 선생님 레슨 예약</DialogTitle>
          </DialogHeader>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <TimeSlotSelection
                schedule={schedule}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                onOnePointLessonClick={handleOnePointLessonClick}
              />

              <AdditionalInfoForm form={form} />
              
              <Separator className="my-2" />
              
              {/* 가격 정보 표시 */}
              <div className="rounded-lg border p-4 bg-muted/30">
                <h3 className="font-medium mb-2">결제 정보</h3>
                <div className="flex justify-between items-center">
                  <span>레슨 횟수</span>
                  <span className="font-medium">{lessonCount}회</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>총 결제 금액</span>
                  <span className="font-semibold text-lg">₩{lessonPrice.toLocaleString()}</span>
                </div>
                <p className="text-red-500 text-sm mt-2">* 레슨이 취소될 시 환불됩니다.</p>
              </div>

              <DialogFooter className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  취소
                </Button>
                <Button type="submit">예약하기</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      
      {/* 원포인트 레슨 모달 */}
      <OnePointLessonModal
        isOpen={onePointModalOpen}
        onClose={() => setOnePointModalOpen(false)}
        teacherId={teacherId}
        teacherName={teacherName}
      />
      
      {/* 결제 모달 */}
      <PaymentMethodModal
        isOpen={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        productName={`${teacherName} 선생님 ${lessonCount}회 레슨`}
      />
    </>
  );
}
