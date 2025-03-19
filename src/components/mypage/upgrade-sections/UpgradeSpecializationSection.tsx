
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface UpgradeSpecializationSectionProps {
  specialization: string;
  setSpecialization: (value: string) => void;
}

export function UpgradeSpecializationSection({
  specialization,
  setSpecialization
}: UpgradeSpecializationSectionProps) {
  return (
    <div className="space-y-2">
      <Label>전공</Label>
      <Select onValueChange={setSpecialization} value={specialization}>
        <SelectTrigger>
          <SelectValue placeholder="전공 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="piano">피아노</SelectItem>
          <SelectItem value="guitar">기타</SelectItem>
          <SelectItem value="violin">바이올린</SelectItem>
          <SelectItem value="vocal">보컬</SelectItem>
          <SelectItem value="composition">작곡</SelectItem>
          <SelectItem value="other">기타</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
