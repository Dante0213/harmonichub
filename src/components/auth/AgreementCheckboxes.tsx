
import { useState } from "react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface AgreementCheckboxesProps {
  termsAgreed: boolean;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  onTermsChange: (checked: boolean) => void;
  onPrivacyChange: (checked: boolean) => void;
  onMarketingChange: (checked: boolean) => void;
}

export function AgreementCheckboxes({
  termsAgreed,
  privacyAgreed,
  marketingAgreed,
  onTermsChange,
  onPrivacyChange,
  onMarketingChange,
}: AgreementCheckboxesProps) {
  const [allAgreed, setAllAgreed] = useState(false);

  const handleAllAgreement = (checked: boolean) => {
    setAllAgreed(checked);
    onTermsChange(checked);
    onPrivacyChange(checked);
    onMarketingChange(checked);
  };

  // 개별 체크박스 상태가 변경될 때 전체 동의 체크박스 상태 업데이트
  const updateAllAgreement = () => {
    const nextAllAgreed = termsAgreed && privacyAgreed;
    if (allAgreed !== nextAllAgreed) {
      setAllAgreed(nextAllAgreed);
    }
  };

  const handleTermsChange = (checked: boolean) => {
    onTermsChange(checked);
    setTimeout(updateAllAgreement, 0);
  };

  const handlePrivacyChange = (checked: boolean) => {
    onPrivacyChange(checked);
    setTimeout(updateAllAgreement, 0);
  };

  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <h3 className="font-medium text-base">약관 동의</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="all-agreement" 
            checked={allAgreed} 
            onCheckedChange={handleAllAgreement}
          />
          <Label htmlFor="all-agreement" className="font-semibold">
            전체 동의
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={termsAgreed} 
            onCheckedChange={handleTermsChange}
            required
          />
          <div className="flex items-center flex-wrap">
            <Label htmlFor="terms" className="text-sm">
              <span className="text-red-500 mr-1">(필수)</span>
            </Label>
            <Label htmlFor="terms" className="text-sm">
              하모닉허브 
              <Link to="/terms" className="text-primary underline mx-1">이용약관</Link>
              에 동의합니다.
            </Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="privacy" 
            checked={privacyAgreed} 
            onCheckedChange={handlePrivacyChange}
            required
          />
          <div className="flex items-center flex-wrap">
            <Label htmlFor="privacy" className="text-sm">
              <span className="text-red-500 mr-1">(필수)</span>
            </Label>
            <Label htmlFor="privacy" className="text-sm">
              하모닉허브 
              <Link to="/privacy" className="text-primary underline mx-1">개인정보처리방침</Link>
              에 동의합니다.
            </Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="marketing" 
            checked={marketingAgreed} 
            onCheckedChange={onMarketingChange}
          />
          <Label htmlFor="marketing" className="text-sm">
            <span className="text-gray-500 mr-1">(선택)</span>
            마케팅 정보 수신을 동의합니다.
          </Label>
        </div>
      </div>
    </div>
  );
}
