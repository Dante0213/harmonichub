
import { format } from "date-fns";
import { ScheduleItem, TimeSlot } from "./types";

export function getTimeSlotsForDate(schedule: ScheduleItem[], selectedDate: Date): TimeSlot[] {
  const selectedDateSchedule = schedule.find(
    (item) => format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );
  return selectedDateSchedule?.timeSlots || [];
}

export function generateMockSchedule(): ScheduleItem[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  return [
    {
      date: today,
      timeSlots: [
        { time: "09:00", isBooked: true },
        { time: "10:00", isBooked: false },
        { time: "11:00", isBooked: false },
        { time: "13:00", isBooked: true },
        { time: "14:00", isBooked: false },
        { time: "15:00", isBooked: false },
      ],
    },
    {
      date: tomorrow,
      timeSlots: [
        { time: "09:00", isBooked: false },
        { time: "10:00", isBooked: false },
        { time: "11:00", isBooked: true },
        { time: "13:00", isBooked: false },
        { time: "14:00", isBooked: false },
        { time: "15:00", isBooked: true },
      ],
    },
    {
      date: dayAfter,
      timeSlots: [
        { time: "09:00", isBooked: false },
        { time: "10:00", isBooked: false },
        { time: "11:00", isBooked: false },
        { time: "13:00", isBooked: false },
        { time: "14:00", isBooked: true },
        { time: "15:00", isBooked: false },
      ],
    },
  ];
}
