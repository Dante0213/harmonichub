
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Music, FileQuestion, Bell, Info, Menu, X, User, ShoppingBag, MessageCircle, BookOpen } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8">
            <Music className="w-6 h-6 mr-2 text-primary" />
            <span className="text-xl font-bold">Harmonic Hub</span>
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Link 
              to="/teachers" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/teachers') ? 'text-primary' : 'hover:text-primary'}`}
            >
              선생님
            </Link>
            <Link 
              to="/social" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/social') ? 'text-primary' : 'hover:text-primary'}`}
            >
              SNS
            </Link>
            <Link 
              to="/learning" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/learning') ? 'text-primary' : 'hover:text-primary'}`}
            >
              학습실
            </Link>
            <Link 
              to="/store" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/store') ? 'text-primary' : 'hover:text-primary'}`}
            >
              스토어
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Info className="w-4 h-4 mr-2" />
                    소개
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/notices">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Bell className="w-4 h-4 mr-2" />
                    공지사항
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/guide">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Info className="w-4 h-4 mr-2" />
                    이용안내
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <FileQuestion className="w-4 h-4 mr-2" />
                    문의
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-in">로그인</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/sign-up">회원가입</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col px-4 py-6 space-y-4 bg-background md:hidden top-16">
          {/* Main Navigation for Mobile */}
          <Link 
            to="/teachers" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="w-5 h-5 mr-3" /> 선생님
          </Link>
          <Link 
            to="/social" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageCircle className="w-5 h-5 mr-3" /> SNS
          </Link>
          <Link 
            to="/learning" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <BookOpen className="w-5 h-5 mr-3" /> 학습실
          </Link>
          <Link 
            to="/store" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingBag className="w-5 h-5 mr-3" /> 스토어
          </Link>
          
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
      )}
    </nav>
  );
}
