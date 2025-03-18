
import { useState } from "react";
import { TeacherCard } from "./TeacherCard";
import { TeacherFilters } from "./TeacherFilters";
import { teachersList, specialties, Teacher } from "./TeacherData";
import { TeacherProfileModal } from "./TeacherProfileModal";

export function TeacherGrid() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);

  const openTeacherProfile = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const filteredTeachers = teachersList.filter(teacher => {
    if (categoryFilter && teacher.category !== categoryFilter) return false;
    if (specialtyFilter && teacher.specialty !== specialtyFilter) return false;
    return true;
  });

  return (
    <section>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">선생님 목록</h2>
        
        <TeacherFilters 
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          specialtyFilter={specialtyFilter}
          setSpecialtyFilter={setSpecialtyFilter}
          specialties={specialties}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeachers.map((teacher) => (
          <TeacherCard 
            key={teacher.id} 
            teacher={teacher} 
            onSelect={openTeacherProfile} 
          />
        ))}
      </div>

      {/* Teacher Profile Modal */}
      <TeacherProfileModal
        selectedTeacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
