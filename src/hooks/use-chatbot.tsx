
import { create } from "zustand";
import { toast } from "sonner";

export type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type?: 'lesson' | 'normal' | 'onepoint';
};

export type DirectMessage = {
  id: string;
  userId: number;
  userName: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar?: string;
  isOnePointRequest?: boolean;
  read?: boolean;
  text?: string;
  sender?: string;
  senderAvatar?: string;
};

export type NotificationSetting = {
  toastEnabled: boolean;
  badgeEnabled: boolean;
};

interface ChatbotState {
  // UI States
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  message: string;
  setMessage: (message: string) => void;
  
  // Data States
  messages: Message[];
  currentChat: Message[];
  directMessages: DirectMessage[];
  activeUserId: number | null;
  notificationSetting: NotificationSetting;
  unreadCount: number;
  
  // Actions
  toggleChat: () => void;
  sendMessage: (text: string) => void;
  handleSendMessage: () => void;
  addDirectMessage: (userId: number, userName: string, message: string, avatar?: string, isOnePointRequest?: boolean) => void;
  setActiveUser: (userId: number | null) => void;
  markAsRead: (id: string) => void;
  markMessagesAsRead: (userId: number) => void;
  setNotificationSetting: (setting: NotificationSetting) => void;
  addOnePointRequest: (teacherId: number, teacherName: string, message: string) => void;
}

// 기본 챗봇 응답 생성
const generateBotResponse = (userMessage: string): string => {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('안녕') || lowerMsg.includes('hello')) {
    return "안녕하세요! 하모닉허브입니다. 어떻게 도와드릴까요?";
  } else if (lowerMsg.includes('레슨') || lowerMsg.includes('lesson')) {
    return "레슨에 관심이 있으신가요? 선생님 탭에서 다양한 선생님들을 만나보세요!";
  } else if (lowerMsg.includes('비용') || lowerMsg.includes('가격') || lowerMsg.includes('price')) {
    return "레슨 비용은 선생님마다 다르게 책정되어 있습니다. 각 선생님의 프로필에서 확인하실 수 있습니다.";
  } else if (lowerMsg.includes('문의') || lowerMsg.includes('contact')) {
    return "추가 문의사항은 support@harmonichub.com으로 이메일 주시거나 02-123-4567로 전화주세요.";
  } else {
    return "죄송합니다. 말씀하신 내용을 정확히 이해하지 못했습니다. 도움이 필요하시면 '레슨', '비용', '문의'에 대해 물어보세요.";
  }
};

// 초기 주요 채팅 메시지 (시스템 메시지)
const initialChatMessages: Message[] = [
  {
    id: "1",
    text: "안녕하세요! 하모닉허브입니다. 무엇을 도와드릴까요?",
    sender: "system",
    timestamp: new Date()
  }
];

// 기본 DM 목록
const initialDirectMessages: DirectMessage[] = [
  {
    id: "dm1",
    userId: 1,
    userName: "김지수 선생님",
    lastMessage: "안녕하세요! 레슨 문의 주셔서 감사합니다.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
    unreadCount: 1,
    avatar: "KJ",
    read: false
  },
  {
    id: "dm2",
    userId: 2,
    userName: "박현우 선생님",
    lastMessage: "네, 그 시간에 레슨 가능합니다.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 하루 전
    unreadCount: 0,
    avatar: "PH",
    read: true
  }
];

const initialNotificationSetting: NotificationSetting = {
  toastEnabled: true,
  badgeEnabled: true
};

