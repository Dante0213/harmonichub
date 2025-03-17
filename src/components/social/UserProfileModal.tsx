
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Users, Video, Heart, Bookmark } from "lucide-react";
import { Reel } from "./reels/ReelsData";

interface UserProfileModalProps {
  user: Reel;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1000px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>사용자 프로필</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="text-4xl">{user.avatar}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.user}</h2>
              <p className="text-muted-foreground mb-2">@{user.userHandle}</p>
              
              {user.isTeacher && (
                <div className="flex items-center text-purple-500 mb-4">
                  <Music className="mr-1 h-5 w-5" />
                  <span>음악 선생님</span>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 w-full mb-4">
                <div className="text-center">
                  <p className="font-bold">254</p>
                  <p className="text-sm text-muted-foreground">게시물</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">1.2K</p>
                  <p className="text-sm text-muted-foreground">팔로워</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">348</p>
                  <p className="text-sm text-muted-foreground">팔로잉</p>
                </div>
              </div>
              
              <Button className="w-full">팔로우</Button>
              <Button variant="outline" className="w-full mt-2">메시지 보내기</Button>
            </div>
            
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">소개</h3>
              <p className="text-sm">
                음악을 사랑하는 {user.user}입니다. 매일 새로운 음악을 만들고 공유합니다.
                {user.isTeacher ? ' 음악 레슨도 진행하고 있으니 관심 있으시면 연락주세요!' : ''}
              </p>
              
              <div className="mt-4">
                <h3 className="font-semibold mb-2">악기</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">피아노</div>
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">기타</div>
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">드럼</div>
                </div>
              </div>
            </div>
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
                      <Button variant="outline" size="sm">팔로우</Button>
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
    </Dialog>
  );
};
