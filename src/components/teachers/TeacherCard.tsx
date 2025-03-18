
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap } from "lucide-react";

interface TeacherCardProps {
  teacher: {
    id: number;
    name: string;
    specialty: string;
    image: string;
    isProfessional: boolean;
  };
  onSelect: (teacher: any) => void;
}

export function TeacherCard({ teacher, onSelect }: TeacherCardProps) {
  return (
    <Card className="h-[280px] overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 flex flex-col items-center h-full">
        <Avatar className="w-28 h-28 mb-4">
          <AvatarImage src={teacher.image} alt={teacher.name} />
          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-lg">{teacher.name}</h3>
        <p className="text-muted-foreground mb-1">{teacher.specialty}</p>
        {teacher.isProfessional && (
          <span className="inline-flex items-center text-xs font-medium text-blue-600 mb-3">
            <GraduationCap className="h-3 w-3 mr-1" />
            전문가
          </span>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-auto"
          onClick={() => onSelect(teacher)}
        >
          프로필 보기
        </Button>
      </div>
    </Card>
  );
}
