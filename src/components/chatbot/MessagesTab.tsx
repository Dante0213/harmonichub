
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { MessageDialog } from "./MessageDialog";
import { DirectMessage, NotificationSetting } from "@/hooks/use-chatbot";

interface MessagesTabProps {
  directMessages: DirectMessage[];
  notificationSetting: NotificationSetting;
  setNotificationSetting: (setting: NotificationSetting) => void;
  markAsRead: (id: string) => void;
}

export function MessagesTab({ 
  directMessages, 
  notificationSetting, 
  setNotificationSetting, 
  markAsRead 
}: MessagesTabProps) {
  const [selectedMessage, setSelectedMessage] = useState<DirectMessage | null>(null);
  
  const handleMessageClick = (message: DirectMessage) => {
    markAsRead(message.id);
    setSelectedMessage(message);
  };
  
  const handleCloseDialog = () => {
    setSelectedMessage(null);
  };

  return (
    <>
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium">알림 설정</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            <Switch 
              checked={notificationSetting.toastEnabled}
              onCheckedChange={(checked) => setNotificationSetting({...notificationSetting, toastEnabled: checked})}
              className="scale-75"
            />
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="h-3.5 w-3.5 p-0 flex items-center justify-center">
              <span className="text-[10px]">1</span>
            </Badge>
            <Switch 
              checked={notificationSetting.badgeEnabled}
              onCheckedChange={(checked) => setNotificationSetting({...notificationSetting, badgeEnabled: checked})}
              className="scale-75"
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
                onClick={() => handleMessageClick(dm)}
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {dm.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{dm.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatMessageTime(dm.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm truncate text-muted-foreground">{dm.lastMessage}</p>
                </div>
                {!dm.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
      
      {selectedMessage && (
        <MessageDialog 
          isOpen={!!selectedMessage}
          onClose={handleCloseDialog}
          message={selectedMessage}
        />
      )}
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
