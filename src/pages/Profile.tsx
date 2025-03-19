import { Layout } from "@/components/layout/Layout";
import { useState, useEffect, createContext, useContext } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { Reel } from "@/components/social/reels/ReelsData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ProfileContentTabs } from "@/components/profile/ProfileContentTabs";

// Social 컨텍스트를 위한 기본값 생성
export const ProfileSocialContext = createContext<{
  followedUsers: Reel[];
  followUser: (user: Reel) => void;
  unfollowUser: (userId: string | number) => void;
  isFollowing: (userId: string | number) => boolean;
  favoriteTeachers: Reel[];
  addFavoriteTeacher: (user: Reel) => void;
  removeFavoriteTeacher: (userId: string | number) => void;
  isFavoriteTeacher: (userId: string | number) => boolean;
}>({
  followedUsers: [],
  followUser: () => {},
  unfollowUser: () => {},
  isFollowing: () => false,
  favoriteTeachers: [],
  addFavoriteTeacher: () => {},
  removeFavoriteTeacher: () => {},
  isFavoriteTeacher: () => false
});

export const useProfileSocial = () => useContext(ProfileSocialContext);

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

  // 팔로우 및 찜 관련 상태
  const [followedUsers, setFollowedUsers] = useState<Reel[]>([]);
  const [favoriteTeachers, setFavoriteTeachers] = useState<Reel[]>([]);

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

  // Social 컨텍스트 함수들
  const followUser = (user: Reel) => {
    if (!followedUsers.some(u => u.id === user.id)) {
      setFollowedUsers([...followedUsers, user]);
    }
  };

  const unfollowUser = (userId: string | number) => {
    setFollowedUsers(followedUsers.filter(u => u.id !== userId));
  };

  const isFollowing = (userId: string | number) => {
    return followedUsers.some(u => u.id === userId);
  };
  
  const addFavoriteTeacher = (user: Reel) => {
    if (!favoriteTeachers.some(u => u.id === user.id)) {
      setFavoriteTeachers([...favoriteTeachers, user]);
    }
  };

  const removeFavoriteTeacher = (userId: string | number) => {
    setFavoriteTeachers(favoriteTeachers.filter(u => u.id !== userId));
  };

  const isFavoriteTeacher = (userId: string | number) => {
    return favoriteTeachers.some(u => u.id === userId);
  };

  return (
    <ProfileSocialContext.Provider value={{ 
      followedUsers, 
      followUser, 
      unfollowUser, 
      isFollowing,
      favoriteTeachers,
      addFavoriteTeacher,
      removeFavoriteTeacher,
      isFavoriteTeacher
    }}>
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
    </ProfileSocialContext.Provider>
  );
};

export default Profile;
