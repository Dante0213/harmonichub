
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContentTabs } from "@/components/profile/ProfileContentTabs";
import { UserProfileSection } from "@/components/profile/UserProfileSection";
import { ProfileSocialProvider } from "@/context/ProfileSocialContext";
import { useProfileData } from "@/hooks/use-profile-data";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userData, handleProfileUpdate } = useProfileData();

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
