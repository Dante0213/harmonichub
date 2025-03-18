
import React from "react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { FileUploadProps } from "../types";

// 텍스트 입력 필드
export const TextField = ({ 
  form, 
  name, 
  label, 
  placeholder 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  placeholder: string;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// 숫자 입력 필드 (재고 등)
export const NumberField = ({ 
  form, 
  name, 
  label, 
  min = "0" 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  min?: string;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type="number" min={min} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// 셀렉트 필드
export const SelectField = ({ 
  form, 
  name, 
  label, 
  options 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  options: { value: string; label: string }[];
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={`${label} 선택`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// 텍스트 영역 필드
export const TextareaField = ({ 
  form, 
  name, 
  label, 
  placeholder 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  placeholder: string;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea 
            placeholder={placeholder} 
            className="min-h-[120px]"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// 파일 업로드 필드
export const FileUploadField = ({ 
  id, 
  label, 
  multiple = false, 
  helpText, 
  value, 
  onChange 
}: FileUploadProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type="file"
      accept="image/*"
      multiple={multiple}
      onChange={onChange}
    />
    {value && (
      <div className="text-sm text-green-600">
        {multiple && value instanceof FileList 
          ? `${value.length}장의 이미지가 선택되었습니다`
          : value instanceof File && `파일 선택됨: ${value.name}`
        }
      </div>
    )}
    {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
  </div>
);

// 제출 버튼
export const SubmitButton = ({ 
  isSubmitting, 
  text 
}: { 
  isSubmitting: boolean; 
  text: string;
}) => (
  <Button type="submit" className="w-full" disabled={isSubmitting}>
    {isSubmitting ? "등록 중..." : text}
  </Button>
);
