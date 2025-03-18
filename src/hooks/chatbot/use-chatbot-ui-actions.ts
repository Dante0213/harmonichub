
import { ChatbotState } from "@/types/chatbot.types";

const createChatbotUIActions = (set: any, get: any): Pick<ChatbotState, 
  'toggleChat' | 'setIsOpen' | 'setActiveTab' | 'setMessage'> => ({
  
  toggleChat: () => set((state: ChatbotState) => ({ isOpen: !state.isOpen })),
  setIsOpen: (open) => set({ isOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setMessage: (message) => set({ message }),
});

export default createChatbotUIActions;
