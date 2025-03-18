
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Heart, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSocial } from "@/pages/Social";

export const ProfileContentTabs = () => {
  // 사용자가 전공자인지 여부를 확인 (실제 데이터에서는 사용자 정보를 가져와야 함)
  const [isProfessional, setIsProfessional] = useState(false); // 예시 상태
  const { favoriteTeachers } = useSocial();

  return (
    <Tabs defaultValue="reels">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="reels" className="flex-1">
          <Music className="h-4 w-4 mr-2" />
          릴스
        </TabsTrigger>
        <TabsTrigger value="likes" className="flex-1">
          <Heart className="h-4 w-4 mr-2" />
          좋아요
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex-1">
          <Bookmark className="h-4 w-4 mr-2" />
          저장소
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="reels" className="mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Music className="h-10 w-10 text-muted-foreground" />
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="likes" className="mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Heart className="h-10 w-10 text-red-500" />
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="saved" className="mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Bookmark className="h-10 w-10 text-muted-foreground" fill="currentColor" />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
