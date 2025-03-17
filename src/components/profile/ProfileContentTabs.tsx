
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Users, Heart, Bookmark, FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProfileContentTabs = () => {
  // 사용자가 전공자인지 여부를 확인 (실제 데이터에서는 사용자 정보를 가져와야 함)
  const [isProfessional, setIsProfessional] = useState(false); // 예시 상태

  const assignmentTabLabel = isProfessional ? "과제함" : "보낸 과제함";

  return (
    <Tabs defaultValue="reels">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="reels" className="flex-1">
          <Music className="h-4 w-4 mr-2" />
          릴스
        </TabsTrigger>
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
          {assignmentTabLabel}
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
      
      <TabsContent value="followers" className="mt-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-muted rounded-md">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">팔로워 {i + 1}</p>
                  <p className="text-xs text-muted-foreground">@follower{i + 1}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">팔로우 중</Button>
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
      
      <TabsContent value="assignments" className="mt-6">
        <div className="space-y-4">
          {isProfessional ? (
            // 전공자인 경우 받은 과제 목록 표시
            [...Array(2)].map((_, i) => (
              <div key={i} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
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
                <p className="text-sm mb-3">피아노 연습곡 #{i + 1} 연주 영상입니다. 피드백 부탁드립니다.</p>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">보기</Button>
                  <Button size="sm">피드백 작성</Button>
                </div>
              </div>
            ))
          ) : (
            // 비전공자인 경우 보낸 과제 목록 표시
            <div className="rounded-md border">
              <div className="p-3 bg-muted font-medium">
                보낸 과제 목록
              </div>
              <div className="divide-y">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">피아노_연습곡_{i + 1}.mp3</p>
                        <p className="text-xs text-muted-foreground">
                          2023.07.{10 + i} | 김선생님에게 제출
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">보기</Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
