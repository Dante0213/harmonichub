
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export function TeacherRegisterButton() {
  return (
    <Button 
      className="h-[28px] w-[140px] text-sm"
      onClick={() => console.log("Teacher registration")}
    >
      <UserPlus className="h-4 w-4 mr-2" />
      선생님 등록하기
    </Button>
  );
}
