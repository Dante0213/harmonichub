
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Minus } from "lucide-react";

interface EducationSectionProps {
  education: string[] | undefined;
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  // 데이터 확인 함수
  const isEmptyArray = (data: any[] | undefined | null) => !data || data.length === 0;
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="font-semibold">학력</h3>
      </CardHeader>
      <CardContent>
        {isEmptyArray(education) ? (
          <div className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">등록된 학력 정보가 없습니다</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {education?.map((edu, index) => (
              <li key={index} className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span>{edu}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
