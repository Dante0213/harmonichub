
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useChatbot, DirectMessage } from "@/hooks/use-chatbot";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MessagesTab() {
  const { directMessages, setActiveUser, activeUserId } = useChatbot();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMessages = directMessages.filter(dm => 
    dm.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // 1일 이내
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // 7일 이내
    else if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      return days[date.getDay()] + '요일';
    }
    // 그 이상
    else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="메시지 검색"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>메시지가 없습니다</p>
          </div>
        ) : (
          <ul className="divide-y">
            {filteredMessages.map((dm) => (
              <MessageItem 
                key={dm.id} 
                message={dm} 
                isActive={activeUserId === dm.userId}
                onClick={() => setActiveUser(dm.userId)} 
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

interface MessageItemProps {
  message: DirectMessage;
  isActive: boolean;
  onClick: () => void;
}

function MessageItem({ message, isActive, onClick }: MessageItemProps) {
  return (
    <li>
      <Button
        variant="ghost"
        className={`w-full justify-start p-3 ${
          isActive ? "bg-accent" : ""
        } hover:bg-accent`}
        onClick={onClick}
      >
        <div className="flex items-center w-full">
          <div className="relative">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{message.avatar}</AvatarFallback>
            </Avatar>
            {message.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {message.unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0 text-left">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium truncate">{message.userName}</span>
                
                {message.isOnePointRequest && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          variant="secondary" 
                          className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                        >
                          원포인트
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>원포인트 레슨 요청</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
          </div>
        </div>
      </Button>
    </li>
  );
}
