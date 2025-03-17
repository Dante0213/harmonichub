
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
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Profile = () => {
  const currentUser = {
    name: "김음악",
    handle: "music_kim",
    avatar: "김",
    bio: "음악을 사랑하는 기타리스트입니다. 취미로 작곡도 하고 있어요.",
    posts: 42,
    followers: 156,
    following: 98
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
                    <AvatarFallback className="text-4xl">{currentUser.avatar}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-muted-foreground">@{currentUser.handle}</p>
                  
                  <div className="flex justify-between w-full mt-6 mb-2">
                    <div className="text-center flex-1">
                      <p className="font-bold">{currentUser.posts}</p>
                      <p className="text-sm text-muted-foreground">게시물</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="font-bold">{currentUser.followers}</p>
                      <p className="text-sm text-muted-foreground">팔로워</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="font-bold">{currentUser.following}</p>
                      <p className="text-sm text-muted-foreground">팔로잉</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">소개</h3>
                  <p className="text-sm">{currentUser.bio}</p>
                </div>
                
                <Button className="w-full" variant="outline">
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
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">기타</div>
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">피아노</div>
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">우쿨렐레</div>
                </div>
                
                <h4 className="text-sm font-medium mb-2">장르</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">어쿠스틱</div>
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">재즈</div>
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">팝</div>
                </div>
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
    </Layout>
  );
};

export default Profile;
