
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocial } from "@/pages/Social";

interface FavoriteTeachersViewProps {
  onBack: () => void;
}

export const FavoriteTeachersView = ({ onBack }: FavoriteTeachersViewProps) => {
  const { favoriteTeachers, removeFavoriteTeacher } = useSocial();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <CardTitle>찜한 선생님</CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteTeachers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">찜한 선생님이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {favoriteTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-md">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {teacher.imageUrl ? (
                      <AvatarImage src={teacher.imageUrl} alt={teacher.user} />
                    ) : (
                      <AvatarFallback>{teacher.user[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{teacher.user}</p>
                    <p className="text-xs text-muted-foreground">@{teacher.userHandle}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeFavoriteTeacher(teacher.id)}
                  className="text-red-500"
                >
                  <Heart className="h-4 w-4 mr-2 fill-red-500" />
                  찜 취소
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
