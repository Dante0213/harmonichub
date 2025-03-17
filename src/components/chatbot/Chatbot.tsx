
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dog, X, SendHorizontal, PlusCircle } from "lucide-react";

type Message = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

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
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="chat">채팅</TabsTrigger>
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
            className="h-12 w-12 rounded-full shadow-lg" 
            onClick={() => setIsOpen(true)}
          >
            <Dog className="h-6 w-6" />
          </Button>
        )}
      </div>
    </>
  );
}
