
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TimeSlot, ScheduleItem } from "./types";
import { getTimeSlotsForDate } from "./scheduleUtils";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

interface TimeSlotSelectionProps {
  schedule: ScheduleItem[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  onOnePointLessonClick: () => void;
}

export function TimeSlotSelection({
  schedule,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onOnePointLessonClick
}: TimeSlotSelectionProps) {
  const timeSlots = getTimeSlotsForDate(schedule, selectedDate);

  const handleTimeSelection = (time: string, isBooked: boolean) => {
    if (!isBooked) {
      setSelectedTime(time);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="font-medium mb-2">날짜 선택</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={ko}
            className="border rounded-md"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-2">시간 선택</h3>
          {timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot: TimeSlot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  disabled={slot.isBooked}
                  className={`${
                    slot.isBooked ? "bg-gray-100 text-gray-400" : ""
                  }`}
                  onClick={() => handleTimeSelection(slot.time, slot.isBooked)}
                >
                  {slot.time}
                  {slot.isBooked && " (예약됨)"}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">선택한 날짜에 예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={onOnePointLessonClick}
        >
          5~10분 단위 원포인트 레슨 원해요
        </Button>
      </div>
    </div>
  );
}
