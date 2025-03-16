
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserSignUpForm from "@/components/auth/UserSignUpForm";
import ProfessionalSignUpForm from "@/components/auth/ProfessionalSignUpForm";

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

  return (
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
          </div>
        )}
      </div>
    </div>
  );
}
