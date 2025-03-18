
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Phone, MapPin, UserPlus } from "lucide-react";

interface UserInfoCardProps {
  userData: any;
  onUpgradeClick: () => void;
}

export function UserInfoCard({ userData, onUpgradeClick }: UserInfoCardProps) {
  const isProfessional = userData?.isProfessional || false;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/user-avatar.png" alt="사용자 프로필" />
            <AvatarFallback>{userData?.nickname?.charAt(0) || '사'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <CardTitle>{userData?.nickname || '사용자 이름'}</CardTitle>
              {isProfessional && (
                <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
              )}
            </div>
            <CardDescription>{userData?.email || 'user@example.com'}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">회원 유형</p>
            <p className="text-sm text-muted-foreground">
              {isProfessional ? "전문가 회원" : "일반 회원"}
            </p>
          </div>
          
          {userData?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{userData.phone}</p>
            </div>
          )}
          
          {userData?.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{userData.address}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium">가입일</p>
            <p className="text-sm text-muted-foreground">
              {userData?.joinDate || '2023년 1월 1일'}
            </p>
          </div>
          {!isProfessional && (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={onUpgradeClick}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              전문가로 전환하기
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
