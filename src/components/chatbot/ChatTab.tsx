
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal } from "lucide-react";
import { CardFooter } from "@/components/ui/card";

type Message = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

interface ChatTabProps {
  messages: Message[];
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export function ChatTab({ messages, message, setMessage, handleSendMessage }: ChatTabProps) {
  return (
    <>
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
    </>
  );
}
