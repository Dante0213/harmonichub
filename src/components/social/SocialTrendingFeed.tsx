
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, Play } from "lucide-react";

interface Post {
  id: number;
  user: string;
  userHandle?: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  isReel?: boolean;
  reelDuration?: string;
  views?: string;
  duration?: string;
}

export const SocialTrendingFeed = () => {
  const posts = [
    {
      id: 1,
      user: "김태현",
      userHandle: "taehyun_k",
      avatar: "T",
      time: "2시간 전",
      content: "오늘 첫 피아노 레슨을 받았습니다. 생각보다 어렵지만 재미있네요! 열심히 연습해서 한 달 안에 첫 곡을 완성해보려고 합니다.",
      likes: 24,
      comments: 5,
      isReel: false
    },
    {
      id: 2,
      user: "박지민",
      userHandle: "jimin_park",
      avatar: "J",
      time: "어제",
      content: "드디어 3개월 동안 연습한 바흐의 미뉴에트를 완주했습니다! 영상을 첨부합니다. 피드백 부탁드려요~ #클래식 #피아노 #바흐",
      likes: 56,
      comments: 12,
      isReel: true,
      reelDuration: "01:27"
    }
  ];

  const reels = [
    {
      id: 101,
      user: "최유진",
      userHandle: "yujin_choi",
      avatar: "Y",
      time: "3시간 전",
      content: "새로 배운 재즈 피아노 연주입니다. 즉흥 연주라 부족한 점이 많지만 봐주세요~ #재즈피아노 #즉흥연주 #음악",
      likes: 123,
      comments: 18,
      views: "1.2K",
      duration: "00:45"
    },
    {
      id: 102,
      user: "정승호",
      userHandle: "seungho_j",
      avatar: "S",
      time: "5시간 전",
      content: "기타 핑거스타일 연습 중입니다. 이 곡 완성하면 또 올릴게요! #기타 #핑거스타일 #어쿠스틱기타",
      likes: 89,
      comments: 7,
      views: "876",
      duration: "00:38"
    }
  ];

  const combinedPosts = [
    ...posts,
    ...reels.map(r => ({ 
      ...r, 
      isReel: true, 
      reelDuration: r.duration 
    }))
  ].sort((a, b) => b.likes - a.likes).slice(0, 4);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {combinedPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Avatar>
              <AvatarFallback>{post.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.user}</h3>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.content}</p>
            {post.isReel && (
              <div className="relative h-60 mb-4 bg-muted rounded-md flex items-center justify-center">
                <Button variant="outline" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50">
                  <Play className="h-6 w-6" />
                </Button>
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                  {post.reelDuration}
                </span>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full justify-between">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                <span>공유</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
