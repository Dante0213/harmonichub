
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeacherBasicInfoFormProps {
  name: string;
  setName: (name: string) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  education: string;
  setEducation: (education: string) => void;
  experience: string;
  setExperience: (experience: string) => void;
  certificates: string;
  setCertificates: (certificates: string) => void;
  introduction: string;
  setIntroduction: (introduction: string) => void;
  image: string;
}

export function TeacherBasicInfoForm({
  name,
  setName,
  specialty,
  setSpecialty,
  education,
  setEducation,
  experience,
  setExperience,
  certificates,
  setCertificates,
  introduction,
  setIntroduction,
  image
}: TeacherBasicInfoFormProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
