
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScheduleList } from "./schedule/ScheduleList";

export const UpcomingScheduleSection = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <h3 className="font-semibold">다가오는 일정</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <ScheduleList />
      </CardContent>
    </Card>
  );
};
