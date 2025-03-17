
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, Play } from "lucide-react";

interface Post {
  id: number;
  user: string;
  userHandle: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  isReel: boolean;
  reelDuration?: string;
}

export const SocialPostFeed = () => {
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
    },
    {
      id: 3,
      user: "이준호",
      userHandle: "junho_lee",
      avatar: "J",
      time: "3일 전",
      content: "혹시 기타 초보자가 시작하기 좋은 곡 추천해주실 분 있나요? 코드가 복잡하지 않고 쉬운 곡으로 부탁드립니다.",
      likes: 15,
      comments: 23,
      isReel: false
    },
    {
      id: 4,
      user: "신민아",
      userHandle: "mina_shin",
      avatar: "M",
      time: "1주일 전",
      content: "이번 주말에 열리는 아마추어 연주회에 참가하게 되었습니다. 너무 떨리네요. 응원해주세요! #첫공연 #떨림주의 #바이올린",
      likes: 87,
      comments: 31,
      isReel: true,
      reelDuration: "02:15"
    }
  ];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Avatar>
              <AvatarFallback>{post.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.user}</h3>
              <p className="text-xs text-muted-foreground">@{post.userHandle} · {post.time}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.content}</p>
            {post.isReel && (
              <div className="relative h-80 mb-4 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="outline" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
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
