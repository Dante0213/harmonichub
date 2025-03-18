
import { PianoKeyboard } from "./PianoKeyboard";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PracticeArea({ onTogglePracticeMode, practiceMode }: { onTogglePracticeMode: () => void, practiceMode: boolean }) {
  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-auto">
        {/* 악보 영역 */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">연습 모드</h2>
            
            {/* 연습모드 전환 버튼 (같은 위치에 고정) */}
            <Button 
              variant={practiceMode ? "secondary" : "outline"}
              size="sm"
              onClick={onTogglePracticeMode}
              className="flex items-center gap-1"
            >
              <span>{practiceMode ? "레슨 모드" : "연습 모드"}</span>
            </Button>
          </div>
          
          {/* 악보 표시 영역 */}
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center mb-4">
            <p className="text-gray-500">여기에 악보가 표시됩니다</p>
          </div>
          
          {/* 음원 재생 버튼 */}
          <div className="flex justify-center mb-4">
            <Button className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>음원 재생</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* 피아노 건반 */}
      <PianoKeyboard />
    </div>
  );
}
