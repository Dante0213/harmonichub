
import { Reel } from "@/components/social/reels/ReelsData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Briefcase, GraduationCap, Award, Calendar, Minus } from "lucide-react";
import { MajorSection } from "./MajorSection";
import { InstrumentsGenresSection } from "./InstrumentsGenresSection";
import { InfoSection } from "./InfoSection";
import { UpcomingScheduleSection } from "./UpcomingScheduleSection";

interface ProfileSectionsProps {
  userData: Reel;
}

export const ProfileSections = ({ userData }: ProfileSectionsProps) => {
  return (
    <>
      {/* 전공 섹션 */}
      <MajorSection specialization={userData.specialization} />
      
      {/* 악기 & 장르 섹션 */}
      <InstrumentsGenresSection 
        instruments={userData.instruments} 
        genres={userData.genres} 
      />
      
      {/* 정보 카드: 학력, 경력, 자격증 */}
      <InfoSection 
        education={userData.education}
        experience={userData.experience}
        certificates={userData.certificates}
      />
      
      {/* 다가오는 일정 */}
      <UpcomingScheduleSection />
    </>
  );
};
