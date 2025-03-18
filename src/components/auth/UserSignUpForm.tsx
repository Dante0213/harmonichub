
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
import { AgreementCheckboxes } from "./AgreementCheckboxes";
import { VerificationSection } from "./VerificationSection";
import { useUserSignUp } from "@/hooks/use-user-signup";

const formSchema = z.object({
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  nickname: z.string().min(2, { message: "닉네임은 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  phone: z.string().min(10, { message: "연락처는 10자 이상이어야 합니다." }),
  address: z.string().min(5, { message: "주소는 5자 이상이어야 합니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  confirmPassword: z.string(),
  termsAgreed: z.boolean().refine(val => val === true, { message: "이용약관에 동의해주세요." }),
  privacyAgreed: z.boolean().refine(val => val === true, { message: "개인정보처리방침에 동의해주세요." }),
  marketingAgreed: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function UserSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
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
      confirmPassword: "",
      termsAgreed: false,
      privacyAgreed: false,
      marketingAgreed: false
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

    if (!values.termsAgreed || !values.privacyAgreed) {
      toast({
        title: "필수 약관 동의 필요",
        description: "필수 약관에 모두 동의해주세요.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Form values:", values);
      // TODO: 실제 인증 로직 구현
      
      // 현재 로그인한 사용자 이메일 저장
      sessionStorage.setItem('currentUserEmail', JSON.stringify(values.email));
      
      // 사용자별 고유 키 생성
      const userDataKey = `userData_${values.email}`;
      
      // 사용자 데이터 생성
      const userData = {
        id: `user-${Date.now()}`,
        name: values.name,
        nickname: values.nickname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        password: values.password,
        isProfessional: false,
        marketingAgreed: values.marketingAgreed,
        userHandle: `user_${Math.floor(Math.random() * 10000)}`,
        joinDate: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      // 사용자별 데이터 저장
      sessionStorage.setItem(userDataKey, JSON.stringify(userData));
      
      // 로그인 상태 저장
      sessionStorage.setItem('isLoggedIn', 'true');
      
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

  // 약관 동의 변경 핸들러
  const handleTermsChange = (checked: boolean) => {
    setTermsAgreed(checked);
    form.setValue('termsAgreed', checked);
  };

  const handlePrivacyChange = (checked: boolean) => {
    setPrivacyAgreed(checked);
    form.setValue('privacyAgreed', checked);
  };

  const handleMarketingChange = (checked: boolean) => {
    setMarketingAgreed(checked);
    form.setValue('marketingAgreed', checked);
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
            <VerificationSection isVerified={isVerified} setIsVerified={setIsVerified} />
            
            <UserFormFields form={form} showPassword={showPassword} setShowPassword={setShowPassword} />
            
            {/* 약관 동의 섹션 */}
            <AgreementCheckboxes
              termsAgreed={termsAgreed}
              privacyAgreed={privacyAgreed}
              marketingAgreed={marketingAgreed}
              onTermsChange={handleTermsChange}
              onPrivacyChange={handlePrivacyChange}
              onMarketingChange={handleMarketingChange}
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

interface UserFormFieldsProps {
  form: ReturnType<typeof useForm<FormValues>>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

function UserFormFields({ form, showPassword, setShowPassword }: UserFormFieldsProps) {
  return (
    <>
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
    </>
  );
}
