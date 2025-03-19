
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Award, BookOpen } from "lucide-react";
import { Reel } from "@/components/social/reels/ReelsData";

interface ProfileInfoProps {
  userData: Reel;
}

export const ProfileInfo = ({ userData }: ProfileInfoProps) => {
  return (
    <>
      {/* 전공 섹션 */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="font-semibold">전공</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">
              {userData.specialization ? (
                userData.specialization
              ) : (
                <span className="text-muted-foreground">등록된 전공 정보가 없습니다</span>
              )}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <h3 className="font-semibold">악기 & 장르</h3>
        </CardHeader>
        <CardContent>
          <h4 className="text-sm font-medium mb-2">악기</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {userData.instruments?.map((instrument, index) => (
              <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                {instrument}
              </div>
            ))}
          </div>
          
          <h4 className="text-sm font-medium mb-2">장르</h4>
          <div className="flex flex-wrap gap-2">
            {userData.genres?.map((genre, index) => (
              <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                {genre}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 정보 카드: 학력, 경력, 자격증 */}
      <Card className="mt-6">
        <CardHeader>
          <h3 className="font-semibold">정보</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 학력 */}
          {userData.education && userData.education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium">학력</h4>
              </div>
              <div className="space-y-3 pl-7">
                {userData.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.degree} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 경력 */}
          {userData.experience && userData.experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium">경력</h4>
              </div>
              <div className="space-y-3 pl-7">
                {userData.experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.position} • {exp.period}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 자격증 */}
          {userData.certificates && userData.certificates.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium">자격증</h4>
              </div>
              <div className="space-y-3 pl-7">
                {userData.certificates.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
