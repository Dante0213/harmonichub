
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function LessonsTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>나의 레슨</CardTitle>
        <CardDescription>
          예약된 레슨과 완료된 레슨을 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-center text-muted-foreground py-8">
          예약된 레슨이 없습니다.
        </p>
      </CardContent>
    </Card>
  );
}
