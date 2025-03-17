
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const HomeworkSubmission = () => {
  const [homeworkText, setHomeworkText] = useState("");
  const { toast } = useToast();
  
  const handleHomeworkSubmit = () => {
    if (homeworkText.trim()) {
      toast({
        title: "숙제가 제출되었습니다",
        description: "담당 선생님에게 전달되었습니다.",
        duration: 3000
      });
      setHomeworkText("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>숙제 제출</CardTitle>
        <CardDescription>선생님에게 숙제를 제출하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">담당 선생님</label>
            <select className="w-full p-2 border rounded-md mt-1">
              <option>김지수 선생님 (피아노)</option>
              <option>박현우 선생님 (기타)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">숙제 내용</label>
            <textarea 
              className="w-full p-2 border rounded-md mt-1 h-20 resize-none" 
              placeholder="숙제에 대한 설명을 작성하세요"
              value={homeworkText}
              onChange={(e) => setHomeworkText(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">파일 첨부</label>
            <div className="border border-dashed rounded-md p-4 mt-1 flex flex-col items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">파일을 끌어 놓거나 클릭하여 업로드</p>
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" className="mt-2" type="button">
                  파일 선택
                </Button>
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleHomeworkSubmit}
          disabled={!homeworkText.trim()}
        >
          제출하기
        </Button>
      </CardFooter>
    </Card>
  );
};
