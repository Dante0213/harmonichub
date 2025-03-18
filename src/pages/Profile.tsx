
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { Reel } from "@/components/social/reels/ReelsData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ProfileContentTabs } from "@/components/profile/ProfileContentTabs";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<Reel>({
    id: "current-user",
    user: "새로운 사용자",
    userHandle: "new_user",
    avatar: "새",
    bio: "음악을 사랑하는 사용자입니다.",
    time: "",
    content: "",
    likes: 0,
    comments: 0,
    isProfessional: false,
    specialization: "",
    instruments: [],
    genres: [],
    education: [],
    experience: [],
    certificates: []
  });

  useEffect(() => {
    // 현재 로그인된 사용자 이메일 가져오기
    const currentUserEmailJson = sessionStorage.getItem('currentUserEmail');
    if (!currentUserEmailJson) {
      console.error('현재 로그인된 사용자 정보를 찾을 수 없습니다.');
      return;
    }
    
    const currentUserEmail = JSON.parse(currentUserEmailJson);
    
    // 사용자별 고유 키 생성
    const profileKey = `userProfileData_${currentUserEmail}`;
    
    // 로컬 스토리지에서 프로필 데이터 가져오기
    const storedData = localStorage.getItem(profileKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error('프로필 데이터 파싱 오류:', error);
      }
    }
  }, []);

  const handleProfileUpdate = (updatedData: Reel) => {
    setUserData(updatedData);
    
    // 현재 로그인된 사용자 이메일 가져오기
    const currentUserEmailJson = sessionStorage.getItem('currentUserEmail');
    if (!currentUserEmailJson) {
      console.error('현재 로그인된 사용자 정보를 찾을 수 없습니다.');
      return;
    }
    
    const currentUserEmail = JSON.parse(currentUserEmailJson);
    
    // 사용자별 고유 키 생성
    const profileKey = `userProfileData_${currentUserEmail}`;
    const userDataKey = `userData_${currentUserEmail}`;
    
    // 프로필 데이터 저장
    localStorage.setItem(profileKey, JSON.stringify(updatedData));
    
    // 마이페이지 데이터와 동기화
    const myPageDataStr = sessionStorage.getItem(userDataKey);
    if (myPageDataStr) {
      try {
        const myPageData = JSON.parse(myPageDataStr);
        const syncedData = {
          ...myPageData,
          bio: updatedData.bio,
          specialization: updatedData.specialization,
          instruments: updatedData.instruments,
          genres: updatedData.genres,
          education: updatedData.education,
          experience: updatedData.experience,
          certificates: updatedData.certificates,
          imageUrl: updatedData.imageUrl
        };
        sessionStorage.setItem(userDataKey, JSON.stringify(syncedData));
      } catch (error) {
        console.error('마이페이지 데이터 동기화 오류:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 정보 섹션 */}
          <div className="md:w-1/3">
            <ProfileHeader 
              userData={userData} 
              onEditClick={() => setIsEditModalOpen(true)} 
            />
            
            <ProfileInfo userData={userData} />
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
  );
};

export default Profile;
