
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

createRoot(document.getElementById("root")!).render(<App />);
