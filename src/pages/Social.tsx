
import { Layout } from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { SocialReelsFeed } from "@/components/social/SocialReelsFeed";
import { 
  AdBanner, 
  RecommendedUsersPanel,
  ProfilePanel
} from "@/components/social/SocialSidePanels";
import { useState } from "react";
import { UserProfileModal } from "@/components/social/UserProfileModal";
import { Reel } from "@/components/social/reels/ReelsData";

const Social = () => {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState<Reel | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const handleUserClick = (user: Reel) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };
  
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
                <SocialReelsFeed onUserClick={handleUserClick} />
              </div>
              
              <div className="md:w-1/3">
                <AdBanner />
                <ProfilePanel />
                <RecommendedUsersPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedUser && (
        <UserProfileModal 
          user={selectedUser} 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}
    </Layout>
  );
};

export default Social;
