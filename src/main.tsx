
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 콘솔에 환경 정보 출력하여 디버깅 돕기
console.log('=============================================');
console.log('애플리케이션 시작 - 기본 정보');
console.log('=============================================');
console.log('Environment mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Window location:', window.location.href);
console.log('Document base URL:', document.baseURI);

// GitHub Pages 배포 문제 디버깅을 위한 추가 로그
console.log('Window origin:', window.location.origin);
console.log('Window pathname:', window.location.pathname);
console.log('Navigator user agent:', navigator.userAgent);

// 로드된 스크립트 확인
const scripts = document.querySelectorAll('script');
console.log('Loaded scripts:', scripts.length);
scripts.forEach((script, i) => {
  console.log(`Script #${i + 1}:`, script.src || 'Inline script');
});

// DOM 요소 점검
console.log('=============================================');
console.log('DOM 요소 점검');
console.log('=============================================');
console.log('Root element exists:', !!document.getElementById("root"));
console.log('Body content:', document.body.innerHTML.substring(0, 100) + '...');

// CSS 리소스 점검
const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
console.log('CSS links found:', cssLinks.length);
cssLinks.forEach((link, index) => {
  console.log(`CSS #${index + 1}:`, link.getAttribute('href'));
});

// MIME 타입 확인 로그 추가
console.log('=============================================');
console.log('MIME 타입 확인');
console.log('=============================================');
console.log('현재 script 태그 type:', document.currentScript?.type || 'unknown');

// 앱이 실제로 마운트되었는지 확인
console.log('=============================================');
console.log('React DOM 마운트 시작');
console.log('=============================================');
const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('React DOM 마운트 성공');
  } catch (error) {
    console.error('React DOM 마운트 실패:', error);
    console.error('오류 세부 정보:', error instanceof Error ? error.message : String(error));
  }
} else {
  console.error('치명적 오류: root 요소를 찾을 수 없음!');
  console.error('HTML 구조:', document.documentElement.innerHTML);
}
