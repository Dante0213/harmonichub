
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const MoreVideos = () => {
  return (
    <Layout>
      <div className="flex">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Search className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">더 많은 영상 찾아보기</h1>
            </div>
            
            <div className="flex gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="영상 검색..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-muted"></div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="text-lg">추천 영상 제목 {i + 1}</CardTitle>
                    <CardDescription className="mt-1">
                      조회수: {Math.floor(Math.random() * 10000)}회 • 
                      {Math.floor(Math.random() * 30) + 1}일 전
                    </CardDescription>
                    <p className="text-sm mt-2 line-clamp-2">
                      이 영상은 음악을 배우는 데 도움이 되는 내용을 담고 있습니다. 
                      연주 기법부터 음악 이론까지 다양한 주제를 다룹니다.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">시청하기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button>더 불러오기</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoreVideos;
