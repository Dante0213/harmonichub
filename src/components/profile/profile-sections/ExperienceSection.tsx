
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, Minus } from "lucide-react";

interface ExperienceSectionProps {
  experience: string[] | undefined;
}

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  // 데이터 확인 함수
  const isEmptyArray = (data: any[] | undefined | null) => !data || data.length === 0;
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="font-semibold">경력</h3>
      </CardHeader>
      <CardContent>
        {isEmptyArray(experience) ? (
          <div className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">등록된 경력 정보가 없습니다</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {experience?.map((exp, index) => (
              <li key={index} className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
