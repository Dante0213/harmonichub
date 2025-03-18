
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
