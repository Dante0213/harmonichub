
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

// Mock data for ads
const advertisements = [
  { id: 1, title: "광고 1", image: "/placeholder.svg" },
  { id: 2, title: "광고 2", image: "/placeholder.svg" },
  { id: 3, title: "광고 3", image: "/placeholder.svg" },
];

export function AdvertisementCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide for ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}
