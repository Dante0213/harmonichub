
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

const instrumentSchema = z.object({
  ...baseProductFields,
  brand: z.string().min(1, "브랜드를 입력해주세요."),
  condition: z.enum(["새 제품", "중고 - 상태 좋음", "중고 - 상태 보통", "중고 - 수리 필요"]),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "유효한 재고 수량을 입력해주세요.",
  }),
});

type InstrumentFormValues = z.infer<typeof instrumentSchema>;

interface InstrumentRegistrationFormProps {
  onSubmit: (data: InstrumentFormValues) => void;
  isSubmitting: boolean;
}

export function InstrumentRegistrationForm({ onSubmit, isSubmitting }: InstrumentRegistrationFormProps) {
  const [images, setImages] = useState<FileList | null>(null);
  
  const form = useForm<InstrumentFormValues>({
    resolver: zodResolver(instrumentSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      condition: "새 제품",
      stock: "1",
    },
  });

  const handleSubmit = (data: InstrumentFormValues) => {
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

  const conditionOptions = [
    { value: "새 제품", label: "새 제품" },
    { value: "중고 - 상태 좋음", label: "중고 - 상태 좋음" },
    { value: "중고 - 상태 보통", label: "중고 - 상태 보통" },
    { value: "중고 - 수리 필요", label: "중고 - 수리 필요" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField 
          form={form} 
          name="name" 
          label="악기명" 
          placeholder="악기명을 입력하세요" 
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
            name="condition" 
            label="상품 상태" 
            options={conditionOptions} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <TextField 
            form={form} 
            name="price" 
            label="가격 (원)" 
            placeholder="상품 가격을 입력하세요" 
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
          placeholder="악기에 대한 상세 설명을 입력하세요" 
        />
        
        <FileUploadField 
          id="images" 
          label="상품 이미지 (최대 5장)" 
          multiple={true}
          value={images} 
          onChange={handleFileChange} 
        />
        
        <SubmitButton isSubmitting={isSubmitting} text="악기 등록하기" />
      </form>
    </Form>
  );
}
