
export interface Reel {
  id: number | string;
  user: string;
  userHandle: string;
  avatar: string;
  imageUrl?: string;
  isTeacher?: boolean;
  isVerified?: boolean; // 추가된 필드
  followers?: string; // 추가된 필드
  isProfessional?: boolean; // 추가된 속성
  time: string;
  content: string;
  likes: number;
  comments: number;
  views?: string;
  duration?: string;
  // New fields needed for compatibility
  description?: string;
  videoUrl?: string;
  hashtags?: string[];
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  // 댓글 데이터를 위한 속성 추가
  commentData?: {
    user: string;
    text: string;
    time: string;
    likes: number;
  }[];
  // Additional profile information
  education?: {id: string; institution: string; degree: string; year: string}[];
  experience?: {id: string; company: string; position: string; period: string}[];
  certificates?: {id: string; name: string; issuer: string; year: string}[];
  instruments?: string[];
  genres?: string[];
  bio?: string;
}

export const reelsData: Reel[] = [
  {
    id: 101,
    user: "최유진",
    userHandle: "yujin_choi",
    avatar: "Y",
    isTeacher: true,
    isVerified: true, // 추가
    followers: "2.3K", // 추가
    time: "3시간 전",
    content: "새로 배운 재즈 피아노 연주입니다. 즉흥 연주라 부족한 점이 많지만 봐주세요~ #재즈피아노 #즉흥연주 #음악",
    likes: 123,
    comments: 18,
    views: "1.2K",
    duration: "00:45",
    // Add new fields for compatibility
    description: "새로 배운 재즈 피아노 연주입니다. 즉흥 연주라 부족한 점이 많지만 봐주세요~",
    videoUrl: "https://example.com/video1.mp4",
    hashtags: ["#재즈피아노", "#즉흥연주", "#음악"],
    likeCount: 123,
    commentCount: 18,
    isLiked: false,
    // Additional profile information
    bio: "음악을 사랑하는 피아니스트입니다. 즉흥 연주와 재즈를 좋아해요.",
    instruments: ["피아노", "키보드"],
    genres: ["재즈", "클래식"],
    education: [
      {id: "ed1", institution: "서울예술대학교", degree: "음악학과", year: "2018-2022"}
    ],
    experience: [
      {id: "ex1", company: "서울재즈클럽", position: "피아니스트", period: "2022-현재"}
    ],
    certificates: [
      {id: "cert1", name: "피아노 연주자격증", issuer: "한국음악협회", year: "2020"}
    ]
  },
  {
    id: 102,
    user: "정승호",
    userHandle: "seungho_j",
    avatar: "S",
    isTeacher: false,
    isVerified: false, // 추가
    followers: "876", // 추가
    time: "5시간 전",
    content: "기타 핑거스타일 연습 중입니다. 이 곡 완성하면 또 올릴게요! #기타 #핑거스타일 #어쿠스틱기타",
    likes: 89,
    comments: 7,
    views: "876",
    duration: "00:38",
    // Add new fields for compatibility
    description: "기타 핑거스타일 연습 중입니다. 이 곡 완성하면 또 올릴게요!",
    videoUrl: "https://example.com/video2.mp4",
    hashtags: ["#기타", "#핑거스타일", "#어쿠스틱기타"],
    likeCount: 89,
    commentCount: 7,
    isLiked: false,
    // Additional profile information
    bio: "기타 연주를 사랑하는 음악가입니다. 핑거스타일 연주를 주로 합니다.",
    instruments: ["기타", "우쿨렐레"],
    genres: ["어쿠스틱", "포크"],
    education: [
      {id: "ed1", institution: "한국음악대학", degree: "기타학과", year: "2019-2023"}
    ],
    experience: [
      {id: "ex1", company: "어쿠스틱 카페", position: "연주자", period: "2023-현재"}
    ],
    certificates: [
      {id: "cert1", name: "기타 연주 자격증", issuer: "한국기타협회", year: "2021"}
    ]
  },
  {
    id: 103,
    user: "김다희",
    userHandle: "dahee_kim",
    avatar: "D",
    isTeacher: true,
    isVerified: true, // 추가
    followers: "2.3K", // 추가
    time: "1일 전",
    content: "드럼 솔로 연습 - 처음 도전해봤어요. 많이 서툴지만 조언 부탁드려요! #드럼 #드럼솔로 #연습중",
    likes: 201,
    comments: 32,
    views: "2.3K",
    duration: "00:52",
    // Add new fields for compatibility
    description: "드럼 솔로 연습 - 처음 도전해봤어요. 많이 서툴지만 조언 부탁드려요!",
    videoUrl: "https://example.com/video3.mp4",
    hashtags: ["#드럼", "#드럼솔로", "#연습중"],
    likeCount: 201,
    commentCount: 32,
    isLiked: false,
    // Additional profile information
    bio: "드럼을 사랑하는 음악가입니다. 다양한 장르에 도전하고 있어요.",
    instruments: ["드럼", "퍼커션"],
    genres: ["록", "팝", "재즈"],
    education: [
      {id: "ed1", institution: "국립예술대학", degree: "타악기학과", year: "2017-2021"}
    ],
    experience: [
      {id: "ex1", company: "서울 뮤직 밴드", position: "드러머", period: "2021-현재"}
    ],
    certificates: [
      {id: "cert1", name: "드럼 전문가 자격증", issuer: "한국드럼협회", year: "2019"}
    ]
  }
];
