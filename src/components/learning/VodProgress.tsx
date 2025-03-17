
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface VodCourse {
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

interface VodProgressProps {
  courses?: VodCourse[];
}

export const VodProgress = ({ courses }: VodProgressProps) => {
  const myVods = courses || [
    {
      title: "피아노 기초 마스터",
      progress: 45,
      totalLessons: 24,
      completedLessons: 10
    },
    {
      title: "어쿠스틱 기타 입문",
      progress: 30,
      totalLessons: 18,
      completedLessons: 5
    },
    {
      title: "클래식 기타 기초",
      progress: 100,
      totalLessons: 22,
      completedLessons: 22
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>내 VOD 학습 진도</CardTitle>
        <CardDescription>현재 학습 중인 VOD 강의</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {myVods.map((vod, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{vod.title}</p>
                <p className="text-sm text-muted-foreground">
                  {vod.completedLessons}/{vod.totalLessons} 레슨
                </p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${vod.progress}%` }}
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant={vod.progress === 100 ? "outline" : "default"}
                  className="text-xs"
                >
                  {vod.progress === 100 ? "다시 보기" : "계속 학습하기"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>스토어에서 더 보기</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
