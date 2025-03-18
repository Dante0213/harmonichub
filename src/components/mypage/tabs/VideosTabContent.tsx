
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function VideosTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>나의 영상</CardTitle>
        <CardDescription>
          업로드한 영상과 좋아요한 영상을 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-center text-muted-foreground py-8">
          업로드한 영상이 없습니다.
        </p>
      </CardContent>
    </Card>
  );
}
