
import { ScheduleItem } from "./ScheduleItem";

export const ScheduleList = () => {
  return (
    <div className="space-y-3">
      <ScheduleItem 
        title="기타 레슨"
        datetime="5월 15일 (화) 18:00"
      />
      <ScheduleItem 
        title="연주회 연습"
        datetime="5월 18일 (금) 19:30"
      />
    </div>
  );
};
