
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dog, X, SendHorizontal, PlusCircle, Bell, BellOff, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

type DirectMessage = {
  id: number;
  sender: string;
  senderAvatar: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: '안녕하세요! 하모닉 허브 챗봇입니다. 무엇을 도와드릴까요?',
      timestamp: new Date()
    }
  ]);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([
    {
      id: 1, 
      sender: '김태희 선생님', 
      senderAvatar: 'KT',
      text: '안녕하세요, 레슨 예약 확인해 주세요!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
      read: false
    },
    {
      id: 2, 
      sender: '이민호 선생님', 
      senderAvatar: 'LM',
      text: '다음 레슨 준비는 잘 되고 있나요?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전
      read: true
    },
    {
      id: 3, 
      sender: '박신혜 선생님', 
      senderAvatar: 'PS',
      text: '새로운 VOD 업로드했어요. 확인해보세요!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5일 전
      read: true
    }
  ]);
  const [notificationSetting, setNotificationSetting] = useState({
    toastEnabled: true,
    badgeEnabled: true
  });
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `${message}에 대한 답변입니다. 더 궁금한 점이 있으신가요?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // 메시지 읽음 처리
  const markAsRead = (id: number) => {
    setDirectMessages(prev => 
      prev.map(dm => dm.id === id ? { ...dm, read: true } : dm)
    );
  };

  // 새 메시지가 올 때 데모를 위한 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      const newMessage: DirectMessage = {
        id: Date.now(),
        sender: '정우성 선생님',
        senderAvatar: 'JW',
        text: '안녕하세요, 다음 드럼 레슨 일정 확인해 주세요!',
        timestamp: new Date(),
        read: false
      };
      
      setDirectMessages(prev => [newMessage, ...prev]);
      
      // 토스트 알림 활성화된 경우
      if (notificationSetting.toastEnabled && !isOpen) {
        toast({
          title: "새 메시지",
          description: `${newMessage.sender}님으로부터 메시지가 도착했습니다.`,
          variant: "default",
        });
      }
    }, 30000); // 30초 후 새 메시지 도착 (데모 용도)
    
    return () => clearTimeout(timer);
  }, [directMessages, notificationSetting.toastEnabled, isOpen, toast]);

  // 안읽은 메시지 개수
  const unreadCount = directMessages.filter(dm => !dm.read).length;

  const recommendationItems = [
    { title: "광고", items: ["신규 강사 프로모션", "스토어 할인 이벤트", "추천 콘텐츠"] },
    { title: "뉴스", items: ["음악계 소식", "플랫폼 업데이트", "커뮤니티 소식"] },
    { title: "레슨 일정", items: ["예약된 레슨", "지난 레슨", "레슨 예약하기"] },
    { title: "학습 일정", items: ["오늘의 추천 강의", "진행 중인 과정", "새로운 코스"] },
    { title: "선생님 추천", items: ["인기 강사", "신규 강사", "내 관심 분야 강사"] },
    { title: "악기 추천", items: ["초보자용 악기", "중급자용 악기", "프로용 악기"] },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen ? (
          <Card className="w-[320px] shadow-lg">
            <CardHeader className="p-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center">
                <Dog className="w-4 h-4 mr-2" />
                하모닉 허브 어시스턴트
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
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
                <ScrollArea className="h-[320px] p-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                
                <CardFooter className="p-3 pt-0">
                  <div className="flex w-full gap-2">
                    <Input
                      placeholder="메시지를 입력하세요..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="messages" className="m-0">
                <div className="px-3 py-2 border-b flex items-center justify-between">
                  <h3 className="text-sm font-medium">알림 설정</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                      <Switch 
                        checked={notificationSetting.toastEnabled}
                        onCheckedChange={(checked) => setNotificationSetting(prev => ({...prev, toastEnabled: checked}))}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="h-3.5 w-3.5 p-0 flex items-center justify-center">
                        <span className="text-[10px]">1</span>
                      </Badge>
                      <Switch 
                        checked={notificationSetting.badgeEnabled}
                        onCheckedChange={(checked) => setNotificationSetting(prev => ({...prev, badgeEnabled: checked}))}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
                
                <ScrollArea className="h-[280px]">
                  {directMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p className="text-sm">메시지가 없습니다</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {directMessages.map((dm) => (
                        <button
                          key={dm.id}
                          className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors ${!dm.read ? 'bg-muted/20' : ''}`}
                          onClick={() => markAsRead(dm.id)}
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            {dm.senderAvatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">{dm.sender}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatMessageTime(dm.timestamp)}
                              </p>
                            </div>
                            <p className="text-sm truncate text-muted-foreground">{dm.text}</p>
                          </div>
                          {!dm.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="recommend" className="m-0">
                <ScrollArea className="h-[320px]">
                  <div className="p-4 space-y-4">
                    {recommendationItems.map((category, idx) => (
                      <div key={idx}>
                        <h3 className="text-sm font-medium mb-2">{category.title}</h3>
                        <div className="space-y-1">
                          {category.items.map((item, itemIdx) => (
                            <Button 
                              key={itemIdx} 
                              variant="ghost" 
                              className="w-full justify-start text-left h-auto py-1.5 px-2 text-sm"
                              onClick={() => {
                                setActiveTab("chat");
                                setMessage(`${category.title}: ${item}`);
                              }}
                            >
                              <PlusCircle className="h-3.5 w-3.5 mr-2 opacity-70" />
                              {item}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </Card>
        ) : (
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-lg relative" 
            onClick={() => setIsOpen(true)}
          >
            <Dog className="h-6 w-6" />
            {unreadCount > 0 && notificationSetting.badgeEnabled && (
              <Badge 
                variant="success" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        )}
      </div>
    </>
  );
}

// 메시지 시간 포맷팅 함수
function formatMessageTime(timestamp: Date): string {
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}일 전`;
  
  return timestamp.toLocaleDateString();
}

