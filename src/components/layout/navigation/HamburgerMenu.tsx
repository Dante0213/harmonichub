
import { LogOut, Settings, HelpCircle, Bell, FileText, UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface HamburgerMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HamburgerMenu({ open, onOpenChange }: HamburgerMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[260px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-2">
            <Link 
              to="/notices" 
              className="flex items-center p-2 rounded-md hover:bg-accent"
              onClick={() => onOpenChange(false)}
            >
              <Bell className="mr-2 h-4 w-4" />
              공지사항
            </Link>
            <Link 
              to="/faq" 
              className="flex items-center p-2 rounded-md hover:bg-accent"
              onClick={() => onOpenChange(false)}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              자주 묻는 질문
            </Link>
            <Link 
              to="/terms" 
              className="flex items-center p-2 rounded-md hover:bg-accent"
              onClick={() => onOpenChange(false)}
            >
              <FileText className="mr-2 h-4 w-4" />
              이용약관
            </Link>
            <Separator className="my-2" />
            <Link 
              to="/settings" 
              className="flex items-center p-2 rounded-md hover:bg-accent"
              onClick={() => onOpenChange(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              설정
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start pl-2 hover:bg-accent"
              onClick={() => {
                // 로그아웃 로직 추가
                onOpenChange(false);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
