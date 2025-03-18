
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dog, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <CardHeader className="p-3 flex flex-row items-center justify-between">
      <CardTitle className="text-sm flex items-center">
        <Dog className="w-4 h-4 mr-2" />
        하모닉 허브 어시스턴트
      </CardTitle>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
        <X className="h-4 w-4" />
      </Button>
    </CardHeader>
  );
}
