
import { Reel } from "@/components/social/reels/ReelsData";
import { MajorSection } from "./profile-sections/MajorSection";
import { InstrumentsGenresSection } from "./profile-sections/InstrumentsGenresSection";
import { EducationSection } from "./profile-sections/EducationSection";
import { ExperienceSection } from "./profile-sections/ExperienceSection";
import { CertificatesSection } from "./profile-sections/CertificatesSection";
import { UpcomingScheduleSection } from "./profile-sections/UpcomingScheduleSection";

interface ProfileSectionsProps {
  userData: Reel;
}

export const ProfileSections = ({ userData }: ProfileSectionsProps) => {
  return (
    <>
      <MajorSection specialization={userData.specialization} />
      <InstrumentsGenresSection 
        instruments={userData.instruments} 
        genres={userData.genres} 
      />
      <EducationSection education={userData.education} />
      <ExperienceSection experience={userData.experience} />
      <CertificatesSection certificates={userData.certificates} />
      <UpcomingScheduleSection />
    </>
  );
};
