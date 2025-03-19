
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMyPage } from "@/hooks/use-my-page";
import { v4 as uuidv4 } from "uuid";

export function useProfessionalUpgrade() {
  const { toast } = useToast();
  const { updateProfessionalStatus } = useMyPage();

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

  const finishVerification = (onClose: () => void) => {
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
      resetAndCloseModal(onClose);
    }, 3000);
  };

  const handleVerification = (onClose: () => void) => {
    if (!validateFormData()) return;
    
    setVerifying(true);
    
    // Verification simulation
    setTimeout(() => {
      finishVerification(onClose);
    }, 2000);
  };

  const resetAndCloseModal = (onClose: () => void) => {
    onClose();
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

  return {
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
    setBusinessFile,
    verifying,
    verified,
    handleVerification,
    resetAndCloseModal
  };
}
