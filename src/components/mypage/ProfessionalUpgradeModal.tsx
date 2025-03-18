
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMyPage } from "@/hooks/use-my-page";

interface ProfessionalUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProfessionalFormData {
  education: {
    institution: string;
    degree: string;
    year: string;
  };
  experience: {
    company: string;
    position: string;
    period: string;
  };
  certificate: {
    name: string;
    issuer: string;
    year: string;
  };
  instruments: string;
  genres: string;
}

export function ProfessionalUpgradeModal({ open, onOpenChange }: ProfessionalUpgradeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { updateProfessionalStatus } = useMyPage();
  
  const form = useForm<ProfessionalFormData>({
    defaultValues: {
      education: {
        institution: "",
        degree: "",
        year: "",
      },
      experience: {
        company: "",
        position: "",
        period: "",
      },
      certificate: {
        name: "",
        issuer: "",
        year: "",
      },
      instruments: "",
      genres: "",
    },
  });

  const onSubmit = (data: ProfessionalFormData) => {
    setIsSubmitting(true);
    
    // 전문가 데이터 준비
    const professionalData = {
      instruments: data.instruments.split(',').map(item => item.trim()),
      genres: data.genres.split(',').map(item => item.trim()),
      education: [{
        id: `ed${Date.now()}`,
        institution: data.education.institution,
        degree: data.education.degree,
        year: data.education.year
      }],
      experience: [{
        id: `exp${Date.now()}`,
        company: data.experience.company,
        position: data.experience.position,
        period: data.experience.period
      }],
      certificates: [{
        id: `cert${Date.now()}`,
        name: data.certificate.name,
        issuer: data.certificate.issuer,
        year: data.certificate.year
      }]
    };

    // 검증 시뮬레이션 (실제 앱에서는 서버 API로 검증 요청)
    setTimeout(() => {
      // 전문가 상태 업데이트
      updateProfessionalStatus(true, professionalData);
      
      // 완료 토스트 메시지
      toast({
        title: "전문가 전환 완료",
        description: "전문가 회원으로 전환되었습니다.",
      });
      
      setIsSubmitting(false);
      onOpenChange(false); // 모달 닫기
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>전문가 회원 전환</DialogTitle>
          <DialogDescription>
            전문가 회원이 되기 위한 정보를 입력해주세요. 검증 후 전문가 회원으로 전환됩니다.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">악기 & 장르</h3>
              
              <FormField
                control={form.control}
                name="instruments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>악기 (쉼표로 구분)</FormLabel>
                    <FormControl>
                      <Input placeholder="기타, 피아노, 드럼" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="genres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>장르 (쉼표로 구분)</FormLabel>
                    <FormControl>
                      <Input placeholder="클래식, 재즈, 락" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">학력</h3>
              
              <FormField
                control={form.control}
                name="education.institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>학교명</FormLabel>
                    <FormControl>
                      <Input placeholder="서울음악대학" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="education.degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>학과/전공</FormLabel>
                    <FormControl>
                      <Input placeholder="음악학과" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="education.year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>재학기간</FormLabel>
                    <FormControl>
                      <Input placeholder="2018-2022" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">경력</h3>
              
              <FormField
                control={form.control}
                name="experience.company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>회사/기관명</FormLabel>
                    <FormControl>
                      <Input placeholder="음악 스튜디오" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience.position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>직책/역할</FormLabel>
                    <FormControl>
                      <Input placeholder="기타리스트" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience.period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>근무기간</FormLabel>
                    <FormControl>
                      <Input placeholder="2022-현재" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">자격증</h3>
              
              <FormField
                control={form.control}
                name="certificate.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자격증명</FormLabel>
                    <FormControl>
                      <Input placeholder="음악 지도사 자격증" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="certificate.issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>발급기관</FormLabel>
                    <FormControl>
                      <Input placeholder="한국음악협회" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="certificate.year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>취득연도</FormLabel>
                    <FormControl>
                      <Input placeholder="2021" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "처리 중..." : "전문가 전환 신청"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
