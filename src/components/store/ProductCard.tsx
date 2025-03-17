
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  category?: string;
}

export const ProductCard = ({ name, price, description }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 mb-4 bg-muted rounded-md flex items-center justify-center">
          <span className="text-muted-foreground">상품 이미지</span>
        </div>
        <p className="mb-4 text-sm">{description}</p>
        <p className="text-lg font-semibold">₩{price.toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">장바구니 담기</Button>
      </CardFooter>
    </Card>
  );
};
