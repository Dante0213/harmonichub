
import { z } from "zod";

// 공통 폼 필드 타입
export interface BaseFormFieldProps {
  isSubmitting: boolean;
}

// 이미지 업로드 관련 타입
export interface FileUploadProps {
  id: string;
  label: string;
  multiple?: boolean;
  helpText?: string;
  value: File | FileList | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 기본 상품 스키마 필드
export const baseProductFields = {
  name: z.string().min(2, "상품명은 최소 2자 이상이어야 합니다."),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "유효한 가격을 입력해주세요.",
  }),
  description: z.string().min(10, "상품 설명은 최소 10자 이상이어야 합니다."),
};
