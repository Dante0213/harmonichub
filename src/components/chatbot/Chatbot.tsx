
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useChatbot } from "@/hooks/use-chatbot";
import { ChatTab } from "./ChatTab";
import { MessagesTab } from "./MessagesTab";
import { RecommendTab } from "./RecommendTab";
import { ChatHeader } from "./ChatHeader";
import { ChatButton } from "./ChatButton";

type RecommendationItem = {
  title: string;
  items: string[];
};

export function Chatbot() {
  const {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    message,
    setMessage,
    messages,
    directMessages,
    notificationSetting,
    setNotificationSetting,
    unreadCount,
    handleSendMessage,
    markAsRead
  } = useChatbot();

  const recommendationItems: RecommendationItem[] = [
    { title: "광고", items: ["신규 강사 프로모션", "스토어 할인 이벤트", "추천 콘텐츠"] },
    { title: "뉴스", items: ["음악계 소식", "플랫폼 업데이트", "커뮤니티 소식"] },
    { title: "레슨 일정", items: ["예약된 레슨", "지난 레슨", "레슨 예약하기"] },
    { title: "학습 일정", items: ["오늘의 추천 강의", "진행 중인 과정", "새로운 코스"] },
    { title: "선생님 추천", items: ["인기 강사", "신규 강사", "내 관심 분야 강사"] },
    { title: "악기 추천", items: ["초보자용 악기", "중급자용 악기", "프로용 악기"] },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[320px] shadow-lg">
          <ChatHeader onClose={() => setIsOpen(false)} />
          
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="chat">채팅</TabsTrigger>
              <TabsTrigger value="messages" className="relative">
                메시지
                {unreadCount > 0 && notificationSetting.badgeEnabled && (
                  <Badge variant="success" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="recommend">추천</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="m-0">
              <ChatTab 
                messages={messages}
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
              />
            </TabsContent>
            
            <TabsContent value="messages" className="m-0">
              <MessagesTab 
                directMessages={directMessages}
                notificationSetting={notificationSetting}
                setNotificationSetting={setNotificationSetting}
                markAsRead={markAsRead}
              />
            </TabsContent>
            
            <TabsContent value="recommend" className="m-0">
              <RecommendTab 
                recommendationItems={recommendationItems}
                setActiveTab={setActiveTab}
                setMessage={setMessage}
              />
            </TabsContent>
          </Tabs>
        </Card>
      ) : (
        <ChatButton 
          unreadCount={unreadCount}
          badgeEnabled={notificationSetting.badgeEnabled}
          onClick={() => setIsOpen(true)}
        />
      )}
    </div>
  );
}
