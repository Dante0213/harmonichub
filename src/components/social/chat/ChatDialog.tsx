
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Reel } from "../reels/ReelsData";
import { useToast } from "@/hooks/use-toast";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: Reel;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

export const ChatDialog = ({ isOpen, onClose, user }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 초기 메시지 설정 (환영 메시지)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: `안녕하세요! ${user.user}님과의 대화를 시작합니다.`,
          sender: "other",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, user, messages.length]);

  // 메시지 목록이 업데이트될 때마다 스크롤 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 내가 보낸 메시지 추가
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // 상대방의 자동 응답 (실제로는 서버에서 처리할 부분)
    setTimeout(() => {
      const responseMessage: Message = {
        id: `other-${Date.now()}`,
        content: `'${inputValue}'에 대한 답변입니다. 감사합니다!`,
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[450px] max-w-[90vw] h-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {user.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt={user.user} />
              ) : (
                <AvatarFallback>{user.avatar}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <DialogTitle className="text-lg">{user.user}</DialogTitle>
              <p className="text-xs text-muted-foreground">@{user.userHandle}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "other" && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  {user.imageUrl ? (
                    <AvatarImage src={user.imageUrl} alt={user.user} />
                  ) : (
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  )}
                </Avatar>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t pt-4 mt-auto">
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
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
