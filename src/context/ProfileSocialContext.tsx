
import { createContext, useContext, useState } from "react";
import { Reel } from "@/components/social/reels/ReelsData";

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

export const ProfileSocialProvider = ({ children }: { children: React.ReactNode }) => {
  // 팔로우 및 찜 관련 상태
  const [followedUsers, setFollowedUsers] = useState<Reel[]>([]);
  const [favoriteTeachers, setFavoriteTeachers] = useState<Reel[]>([]);

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
      {children}
    </ProfileSocialContext.Provider>
  );
};
