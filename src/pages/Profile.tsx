
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Settings, 
  PenSquare, 
  Video, 
  Music, 
  Users, 
  Heart, 
  Bookmark,
  Calendar,
  GraduationCap,
  Briefcase,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { Reel } from "@/components/social/reels/ReelsData";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<Reel>({
    id: "current-user",
    name: "김음악",
    user: "김음악",
    userHandle: "music_kim",
    avatar: "김",
    bio: "음악을 사랑하는 기타리스트입니다. 취미로 작곡도 하고 있어요.",
    time: "",
    content: "",
    likes: 0,
    comments: 0,
    instruments: ["기타", "피아노", "우쿨렐레"],
    genres: ["어쿠스틱", "재즈", "팝"],
    education: [
      {id: "ed1", institution: "서울음악대학", degree: "음악학과", year: "2018-2022"}
    ],
    experience: [
      {id: "ex1", company: "음악 스튜디오", position: "기타리스트", period: "2022-현재"}
    ],
    certificates: [
      {id: "cert1", name: "음악 지도사 자격증", issuer: "한국음악협회", year: "2021"}
    ]
  });

  const handleProfileUpdate = (updatedData: Reel) => {
    setUserData(updatedData);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 정보 섹션 */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="relative pb-0">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarFallback className="text-4xl">{userData.avatar}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold">{userData.user}</h1>
                  <p className="text-muted-foreground">@{userData.userHandle}</p>
                  
                  <div className="flex justify-between w-full mt-6 mb-2">
                    <div className="text-center flex-1">
                      <p className="font-bold">42</p>
                      <p className="text-sm text-muted-foreground">게시물</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="font-bold">156</p>
                      <p className="text-sm text-muted-foreground">팔로워</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="font-bold">98</p>
                      <p className="text-sm text-muted-foreground">팔로잉</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">소개</h3>
                  <p className="text-sm">{userData.bio}</p>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <PenSquare className="h-4 w-4 mr-2" />
                  프로필 수정
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold">악기 & 장르</h3>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-medium mb-2">악기</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userData.instruments?.map((instrument, index) => (
                    <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                      {instrument}
                    </div>
                  ))}
                </div>
                
                <h4 className="text-sm font-medium mb-2">장르</h4>
                <div className="flex flex-wrap gap-2">
                  {userData.genres?.map((genre, index) => (
                    <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                      {genre}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 정보 카드: 학력, 경력, 자격증 */}
            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold">정보</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 학력 */}
                {userData.education && userData.education.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">학력</h4>
                    </div>
                    <div className="space-y-3 pl-7">
                      {userData.education.map((edu) => (
                        <div key={edu.id}>
                          <p className="font-medium">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.degree} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 경력 */}
                {userData.experience && userData.experience.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">경력</h4>
                    </div>
                    <div className="space-y-3 pl-7">
                      {userData.experience.map((exp) => (
                        <div key={exp.id}>
                          <p className="font-medium">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.position} • {exp.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 자격증 */}
                {userData.certificates && userData.certificates.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">자격증</h4>
                    </div>
                    <div className="space-y-3 pl-7">
                      {userData.certificates.map((cert) => (
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
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold">다가오는 일정</h3>
              </CardHeader>
              <CardContent>
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
          </div>
          
          {/* 탭 콘텐츠 섹션 */}
          <div className="md:w-2/3">
            <Tabs defaultValue="posts">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="posts" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  게시물
                </TabsTrigger>
                <TabsTrigger value="reels" className="flex-1">
                  <Music className="h-4 w-4 mr-2" />
                  릴스
                </TabsTrigger>
                <TabsTrigger value="followers" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  팔로워
                </TabsTrigger>
                <TabsTrigger value="likes" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  좋아요
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  저장됨
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-6">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reels" className="mt-6">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Music className="h-10 w-10 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="followers" className="mt-6">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">팔로워 {i + 1}</p>
                          <p className="text-xs text-muted-foreground">@follower{i + 1}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">팔로우 중</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="likes" className="mt-6">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Heart className="h-10 w-10 text-red-500" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Bookmark className="h-10 w-10 text-muted-foreground" fill="currentColor" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* 프로필 수정 모달 */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onUpdate={handleProfileUpdate}
      />
    </Layout>
  );
};

export default Profile;
