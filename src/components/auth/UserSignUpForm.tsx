
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AddressSearch } from "@/components/common/AddressSearch";

const formSchema = z.object({
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  nickname: z.string().min(2, { message: "닉네임은 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  phone: z.string().min(10, { message: "연락처는 10자 이상이어야 합니다." }),
  address: z.string().min(5, { message: "주소는 5자 이상이어야 합니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function UserSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);  // 본인인증 상태
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!isVerified) {
      toast({
        title: "본인인증 필요",
        description: "회원가입을 위해 본인인증이 필요합니다.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Form values:", values);
      // TODO: 실제 인증 로직 구현
      
      // 세션 스토리지에 로그인 상태 저장 (임시 구현)
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userData', JSON.stringify({
        name: values.name,
        nickname: values.nickname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        password: values.password,
        isProfessional: false,
        joinDate: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }));
      
      // 성공 메시지
      toast({
        title: "회원가입 성공!",
        description: "회원가입이 완료되었습니다. 메인 페이지로 이동합니다.",
        duration: 1000,
      });
      
      // 홈페이지로 리다이렉트
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error("회원가입 오류:", error);
      toast({
        title: "회원가입 실패",
        description: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
        duration: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 본인인증 처리 함수
  const handleVerification = (method: string) => {
    toast({
      title: `${method} 본인인증 진행`,
      description: "본인인증을 위해 새 창이 열립니다.",
      duration: 3000,
    });
    
    // 실제로는 각 서비스의 인증 페이지로 이동하거나 팝업을 띄웁니다.
    // 현재는 데모 목적으로 인증 성공 처리
    setTimeout(() => {
      setIsVerified(true);
      toast({
        title: "본인인증 완료",
        description: "정상적으로 인증되었습니다.",
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>일반 사용자 회원가입</CardTitle>
        <CardDescription>
          음악 플랫폼의 모든 기능을 이용하기 위해 계정을 생성하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md mb-4">
              <h3 className="font-medium text-amber-800 mb-2">본인인증</h3>
              <p className="text-sm text-amber-700 mb-3">
                서비스 이용을 위해 본인인증이 필요합니다. 아래 방법 중 하나를 선택하여 인증해주세요.
              </p>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleVerification("카카오")}
                  disabled={isVerified}
                  className="bg-[#FEE500] text-black border-[#FEE500] hover:bg-[#E6CF00] hover:text-black"
                >
                  카카오톡 인증
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleVerification("PASS")}
                  disabled={isVerified}
                  className="bg-[#2D62EA] text-white border-[#2D62EA] hover:bg-[#1D52DA]"
                >
                  PASS 인증
                </Button>
              </div>
              {isVerified && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  본인인증이 완료되었습니다.
                </p>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름 (본명)</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormDescription>
                    본명은 사이트 내에서 공개되지 않습니다.
                  </FormDescription>
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
                    <Input placeholder="음악천재" {...field} />
                  </FormControl>
                  <FormDescription>
                    사이트 내에서 공개적으로 표시될 닉네임입니다.
                  </FormDescription>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>연락처</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="010-1234-5678" {...field} />
                  </FormControl>
                  <FormDescription>
                    레슨 예약 및 중요 안내에 사용됩니다.
                  </FormDescription>
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
                    <AddressSearch value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    배송 및 오프라인 레슨 장소 안내에 사용됩니다.
                  </FormDescription>
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
            
            <Button type="submit" className="w-full" disabled={isLoading || !isVerified}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  처리 중...
                </>
              ) : (
                "가입하기"
              )}
            </Button>
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
