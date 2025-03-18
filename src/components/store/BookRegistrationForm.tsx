
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

const bookSchema = z.object({
  ...baseProductFields,
  author: z.string().min(1, "저자를 입력해주세요."),
  publisher: z.string().min(1, "출판사를 입력해주세요."),
  level: z.enum(["입문", "초급", "중급", "고급", "전문가"]),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "유효한 재고 수량을 입력해주세요.",
  }),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookRegistrationFormProps {
  onSubmit: (data: BookFormValues) => void;
  isSubmitting: boolean;
}

export function BookRegistrationForm({ onSubmit, isSubmitting }: BookRegistrationFormProps) {
  const [images, setImages] = useState<FileList | null>(null);
  
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      author: "",
      publisher: "",
      level: "초급",
      stock: "1",
    },
  });

  const handleSubmit = (data: BookFormValues) => {
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

  const levelOptions = [
    { value: "입문", label: "입문" },
    { value: "초급", label: "초급" },
    { value: "중급", label: "중급" },
    { value: "고급", label: "고급" },
    { value: "전문가", label: "전문가" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TextField 
          form={form} 
          name="name" 
          label="교재명" 
          placeholder="교재명을 입력하세요" 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <TextField 
            form={form} 
            name="author" 
            label="저자" 
            placeholder="저자명을 입력하세요" 
          />
          
          <TextField 
            form={form} 
            name="publisher" 
            label="출판사" 
            placeholder="출판사명을 입력하세요" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <SelectField 
            form={form} 
            name="level" 
            label="난이도" 
            options={levelOptions} 
          />
          
          <NumberField 
            form={form} 
            name="stock" 
            label="재고 수량" 
          />
        </div>
        
        <TextField 
          form={form} 
          name="price" 
          label="가격 (원)" 
          placeholder="교재 가격을 입력하세요" 
        />
        
        <TextareaField 
          form={form} 
          name="description" 
          label="상품 설명" 
          placeholder="교재에 대한 상세 설명을 입력하세요" 
        />
        
        <FileUploadField 
          id="images" 
          label="상품 이미지 (최대 5장)" 
          multiple={true}
          value={images} 
          onChange={handleFileChange} 
        />
        
        <SubmitButton isSubmitting={isSubmitting} text="교재 등록하기" />
      </form>
    </Form>
  );
}
