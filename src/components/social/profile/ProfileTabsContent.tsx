
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Users, Heart, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reel } from "../reels/ReelsData";
import { UserPlus } from "lucide-react";

interface ProfileTabsContentProps {
  user: Reel;
}

export const ProfileTabsContent = ({ user }: ProfileTabsContentProps) => {
  return (
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
  );
};
