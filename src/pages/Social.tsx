
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { SocialReelsFeed } from "@/components/social/SocialReelsFeed";
import { SocialPostFeed } from "@/components/social/SocialPostFeed";
import { SocialTrendingFeed } from "@/components/social/SocialTrendingFeed";
import { SocialFollowingView } from "@/components/social/SocialFollowingView";
import { 
  AdBanner, 
  RecommendedUsersPanel, 
  CreatePostPanel 
} from "@/components/social/SocialSidePanels";

const Social = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Layout>
      <div className="flex">
        {/* 사이드바 */}
        <SocialSidebar />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="mb-6">
                  <CreatePostPanel />
                </div>

                <Tabs defaultValue="reels" className="w-full mb-6">
                  <TabsList>
                    <TabsTrigger value="reels">릴스</TabsTrigger>
                    <TabsTrigger value="feed">피드</TabsTrigger>
                    <TabsTrigger value="trending">인기 게시물</TabsTrigger>
                    <TabsTrigger value="following">팔로잉</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reels" className="mt-6">
                    <SocialReelsFeed />
                  </TabsContent>
                  
                  <TabsContent value="feed" className="mt-6">
                    <SocialPostFeed />
                  </TabsContent>
                  
                  <TabsContent value="trending" className="mt-6">
                    <SocialTrendingFeed />
                  </TabsContent>
                  
                  <TabsContent value="following" className="mt-6">
                    <SocialFollowingView />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="md:w-1/3">
                <AdBanner />
                <RecommendedUsersPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Social;
