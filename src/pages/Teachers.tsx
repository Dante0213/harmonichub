
import { Layout } from "@/components/layout/Layout";
import { TeacherFeatured } from "@/components/teachers/TeacherFeatured";
import { TeacherRegisterButton } from "@/components/teachers/TeacherRegisterButton";
import { TeacherGrid } from "@/components/teachers/TeacherGrid";

const Teachers = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">선생님</h1>
          <TeacherRegisterButton />
        </div>
        <TeacherFeatured />
        <TeacherGrid />
      </div>
    </Layout>
  );
};

export default Teachers;
