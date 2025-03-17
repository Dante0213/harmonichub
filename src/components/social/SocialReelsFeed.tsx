
import { useState, useEffect } from 'react';
import { reelsData, Reel } from './reels/ReelsData';
import { ReelMainView } from './reels/ReelMainView';
import { Card, CardContent } from '@/components/ui/card';

interface SocialReelsFeedProps {
  onUserClick?: (user: Reel) => void;
}

export const SocialReelsFeed = ({ onUserClick }: SocialReelsFeedProps) => {
  const [reels, setReels] = useState<Reel[]>(reelsData);
  const [visibleReels, setVisibleReels] = useState<number>(5);

  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (isBottom && visibleReels < reels.length) {
        setVisibleReels(prev => Math.min(prev + 2, reels.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleReels, reels.length]);

  return (
    <div className="w-full">
      <Card className="overflow-hidden border-none shadow-none bg-transparent">
        <CardContent className="p-0 space-y-6">
          {reels.slice(0, visibleReels).map((reel) => (
            <div key={reel.id} className="h-[calc(100vh-200px)] min-h-[500px] max-h-[800px] relative rounded-lg overflow-hidden mb-6">
              <ReelMainView reel={reel} onUserClick={onUserClick ? () => onUserClick(reel) : undefined} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
