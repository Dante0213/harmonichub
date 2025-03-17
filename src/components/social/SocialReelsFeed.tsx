
import { useState, useEffect } from 'react';
import { reelsData, Reel } from './reels/ReelsData';
import { ReelMainView } from './reels/ReelMainView';
import { Card, CardContent } from '@/components/ui/card';

interface SocialReelsFeedProps {
  onUserClick?: (user: Reel) => void;
}

export const SocialReelsFeed = ({ onUserClick }: SocialReelsFeedProps) => {
  const [reels, setReels] = useState<Reel[]>(reelsData);

  return (
    <Card className="overflow-hidden border-none shadow-none bg-transparent">
      <CardContent className="p-0 relative">
        <div className="space-y-6">
          {reels.map((reel, index) => (
            <div key={reel.id} className="h-[calc(100vh-200px)] min-h-[500px] relative">
              <ReelMainView reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
