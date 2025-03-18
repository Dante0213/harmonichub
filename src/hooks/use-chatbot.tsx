
import { useState, useEffect, useRef } from "react";
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
  isOnePointRequest?: boolean;
};

type NotificationSetting = {
  toastEnabled: boolean;
  badgeEnabled: boolean;
};

export function useChatbot() {
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
  const [notificationSetting, setNotificationSetting] = useState<NotificationSetting>({
    toastEnabled: true,
    badgeEnabled: true
  });
  const { toast } = useToast();

  // 원포인트 레슨 요청 이벤트 리스너 등록
  useEffect(() => {
    // 로컬 스토리지 이벤트 확인
    const checkOnePointRequests = () => {
      const onePointEvent = localStorage.getItem('onePointRequestEvent');
      if (onePointEvent) {
        try {
          const event = JSON.parse(onePointEvent);
          
          // 이미 처리된 이벤트인지 확인
          const processedEvents = localStorage.getItem('processedOnePointEvents') || '[]';
          const processedEventIds = JSON.parse(processedEvents);
          
          if (!processedEventIds.includes(event.message.id)) {
            // 새 메시지 추가
            const newMessage: DirectMessage = {
              id: event.message.id,
              sender: '학생으로부터',
              senderAvatar: event.message.senderAvatar,
              text: event.message.text,
              timestamp: new Date(event.message.timestamp),
              read: false,
              isOnePointRequest: true
            };
            
            setDirectMessages(prev => [newMessage, ...prev]);
            
            // 알림 표시
            if (notificationSetting.toastEnabled) {
              toast({
                title: "새 원포인트 레슨 요청",
                description: `학생으로부터 원포인트 레슨 요청이 도착했습니다.`,
              });
            }
            
            // 처리된 이벤트로 표시
            processedEventIds.push(event.message.id);
            localStorage.setItem('processedOnePointEvents', JSON.stringify(processedEventIds));
          }
          
          // 이벤트 처리 후 삭제
          localStorage.removeItem('onePointRequestEvent');
        } catch (error) {
          console.error('원포인트 이벤트 처리 중 오류 발생:', error);
        }
      }
    };

    // 페이지 로드시 확인
    checkOnePointRequests();

    // 커스텀 이벤트 리스너 등록
    const handleOnePointRequest = (event: Event) => {
      const customEvent = event as CustomEvent;
      const data = customEvent.detail;
      
      // 새 메시지 추가
      const newMessage: DirectMessage = {
        id: data.message.id,
        sender: '학생으로부터',
        senderAvatar: data.message.senderAvatar,
        text: data.message.text,
        timestamp: new Date(data.message.timestamp),
        read: false,
        isOnePointRequest: true
      };
      
      setDirectMessages(prev => [newMessage, ...prev]);
      
      // 알림 표시
      if (notificationSetting.toastEnabled) {
        toast({
          title: "새 원포인트 레슨 요청",
          description: `학생으로부터 원포인트 레슨 요청이 도착했습니다.`,
        });
      }
    };

    window.addEventListener('onePointRequest', handleOnePointRequest);
    
    // 정기적으로 로컬 스토리지 확인 (다른 탭에서 발생한 이벤트 처리를 위함)
    const intervalId = setInterval(checkOnePointRequests, 5000);

    return () => {
      window.removeEventListener('onePointRequest', handleOnePointRequest);
      clearInterval(intervalId);
    };
  }, [toast, notificationSetting.toastEnabled]);

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

  // 안읽은 메시지 개수
  const unreadCount = directMessages.filter(dm => !dm.read).length;

  return {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    message,
    setMessage,
    messages,
    directMessages,
    notificationSetting,
    setNotificationSetting,
    unreadCount,
    handleSendMessage,
    markAsRead
  };
}

export type { Message, DirectMessage, NotificationSetting };
