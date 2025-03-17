
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Music } from "lucide-react";
import { Reel } from "../reels/ReelsData";

interface ProfileTabsContentProps {
  user: Reel;
}

export const ProfileTabsContent = ({ user }: ProfileTabsContentProps) => {
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
      </TabsList>
      
      <TabsContent value="reels" className="mt-6">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-muted rounded-md flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Music className="h-8 w-8 text-muted-foreground" />
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
    </Tabs>
  );
};
