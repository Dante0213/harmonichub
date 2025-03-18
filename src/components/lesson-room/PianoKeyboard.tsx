
import { useRef } from "react";

export function PianoKeyboard() {
  const pianoContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-2">
      <div className="flex relative h-20 mx-2" ref={pianoContainerRef}>
        {/* 하얀 건반 */}
        {['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note, i) => (
          <div 
            key={`${note}-${i}`} 
            className="flex-1 bg-white border border-gray-300 flex items-end justify-center pb-1 rounded-b-sm cursor-pointer hover:bg-gray-100 active:bg-gray-200"
          >
            <span className="text-xs text-gray-500">{note}</span>
          </div>
        ))}
        
        {/* 검은 건반 */}
        {[0, 1, 3, 4, 5, 7, 8, 10, 11, 13].map((i) => {
          // 이 위치에는 검은 건반이 없음 (E-F, B-C 사이)
          if (i === 2 || i === 6 || i === 9 || i === 13) return null;
          const leftPosition = (i * 7.14) + 3.57; // 14개 건반에 맞춘 위치 계산
          return (
            <div 
              key={`black-${i}`} 
              className="absolute top-0 w-[4%] h-[65%] bg-black rounded-b-sm cursor-pointer hover:bg-gray-800 active:bg-gray-700"
              style={{ left: `${leftPosition}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
