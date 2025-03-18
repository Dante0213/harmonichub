
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { ProfessionalUpgradeModal } from "@/components/mypage/ProfessionalUpgradeModal";
import { PasswordChangeModal } from "@/components/mypage/PasswordChangeModal";
import { BasicInfoChangeModal } from "@/components/mypage/BasicInfoChangeModal";
import { UserInfoCard } from "@/components/mypage/UserInfoCard";
import { MyPageTabs } from "@/components/mypage/MyPageTabs";

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터 가져오기
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    }
  }, [isBasicInfoModalOpen]); // 기본 정보 변경 후 다시 로드하기 위해 의존성 추가
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사용자 정보 카드 */}
          <div className="md:w-1/3">
            <UserInfoCard 
              userData={userData} 
              onUpgradeClick={() => setIsModalOpen(true)} 
            />
          </div>
          
          {/* 탭 콘텐츠 */}
          <div className="md:w-2/3">
            <MyPageTabs 
              userData={userData}
              onPasswordChange={() => setIsPasswordModalOpen(true)}
              onBasicInfoChange={() => setIsBasicInfoModalOpen(true)}
            />
          </div>
        </div>
      </div>
      
      <ProfessionalUpgradeModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <PasswordChangeModal open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen} />
      <BasicInfoChangeModal open={isBasicInfoModalOpen} onOpenChange={setIsBasicInfoModalOpen} />
    </Layout>
  );
}
