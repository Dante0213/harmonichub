
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function MidiConnectionPanel() {
  return (
    <div className="w-full">
      {/* MIDI 연결 상태 */}
      <div className="border rounded-md p-3 mb-4">
        <h3 className="text-sm font-medium mb-2">MIDI 장치 연결</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => toast.info("MIDI 장치 연결을 시도합니다...")}
        >
          MIDI 장치 연결하기
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          USB로 연결된 MIDI 키보드를 감지합니다
        </p>
      </div>
    </div>
  );
}
