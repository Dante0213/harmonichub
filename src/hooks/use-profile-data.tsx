
import { useState, useEffect } from "react";
import { Reel } from "@/components/social/reels/ReelsData";

export const useProfileData = () => {
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

  return { userData, handleProfileUpdate };
};
