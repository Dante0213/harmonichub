
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useEffect, useState } from "react";
import { TeacherData } from "./TeacherProfileModal";

interface CreatorsListProps {
  onSelectCreator: (creator: TeacherData) => void;
}

export function CreatorsList({ onSelectCreator }: CreatorsListProps) {
  const [creators, setCreators] = useState<TeacherData[]>([]);
  
  // 크리에이터 데이터 (Mock data)
  const topCreators: TeacherData[] = [
    { 
      id: 101, 
      name: "김크리에이터", 
      image: "/placeholder.svg",
      specialty: "피아노 튜토리얼",
      education: "음악대학",
      experience: "유튜브 구독자 10만명",
      certificates: "음악 크리에이터 인증",
      introduction: "쉽고 재미있는 피아노 강의를 제공합니다.",
      isProfessional: true,
    },
    { 
      id: 102, 
      name: "이크리에이터", 
      image: "/placeholder.svg",
      specialty: "기타 레슨",
      education: "실용음악과",
      experience: "인스타그램 팔로워 5만명",
      certificates: "SNS 인플루언서",
      introduction: "누구나 쉽게 배울 수 있는 기타 레슨 제공합니다.",
      isProfessional: true,
    },
    { 
      id: 103, 
      name: "박크리에이터", 
      image: "/placeholder.svg",
      specialty: "드럼 비트",
      education: "버클리 음대",
      experience: "음악 플랫폼 인기 크리에이터",
      certificates: "음악 프로듀서",
      introduction: "최신 트렌드의 드럼 비트를 가르칩니다.",
      isProfessional: true,
    },
  ];
  
  useEffect(() => {
    // 등록된 크리에이터 가져오기 (실제 구현에서는 API 호출 등으로 대체)
    setCreators(topCreators.slice(0, 3));
  }, []);

  return (
    <Card className="w-full h-[373px] overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">이번달 인기 크리에이터 Top3</h2>
        <div className="space-y-4">
          {creators.map((creator) => (
            <div key={creator.id} className="flex items-center gap-4">
              <Avatar className="w-16 h-16 rounded-md border">
                <AvatarImage src={creator.image} alt={creator.name} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">{creator.specialty}</p>
                <span className="inline-flex items-center text-xs font-medium text-purple-600">
                  <Video className="h-3 w-3 mr-1" />
                  크리에이터
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSelectCreator(creator)}
              >
                프로필 보기
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
