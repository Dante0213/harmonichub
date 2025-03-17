
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
}

interface ProfileExperienceSectionProps {
  experience: Experience[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
}

export const ProfileExperienceSection = ({ experience, setExperience }: ProfileExperienceSectionProps) => {
  const addExperience = () => {
    setExperience([
      ...experience, 
      {id: uuidv4(), company: "", position: "", period: ""}
    ]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperience(experience.map(item => 
      item.id === id ? {...item, [field]: value} : item
    ));
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>경력</FormLabel>
        <Button 
          type="button" 
          onClick={addExperience} 
          size="sm" 
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" /> 경력 추가
        </Button>
      </div>
      
      {experience.map((exp) => (
        <div key={exp.id} className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md">
          <div className="col-span-5">
            <FormLabel className="text-xs">회사/단체</FormLabel>
            <Input
              value={exp.company}
              onChange={e => updateExperience(exp.id, 'company', e.target.value)}
              placeholder="회사/단체 이름"
            />
          </div>
          <div className="col-span-4">
            <FormLabel className="text-xs">직책/역할</FormLabel>
            <Input
              value={exp.position}
              onChange={e => updateExperience(exp.id, 'position', e.target.value)}
              placeholder="직책/역할"
            />
          </div>
          <div className="col-span-2">
            <FormLabel className="text-xs">기간</FormLabel>
            <Input
              value={exp.period}
              onChange={e => updateExperience(exp.id, 'period', e.target.value)}
              placeholder="기간"
            />
          </div>
          <div className="col-span-1 flex items-end justify-center h-full">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => removeExperience(exp.id)}
              className="h-9 w-9 text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
