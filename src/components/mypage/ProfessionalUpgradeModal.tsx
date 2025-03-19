
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMyPage } from "@/hooks/use-my-page";
import { useToast } from "@/hooks/use-toast";
import { ProfileTagsSection } from "@/components/profile/ProfileTagsSection";
import { UpgradeEducationSection } from "./upgrade-sections/UpgradeEducationSection";
import { UpgradeExperienceSection } from "./upgrade-sections/UpgradeExperienceSection";
import { UpgradeCertificatesSection } from "./upgrade-sections/UpgradeCertificatesSection";
import { UpgradeSpecializationSection } from "./upgrade-sections/UpgradeSpecializationSection";
import { UpgradeSuccessView } from "./upgrade-sections/UpgradeSuccessView";
import { BusinessUploadSection } from "./upgrade-sections/BusinessUploadSection";
import { v4 as uuidv4 } from "uuid";
import { FormProvider, useForm } from "react-hook-form";

interface ProfessionalUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfessionalUpgradeModal({ open, onOpenChange }: ProfessionalUpgradeModalProps) {
  const { toast } = useToast();
  const { updateProfessionalStatus } = useMyPage();
  const form = useForm();

  // State management
  const [specialization, setSpecialization] = useState<string>("");
  const [instruments, setInstruments] = useState<string[]>([]);
  const [newInstrument, setNewInstrument] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState("");
  
  const [education, setEducation] = useState([
    { id: uuidv4(), institution: "", degree: "", year: "" }
  ]);
  
  const [experience, setExperience] = useState([
    { id: uuidv4(), company: "", position: "", period: "" }
  ]);
  
  const [certificates, setCertificates] = useState([
    { id: uuidv4(), name: "", issuer: "", year: "" }
  ]);

  const [businessFile, setBusinessFile] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const handleVerification = () => {
    if (!validateFormData()) return;
    
    setVerifying(true);
    
    // Verification simulation
    setTimeout(() => {
      finishVerification();
    }, 2000);
  };

  const validateFormData = () => {
    if (specialization === "") {
      toast({
        title: "전공 정보 필요",
        description: "전공 정보를 선택해주세요.",
        variant: "destructive"
      });
      return false;
    }
    
    if (instruments.length === 0) {
      toast({
        title: "악기 정보 필요",
        description: "최소 하나 이상의 악기를 등록해주세요.",
        variant: "destructive"
      });
      return false;
    }
    
    if (genres.length === 0) {
      toast({
        title: "장르 정보 필요",
        description: "최소 하나 이상의 장르를 등록해주세요.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const finishVerification = () => {
    setVerifying(false);
    setVerified(true);
    
    // Collect profile data
    const professionalData = {
      specialization,
      instruments,
      genres,
      education: education.filter(edu => edu.institution && edu.degree),
      experience: experience.filter(exp => exp.company && exp.position),
      certificates: certificates.filter(cert => cert.name && cert.issuer)
    };
    
    // Update professional status
    updateProfessionalStatus(true, professionalData);
    
    toast({
      title: "검증 완료",
      description: "전문가 회원으로 전환되었습니다.",
    });
    
    // Close modal after 3 seconds
    setTimeout(() => {
      resetAndCloseModal();
    }, 3000);
  };

  const resetAndCloseModal = () => {
    onOpenChange(false);
    // Reset all form fields
    setSpecialization("");
    setInstruments([]);
    setGenres([]);
    setEducation([{ id: uuidv4(), institution: "", degree: "", year: "" }]);
    setExperience([{ id: uuidv4(), company: "", position: "", period: "" }]);
    setCertificates([{ id: uuidv4(), name: "", issuer: "", year: "" }]);
    setBusinessFile(null);
    setVerified(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">전문가 회원 전환</DialogTitle>
          <DialogDescription className="text-center">
            전문가 회원으로 전환하려면 아래 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        
        <FormProvider {...form}>
          <div className="space-y-6 py-4">
            {verified ? (
              <UpgradeSuccessView />
            ) : (
              <>
                <UpgradeSpecializationSection 
                  specialization={specialization}
                  setSpecialization={setSpecialization}
                />
                
                <ProfileTagsSection
                  title="악기"
                  tags={instruments}
                  setTags={setInstruments}
                  newTag={newInstrument}
                  setNewTag={setNewInstrument}
                  placeholder="악기 추가"
                />
                
                <ProfileTagsSection
                  title="장르"
                  tags={genres}
                  setTags={setGenres}
                  newTag={newGenre}
                  setNewTag={setNewGenre}
                  placeholder="장르 추가"
                />
                
                <UpgradeEducationSection
                  education={education}
                  setEducation={setEducation}
                />
                
                <UpgradeExperienceSection
                  experience={experience}
                  setExperience={setExperience}
                />
                
                <UpgradeCertificatesSection
                  certificates={certificates}
                  setCertificates={setCertificates}
                />
                
                <BusinessUploadSection 
                  businessFile={businessFile}
                  setBusinessFile={setBusinessFile}
                />
              </>
            )}
          </div>
          
          <DialogFooter>
            {!verified && (
              <>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  취소
                </Button>
                <Button onClick={handleVerification} disabled={verifying}>
                  {verifying ? "검증 중..." : "전문가 전환 신청"}
                </Button>
              </>
            )}
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
