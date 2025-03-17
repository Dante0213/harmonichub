
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AdBanner = () => {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader>
        <h3 className="text-lg font-semibold">광고</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-[16/9] bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
          <p className="text-lg font-medium text-center p-6">
            여기에 광고 배너가 표시됩니다
          </p>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-2">
            음악 레슨과 악기를 찾고 계신가요?
          </p>
          <Button size="sm" className="w-full">자세히 보기</Button>
        </div>
      </CardContent>
    </Card>
  );
};
