
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ScheduleItem } from "./types";
import { cn } from "@/lib/utils";

interface ScheduleCalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  schedule: ScheduleItem[];
}

export function ScheduleCalendar({ selectedDate, setSelectedDate, schedule }: ScheduleCalendarProps) {
  // 예약 가능한 날짜 하이라이트
  const hasAvailableSlotOnDate = (date: Date) => {
    const dateSchedule = schedule.find(
      (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    
    return dateSchedule?.timeSlots.some(slot => !slot.isBooked) || false;
  };

  return (
    <div>
      <div className="text-sm font-medium mb-2 flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" /> 날짜 선택
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        className="border rounded-md"
        modifiers={{
          available: (date) => hasAvailableSlotOnDate(date),
        }}
        modifiersClassNames={{
          available: "border-2 border-green-500",
        }}
        disabled={(date) => {
          const now = new Date();
          const twoWeeksLater = new Date(now);
          twoWeeksLater.setDate(now.getDate() + 14);
          
          return (
            date < now ||
            date > twoWeeksLater ||
            !schedule.some(
              (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
            )
          );
        }}
      />
    </div>
  );
}
