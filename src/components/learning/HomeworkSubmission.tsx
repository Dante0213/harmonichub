
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { isValidFileType, isValidFileSize } from "@/lib/file-utils";

export const HomeworkSubmission = () => {
  const [file, setFile] = useState<File | null>(null);
  const [teacherName, setTeacherName] = useState("");
  const [description, setDescription] = useState("");
  const [currentTab, setCurrentTab] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedFiles, setSavedFiles] = useState<{name: string, date: string, teacher: string}[]>([
    { name: "피아노_연습_녹음.mp3", date: "2023-07-10", teacher: "김지수" },
    { name: "기타_코드_연습.pdf", date: "2023-07-05", teacher: "박현우" },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!teacherName) {
      toast.error("받는 사람을 입력해주세요.");
      return;
    }

    if (!file) {
      toast.error("파일을 선택해주세요.");
      return;
    }

    // 파일 유효성 검사
    if (!isValidFileSize(file)) {
      toast.error("파일 크기는 5MB 이하여야 합니다.");
      return;
    }
    
    // 새 파일 목록에 추가
    const newFile = {
      name: file.name,
      date: new Date().toISOString().split('T')[0],
      teacher: teacherName
    };
    
    setSavedFiles([newFile, ...savedFiles]);
    toast.success(`${teacherName} 선생님에게 과제가 제출되었습니다.`);
    
    // 폼 초기화
    setFile(null);
    setDescription("");
    
    // 파일 input 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>과제 제출</CardTitle>
        <CardDescription>과제를 선생님에게 제출하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="teacher-name">받는 사람</Label>
          <Input 
            id="teacher-name" 
            placeholder="과제를 제출할 선생님 이름" 
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="mb-4"
          />
        </div>

        <Tabs defaultValue="upload" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="upload">파일 업로드</TabsTrigger>
            <TabsTrigger value="storage">보낸 과제</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onClick={handleFileSelect}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button variant="outline" size="sm" type="button">파일 선택</Button>
                {file && (
                  <p className="mt-2 text-sm text-green-600">{file.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="assignment-desc">설명 (선택사항)</Label>
                <Textarea 
                  id="assignment-desc" 
                  placeholder="과제에 대한 설명을 적어주세요" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="storage">
            <div className="space-y-4">
              {savedFiles.length > 0 ? (
                <div className="rounded-md border">
                  <div className="p-3 bg-muted font-medium">
                    저장된 파일 목록
                  </div>
                  <div className="divide-y">
                    {savedFiles.map((savedFile, index) => (
                      <div key={index} className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{savedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {savedFile.date} | {savedFile.teacher} 선생님에게 제출
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">보기</Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-md">
                  <p className="text-muted-foreground">제출한 과제가 없습니다.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Tabs value={currentTab} className="w-full">
          <TabsContent value="upload">
            <Button className="w-full" onClick={handleSubmit}>제출하기</Button>
          </TabsContent>
          <TabsContent value="storage">
            <div className="flex justify-end w-full">
              <Button variant="outline">새로고침</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  );
};
