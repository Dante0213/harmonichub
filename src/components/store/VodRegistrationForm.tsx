
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { baseProductFields } from "./types";
import { 
  TextField, 
  SelectField, 
  TextareaField, 
  FileUploadField,
  SubmitButton
} from "./common/FormFields";

const vodSchema = z.object({
  ...baseProductFields,
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

  const levelOptions = [
    { value: "초급", label: "초급" },
    { value: "중급", label: "중급" },
    { value: "고급", label: "고급" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField 
          form={form} 
          name="name" 
          label="VOD 강의명" 
          placeholder="강의명을 입력하세요" 
        />
        
        <TextField 
          form={form} 
          name="instructor" 
          label="강사명" 
          placeholder="강사 이름을 입력하세요" 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <SelectField 
            form={form} 
            name="level" 
            label="난이도" 
            options={levelOptions} 
          />
          
          <TextField 
            form={form} 
            name="duration" 
            label="강의 기간" 
            placeholder="예: 4주, 8주" 
          />
        </div>
        
        <TextField 
          form={form} 
          name="price" 
          label="가격 (원)" 
          placeholder="강의 가격을 입력하세요" 
        />
        
        <TextareaField 
          form={form} 
          name="description" 
          label="강의 설명" 
          placeholder="강의에 대한 상세 설명을 입력하세요" 
        />
        
        <FileUploadField 
          id="thumbnail" 
          label="강의 썸네일" 
          value={thumbnail} 
          onChange={handleFileChange} 
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            강의 샘플 영상
          </label>
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
        
        <SubmitButton isSubmitting={isSubmitting} text="VOD 강의 등록하기" />
      </form>
    </Form>
  );
}
