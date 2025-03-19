
export interface TeacherScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: number;
  lessonPrice?: number;
  lessonCount?: number;
}
