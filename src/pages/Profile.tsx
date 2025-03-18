
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { Reel } from "@/components/social/reels/ReelsData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ProfileContentTabs } from "@/components/profile/ProfileContentTabs";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<Reel | null>(null);

  // 프로필 데이터 로드
  useEffect(() => {
    // 로컬 스토리지에서 사용자 프로필 데이터 가져오기
    const profileDataStr = localStorage.getItem('userProfileData');
    if (profileDataStr) {
      try {
        const parsedProfileData = JSON.parse(profileDataStr);
        setUserData(parsedProfileData);
      } catch (error) {
        console.error('프로필 데이터 파싱 오류:', error);
        // 기본 데이터 설정
        setUserData({
          id: "current-user",
          user: "사용자",
          userHandle: "user",
          avatar: "사",
          bio: "음악을 사랑하는 연주자입니다.",
          time: "",
          content: "",
          likes: 0,
          comments: 0,
          isProfessional: false,
          instruments: ["기타", "피아노"],
          genres: ["재즈", "팝"],
          education: [
            {id: "ed1", institution: "음악대학", degree: "음악학과", year: "2018-2022"}
          ],
          experience: [
            {id: "ex1", company: "음악 스튜디오", position: "연주자", period: "2022-현재"}
          ],
          certificates: [
            {id: "cert1", name: "음악 지도사 자격증", issuer: "음악협회", year: "2021"}
          ]
        });
      }
    } else {
      // 데이터가 없는 경우 기본 프로필 생성
      const defaultProfile: Reel = {
        id: "current-user",
        user: "사용자",
        userHandle: "user",
        avatar: "사",
        bio: "음악을 사랑하는 연주자입니다.",
        time: "",
        content: "",
        likes: 0,
        comments: 0,
        isProfessional: false,
        instruments: ["기타", "피아노"],
        genres: ["재즈", "팝"],
        education: [
          {id: "ed1", institution: "음악대학", degree: "음악학과", year: "2018-2022"}
        ],
        experience: [
          {id: "ex1", company: "음악 스튜디오", position: "연주자", period: "2022-현재"}
        ],
        certificates: [
          {id: "cert1", name: "음악 지도사 자격증", issuer: "음악협회", year: "2021"}
        ]
      };
      setUserData(defaultProfile);
      localStorage.setItem('userProfileData', JSON.stringify(defaultProfile));
    }
  }, [isEditModalOpen]);

  const handleProfileUpdate = (updatedData: Reel) => {
    setUserData(updatedData);
    localStorage.setItem('userProfileData', JSON.stringify(updatedData));
    
    // 세션 스토리지의 사용자 데이터도 함께 업데이트 (닉네임 동기화)
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      const parsedUserData = JSON.parse(userDataStr);
      parsedUserData.nickname = updatedData.user;
      sessionStorage.setItem('userData', JSON.stringify(parsedUserData));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 정보 섹션 */}
          <div className="md:w-1/3">
            {userData && (
              <>
                <ProfileHeader 
                  userData={userData} 
                  onEditClick={() => setIsEditModalOpen(true)} 
                />
                
                <ProfileInfo userData={userData} />
              </>
            )}
          </div>
          
          {/* 탭 콘텐츠 섹션 */}
          <div className="md:w-2/3">
            <ProfileContentTabs />
          </div>
        </div>
      </div>
      
      {/* 프로필 수정 모달 */}
      {userData && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={userData}
          onUpdate={handleProfileUpdate}
        />
      )}
    </Layout>
  );
};

export default Profile;
