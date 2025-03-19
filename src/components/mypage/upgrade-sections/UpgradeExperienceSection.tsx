
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
}

interface UpgradeExperienceSectionProps {
  experience: Experience[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
}

export function UpgradeExperienceSection({
  experience,
  setExperience
}: UpgradeExperienceSectionProps) {
  const addExperience = () => {
    setExperience([...experience, { id: uuidv4(), company: "", position: "", period: "" }]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(item => item.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(
      experience.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>경력</Label>
        <Button 
          type="button" 
          size="sm" 
          variant="outline" 
          onClick={addExperience}
        >
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </div>
      
      {experience.map((exp, index) => (
        <div key={exp.id} className="space-y-2 p-3 border rounded-md">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">경력 정보 {index + 1}</Label>
            {index > 0 && (
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`company-${exp.id}`} className="text-xs">회사/기관</Label>
              <Input
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                placeholder="서울 심포니 오케스트라"
              />
            </div>
            <div>
              <Label htmlFor={`position-${exp.id}`} className="text-xs">직위/역할</Label>
              <Input
                id={`position-${exp.id}`}
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                placeholder="첼로 주자"
              />
            </div>
            <div>
              <Label htmlFor={`period-${exp.id}`} className="text-xs">기간</Label>
              <Input
                id={`period-${exp.id}`}
                value={exp.period}
                onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                placeholder="2018-2022"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
