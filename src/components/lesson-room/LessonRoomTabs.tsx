
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstructorsList } from "@/components/lesson-room/InstructorsList";
import { LessonRooms } from "@/components/learning/LessonRooms";
import { LessonReservation } from "@/components/lesson-room/LessonReservation";

export function LessonRoomTabs() {
  return (
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
  );
}
