
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContentTabs } from "@/components/profile/ProfileContentTabs";
import { UserProfileSection } from "@/components/profile/UserProfileSection";
import { ProfileSocialProvider } from "@/context/ProfileSocialContext";
import { useProfileData } from "@/hooks/use-profile-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserEmail } from "@/utils/profile-utils";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // 로그인 체크
  useEffect(() => {
    const email = getCurrentUserEmail();
    if (!email) {
      // 비로그인 상태일 경우 로그인 페이지로 리다이렉트
      navigate('/sign-in');
    }
  }, [navigate]);
  
  const { 
    userData, 
    isLoading, 
    error, 
    handleProfileUpdate, 
    refreshProfile 
  } = useProfileData();

  // 프로필 수정 모달이 닫힐 때 데이터 새로고침
  useEffect(() => {
    if (!isEditModalOpen) {
      refreshProfile();
    }
  }, [isEditModalOpen, refreshProfile]);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Skeleton className="h-[200px] w-full rounded-lg mb-4" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 에러 상태 표시
  if (error || !userData) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "프로필 데이터를 불러올 수 없습니다."}
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <ProfileSocialProvider>
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 프로필 정보 섹션 */}
            <div className="md:w-1/3">
              <ProfileHeader 
                userData={userData} 
                onEditClick={() => setIsEditModalOpen(true)} 
              />
              
              <UserProfileSection 
                userData={userData}
                isCurrentUser={true}
                onEditClick={() => setIsEditModalOpen(true)}
              />
            </div>
            
            {/* 탭 콘텐츠 섹션 */}
            <div className="md:w-2/3">
              <ProfileContentTabs />
            </div>
          </div>
        </div>
        
        {/* 프로필 수정 모달 */}
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={userData}
          onUpdate={handleProfileUpdate}
        />
      </Layout>
    </ProfileSocialProvider>
  );
};

export default Profile;
