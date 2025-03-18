
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Music, Phone, User, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { ProfessionalUpgradeModal } from "@/components/mypage/ProfessionalUpgradeModal";
import { PasswordChangeModal } from "@/components/mypage/PasswordChangeModal";
import { BasicInfoChangeModal } from "@/components/mypage/BasicInfoChangeModal";

export default function MyPage() {
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
    }
  }, [isBasicInfoModalOpen]); // 기본 정보 변경 후 다시 로드하기 위해 의존성 추가
  
  const isProfessional = userData?.isProfessional || false;
  
  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사용자 정보 카드 */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/user-avatar.png" alt="사용자 프로필" />
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
                  <div>
                    <p className="text-sm font-medium">회원 유형</p>
                    <p className="text-sm text-muted-foreground">
                      {isProfessional ? "전문가 회원" : "일반 회원"}
                    </p>
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
                  {!isProfessional && (
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      전문가로 전환하기
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 탭 콘텐츠 */}
          <div className="md:w-2/3">
            <Tabs defaultValue="lessons">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="lessons">레슨</TabsTrigger>
                <TabsTrigger value="videos">영상</TabsTrigger>
                <TabsTrigger value="purchases">구매내역</TabsTrigger>
                <TabsTrigger value="settings">계정설정</TabsTrigger>
              </TabsList>
              <TabsContent value="lessons" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>나의 레슨</CardTitle>
                    <CardDescription>
                      예약된 레슨과 완료된 레슨을 확인하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-center text-muted-foreground py-8">
                      예약된 레슨이 없습니다.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="videos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>나의 영상</CardTitle>
                    <CardDescription>
                      업로드한 영상과 좋아요한 영상을 확인하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-center text-muted-foreground py-8">
                      업로드한 영상이 없습니다.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="purchases" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>구매내역</CardTitle>
                    <CardDescription>
                      구매한 상품과 서비스를 확인하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-center text-muted-foreground py-8">
                      구매 내역이 없습니다.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>계정 설정</CardTitle>
                    <CardDescription>
                      계정 정보를 관리하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <p className="text-sm font-medium">기본 정보</p>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">이름: {userData?.name || '미설정'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">닉네임: {userData?.nickname || '미설정'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">연락처: {userData?.phone || '미설정'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">주소: {userData?.address || '미설정'}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsBasicInfoModalOpen(true)}
                        className="mt-2"
                      >
                        기본 정보 변경
                      </Button>
                    </div>
                    
                    <div className="grid gap-2">
                      <p className="text-sm font-medium">이메일</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{userData?.email || 'user@example.com'}</p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <p className="text-sm font-medium">비밀번호</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsPasswordModalOpen(true)}
                      >
                        비밀번호 변경
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <p className="text-sm font-medium">알림 설정</p>
                      <Button variant="outline" size="sm">알림 설정 관리</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <ProfessionalUpgradeModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <PasswordChangeModal open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen} />
      <BasicInfoChangeModal open={isBasicInfoModalOpen} onOpenChange={setIsBasicInfoModalOpen} />
    </Layout>
  );
}