export const useChatbot = create<ChatbotState>((set, get) => {
  // 원포인트 레슨 요청 이벤트 리스너 설정
  if (typeof window !== 'undefined') {
    window.addEventListener('onePointLessonRequest', (event: Event) => {
      const customEvent = event as CustomEvent;
      const { teacherId, teacherName, message } = customEvent.detail;
      
      // 스토어 상태 업데이트
      get().addOnePointRequest(teacherId, teacherName, message);
    });
  }
  
  return {
    // UI States
    isOpen: false,
    setIsOpen: (open) => set({ isOpen: open }),
    activeTab: "chat",
    setActiveTab: (tab) => set({ activeTab: tab }),
    message: "",
    setMessage: (message) => set({ message }),
    
    // Data States
    messages: [...initialChatMessages],
    currentChat: [...initialChatMessages],
    directMessages: [...initialDirectMessages],
    activeUserId: null,
    notificationSetting: initialNotificationSetting,
    unreadCount: initialDirectMessages.reduce((count, dm) => count + dm.unreadCount, 0),
    
    // Action Methods
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
    
    handleSendMessage: () => {
      const { message, sendMessage } = get();
      if (message.trim()) {
        sendMessage(message);
        set({ message: "" });
      }
    },
    
    sendMessage: (text) => set((state) => {
      // 사용자 메시지 추가
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text,
        sender: "user",
        timestamp: new Date()
      };
      
      let updatedMessages = [...state.messages, userMessage];
      let updatedCurrentChat = [...state.currentChat, userMessage];
      
      // activeUserId가 있으면 DM, 없으면 챗봇
      if (state.activeUserId !== null) {
        // DM 응답 (실제로는 API 호출)
        setTimeout(() => {
          const teacherResponse: Message = {
            id: `teacher-${Date.now()}`,
            text: `[자동 응답] "${text}"에 대한 답변은 곧 선생님이 확인 후 답변드릴 예정입니다.`,
            sender: "teacher",
            timestamp: new Date()
          };
          
          set((state) => ({
            currentChat: [...state.currentChat, teacherResponse]
          }));
          
          // DM 목록 업데이트
          const activeUser = state.directMessages.find(dm => dm.userId === state.activeUserId);
          if (activeUser) {
            set((state) => ({
              directMessages: state.directMessages.map(dm => 
                dm.userId === state.activeUserId 
                  ? {...dm, lastMessage: teacherResponse.text, timestamp: new Date()}
                  : dm
              )
            }));
          }
        }, 1000);
      } else {
        // 챗봇 응답
        setTimeout(() => {
          const botResponse: Message = {
            id: `bot-${Date.now()}`,
            text: generateBotResponse(text),
            sender: "system",
            timestamp: new Date()
          };
          
          set((state) => ({
            messages: [...state.messages, botResponse],
            currentChat: [...state.currentChat, botResponse]
          }));
        }, 1000);
      }
      
      return { 
        messages: updatedMessages,
        currentChat: updatedCurrentChat 
      };
    }),
    
    addDirectMessage: (userId, userName, message, avatar, isOnePointRequest = false) => set((state) => {
      // 이미 존재하는 DM인지 확인
      const existingDmIndex = state.directMessages.findIndex(dm => dm.userId === userId);
      
      if (existingDmIndex !== -1) {
        // 기존 DM 업데이트
        const updatedDms = [...state.directMessages];
        updatedDms[existingDmIndex] = {
          ...updatedDms[existingDmIndex],
          lastMessage: message,
          timestamp: new Date(),
          unreadCount: updatedDms[existingDmIndex].unreadCount + 1,
          isOnePointRequest: isOnePointRequest || updatedDms[existingDmIndex].isOnePointRequest,
          read: false
        };
        
        // 읽지 않은 메시지 총 개수 업데이트
        const unreadCount = updatedDms.reduce((count, dm) => count + dm.unreadCount, 0);
        
        return { 
          directMessages: updatedDms,
          unreadCount
        };
      } else {
        // 새 DM 추가
        const newDm: DirectMessage = {
          id: `dm-${Date.now()}`,
          userId,
          userName,
          lastMessage: message,
          timestamp: new Date(),
          unreadCount: 1,
          avatar: avatar || userName.charAt(0),
          isOnePointRequest,
          read: false
        };
        
        const updatedDms = [newDm, ...state.directMessages];
        const unreadCount = updatedDms.reduce((count, dm) => count + dm.unreadCount, 0);
        
        return { 
          directMessages: updatedDms,
          unreadCount
        };
      }
    }),
    
    setActiveUser: (userId) => set((state) => {
      // 활성 사용자가 변경될 때 채팅 내용 변경
      const newChat = userId === null 
        ? [...initialChatMessages]
        : [
            {
              id: `welcome-${userId}`,
              text: `${state.directMessages.find(dm => dm.userId === userId)?.userName || '선생님'}과의 대화입니다.`,
              sender: "system",
              timestamp: new Date()
            }
          ];
          
      // 해당 사용자의 메시지를 읽음으로 표시
      if (userId !== null) {
        get().markMessagesAsRead(userId);
      }
          
      return { 
        activeUserId: userId,
        currentChat: newChat
      };
    }),
    
    markAsRead: (id) => set((state) => ({
      directMessages: state.directMessages.map(dm => 
        dm.id === id 
          ? {...dm, read: true, unreadCount: 0}
          : dm
      ),
      unreadCount: state.directMessages.reduce((count, dm) => 
        dm.id === id ? count : count + dm.unreadCount, 0)
    })),
    
    markMessagesAsRead: (userId) => set((state) => {
      const updatedDms = state.directMessages.map(dm => 
        dm.userId === userId 
          ? {...dm, unreadCount: 0, read: true}
          : dm
      );
      
      const unreadCount = updatedDms.reduce((count, dm) => count + dm.unreadCount, 0);
      
      return {
        directMessages: updatedDms,
        unreadCount
      };
    }),
    
    setNotificationSetting: (setting) => set({
      notificationSetting: setting
    }),
    
    addOnePointRequest: (teacherId, teacherName, message) => {
      // 원포인트 레슨 요청을 DM에 추가
      get().addDirectMessage(teacherId, teacherName, message, undefined, true);
      
      // 현재 DM 대화창이 열려있는지 확인
      const { activeUserId, isOpen } = get();
      
      // 해당 선생님과 대화 중이지 않거나 채팅이 닫혀있는 경우 토스트 알림
      if (activeUserId !== teacherId || !isOpen) {
        toast({
          description: "학생으로부터 원포인트 레슨 요청이 도착했습니다.",
          duration: 1000, // 1초 후 자동으로 사라짐
        });
      }
    }
  };
});
