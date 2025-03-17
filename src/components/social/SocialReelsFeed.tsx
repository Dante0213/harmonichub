
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, MessageSquare, Share2, Play, 
  Pause, Volume2, VolumeX, ChevronLeft, ChevronRight
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { MusicNoteModel, Environment } from "./models/MusicNoteModel";

interface Reel {
  id: number;
  user: string;
  userHandle: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  views?: string;
  duration?: string;
}

export const SocialReelsFeed = () => {
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

  return (
    <>
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
    </>
  );
};
