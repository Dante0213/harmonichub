
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FileQuestion, Bell, Info } from "lucide-react";

export function SecondaryNavigation() {
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
        <Button variant="outline" size="sm" asChild>
          <Link to="/sign-in">로그인</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/sign-up">회원가입</Link>
        </Button>
      </div>
    </div>
  );
}
