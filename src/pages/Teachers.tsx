
import { Layout } from "@/components/layout/Layout";
import { TeacherFeatured } from "@/components/teachers/TeacherFeatured";
import { TeacherRegisterButton } from "@/components/teachers/TeacherRegisterButton";
import { TeacherGrid } from "@/components/teachers/TeacherGrid";
import { Link, useLocation } from "react-router-dom";

const Teachers = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/teachers" 
              className={`text-sm font-medium ${isActive('/teachers') ? 'text-primary' : 'hover:text-primary'}`}
            >
              선생님
            </Link>
            <Link 
              to="/social" 
              className={`text-sm font-medium ${isActive('/social') ? 'text-primary' : 'hover:text-primary'}`}
            >
              SNS
            </Link>
            <Link 
              to="/learning" 
              className={`text-sm font-medium ${isActive('/learning') ? 'text-primary' : 'hover:text-primary'}`}
            >
              학습실
            </Link>
            <Link 
              to="/store" 
              className={`text-sm font-medium ${isActive('/store') ? 'text-primary' : 'hover:text-primary'}`}
            >
              스토어
            </Link>
          </div>
          <TeacherRegisterButton />
        </div>
        <TeacherFeatured />
        <TeacherGrid />
      </div>
    </Layout>
  );
};

export default Teachers;
