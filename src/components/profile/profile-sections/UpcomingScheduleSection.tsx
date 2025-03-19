
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const UpcomingScheduleSection = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <h3 className="font-semibold">다가오는 일정</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">기타 레슨</p>
              <p className="text-xs text-muted-foreground">5월 15일 (화) 18:00</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">연주회 연습</p>
              <p className="text-xs text-muted-foreground">5월 18일 (금) 19:30</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
