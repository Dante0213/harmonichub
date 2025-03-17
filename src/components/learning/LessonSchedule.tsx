
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { BellRing } from "lucide-react";

interface Lesson {
  title: string;
  description: string;
  isToday: boolean;
}

interface LessonScheduleProps {
  initialLessons?: Lesson[];
}

export const LessonSchedule = ({ initialLessons }: LessonScheduleProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const lessons = initialLessons || [
    {
      title: "오늘 오후 3시",
      description: "김지수 선생님과 피아노 레슨",
      isToday: true
    },
    {
      title: "내일 오전 11시",
      description: "박현우 선생님과 기타 레슨",
      isToday: false
    }
  ];

  return (
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
              <Button size="sm" variant="outline">
                입장
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
