
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 비밀번호 변경 폼 스키마
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(6, "현재 비밀번호는 최소 6자 이상이어야 합니다."),
    newPassword: z.string().min(6, "새 비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(6, "비밀번호 확인은 최소 6자 이상이어야 합니다."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

interface PasswordChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PasswordChangeModal({ open, onOpenChange }: PasswordChangeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordChangeFormValues) => {
    setIsSubmitting(true);
    
    try {
      // 세션 스토리지에서 사용자 데이터 가져오기
      const userDataStr = sessionStorage.getItem("userData");
      if (!userDataStr) {
        toast({
          title: "오류",
          description: "사용자 정보를 찾을 수 없습니다.",
          variant: "destructive",
          duration: 1000, // 1초 후 자동으로 사라짐
        });
        setIsSubmitting(false);
        return;
      }
      
      const userData = JSON.parse(userDataStr);
      
      // 디버깅용 콘솔 로그 추가
      console.log("입력된 현재 비밀번호:", values.currentPassword);
      console.log("저장된 비밀번호:", userData.password);
      
      // 비밀번호 처리 - 다양한 형식 지원
      let storedPassword = "";
      
      if (typeof userData.password === 'object' && userData.password !== null) {
        // 객체인 경우 (예: {_type: "undefined", value: "undefined"})
        storedPassword = userData.password.value || userData.password._value || "";
      } else if (userData.password) {
        // 문자열인 경우
        storedPassword = String(userData.password).trim();
      }
      
      console.log("변환된 저장 비밀번호:", storedPassword);
      console.log("비교할 입력 비밀번호:", values.currentPassword.trim());
      
      // 새 사용자 또는 비밀번호가 없는 경우 검증 무시
      const isNewUser = !storedPassword || storedPassword === "undefined";
      
      if (!isNewUser && values.currentPassword.trim() !== storedPassword) {
        toast({
          title: "비밀번호 오류",
          description: "현재 비밀번호가 일치하지 않습니다.",
          variant: "destructive",
          duration: 1000, // 1초 후 자동으로 사라짐
        });
        setIsSubmitting(false);
        return;
      }
      
      // 비밀번호 업데이트 - 문자열로 저장
      userData.password = values.newPassword.trim();
      
      // 세션 스토리지 업데이트
      sessionStorage.setItem("userData", JSON.stringify(userData));
      
      // 성공 메시지
      toast({
        title: "비밀번호 변경 완료",
        description: "비밀번호가 성공적으로 변경되었습니다.",
        duration: 1000, // 1초 후 자동으로 사라짐
      });
      
      // 폼 리셋
      form.reset();
      
      // 모달 닫기
      onOpenChange(false);
      
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      toast({
        title: "오류 발생",
        description: "비밀번호 변경 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 1000, // 1초 후 자동으로 사라짐
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogDescription>
            새로운 비밀번호를 입력하세요. 입력이 완료되면 변경 버튼을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>현재 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="현재 비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>새 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="새 비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호 확인" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "변경 중..." : "비밀번호 변경"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
