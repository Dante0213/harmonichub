
import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const accessorySchema = z.object({
  name: z.string().min(2, "악세서리명은 최소 2자 이상이어야 합니다."),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "유효한 가격을 입력해주세요.",
  }),
  description: z.string().min(10, "악세서리 설명은 최소 10자 이상이어야 합니다."),
  brand: z.string().min(1, "브랜드를 입력해주세요."),
  category: z.enum(["피아노", "기타", "바이올린", "드럼", "기타 악기", "공통"]),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "유효한 재고 수량을 입력해주세요.",
  }),
});

type AccessoryFormValues = z.infer<typeof accessorySchema>;

interface AccessoryRegistrationFormProps {
  onSubmit: (data: AccessoryFormValues) => void;
  isSubmitting: boolean;
}

export function AccessoryRegistrationForm({ onSubmit, isSubmitting }: AccessoryRegistrationFormProps) {
  const [images, setImages] = useState<FileList | null>(null);
  
  const form = useForm<AccessoryFormValues>({
    resolver: zodResolver(accessorySchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      category: "공통",
      stock: "1",
    },
  });

  const handleSubmit = (data: AccessoryFormValues) => {
    // 실제 구현에서는 여기에 이미지 업로드 로직이 추가될 수 있습니다
    if (images) {
      console.log("업로드할 이미지 개수:", images.length);
    }
    onSubmit(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>악세서리명</FormLabel>
              <FormControl>
                <Input placeholder="악세서리명을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>브랜드</FormLabel>
                <FormControl>
                  <Input placeholder="브랜드명을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>분류</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="분류 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="피아노">피아노</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                    <SelectItem value="바이올린">바이올린</SelectItem>
                    <SelectItem value="드럼">드럼</SelectItem>
                    <SelectItem value="기타 악기">기타 악기</SelectItem>
                    <SelectItem value="공통">공통</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격 (원)</FormLabel>
                <FormControl>
                  <Input placeholder="악세서리 가격을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>재고 수량</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품 설명</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="악세서리에 대한 상세 설명을 입력하세요" 
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Label htmlFor="images">상품 이미지 (최대 5장)</Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {images && (
            <div className="text-sm text-green-600">
              {images.length}장의 이미지가 선택되었습니다
            </div>
          )}
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "악세서리 등록하기"}
        </Button>
      </form>
    </Form>
  );
}
