
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    { title: "기타 코드 연습", date: "2023-06-10", teacher: "박현우", status: "완료", feedback: "코드 전환이 자연스러워졌습니다. 다음 수업에서는 스트로크 패턴을 연습해봅시다." }
  ];

  return (
    <div className="space-y-4">
      {homeworkItems.map((homework, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{homework.title}</CardTitle>
                <CardDescription>
                  {homework.date} | {homework.teacher} 선생님
                </CardDescription>
              </div>
              <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {homework.status}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">{homework.feedback}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">다시 제출하기</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
