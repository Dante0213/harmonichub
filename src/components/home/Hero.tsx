
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="py-20 text-center">
      <div className="container px-4 mx-auto">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
          나만의 음악 여정을 시작하세요
        </h1>
        <p className="mx-auto mb-10 text-xl text-muted-foreground md:w-3/4 lg:w-2/3">
          실시간 화상 레슨, 음악 관련 상품, 음악가 커뮤니티, 그리고 다양한 학습 자료를 통해
          여러분의 음악 실력을 향상시키세요.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link to="/signup">무료로 시작하기</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/lesson-room">레슨실 둘러보기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
