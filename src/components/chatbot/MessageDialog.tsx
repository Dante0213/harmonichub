
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal } from "lucide-react";
import { DirectMessage } from "@/hooks/use-chatbot";

interface ChatMessage {
  id: number;
  sender: 'user' | 'teacher';
  content: string;
  timestamp: Date;
}

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: DirectMessage;
}

export function MessageDialog({ isOpen, onClose, message }: MessageDialogProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // 초기 메시지 설정
  useEffect(() => {
    if (isOpen) {
      setChatMessages([
        {
          id: Date.now(),
          sender: 'teacher',
          content: message.text,
          timestamp: message.timestamp
        }
      ]);
    }
  }, [isOpen, message]);
  
  // 스크롤 영역을 최신 메시지로 이동
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // 사용자 메시지 추가
    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setInputValue("");
    
    // 선생님 응답 시뮬레이션
    setTimeout(() => {
      const teacherResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: 'teacher',
        content: `'${inputValue}'에 대한 답변입니다. 감사합니다!`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, teacherResponse]);
    }, 1000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {message.senderAvatar}
              </div>
              <DialogTitle>{message.sender}님과의 대화</DialogTitle>
            </div>
            {/* Removed the X button here since DialogContent already has a close button */}
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 h-[320px]" ref={scrollAreaRef}>
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'teacher' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-1">
                    {message.senderAvatar}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
