
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TeacherBasicInfoForm } from "./register/TeacherBasicInfoForm";
import { TeacherGenreSelection } from "./register/TeacherGenreSelection";
import { TeacherScheduleForm } from "./register/TeacherScheduleForm";
import { TeacherCurriculumForm } from "./register/TeacherCurriculumForm";
import { TeacherPricingForm } from "./register/TeacherPricingForm";

export function TeacherRegisterModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [certificates, setCertificates] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [image, setImage] = useState("/placeholder.svg");
  const [musicTypes, setMusicTypes] = useState<string[]>([]);
  
  // 커리큘럼 상태 관리
  const [curriculum, setCurriculum] = useState("");
  
  // 레슨 가격 상태 관리
  const [lessonCount, setLessonCount] = useState<number>(4);
  const [lessonPrice, setLessonPrice] = useState<number>(100000);
  
  // 원포인트 레슨 가격 상태 관리
  const [onePointPrice, setOnePointPrice] = useState<number>(30000);
  const [onePointDuration, setOnePointDuration] = useState<number>(10);
  
  // 일정 관리를 위한 상태
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const handleMusicTypeChange = (value: string) => {
    if (musicTypes.includes(value)) {
      setMusicTypes(musicTypes.filter((type) => type !== value));
    } else {
      setMusicTypes([...musicTypes, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 선생님 정보와 함께 일정 정보도 저장
    const teacherData = {
      name,
      specialty,
      education,
      experience,
      certificates,
      introduction,
      image,
      musicTypes,
      isProfessional: true, // 모든 선생님을 전문가로 설정
      curriculum,
      pricing: {
        lessonCount,
        lessonPrice,
        onePointPrice,
        onePointDuration
      },
      schedule: {
        date: selectedDate,
        availableTimes
      }
    };
    
    console.log(teacherData);
    
    // 로컬 스토리지에 선생님 정보 저장 (임시 구현)
    const existingTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    localStorage.setItem('teachers', JSON.stringify([...existingTeachers, teacherData]));
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>선생님 등록하기</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 음악 장르 선택 */}
          <TeacherGenreSelection 
            musicTypes={musicTypes} 
            handleMusicTypeChange={handleMusicTypeChange} 
          />
          
          {/* 기본 정보 입력 폼 */}
          <TeacherBasicInfoForm 
            name={name}
            setName={setName}
            specialty={specialty}
            setSpecialty={setSpecialty}
            education={education}
            setEducation={setEducation}
            experience={experience}
            setExperience={setExperience}
            certificates={certificates}
            setCertificates={setCertificates}
            introduction={introduction}
            setIntroduction={setIntroduction}
            image={image}
          />
          
          {/* 커리큘럼 섹션 */}
          <TeacherCurriculumForm
            curriculum={curriculum}
            setCurriculum={setCurriculum}
          />
          
          {/* 레슨 가격 정보 섹션 */}
          <TeacherPricingForm
            lessonCount={lessonCount}
            setLessonCount={setLessonCount}
            lessonPrice={lessonPrice}
            setLessonPrice={setLessonPrice}
            onePointPrice={onePointPrice}
            setOnePointPrice={setOnePointPrice}
            onePointDuration={onePointDuration}
            setOnePointDuration={setOnePointDuration}
          />
          
          {/* 레슨 일정 관리 섹션 */}
          <TeacherScheduleForm 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableTimes={availableTimes}
            setAvailableTimes={setAvailableTimes}
          />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
