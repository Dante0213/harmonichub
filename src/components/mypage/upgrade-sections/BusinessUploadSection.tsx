
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BusinessUploadSectionProps {
  businessFile: File | null;
  setBusinessFile: (file: File | null) => void;
}

export function BusinessUploadSection({
  businessFile,
  setBusinessFile
}: BusinessUploadSectionProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBusinessFile(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="business-cert">사업자 등록증 (선택사항)</Label>
      <Input 
        id="business-cert" 
        type="file" 
        accept=".pdf,.jpg,.jpeg,.png" 
        onChange={handleFileChange}
      />
      {fileName && (
        <p className="text-xs text-primary mt-1">
          선택된 파일: {fileName}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        음악 관련 사업자인 경우 등록증을 업로드하시면 검증이 빠르게 진행됩니다.
      </p>
    </div>
  );
}
