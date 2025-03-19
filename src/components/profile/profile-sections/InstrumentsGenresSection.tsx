
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Minus } from "lucide-react";

interface InstrumentsGenresSectionProps {
  instruments: string[] | undefined;
  genres: string[] | undefined;
}

export const InstrumentsGenresSection = ({ 
  instruments, 
  genres 
}: InstrumentsGenresSectionProps) => {
  // 데이터 확인 함수
  const isEmpty = (data: any[] | undefined | null) => !data || data.length === 0;
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <h3 className="font-semibold">악기 & 장르</h3>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">악기</h4>
          {isEmpty(instruments) ? (
            <div className="flex items-center text-sm text-muted-foreground">
              <Minus className="h-4 w-4 mr-1" />
              <span>등록된 악기 정보가 없습니다</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {instruments?.map((instrument, index) => (
                <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {instrument}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">장르</h4>
          {isEmpty(genres) ? (
            <div className="flex items-center text-sm text-muted-foreground">
              <Minus className="h-4 w-4 mr-1" />
              <span>등록된 장르 정보가 없습니다</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {genres?.map((genre, index) => (
                <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {genre}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
