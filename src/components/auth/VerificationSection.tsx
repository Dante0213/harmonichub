
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VerificationSectionProps {
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
}

export function VerificationSection({ isVerified, setIsVerified }: VerificationSectionProps) {
  const { toast } = useToast();

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
  );
}
