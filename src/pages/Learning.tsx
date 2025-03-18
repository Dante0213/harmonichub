
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonSchedule } from "@/components/learning/LessonSchedule";
import { VodProgress } from "@/components/learning/VodProgress";
import { HomeworkSubmission } from "@/components/learning/HomeworkSubmission";
import { HomeworkHistory } from "@/components/learning/HomeworkHistory";
import { LessonHistory } from "@/components/learning/LessonHistory";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Info, Video, Music } from "lucide-react";
import { VideoLessonRoom } from "@/components/lesson-room/VideoLessonRoom";

const Learning = () => {
  const [lessonRoomOpen, setLessonRoomOpen] = useState(false);
  
  // 샘플 레슨 정보
  const sampleLessonInfo = {
    title: "피아노 기초 레슨",
    teacherName: "김선생",
    time: "14:00 - 15:00"
  };
  
  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">개인 학습실</h1>
        
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>
            개인 학습실에서 레슨 일정 확인, 숙제 제출, VOD 학습 진도 확인 등을 할 수 있습니다.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 레슨룸 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>레슨룸</CardTitle>
              <CardDescription>실시간 레슨 및 개인 연습실</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">다음 예약된 레슨</p>
                    <p className="text-xs text-muted-foreground">오늘 14:00 - 김선생님</p>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => setLessonRoomOpen(true)}
                  >
                    <Video className="h-4 w-4 mr-1" />
                    입장하기
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">개인 연습실</p>
                    <p className="text-xs text-muted-foreground">언제든지 연습할 수 있는 공간</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Music className="h-4 w-4 mr-1" />
                    연습하기
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">모든 레슨 일정 보기</Button>
            </CardFooter>
          </Card>
          
          {/* 일정 관리 */}
          <LessonSchedule />
          
          {/* VOD 진도율 - 크기 줄임 */}
          <div className="lg:col-span-1">
            <VodProgress />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 숙제 제출 */}
          <div className="lg:col-span-3">
            <HomeworkSubmission />
          </div>
        </div>
        
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="received">받은 과제</TabsTrigger>
            <TabsTrigger value="history">지난 과제</TabsTrigger>
            <TabsTrigger value="lesson-history">레슨 기록</TabsTrigger>
          </TabsList>
          
          <TabsContent value="received">
            <HomeworkHistory showSubmitted={false} />
          </TabsContent>
          
          <TabsContent value="history">
            <HomeworkHistory showSubmitted={true} />
          </TabsContent>
          
          <TabsContent value="lesson-history">
            <LessonHistory />
          </TabsContent>
        </Tabs>
        
        {/* 레슨룸 모달 */}
        <VideoLessonRoom 
          isOpen={lessonRoomOpen}
          onClose={() => setLessonRoomOpen(false)}
          lessonInfo={sampleLessonInfo}
        />
      </div>
    </Layout>
  );
};

export default Learning;
