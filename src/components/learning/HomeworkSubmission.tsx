
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HomeworkSubmission = () => {
  const [homeworkText, setHomeworkText] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("김지수 선생님 (피아노)");
  const { toast } = useToast();
  
  const handleHomeworkSubmit = () => {
    if (homeworkText.trim()) {
      toast({
        title: "숙제가 제출되었습니다",
        description: `${selectedTeacher}에게 전달되었습니다.`,
        duration: 3000
      });
      setHomeworkText("");
    }
  };

  const sentAssignments = [
    { 
      title: "피아노 스케일 연습", 
      date: "2023-06-15", 
      teacher: "김지수 선생님", 
      status: "검토 완료", 
      feedback: "스케일 연습이 많이 향상되었습니다. 계속해서 연습하세요." 
    },
    { 
      title: "기타 코드 연습", 
      date: "2023-06-10", 
      teacher: "박현우 선생님", 
      status: "검토 중", 
      feedback: "" 
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>숙제 제출</CardTitle>
        <CardDescription>선생님에게 숙제를 제출하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="submit">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="submit" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              제출하기
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex-1">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              보낸 과제
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">담당 선생님</label>
                <select 
                  className="w-full p-2 border rounded-md mt-1"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
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
          </TabsContent>
          
          <TabsContent value="sent">
            <div className="space-y-4">
              {sentAssignments.map((assignment, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {assignment.date} • {assignment.teacher}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      assignment.status === "검토 완료" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  
                  {assignment.feedback && (
                    <div className="mt-2 p-2 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-1">피드백:</p>
                      <p className="text-sm">{assignment.feedback}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">자세히 보기</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <TabsContent value="submit" className="w-full mt-0">
          <Button 
            className="w-full" 
            onClick={handleHomeworkSubmit}
            disabled={!homeworkText.trim()}
          >
            제출하기
          </Button>
        </TabsContent>
      </CardFooter>
    </Card>
  );
};
