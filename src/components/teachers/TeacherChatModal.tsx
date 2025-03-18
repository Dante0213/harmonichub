
import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "teacher";
  content: string;
  timestamp: Date;
}

interface TeacherChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: number;
  teacherImage?: string;
}

export function TeacherChatModal({ isOpen, onClose, teacherName, teacherId, teacherImage = "/placeholder.svg" }: TeacherChatModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 대화 내역 로드 (실제로는 API 호출)
  useEffect(() => {
    // 여기서는 샘플 데이터 사용
    const initialMessages: Message[] = [
      {
        id: "1",
        sender: "teacher",
        content: `안녕하세요! ${teacherName}입니다. 어떤 도움이 필요하신가요?`,
        timestamp: new Date(Date.now() - 86400000) // 어제
      }
    ];
    
    setMessages(initialMessages);
  }, [teacherId, teacherName]);

  // 스크롤 영역을 항상 최신 메시지로 이동
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송
  const sendMessage = () => {
    if (!inputValue.trim()) return;

    // 새 메시지 추가
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // 선생님 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const teacherResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "teacher",
        content: getRandomResponse(),
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, teacherResponse]);
    }, 1000);
  };

  // 랜덤 응답 생성 (데모용)
  const getRandomResponse = () => {
    const responses = [
      "네, 말씀하세요. 어떤 질문이 있으신가요?",
      "언제 레슨을 시작하고 싶으신가요?",
      "초보자도 괜찮습니다. 천천히 배우면 됩니다.",
      "그 부분은 레슨에서 자세히 알려드릴게요.",
      "네, 그 곡은 배우기 좋은 곡입니다.",
      "질문 주셔서 감사합니다. 더 궁금한 점이 있으신가요?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // 엔터키로 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 메시지 시간 형식화
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={teacherImage} alt={teacherName} />
                <AvatarFallback>{teacherName.charAt(0)}</AvatarFallback>
              </Avatar>
              <SheetTitle>{teacherName} 선생님과 1:1 대화</SheetTitle>
            </div>
            {/* Removed the X button here since SheetContent already has a close button */}
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-muted flex items-start gap-2'
                  }`}
                >
                  {message.sender === 'teacher' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={teacherImage} alt={teacherName} />
                      <AvatarFallback>{teacherName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className="break-words">{message.content}</div>
                    <div 
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
