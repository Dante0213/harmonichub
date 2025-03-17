
/**
 * 정적 자산 경로 관리를 위한 유틸리티
 * GitHub Pages 배포 환경에서 경로 문제를 해결합니다.
 */

// 기본 공개 경로 (GitHub Pages 배포 시 사용)
export const PUBLIC_PATH = '/music-learn-connect/';

/**
 * 정적 자산의 절대 경로를 생성합니다.
 * @param relativePath 상대 경로 (예: 'images/logo.png')
 * @returns 절대 경로 (예: '/music-learn-connect/images/logo.png')
 */
export const getAssetPath = (relativePath: string): string => {
  // 이미 절대 경로이거나 외부 URL인 경우 그대로 반환
  if (relativePath.startsWith('http') || relativePath.startsWith('//') || relativePath.startsWith(PUBLIC_PATH)) {
    return relativePath;
  }
  
  // 상대 경로를 절대 경로로 변환
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${PUBLIC_PATH}${cleanPath}`;
};

/**
 * 이미지 URL을 적절한 절대 경로로 변환합니다.
 * @param src 이미지 소스 경로
 * @returns 절대 경로로 변환된 이미지 URL
 */
export const getImageUrl = (src: string): string => {
  return getAssetPath(src);
};

/**
 * CSS, JS 등의 자산 URL을 적절한 절대 경로로 변환합니다.
 * @param url 자산 URL
 * @returns 절대 경로로 변환된 자산 URL
 */
export const getAssetUrl = (url: string): string => {
  return getAssetPath(url);
};

// 개발 환경에서의 경로 문제 확인을 위한 디버그 함수
export const logAssetPath = (path: string): void => {
  console.log(`원본 경로: ${path}`);
  console.log(`변환된 경로: ${getAssetPath(path)}`);
};
