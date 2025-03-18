
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { BasicInfoFormValues } from "./BasicInfoForm";

export function useBasicInfo(open: boolean, onOpenChange: (open: boolean) => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { toast } = useToast();
  
  // 초기 폼 값
  const defaultValues: BasicInfoFormValues = {
    name: "",
    nickname: "",
    phone: "",
    address: "",
  };

  // 사용자 데이터 불러오기
  useEffect(() => {
    const userDataStr = sessionStorage.getItem("userData");
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    }
  }, [open]);

  // 폼 제출 핸들러
  const handleSubmit = async (values: BasicInfoFormValues) => {
    setIsSubmitting(true);
    
    try {
      // 세션 스토리지에서 사용자 데이터 가져오기
      const userDataStr = sessionStorage.getItem("userData");
      if (!userDataStr) {
        toast({
          title: "오류",
          description: "사용자 정보를 찾을 수 없습니다.",
          variant: "destructive",
          duration: 1000,
        });
        setIsSubmitting(false);
        return;
      }
      
      const userData = JSON.parse(userDataStr);
      
      // 사용자 정보 업데이트
      userData.name = values.name;
      userData.nickname = values.nickname;
      userData.phone = values.phone;
      userData.address = values.address;
      
      sessionStorage.setItem("userData", JSON.stringify(userData));
      
      // 성공 메시지
      toast({
        title: "정보 수정 완료",
        description: "회원 정보가 성공적으로 변경되었습니다.",
        duration: 1000,
      });

      // 모달 닫기
      onOpenChange(false);
      
    } catch (error) {
      console.error("정보 변경 오류:", error);
      toast({
        title: "오류 발생",
        description: "정보 변경 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 1000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 현재 사용자 데이터로 초기값 설정
  const getInitialValues = (): BasicInfoFormValues => {
    if (userData) {
      return {
        name: userData.name || "",
        nickname: userData.nickname || "",
        phone: userData.phone || "",
        address: userData.address || "",
      };
    }
    return defaultValues;
  };

  return {
    isSubmitting,
    handleSubmit,
    initialValues: getInitialValues(),
  };
}
