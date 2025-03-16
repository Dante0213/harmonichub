
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { EyeIcon, EyeOffIcon, Loader2, Upload } from "lucide-react";

const professionalFormSchema = z.object({
  // 일반 사용자 정보
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
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

type ProfessionalFormValues = z.infer<typeof professionalFormSchema>;

export default function ProfessionalSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ProfessionalFormValues>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      name: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileList(e.target.files);
    }
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
            <div>
              <h3 className="mb-4 text-lg font-medium">기본 정보</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="비밀번호를 입력하세요" 
                            {...field} 
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="w-4 h-4" />
                          ) : (
                            <EyeIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <FormDescription>
                        8자 이상의 비밀번호를 사용하세요.
                      </FormDescription>
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
                        <Input type="password" placeholder="비밀번호를 다시 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* 전문가 자격 정보 섹션 */}
            <div>
              <h3 className="mb-4 text-lg font-medium">전문가 자격 정보</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>전문 분야</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="piano" />
                            </FormControl>
                            <FormLabel className="font-normal">피아노</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="guitar" />
                            </FormControl>
                            <FormLabel className="font-normal">기타</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="violin" />
                            </FormControl>
                            <FormLabel className="font-normal">바이올린</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="vocal" />
                            </FormControl>
                            <FormLabel className="font-normal">보컬</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="composition" />
                            </FormControl>
                            <FormLabel className="font-normal">작곡</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">기타</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>학력</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 서울대학교 음악대학 피아노과 학사" {...field} />
                      </FormControl>
                      <FormDescription>
                        최종 학력 및 전공을 입력해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경력</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="예: 2015-2020 세종문화회관 오케스트라 연주자, 2020-현재 음악학원 강사"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        관련 경력을 최대한 자세히 기재해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="certification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>자격증/수상 경력</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="예: 2018 국제 피아노 콩쿠르 입상, 음악교육지도사 자격증"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        보유한 자격증이나 수상 경력을 입력해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <Label htmlFor="file-upload">증빙 자료 업로드</Label>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="file-upload" className="flex items-center gap-2 p-8 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-muted-foreground">학위증, 자격증, 경력 증명서 등을 업로드하세요</span>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        multiple 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </Label>
                  </div>
                  {fileList && fileList.length > 0 && (
                    <div className="text-sm">
                      {Array.from(fileList).map((file, index) => (
                        <p key={index} className="text-muted-foreground">
                          {file.name} ({Math.round(file.size / 1024)} KB)
                        </p>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    PDF, JPG, PNG 파일 (최대 5MB)
                  </p>
                </div>
              </div>
            </div>
            
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
          이미 계정이 있으신가요? <a href="/sign-in" className="font-medium text-primary hover:underline">로그인</a>
        </p>
      </CardFooter>
    </Card>
  );
}
