
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, GraduationCap, MessageCircle, Video } from "lucide-react";
import { useState } from "react";
import { TeacherScheduleModal } from "./TeacherScheduleModal";
import { TeacherChatModal } from "./TeacherChatModal";
import { TeacherVodModal } from "./TeacherVodModal";
import { OnePointLessonModal } from "./OnePointLessonModal";
import { Teacher } from "./TeacherData";

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeacher: Teacher | null;
}

export function TeacherProfileModal({ 
  isOpen, 
  onClose, 
  selectedTeacher 
}: TeacherProfileModalProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isVodModalOpen, setIsVodModalOpen] = useState(false);
  const [isOnePointModalOpen, setIsOnePointModalOpen] = useState(false);

  // 레슨 예약 모달 열기
  const openScheduleModal = () => {
    if (selectedTeacher) {
      onClose(); // 기존 모달 닫기
      setIsScheduleModalOpen(true); // 레슨 예약 모달 열기
    }
  };

  // 원포인트 레슨 모달 열기
  const openOnePointModal = () => {
    if (selectedTeacher) {
      onClose(); // 기존 모달 닫기
      setIsOnePointModalOpen(true); // 원포인트 레슨 모달 열기
    }
  };

  // 채팅 모달 열기 
  const openChatModal = () => {
    if (selectedTeacher) {
      onClose(); // 기존 모달 닫기
      setIsChatModalOpen(true); // 채팅 모달 열기
    }
  };

  // VOD 모달 열기
  const openVodModal = () => {
    if (selectedTeacher) {
      onClose(); // 기존 모달 닫기
      setIsVodModalOpen(true); // VOD 모달 열기
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
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
              
              <div className="flex flex-wrap gap-2 my-4">
                <Button size="sm" onClick={openScheduleModal}>
                  <Calendar className="h-4 w-4 mr-2" />
                  레슨 예약
                </Button>
                <Button size="sm" variant="secondary" onClick={openOnePointModal}>
                  <Calendar className="h-4 w-4 mr-2" />
                  원포인트 레슨
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

      {/* 원포인트 레슨 모달 */}
      {selectedTeacher && (
        <OnePointLessonModal
          isOpen={isOnePointModalOpen}
          onClose={() => setIsOnePointModalOpen(false)}
          teacherId={selectedTeacher.id}
          teacherName={selectedTeacher.name}
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
    </>
  );
}
