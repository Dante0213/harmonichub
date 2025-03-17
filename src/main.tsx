
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 콘솔에 환경 정보 출력하여 디버깅 돕기
console.log('Environment mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Window location:', window.location.href);
console.log('Document base URL:', document.baseURI);

createRoot(document.getElementById("root")!).render(<App />);
