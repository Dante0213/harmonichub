
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, Mail } from "lucide-react";

interface SettingsTabContentProps {
  userData: any;
  onPasswordChange: () => void;
  onBasicInfoChange: () => void;
}

export function SettingsTabContent({ 
  userData, 
  onPasswordChange, 
  onBasicInfoChange 
}: SettingsTabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>계정 설정</CardTitle>
        <CardDescription>
          계정 정보를 관리하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <p className="text-sm font-medium">기본 정보</p>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">이름: {userData?.name || '미설정'}</p>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">닉네임: {userData?.nickname || '미설정'}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">연락처: {userData?.phone || '미설정'}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">주소: {userData?.address || '미설정'}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBasicInfoChange}
            className="mt-2"
          >
            기본 정보 변경
          </Button>
        </div>
        
        <div className="grid gap-2">
          <p className="text-sm font-medium">이메일</p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{userData?.email || 'user@example.com'}</p>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-medium">비밀번호</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onPasswordChange}
          >
            비밀번호 변경
          </Button>
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-medium">알림 설정</p>
          <Button variant="outline" size="sm">알림 설정 관리</Button>
        </div>
      </CardContent>
    </Card>
  );
}
