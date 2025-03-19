
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
import { v4 as uuidv4 } from "uuid";
import { Form, FormProvider, useForm } from "react-hook-form";

interface ProfessionalUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfessionalUpgradeModal({ open, onOpenChange }: ProfessionalUpgradeModalProps) {
  const { toast } = useToast();
  const { updateProfessionalStatus } = useMyPage();
  const form = useForm(); // Form 컨텍스트 추가

  // 전공 상태 관리
  const [specialization, setSpecialization] = useState<string>("");
  
  // 악기 상태 관리
  const [instruments, setInstruments] = useState<string[]>([]);
  const [newInstrument, setNewInstrument] = useState("");
  
  // 장르 상태 관리
  const [genres, setGenres] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState("");
  
  // 학력, 경력, 자격증 상태 관리
  const [education, setEducation] = useState([
    { id: uuidv4(), institution: "", degree: "", year: "" }
  ]);
  
  const [experience, setExperience] = useState([
    { id: uuidv4(), company: "", position: "", period: "" }
  ]);
  
  const [certificates, setCertificates] = useState([
    { id: uuidv4(), name: "", issuer: "", year: "" }
  ]);

  // 사업자 등록 증명 파일 상태
  const [businessFile, setBusinessFile] = useState<File | null>(null);
  
  // 검증 진행 상태
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  // 검증 처리 함수
  const handleVerification = () => {
    console.log("전문가 전환 처리 시작");
    if (specialization === "") {
      toast({
        title: "전공 정보 필요",
        description: "전공 정보를 선택해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    if (instruments.length === 0) {
      toast({
        title: "악기 정보 필요",
        description: "최소 하나 이상의 악기를 등록해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    if (genres.length === 0) {
      toast({
        title: "장르 정보 필요",
        description: "최소 하나 이상의 장르를 등록해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    setVerifying(true);
    
    // 검증 진행 시뮬레이션 (실제로는 API 호출 등이 필요)
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      
      // 필요한 프로필 데이터 수집
      const professionalData = {
        specialization,
        instruments,
        genres,
        education: education.filter(edu => edu.institution && edu.degree),
        experience: experience.filter(exp => exp.company && exp.position),
        certificates: certificates.filter(cert => cert.name && cert.issuer)
      };
      
      // 전문가 상태 업데이트
      updateProfessionalStatus(true, professionalData);
      
      toast({
        title: "검증 완료",
        description: "전문가 회원으로 전환되었습니다.",
      });
      
      // 3초 후 모달 닫기
      setTimeout(() => {
        onOpenChange(false);
        // 입력 필드 초기화
        setSpecialization("");
        setInstruments([]);
        setGenres([]);
        setEducation([{ id: uuidv4(), institution: "", degree: "", year: "" }]);
        setExperience([{ id: uuidv4(), company: "", position: "", period: "" }]);
        setCertificates([{ id: uuidv4(), name: "", issuer: "", year: "" }]);
        setBusinessFile(null);
        setVerified(false);
      }, 3000);
    }, 2000);
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
                {/* 전공 선택 섹션 */}
                <UpgradeSpecializationSection 
                  specialization={specialization}
                  setSpecialization={setSpecialization}
                />
                
                {/* 악기 선택 섹션 */}
                <ProfileTagsSection
                  title="악기"
                  tags={instruments}
                  setTags={setInstruments}
                  newTag={newInstrument}
                  setNewTag={setNewInstrument}
                  placeholder="악기 추가"
                />
                
                {/* 장르 선택 섹션 */}
                <ProfileTagsSection
                  title="장르"
                  tags={genres}
                  setTags={setGenres}
                  newTag={newGenre}
                  setNewTag={setNewGenre}
                  placeholder="장르 추가"
                />
                
                {/* 학력 섹션 */}
                <UpgradeEducationSection
                  education={education}
                  setEducation={setEducation}
                />
                
                {/* 경력 섹션 */}
                <UpgradeExperienceSection
                  experience={experience}
                  setExperience={setExperience}
                />
                
                {/* 자격증 섹션 */}
                <UpgradeCertificatesSection
                  certificates={certificates}
                  setCertificates={setCertificates}
                />
                
                {/* 사업자 등록증 업로드 */}
                <div>
                  <Label htmlFor="business-cert">사업자 등록증 (선택사항)</Label>
                  <Input 
                    id="business-cert" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBusinessFile(e.target.files[0]);
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    음악 관련 사업자인 경우 등록증을 업로드하시면 검증이 빠르게 진행됩니다.
                  </p>
                </div>
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
