
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocial } from "@/pages/Social";

interface FollowersViewProps {
  onBack: () => void;
}

export const FollowersView = ({ onBack }: FollowersViewProps) => {
  // 실제 구현에서는 API를 통해 팔로워 목록을 가져와야 함
  const mockFollowers = Array.from({ length: 5 }, (_, i) => ({
    id: `follower-${i}`,
    name: `팔로워 ${i + 1}`,
    handle: `follower${i + 1}`,
    avatar: String.fromCharCode(65 + i)
  }));
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <CardTitle>팔로워</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockFollowers.map((follower) => (
            <div key={follower.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{follower.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{follower.name}</p>
                  <p className="text-xs text-muted-foreground">@{follower.handle}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">팔로우</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
