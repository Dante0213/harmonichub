
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Video } from "lucide-react";

interface LessonRecord {
  date: string;
  teacher: string;
  instrument: string;
  duration: string;
  notes: string;
  hasRecording: boolean;
  hasNotes: boolean;
}

interface LessonHistoryProps {
  lessons?: LessonRecord[];
}

export const LessonHistory = ({ lessons }: LessonHistoryProps) => {
  const lessonRecords = lessons || [
    { 
      date: "2023-06-15", 
      teacher: "김지수", 
      instrument: "피아노", 
      duration: "50분", 
      notes: "스케일과 코드 연습, 간단한 곡 연주",
      hasRecording: true,
      hasNotes: true
    },
    { 
      date: "2023-06-10", 
      teacher: "박현우", 
      instrument: "기타", 
      duration: "50분", 
      notes: "기본 코드와 스트로크 패턴 연습",
      hasRecording: true,
      hasNotes: false
    },
    { 
      date: "2023-06-05", 
      teacher: "김지수", 
      instrument: "피아노", 
      duration: "50분", 
      notes: "음계 이론과 기본 화성학 소개",
      hasRecording: false,
      hasNotes: true
    }
  ];

  return (
    <div className="space-y-4">
      {lessonRecords.map((lesson, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {lesson.date} 레슨
                </CardTitle>
                <CardDescription>
                  {lesson.teacher} 선생님 | {lesson.instrument} | {lesson.duration}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm"><strong>수업 내용:</strong> {lesson.notes}</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            {lesson.hasNotes && (
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                노트 보기
              </Button>
            )}
            {lesson.hasRecording && (
              <Button size="sm" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                레코딩 보기
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
