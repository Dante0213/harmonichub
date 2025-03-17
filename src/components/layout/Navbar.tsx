
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { SecondaryNavigation } from "./navigation/SecondaryNavigation";
import { MainNavigation } from "./navigation/MainNavigation";
import { MobileMenu } from "./navigation/MobileMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // 현재 페이지에 있을 때 클릭하면 페이지 새로고침
  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      // 현재 페이지면 새로고침
      window.location.reload();
    } else {
      // 다른 페이지면 이동
      navigate(path);
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col px-4 mx-auto">
        {/* 로고 영역 */}
        <div className="flex items-center justify-between h-16">
          <NavbarLogo />
          
          {/* Desktop Navigation - 보조 메뉴 */}
          <SecondaryNavigation />

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 메인 네비게이션 - 로고 밑으로 이동 */}
        <MainNavigation handleNavClick={handleNavClick} />
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleNavClick={handleNavClick}
      />
    </nav>
  );
}
