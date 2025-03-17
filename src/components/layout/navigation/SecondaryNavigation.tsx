
import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";
import { UserProfileDropdown } from "../profile/UserProfileDropdown";
import { Bell, FileQuestion, Info } from "lucide-react";

export function SecondaryNavigation() {
  // 경로 디버깅을 위한 로그
  const logPath = () => {
    console.log('현재 URL:', window.location.href);
    console.log('pathname:', window.location.pathname);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* 소개, 공지사항, 이용안내, 문의 링크 */}
      <Link 
        to="/about" 
        className="text-sm font-medium hover:text-primary"
        onClick={logPath}
      >
        <span className="hidden md:inline">소개</span>
        <Info className="inline md:hidden w-4 h-4" />
      </Link>
      <Link 
        to="/notices" 
        className="text-sm font-medium hover:text-primary"
        onClick={logPath}
      >
        <span className="hidden md:inline">공지사항</span>
        <Bell className="inline md:hidden w-4 h-4" />
      </Link>
      <Link 
        to="/guide" 
        className="text-sm font-medium hover:text-primary"
        onClick={logPath}
      >
        <span className="hidden md:inline">이용안내</span>
        <Info className="inline md:hidden w-4 h-4" />
      </Link>
      <Link 
        to="/contact" 
        className="text-sm font-medium hover:text-primary"
        onClick={logPath}
      >
        <span className="hidden md:inline">문의</span>
        <FileQuestion className="inline md:hidden w-4 h-4" />
      </Link>
      
      {/* 테마 토글 버튼 */}
      <ThemeToggle />
      
      {/* 사용자 프로필 */}
      <UserProfileDropdown />
    </div>
  );
}
