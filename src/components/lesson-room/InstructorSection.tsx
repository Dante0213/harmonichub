
import { Instrument3DModel } from "@/components/lesson-room/Instrument3DModel";
import { LessonSchedule } from "@/components/learning/LessonSchedule";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TeacherScheduleModal } from "../teachers/TeacherScheduleModal";
import { Calendar } from "lucide-react";

// 선생님 타입 정의
interface Teacher {
  id: number;
  name: string;
  specialty: string;
}

export function InstructorSection() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 선생님 데이터 가져오기
    const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    
    // 가져온 데이터를 선생님 리스트로 변환
    const formattedTeachers = storedTeachers.map((teacher: any, index: number) => ({
      id: index + 1,
      name: teacher.name,
      specialty: teacher.specialty
    }));
    
    // 기본 선생님 데이터가 없을 경우 대비
    const defaultTeachers = [
      { id: 100, name: "김지수", specialty: "피아노" },
      { id: 101, name: "박현우", specialty: "기타" },
      { id: 102, name: "이미나", specialty: "바이올린" }
    ];
    
    setTeachers([...formattedTeachers, ...defaultTeachers]);
  }, []);

  const handleOpenSchedule = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsScheduleOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* 3D 악기 모델 */}
        <div className="lg:col-span-2">
          <Instrument3DModel />
        </div>

        {/* 레슨 일정 */}
        <div>
          <LessonSchedule />
        </div>
      </div>
      
      {/* 추천 선생님 섹션 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>추천 선생님</CardTitle>
          <CardDescription>지금 바로 레슨을 시작할 수 있는 선생님들입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teachers.slice(0, 3).map((teacher) => (
              <Card key={teacher.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      {teacher.name.charAt(0)}
                    </div>
                    <h3 className="font-medium">{teacher.name} 선생님</h3>
                    <p className="text-sm text-muted-foreground mb-3">{teacher.specialty} 전공</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleOpenSchedule(teacher)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      레슨 예약
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 레슨 예약 모달 */}
      {selectedTeacher && (
        <TeacherScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          teacherName={selectedTeacher.name}
          teacherId={selectedTeacher.id}
        />
      )}
    </>
  );
}
