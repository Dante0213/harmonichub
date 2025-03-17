
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 콘솔에 환경 정보 출력하여 디버깅 돕기
console.log('Environment mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Window location:', window.location.href);
console.log('Document base URL:', document.baseURI);

// GitHub Pages 배포 문제 디버깅을 위한 추가 로그
console.log('Window origin:', window.location.origin);
console.log('Window pathname:', window.location.pathname);
console.log('Navigator user agent:', navigator.userAgent);

// 앱이 실제로 마운트되었는지 확인
console.log('React DOM 마운트 시작');
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log('React DOM 마운트 완료');
} else {
  console.error('root 요소를 찾을 수 없음!');
}
