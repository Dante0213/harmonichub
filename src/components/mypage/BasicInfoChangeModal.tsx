
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

// 기본 정보 변경 폼 스키마
const basicInfoSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다."),
  phone: z.string().min(10, "연락처는 최소 10자 이상이어야 합니다."),
  address: z.string().min(5, "주소는 최소 5자 이상이어야 합니다."),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

interface BasicInfoChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BasicInfoChangeModal({ open, onOpenChange }: BasicInfoChangeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      nickname: "",
      phone: "",
      address: "",
    },
  });

  // 사용자 데이터 불러오기
  useEffect(() => {
    const userDataStr = sessionStorage.getItem("userData");
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
        
        // 폼 초기값 설정
        form.reset({
          name: parsedUserData.name || "",
          nickname: parsedUserData.nickname || "",
          phone: parsedUserData.phone || "",
          address: parsedUserData.address || "",
        });
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    }
  }, [form, open]);

  const onSubmit = async (values: BasicInfoFormValues) => {
    setIsSubmitting(true);
    
    try {
      // 세션 스토리지에서 사용자 데이터 가져오기
      const userDataStr = sessionStorage.getItem("userData");
      if (!userDataStr) {
        toast({
          title: "오류",
          description: "사용자 정보를 찾을 수 없습니다.",
          variant: "destructive",
          duration: 1000,
        });
        setIsSubmitting(false);
        return;
      }
      
      const userData = JSON.parse(userDataStr);
      
      // 사용자 정보 업데이트
      userData.name = values.name;
      userData.nickname = values.nickname;
      userData.phone = values.phone;
      userData.address = values.address;
      
      sessionStorage.setItem("userData", JSON.stringify(userData));
      
      // 성공 메시지
      toast({
        title: "정보 수정 완료",
        description: "회원 정보가 성공적으로 변경되었습니다.",
        duration: 1000,
      });

      // 모달 닫기
      onOpenChange(false);
      
    } catch (error) {
      console.error("정보 변경 오류:", error);
      toast({
        title: "오류 발생",
        description: "정보 변경 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 1000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>기본 정보 변경</DialogTitle>
          <DialogDescription>
            회원 정보를 수정하세요. 입력이 완료되면 저장 버튼을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="닉네임을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>연락처</FormLabel>
                  <FormControl>
                    <Input placeholder="연락처를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>주소</FormLabel>
                  <FormControl>
                    <Input placeholder="주소를 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장하기"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
