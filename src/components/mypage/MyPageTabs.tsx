
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonsTabContent } from "./tabs/LessonsTabContent";
import { VideosTabContent } from "./tabs/VideosTabContent";
import { PurchasesTabContent } from "./tabs/PurchasesTabContent";
import { SettingsTabContent } from "./tabs/SettingsTabContent";

interface MyPageTabsProps {
  userData: any;
  onPasswordChange: () => void;
  onBasicInfoChange: () => void;
}

export function MyPageTabs({ userData, onPasswordChange, onBasicInfoChange }: MyPageTabsProps) {
  return (
    <Tabs defaultValue="lessons">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="lessons">레슨</TabsTrigger>
        <TabsTrigger value="videos">영상</TabsTrigger>
        <TabsTrigger value="purchases">구매내역</TabsTrigger>
        <TabsTrigger value="settings">계정설정</TabsTrigger>
      </TabsList>
      <TabsContent value="lessons" className="mt-4">
        <LessonsTabContent />
      </TabsContent>
      <TabsContent value="videos" className="mt-4">
        <VideosTabContent />
      </TabsContent>
      <TabsContent value="purchases" className="mt-4">
        <PurchasesTabContent />
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <SettingsTabContent 
          userData={userData}
          onPasswordChange={onPasswordChange}
          onBasicInfoChange={onBasicInfoChange}
        />
      </TabsContent>
    </Tabs>
  );
}
