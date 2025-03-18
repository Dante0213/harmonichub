
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Music, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function UserProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 컴포넌트 마운트 및 세션 스토리지 변경 시 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
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
    };
    
    // 초기 확인
    checkLoginStatus();
    
    // 세션 스토리지 변경 이벤트 리스너
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    // 세션 스토리지에서 로그인 상태 제거
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
    
    // 상태 업데이트
    setIsLoggedIn(false);
    setUserData(null);
    
    // 로그아웃 알림
    toast({
      title: "로그아웃 완료",
      description: "성공적으로 로그아웃되었습니다.",
      duration: 1000, // 1초 후 자동으로 사라짐
    });
    
    // 홈페이지로 리다이렉트
    navigate('/');
  };
  
  // 로그인하지 않은 경우 로그인/회원가입 버튼 표시
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/sign-in">로그인</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/sign-up">회원가입</Link>
        </Button>
      </div>
    );
  }
  
  const isProfessional = userData?.isProfessional || false;
  const userNickname = userData?.nickname || "사용자";
  const userEmail = userData?.email || "user@example.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative px-2 rounded-full">
          <span className="font-medium">My</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium leading-none">{userNickname}</p>
              {isProfessional && (
                <Music className="h-3 w-3 text-purple-500" fill="currentColor" />
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/mypage" className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              마이페이지
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/settings" className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              설정
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
