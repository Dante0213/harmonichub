
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

const vodSchema = z.object({
  name: z.string().min(2, "VOD 강의명은 최소 2자 이상이어야 합니다."),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "유효한 가격을 입력해주세요.",
  }),
  description: z.string().min(10, "강의 설명은 최소 10자 이상이어야 합니다."),
  instructor: z.string().min(2, "강사명은 최소 2자 이상이어야 합니다."),
  level: z.enum(["초급", "중급", "고급"]),
  duration: z.string().min(1, "강의 기간을 입력해주세요."),
  imageUrl: z.string().optional(),
});

type VodFormValues = z.infer<typeof vodSchema>;

interface VodRegistrationFormProps {
  onSubmit: (data: VodFormValues) => void;
  isSubmitting: boolean;
}

export function VodRegistrationForm({ onSubmit, isSubmitting }: VodRegistrationFormProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  
  const form = useForm<VodFormValues>({
    resolver: zodResolver(vodSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      instructor: "",
      level: "초급",
      duration: "",
      imageUrl: "",
    },
  });

  const handleSubmit = (data: VodFormValues) => {
    // 실제 구현에서는 여기에 thumbnail 업로드 로직이 추가될 수 있습니다
    if (thumbnail) {
      console.log("업로드할 썸네일:", thumbnail);
    }
    onSubmit(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
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
              <FormLabel>VOD 강의명</FormLabel>
              <FormControl>
                <Input placeholder="강의명을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instructor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>강사명</FormLabel>
              <FormControl>
                <Input placeholder="강사 이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>난이도</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="난이도 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>강의 기간</FormLabel>
                <FormControl>
                  <Input placeholder="예: 4주, 8주" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>가격 (원)</FormLabel>
              <FormControl>
                <Input placeholder="강의 가격을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>강의 설명</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="강의에 대한 상세 설명을 입력하세요" 
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Label htmlFor="thumbnail">강의 썸네일</Label>
          <div className="flex items-center gap-4">
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1"
            />
            {thumbnail && (
              <div className="text-sm text-green-600">
                파일 선택됨: {thumbnail.name}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>강의 샘플 영상</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              강의 샘플 영상을 드래그하거나 업로드하세요
            </p>
            <p className="mt-1 text-xs text-gray-400">
              영상 파일은 30MB 이하의 MP4 파일만 가능합니다
            </p>
            <Button type="button" variant="outline" size="sm" className="mt-4">
              파일 선택
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "VOD 강의 등록하기"}
        </Button>
      </form>
    </Form>
  );
}
