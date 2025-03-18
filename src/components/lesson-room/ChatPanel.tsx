
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./types";

interface ChatPanelProps {
  initialMessages: ChatMessage[];
  teacherName: string;
}

export function ChatPanel({ initialMessages, teacherName }: ChatPanelProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 메시지가 추가될 때 채팅창 스크롤 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      sender: "나",
      text: newMessage
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <>
      {/* 채팅 메시지 */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {chatMessages.map((msg, i) => (
          <div 
            key={i} 
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === "나" 
                ? "bg-primary text-primary-foreground ml-auto" 
                : "bg-muted"
            }`}
          >
            <p className="text-xs font-medium">{msg.sender}</p>
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>
      
      {/* 메시지 입력 */}
      <form 
        onSubmit={handleSendMessage}
        className="p-2 border-t flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 p-2 text-sm border rounded-md mr-2"
        />
        <Button type="submit" size="sm">전송</Button>
      </form>
    </>
  );
}
