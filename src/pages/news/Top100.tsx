
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Top100 = () => {
  return (
    <Layout>
      <div className="flex">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <List className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">TOP 100</h1>
            </div>
            
            <Tabs defaultValue="week" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="today">오늘</TabsTrigger>
                <TabsTrigger value="week">이번 주</TabsTrigger>
                <TabsTrigger value="month">이번 달</TabsTrigger>
                <TabsTrigger value="year">올해</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-primary font-bold">{i + 1}</span>
                          인기 영상 제목 {i + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md mb-3"></div>
                        <p className="text-sm text-muted-foreground">
                          조회수: {Math.floor(Math.random() * 10000)}회
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="week" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-primary font-bold">{i + 1}</span>
                          주간 인기 영상 {i + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md mb-3"></div>
                        <p className="text-sm text-muted-foreground">
                          조회수: {Math.floor(Math.random() * 50000)}회
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="month" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* 월간 인기 영상 */}
                </div>
              </TabsContent>
              
              <TabsContent value="year" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* A년간 인기 영상 */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Top100;
