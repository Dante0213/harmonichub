
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface ProfileEducationSectionProps {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

export const ProfileEducationSection = ({ education, setEducation }: ProfileEducationSectionProps) => {
  const addEducation = () => {
    setEducation([
      ...education, 
      {id: uuidv4(), institution: "", degree: "", year: ""}
    ]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setEducation(education.map(item => 
      item.id === id ? {...item, [field]: value} : item
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>학력</FormLabel>
        <Button 
          type="button" 
          onClick={addEducation} 
          size="sm" 
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" /> 학력 추가
        </Button>
      </div>
      
      {education.map((edu) => (
        <div key={edu.id} className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md">
          <div className="col-span-5">
            <FormLabel className="text-xs">기관/학교</FormLabel>
            <Input
              value={edu.institution}
              onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
              placeholder="기관/학교 이름"
            />
          </div>
          <div className="col-span-4">
            <FormLabel className="text-xs">학위/전공</FormLabel>
            <Input
              value={edu.degree}
              onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
              placeholder="학위/전공"
            />
          </div>
          <div className="col-span-2">
            <FormLabel className="text-xs">기간</FormLabel>
            <Input
              value={edu.year}
              onChange={e => updateEducation(edu.id, 'year', e.target.value)}
              placeholder="기간"
            />
          </div>
          <div className="col-span-1 flex items-end justify-center h-full">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => removeEducation(edu.id)}
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
