
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";

export function ProfessionalUpgradeModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [specialty, setSpecialty] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [certificates, setCertificates] = useState("");
  const [musicTypes, setMusicTypes] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleMusicTypeChange = (value: string) => {
    if (musicTypes.includes(value)) {
      setMusicTypes(musicTypes.filter((type) => type !== value));
    } else {
      setMusicTypes([...musicTypes, value]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: File[] = Array.from(e.target.files);
      setFileList([...fileList, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFileList(fileList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 제출 시뮬레이션
    setTimeout(() => {
      console.log({
        specialty,
        education,
        experience,
        certificates,
        musicTypes,
        fileList
      });
      
      toast({
        title: "전문가 전환 신청 완료",
        description: "신청이 접수되었습니다. 검토 후 승인 메일을 보내드립니다.",
      });
      
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>전문가로 전환하기</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="specialty">전공</Label>
            <Select 
              onValueChange={(value) => setSpecialty(value)}
              value={specialty}
            >
              <SelectTrigger id="specialty">
                <SelectValue placeholder="전공을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="피아노">피아노</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
                <SelectItem value="바이올린">바이올린</SelectItem>
                <SelectItem value="드럼">드럼</SelectItem>
                <SelectItem value="보컬">보컬</SelectItem>
                <SelectItem value="작곡">작곡</SelectItem>
                <SelectItem value="베이스">베이스</SelectItem>
                <SelectItem value="퍼커션">퍼커션</SelectItem>
                <SelectItem value="화성학 이론">화성학 이론</SelectItem>
                <SelectItem value="전자음악">전자음악</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="mb-2 block">음악 장르</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="classic" 
                  checked={musicTypes.includes("클래식")}
                  onCheckedChange={() => handleMusicTypeChange("클래식")}
                />
                <label
                  htmlFor="classic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  클래식
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="popular" 
                  checked={musicTypes.includes("실용음악")}
                  onCheckedChange={() => handleMusicTypeChange("실용음악")}
                />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  실용음악
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="education">학력</Label>
            <Input 
              id="education" 
              value={education} 
              onChange={(e) => setEducation(e.target.value)} 
              placeholder="학력을 입력하세요"
            />
          </div>
          
          <div>
            <Label htmlFor="experience">경력</Label>
            <Textarea 
              id="experience" 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)} 
              placeholder="경력을 입력하세요"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="certificates">자격증</Label>
            <Input 
              id="certificates" 
              value={certificates} 
              onChange={(e) => setCertificates(e.target.value)} 
              placeholder="자격증을 입력하세요"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="file-upload">증빙 자료 업로드</Label>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="file-upload" className="flex items-center gap-2 p-6 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">자격증, 학위증, 경력 증명서 등을 업로드하세요</span>
                <Input 
                  id="file-upload" 
                  type="file" 
                  multiple 
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={handleFileChange}
                />
              </Label>
            </div>
            
            {fileList.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">업로드된 파일 ({fileList.length})</p>
                <div className="border rounded-md divide-y">
                  {fileList.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  제출 중...
                </>
              ) : "전문가 전환 신청"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
