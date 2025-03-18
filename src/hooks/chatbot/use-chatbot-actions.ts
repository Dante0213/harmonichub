
import { create as createStore } from "zustand";
import { toast } from "sonner";
import { generateBotResponse } from "@/utils/chatbot-utils";
import { initialChatMessages, initialDirectMessages, initialNotificationSetting } from "@/data/chatbot-initial-data";
import { ChatbotState, Message, ChatMessage, DirectMessage, NotificationSetting } from "@/types/chatbot.types";

// 채팅봇 액션들을 위한 스토어 생성
const createChatbotActions = (set: any, get: any): Pick<ChatbotState, 
  'toggleChat' | 'handleSendMessage' | 'sendMessage' | 'addDirectMessage' | 
  'setActiveUser' | 'markAsRead' | 'markMessagesAsRead' | 'setNotificationSetting' | 'addOnePointRequest'> => ({
  
  toggleChat: () => set((state: ChatbotState) => ({ isOpen: !state.isOpen })),
  
  handleSendMessage: () => {
    const { message, sendMessage } = get();
    if (message.trim()) {
      sendMessage(message);
      set({ message: "" });
    }
  },
  
  sendMessage: (text: string) => set((state: ChatbotState) => {
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
        const teacherResponse: ChatMessage = {
          id: `teacher-${Date.now()}`,
          text: `[자동 응답] "${text}"에 대한 답변은 곧 선생님이 확인 후 답변드릴 예정입니다.`,
          sender: "teacher",
          timestamp: new Date()
        };
        
        set((state: ChatbotState) => ({
          currentChat: [...state.currentChat, teacherResponse]
        }));
        
        // DM 목록 업데이트
        const activeUser = state.directMessages.find(dm => dm.userId === state.activeUserId);
        if (activeUser) {
          set((state: ChatbotState) => ({
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
        
        set((state: ChatbotState) => ({
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
  
  addDirectMessage: (userId, userName, message, avatar, isOnePointRequest = false) => set((state: ChatbotState) => {
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
  
  setActiveUser: (userId) => set((state: ChatbotState) => {
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
  
  markAsRead: (id) => set((state: ChatbotState) => ({
    directMessages: state.directMessages.map(dm => 
      dm.id === id 
        ? {...dm, read: true, unreadCount: 0}
        : dm
    ),
    unreadCount: state.directMessages.reduce((count, dm) => 
      dm.id === id ? count : count + dm.unreadCount, 0)
  })),
  
  markMessagesAsRead: (userId) => set((state: ChatbotState) => {
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
      toast("학생으로부터 원포인트 레슨 요청이 도착했습니다.");
    }
  }
});

export default createChatbotActions;
