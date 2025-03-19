
import { Reel } from "@/components/social/reels/ReelsData";

// 데이터 배열이 비어있는지 확인하는 유틸리티 함수
export const isEmptyArray = (data: any[] | undefined | null) => !data || data.length === 0;

// 프로필 데이터를 로컬 스토리지에 저장
export const saveProfileData = (email: string, data: Reel) => {
  const profileKey = `userProfileData_${email}`;
  localStorage.setItem(profileKey, JSON.stringify(data));
  return data;
};

// 프로필 데이터를 로컬 스토리지에서 불러오기
export const loadProfileData = (email: string): Reel | null => {
  const profileKey = `userProfileData_${email}`;
  const storedData = localStorage.getItem(profileKey);
  
  if (!storedData) return null;
  
  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error('프로필 데이터 파싱 오류:', error);
    return null;
  }
};

// 세션 스토리지에서 현재 사용자 이메일 가져오기
export const getCurrentUserEmail = (): string | null => {
  const currentUserEmailJson = sessionStorage.getItem('currentUserEmail');
  if (!currentUserEmailJson) return null;
  
  try {
    return JSON.parse(currentUserEmailJson);
  } catch (error) {
    console.error('사용자 이메일 파싱 오류:', error);
    return null;
  }
};

// 마이페이지 데이터와 프로필 데이터 동기화
export const syncProfileWithMyPage = (email: string, profileData: Reel) => {
  const userDataKey = `userData_${email}`;
  const myPageDataStr = sessionStorage.getItem(userDataKey);
  
  if (!myPageDataStr) return;
  
  try {
    const myPageData = JSON.parse(myPageDataStr);
    const syncedData = {
      ...myPageData,
      bio: profileData.bio,
      specialization: profileData.specialization,
      instruments: profileData.instruments,
      genres: profileData.genres,
      education: profileData.education,
      experience: profileData.experience,
      certificates: profileData.certificates,
      imageUrl: profileData.imageUrl
    };
    sessionStorage.setItem(userDataKey, JSON.stringify(syncedData));
  } catch (error) {
    console.error('마이페이지 데이터 동기화 오류:', error);
  }
};
