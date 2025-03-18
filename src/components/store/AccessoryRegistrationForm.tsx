
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { baseProductFields } from "./types";
import { 
  TextField, 
  SelectField, 
  NumberField, 
  TextareaField, 
  FileUploadField,
  SubmitButton
} from "./common/FormFields";

const accessorySchema = z.object({
  ...baseProductFields,
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

  const categoryOptions = [
    { value: "피아노", label: "피아노" },
    { value: "기타", label: "기타" },
    { value: "바이올린", label: "바이올린" },
    { value: "드럼", label: "드럼" },
    { value: "기타 악기", label: "기타 악기" },
    { value: "공통", label: "공통" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField 
          form={form} 
          name="name" 
          label="악세서리명" 
          placeholder="악세서리명을 입력하세요" 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <TextField 
            form={form} 
            name="brand" 
            label="브랜드" 
            placeholder="브랜드명을 입력하세요" 
          />
          
          <SelectField 
            form={form} 
            name="category" 
            label="분류" 
            options={categoryOptions} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <TextField 
            form={form} 
            name="price" 
            label="가격 (원)" 
            placeholder="악세서리 가격을 입력하세요" 
          />
          
          <NumberField 
            form={form} 
            name="stock" 
            label="재고 수량" 
          />
        </div>
        
        <TextareaField 
          form={form} 
          name="description" 
          label="상품 설명" 
          placeholder="악세서리에 대한 상세 설명을 입력하세요" 
        />
        
        <FileUploadField 
          id="images" 
          label="상품 이미지 (최대 5장)" 
          multiple={true}
          value={images} 
          onChange={handleFileChange} 
        />
        
        <SubmitButton isSubmitting={isSubmitting} text="악세서리 등록하기" />
      </form>
    </Form>
  );
}
