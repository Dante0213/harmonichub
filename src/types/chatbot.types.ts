
export type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type?: 'lesson' | 'normal' | 'onepoint';
};

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
};

export type NotificationSetting = {
  toastEnabled: boolean;
  badgeEnabled: boolean;
};

export interface ChatbotState {
  // UI States
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  message: string;
  setMessage: (message: string) => void;
  
  // Data States
  messages: Message[];
  currentChat: ChatMessage[];
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
