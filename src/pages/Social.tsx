
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { SocialReelsFeed } from "@/components/social/SocialReelsFeed";
import { 
  AdBanner, 
  RecommendedUsersPanel,
  ProfilePanel
} from "@/components/social/SocialSidePanels";
import { useState, createContext, useContext } from "react";
import { UserProfileModal } from "@/components/social/UserProfileModal";
import { Reel } from "@/components/social/reels/ReelsData";

// 팔로우 및 찜 기능을 위한 컨텍스트 생성
export const SocialContext = createContext<{
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

export const useSocial = () => useContext(SocialContext);

const Social = () => {
  const [selectedUser, setSelectedUser] = useState<Reel | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Reel[]>([]);
  const [favoriteTeachers, setFavoriteTeachers] = useState<Reel[]>([]);
  
  const handleUserClick = (user: Reel) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };
  
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
  
  // 찜한 선생님 관련 함수
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
    <SocialContext.Provider value={{ 
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
        <div className="flex h-full w-full">
          {/* 사이드바 */}
          <SocialSidebar />

          {/* 메인 콘텐츠 */}
          <div className="flex-1 md:ml-64 overflow-hidden">
            <div className="container px-4 py-6 mx-auto max-w-[1400px]">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 lg:w-2/3">
                  <SocialReelsFeed onUserClick={handleUserClick} />
                </div>
                
                <div className="hidden md:block md:w-1/3 lg:w-1/3">
                  <div className="sticky top-20 space-y-5">
                    <AdBanner />
                    <ProfilePanel />
                    <RecommendedUsersPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {selectedUser && (
          <UserProfileModal 
            user={selectedUser} 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
          />
        )}
      </Layout>
    </SocialContext.Provider>
  );
};

export default Social;
