
export interface Teacher {
  id: number;
  name: string;
  specialty: string;
  image: string;
  education: string;
  experience: string;
  certificates: string;
  introduction: string;
  category: string;
  isProfessional: boolean;
  curriculum?: string;
  pricing?: {
    lessonPrice: number;
    lessonCount: number;
    onePointPrice: number;
    onePointDuration: number;
  };
}

// Mock data for teachers
export const teachersList: Teacher[] = [
  { 
    id: 1, 
    name: "김태희", 
    specialty: "피아노", 
    image: "/placeholder.svg", 
    education: "서울대학교 음악대학", 
    experience: "10년 경력", 
    certificates: "음악교육 자격증", 
    introduction: "반갑습니다. 피아노를 가르치고 있습니다.", 
    category: "클래식", 
    isProfessional: true,
    curriculum: "초급: 기본 연주법 / 중급: 클래식 명곡 연주 / 고급: 고난이도 작품 해석",
    pricing: {
      lessonPrice: 100000,
      lessonCount: 4,
      onePointPrice: 30000,
      onePointDuration: 10
    }
  },
  { 
    id: 2, 
    name: "이민호", 
    specialty: "기타", 
    image: "/placeholder.svg", 
    education: "한양대학교 음악대학", 
    experience: "8년 경력", 
    certificates: "기타 지도사 자격증", 
    introduction: "기타를 쉽고 재미있게 가르칩니다.", 
    category: "실용음악", 
    isProfessional: true,
    curriculum: "코드 기초부터 핑거스타일까지 단계별 학습",
    pricing: {
      lessonPrice: 90000,
      lessonCount: 4,
      onePointPrice: 25000,
      onePointDuration: 10
    }
  },
  { 
    id: 3, 
    name: "박신혜", 
    specialty: "바이올린", 
    image: "/placeholder.svg", 
    education: "연세대학교 음악대학", 
    experience: "12년 경력", 
    certificates: "바이올린 마스터 자격증", 
    introduction: "바이올린의 아름다움을 전달합니다.", 
    category: "클래식", 
    isProfessional: true,
    curriculum: "기초 보잉법부터 고급 테크닉까지 체계적 지도",
    pricing: {
      lessonPrice: 110000,
      lessonCount: 4,
      onePointPrice: 35000,
      onePointDuration: 10
    }
  },
  { 
    id: 4, 
    name: "정우성", 
    specialty: "드럼", 
    image: "/placeholder.svg", 
    education: "고려대학교 음악대학", 
    experience: "15년 경력", 
    certificates: "드럼 마스터 자격증", 
    introduction: "리듬과 비트를 느껴보세요.", 
    category: "실용음악", 
    isProfessional: true,
    curriculum: "기본 리듬부터 복잡한 패턴까지 단계별 학습",
    pricing: {
      lessonPrice: 95000,
      lessonCount: 4,
      onePointPrice: 28000,
      onePointDuration: 10
    }
  },
  { 
    id: 5, 
    name: "손예진", 
    specialty: "보컬", 
    image: "/placeholder.svg", 
    education: "이화여자대학교 음악대학", 
    experience: "7년 경력", 
    certificates: "보컬 트레이너 자격증", 
    introduction: "여러분의 목소리를 찾아드립니다.", 
    category: "실용음악", 
    isProfessional: true,
    curriculum: "호흡법, 발성, 곡 해석까지 종합적인 보컬 트레이닝",
    pricing: {
      lessonPrice: 100000,
      lessonCount: 4,
      onePointPrice: 30000,
      onePointDuration: 10
    }
  },
  { 
    id: 6, 
    name: "공유", 
    specialty: "작곡", 
    image: "/placeholder.svg", 
    education: "중앙대학교 음악대학", 
    experience: "9년 경력", 
    certificates: "작곡가 자격증", 
    introduction: "나만의 음악을 만들어보세요.", 
    category: "실용음악", 
    isProfessional: true,
    curriculum: "작곡 기초부터 편곡, 프로듀싱까지 종합 지도",
    pricing: {
      lessonPrice: 120000,
      lessonCount: 4,
      onePointPrice: 40000,
      onePointDuration: 10
    }
  },
];

export const specialties = [
  "보컬", "피아노", "기타", "베이스", "드럼", "퍼커션", "작곡", "화성학 이론", "전자음악", 
  "바이올린", "비올라", "첼로", "콘트라베이스", "트럼펫", "트럼본", "호른", "튜바", 
  "클라리넷", "오보에", "플룻", "바순", "월드뮤직", "음향", "뮤직비즈니스"
];
