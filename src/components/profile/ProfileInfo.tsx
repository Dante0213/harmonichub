
import { Card, CardContent } from "@/components/ui/card";
import { Reel } from "@/components/social/reels/ReelsData";
import { Music } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileInfoProps {
  userData: Reel;
}

export const ProfileInfo = ({ userData }: ProfileInfoProps) => {
  const { instruments = [], genres = [] } = userData;
  
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        {/* 전공 정보 */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">전공</h3>
          <p className="text-sm">{userData.specialization || "등록된 전공 정보가 없습니다"}</p>
        </div>
        
        <Separator className="my-4" />
        
        {/* 악기 & 장르 정보 */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">악기 & 장르</h3>
          {instruments.length === 0 && genres.length === 0 ? (
            <p className="text-sm text-muted-foreground">등록된 악기 및 장르 정보가 없습니다</p>
          ) : (
            <div className="space-y-3">
              {instruments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">악기</h4>
                  <div className="flex flex-wrap gap-1">
                    {instruments.map((instrument, index) => (
                      <div 
                        key={index} 
                        className="bg-secondary/50 px-2 py-1 rounded-full text-xs flex items-center"
                      >
                        <Music className="h-3 w-3 mr-1 text-purple-500" />
                        {instrument}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {genres.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">장르</h4>
                  <div className="flex flex-wrap gap-1">
                    {genres.map((genre, index) => (
                      <div 
                        key={index} 
                        className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                      >
                        {genre}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 전문가 여부에 따른 뱃지 표시 */}
        {userData.isProfessional && (
          <div className="flex items-center gap-2 mt-4 p-2 bg-purple-50 dark:bg-purple-950/20 rounded-md">
            <Music className="h-4 w-4 text-purple-500" fill="currentColor" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              전문 음악가
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
