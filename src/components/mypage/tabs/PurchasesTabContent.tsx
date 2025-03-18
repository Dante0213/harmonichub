
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function PurchasesTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>구매내역</CardTitle>
        <CardDescription>
          구매한 상품과 서비스를 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-center text-muted-foreground py-8">
          구매 내역이 없습니다.
        </p>
      </CardContent>
    </Card>
  );
}
