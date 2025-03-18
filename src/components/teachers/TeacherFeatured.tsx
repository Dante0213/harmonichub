
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, GraduationCap, MessageCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TeacherScheduleModal } from "./TeacherScheduleModal";
import { TeacherChatModal } from "./TeacherChatModal";
import { TeacherVodModal } from "./TeacherVodModal";

interface TeacherFeaturedProps {
  onlyProfessional?: boolean;
}

export function TeacherFeatured({ onlyProfessional = false }: TeacherFeaturedProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof topTeachers[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isVodModalOpen, setIsVodModalOpen] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);
  
  // 전체 교사 데이터 (Mock data)
  const topTeachers = [
    { 
      id: 1, 
      name: "김선생", 
      image: "/placeholder.svg",
      specialty: "피아노",
      education: "서울대학교 음악대학",
      experience: "10년 경력",
      certificates: "음악교육 자격증",
      introduction: "반갑습니다. 피아노를 가르치고 있습니다.",
      isProfessional: true,
    },
    { 
      id: 2, 
      name: "이선생", 
      image: "/placeholder.svg",
      specialty: "기타",
      education: "한양대학교 음악대학",
      experience: "8년 경력",
      certificates: "기타 지도사 자격증",
      introduction: "기타를 쉽고 재미있게 가르칩니다.",
      isProfessional: true,
    },
    { 
      id: 3, 
      name: "박선생", 
      image: "/placeholder.svg",
      specialty: "바이올린",
      education: "연세대학교 음악대학",
      experience: "12년 경력",
      certificates: "바이올린 마스터 자격증",
      introduction: "바이올린의 아름다움을 전달합니다.",
      isProfessional: false,
    },
  ];
  
  // 등록된 교사 가져오기
  useEffect(() => {
    // 로컬 스토리지에서 등록된 선생님 가져오기
    const storedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    
    // 전문가만 필터링해서 표시
    let filteredTeachers = [...topTeachers];
    
    if (onlyProfessional) {
      filteredTeachers = filteredTeachers.filter(teacher => teacher.isProfessional);
    }
    
    // 등록된 선생님들 추가
    const allTeachers = [...filteredTeachers, ...storedTeachers].slice(0, 3);
    setTeachers(allTeachers);
  }, [onlyProfessional]);
  
  // Mock data for ads
  const advertisements = [
    { id: 1, title: "광고 1", image: "/placeholder.svg" },
    { id: 2, title: "광고 2", image: "/placeholder.svg" },
    { id: 3, title: "광고 3", image: "/placeholder.svg" },
  ];

  const openTeacherProfile = (teacher: typeof topTeachers[0]) => {
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

  // Auto-slide for ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [advertisements.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Top Teachers Card */}
      <Card className="w-full h-[373px] overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">이번달 최고 인기 강사 Top3</h2>
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center gap-4">
                <Avatar className="w-16 h-16 rounded-md border">
                  <AvatarImage src={teacher.image} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.specialty}</p>
                  {teacher.isProfessional && (
                    <span className="inline-flex items-center text-xs font-medium text-blue-600">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      전문가
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openTeacherProfile(teacher)}
                >
                  프로필 보기
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Advertisement Carousel */}
      <Card className="w-full h-[373px] overflow-hidden">
        <CardContent className="p-0 h-full">
          <Carousel className="w-full h-full" setApi={() => {}}>
            <CarouselContent className="h-full">
              {advertisements.map((ad) => (
                <CarouselItem key={ad.id} className="h-full">
                  <div className="flex items-center justify-center h-full p-2">
                    <img 
                      src={ad.image} 
                      alt={ad.title}
                      className="max-w-full max-h-full object-contain rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </CardContent>
      </Card>

      {/* Teacher Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>선생님 프로필</DialogTitle>
              </DialogHeader>
              
              <div className="flex items-center gap-4 my-4">
                <Avatar className="w-[75px] h-[75px]">
                  <AvatarImage src={selectedTeacher.image} alt={selectedTeacher.name} />
                  <AvatarFallback>{selectedTeacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium">{selectedTeacher.name}</h3>
                  <p className="text-muted-foreground">{selectedTeacher.specialty}</p>
                  {selectedTeacher.isProfessional && (
                    <span className="inline-flex items-center text-xs font-medium text-blue-600">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      전문가
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 my-4">
                <Button size="sm" onClick={openScheduleModal}>
                  <Calendar className="h-4 w-4 mr-2" />
                  레슨 예약
                </Button>
                <Button size="sm" variant="outline" onClick={openChatModal}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  1:1 대화
                </Button>
                <Button size="sm" variant="secondary" onClick={openVodModal}>
                  <Video className="h-4 w-4 mr-2" />
                  VOD 보러가기
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">학력</h4>
                  <p>{selectedTeacher.education}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">경력</h4>
                  <p>{selectedTeacher.experience}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">자격증</h4>
                  <p>{selectedTeacher.certificates}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">소개글</h4>
                  <p>{selectedTeacher.introduction}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
    </div>
  );
}
