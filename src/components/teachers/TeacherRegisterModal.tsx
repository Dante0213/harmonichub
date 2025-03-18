
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function TeacherRegisterModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [certificates, setCertificates] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [image, setImage] = useState("/placeholder.svg");
  const [musicTypes, setMusicTypes] = useState<string[]>([]);
  
  // 일정 관리를 위한 상태 추가
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [newTime, setNewTime] = useState("09:00");

  const handleMusicTypeChange = (value: string) => {
    if (musicTypes.includes(value)) {
      setMusicTypes(musicTypes.filter((type) => type !== value));
    } else {
      setMusicTypes([...musicTypes, value]);
    }
  };

  // 시간 추가 핸들러
  const handleAddTime = () => {
    if (!availableTimes.includes(newTime)) {
      setAvailableTimes([...availableTimes, newTime]);
    }
  };

  // 시간 제거 핸들러
  const handleRemoveTime = (time: string) => {
    setAvailableTimes(availableTimes.filter(t => t !== time));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 선생님 정보와 함께 일정 정보도 저장
    const teacherData = {
      name,
      specialty,
      education,
      experience,
      certificates,
      introduction,
      image,
      musicTypes,
      schedule: {
        date: selectedDate,
        availableTimes
      }
    };
    
    console.log(teacherData);
    
    // 로컬 스토리지에 선생님 정보 저장 (임시 구현)
    const existingTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');
    localStorage.setItem('teachers', JSON.stringify([...existingTeachers, teacherData]));
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>선생님 등록하기</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4 my-4">
            <Avatar className="w-[75px] h-[75px]">
              <AvatarImage src={image} alt="Profile" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="name">이름</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="이름을 입력하세요"
                required
              />
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">음악 장르</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="classic" 
                  checked={musicTypes.includes("클래식")}
                  onCheckedChange={() => handleMusicTypeChange("클래식")}
                />
                <label
                  htmlFor="classic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  클래식
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="popular" 
                  checked={musicTypes.includes("실용음악")}
                  onCheckedChange={() => handleMusicTypeChange("실용음악")}
                />
                <label
                  htmlFor="popular"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  실용음악
                </label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="specialty">전공</Label>
              <Select 
                onValueChange={(value) => setSpecialty(value)}
                value={specialty}
              >
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="전공을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="피아노">피아노</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                  <SelectItem value="바이올린">바이올린</SelectItem>
                  <SelectItem value="드럼">드럼</SelectItem>
                  <SelectItem value="보컬">보컬</SelectItem>
                  <SelectItem value="작곡">작곡</SelectItem>
                  <SelectItem value="베이스">베이스</SelectItem>
                  <SelectItem value="퍼커션">퍼커션</SelectItem>
                  <SelectItem value="화성학 이론">화성학 이론</SelectItem>
                  <SelectItem value="전자음악">전자음악</SelectItem>
                  <SelectItem value="비올라">비올라</SelectItem>
                  <SelectItem value="첼로">첼로</SelectItem>
                  <SelectItem value="콘트라베이스">콘트라베이스</SelectItem>
                  <SelectItem value="트럼펫">트럼펫</SelectItem>
                  <SelectItem value="트럼본">트럼본</SelectItem>
                  <SelectItem value="호른">호른</SelectItem>
                  <SelectItem value="튜바">튜바</SelectItem>
                  <SelectItem value="클라리넷">클라리넷</SelectItem>
                  <SelectItem value="오보에">오보에</SelectItem>
                  <SelectItem value="플룻">플룻</SelectItem>
                  <SelectItem value="바순">바순</SelectItem>
                  <SelectItem value="월드뮤직">월드뮤직</SelectItem>
                  <SelectItem value="음향">음향</SelectItem>
                  <SelectItem value="뮤직비즈니스">뮤직비즈니스</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="education">학력</Label>
              <Input 
                id="education" 
                value={education} 
                onChange={(e) => setEducation(e.target.value)} 
                placeholder="학력을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="experience">경력</Label>
              <Input 
                id="experience" 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
                placeholder="경력을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="certificates">자격증</Label>
              <Input 
                id="certificates" 
                value={certificates} 
                onChange={(e) => setCertificates(e.target.value)} 
                placeholder="자격증을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="introduction">소개글</Label>
              <Textarea 
                id="introduction" 
                value={introduction} 
                onChange={(e) => setIntroduction(e.target.value)} 
                placeholder="소개글을 입력하세요"
                rows={4}
              />
            </div>
          </div>
          
          {/* 레슨 일정 관리 섹션 */}
          <div className="space-y-4 border rounded-md p-4">
            <h3 className="text-lg font-medium">레슨 가능 일정</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 날짜 선택 */}
              <div>
                <Label className="mb-2 block">날짜 선택</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일") : <span>날짜 선택</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* 시간 추가 */}
              <div>
                <Label className="mb-2 block">레슨 가능 시간</Label>
                <div className="flex gap-2">
                  <Select value={newTime} onValueChange={setNewTime}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="시간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const hour = i + 9;
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddTime}>추가</Button>
                </div>
              </div>
            </div>
            
            {/* 추가된 시간 표시 */}
            <div className="mt-4">
              <Label className="mb-2 block">추가된 레슨 가능 시간</Label>
              <div className="flex flex-wrap gap-2">
                {availableTimes.length > 0 ? (
                  availableTimes.map((time, index) => (
                    <div key={index} className="flex items-center bg-muted rounded-md px-3 py-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="mr-2">{time}</span>
                      <button
                        type="button"
                        className="text-destructive hover:text-destructive/80"
                        onClick={() => handleRemoveTime(time)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">추가된 시간이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
