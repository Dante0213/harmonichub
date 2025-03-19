
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Minus } from "lucide-react";

interface MajorSectionProps {
  specialization: string | undefined;
}

export const MajorSection = ({ specialization }: MajorSectionProps) => {
  // 데이터 확인 함수
  const isEmptyString = (data: string | undefined | null) => !data || data.trim() === '';
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="font-semibold">전공</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          {isEmptyString(specialization) ? (
            <span className="text-muted-foreground">등록된 전공 정보가 없습니다</span>
          ) : (
            <span className="font-medium">{specialization}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
