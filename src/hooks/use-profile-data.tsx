
import { useState, useEffect, useCallback } from "react";
import { Reel } from "@/components/social/reels/ReelsData";
import { useToast } from "@/hooks/use-toast";
import { 
  getCurrentUserEmail, 
  loadProfileData, 
  saveProfileData, 
  syncProfileWithMyPage 
} from "@/utils/profile-utils";
import { useNavigate } from "react-router-dom";

export const useProfileData = () => {
  const [userData, setUserData] = useState<Reel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // 데이터 불러오기
  const fetchUserData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const email = getCurrentUserEmail();
      if (!email) {
        setError('현재 로그인된 사용자 정보를 찾을 수 없습니다.');
        toast({
          title: "로그인 필요",
          description: "프로필을 보려면 로그인이 필요합니다.",
          variant: "destructive"
        });
        navigate('/sign-in');
        setIsLoading(false);
        return;
      }
      
      // 저장된 프로필 데이터 불러오기
      let profileData = loadProfileData(email);
      
      // 프로필 데이터가 없으면 기본 데이터 생성
      if (!profileData) {
        profileData = {
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
        };
        saveProfileData(email, profileData);
      }
      
      setUserData(profileData);
    } catch (err) {
      console.error('프로필 데이터 로드 오류:', err);
      setError('프로필 데이터를 로드하는 중 오류가 발생했습니다.');
      toast({
        title: "데이터 로드 오류",
        description: "프로필 정보를 불러오는 데 실패했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, navigate]);
  
  // 초기 데이터 로드
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  
  // 프로필 업데이트 함수
  const handleProfileUpdate = useCallback((updatedData: Reel) => {
    try {
      const email = getCurrentUserEmail();
      if (!email) {
        setError('현재 로그인된 사용자 정보를 찾을 수 없습니다.');
        toast({
          title: "로그인 필요",
          description: "프로필을 업데이트하려면 로그인이 필요합니다.",
          variant: "destructive"
        });
        navigate('/sign-in');
        return;
      }
      
      // 프로필 데이터 저장
      const savedData = saveProfileData(email, updatedData);
      setUserData(savedData);
      
      // 마이페이지 데이터와 동기화
      syncProfileWithMyPage(email, updatedData);
      
      toast({
        title: "저장 완료",
        description: "프로필 정보가 성공적으로 업데이트되었습니다.",
      });
    } catch (err) {
      console.error('프로필 업데이트 오류:', err);
      toast({
        title: "저장 실패",
        description: "프로필 정보 업데이트 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  }, [toast, navigate]);
  
  // 프로필 새로고침 함수
  const refreshProfile = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    userData,
    isLoading,
    error,
    handleProfileUpdate,
    refreshProfile
  };
};
