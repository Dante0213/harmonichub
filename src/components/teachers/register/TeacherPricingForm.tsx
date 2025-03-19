
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TeacherPricingFormProps {
  lessonCount: number;
  setLessonCount: (value: number) => void;
  lessonPrice: number;
  setLessonPrice: (value: number) => void;
  onePointPrice: number;
  setOnePointPrice: (value: number) => void;
  onePointDuration: number;
  setOnePointDuration: (value: number) => void;
}

export function TeacherPricingForm({
  lessonCount,
  setLessonCount,
  lessonPrice,
  setLessonPrice,
  onePointPrice,
  setOnePointPrice,
  onePointDuration,
  setOnePointDuration
}: TeacherPricingFormProps) {
  return (
    <div className="space-y-4">
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">레슨 가격 정보</h3>
        <p className="text-sm text-muted-foreground mb-4">
          제공하실 레슨 패키지의 가격 정보를 설정해주세요.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="lessonCount">레슨 횟수</FormLabel>
            <Select 
              value={lessonCount.toString()} 
              onValueChange={(value) => setLessonCount(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="레슨 횟수 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1회</SelectItem>
                <SelectItem value="4">4회</SelectItem>
                <SelectItem value="8">8회</SelectItem>
                <SelectItem value="12">12회</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <FormLabel htmlFor="lessonPrice">레슨 총 가격 (원)</FormLabel>
            <Input
              id="lessonPrice"
              type="number"
              min="0"
              step="10000"
              value={lessonPrice}
              onChange={(e) => setLessonPrice(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
      
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">원포인트 레슨</h3>
        <p className="text-sm text-muted-foreground mb-4">
          짧은 시간 동안 특정 부분을 집중적으로 가르치는 원포인트 레슨 정보를 설정해주세요.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="onePointDuration">레슨 시간 (분)</FormLabel>
            <Select 
              value={onePointDuration.toString()} 
              onValueChange={(value) => setOnePointDuration(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="레슨 시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5분</SelectItem>
                <SelectItem value="10">10분</SelectItem>
                <SelectItem value="15">15분</SelectItem>
                <SelectItem value="20">20분</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <FormLabel htmlFor="onePointPrice">레슨 가격 (원)</FormLabel>
            <Input
              id="onePointPrice"
              type="number"
              min="0"
              step="5000"
              value={onePointPrice}
              onChange={(e) => setOnePointPrice(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
