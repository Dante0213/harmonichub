
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function TeacherFeatured() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock data for top teachers
  const topTeachers = [
    { id: 1, name: "김선생", image: "/placeholder.svg" },
    { id: 2, name: "이선생", image: "/placeholder.svg" },
    { id: 3, name: "박선생", image: "/placeholder.svg" },
  ];
  
  // Mock data for ads
  const advertisements = [
    { id: 1, title: "광고 1", image: "/placeholder.svg" },
    { id: 2, title: "광고 2", image: "/placeholder.svg" },
    { id: 3, title: "광고 3", image: "/placeholder.svg" },
  ];

  // Auto-slide for ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [advertisements.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Top Teachers Card */}
      <Card className="w-full h-[373px] overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">이번달 최고 인기 강사 Top3</h2>
          <div className="space-y-4">
            {topTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center gap-4">
                <Avatar className="w-16 h-16 rounded-md border">
                  <AvatarImage src={teacher.image} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{teacher.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Advertisement Carousel */}
      <Card className="w-full h-[373px] overflow-hidden">
        <CardContent className="p-0 h-full">
          <Carousel className="w-full h-full" setApi={() => {}}>
            <CarouselContent className="h-full">
              {advertisements.map((ad) => (
                <CarouselItem key={ad.id} className="h-full">
                  <div className="flex items-center justify-center h-full p-2">
                    <img 
                      src={ad.image} 
                      alt={ad.title}
                      className="max-w-full max-h-full object-contain rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
