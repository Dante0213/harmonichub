
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award, Minus } from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface CertificatesSectionProps {
  certificates: Certificate[] | undefined;
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
            {certificates?.map((cert) => (
              <li key={cert.id} className="flex items-center gap-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">{cert.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {cert.issuer && `${cert.issuer} • `}{cert.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
