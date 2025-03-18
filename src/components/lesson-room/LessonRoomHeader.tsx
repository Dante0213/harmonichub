
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function LessonRoomHeader() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">레슨실</h1>
      
      <Alert className="mb-8">
        <Info className="h-4 w-4" />
        <AlertTitle>안내</AlertTitle>
        <AlertDescription>
          레슨실에서 선생님을 만나 실시간 화상 레슨을 받을 수 있습니다. 레슨 일정을 확인하고 예약된 시간에 입장하세요.
        </AlertDescription>
      </Alert>
    </>
  );
}
