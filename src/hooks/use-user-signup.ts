
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function useUserSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (userData: any, isVerified: boolean, termsAgreed: boolean, privacyAgreed: boolean) => {
    if (!isVerified) {
      toast({
        title: "본인인증 필요",
        description: "회원가입을 위해 본인인증이 필요합니다.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }

    if (!termsAgreed || !privacyAgreed) {
      toast({
        title: "필수 약관 동의 필요",
        description: "필수 약관에 모두 동의해주세요.",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Form values:", userData);
      // TODO: 실제 인증 로직 구현
      
      // 세션 스토리지에 로그인 상태 저장 (임시 구현)
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userData', JSON.stringify({
        ...userData,
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
      
      return true;
    } catch (error) {
      console.error("회원가입 오류:", error);
      toast({
        title: "회원가입 실패",
        description: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
        duration: 1000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignUp
  };
}
