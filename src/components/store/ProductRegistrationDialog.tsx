
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

interface ProductRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductRegistrationDialog({ isOpen, onClose }: ProductRegistrationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<string>("vod");

  const handleVodSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 여기에 실제 VOD 등록 API 호출 로직이 들어갈 수 있습니다.
      console.log("VOD 등록 데이터:", data);
      
      // 성공 메시지를 표시합니다
      toast({
        title: "VOD 강의 등록 성공",
        description: "VOD 강의가 성공적으로 등록되었습니다.",
      });
      
      // 대화상자를 닫습니다
      onClose();
    } catch (error) {
      console.error("VOD 등록 실패:", error);
      toast({
        title: "VOD 등록 실패",
        description: "VOD 등록에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstrumentSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 여기에 실제 악기 등록 API 호출 로직이 들어갈 수 있습니다.
      console.log("악기 등록 데이터:", data);
      
      // 성공 메시지를 표시합니다
      toast({
        title: "악기 등록 성공",
        description: "악기가 성공적으로 등록되었습니다.",
      });
      
      // 대화상자를 닫습니다
      onClose();
    } catch (error) {
      console.error("악기 등록 실패:", error);
      toast({
        title: "악기 등록 실패",
        description: "악기 등록에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenericSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 여기에 실제 상품 등록 API 호출 로직이 들어갈 수 있습니다.
      console.log(`${category} 등록 데이터:`, data);
      
      // 성공 메시지를 표시합니다
      toast({
        title: "상품 등록 성공",
        description: "상품이 성공적으로 등록되었습니다.",
      });
      
      // 대화상자를 닫습니다
      onClose();
    } catch (error) {
      console.error("상품 등록 실패:", error);
      toast({
        title: "상품 등록 실패",
        description: "상품 등록에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-4">교재 등록</h3>
              <p className="text-muted-foreground">
                교재 등록 양식은 개발 중입니다. 
                지금은 기본 상품으로 등록하고, 나중에 세부 정보를 업데이트하세요.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => handleGenericSubmit({category: "books"})}
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "교재 등록하기"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="accessories">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-4">악세서리 등록</h3>
              <p className="text-muted-foreground">
                악세서리 등록 양식은 개발 중입니다.
                지금은 기본 상품으로 등록하고, 나중에 세부 정보를 업데이트하세요.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => handleGenericSubmit({category: "accessories"})}
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "악세서리 등록하기"}
              </Button>
            </div>
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
