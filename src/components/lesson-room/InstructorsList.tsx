
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music2, PianoIcon } from "lucide-react";

interface Instructor {
  name: string;
  instrument: string;
  experience: string;
  description: string;
}

interface InstructorsListProps {
  instructors?: Instructor[];
}

export const InstructorsList = ({ instructors }: InstructorsListProps) => {
  const instructorsList = instructors || [
    {
      name: "김지수",
      instrument: "피아노",
      experience: "10년",
      description: "클래식부터 재즈까지 다양한 장르를 가르칩니다."
    },
    {
      name: "박현우",
      instrument: "기타",
      experience: "8년",
      description: "어쿠스틱, 일렉트릭 기타 모두 전문적으로 지도합니다."
    },
    {
      name: "이미나",
      instrument: "바이올린",
      experience: "15년",
      description: "초보자부터 전공생까지 맞춤형 레슨을 제공합니다."
    },
    {
      name: "정태현",
      instrument: "드럼",
      experience: "12년",
      description: "기초 리듬부터 고급 테크닉까지 체계적으로 가르칩니다."
    },
    {
      name: "최서영",
      instrument: "보컬",
      experience: "9년",
      description: "발성법, 호흡법, 무대 매너까지 종합적으로 지도합니다."
    },
    {
      name: "한준호",
      instrument: "베이스",
      experience: "7년",
      description: "다양한 장르의 베이스 테크닉을 가르칩니다."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instructorsList.map((instructor, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                {instructor.instrument === "피아노" && <PianoIcon className="h-5 w-5 text-primary" />}
                {instructor.instrument === "기타" && <Music2 className="h-5 w-5 text-primary" />}
                {instructor.instrument !== "피아노" && instructor.instrument !== "기타" && <Music2 className="h-5 w-5 text-primary" />}
              </div>
              <div>
                <CardTitle>{instructor.name}</CardTitle>
                <CardDescription>{instructor.instrument} | 경력 {instructor.experience}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{instructor.description}</p>
            <div className="mt-4 flex justify-between">
              <Button size="sm" variant="outline">프로필</Button>
              <Button size="sm">레슨 예약</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
