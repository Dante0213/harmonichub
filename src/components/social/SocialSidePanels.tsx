
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Music, User } from "lucide-react";
import { useState } from "react";
import { UserProfileModal } from "./UserProfileModal";
import { Reel } from "./reels/ReelsData";

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
      <CardContent className="pt-6">
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
  const [selectedUser, setSelectedUser] = useState<Reel | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const recommendedUsers = [
    {
      id: "1",
      avatar: "김",
      user: "김선생",
      userHandle: "pianoteacher",
      isTeacher: true,
      description: "피아노 강사",
      videoUrl: "https://example.com/video1.mp4",
      hashtags: ["#피아노", "#음악교육"],
      likeCount: 1200,
      commentCount: 45,
      isLiked: false
    },
    {
      id: "2", 
      avatar: "박",
      user: "박연주",
      userHandle: "violinist_park",
      isTeacher: true,
      description: "바이올리니스트",
      videoUrl: "https://example.com/video2.mp4",
      hashtags: ["#바이올린", "#클래식"],
      likeCount: 890,
      commentCount: 32,
      isLiked: false
    },
    {
      id: "3",
      avatar: "정",
      user: "정멜로디",
      userHandle: "melody_j",
      isTeacher: false,
      description: "성악가",
      videoUrl: "https://example.com/video3.mp4",
      hashtags: ["#성악", "#오페라"],
      likeCount: 750,
      commentCount: 28,
      isLiked: false
    },
    {
      id: "4",
      avatar: "이",
      user: "이리듬",
      userHandle: "rhythm_lee",
      isTeacher: false,
      description: "드러머",
      videoUrl: "https://example.com/video4.mp4",
      hashtags: ["#드럼", "#밴드"],
      likeCount: 920,
      commentCount: 36,
      isLiked: false
    }
  ];
  
  const handleUserClick = (user: Reel) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">추천 사용자</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recommendedUsers.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <Avatar>
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.user}</p>
                    <p className="text-xs text-muted-foreground">@{user.userHandle}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleUserClick(user)}
                >
                  프로필
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {selectedUser && (
        <UserProfileModal 
          user={selectedUser} 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}
    </>
  );
};
