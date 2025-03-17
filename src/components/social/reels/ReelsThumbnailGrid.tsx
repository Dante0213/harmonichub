
import { Reel } from "./ReelsData";
import { ReelsThumbnail } from "./ReelsThumbnail";

interface ReelsThumbnailGridProps {
  reels: Reel[];
  activeReelIndex: number;
  onReelSelect: (index: number) => void;
}

export const ReelsThumbnailGrid = ({ 
  reels, 
  activeReelIndex, 
  onReelSelect 
}: ReelsThumbnailGridProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">더 많은 릴스</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {reels.map((reel, index) => (
          <ReelsThumbnail
            key={reel.id}
            reel={reel}
            isActive={index === activeReelIndex}
            onClick={() => onReelSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};
