
import { useState, useEffect } from 'react';
import { reelsData, Reel } from './reels/ReelsData';
import { ReelMainView } from './reels/ReelMainView';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

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

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
          <Button
            variant="secondary"
            size="icon"
            onClick={handlePrevReel}
            disabled={activeIndex === 0}
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleNextReel}
            disabled={activeIndex === reels.length - 1}
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
