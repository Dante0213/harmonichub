
export interface TeacherScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: number;
  lessonPrice?: number;
  lessonCount?: number;
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export interface ScheduleItem {
  date: Date;
  timeSlots: TimeSlot[];
}

export interface TeacherPricing {
  lessonPrice: number;
  lessonCount: number;
  onePointPrice: number;
  onePointDuration: number;
}

// Update the Teacher interface in TeacherData.ts to include curriculum and pricing
