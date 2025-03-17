
import { Play, Music } from "lucide-react";
import { Reel } from "./ReelsData";

interface ReelsThumbnailProps {
  reel: Reel;
  isActive: boolean;
  onClick: () => void;
}

export const ReelsThumbnail = ({ reel, isActive, onClick }: ReelsThumbnailProps) => {
  return (
    <div 
      className={`relative aspect-[9/16] rounded-md overflow-hidden cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-2 left-2 text-white text-xs">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{reel.userHandle}</p>
          {reel.isTeacher && (
            <Music className="h-3 w-3 text-primary" fill="currentColor" />
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Play className="w-3 h-3" />
          <span>{reel.views}</span>
        </div>
      </div>
    </div>
  );
};
