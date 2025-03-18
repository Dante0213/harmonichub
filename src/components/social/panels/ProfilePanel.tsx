
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProfilePanel = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "사용자",
    handle: "user",
    instrument: "",
    image: ""
  });
  
  useEffect(() => {
    // 현재 로그인된 사용자 이메일 가져오기
    const currentUserEmailJson = sessionStorage.getItem('currentUserEmail');
    if (!currentUserEmailJson) {
      return;
    }
    
    const currentUserEmail = JSON.parse(currentUserEmailJson);
    
    // 사용자별 고유 키 생성
    const userDataKey = `userData_${currentUserEmail}`;
    const profileKey = `userProfileData_${currentUserEmail}`;
    
    // 사용자 데이터 가져오기
    const userData = sessionStorage.getItem(userDataKey);
    const profileData = localStorage.getItem(profileKey);
    
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        const user = {
          name: parsedUserData.nickname || "사용자",
          handle: parsedUserData.userHandle || "user",
          instrument: parsedUserData.specialization || "",
          image: ""
        };
        
        // 프로필 이미지가 있으면 업데이트
        if (profileData) {
          const parsedProfileData = JSON.parse(profileData);
          if (parsedProfileData.imageUrl) {
            user.image = parsedProfileData.imageUrl;
          }
        }
        
        setCurrentUser(user);
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    }
  }, []);
  
  return (
    <Card className="mb-6 pastel-card">
      <CardContent className="pt-6">
        <Link to="/profile" className="flex items-center gap-3 hover:bg-pastel-purple/10 p-2 rounded-md transition-colors">
          <Avatar className="h-12 w-12 border-2 border-pastel-purple/30">
            {currentUser.image ? (
              <AvatarImage src={currentUser.image} alt={currentUser.name} />
            ) : (
              <AvatarFallback className="text-lg bg-pastel-purple/20">{currentUser.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium text-base">{currentUser.name}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
