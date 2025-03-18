
import { useState, useEffect } from "react";
import { Reel } from "@/components/social/reels/ReelsData";

export function useMyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<Reel | null>(null);
  
  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터 가져오기
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        
        // 프로필 데이터 가져오기
        const profileDataStr = localStorage.getItem('userProfileData');
        if (profileDataStr) {
          const parsedProfileData = JSON.parse(profileDataStr);
          setProfileData(parsedProfileData);
          
          // 닉네임 동기화 (프로필 데이터의 닉네임을 사용자 데이터에 반영)
          if (parsedProfileData.user && parsedUserData) {
            parsedUserData.nickname = parsedProfileData.user;
            sessionStorage.setItem('userData', JSON.stringify(parsedUserData));
          }
        }
        
        setUserData(parsedUserData);
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    }
  }, [isBasicInfoModalOpen]); // 기본 정보 변경 후 다시 로드하기 위해 의존성 추가
  
  return {
    isModalOpen,
    setIsModalOpen,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    isBasicInfoModalOpen,
    setIsBasicInfoModalOpen,
    userData,
    profileData
  };
}
