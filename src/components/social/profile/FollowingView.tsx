
import { Button } from "@/components/ui/button";
import { ChevronLeft, UserCheck } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocial } from "@/pages/Social";

interface FollowingViewProps {
  onBack: () => void;
}

export const FollowingView = ({ onBack }: FollowingViewProps) => {
  const { followedUsers, unfollowUser } = useSocial();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <CardTitle>팔로잉</CardTitle>
      </CardHeader>
      <CardContent>
        {followedUsers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">팔로우한 사용자가 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {followedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-md">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {user.imageUrl ? (
                      <AvatarImage src={user.imageUrl} alt={user.user} />
                    ) : (
                      <AvatarFallback>{user.user[0]}</AvatarFallback>
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
                  onClick={() => unfollowUser(user.id)}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  팔로잉
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
