
export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export interface ScheduleItem {
  date: Date;
  timeSlots: TimeSlot[];
}

export interface TeacherScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: number;
}
