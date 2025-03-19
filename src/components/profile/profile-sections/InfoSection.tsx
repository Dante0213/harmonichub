
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Briefcase, Award, Minus } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface InfoSectionProps {
  education: Education[] | undefined;
  experience: Experience[] | undefined;
  certificates: Certificate[] | undefined;
}

export const InfoSection = ({ 
  education, 
  experience, 
  certificates 
}: InfoSectionProps) => {
  // 데이터 확인 함수
  const isEmpty = (data: any[] | undefined | null) => !data || data.length === 0;
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <h3 className="font-semibold">정보</h3>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {/* 학력 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <h4 className="font-medium">학력</h4>
          </div>
          {isEmpty(education) ? (
            <div className="flex items-center text-sm text-muted-foreground pl-7">
              <Minus className="h-4 w-4 mr-1" />
              <span>등록된 학력 정보가 없습니다</span>
            </div>
          ) : (
            <div className="space-y-3 pl-7">
              {education?.map((edu) => (
                <div key={edu.id}>
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.degree} • {edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 경력 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <h4 className="font-medium">경력</h4>
          </div>
          {isEmpty(experience) ? (
            <div className="flex items-center text-sm text-muted-foreground pl-7">
              <Minus className="h-4 w-4 mr-1" />
              <span>등록된 경력 정보가 없습니다</span>
            </div>
          ) : (
            <div className="space-y-3 pl-7">
              {experience?.map((exp) => (
                <div key={exp.id}>
                  <p className="font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.position} • {exp.period}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 자격증 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-muted-foreground" />
            <h4 className="font-medium">자격증</h4>
          </div>
          {isEmpty(certificates) ? (
            <div className="flex items-center text-sm text-muted-foreground pl-7">
              <Minus className="h-4 w-4 mr-1" />
              <span>등록된 자격증 정보가 없습니다</span>
            </div>
          ) : (
            <div className="space-y-3 pl-7">
              {certificates?.map((cert) => (
                <div key={cert.id}>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
