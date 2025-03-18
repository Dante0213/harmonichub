
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Phone, MapPin, UserPlus, GraduationCap, Briefcase, Award, Minus, PenSquare } from "lucide-react";

interface UserInfoCardProps {
  userData: any;
  onUpgradeClick: () => void;
  onProfileEditClick: () => void;
}

export function UserInfoCard({ userData, onUpgradeClick, onProfileEditClick }: UserInfoCardProps) {
  const isProfessional = userData?.isProfessional || false;

  // 데이터 확인 함수 - 배열이 비어있거나 존재하지 않으면 true 반환
  const isEmpty = (data: any[] | undefined | null) => !data || data.length === 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            {userData?.imageUrl ? (
              <AvatarImage src={userData.imageUrl} alt="사용자 프로필" />
            ) : (
              <AvatarImage src="/user-avatar.png" alt="사용자 프로필" />
            )}
            <AvatarFallback>{userData?.nickname?.charAt(0) || '사'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <CardTitle>{userData?.nickname || '사용자 이름'}</CardTitle>
              {isProfessional && (
                <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
              )}
            </div>
            <CardDescription>{userData?.email || 'user@example.com'}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 전문가로 전환하기 또는 프로필 수정 버튼 */}
          {isProfessional ? (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={onProfileEditClick}
            >
              <PenSquare className="h-4 w-4 mr-2" />
              프로필 수정
            </Button>
          ) : (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={onUpgradeClick}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              전문가로 전환하기
            </Button>
          )}
          
          {/* 회원 유형 */}
          <div>
            <p className="text-sm font-medium">회원 유형</p>
            <p className="text-sm text-muted-foreground">
              {isProfessional ? "전문가 회원" : "일반 회원"}
            </p>
          </div>
          
          {/* 악기 정보 */}
          <div>
            <p className="text-sm font-medium mb-2">악기</p>
            {isEmpty(userData?.instruments) ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 악기 정보가 없습니다</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1 mb-3">
                {userData.instruments.map((instrument: string, index: number) => (
                  <div key={index} className="bg-secondary px-2 py-1 rounded-full text-xs">
                    {instrument}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 장르 정보 */}
          <div>
            <p className="text-sm font-medium mb-2">장르</p>
            {isEmpty(userData?.genres) ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 장르 정보가 없습니다</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {userData.genres.map((genre: string, index: number) => (
                  <div key={index} className="bg-secondary px-2 py-1 rounded-full text-xs">
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 학력 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">학력</p>
            </div>
            {isEmpty(userData?.education) ? (
              <div className="flex items-center text-sm text-muted-foreground pl-6">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 학력 정보가 없습니다</span>
              </div>
            ) : (
              <div className="space-y-2 pl-6">
                {userData.education.map((edu: any) => (
                  <div key={edu.id} className="text-xs">
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-muted-foreground">{edu.degree} • {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 경력 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">경력</p>
            </div>
            {isEmpty(userData?.experience) ? (
              <div className="flex items-center text-sm text-muted-foreground pl-6">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 경력 정보가 없습니다</span>
              </div>
            ) : (
              <div className="space-y-2 pl-6">
                {userData.experience.map((exp: any) => (
                  <div key={exp.id} className="text-xs">
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.position} • {exp.period}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 자격증 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">자격증</p>
            </div>
            {isEmpty(userData?.certificates) ? (
              <div className="flex items-center text-sm text-muted-foreground pl-6">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 자격증 정보가 없습니다</span>
              </div>
            ) : (
              <div className="space-y-2 pl-6">
                {userData.certificates.map((cert: any) => (
                  <div key={cert.id} className="text-xs">
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {userData?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{userData.phone}</p>
            </div>
          )}
          
          {userData?.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{userData.address}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium">가입일</p>
            <p className="text-sm text-muted-foreground">
              {userData?.joinDate || '2023년 1월 1일'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
