
import { useState, useEffect } from "react";

export function useMyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  // 전문가 상태 변경 함수 추가
  const updateProfessionalStatus = (status: boolean, professionalData?: any) => {
    if (userData) {
      // 기존 사용자 데이터를 바탕으로 업데이트
      const updatedData = {
        ...userData,
        isProfessional: status,
        // 전문가 데이터가 제공된 경우 해당 데이터 추가
        ...(professionalData && {
          instruments: professionalData.instruments || userData.instruments,
          genres: professionalData.genres || userData.genres,
          education: professionalData.education || userData.education,
          experience: professionalData.experience || userData.experience,
          certificates: professionalData.certificates || userData.certificates,
        })
      };
      
      setUserData(updatedData);
      sessionStorage.setItem('userData', JSON.stringify(updatedData));
    }
  };
  
  useEffect(() => {
    // 세션 스토리지에서 사용자 데이터 가져오기
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
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
        bio: "음악을 사랑하는 기타리스트입니다. 취미로 작곡도 하고 있어요.",
        instruments: [], // 빈 배열로 초기화
        genres: [], // 빈 배열로 초기화
        education: [], // 빈 배열로 초기화
        experience: [], // 빈 배열로 초기화
        certificates: [] // 빈 배열로 초기화
      };
      setUserData(sampleUserData);
      sessionStorage.setItem('userData', JSON.stringify(sampleUserData));
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
    updateProfessionalStatus // 전문가 상태 변경 함수 내보내기
  };
}
