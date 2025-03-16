
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, UserCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Social = () => {
  const posts = [
    {
      id: 1,
      user: "김태현",
      time: "2시간 전",
      content: "오늘 첫 피아노 레슨을 받았습니다. 생각보다 어렵지만 재미있네요! 열심히 연습해서 한 달 안에 첫 곡을 완성해보려고 합니다.",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      user: "박지민",
      time: "어제",
      content: "드디어 3개월 동안 연습한 바흐의 미뉴에트를 완주했습니다! 영상을 첨부합니다. 피드백 부탁드려요~ #클래식 #피아노 #바흐",
      likes: 56,
      comments: 12
    },
    {
      id: 3,
      user: "이준호",
      time: "3일 전",
      content: "혹시 기타 초보자가 시작하기 좋은 곡 추천해주실 분 있나요? 코드가 복잡하지 않고 쉬운 곡으로 부탁드립니다.",
      likes: 15,
      comments: 23
    },
    {
      id: 4,
      user: "신민아",
      time: "1주일 전",
      content: "이번 주말에 열리는 아마추어 연주회에 참가하게 되었습니다. 너무 떨리네요. 응원해주세요! #첫공연 #떨림주의 #바이올린",
      likes: 87,
      comments: 31
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">SNS</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="mb-6">
              <Card>
                <CardContent className="pt-6">
                  <textarea 
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none" 
                    placeholder="무엇을 공유하고 싶으신가요?"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">사진/동영상</Button>
                  <Button>게시하기</Button>
                </CardFooter>
              </Card>
            </div>

            <Tabs defaultValue="feed" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="feed">피드</TabsTrigger>
                <TabsTrigger value="trending">인기 게시물</TabsTrigger>
                <TabsTrigger value="following">팔로잉</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <UserCircle className="w-10 h-10" />
                    <div>
                      <h3 className="font-semibold">{post.user}</h3>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.content}</p>
                    {post.id === 2 && (
                      <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">동영상</span>
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
          </div>
          
          <div className="md:w-1/3">
            <Card className="mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">인기 해시태그</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><a href="#" className="text-primary hover:underline">#피아노</a></li>
                  <li><a href="#" className="text-primary hover:underline">#기타</a></li>
                  <li><a href="#" className="text-primary hover:underline">#바이올린</a></li>
                  <li><a href="#" className="text-primary hover:underline">#첫레슨</a></li>
                  <li><a href="#" className="text-primary hover:underline">#클래식</a></li>
                  <li><a href="#" className="text-primary hover:underline">#연주영상</a></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">추천 사용자</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    {name: "김선생", instrument: "피아노 강사"},
                    {name: "박연주", instrument: "바이올리니스트"},
                    {name: "정멜로디", instrument: "성악가"},
                    {name: "이리듬", instrument: "드러머"}
                  ].map((user, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCircle className="w-8 h-8" />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.instrument}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">팔로우</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Social;
