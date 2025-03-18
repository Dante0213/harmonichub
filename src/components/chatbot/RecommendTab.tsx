
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";

type RecommendationItem = {
  title: string;
  items: string[];
};

interface RecommendTabProps {
  recommendationItems: RecommendationItem[];
  setActiveTab: (tab: string) => void;
  setMessage: (message: string) => void;
}

export function RecommendTab({ recommendationItems, setActiveTab, setMessage }: RecommendTabProps) {
  return (
    <ScrollArea className="h-[320px]">
      <div className="p-4 space-y-4">
        {recommendationItems.map((category, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-medium mb-2">{category.title}</h3>
            <div className="space-y-1">
              {category.items.map((item, itemIdx) => (
                <Button 
                  key={itemIdx} 
                  variant="ghost" 
                  className="w-full justify-start text-left h-auto py-1.5 px-2 text-sm"
                  onClick={() => {
                    setActiveTab("chat");
                    setMessage(`${category.title}: ${item}`);
                  }}
                >
                  <PlusCircle className="h-3.5 w-3.5 mr-2 opacity-70" />
                  {item}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
