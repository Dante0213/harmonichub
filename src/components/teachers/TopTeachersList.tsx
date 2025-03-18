
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { Teacher } from "./TeacherData";

interface TopTeachersListProps {
  onlyProfessional?: boolean;
  onSelectTeacher: (teacher: Teacher) => void;
}

export function TopTeachersList({ onlyProfessional = false, onSelectTeacher }: TopTeachersListProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  
  // 전체 교사 데이터 (Mock data)
  const topTeachers: Teacher[] = [
    { 
      id: 1, 
      name: "김선생", 
      image: "/placeholder.svg",
      specialty: "피아노",
      education: "서울대학교 음악대학",
      experience: "10년 경력",
      certificates: "음악교육 자격증",
      introduction: "반갑습니다. 피아노를 가르치고 있습니다.",
      category: "클래식",
      isProfessional: true,
    },
    { 
      id: 2, 
      name: "이선생", 
      image: "/placeholder.svg",
      specialty: "기타",
      education: "한양대학교 음악대학",
      experience: "8년 경력",
      certificates: "기타 지도사 자격증",
      introduction: "기타를 쉽고 재미있게 가르칩니다.",
      category: "실용음악",
      isProfessional: true,
    },
    { 
      id: 3, 
      name: "박선생", 
      image: "/placeholder.svg",
      specialty: "바이올린",
      education: "연세대학교 음악대학",
      experience: "12년 경력",
      certificates: "바이올린 마스터 자격증",
      introduction: "바이올린의 아름다움을 전달합니다.",
      category: "클래식",
      isProfessional: true,
    },
  ];
  
  // 등록된 교사 가져오기
  useEffect(() => {
    // 로컬 스토리지에서 등록된 선생님 가져오기
    const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    
    // 모든 선생님들을 전문가로 설정
    let filteredTeachers = [...topTeachers];
    
    // 저장된 선생님들도 모두 전문가로 설정
    const professionalStoredTeachers = storedTeachers.map((teacher: any) => ({
      ...teacher,
      isProfessional: true
    }));
    
    // 등록된 선생님들 추가
    const allTeachers = [...filteredTeachers, ...professionalStoredTeachers].slice(0, 3);
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
