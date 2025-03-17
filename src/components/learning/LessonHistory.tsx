
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LessonRecord {
  date: string;
  teacher: string;
  instrument: string;
  duration: string;
  notes: string;
}

interface LessonHistoryProps {
  lessons?: LessonRecord[];
}

export const LessonHistory = ({ lessons }: LessonHistoryProps) => {
  const lessonRecords = lessons || [
    { date: "2023-06-15", teacher: "김지수", instrument: "피아노", duration: "50분", notes: "스케일과 코드 연습, 간단한 곡 연주" },
    { date: "2023-06-10", teacher: "박현우", instrument: "기타", duration: "50분", notes: "기본 코드와 스트로크 패턴 연습" },
    { date: "2023-06-05", teacher: "김지수", instrument: "피아노", duration: "50분", notes: "음계 이론과 기본 화성학 소개" }
  ];

  return (
    <div className="space-y-4">
      {lessonRecords.map((lesson, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-lg">{lesson.date} 레슨</CardTitle>
            <CardDescription>
              {lesson.teacher} 선생님 | {lesson.instrument} | {lesson.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm"><strong>수업 내용:</strong> {lesson.notes}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">노트 보기</Button>
            <Button size="sm">레코딩 보기</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
