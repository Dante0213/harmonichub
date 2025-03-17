
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Homework {
  title: string;
  date: string;
  teacher: string;
  status: string;
  feedback: string;
}

interface HomeworkHistoryProps {
  homeworks?: Homework[];
}

export const HomeworkHistory = ({ homeworks }: HomeworkHistoryProps) => {
  const homeworkItems = homeworks || [
    { title: "피아노 스케일 연습", date: "2023-06-15", teacher: "김지수", status: "완료", feedback: "스케일 연습이 많이 향상되었습니다. 계속해서 연습하세요." },
    { title: "기타 코드 연습", date: "2023-06-10", teacher: "박현우", status: "완료", feedback: "코드 전환이 자연스러워졌습니다. 다음 수업에서는 스트로크 패턴을 연습해봅시다." },
    { title: "드럼 리듬 패턴", date: "2023-06-05", teacher: "정태현", status: "검토 중", feedback: "" }
  ];

  const submittedHomeworks = [
    { title: "바이올린 활 사용법", date: "2023-06-20", teacher: "이민지", status: "제출 완료", feedback: "" },
    { title: "색소폰 음계 연습", date: "2023-06-18", teacher: "김지수", status: "검토 중", feedback: "" }
  ];

  return (
    <Tabs defaultValue="received">
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value="received">받은 과제</TabsTrigger>
        <TabsTrigger value="submitted">보낸 과제</TabsTrigger>
      </TabsList>
      
      <TabsContent value="received" className="space-y-4">
        {homeworkItems.map((homework, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{homework.title}</CardTitle>
                    <CardDescription>
                      {homework.date} | {homework.teacher} 선생님
                    </CardDescription>
                  </div>
                </div>
                <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  homework.status === "완료" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {homework.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {homework.feedback ? (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm">{homework.feedback}</p>
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">아직 피드백이 없습니다.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">자세히 보기</Button>
              {homework.status === "완료" && (
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ClipboardCheck className="h-4 w-4" />
                  다음 과제 확인
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </TabsContent>
      
      <TabsContent value="submitted" className="space-y-4">
        {submittedHomeworks.map((homework, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{homework.title}</CardTitle>
                    <CardDescription>
                      {homework.date} | {homework.teacher} 선생님에게 제출
                    </CardDescription>
                  </div>
                </div>
                <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  homework.status === "제출 완료" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {homework.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  {homework.feedback || "선생님이 아직 피드백을 남기지 않았습니다."}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">과제 상세 보기</Button>
            </CardFooter>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
};
