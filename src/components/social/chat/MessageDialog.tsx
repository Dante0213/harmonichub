
import { useRef, useEffect } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SendHorizonal, X } from "lucide-react";
import { useChatbot, ChatMessage } from "@/hooks/use-chatbot";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessageDialog({ isOpen, onClose }: MessageDialogProps) {
  const { 
    activeUserId, 
    currentChat, 
    directMessages, 
    sendMessage, 
    setActiveUser 
  } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const form = useForm({
    defaultValues: {
      message: ""
    }
  });
  
  const activeUserDetails = directMessages.find(dm => dm.userId === activeUserId);
  const isOnePointRequest = activeUserDetails?.isOnePointRequest;
  
  // 메시지가 추가될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat, isOpen]);
  
  const onSubmit = (data: { message: string }) => {
    if (data.message.trim()) {
      sendMessage(data.message);
      form.reset();
    }
  };
  
  // 대화창 닫을 때 activeUser 초기화
  const handleClose = () => {
    onClose();
    // setActiveUser(null); 
    // 이 줄은 주석 처리합니다. 사용자가 대화 목록으로 돌아갔을 때 현재 대화를 유지하는 것이 더 나은 UX입니다.
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 h-[80vh] max-h-[600px] flex flex-col">
        <DialogHeader className="px-4 py-2 border-b flex flex-row items-center justify-between">
          <div className="flex items-center">
            {activeUserDetails && (
              <>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{activeUserDetails.avatar}</AvatarFallback>
                </Avatar>
                <DialogTitle className="mr-2">{activeUserDetails.userName}</DialogTitle>
                {isOnePointRequest && (
                  <Badge 
                    variant="secondary" 
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                  >
                    원포인트 레슨
                  </Badge>
                )}
              </>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentChat.map((message: ChatMessage, index: number) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender !== 'user' && message.sender !== 'system' && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback>
                      {activeUserDetails?.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : message.sender === 'system'
                        ? 'bg-muted text-muted-foreground text-center w-full'
                        : 'bg-secondary'
                  } ${message.type === 'onepoint' ? 'border border-amber-400' : ''}`}
                >
                  <p>{message.text}</p>
                  {message.sender !== 'system' && (
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder="메시지를 입력하세요..." 
                        {...field} 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon">
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
