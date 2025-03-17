
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProfessionalFormValues } from "./ProfessionalSignUpForm";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileIcon, Upload, X } from "lucide-react";
import { isValidFileType, isValidFileSize } from "@/lib/file-utils";

interface ProfessionalInfoFormProps {
  form: UseFormReturn<ProfessionalFormValues>;
  fileList: File[];
  setFileList: (files: File[]) => void;
  fileError: string | null;
  setFileError: (error: string | null) => void;
}

export default function ProfessionalInfoForm({ 
  form, 
  fileList, 
  setFileList, 
  fileError, 
  setFileError 
}: ProfessionalInfoFormProps) {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: File[] = Array.from(e.target.files);
      
      // 파일 유효성 검사
      for (const file of newFiles) {
        if (!isValidFileType(file)) {
          setFileError("지원되지 않는 파일 형식입니다. PDF 또는 PPT 파일만 업로드 가능합니다.");
          return;
        }
        
        if (!isValidFileSize(file)) {
          setFileError("파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.");
          return;
        }
      }
      
      setFileList([...fileList, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFileList(fileList.filter((_, i) => i !== index));
  };

  // 파일 아이콘 결정 함수
  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FileIcon className="w-4 h-4 text-red-500" />;
    } else {
      return <FileIcon className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">전문가 자격 정보</h3>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>전문 분야</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="piano" />
                    </FormControl>
                    <FormLabel className="font-normal">피아노</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="guitar" />
                    </FormControl>
                    <FormLabel className="font-normal">기타</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="violin" />
                    </FormControl>
                    <FormLabel className="font-normal">바이올린</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="vocal" />
                    </FormControl>
                    <FormLabel className="font-normal">보컬</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="composition" />
                    </FormControl>
                    <FormLabel className="font-normal">작곡</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">기타</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>학력</FormLabel>
              <FormControl>
                <Input placeholder="예: 서울대학교 음악대학 피아노과 학사" {...field} />
              </FormControl>
              <FormDescription>
                최종 학력 및 전공을 입력해주세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>경력</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="예: 2015-2020 세종문화회관 오케스트라 연주자, 2020-현재 음악학원 강사"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                관련 경력을 최대한 자세히 기재해주세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="certification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>자격증/수상 경력</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="예: 2018 국제 피아노 콩쿠르 입상, 음악교육지도사 자격증"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                보유한 자격증이나 수상 경력을 입력해주세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-3">
          <Label htmlFor="file-upload">증빙 자료 업로드</Label>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="file-upload" className="flex items-center gap-2 p-8 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-muted-foreground">학위증, 자격증, 경력 증명서, PPT, PDF 등을 업로드하세요</span>
              <Input 
                id="file-upload" 
                type="file" 
                multiple 
                className="hidden"
                accept=".pdf,.ppt,.pptx" 
                onChange={handleFileChange}
              />
            </Label>
          </div>
          
          {fileError && (
            <p className="text-sm text-destructive">{fileError}</p>
          )}
          
          {fileList.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">업로드된 파일 ({fileList.length})</p>
              <div className="border rounded-md divide-y">
                {fileList.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 text-sm">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file)}
                      <span className="font-medium truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            PDF, PPT, PPTX 파일 (최대 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
