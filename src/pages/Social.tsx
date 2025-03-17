import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart, MessageSquare, Share2, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight,
  Home, Video, Save, Clock, List, Theater, Newspaper, Briefcase, Search, Music
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { Link, useLocation } from "react-router-dom";

// 릴스 모델 컴포넌트
function MusicNoteModel() {
  return (
    <group scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#FF1493" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]}>
        <boxGeometry args={[0.1, 1.6, 0.1]} />
        <meshStandardMaterial color="#FF1493" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

const Social = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const posts = [
    {
      id: 1,
      user: "김태현",
      userHandle: "taehyun_k",
      avatar: "T",
      time: "2시간 전",
      content: "오늘 첫 피아노 레슨을 받았습니다. 생각보다 어렵지만 재미있네요! 열심히 연습해서 한 달 안에 첫 곡을 완성해보려고 합니다.",
      likes: 24,
      comments: 5,
      isReel: false
    },
    {
      id: 2,
      user: "박지민",
      userHandle: "jimin_park",
      avatar: "J",
      time: "어제",
      content: "드디어 3개월 동안 연습한 바흐의 미뉴에트를 완주했습니다! 영상을 첨부합니다. 피드백 부탁드려요~ #클래식 #피아노 #바흐",
      likes: 56,
      comments: 12,
      isReel: true,
      reelDuration: "01:27"
    },
    {
      id: 3,
      user: "이준호",
      userHandle: "junho_lee",
      avatar: "J",
      time: "3일 전",
      content: "혹시 기타 초보자가 시작하기 좋은 곡 추천해주실 분 있나요? 코드가 복잡하지 않고 쉬운 곡으로 부탁드립니다.",
      likes: 15,
      comments: 23,
      isReel: false
    },
    {
      id: 4,
      user: "신민아",
      userHandle: "mina_shin",
      avatar: "M",
      time: "1주일 전",
      content: "이번 주말에 열리는 아마추어 연주회에 참가하게 되었습니다. 너무 떨리네요. 응원해주세요! #첫공연 #떨림주의 #바이올린",
      likes: 87,
      comments: 31,
      isReel: true,
      reelDuration: "02:15"
    }
  ];

  const reels = [
    {
      id: 101,
      user: "최유진",
      userHandle: "yujin_choi",
      avatar: "Y",
      time: "3시간 전",
      content: "새로 배운 재즈 피아노 연주입니다. 즉흥 연주라 부족한 점이 많지만 봐주세요~ #재즈피아노 #즉흥연주 #음악",
      likes: 123,
      comments: 18,
      views: "1.2K",
      duration: "00:45"
    },
    {
      id: 102,
      user: "정승호",
      userHandle: "seungho_j",
      avatar: "S",
      time: "5시간 전",
      content: "기타 핑거스타일 연습 중입니다. 이 곡 완성하면 또 올릴게요! #기타 #핑거스타일 #어쿠스틱기타",
      likes: 89,
      comments: 7,
      views: "876",
      duration: "00:38"
    },
    {
      id: 103,
      user: "김다희",
      userHandle: "dahee_kim",
      avatar: "D",
      time: "1일 전",
      content: "드럼 솔로 연습 - 처음 도전해봤어요. 많이 서툴지만 조언 부탁드려요! #드럼 #드럼솔로 #연습중",
      likes: 201,
      comments: 32,
      views: "2.3K",
      duration: "00:52"
    }
  ];

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // 다음 릴 보기
  const nextReel = () => {
    setActiveReelIndex((prev) => (prev + 1) % reels.length);
  };

  // 이전 릴 보기
  const prevReel = () => {
    setActiveReelIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  // 자동 재생 기능
  useEffect(() => {
    let timer: number | undefined;
    if (isPlaying) {
      timer = window.setTimeout(() => {
        nextReel();
      }, 10000); // 10초마다 다음 릴로 넘어감
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, activeReelIndex]);

  const sidebarItems = [
    { 
      title: "메인 메뉴",
      items: [
        { name: "홈", icon: Home, link: "/" },
        { name: "선생님", icon: Music, link: "/teachers" },
        { name: "SNS", icon: MessageSquare, link: "/social", active: true },
        { name: "학습실", icon: Heart, link: "/learning" },
        { name: "스토어", icon: Search, link: "/store" }
      ]
    },
    {
      title: "My 카테고리",
      items: [
        { name: "최근 본 영상", icon: Video, link: "#recent-videos" },
        { name: "좋아요 한 영상", icon: Heart, link: "#liked-videos" },
        { name: "저장 한 영상", icon: Save, link: "#saved-videos" },
        { name: "나중에 볼 영상", icon: Clock, link: "#watch-later" }
      ]
    },
    {
      title: "새로운 소식",
      items: [
        { name: "하모닉TOP100", icon: List, link: "#top-100" },
        { name: "공연소식", icon: Theater, link: "#performances" },
        { name: "뉴스소식", icon: Newspaper, link: "#news" },
        { name: "사업소식", icon: Briefcase, link: "#business" },
        { name: "더 많은 영상 찾아보기", icon: Search, link: "#more-videos" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="flex">
        {/* 사이드바 */}
        <aside className="w-64 h-screen bg-background border-r fixed left-0 top-16 p-4 overflow-y-auto hidden md:block">
          <div className="flex items-center mb-6">
            <Music className="w-6 h-6 mr-2 text-primary" />
            <span className="text-xl font-bold">Harmonic Hub</span>
          </div>

          <div className="space-y-6">
            {sidebarItems.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {category.title}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link 
                        to={item.link} 
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                          item.active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <h1 className="mb-6 text-3xl font-bold">SNS</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <textarea 
                        className="w-full min-h-[100px] p-3 border rounded-md resize-none" 
                        placeholder="무엇을 공유하고 싶으신가요?"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">사진/동영상</Button>
                      <Button>게시하기</Button>
                    </CardFooter>
                  </Card>
                </div>

                <Tabs defaultValue="reels" className="w-full mb-6">
                  <TabsList>
                    <TabsTrigger value="reels">릴스</TabsTrigger>
                    <TabsTrigger value="feed">피드</TabsTrigger>
                    <TabsTrigger value="trending">인기 게시물</TabsTrigger>
                    <TabsTrigger value="following">팔로잉</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reels" className="mt-6">
                    <div className="relative h-[600px] bg-black rounded-lg overflow-hidden">
                      {/* 릴스 컨트롤 버튼 */}
                      <div className="absolute top-1/2 left-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-black/30 text-white rounded-full hover:bg-black/50"
                          onClick={prevReel}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                      </div>
                      
                      <div className="absolute top-1/2 right-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-black/30 text-white rounded-full hover:bg-black/50"
                          onClick={nextReel}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </div>
                      
                      {/* 릴스 콘텐츠 */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* 3D 배경 음표 */}
                        <div className="absolute w-full h-full z-0">
                          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                            <PresentationControls
                              global
                              zoom={0.8}
                              rotation={[0, 0, 0]}
                              polar={[-Math.PI / 4, Math.PI / 4]}
                              azimuth={[-Math.PI / 4, Math.PI / 4]}>
                              <MusicNoteModel />
                            </PresentationControls>
                            <Environment preset="city" />
                          </Canvas>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                        <div className="absolute inset-0 flex flex-col z-20">
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-white text-center">
                              <h3 className="text-2xl font-bold">음악 릴스</h3>
                              <p>#{reels[activeReelIndex].content.split('#')[1] || '음악'}</p>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar>
                                <AvatarFallback>{reels[activeReelIndex].avatar}</AvatarFallback>
                              </Avatar>
                              <div className="text-white">
                                <p className="font-semibold">{reels[activeReelIndex].user}</p>
                                <p className="text-xs">@{reels[activeReelIndex].userHandle}</p>
                              </div>
                              <Button size="sm" variant="secondary" className="ml-auto">팔로우</Button>
                            </div>
                            <p className="text-white text-sm mb-2">{reels[activeReelIndex].content}</p>
                            <div className="flex items-center justify-between text-white">
                              <div className="flex gap-4">
                                <Button variant="ghost" size="sm" className="text-white flex items-center gap-1 p-0">
                                  <Heart className="w-5 h-5" />
                                  <span>{reels[activeReelIndex].likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-white flex items-center gap-1 p-0">
                                  <MessageSquare className="w-5 h-5" />
                                  <span>{reels[activeReelIndex].comments}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-white flex items-center gap-1 p-0">
                                  <Share2 className="w-5 h-5" />
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white p-0"
                                  onClick={() => setIsPlaying(!isPlaying)}
                                >
                                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-white p-0"
                                  onClick={() => setIsMuted(!isMuted)}
                                >
                                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">더 많은 릴스</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {reels.map((reel, index) => (
                          <div 
                            key={reel.id} 
                            className={`relative aspect-[9/16] rounded-md overflow-hidden cursor-pointer ${index === activeReelIndex ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setActiveReelIndex(index)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-2 left-2 text-white text-xs">
                              <p className="font-semibold">{reel.user}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Play className="w-3 h-3" />
                                <span>{reel.views}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="feed">
                    <div className="space-y-6 mt-6">
                      {posts.map((post) => (
                        <Card key={post.id}>
                          <CardHeader className="flex flex-row items-center gap-3 pb-2">
                            <Avatar>
                              <AvatarFallback>{post.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{post.user}</h3>
                              <p className="text-xs text-muted-foreground">@{post.userHandle} · {post.time}</p>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4">{post.content}</p>
                            {post.isReel && (
                              <div className="relative h-80 mb-4 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Button variant="outline" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50">
                                    <Play className="h-6 w-6" />
                                  </Button>
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                                  {post.reelDuration}
                                </span>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <div className="flex w-full justify-between">
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4 mr-1" />
                                <span>공유</span>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trending">
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      {posts
                        .concat(reels.map(r => ({ ...r, isReel: true, reelDuration: r.duration })))
                        .sort((a, b) => b.likes - a.likes)
                        .slice(0, 4)
                        .map((post) => (
                          <Card key={post.id}>
                            <CardHeader className="flex flex-row items-center gap-3 pb-2">
                              <Avatar>
                                <AvatarFallback>{post.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{post.user}</h3>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="mb-4">{post.content}</p>
                              {post.isReel && (
                                <div className="relative h-60 mb-4 bg-muted rounded-md flex items-center justify-center">
                                  <Button variant="outline" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50">
                                    <Play className="h-6 w-6" />
                                  </Button>
                                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                                    {post.reelDuration}
                                  </span>
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                              <div className="flex w-full justify-between">
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{post.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{post.comments}</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="w-4 h-4 mr-1" />
                                  <span>공유</span>
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="following">
                    <div className="mt-6 text-center py-10">
                      <h3 className="text-xl font-semibold mb-2">아직 팔로우하는 사용자가 없습니다</h3>
                      <p className="text-muted-foreground mb-4">다른 사용자를 팔로우하여 그들의 게시물을 확인하세요</p>
                      <Button>추천 사용자 보기</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="md:w-1/3">
                <Card className="mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">인기 해시태그</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-primary hover:underline">#피아노</a></li>
                      <li><a href="#" className="text-primary hover:underline">#기타</a></li>
                      <li><a href="#" className="text-primary hover:underline">#바이올린</a></li>
                      <li><a href="#" className="text-primary hover:underline">#첫레슨</a></li>
                      <li><a href="#" className="text-primary hover:underline">#클래식</a></li>
                      <li><a href="#" className="text-primary hover:underline">#연주영상</a></li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">추천 사용자</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        {name: "김선생", handle: "pianoteacher", instrument: "피아노 강사"},
                        {name: "박연주", handle: "violinist_park", instrument: "바이올리니스트"},
                        {name: "정멜로디", handle: "melody_j", instrument: "성악가"},
                        {name: "이리듬", handle: "rhythm_lee", instrument: "드러머"}
                      ].map((user, i) => (
                        <li key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">@{user.handle}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">팔로우</Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Environment 컴포넌트 정의
const Environment = ({ preset }: { preset: string }) => {
  return null; // Three.js 환경 설정 (실제로는 @react-three/drei의 Environment 컴포넌트가 필요)
};

export default Social;
