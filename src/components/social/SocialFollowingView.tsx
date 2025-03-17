
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reelsData, Reel } from "./reels/ReelsData";

export const SocialFollowingView = () => {
  const [followingUsers, setFollowingUsers] = useState<Reel[]>([]);
  
  // In a real app, this would fetch from an API or local storage
  // For demo purposes, we're showing it empty by default
  
  const handleViewRecommended = () => {
    // Here you could navigate to a recommended users page
    // For demo, let's just add some sample users
    setFollowingUsers(reelsData.slice(0, 2));
  };

  const handleUnfollow = (userId: number | string) => {
    setFollowingUsers(followingUsers.filter(user => user.id !== userId));
  };

  if (followingUsers.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">아직 팔로우하는 사용자가 없습니다</h3>
        <p className="text-muted-foreground mb-4">다른 사용자를 팔로우하여 그들의 게시물을 확인하세요</p>
        <Button onClick={handleViewRecommended}>추천 사용자 보기</Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4">팔로잉</h3>
      <div className="space-y-4">
        {followingUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <div className="flex items-center gap-3">
              <Avatar>
                {user.imageUrl ? (
                  <AvatarImage src={user.imageUrl} alt={user.user} />
                ) : (
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{user.user}</p>
                <p className="text-xs text-muted-foreground">@{user.userHandle}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleUnfollow(user.id)}
            >
              팔로잉
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
