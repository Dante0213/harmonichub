
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="space-y-8 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="hero-title">Harmonic</span> Hub
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              음악을 배우고, 연결하고, 함께 성장하는 공간.<br />
              당신의 음악 여정을 시작하세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-luniverse-purple hover:bg-luniverse-purple/90">
                <Link to="/teachers">선생님 찾기</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-luniverse-lightpurple">
                <Link to="/store">스토어 둘러보기</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-16 w-full max-w-5xl h-[300px] md:h-[400px] bg-gradient-to-r from-luniverse-softpurple to-luniverse-skyblue/50 rounded-3xl shadow-xl p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-luniverse-pastelpink rounded-full opacity-30"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-luniverse-pastelblue rounded-full opacity-30"></div>
            
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">음악 커뮤니티에 오신 것을 환영합니다</h2>
              <p className="text-lg max-w-xl mx-auto">
                음악을 통해 사람들과 연결하고, 전문가로부터 배우고, 음악 여정을 함께 나눠보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
