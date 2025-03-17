import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Music } from "lucide-react";

export const AdBanner = () => {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader>
        <h3 className="text-lg font-semibold">광고</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[16/9] bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
          <p className="text-lg font-medium text-center p-6">
            여기에 광고 배너가 표시됩니다
          </p>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-2">
            음악 레슨과 악기를 찾고 계신가요?
          </p>
          <Button size="sm" className="w-full">자세히 보기</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProfilePanel = () => {
  const currentUser = {
    name: "김음악",
    handle: "music_kim",
    instrument: "기타리스트"
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-semibold">내 프로필</h3>
      </CardHeader>
      <CardContent>
        <Link to="/profile" className="flex items-center gap-3 hover:bg-muted p-2 rounded-md transition-colors">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg">{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-base">{currentUser.name}</p>
            <p className="text-sm text-muted-foreground">@{currentUser.handle}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export const RecommendedUsersPanel = () => {
  const recommendedUsers = [
    {name: "김선생", handle: "pianoteacher", instrument: "피아노 강사"},
    {name: "박연주", handle: "violinist_park", instrument: "바이올리니스트"},
    {name: "정멜로디", handle: "melody_j", instrument: "성악가"},
    {name: "이리듬", handle: "rhythm_lee", instrument: "드러머"}
  ];
  
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">추천 사용자</h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recommendedUsers.map((user, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">@{user.handle}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">팔로우</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
