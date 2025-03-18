import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, FileQuestion, Bell, Info, X, User, ShoppingBag, MessageCircle, BookOpen, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleNavClick: (path: string) => void;
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen, handleNavClick }: MobileMenuProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    const loginStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    
    if (loginStatus) {
      try {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
      }
    }
  }, [isMenuOpen]); // 메뉴가 열릴 때마다 상태 확인
  
  const handleLogout = () => {
    // 세션 스토리지에서 로그인 상태 제거
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
    
    // 상태 업데이트
    setIsLoggedIn(false);
    setUserData(null);
    
    // 메뉴 닫기
    setIsMenuOpen(false);
    
    // 로그아웃 알림
    toast({
      title: "로그아웃 완료",
      description: "성공적으로 로그아웃되었습니다.",
    });
    
    // 홈페이지로 리다이렉트
    navigate('/');
  };

  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col px-4 py-6 space-y-4 bg-background md:hidden top-16">
      {/* 로그인 상태인 경우 사용자 정보 표시 */}
      {isLoggedIn && userData && (
        <div className="p-4 mb-2 border-b">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-base font-medium">My</span>
            </div>
            <div>
              <p className="font-medium">{userData.nickname || '사용자'}</p>
              <p className="text-xs text-muted-foreground">{userData.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Navigation for Mobile */}
      <button 
        onClick={() => {
          handleNavClick('/teachers');
          setIsMenuOpen(false);
        }}
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
      >
        <User className="w-5 h-5 mr-3" /> 선생님
      </button>
      <button 
        onClick={() => {
          handleNavClick('/social');
          setIsMenuOpen(false);
        }}
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
      >
        <MessageCircle className="w-5 h-5 mr-3" /> SNS
      </button>
      <button 
        onClick={() => {
          handleNavClick('/learning');
          setIsMenuOpen(false);
        }}
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
      >
        <BookOpen className="w-5 h-5 mr-3" /> 학습실
      </button>
      <button 
        onClick={() => {
          handleNavClick('/store');
          setIsMenuOpen(false);
        }}
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
      >
        <ShoppingBag className="w-5 h-5 mr-3" /> 스토어
      </button>
      
      {/* Secondary Navigation for Mobile */}
      <Link 
        to="/about" 
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
        onClick={() => setIsMenuOpen(false)}
      >
        <Info className="w-5 h-5 mr-3" /> 소개
      </Link>
      <Link 
        to="/notices" 
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
        onClick={() => setIsMenuOpen(false)}
      >
        <Bell className="w-5 h-5 mr-3" /> 공지사항
      </Link>
      <Link 
        to="/guide" 
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
        onClick={() => setIsMenuOpen(false)}
      >
        <Info className="w-5 h-5 mr-3" /> 이용안내
      </Link>
      <Link 
        to="/contact" 
        className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
        onClick={() => setIsMenuOpen(false)}
      >
        <FileQuestion className="w-5 h-5 mr-3" /> 문의
      </Link>
      
      <div className="pt-4 mt-4 border-t">
        {isLoggedIn ? (
          <div className="grid gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/mypage" onClick={() => setIsMenuOpen(false)}>마이페이지</Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> 로그아웃
            </Button>
          </div>
        ) : (
          <div className="grid gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>로그인</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>회원가입</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
