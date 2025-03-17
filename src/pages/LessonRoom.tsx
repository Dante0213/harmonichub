
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instrument3DModel } from "@/components/lesson-room/Instrument3DModel";
import { LessonSchedule } from "@/components/learning/LessonSchedule";
import { InstructorsList } from "@/components/lesson-room/InstructorsList";
import { LessonRooms } from "@/components/learning/LessonRooms";
import { LessonReservation } from "@/components/lesson-room/LessonReservation";

const LessonRoom = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">레슨실</h1>
        
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
