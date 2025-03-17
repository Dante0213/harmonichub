
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { TeacherRegisterModal } from "./TeacherRegisterModal";

export function TeacherRegisterButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        className="h-[28px] w-[140px] text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        선생님 등록하기
      </Button>
      
      <TeacherRegisterModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
}
