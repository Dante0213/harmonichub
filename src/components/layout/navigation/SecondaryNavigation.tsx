
import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";
import { UserProfileDropdown } from "../profile/UserProfileDropdown";

export function SecondaryNavigation() {
  // 경로 디버깅을 위한 로그
  const logPath = () => {
    console.log('현재 URL:', window.location.href);
    console.log('pathname:', window.location.pathname);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* 링크 컴포넌트로 변경하여 DOM 중첩 오류 해결 */}
      <Link 
        to="/sign-in" 
        className="text-sm font-medium hover:text-primary"
        onClick={logPath}
      >
        로그인
      </Link>
      <Link 
        to="/sign-up" 
        className="text-sm font-medium hover:text-primary"
        onClick={logPath}
      >
        회원가입
      </Link>
      
      {/* 테마 토글 버튼 */}
      <ThemeToggle />
      
      {/* 사용자 프로필 */}
      <UserProfileDropdown />
    </div>
  );
}
