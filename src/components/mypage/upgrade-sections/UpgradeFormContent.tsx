
import { ProfileTagsSection } from "@/components/profile/ProfileTagsSection";
import { UpgradeEducationSection } from "./UpgradeEducationSection";
import { UpgradeExperienceSection } from "./UpgradeExperienceSection";
import { UpgradeCertificatesSection } from "./UpgradeCertificatesSection";
import { UpgradeSpecializationSection } from "./UpgradeSpecializationSection";
import { BusinessUploadSection } from "./BusinessUploadSection";
import { SectionContainer } from "./SectionContainer";

interface UpgradeFormContentProps {
  specialization: string;
  setSpecialization: (value: string) => void;
  instruments: string[];
  setInstruments: (instruments: string[]) => void;
  newInstrument: string;
  setNewInstrument: (value: string) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  newGenre: string;
  setNewGenre: (value: string) => void;
  education: { id: string; institution: string; degree: string; year: string }[];
  setEducation: React.Dispatch<React.SetStateAction<{ id: string; institution: string; degree: string; year: string }[]>>;
  experience: { id: string; company: string; position: string; period: string }[];
  setExperience: React.Dispatch<React.SetStateAction<{ id: string; company: string; position: string; period: string }[]>>;
  certificates: { id: string; name: string; issuer: string; year: string }[];
  setCertificates: React.Dispatch<React.SetStateAction<{ id: string; name: string; issuer: string; year: string }[]>>;
  businessFile: File | null;
  setBusinessFile: (file: File | null) => void;
}

export function UpgradeFormContent({
  specialization,
  setSpecialization,
  instruments,
  setInstruments,
  newInstrument,
  setNewInstrument,
  genres,
  setGenres,
  newGenre,
  setNewGenre,
  education,
  setEducation,
  experience,
  setExperience,
  certificates,
  setCertificates,
  businessFile,
  setBusinessFile
}: UpgradeFormContentProps) {
  return (
    <div className="space-y-6">
      <SectionContainer>
        <UpgradeSpecializationSection 
          specialization={specialization}
          setSpecialization={setSpecialization}
        />
      </SectionContainer>
      
      <SectionContainer>
        <ProfileTagsSection
          title="악기"
          tags={instruments}
          setTags={setInstruments}
          newTag={newInstrument}
          setNewTag={setNewInstrument}
          placeholder="악기 추가"
        />
      </SectionContainer>
      
      <SectionContainer>
        <ProfileTagsSection
          title="장르"
          tags={genres}
          setTags={setGenres}
          newTag={newGenre}
          setNewTag={setNewGenre}
          placeholder="장르 추가"
        />
      </SectionContainer>
      
      <SectionContainer>
        <UpgradeEducationSection
          education={education}
          setEducation={setEducation}
        />
      </SectionContainer>
      
      <SectionContainer>
        <UpgradeExperienceSection
          experience={experience}
          setExperience={setExperience}
        />
      </SectionContainer>
      
      <SectionContainer>
        <UpgradeCertificatesSection
          certificates={certificates}
          setCertificates={setCertificates}
        />
      </SectionContainer>
      
      <SectionContainer>
        <BusinessUploadSection 
          businessFile={businessFile}
          setBusinessFile={setBusinessFile}
        />
      </SectionContainer>
    </div>
  );
}
