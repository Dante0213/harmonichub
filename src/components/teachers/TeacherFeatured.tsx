
import { useState } from "react";
import { TopTeachersList } from "./TopTeachersList";
import { CreatorsList } from "./CreatorsList";
import { TeacherProfileModal, TeacherData } from "./TeacherProfileModal";

interface TeacherFeaturedProps {
  onlyProfessional?: boolean;
}

export function TeacherFeatured({ onlyProfessional = false }: TeacherFeaturedProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTeacherProfile = (teacher: TeacherData) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Top Teachers Card */}
      <TopTeachersList 
        onlyProfessional={true} // Always show only professional teachers
        onSelectTeacher={openTeacherProfile} 
      />
      
      {/* Creators Card - replacing the advertisement carousel */}
      <CreatorsList onSelectCreator={openTeacherProfile} />

      {/* Teacher Profile Modal */}
      <TeacherProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTeacher={selectedTeacher}
      />
    </div>
  );
}
