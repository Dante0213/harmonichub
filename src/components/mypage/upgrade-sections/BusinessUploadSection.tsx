
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BusinessUploadSectionProps {
  businessFile: File | null;
  setBusinessFile: (file: File | null) => void;
}

export function BusinessUploadSection({
  businessFile,
  setBusinessFile
}: BusinessUploadSectionProps) {
  return (
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
  );
}
