
import { Layout } from "@/components/layout/Layout";
import { ProfessionalUpgradeModal } from "@/components/mypage/ProfessionalUpgradeModal";
import { PasswordChangeModal } from "@/components/mypage/PasswordChangeModal";
import { BasicInfoChangeModal } from "@/components/mypage/BasicInfoChangeModal";
import { UserInfoCard } from "@/components/mypage/UserInfoCard";
import { MyPageTabs } from "@/components/mypage/MyPageTabs";
import { useMyPage } from "@/hooks/use-my-page";

export default function MyPage() {
  const {
    isModalOpen,
    setIsModalOpen,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    isBasicInfoModalOpen,
    setIsBasicInfoModalOpen,
    userData
  } = useMyPage();
  
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
