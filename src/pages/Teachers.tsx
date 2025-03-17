
import { Layout } from "@/components/layout/Layout";
import { TeacherFeatured } from "@/components/teachers/TeacherFeatured";
import { TeacherRegisterButton } from "@/components/teachers/TeacherRegisterButton";
import { TeacherGrid } from "@/components/teachers/TeacherGrid";

const Teachers = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="flex justify-end mb-6">
          <TeacherRegisterButton />
        </div>
        <TeacherFeatured />
        <TeacherGrid />
      </div>
    </Layout>
  );
};

export default Teachers;
