
import { ChatbotState } from "@/types/chatbot.types";
import createChatbotUIActions from "./use-chatbot-ui-actions";
import createChatbotMessageActions from "./use-chatbot-message-actions";
import createChatbotDMActions from "./use-chatbot-dm-actions";
import createChatbotNotificationActions from "./use-chatbot-notification-actions";

// 채팅봇 액션들을 위한 스토어 생성
const createChatbotActions = (set: any, get: any): Pick<ChatbotState, 
  'toggleChat' | 'handleSendMessage' | 'sendMessage' | 'addDirectMessage' | 
  'setActiveUser' | 'markAsRead' | 'markMessagesAsRead' | 'setNotificationSetting' | 
  'addOnePointRequest' | 'setIsOpen' | 'setActiveTab' | 'setMessage'> => {
  
  return {
    // UI 관련 액션
    ...createChatbotUIActions(set, get),
    
    // 메시지 전송 관련 액션
    ...createChatbotMessageActions(set, get),
    
    // DM 관련 액션
    ...createChatbotDMActions(set, get),
    
    // 알림 설정 관련 액션
    ...createChatbotNotificationActions(set, get),
  };
};

export default createChatbotActions;
