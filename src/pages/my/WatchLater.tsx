
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const WatchLater = () => {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)]">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64 overflow-y-auto">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Clock className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">나중에 볼 영상</h1>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>아직 나중에 볼 영상이 없습니다</CardTitle>
                <CardDescription>
                  영상을 나중에 보기로 설정하면 여기에 표시됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-10">
                <Clock className="w-16 h-16 text-muted-foreground" />
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 여기에 나중에 볼 영상 목록이 표시됩니다 */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WatchLater;
