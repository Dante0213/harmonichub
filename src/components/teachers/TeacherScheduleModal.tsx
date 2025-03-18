
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
}: TeacherScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [onePointModalOpen, setOnePointModalOpen] = useState(false);
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
        title: "시간 선택 필요",
        description: "레슨 시간을 선택해주세요.",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }

    // Here you would typically make an API call to book the lesson
    console.log("예약 정보:", {
      teacherId,
      teacherName,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      ...values,
    });

    toast({
      title: "예약이 완료되었습니다",
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

          <Form {...form}>
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

              <DialogFooter className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  취소
                </Button>
                <Button type="submit">예약하기</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <OnePointLessonModal
        isOpen={onePointModalOpen}
        onClose={() => setOnePointModalOpen(false)}
        teacherId={teacherId}
        teacherName={teacherName}
      />
    </>
  );
}
