
import { Button } from "@/components/ui/button";

export const SocialFollowingView = () => {
  return (
    <div className="text-center py-10">
      <h3 className="text-xl font-semibold mb-2">아직 팔로우하는 사용자가 없습니다</h3>
      <p className="text-muted-foreground mb-4">다른 사용자를 팔로우하여 그들의 게시물을 확인하세요</p>
      <Button>추천 사용자 보기</Button>
    </div>
  );
};
