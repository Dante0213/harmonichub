
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Reel } from "@/components/social/reels/ReelsData";

interface UserInfoCardProps {
  userData: any;
  onUpgradeClick: () => void;
}

export function UserInfoCard({ userData, onUpgradeClick }: UserInfoCardProps) {
  const isProfessional = userData?.isProfessional || false;
  const [profileData, setProfileData] = useState<Reel | null>(null);
  
  // 프로필 데이터 로드
  useEffect(() => {
    // SNS 프로필에서 사용하는 데이터 구조와 맞추기
    const userDataStr = localStorage.getItem('userProfileData');
    if (userDataStr) {
      try {
        const parsedProfileData = JSON.parse(userDataStr);
        setProfileData(parsedProfileData);
      } catch (error) {
        console.error('프로필 데이터 파싱 오류:', error);
      }
    }
  }, []);

  // 프로필 이미지 로드
  const profileImage = localStorage.getItem('userProfileImage') || '/user-avatar.png';

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profileImage} alt="사용자 프로필" />
              <AvatarFallback>{userData?.nickname?.charAt(0) || '사'}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <h1 className="text-2xl font-bold">{userData?.nickname || '사용자 이름'}</h1>
              {isProfessional && (
                <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
              )}
            </div>
            <p className="text-muted-foreground">@{userData?.email?.split('@')[0] || 'username'}</p>
            
            <div className="flex justify-between w-full mt-6 mb-2">
              <Button 
                variant="ghost" 
                className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
              >
                <p className="font-bold">156</p>
                <p className="text-sm text-muted-foreground">팔로워</p>
              </Button>
              <Button 
                variant="ghost" 
                className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
              >
                <p className="font-bold">98</p>
                <p className="text-sm text-muted-foreground">팔로잉</p>
              </Button>
            </div>
            
            {!isProfessional && (
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={onUpgradeClick}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                전문가로 전환하기
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>
      
      {/* 악기 & 장르 카드 */}
      {profileData && (
        <Card className="mt-6">
          <CardHeader>
            <h3 className="font-semibold">악기 & 장르</h3>
          </CardHeader>
          <CardContent>
            <h4 className="text-sm font-medium mb-2">악기</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.instruments?.map((instrument, index) => (
                <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {instrument}
                </div>
              ))}
            </div>
            
            <h4 className="text-sm font-medium mb-2">장르</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.genres?.map((genre, index) => (
                <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {genre}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* 정보 카드: 학력, 경력, 자격증 */}
      {profileData && (
        <Card className="mt-6">
          <CardHeader>
            <h3 className="font-semibold">정보</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 학력 */}
            {profileData.education && profileData.education.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium">학력</h4>
                </div>
                <div className="space-y-3">
                  {profileData.education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.degree} • {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 경력 */}
            {profileData.experience && profileData.experience.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium">경력</h4>
                </div>
                <div className="space-y-3">
                  {profileData.experience.map((exp) => (
                    <div key={exp.id}>
                      <p className="font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.position} • {exp.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 자격증 */}
            {profileData.certificates && profileData.certificates.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium">자격증</h4>
                </div>
                <div className="space-y-3">
                  {profileData.certificates.map((cert) => (
                    <div key={cert.id}>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* 회원 유형 카드 */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="font-semibold">회원 유형</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {isProfessional ? "전문가 회원" : "일반 회원"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            가입일: {userData?.joinDate || '2023년 1월 1일'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
