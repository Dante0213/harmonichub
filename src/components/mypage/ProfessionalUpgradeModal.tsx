
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMyPage } from "@/hooks/use-my-page";
import { useToast } from "@/hooks/use-toast";
import { ProfileTagsSection } from "@/components/profile/ProfileTagsSection";
import { ProfileEducationSection } from "@/components/profile/ProfileEducationSection";
import { ProfileExperienceSection } from "@/components/profile/ProfileExperienceSection";
import { ProfileCertificatesSection } from "@/components/profile/ProfileCertificatesSection";
import { v4 as uuidv4 } from "uuid";

interface ProfessionalUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfessionalUpgradeModal({ open, onOpenChange }: ProfessionalUpgradeModalProps) {
  const { toast } = useToast();
  const { updateProfessionalStatus } = useMyPage();

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
        
        <div className="space-y-6 py-4">
          {verified ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">검증이 완료되었습니다</h3>
              <p className="text-gray-500">전문가 회원으로 전환이 성공적으로 완료되었습니다.</p>
            </div>
          ) : (
            <>
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
              <ProfileEducationSection
                education={education}
                setEducation={setEducation}
              />
              
              {/* 경력 섹션 */}
              <ProfileExperienceSection
                experience={experience}
                setExperience={setExperience}
              />
              
              {/* 자격증 섹션 */}
              <ProfileCertificatesSection
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
      </DialogContent>
    </Dialog>
  );
}
