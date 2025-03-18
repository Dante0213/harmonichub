
import { ChatbotState, NotificationSetting } from "@/types/chatbot.types";

const createChatbotNotificationActions = (set: any, get: any): Pick<ChatbotState, 
  'setNotificationSetting'> => ({
  
  setNotificationSetting: (setting: NotificationSetting) => set(() => ({
    notificationSetting: setting
  })),
});

export default createChatbotNotificationActions;
