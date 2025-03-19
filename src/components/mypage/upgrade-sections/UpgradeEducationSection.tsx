
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface UpgradeEducationSectionProps {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

export function UpgradeEducationSection({
  education,
  setEducation
}: UpgradeEducationSectionProps) {
  const addEducation = () => {
    setEducation([...education, { id: uuidv4(), institution: "", degree: "", year: "" }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(item => item.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(
      education.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>학력</Label>
        <Button 
          type="button" 
          size="sm" 
          variant="outline" 
          onClick={addEducation}
        >
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </div>
      
      {education.map((edu, index) => (
        <div key={edu.id} className="space-y-2 p-3 border rounded-md">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">학력 정보 {index + 1}</Label>
            {index > 0 && (
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`institution-${edu.id}`} className="text-xs">학교/기관</Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                placeholder="서울대학교"
              />
            </div>
            <div>
              <Label htmlFor={`degree-${edu.id}`} className="text-xs">학위/전공</Label>
              <Input
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                placeholder="음악학 학사"
              />
            </div>
            <div>
              <Label htmlFor={`year-${edu.id}`} className="text-xs">졸업연도</Label>
              <Input
                id={`year-${edu.id}`}
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                placeholder="2020"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
