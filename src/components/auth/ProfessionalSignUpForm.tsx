
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import BasicInfoForm from "./BasicInfoForm";
import ProfessionalInfoForm from "./ProfessionalInfoForm";

const professionalFormSchema = z.object({
  // 일반 사용자 정보
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  nickname: z.string().min(2, { message: "닉네임은 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  confirmPassword: z.string(),
  
  // 전문가 자격 정보
  specialization: z.string({
    required_error: "전문 분야를 선택해주세요",
  }),
  education: z.string().min(2, { message: "학력 정보를 입력해주세요." }),
  experience: z.string().min(10, { message: "경력은 10자 이상 자세히 기재해주세요." }),
  certification: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

export type ProfessionalFormValues = z.infer<typeof professionalFormSchema>;

export default function ProfessionalSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ProfessionalFormValues>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      specialization: "",
      education: "",
      experience: "",
      certification: "",
    }
  });

  const onSubmit = async (values: ProfessionalFormValues) => {
    setIsLoading(true);
    
    try {
      console.log("Form values:", values);
      console.log("Uploaded files:", fileList);
      // TODO: 실제 인증 로직 구현
      
      // 파일 분석 시뮬레이션
      if (fileList.length > 0) {
        // 파일 분석 로직은 여기에 구현
        await simulateFileAnalysis();
      }
      
      // 성공 메시지
      toast({
        title: "전문가 회원가입 신청 완료",
        description: "가입 신청이 접수되었습니다. 자격 검증 후 승인 이메일을 보내드립니다.",
      });
    } catch (error) {
      console.error("회원가입 오류:", error);
      toast({
        title: "회원가입 실패",
        description: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 파일 분석 시뮬레이션 함수
  const simulateFileAnalysis = async () => {
    // 실제로는 백엔드 API를 호출하여 파일 분석을 수행
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast({
          title: "파일 분석 완료",
          description: `${fileList.length}개의 파일이 성공적으로 분석되었습니다.`,
        });
        resolve();
      }, 2000); // 2초 딜레이로 분석 시뮬레이션
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>전문가 회원가입</CardTitle>
        <CardDescription>
          음악 전문가로 등록하여 레슨을 제공하고 전문 콘텐츠를 공유하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 기본 정보 섹션 */}
            <BasicInfoForm form={form} />
            
            <Separator className="my-6" />
            
            {/* 전문가 자격 정보 섹션 */}
            <ProfessionalInfoForm 
              form={form}
              fileList={fileList}
              setFileList={setFileList}
              fileError={fileError}
              setFileError={setFileError}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  처리 중...
                </>
              ) : (
                "전문가 가입 신청하기"
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              전문가 신청은 관리자 검토 후 승인됩니다. 승인 과정은 1-3일이 소요될 수 있습니다.
            </p>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          이미 계정이 있으신가요? <Link to="/sign-in" className="font-medium text-primary hover:underline">로그인</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
