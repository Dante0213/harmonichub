
import { SheetLibrary } from "./SheetLibrary";
import { MidiConnectionPanel } from "./MidiConnectionPanel";
import { MetronomePanel } from "./MetronomePanel";
import { AudioPlayerPanel } from "./AudioPlayerPanel";
import { ActivePanelType } from "./PanelButton";

// 패널 영역 컴포넌트
interface ActivePanelProps {
  activePanel: ActivePanelType;
  selectedSheet: string | null;
  onSheetSelect: (sheetTitle: string) => void;
  onFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  metronomeActive: boolean;
  metronomeTempo: number;
  metronomeVolume: number;
  onToggleMetronome: () => void;
  onMetronomeTempoChange: (value: number) => void;
  onMetronomeVolumeChange: (value: number) => void;
}

export function ActivePanelComponent({
  activePanel,
  selectedSheet,
  onSheetSelect,
  onFileUpload,
  fileInputRef,
  onFileChange,
  metronomeActive,
  metronomeTempo,
  metronomeVolume,
  onToggleMetronome,
  onMetronomeTempoChange,
  onMetronomeVolumeChange
}: ActivePanelProps) {
  if (!activePanel) return null;
  
  return (
    <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white border rounded-lg shadow-lg p-4">
      {activePanel === "library" && (
        <SheetLibrary 
          selectedSheet={selectedSheet}
          onSheetSelect={onSheetSelect}
          onFileUpload={onFileUpload}
          fileInputRef={fileInputRef}
          onFileChange={onFileChange}
        />
      )}
      {activePanel === "midi" && (
        <MidiConnectionPanel />
      )}
      {activePanel === "metronome" && (
        <MetronomePanel 
          isActive={metronomeActive}
          tempo={metronomeTempo}
          volume={metronomeVolume}
          onToggle={onToggleMetronome}
          onTempoChange={onMetronomeTempoChange}
          onVolumeChange={onMetronomeVolumeChange}
        />
      )}
      {activePanel === "player" && (
        <AudioPlayerPanel />
      )}
    </div>
  );
}
