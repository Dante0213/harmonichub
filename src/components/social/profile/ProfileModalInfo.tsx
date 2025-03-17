
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, MessageSquare } from "lucide-react";
import { Reel } from "../reels/ReelsData";
import { useSocial } from "@/pages/Social";
import { useToast } from "@/hooks/use-toast";
import { ProfileInfo } from "@/components/profile/ProfileInfo";

interface ProfileModalInfoProps {
  user: Reel;
  onChatOpen: () => void;
}

export const ProfileModalInfo = ({ user, onChatOpen }: ProfileModalInfoProps) => {
  const { isFollowing, followUser, unfollowUser } = useSocial();
  const following = isFollowing(user.id);
  const { toast } = useToast();
  
  const handleFollowToggle = () => {
    if (following) {
      unfollowUser(user.id);
      toast({
        title: "팔로우 취소됨",
        description: `${user.userHandle}님을 더 이상 팔로우하지 않습니다.`,
        duration: 1000
      });
    } else {
      followUser(user);
      toast({
        title: "팔로우 추가됨",
        description: `${user.userHandle}님을 팔로우합니다.`,
        duration: 1000
      });
    }
  };

  return (
    <>
      <div className="mb-4">
        <Card>
          <CardHeader className="relative pb-0">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                {user.imageUrl ? (
                  <AvatarImage src={user.imageUrl} alt={user.user} />
                ) : (
                  <AvatarFallback className="text-4xl">{user.avatar}</AvatarFallback>
                )}
              </Avatar>
              <h1 className="text-2xl font-bold">{user.user}</h1>
              <p className="text-muted-foreground">@{user.userHandle}</p>
              
              <div className="flex justify-between w-full mt-6 mb-2">
                <div className="text-center flex-1">
                  <p className="font-bold">42</p>
                  <p className="text-sm text-muted-foreground">게시물</p>
                </div>
                <div className="text-center flex-1">
                  <p className="font-bold">156</p>
                  <p className="text-sm text-muted-foreground">팔로워</p>
                </div>
                <div className="text-center flex-1">
                  <p className="font-bold">98</p>
                  <p className="text-sm text-muted-foreground">팔로잉</p>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">소개</h3>
              <p className="text-sm">{user.bio}</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1 h-10"
                onClick={handleFollowToggle}
                variant={following ? "outline" : "default"}
              >
                {following ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    팔로잉
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    팔로우
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-10"
                onClick={onChatOpen}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                1:1 대화하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ProfileInfo userData={user} />
    </>
  );
};
