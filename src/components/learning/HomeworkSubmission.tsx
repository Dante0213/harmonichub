
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const HomeworkSubmission = () => {
  const [file, setFile] = useState<File | null>(null);
  const [teacherName, setTeacherName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (type: 'file' | 'text') => {
    if (!teacherName) {
      toast.error("선생님 이름을 입력해주세요.");
      return;
    }

    if (type === 'file') {
      if (!file) {
        toast.error("파일을 선택해주세요.");
        return;
      }
      toast.success(`${teacherName} 선생님에게 과제가 제출되었습니다.`);
      // 실제로는 서버로 데이터를 전송하고 과제함에 저장하는 로직이 필요합니다.
    } else {
      if (!title || !content) {
        toast.error("제목과 내용을 모두 입력해주세요.");
        return;
      }
      toast.success(`${teacherName} 선생님에게 과제가 제출되었습니다.`);
      // 실제로는 서버로 데이터를 전송하고 보낸 과제함에 저장하는 로직이 필요합니다.
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>숙제 제출</CardTitle>
        <CardDescription>숙제를 선생님에게 제출하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="teacher-name">선생님 이름</Label>
          <Input 
            id="teacher-name" 
            placeholder="과제를 제출할 선생님 이름" 
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="mb-4"
          />
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="upload">파일 업로드</TabsTrigger>
            <TabsTrigger value="text">보낸 과제</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm">파일 선택</Button>
                </Label>
                {file && (
                  <p className="mt-2 text-sm text-green-600">{file.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="assignment-desc">설명 (선택사항)</Label>
                <Textarea 
                  id="assignment-desc" 
                  placeholder="숙제에 대한 설명을 적어주세요" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="space-y-4">
              <div>
                <Label htmlFor="homework-title">제목</Label>
                <Input 
                  id="homework-title" 
                  placeholder="숙제 제목" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="homework-content">내용</Label>
                <Textarea 
                  id="homework-content" 
                  placeholder="숙제 내용을 적어주세요" 
                  rows={6} 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Tabs defaultValue="upload" className="w-full">
          <TabsContent value="upload">
            <Button className="w-full" onClick={() => handleSubmit('file')}>제출하기</Button>
          </TabsContent>
          <TabsContent value="text">
            <Button className="w-full" onClick={() => handleSubmit('text')}>제출하기</Button>
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  );
};
