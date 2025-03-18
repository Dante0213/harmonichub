
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dog } from "lucide-react";

interface ChatButtonProps {
  unreadCount: number;
  badgeEnabled: boolean;
  onClick: () => void;
}

export function ChatButton({ unreadCount, badgeEnabled, onClick }: ChatButtonProps) {
  return (
    <Button 
      size="icon" 
      className="h-12 w-12 rounded-full shadow-lg relative" 
      onClick={onClick}
    >
      <Dog className="h-6 w-6" />
      {unreadCount > 0 && badgeEnabled && (
        <Badge 
          variant="success" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
        >
          {unreadCount}
        </Badge>
      )}
    </Button>
  );
}
