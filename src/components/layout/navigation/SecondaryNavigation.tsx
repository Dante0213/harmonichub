
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FileQuestion, Bell, Info, Menu, User } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { UserProfileDropdown } from "../profile/UserProfileDropdown";
import { useState } from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import { Button } from "@/components/ui/button";

export function SecondaryNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 여기에 로그인 상태를 확인하는 로직을 추가할 수 있습니다.
  const isLoggedIn = false; // 예시: 실제로는 인증 상태에 따라 변경

  return (
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
        <ThemeToggle />
        {isLoggedIn && (
          <>
            <Link to="/mypage" className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent">
              <User className="w-5 h-5" />
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(true)}
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </>
        )}
        <UserProfileDropdown />
      </div>
      
      <HamburgerMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </div>
  );
}
