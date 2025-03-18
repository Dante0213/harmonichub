
import { useState, useEffect } from "react";

export function useMyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
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
        instruments: ["기타", "피아노"],
        genres: ["어쿠스틱", "재즈"],
        education: [
          {id: "ed1", institution: "서울음악대학", degree: "음악학과", year: "2018-2022"}
        ],
        experience: [
          {id: "ex1", company: "음악 스튜디오", position: "기타리스트", period: "2022-현재"}
        ],
        certificates: [
          {id: "cert1", name: "음악 지도사 자격증", issuer: "한국음악협회", year: "2021"}
        ]
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
    userData
  };
}
