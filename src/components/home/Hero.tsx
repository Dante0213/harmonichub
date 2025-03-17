
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center w-full">
          <div 
            className={cn(
              "w-full max-w-[1080px] h-[130px] bg-gradient-to-r from-primary/80 to-primary/40",
              "flex items-center justify-center rounded-lg shadow-md"
            )}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Harmonic Hub
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
