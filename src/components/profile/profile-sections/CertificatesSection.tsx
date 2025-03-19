
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award, Minus } from "lucide-react";

interface CertificatesSectionProps {
  certificates: string[] | undefined;
}

export const CertificatesSection = ({ certificates }: CertificatesSectionProps) => {
  // 데이터 확인 함수
  const isEmptyArray = (data: any[] | undefined | null) => !data || data.length === 0;
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="font-semibold">자격증</h3>
      </CardHeader>
      <CardContent>
        {isEmptyArray(certificates) ? (
          <div className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">등록된 자격증 정보가 없습니다</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {certificates?.map((cert, index) => (
              <li key={index} className="flex items-center gap-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
