
import { Calendar } from "lucide-react";

interface ScheduleItemProps {
  title: string;
  datetime: string;
}

export const ScheduleItem = ({ title, datetime }: ScheduleItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <Calendar className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{datetime}</p>
      </div>
    </div>
  );
};
