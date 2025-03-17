
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Heart, Bookmark, FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reel } from "../reels/ReelsData";
import { UserPlus } from "lucide-react";

interface ProfileTabsContentProps {
  user: Reel;
}

export const ProfileTabsContent = ({ user }: ProfileTabsContentProps) => {
  return (
    <Tabs defaultValue="followers">
      <TabsList className="w-full mb-6">
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
          저장소
        </TabsTrigger>
        <TabsTrigger value="assignments" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          과제함
        </TabsTrigger>
      </TabsList>
      
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
      
      <TabsContent value="assignments" className="mt-6">
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">학생 {i + 1}의 과제</h3>
                    <p className="text-xs text-muted-foreground">2023.07.{10 + i}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  검토 중
                </span>
              </div>
              <p className="text-sm mb-2">기타 연습곡 #{i + 1} 연주 영상입니다.</p>
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">보기</Button>
                <Button size="sm">피드백 작성</Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
