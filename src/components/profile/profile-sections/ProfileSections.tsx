
import { Reel } from "@/components/social/reels/ReelsData";
import { MajorSection } from "./MajorSection";
import { InstrumentsGenresSection } from "./InstrumentsGenresSection";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { CertificatesSection } from "./CertificatesSection";

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
      
      {/* 학력 섹션 */}
      <EducationSection education={userData.education} />
      
      {/* 경력 섹션 */}
      <ExperienceSection experience={userData.experience} />
      
      {/* 자격증 섹션 */}
      <CertificatesSection certificates={userData.certificates} />
    </>
  );
};
