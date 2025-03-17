
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { Reel } from "./ReelsData";

interface ReelUserInfoProps {
  reel: Reel;
}

export const ReelUserInfo = ({ reel }: ReelUserInfoProps) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <Avatar>
        <AvatarFallback>{reel.avatar}</AvatarFallback>
      </Avatar>
      <div className="text-white">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{reel.userHandle}</p>
          {reel.isTeacher && (
            <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
          )}
        </div>
      </div>
      <Button size="sm" variant="secondary" className="ml-auto">팔로우</Button>
    </div>
  );
};
