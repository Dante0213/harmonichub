import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserSignUpForm from "@/components/auth/UserSignUpForm";
import ProfessionalSignUpForm from "@/components/auth/ProfessionalSignUpForm";
import { Link } from "react-router-dom";
import { NavbarLogo } from "@/components/layout/navigation/NavbarLogo";

enum SignUpType {
  None,
  User,
  Professional,
}

export default function SignUp() {
  const [signUpType, setSignUpType] = useState<SignUpType>(SignUpType.None);
  const { toast } = useToast();

  const handleBack = () => {
    setSignUpType(SignUpType.None);
  };

  const handleSocialSignUp = (provider: string, type: SignUpType) => {
    toast({
      title: `${provider}로 ${type === SignUpType.User ? '일반회원' : '전문가'} 가입`,
      description: `${provider}를 통한 회원가입을 진행합니다.`,
    });
    // 실제 OAuth 회원가입 구현
    console.log(`${provider} 회원가입 시도`, type);
  };

  return (
    <>
      {/* 상단 네비게이션 바 추가 */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <NavbarLogo />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sign-in">로그인</Link>
          </Button>
        </div>
      </div>
      
      <div className="container max-w-5xl py-12 md:py-24">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-3xl font-bold text-center md:text-4xl">회원가입</h1>
          <p className="max-w-[600px] text-center text-muted-foreground">
            뮤직 플랫폼에 오신 것을 환영합니다. 일반 사용자 또는 전문가로 가입하세요.
          </p>
          
          {signUpType === SignUpType.None ? (
            <div className="grid w-full max-w-3xl gap-6 mt-8 md:grid-cols-2">
              <Card 
                className="relative overflow-hidden transition-all cursor-pointer hover:shadow-lg"
                onClick={() => setSignUpType(SignUpType.User)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    일반 사용자
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    음악을 배우고 커뮤니티에 참여하고 싶은 사용자를 위한 계정입니다.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card 
                className="relative overflow-hidden transition-all cursor-pointer hover:shadow-lg"
                onClick={() => setSignUpType(SignUpType.Professional)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    전문가
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    음악 교육자, 프로 연주자 등 전문 자격을 갖춘 분들을 위한 계정입니다.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Social Sign Up Options */}
              <div className="md:col-span-2 mt-6">
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">소셜 계정으로 가입</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full" onClick={() => handleSocialSignUp("구글", SignUpType.User)}>
                    구글 계정으로 가입
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleSocialSignUp("네이버", SignUpType.User)}>
                    네이버 계정으로 가입
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleSocialSignUp("카카오", SignUpType.User)}>
                    카카오 계정으로 가입
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl">
              <Button 
                variant="ghost" 
                className="mb-4" 
                onClick={handleBack}
              >
                ← 돌아가기
              </Button>
              
              {signUpType === SignUpType.User ? (
                <UserSignUpForm />
              ) : (
                <ProfessionalSignUpForm />
              )}

              {/* Social Sign Up Options for specific user type */}
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="px-2 bg-card text-muted-foreground">소셜 계정으로 가입</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-2 mt-4">
                    <Button variant="outline" className="w-full" onClick={() => handleSocialSignUp("구글", signUpType)}>
                      구글 계정으로 가입
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleSocialSignUp("네이버", signUpType)}>
                      네이버 계정으로 가입
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleSocialSignUp("카카오", signUpType)}>
                      카카오 계정으로 가입
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
