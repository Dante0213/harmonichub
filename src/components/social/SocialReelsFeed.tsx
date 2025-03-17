
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
    <Card className="overflow-hidden border-none shadow-none bg-transparent">
      <CardContent className="p-0 relative">
        <div className="space-y-6">
          {reels.slice(0, visibleReels).map((reel, index) => (
            <div key={reel.id} className="h-[calc(100vh-200px)] min-h-[500px] relative">
              <ReelMainView reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
