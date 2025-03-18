
import { create as createStore } from "zustand";
import { initialChatMessages, initialDirectMessages, initialNotificationSetting } from "@/data/chatbot-initial-data";
import { ChatbotState } from "@/types/chatbot.types";
import createChatbotActions from "./chatbot/use-chatbot-actions";

// 타입 내보내기 (다른 컴포넌트에서 사용할 수 있도록)
export type { ChatMessage, Message, DirectMessage, NotificationSetting } from "@/types/chatbot.types";

export const useChatbot = createStore<ChatbotState>((set, get) => {
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
    
    // 액션 메소드들 - 분리된 파일에서 가져오기
    ...createChatbotActions(set, get),
  };
});
