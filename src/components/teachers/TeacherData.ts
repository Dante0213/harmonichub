
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
}

// Mock data for teachers
export const teachersList: Teacher[] = [
  { id: 1, name: "김태희", specialty: "피아노", image: "/placeholder.svg", education: "서울대학교 음악대학", experience: "10년 경력", certificates: "음악교육 자격증", introduction: "반갑습니다. 피아노를 가르치고 있습니다.", category: "클래식", isProfessional: true },
  { id: 2, name: "이민호", specialty: "기타", image: "/placeholder.svg", education: "한양대학교 음악대학", experience: "8년 경력", certificates: "기타 지도사 자격증", introduction: "기타를 쉽고 재미있게 가르칩니다.", category: "실용음악", isProfessional: true },
  { id: 3, name: "박신혜", specialty: "바이올린", image: "/placeholder.svg", education: "연세대학교 음악대학", experience: "12년 경력", certificates: "바이올린 마스터 자격증", introduction: "바이올린의 아름다움을 전달합니다.", category: "클래식", isProfessional: false },
  { id: 4, name: "정우성", specialty: "드럼", image: "/placeholder.svg", education: "고려대학교 음악대학", experience: "15년 경력", certificates: "드럼 마스터 자격증", introduction: "리듬과 비트를 느껴보세요.", category: "실용음악", isProfessional: true },
  { id: 5, name: "손예진", specialty: "보컬", image: "/placeholder.svg", education: "이화여자대학교 음악대학", experience: "7년 경력", certificates: "보컬 트레이너 자격증", introduction: "여러분의 목소리를 찾아드립니다.", category: "실용음악", isProfessional: true },
  { id: 6, name: "공유", specialty: "작곡", image: "/placeholder.svg", education: "중앙대학교 음악대학", experience: "9년 경력", certificates: "작곡가 자격증", introduction: "나만의 음악을 만들어보세요.", category: "실용음악", isProfessional: false },
];

export const specialties = [
  "보컬", "피아노", "기타", "베이스", "드럼", "퍼커션", "작곡", "화성학 이론", "전자음악", 
  "바이올린", "비올라", "첼로", "콘트라베이스", "트럼펫", "트럼본", "호른", "튜바", 
  "클라리넷", "오보에", "플룻", "바순", "월드뮤직", "음향", "뮤직비즈니스"
];
