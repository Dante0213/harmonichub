
import { Layout } from "@/components/layout/Layout";
import { LessonRoomHeader } from "@/components/lesson-room/LessonRoomHeader";
import { InstructorSection } from "@/components/lesson-room/InstructorSection";
import { LessonRoomTabs } from "@/components/lesson-room/LessonRoomTabs";

const LessonRoom = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <LessonRoomHeader />
        <InstructorSection />
        <LessonRoomTabs />
      </div>
    </Layout>
  );
};

export default LessonRoom;
