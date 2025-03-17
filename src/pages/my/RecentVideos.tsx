
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";

const RecentVideos = () => {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)]">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64 overflow-y-auto">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Video className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">최근 본 영상</h1>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>아직 시청한 영상이 없습니다</CardTitle>
                <CardDescription>
                  영상을 시청하면 여기에 기록됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-10">
                <Video className="w-16 h-16 text-muted-foreground" />
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 여기에 최근 본 영상 목록이 표시됩니다 */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecentVideos;
