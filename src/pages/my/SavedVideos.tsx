
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

const SavedVideos = () => {
  return (
    <Layout>
      <div className="flex">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Save className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">저장 한 영상</h1>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>아직 저장 한 영상이 없습니다</CardTitle>
                <CardDescription>
                  영상을 저장하면 여기에 표시됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-10">
                <Save className="w-16 h-16 text-muted-foreground" />
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 여기에 저장한 영상 목록이 표시됩니다 */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedVideos;
