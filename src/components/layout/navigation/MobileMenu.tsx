
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, FileQuestion, Bell, Info, X, User, ShoppingBag, MessageCircle, BookOpen } from "lucide-react";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleNavClick: (path: string) => void;
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen, handleNavClick }: MobileMenuProps) {
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col px-4 py-6 space-y-4 bg-background md:hidden top-16">
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
        <div className="grid gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>로그인</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>회원가입</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
