
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Users, Heart, Bookmark, UserPlus, UserCheck, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Reel } from "./reels/ReelsData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { useState } from "react";
import { useSocial } from "@/pages/Social";
import { useToast } from "@/hooks/use-toast";
import { ChatDialog } from "./chat/ChatDialog";

interface UserProfileModalProps {
  user: Reel;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => {
  const { isFollowing, followUser, unfollowUser } = useSocial();
  const following = isFollowing(user.id);
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
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

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1000px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>사용자 프로필</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="md:w-1/3">
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
                  
                  <div className="flex gap-2 h-10">
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
                      onClick={handleChatOpen}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      1:1 대화하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <ProfileInfo userData={user} />
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="posts">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="posts" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  게시물
                </TabsTrigger>
                <TabsTrigger value="followers" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  팔로워
                </TabsTrigger>
                <TabsTrigger value="likes" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  좋아요
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  저장됨
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-6">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="followers" className="mt-6">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">사용자 {i + 1}</p>
                          <p className="text-xs text-muted-foreground">@user{i + 1}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        팔로우
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="likes" className="mt-6">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <Heart className="h-8 w-8 text-red-500" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <Bookmark className="h-8 w-8 text-muted-foreground" fill="currentColor" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
      
      {isChatOpen && (
        <ChatDialog 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          user={user} 
        />
      )}
    </Dialog>
  );
};
