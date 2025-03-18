
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherScheduleFormProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  availableTimes: string[];
  setAvailableTimes: (times: string[]) => void;
}

export function TeacherScheduleForm({
  selectedDate,
  setSelectedDate,
  availableTimes,
  setAvailableTimes
}: TeacherScheduleFormProps) {
  const [newTime, setNewTime] = useState("09:00");

  // 시간 추가 핸들러
  const handleAddTime = () => {
    if (!availableTimes.includes(newTime)) {
      setAvailableTimes([...availableTimes, newTime]);
    }
  };

  // 시간 제거 핸들러
  const handleRemoveTime = (time: string) => {
    setAvailableTimes(availableTimes.filter(t => t !== time));
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="text-lg font-medium">레슨 가능 일정</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 날짜 선택 */}
        <div>
          <Label className="mb-2 block">날짜 선택</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일") : <span>날짜 선택</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* 시간 추가 */}
        <div>
          <Label className="mb-2 block">레슨 가능 시간</Label>
          <div className="flex gap-2">
            <Select value={newTime} onValueChange={setNewTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="시간 선택" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 9;
                  return (
                    <SelectItem key={hour} value={`${hour}:00`}>
                      {hour}:00
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Button type="button" onClick={handleAddTime}>추가</Button>
          </div>
        </div>
      </div>
      
      {/* 추가된 시간 표시 */}
      <div className="mt-4">
        <Label className="mb-2 block">추가된 레슨 가능 시간</Label>
        <div className="flex flex-wrap gap-2">
          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
              <div key={index} className="flex items-center bg-muted rounded-md px-3 py-1">
                <Clock className="w-4 h-4 mr-1" />
                <span className="mr-2">{time}</span>
                <button
                  type="button"
                  className="text-destructive hover:text-destructive/80"
                  onClick={() => handleRemoveTime(time)}
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">추가된 시간이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
