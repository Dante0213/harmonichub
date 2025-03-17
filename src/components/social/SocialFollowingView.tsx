
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reel } from "./reels/ReelsData";
import { useSocial } from "@/pages/Social";
import { useToast } from "@/hooks/use-toast";
import { UserCheck } from "lucide-react";

export const SocialFollowingView = () => {
  const { followedUsers, unfollowUser } = useSocial();
  const { toast } = useToast();
  
  const handleUnfollow = (user: Reel) => {
    unfollowUser(user.id);
    toast({
      title: "팔로우 취소됨",
      description: `${user.userHandle}님을 더 이상 팔로우하지 않습니다.`,
      duration: 1000
    });
  };

  if (followedUsers.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">아직 팔로우하는 사용자가 없습니다</h3>
        <p className="text-muted-foreground mb-4">다른 사용자를 팔로우하여 그들의 게시물을 확인하세요</p>
        <Button onClick={() => window.location.href = "#/social"}>
          추천 사용자 보기
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4">팔로잉</h3>
      <div className="space-y-4">
        {followedUsers.map((user) => (
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
              onClick={() => handleUnfollow(user)}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              팔로잉
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
