
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X, PlayCircle, Clock, Star, StarHalf } from "lucide-react";

interface Vod {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  rating: number;
  date: string;
  price: number;
  isFree: boolean;
  category: string;
}

interface TeacherVodModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: number;
}

export function TeacherVodModal({ isOpen, onClose, teacherName, teacherId }: TeacherVodModalProps) {
  const [videos, setVideos] = useState<Vod[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");

  // VOD 데이터 로드 (실제로는 API 호출)
  useEffect(() => {
    // 여기서는 샘플 데이터 사용
    const sampleVideos: Vod[] = [
      {
        id: 1,
        title: "기초 테크닉 마스터하기",
        thumbnail: "/placeholder.svg",
        duration: "45:20",
        views: 1250,
        rating: 4.8,
        date: "2023-05-15",
        price: 0,
        isFree: true,
        category: "기초"
      },
      {
        id: 2,
        title: "중급자를 위한 표현력 향상 레슨",
        thumbnail: "/placeholder.svg",
        duration: "38:15",
        views: 872,
        rating: 4.5,
        date: "2023-06-22",
        price: 15000,
        isFree: false,
        category: "중급"
      },
      {
        id: 3,
        title: "고급 테크닉 마스터 클래스",
        thumbnail: "/placeholder.svg",
        duration: "52:10",
        views: 643,
        rating: 4.9,
        date: "2023-07-18",
        price: 25000,
        isFree: false,
        category: "고급"
      },
      {
        id: 4,
        title: "초보자를 위한 첫 단계",
        thumbnail: "/placeholder.svg",
        duration: "28:35",
        views: 1890,
        rating: 4.7,
        date: "2023-04-10",
        price: 0,
        isFree: true,
        category: "기초"
      },
      {
        id: 5,
        title: "음악 이론과 실전 응용",
        thumbnail: "/placeholder.svg",
        duration: "40:22",
        views: 760,
        rating: 4.6,
        date: "2023-08-05",
        price: 18000,
        isFree: false,
        category: "이론"
      },
      {
        id: 6,
        title: "연주 실전 팁 모음",
        thumbnail: "/placeholder.svg",
        duration: "35:45",
        views: 921,
        rating: 4.8,
        date: "2023-09-12",
        price: 20000,
        isFree: false,
        category: "실전"
      }
    ];

    setVideos(sampleVideos);
  }, [teacherId]);

  // 현재 탭에 따른 VOD 필터링
  const filteredVideos = activeTab === "all" 
    ? videos 
    : activeTab === "free" 
      ? videos.filter(video => video.isFree) 
      : videos.filter(video => video.category === activeTab);

  // 별점 컴포넌트
  const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // VOD 카드 컴포넌트
  const VodCard = ({ vod }: { vod: Vod }) => {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-video bg-muted">
          <img 
            src={vod.thumbnail} 
            alt={vod.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {vod.duration}
          </div>
          {vod.isFree && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              무료
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2">{vod.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <RatingStars rating={vod.rating} />
            <span className="text-sm text-muted-foreground">조회수 {vod.views}</span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="font-medium">
              {vod.isFree ? "무료" : `${vod.price.toLocaleString()}원`}
            </span>
            <Button size="sm" className="h-8">
              <PlayCircle className="w-4 h-4 mr-1" />
              시청하기
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>{teacherName} 선생님의 VOD</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="p-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="free">무료</TabsTrigger>
              <TabsTrigger value="기초">기초</TabsTrigger>
              <TabsTrigger value="중급">중급+</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="grid grid-cols-1 gap-4 pb-4">
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map(video => (
                      <VodCard key={video.id} vod={video} />
                    ))
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      해당 카테고리의 VOD가 없습니다.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
