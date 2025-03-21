
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarLogo } from "@/components/layout/navigation/NavbarLogo";

const formSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      console.log("Form values:", values);
      // TODO: 실제 로그인 로직 구현
      
      // 세션 스토리지에 현재 로그인한 사용자 이메일 저장
      sessionStorage.setItem('currentUserEmail', JSON.stringify(values.email));
      
      // 사용자별 고유 키 생성
      const userDataKey = `userData_${values.email}`;
      
      // 해당 사용자의 데이터가 이미 있는지 확인
      const existingUserData = sessionStorage.getItem(userDataKey);
      
      if (!existingUserData) {
        // 새로운 사용자의 경우 기본 데이터 생성
        const newUserData = {
          id: `user-${Date.now()}`,
          nickname: "사용자",
          email: values.email,
          userHandle: `user_${Math.floor(Math.random() * 10000)}`,
          isProfessional: false,
          joinDate: new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };
        
        // 사용자별 데이터 저장
        sessionStorage.setItem(userDataKey, JSON.stringify(newUserData));
      }
      
      // 로그인 상태 저장
      sessionStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "로그인 성공!",
        description: "환영합니다. 메인 페이지로 이동합니다.",
        duration: 1000, // 1초 후 자동으로 사라짐
      });
      
      // 홈페이지로 리다이렉트
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error("로그인 오류:", error);
      toast({
        title: "로그인 실패",
        description: "이메일 또는 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
        duration: 1000, // 1초 후 자동으로 사라짐
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} 로그인`,
      description: `${provider}로 로그인을 시도합니다.`,
      duration: 1000, // 1초 후 자동으로 사라짐
    });
    // 실제 OAuth 로그인 구현
    console.log(`${provider} 로그인 시도`);
  };

  return (
    <>
      {/* 상단 네비게이션 바 추가 */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <NavbarLogo />
        </div>
      </div>
    
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>
              계정에 로그인하여 모든 기능을 이용하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button variant="link" className="px-0 h-auto">
                    비밀번호를 잊으셨나요?
                  </Button>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      로그인 중...
                    </>
                  ) : (
                    "로그인"
                  )}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-card text-muted-foreground">또는</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" type="button" onClick={() => handleSocialLogin("Google")}>
                    구글로 로그인
                  </Button>
                  <Button variant="outline" className="w-full" type="button" onClick={() => handleSocialLogin("Naver")}>
                    네이버로 로그인
                  </Button>
                  <Button variant="outline" className="w-full" type="button" onClick={() => handleSocialLogin("Kakao")}>
                    카카오로 로그인
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              계정이 없으신가요? <Link to="/sign-up" className="font-medium text-primary hover:underline">회원가입</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
