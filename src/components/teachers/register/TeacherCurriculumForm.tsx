
import { FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TeacherCurriculumFormProps {
  curriculum: string;
  setCurriculum: (value: string) => void;
}

export function TeacherCurriculumForm({ 
  curriculum, 
  setCurriculum 
}: TeacherCurriculumFormProps) {
  return (
    <div className="space-y-2">
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">커리큘럼</h3>
        <p className="text-sm text-muted-foreground mb-4">
          학생들에게 제공할 커리큘럼 내용을 상세히 작성해주세요. 
          레슨 방식, 진행 순서 등을 포함하면 좋습니다.
        </p>
        
        <div className="space-y-2">
          <FormLabel htmlFor="curriculum">커리큘럼 내용</FormLabel>
          <Textarea
            id="curriculum"
            placeholder="예: 1-2주차: 기본 코드 익히기, 3-4주차: 스트러밍 연습..."
            className="min-h-[100px]"
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
