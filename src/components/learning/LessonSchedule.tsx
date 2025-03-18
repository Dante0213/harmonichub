
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { BellRing } from "lucide-react";
import { VideoLessonRoom } from "../lesson-room/VideoLessonRoom";

interface Lesson {
  title: string;
  description: string;
  isToday: boolean;
  time?: string;
  teacherName?: string;
}

interface LessonScheduleProps {
  initialLessons?: Lesson[];
}

export const LessonSchedule = ({ initialLessons }: LessonScheduleProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLessonRoomOpen, setIsLessonRoomOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  const lessons = initialLessons || [
    {
      title: "오늘 오후 3시",
      description: "김지수 선생님과 피아노 레슨",
      isToday: true,
      time: "15:00",
      teacherName: "김지수"
    },
    {
      title: "내일 오전 11시",
      description: "박현우 선생님과 기타 레슨",
      isToday: false,
      time: "11:00",
      teacherName: "박현우"
    }
  ];

  const handleJoinLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsLessonRoomOpen(true);
  };

  const handleCloseLessonRoom = () => {
    setIsLessonRoomOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>레슨 일정</CardTitle>
          <CardDescription>다가오는 레슨 일정을 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mb-4"
          />
          <div className="space-y-4">
            {lessons.map((lesson, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border p-3">
                <BellRing className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.description}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleJoinLesson(lesson)}
                >
                  입장
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedLesson && (
        <VideoLessonRoom 
          isOpen={isLessonRoomOpen}
          onClose={handleCloseLessonRoom}
          lessonInfo={{
            title: selectedLesson.description.split('과')[1]?.trim() || "레슨",
            teacherName: selectedLesson.teacherName || "",
            time: selectedLesson.time || "",
          }}
        />
      )}
    </>
  );
};
