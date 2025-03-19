
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { Teacher, teachersList } from "./TeacherData";

interface TopTeachersListProps {
  onlyProfessional?: boolean;
  onSelectTeacher: (teacher: Teacher) => void;
}

export function TopTeachersList({ onlyProfessional = false, onSelectTeacher }: TopTeachersListProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  
  // 전체 교사 데이터를 TeacherData.ts에서 불러오기
  useEffect(() => {
    // 최대 3명의 선생님을 선택합니다
    const topThreeTeachers = teachersList.slice(0, 3);
    
    // 로컬 스토리지에서 등록된 선생님 가져오기
    const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    
    // 저장된 선생님들도 모두 전문가로 설정
    const professionalStoredTeachers = storedTeachers.map((teacher: any) => ({
      ...teacher,
      isProfessional: true
    }));
    
    // 등록된 선생님들 추가하고 최대 3명까지만
    const allTeachers = [...topThreeTeachers, ...professionalStoredTeachers].slice(0, 3);
    setTeachers(allTeachers);
  }, [onlyProfessional]);

  return (
    <Card className="w-full h-[373px] overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">이번달 최고 인기 강사 Top3</h2>
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center gap-4">
              <Avatar className="w-16 h-16 rounded-md border">
                <AvatarImage src={teacher.image} alt={teacher.name} />
                <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground">{teacher.specialty}</p>
                {teacher.isProfessional && (
                  <span className="inline-flex items-center text-xs font-medium text-blue-600">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    전문가
                  </span>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSelectTeacher(teacher)}
              >
                프로필 보기
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
