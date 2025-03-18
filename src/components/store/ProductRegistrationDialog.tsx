
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { VodRegistrationForm } from "./VodRegistrationForm";
import { InstrumentRegistrationForm } from "./InstrumentRegistrationForm";
import { BookRegistrationForm } from "./BookRegistrationForm";
import { AccessoryRegistrationForm } from "./AccessoryRegistrationForm";

interface ProductRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductRegistrationDialog({ isOpen, onClose }: ProductRegistrationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<string>("vod");

  const handleFormSubmit = async (data: any, productType: string) => {
    setIsSubmitting(true);
    try {
      // 여기에 실제 API 호출 로직이 들어갈 수 있습니다.
      console.log(`${productType} 등록 데이터:`, data);
      
      // 성공 메시지를 표시합니다
      toast({
        title: `${productType} 등록 성공`,
        description: `${productType}가 성공적으로 등록되었습니다.`,
      });
      
      // 대화상자를 닫습니다
      onClose();
    } catch (error) {
      console.error(`${productType} 등록 실패:`, error);
      toast({
        title: `${productType} 등록 실패`,
        description: `${productType} 등록에 실패했습니다. 다시 시도해주세요.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVodSubmit = (data: any) => handleFormSubmit(data, "VOD 강의");
  const handleInstrumentSubmit = (data: any) => handleFormSubmit(data, "악기");
  const handleBookSubmit = (data: any) => handleFormSubmit(data, "교재");
  const handleAccessorySubmit = (data: any) => handleFormSubmit(data, "악세서리");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>상품 등록하기</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="vod" onValueChange={setCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="vod">VOD 강의</TabsTrigger>
            <TabsTrigger value="instruments">악기</TabsTrigger>
            <TabsTrigger value="books">교재</TabsTrigger>
            <TabsTrigger value="accessories">악세서리</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vod">
            <VodRegistrationForm 
              onSubmit={handleVodSubmit} 
              isSubmitting={isSubmitting} 
            />
          </TabsContent>
          
          <TabsContent value="instruments">
            <InstrumentRegistrationForm 
              onSubmit={handleInstrumentSubmit} 
              isSubmitting={isSubmitting} 
            />
          </TabsContent>
          
          <TabsContent value="books">
            <BookRegistrationForm 
              onSubmit={handleBookSubmit} 
              isSubmitting={isSubmitting} 
            />
          </TabsContent>
          
          <TabsContent value="accessories">
            <AccessoryRegistrationForm 
              onSubmit={handleAccessorySubmit} 
              isSubmitting={isSubmitting} 
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
