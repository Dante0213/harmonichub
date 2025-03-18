
import { Layout } from "@/components/layout/Layout";
import { TeacherFeatured } from "@/components/teachers/TeacherFeatured";
import { TeacherRegisterButton } from "@/components/teachers/TeacherRegisterButton";
import { TeacherGrid } from "@/components/teachers/TeacherGrid";
import { useEffect, useState } from "react";

const Teachers = () => {
  const [isProfessionalSection, setIsProfessionalSection] = useState(false);
  
  // 페이지 로드 시 전문가 섹션만 표시되는지 확인
  useEffect(() => {
    // 세션스토리지에서 사용자 정보 확인 (예시 코드)
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      // 전문가 사용자인 경우 전문가 섹션만 표시
      setIsProfessionalSection(parsedData.isProfessional === true);
    }
    
    // 로컬 스토리지에서 등록된 선생님 확인
    const existingTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    if (existingTeachers.length > 0) {
      setIsProfessionalSection(true);
    }
  }, []);

  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <TeacherRegisterButton />
        </div>
        <TeacherFeatured onlyProfessional={true} />
        <TeacherGrid />
      </div>
    </Layout>
  );
};

export default Teachers;
