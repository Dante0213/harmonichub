
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface AdditionalInfoFormProps {
  form: UseFormReturn<any>;
}

export function AdditionalInfoForm({ form }: AdditionalInfoFormProps) {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-medium">추가 정보</h3>
      
      <FormField
        control={form.control}
        name="instrument"
        render={({ field }) => (
          <FormItem>
            <FormLabel>악기 종류</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="악기를 선택하세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="piano">피아노</SelectItem>
                <SelectItem value="guitar">기타</SelectItem>
                <SelectItem value="violin">바이올린</SelectItem>
                <SelectItem value="drums">드럼</SelectItem>
                <SelectItem value="vocal">보컬</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>레벨</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="레벨을 선택하세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="beginner">입문</SelectItem>
                <SelectItem value="intermediate">중급</SelectItem>
                <SelectItem value="advanced">고급</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>추가 요청사항</FormLabel>
            <FormControl>
              <Textarea
                placeholder="선생님에게 필요한 요청사항을 작성해주세요."
                className="resize-none h-20"
                {...field}
              />
            </FormControl>
            <FormDescription>
              특별히 배우고 싶은 내용이나 질문이 있다면 작성해주세요.
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
}
