
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { MainNavigation } from "./navigation/MainNavigation";
import { MobileMenu } from "./navigation/MobileMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const shouldShowMainNav = ![
    "/", 
    "/social",
    "/my/recent-videos",
    "/my/liked-videos", 
    "/my/saved-videos", 
    "/my/watch-later",
    "/news/top-100",
    "/news/performances",
    "/news/news",
    "/news/business",
    "/news/more-videos"
  ].includes(location.pathname);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col px-4 mx-auto">
        {shouldShowMainNav && <MainNavigation handleNavClick={handleNavClick} />}
      </div>

      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleNavClick={handleNavClick}
      />
    </nav>
  );
}
