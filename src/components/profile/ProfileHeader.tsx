
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, PenSquare, UserPlus, UserCheck, MessageSquare } from "lucide-react";
import { Reel } from "@/components/social/reels/ReelsData";
import { useState } from "react";
import { useSocial } from "@/pages/Social";
import { useToast } from "@/hooks/use-toast";
import { ChatDialog } from "@/components/social/chat/ChatDialog";

interface ProfileHeaderProps {
  userData: Reel;
  onEditClick?: () => void;
  isCurrentUser?: boolean;
}

export const ProfileHeader = ({ userData, onEditClick, isCurrentUser = true }: ProfileHeaderProps) => {
  const { isFollowing, followUser, unfollowUser } = useSocial();
  const following = isFollowing(userData.id);
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const handleFollowToggle = () => {
    if (following) {
      unfollowUser(userData.id);
      toast({
        title: "팔로우 취소됨",
        description: `${userData.userHandle}님을 더 이상 팔로우하지 않습니다.`,
        duration: 1000
      });
    } else {
      followUser(userData);
      toast({
        title: "팔로우 추가됨",
        description: `${userData.userHandle}님을 팔로우합니다.`,
        duration: 1000
      });
    }
  };

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="relative pb-0">
          {isCurrentUser && (
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          )}
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              {userData.imageUrl ? (
                <AvatarImage src={userData.imageUrl} alt={userData.user} />
              ) : (
                <AvatarFallback className="text-4xl">{userData.avatar}</AvatarFallback>
              )}
            </Avatar>
            <h1 className="text-2xl font-bold">{userData.user}</h1>
            <p className="text-muted-foreground">@{userData.userHandle}</p>
            
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
            <p className="text-sm">{userData.bio}</p>
          </div>
          
          {isCurrentUser ? (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={onEditClick}
            >
              <PenSquare className="h-4 w-4 mr-2" />
              프로필 수정
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                className="flex-1"
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
                variant={following ? "default" : "outline"} 
                className="flex-1"
                onClick={handleChatOpen}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                1:1 대화하기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!isCurrentUser && (
        <ChatDialog 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          user={userData} 
        />
      )}
    </>
  );
};

