
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, GraduationCap, MessageCircle, Video } from "lucide-react";

interface TeacherDetailModalProps {
  teacher: any | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleClick: () => void;
  onChatClick: () => void;
  onVodClick: () => void;
}

export function TeacherDetailModal({
  teacher,
  isOpen,
  onClose,
  onScheduleClick,
  onChatClick,
  onVodClick
}: TeacherDetailModalProps) {
  if (!teacher) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>선생님 프로필</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center gap-4 my-4">
          <Avatar className="w-[75px] h-[75px]">
            <AvatarImage src={teacher.image} alt={teacher.name} />
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-medium">{teacher.name}</h3>
            <p className="text-muted-foreground">{teacher.specialty}</p>
            {teacher.isProfessional && (
              <span className="inline-flex items-center text-xs font-medium text-blue-600">
                <GraduationCap className="h-3 w-3 mr-1" />
                전문가
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 my-4">
          <Button size="sm" onClick={onScheduleClick}>
            <Calendar className="h-4 w-4 mr-2" />
            레슨 예약
          </Button>
          <Button size="sm" variant="outline" onClick={onChatClick}>
            <MessageCircle className="h-4 w-4 mr-2" />
            1:1 대화
          </Button>
          <Button size="sm" variant="secondary" onClick={onVodClick}>
            <Video className="h-4 w-4 mr-2" />
            VOD 보러가기
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">학력</h4>
            <p>{teacher.education}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">경력</h4>
            <p>{teacher.experience}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">자격증</h4>
            <p>{teacher.certificates}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">소개글</h4>
            <p>{teacher.introduction}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
