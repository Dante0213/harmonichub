
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";
import { Reel } from "@/components/social/reels/ReelsData";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { ProfileContentTabs } from "@/components/profile/ProfileContentTabs";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState<Reel>({
    id: "current-user",
    user: "김음악",
    userHandle: "music_kim",
    avatar: "김",
    bio: "음악을 사랑하는 기타리스트입니다. 취미로 작곡도 하고 있어요.",
    time: "",
    content: "",
    likes: 0,
    comments: 0,
    instruments: ["기타", "피아노", "우쿨렐레"],
    genres: ["어쿠스틱", "재즈", "팝"],
    education: [
      {id: "ed1", institution: "서울음악대학", degree: "음악학과", year: "2018-2022"}
    ],
    experience: [
      {id: "ex1", company: "음악 스튜디오", position: "기타리스트", period: "2022-현재"}
    ],
    certificates: [
      {id: "cert1", name: "음악 지도사 자격증", issuer: "한국음악협회", year: "2021"}
    ]
  });

  const handleProfileUpdate = (updatedData: Reel) => {
    setUserData(updatedData);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 정보 섹션 */}
          <div className="md:w-1/3">
            <ProfileHeader 
              userData={userData} 
              onEditClick={() => setIsEditModalOpen(true)} 
            />
            
            <ProfileInfo userData={userData} />
          </div>
          
          {/* 탭 콘텐츠 섹션 */}
          <div className="md:w-2/3">
            <ProfileContentTabs />
          </div>
        </div>
      </div>
      
      {/* 프로필 수정 모달 */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onUpdate={handleProfileUpdate}
      />
    </Layout>
  );
};

export default Profile;
