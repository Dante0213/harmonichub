
import { useState, useEffect } from "react";

export function useMyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false); 
  const [userData, setUserData] = useState<any>(null);
  
  // 전문가 상태 변경 함수
  const updateProfessionalStatus = (status: boolean, professionalData?: any) => {
    if (userData) {
      // 기존 사용자 데이터를 바탕으로 업데이트
      const updatedData = {
        ...userData,
        isProfessional: status,
        // 전문가 데이터가 제공된 경우 해당 데이터 추가
        ...(professionalData && {
          specialization: professionalData.specialization || userData.specialization,
          instruments: professionalData.instruments || userData.instruments,
          genres: professionalData.genres || userData.genres,
          education: professionalData.education || userData.education,
          experience: professionalData.experience || userData.experience,
          certificates: professionalData.certificates || userData.certificates,
        })
      };
      
      setUserData(updatedData);
      sessionStorage.setItem('userData', JSON.stringify(updatedData));
      
      // SNS 프로필과 동기화
      updateSNSProfile(updatedData);
    }
  };
  
  // 프로필 정보 업데이트 함수 추가
  const updateProfileInfo = (profileData: any) => {
    if (userData) {
      const updatedData = {
        ...userData,
        ...profileData
      };
      
      setUserData(updatedData);
      sessionStorage.setItem('userData', JSON.stringify(updatedData));
      
      // SNS 프로필과 동기화
      updateSNSProfile(updatedData);
    }
  };
  
  // SNS 프로필 정보 동기화 함수
  const updateSNSProfile = (updatedData: any) => {
    // SNS 프로필 데이터 형식에 맞게 변환
    const snsProfileData = {
      id: updatedData.id,
      user: updatedData.nickname,
      userHandle: updatedData.userHandle,
      avatar: updatedData.nickname?.charAt(0) || '사',
      bio: updatedData.bio || "",
      imageUrl: updatedData.imageUrl || "",
      isProfessional: updatedData.isProfessional,
      specialization: updatedData.specialization || "",
      instruments: updatedData.instruments || [],
      genres: updatedData.genres || [],
      education: updatedData.education || [],
      experience: updatedData.experience || [],
      certificates: updatedData.certificates || [],
      time: "",
      content: "",
      likes: 0,
      comments: 0
    };
    
    // SNS 프로필 데이터 저장
    localStorage.setItem('userProfileData', JSON.stringify(snsProfileData));
  };
  
  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터 가져오기
    const userDataStr = sessionStorage.getItem('userData');
    
    // SNS 프로필 데이터 가져오기
    const profileDataStr = localStorage.getItem('userProfileData');
    let profileData = null;
    
    if (profileDataStr) {
      try {
        profileData = JSON.parse(profileDataStr);
      } catch (error) {
        console.error('프로필 데이터 파싱 오류:', error);
      }
    }
    
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        
        // SNS 프로필 데이터가 있으면 해당 데이터로 사용자 정보 업데이트
        if (profileData) {
          const syncedData = {
            ...parsedUserData,
            specialization: profileData.specialization || parsedUserData.specialization,
            instruments: profileData.instruments || parsedUserData.instruments,
            genres: profileData.genres || parsedUserData.genres,
            education: profileData.education || parsedUserData.education,
            experience: profileData.experience || parsedUserData.experience,
            certificates: profileData.certificates || parsedUserData.certificates,
            bio: profileData.bio || parsedUserData.bio,
            imageUrl: profileData.imageUrl || parsedUserData.imageUrl
          };
          
          setUserData(syncedData);
          sessionStorage.setItem('userData', JSON.stringify(syncedData));
        } else {
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    } else {
      // 세션 스토리지에 데이터가 없는 경우 샘플 데이터 사용
      const sampleUserData = {
        id: "current-user",
        nickname: "김음악",
        userHandle: "music_kim",
        email: "music_kim@example.com",
        phone: "010-1234-5678",
        address: "서울시 강남구",
        joinDate: "2023년 3월 15일",
        isProfessional: false,
        specialization: "",
        bio: "음악을 사랑하는 기타리스트입니다. 취미로 작곡도 하고 있어요.",
        instruments: [], 
        genres: [], 
        education: [], 
        experience: [], 
        certificates: [] 
      };
      
      setUserData(sampleUserData);
      sessionStorage.setItem('userData', JSON.stringify(sampleUserData));
      
      // SNS 프로필 초기화
      if (!profileData) {
        updateSNSProfile(sampleUserData);
      }
    }
  }, [isBasicInfoModalOpen, isProfileEditModalOpen]); // 프로필 수정 모달이 닫힐 때도 다시 로드
  
  return {
    isModalOpen,
    setIsModalOpen,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    isBasicInfoModalOpen,
    setIsBasicInfoModalOpen,
    isProfileEditModalOpen,
    setIsProfileEditModalOpen,
    userData,
    updateProfessionalStatus,
    updateProfileInfo
  };
}
