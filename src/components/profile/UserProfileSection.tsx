
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reel } from "@/components/social/reels/ReelsData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FollowersView } from "@/components/social/profile/FollowersView";
import { FollowingView } from "@/components/social/profile/FollowingView";
import { FavoriteTeachersView } from "@/components/social/profile/FavoriteTeachersView";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Briefcase, GraduationCap, Award, Calendar, Minus } from "lucide-react";

interface UserProfileSectionProps {
  userData: Reel;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
  onFavoritesClick?: () => void;
}

export const UserProfileSection = ({ 
  userData, 
  onFollowersClick, 
  onFollowingClick,
  onFavoritesClick
}: UserProfileSectionProps) => {
  const isProfessional = userData.isProfessional || false;
  
  const [activeSheet, setActiveSheet] = useState<'followers' | 'following' | 'favorites' | null>(null);
  
  const handleFollowersClick = () => {
    if (onFollowersClick) {
      onFollowersClick();
    } else {
      setActiveSheet('followers');
    }
  };
  
  const handleFollowingClick = () => {
    if (onFollowingClick) {
      onFollowingClick();
    } else {
      setActiveSheet('following');
    }
  };
  
  const handleFavoritesClick = () => {
    if (onFavoritesClick) {
      onFavoritesClick();
    } else {
      setActiveSheet('favorites');
    }
  };
  
  // 데이터 확인 함수 - 배열이 비어있거나 존재하지 않으면 true 반환
  const isEmpty = (data: any[] | undefined | null) => !data || data.length === 0;
  const isEmptyString = (data: string | undefined | null) => !data || data.trim() === '';
  
  return (
    <>
      <div className="flex flex-col items-center">
        <Avatar className="h-32 w-32 mb-4">
          {userData.imageUrl ? (
            <AvatarImage src={userData.imageUrl} alt={userData.user} />
          ) : (
            <AvatarFallback className="text-4xl">{userData.avatar}</AvatarFallback>
          )}
        </Avatar>
        <h1 className="text-2xl font-bold">{userData.user}</h1>
        <p className="text-muted-foreground">@{userData.userHandle}</p>
        
        <div className="flex justify-between w-full mt-6 mb-2">
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={handleFollowersClick}
          >
            <p className="font-bold">156</p>
            <p className="text-sm text-muted-foreground">팔로워</p>
          </Button>
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={handleFollowingClick}
          >
            <p className="font-bold">98</p>
            <p className="text-sm text-muted-foreground">팔로잉</p>
          </Button>
          <Button 
            variant="ghost" 
            className="text-center flex-1 flex flex-col items-center hover:bg-slate-50"
            onClick={handleFavoritesClick}
          >
            <p className="font-bold">42</p>
            <p className="text-sm text-muted-foreground">찜한 선생님</p>
          </Button>
        </div>
      </div>
      
      {/* 전공 섹션 */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="font-semibold">전공</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            {isEmptyString(userData.specialization) ? (
              <span className="text-muted-foreground">등록된 전공 정보가 없습니다</span>
            ) : (
              <span className="font-medium">{userData.specialization}</span>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* 악기 & 장르 섹션 */}
      <Card className="mt-4">
        <CardHeader>
          <h3 className="font-semibold">악기 & 장르</h3>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">악기</h4>
            {isEmpty(userData.instruments) ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 악기 정보가 없습니다</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userData.instruments?.map((instrument, index) => (
                  <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                    {instrument}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">장르</h4>
            {isEmpty(userData.genres) ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 장르 정보가 없습니다</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userData.genres?.map((genre, index) => (
                  <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* 정보 카드: 학력, 경력, 자격증 */}
      <Card className="mt-4">
        <CardHeader>
          <h3 className="font-semibold">정보</h3>
        </CardHeader>
        <CardContent className="pt-0 space-y-6">
          {/* 학력 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">학력</h4>
            </div>
            {isEmpty(userData.education) ? (
              <div className="flex items-center text-sm text-muted-foreground pl-7">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 학력 정보가 없습니다</span>
              </div>
            ) : (
              <div className="space-y-3 pl-7">
                {userData.education?.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.degree} • {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 경력 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">경력</h4>
            </div>
            {isEmpty(userData.experience) ? (
              <div className="flex items-center text-sm text-muted-foreground pl-7">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 경력 정보가 없습니다</span>
              </div>
            ) : (
              <div className="space-y-3 pl-7">
                {userData.experience?.map((exp) => (
                  <div key={exp.id}>
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.position} • {exp.period}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 자격증 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">자격증</h4>
            </div>
            {isEmpty(userData.certificates) ? (
              <div className="flex items-center text-sm text-muted-foreground pl-7">
                <Minus className="h-4 w-4 mr-1" />
                <span>등록된 자격증 정보가 없습니다</span>
              </div>
            ) : (
              <div className="space-y-3 pl-7">
                {userData.certificates?.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* 다가오는 일정 */}
      <Card className="mt-4">
        <CardHeader>
          <h3 className="font-semibold">다가오는 일정</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">기타 레슨</p>
                <p className="text-xs text-muted-foreground">5월 15일 (화) 18:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">연주회 연습</p>
                <p className="text-xs text-muted-foreground">5월 18일 (금) 19:30</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Sheet for followers */}
      <Sheet open={activeSheet === 'followers'} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>팔로워</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FollowersView onBack={() => setActiveSheet(null)} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Sheet for following */}
      <Sheet open={activeSheet === 'following'} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>팔로잉</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FollowingView onBack={() => setActiveSheet(null)} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Sheet for favorites */}
      <Sheet open={activeSheet === 'favorites'} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>찜한 선생님</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FavoriteTeachersView onBack={() => setActiveSheet(null)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
