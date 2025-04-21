
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ko } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { AdditionalInfoForm } from "./AdditionalInfoForm";
import { useOnePointLesson } from "@/hooks/use-one-point-lesson";
import { ScrollArea } from "@/components/ui/scroll-area";

const onePointSchema = z.object({
  time: z.string().min(1, "시간을 입력해주세요."),
  instrument: z.string({
    required_error: "악기를 선택해주세요.",
  }),
  level: z.string({
    required_error: "레벨을 선택해주세요.",
  }),
  additionalInfo: z.string().optional(),
});

type OnePointFormValues = z.infer<typeof onePointSchema>;

interface OnePointLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherId: number;
  teacherName: string;
}

export function OnePointLessonModal({ 
  isOpen, 
  onClose, 
  teacherId,
  teacherName
}: OnePointLessonModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { sendOnePointRequest } = useOnePointLesson();

  const form = useForm<OnePointFormValues>({
    resolver: zodResolver(onePointSchema),
    defaultValues: {
      time: "",
      instrument: "",
      level: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (values: OnePointFormValues) => {
    const request = {
      teacherId,
      teacherName,
      studentName: "현재 로그인한 사용자", // 실제 구현에서는 사용자 정보 가져오기
      date: format(selectedDate, "yyyy-MM-dd"),
      time: values.time,
      instrument: values.instrument,
      level: values.level,
      additionalInfo: values.additionalInfo || "추가 정보 없음"
    };
    
    const success = sendOnePointRequest(request);
    
    if (success) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>5~10분 단위 원포인트 레슨 요청</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">날짜 선택</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    locale={ko}
                    className="border rounded-md mx-auto"
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>선호하는 시간</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="예: 14:00, 오후 2시, 2시~3시 사이 등" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        원하는 시간대를 자유롭게 입력해주세요.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <AdditionalInfoForm form={form} />
              </div>
              
              <DialogFooter className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  취소
                </Button>
                <Button type="submit">요청하기</Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
