
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instrument3DModel } from "@/components/lesson-room/Instrument3DModel";
import { LessonSchedule } from "@/components/learning/LessonSchedule";
import { InstructorsList } from "@/components/lesson-room/InstructorsList";
import { LessonRooms } from "@/components/learning/LessonRooms";
import { LessonReservation } from "@/components/lesson-room/LessonReservation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const LessonRoom = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">레슨실</h1>
        
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>
            레슨실에서 선생님을 만나 실시간 화상 레슨을 받을 수 있습니다. 레슨 일정을 확인하고 예약된 시간에 입장하세요.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 3D 악기 모델 */}
          <Instrument3DModel />

          {/* 레슨 일정 */}
          <LessonSchedule />
        </div>
        
        <Tabs defaultValue="instructors">
          <TabsList className="mb-4">
            <TabsTrigger value="instructors">강사 소개</TabsTrigger>
            <TabsTrigger value="lessonroom">레슨룸 입장</TabsTrigger>
            <TabsTrigger value="reservation">레슨 예약</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructors">
            <InstructorsList />
          </TabsContent>
          
          <TabsContent value="lessonroom">
            <LessonRooms />
          </TabsContent>
          
          <TabsContent value="reservation">
            <LessonReservation />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LessonRoom;
