
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface VodCardProps {
  name: string;
  price: number;
  description: string;
  instructor: string;
  level: string;
  duration: string;
}

export const VodCard = ({ name, price, description, instructor, level, duration }: VodCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
          <span className="text-muted-foreground">강의 썸네일</span>
        </div>
        <p className="mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
            {level}
          </div>
          <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
            {duration}
          </div>
          <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
            강사: {instructor}
          </div>
        </div>
        <p className="text-lg font-semibold">₩{price.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">구매하기</Button>
        <Link to="/learning" className="flex-1">
          <Button className="w-full" variant="outline">미리보기</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
