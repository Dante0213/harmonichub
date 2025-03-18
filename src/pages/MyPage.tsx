
import { Layout } from "@/components/layout/Layout";
import { ProfessionalUpgradeModal } from "@/components/mypage/ProfessionalUpgradeModal";
import { PasswordChangeModal } from "@/components/mypage/PasswordChangeModal";
import { BasicInfoChangeModal } from "@/components/mypage/BasicInfoChangeModal";
import { UserInfoCard } from "@/components/mypage/UserInfoCard";
import { MyPageTabs } from "@/components/mypage/MyPageTabs";
import { useMyPage } from "@/hooks/use-my-page";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { useState } from "react";

export default function MyPage() {
  const {
    isModalOpen,
    setIsModalOpen,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    isBasicInfoModalOpen,
    setIsBasicInfoModalOpen,
    isProfileEditModalOpen,
    setIsProfileEditModalOpen,
    userData,
    updateProfileInfo
  } = useMyPage();

  // 프로필 수정 처리 함수
  const handleProfileUpdate = (updatedData: any) => {
    const profileData = {
      bio: updatedData.bio,
      specialization: updatedData.specialization,
      instruments: updatedData.instruments,
      genres: updatedData.genres,
      education: updatedData.education,
      experience: updatedData.experience,
      certificates: updatedData.certificates,
      imageUrl: updatedData.imageUrl
    };
    
    updateProfileInfo(profileData);
  };
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사용자 정보 카드 */}
          <div className="md:w-1/3">
            <UserInfoCard 
              userData={userData} 
              onUpgradeClick={() => setIsModalOpen(true)}
              onProfileEditClick={() => setIsProfileEditModalOpen(true)}
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
      
      {/* 프로필 수정 모달 */}
      {userData && (
        <ProfileEditModal
          isOpen={isProfileEditModalOpen}
          onClose={() => setIsProfileEditModalOpen(false)}
          userData={{
            id: userData.id,
            user: userData.nickname,
            userHandle: userData.userHandle,
            avatar: userData.nickname?.charAt(0) || '사',
            bio: userData.bio || "",
            imageUrl: userData.imageUrl || "",
            isProfessional: userData.isProfessional,
            specialization: userData.specialization || "",
            instruments: userData.instruments || [],
            genres: userData.genres || [],
            education: userData.education || [],
            experience: userData.experience || [],
            certificates: userData.certificates || [],
            time: "",
            content: "",
            likes: 0,
            comments: 0
          }}
          onUpdate={handleProfileUpdate}
        />
      )}
    </Layout>
  );
}
