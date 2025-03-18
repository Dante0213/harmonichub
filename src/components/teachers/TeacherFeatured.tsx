
import { useState } from "react";
import { TopTeachersList } from "./TopTeachersList";
import { AdvertisementCarousel } from "./AdvertisementCarousel";
import { TeacherProfileModal } from "./TeacherProfileModal";
import { Teacher } from "./TeacherData";

interface TeacherFeaturedProps {
  onlyProfessional?: boolean;
}

export function TeacherFeatured({ onlyProfessional = false }: TeacherFeaturedProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTeacherProfile = (teacher: Teacher) => {
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
      
      {/* Advertisement Carousel */}
      <AdvertisementCarousel />

      {/* Teacher Profile Modal */}
      <TeacherProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTeacher={selectedTeacher}
      />
    </div>
  );
}
