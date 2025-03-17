
export interface Reel {
  id: number;
  user: string;
  userHandle: string;
  avatar: string;
  isTeacher?: boolean;
  time: string;
  content: string;
  likes: number;
  comments: number;
  views?: string;
  duration?: string;
}

export const reelsData: Reel[] = [
  {
    id: 101,
    user: "최유진",
    userHandle: "yujin_choi",
    avatar: "Y",
    isTeacher: true,
    time: "3시간 전",
    content: "새로 배운 재즈 피아노 연주입니다. 즉흥 연주라 부족한 점이 많지만 봐주세요~ #재즈피아노 #즉흥연주 #음악",
    likes: 123,
    comments: 18,
    views: "1.2K",
    duration: "00:45"
  },
  {
    id: 102,
    user: "정승호",
    userHandle: "seungho_j",
    avatar: "S",
    isTeacher: false,
    time: "5시간 전",
    content: "기타 핑거스타일 연습 중입니다. 이 곡 완성하면 또 올릴게요! #기타 #핑거스타일 #어쿠스틱기타",
    likes: 89,
    comments: 7,
    views: "876",
    duration: "00:38"
  },
  {
    id: 103,
    user: "김다희",
    userHandle: "dahee_kim",
    avatar: "D",
    isTeacher: true,
    time: "1일 전",
    content: "드럼 솔로 연습 - 처음 도전해봤어요. 많이 서툴지만 조언 부탁드려요! #드럼 #드럼솔로 #연습중",
    likes: 201,
    comments: 32,
    views: "2.3K",
    duration: "00:52"
  }
];
