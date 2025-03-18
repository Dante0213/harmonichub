
import { Button } from "@/components/ui/button";

// 패널 타입 정의
export type ActivePanelType = 'library' | 'midi' | 'metronome' | null;

// 패널 버튼 컴포넌트
interface PanelButtonProps {
  panelName: ActivePanelType;
  activePanel: ActivePanelType;
  icon: React.ReactNode;
  onClick: () => void;
}

export function PanelButton({ panelName, activePanel, icon, onClick }: PanelButtonProps) {
  return (
    <Button
      variant={activePanel === panelName ? "default" : "outline"}
      size="icon"
      onClick={onClick}
      className="h-10 w-10 rounded-full"
    >
      {icon}
    </Button>
  );
}
