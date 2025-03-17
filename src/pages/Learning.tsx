
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { 
  BookOpen, FileText, Video, Clock, CheckCircle, 
  Upload, BellRing, Users2, PlusCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Learning = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [homeworkText, setHomeworkText] = useState("");
  const { toast } = useToast();
  
  const lessons = [
    {
      title: "오늘 오후 3시",
      description: "김지수 선생님과 피아노 레슨",
      isToday: true
    },
    {
      title: "내일 오전 11시",
      description: "박현우 선생님과 기타 레슨",
      isToday: false
    }
  ];
  
  const lessonRooms = [
    { name: "피아노 레슨룸 1", status: "사용 가능", capacity: 1 },
    { name: "피아노 레슨룸 2", status: "사용 중", capacity: 1 },
    { name: "기타 레슨룸", status: "사용 가능", capacity: 2 },
    { name: "드럼 레슨룸", status: "사용 가능", capacity: 2 },
    { name: "앙상블 레슨룸", status: "사용 중", capacity: 5 },
    { name: "보컬 레슨룸", status: "사용 가능", capacity: 2 },
  ];
  
  const myVods = [
    {
      title: "피아노 기초 마스터",
      progress: 45,
      totalLessons: 24,
      completedLessons: 10
    },
    {
      title: "어쿠스틱 기타 입문",
      progress: 30,
      totalLessons: 18,
      completedLessons: 5
    },
    {
      title: "클래식 기타 기초",
      progress: 100,
      totalLessons: 22,
      completedLessons: 22
    }
  ];
  
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
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">개인 학습실</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 일정 관리 */}
          <Card>
            <CardHeader>
              <CardTitle>레슨 일정</CardTitle>
              <CardDescription>다가오는 레슨 일정을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mb-4"
              />
              <div className="space-y-4">
                {lessons.map((lesson, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md border p-3">
                    <BellRing className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.description}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      입장
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* VOD 진도율 */}
          <Card>
            <CardHeader>
              <CardTitle>내 VOD 학습 진도</CardTitle>
              <CardDescription>현재 학습 중인 VOD 강의</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myVods.map((vod, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{vod.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {vod.completedLessons}/{vod.totalLessons} 레슨
                      </p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${vod.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        variant={vod.progress === 100 ? "outline" : "default"}
                        className="text-xs"
                      >
                        {vod.progress === 100 ? "다시 보기" : "계속 학습하기"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>스토어에서 더 보기</span>
              </Button>
            </CardFooter>
          </Card>
          
          {/* 숙제 제출 */}
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
        </div>
        
        <Tabs defaultValue="lessonroom" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="lessonroom">레슨룸 입장</TabsTrigger>
            <TabsTrigger value="homework">지난 숙제</TabsTrigger>
            <TabsTrigger value="history">레슨 기록</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessonroom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessonRooms.map((room, i) => (
                <Card key={i} className={room.status === "사용 중" ? "opacity-60" : ""}>
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span className={`flex items-center gap-1 ${room.status === "사용 가능" ? "text-green-500" : "text-red-500"}`}>
                        {room.status === "사용 가능" ? <CheckCircle className="h-3 w-3" /> : null}
                        {room.status}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users2 className="h-3 w-3" /> {room.capacity}명
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" disabled={room.status === "사용 중"}>입장하기</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="homework">
            <div className="space-y-4">
              {[
                { title: "피아노 스케일 연습", date: "2023-06-15", teacher: "김지수", status: "완료", feedback: "스케일 연습이 많이 향상되었습니다. 계속해서 연습하세요." },
                { title: "기타 코드 연습", date: "2023-06-10", teacher: "박현우", status: "완료", feedback: "코드 전환이 자연스러워졌습니다. 다음 수업에서는 스트로크 패턴을 연습해봅시다." }
              ].map((homework, i) => (
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
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {[
                { date: "2023-06-15", teacher: "김지수", instrument: "피아노", duration: "50분", notes: "스케일과 코드 연습, 간단한 곡 연주" },
                { date: "2023-06-10", teacher: "박현우", instrument: "기타", duration: "50분", notes: "기본 코드와 스트로크 패턴 연습" },
                { date: "2023-06-05", teacher: "김지수", instrument: "피아노", duration: "50분", notes: "음계 이론과 기본 화성학 소개" }
              ].map((lesson, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{lesson.date} 레슨</CardTitle>
                    <CardDescription>
                      {lesson.teacher} 선생님 | {lesson.instrument} | {lesson.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm"><strong>수업 내용:</strong> {lesson.notes}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">노트 보기</Button>
                    <Button size="sm">레코딩 보기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Learning;
