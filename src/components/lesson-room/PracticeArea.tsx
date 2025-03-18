
import { PianoKeyboard } from "./PianoKeyboard";

export function PracticeArea() {
  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-auto">
        {/* 악보 영역 */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">연습 모드</h2>
          
          {/* 악보 표시 영역 */}
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center mb-4">
            <p className="text-gray-500">여기에 악보가 표시됩니다</p>
          </div>
          
          {/* 연습 도구 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3">
              <h3 className="text-sm font-medium mb-2">연습곡 목록</h3>
              <ul className="text-sm space-y-1">
                <li className="p-2 bg-blue-50 rounded">현재 연습곡: 쇼팽 녹턴 Op.9 No.2</li>
                <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">모차르트 소나타 K.545</li>
                <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">베토벤 월광 소나타</li>
                <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">바흐 인벤션 No.1</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-3">
              <h3 className="text-sm font-medium mb-2">연습 기록</h3>
              <div className="text-sm">
                <p>오늘 연습 시간: <strong>45분</strong></p>
                <p>이번 주 연습 시간: <strong>3시간 20분</strong></p>
                <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
                  <div className="h-4 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">주간 목표의 65% 달성</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 피아노 건반 */}
      <PianoKeyboard />
    </div>
  );
}
