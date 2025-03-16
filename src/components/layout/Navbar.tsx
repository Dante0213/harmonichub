
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Video, ShoppingBag, MessageCircle, BookOpen, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">음악 플랫폼</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/lesson-room">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Video className="w-4 h-4 mr-2" />
                    레슨실
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/store">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    스토어
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/social">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    SNS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/learning">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    학습실
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
          <Link 
            to="/lesson-room" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <Video className="w-5 h-5 mr-3" /> 레슨실
          </Link>
          <Link 
            to="/store" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingBag className="w-5 h-5 mr-3" /> 스토어
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
