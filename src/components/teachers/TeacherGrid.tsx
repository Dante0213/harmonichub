
import { useState } from "react";
import { TeacherCard } from "./TeacherCard";
import { TeacherFilters } from "./TeacherFilters";
import { TeacherDetailModal } from "./TeacherDetailModal";
import { teachersList, specialties, Teacher } from "./TeacherData";
import { TeacherScheduleModal } from "./TeacherScheduleModal";
import { TeacherChatModal } from "./TeacherChatModal";
import { TeacherVodModal } from "./TeacherVodModal";

export function TeacherGrid() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isVodModalOpen, setIsVodModalOpen] = useState(false);

  const openTeacherProfile = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  // 레슨 예약 모달 열기
  const openScheduleModal = () => {
    if (selectedTeacher) {
      setIsModalOpen(false); // 기존 모달 닫기
      setIsScheduleModalOpen(true); // 레슨 예약 모달 열기
    }
  };

  // 채팅 모달 열기 
  const openChatModal = () => {
    if (selectedTeacher) {
      setIsModalOpen(false); // 기존 모달 닫기
      setIsChatModalOpen(true); // 채팅 모달 열기
    }
  };

  // VOD 모달 열기
  const openVodModal = () => {
    if (selectedTeacher) {
      setIsModalOpen(false); // 기존 모달 닫기
      setIsVodModalOpen(true); // VOD 모달 열기
    }
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
      <TeacherDetailModal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onScheduleClick={openScheduleModal}
        onChatClick={openChatModal}
        onVodClick={openVodModal}
      />

      {/* 레슨 예약 모달 */}
      {selectedTeacher && (
        <TeacherScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          teacherName={selectedTeacher.name}
          teacherId={selectedTeacher.id}
        />
      )}

      {/* 1:1 대화 모달 */}
      {selectedTeacher && (
        <TeacherChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          teacherName={selectedTeacher.name}
          teacherId={selectedTeacher.id}
          teacherImage={selectedTeacher.image}
        />
      )}

      {/* VOD 모달 */}
      {selectedTeacher && (
        <TeacherVodModal
          isOpen={isVodModalOpen}
          onClose={() => setIsVodModalOpen(false)}
          teacherName={selectedTeacher.name}
          teacherId={selectedTeacher.id}
        />
      )}
    </section>
  );
}
