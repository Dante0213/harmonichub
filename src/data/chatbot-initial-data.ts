
import { DirectMessage, Message, NotificationSetting } from "../types/chatbot.types";

// 초기 주요 채팅 메시지 (시스템 메시지)
export const initialChatMessages: Message[] = [
  {
    id: "1",
    text: "안녕하세요! 하모닉허브입니다. 무엇을 도와드릴까요?",
    sender: "system",
    timestamp: new Date()
  }
];

// 기본 DM 목록
export const initialDirectMessages: DirectMessage[] = [
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

export const initialNotificationSetting: NotificationSetting = {
  toastEnabled: true,
  badgeEnabled: true
};
