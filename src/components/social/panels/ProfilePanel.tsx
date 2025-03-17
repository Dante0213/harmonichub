
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export const ProfilePanel = () => {
  const currentUser = {
    name: "김음악",
    handle: "music_kim",
    instrument: "기타리스트",
    image: localStorage.getItem('userProfileImage') || ""
  };
  
  return (
    <Card className="mb-6 pastel-card">
      <CardContent className="pt-6">
        <Link to="/profile" className="flex items-center gap-3 hover:bg-pastel-purple/10 p-2 rounded-md transition-colors">
          <Avatar className="h-12 w-12 border-2 border-pastel-purple/30">
            {currentUser.image ? (
              <AvatarImage src={currentUser.image} alt={currentUser.name} />
            ) : (
              <AvatarFallback className="text-lg bg-pastel-purple/20">{currentUser.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium text-base">{currentUser.name}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
