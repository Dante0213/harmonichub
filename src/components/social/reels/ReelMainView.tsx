
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { MusicNoteModel, Environment } from "../models/MusicNoteModel";
import { Reel } from "./ReelsData";
import { ReelUserInfo } from "./ReelUserInfo";
import { ReelControls } from "./ReelControls";

interface ReelMainViewProps {
  reel: Reel;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
  onPrevReel: () => void;
  onNextReel: () => void;
  onUserClick: () => void;
}

export const ReelMainView = ({
  reel,
  isPlaying,
  isMuted,
  onPlayToggle,
  onMuteToggle,
  onPrevReel,
  onNextReel,
  onUserClick,
}: ReelMainViewProps) => {
  return (
    <div className="relative h-[600px] bg-black rounded-lg overflow-hidden">
      {/* 릴스 컨트롤 버튼 */}
      <div className="absolute top-1/2 left-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/30 text-white rounded-full hover:bg-black/50"
          onClick={onPrevReel}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/30 text-white rounded-full hover:bg-black/50"
          onClick={onNextReel}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* 릴스 콘텐츠 */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 3D 배경 음표 */}
        <div className="absolute w-full h-full z-0">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <PresentationControls
              global
              zoom={0.8}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}>
              <MusicNoteModel />
            </PresentationControls>
            <Environment preset="city" />
          </Canvas>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 flex flex-col z-20">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold">음악 릴스</h3>
              <p>#{reel.content.split('#')[1] || '음악'}</p>
            </div>
          </div>
          
          <div className="p-4">
            <ReelUserInfo reel={reel} onUserClick={onUserClick} />
            <p className="text-white text-sm mb-2">{reel.content}</p>
            <ReelControls 
              reel={reel}
              isPlaying={isPlaying}
              isMuted={isMuted}
              onPlayToggle={onPlayToggle}
              onMuteToggle={onMuteToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
