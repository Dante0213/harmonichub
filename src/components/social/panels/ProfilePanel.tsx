
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export const ProfilePanel = () => {
  const currentUser = {
    name: "김음악",
    handle: "music_kim",
    instrument: "기타리스트"
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Link to="/profile" className="flex items-center gap-3 hover:bg-muted p-2 rounded-md transition-colors">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg">{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-base">{currentUser.name}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
