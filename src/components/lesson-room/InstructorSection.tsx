
import { Instrument3DModel } from "@/components/lesson-room/Instrument3DModel";
import { LessonSchedule } from "@/components/learning/LessonSchedule";

export function InstructorSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* 3D 악기 모델 */}
      <Instrument3DModel />

      {/* 레슨 일정 */}
      <LessonSchedule />
    </div>
  );
}
