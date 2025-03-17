
import { useState, useEffect } from 'react';
import { reelsData, Reel } from './reels/ReelsData';
import { ReelMainView } from './reels/ReelMainView';
import { Card, CardContent } from '@/components/ui/card';

interface SocialReelsFeedProps {
  onUserClick?: (user: Reel) => void;
}

export const SocialReelsFeed = ({ onUserClick }: SocialReelsFeedProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reels, setReels] = useState<Reel[]>(reelsData);

  const handlePrevReel = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextReel = () => {
    setActiveIndex((prev) => (prev < reels.length - 1 ? prev + 1 : prev));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        handlePrevReel();
      } else if (e.key === 'ArrowDown') {
        handleNextReel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Card className="overflow-hidden border-none shadow-none bg-transparent">
      <CardContent className="p-0 relative">
        <div className="relative h-[calc(100vh-200px)] min-h-[500px]">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 -z-10'
              }`}
            >
              <ReelMainView reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
