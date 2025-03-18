
import { create } from "zustand";
import { toast } from "sonner";

export type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type?: 'lesson' | 'normal' | 'onepoint';
  isRead?: boolean;
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
};

interface ChatbotState {
  // 현재 대화 상태
  chatOpen: boolean;
  currentChat: ChatMessage[];
  directMessages: DirectMessage[];
  activeUserId: number | null;
  
  // 액션
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
  sendMessage: (text: string) => void;
  addDirectMessage: (userId: number, userName: string, message: string, avatar?: string, isOnePointRequest?: boolean) => void;
  setActiveUser: (userId: number | null) => void;
  markMessagesAsRead: (userId: number) => void;
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
const initialChatMessages: ChatMessage[] = [
  {
    id: "1",
    text: "안녕하세요! 하모닉허브입니다. 무엇을 도와드릴까요?",
    sender: "system",
    timestamp: new Date(),
    isRead: true
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
    avatar: "KJ"
  },
  {
    id: "dm2",
    userId: 2,
    userName: "박현우 선생님",
    lastMessage: "네, 그 시간에 레슨 가능합니다.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 하루 전
    unreadCount: 0,
    avatar: "PH"
  }
];

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
    chatOpen: false,
    currentChat: [...initialChatMessages],
    directMessages: [...initialDirectMessages],
    activeUserId: null,
    
    toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen })),
    
    setChatOpen: (open) => set({ chatOpen: open }),
    
    sendMessage: (text) => set((state) => {
      // 사용자 메시지 추가
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        text,
        sender: "user",
        timestamp: new Date(),
        isRead: true
      };
      
      let updatedChat = [...state.currentChat, userMessage];
      
      // activeUserId가 있으면 DM, 없으면 챗봇
      if (state.activeUserId !== null) {
        // DM 응답 (실제로는 API 호출)
        setTimeout(() => {
          const teacherResponse: ChatMessage = {
            id: `teacher-${Date.now()}`,
            text: `[자동 응답] "${text}"에 대한 답변은 곧 선생님이 확인 후 답변드릴 예정입니다.`,
            sender: "teacher",
            timestamp: new Date(),
            isRead: true
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
          const botResponse: ChatMessage = {
            id: `bot-${Date.now()}`,
            text: generateBotResponse(text),
            sender: "system",
            timestamp: new Date(),
            isRead: true
          };
          
          set((state) => ({
            currentChat: [...state.currentChat, botResponse]
          }));
        }, 1000);
      }
      
      return { currentChat: updatedChat };
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
          isOnePointRequest: isOnePointRequest || updatedDms[existingDmIndex].isOnePointRequest
        };
        
        return { directMessages: updatedDms };
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
          isOnePointRequest
        };
        
        return { 
          directMessages: [newDm, ...state.directMessages]
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
              timestamp: new Date(),
              isRead: true
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
    
    markMessagesAsRead: (userId) => set((state) => ({
      directMessages: state.directMessages.map(dm => 
        dm.userId === userId 
          ? {...dm, unreadCount: 0}
          : dm
      )
    })),
    
    addOnePointRequest: (teacherId, teacherName, message) => {
      // 원포인트 레슨 요청을 DM에 추가
      get().addDirectMessage(teacherId, teacherName, message, undefined, true);
      
      // 현재 DM 대화창이 열려있는지 확인
      const { activeUserId, chatOpen } = get();
      
      // 해당 선생님과 대화 중이지 않거나 채팅이 닫혀있는 경우 토스트 알림
      if (activeUserId !== teacherId || !chatOpen) {
        toast({
          title: "새 원포인트 레슨 요청",
          description: `학생으로부터 원포인트 레슨 요청이 도착했습니다.`,
          duration: 1000, // 1초 후 자동으로 사라짐
        });
      }
    }
  };
});
