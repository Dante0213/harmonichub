
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { TimeSlot } from "./types";

interface TimeSlotSelectionProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (time: string) => void;
}

export function TimeSlotSelection({ 
  timeSlots, 
  selectedTimeSlot, 
  setSelectedTimeSlot 
}: TimeSlotSelectionProps) {
  return (
    <div>
      <div className="text-sm font-medium mb-2 flex items-center">
        <Clock className="w-4 h-4 mr-2" /> 시간 선택
      </div>
      <div className="space-y-2">
        {timeSlots && timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <Button
              key={index}
              variant={selectedTimeSlot === slot.time ? "default" : "outline"}
              className={cn(
                "w-full mb-2",
                slot.isBooked ? "opacity-50 cursor-not-allowed" : "",
                selectedTimeSlot === slot.time ? "bg-primary" : ""
              )}
              onClick={() => !slot.isBooked && setSelectedTimeSlot(slot.time)}
              disabled={slot.isBooked}
            >
              {slot.time}
              {slot.isBooked && (
                <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                  예약됨
                </Badge>
              )}
            </Button>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">
            선택한 날짜에 예약 가능한 시간이 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
