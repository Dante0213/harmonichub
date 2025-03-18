
import { ChatbotState, Message, ChatMessage } from "@/types/chatbot.types";
import { generateBotResponse } from "@/utils/chatbot-utils";

const createChatbotMessageActions = (set: any, get: any): Pick<ChatbotState, 
  'handleSendMessage' | 'sendMessage'> => ({
  
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
});

export default createChatbotMessageActions;
