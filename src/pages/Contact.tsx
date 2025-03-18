
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "문의가 접수되었습니다",
      description: "빠른 시일 내에 답변 드리겠습니다. 감사합니다.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">문의하기</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 문의 양식 */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" placeholder="이름을 입력하세요" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" placeholder="이메일을 입력하세요" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">문의 유형</Label>
                    <Select>
                      <SelectTrigger id="inquiry-type">
                        <SelectValue placeholder="문의 유형을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">일반 문의</SelectItem>
                        <SelectItem value="lesson">레슨 관련 문의</SelectItem>
                        <SelectItem value="payment">결제 관련 문의</SelectItem>
                        <SelectItem value="technical">기술 지원 문의</SelectItem>
                        <SelectItem value="partnership">제휴 문의</SelectItem>
                        <SelectItem value="other">기타 문의</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">제목</Label>
                    <Input id="subject" placeholder="제목을 입력하세요" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">내용</Label>
                    <Textarea 
                      id="message" 
                      placeholder="문의 내용을 자세히 입력해주세요" 
                      rows={6}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="attachment">첨부파일 (선택사항)</Label>
                    <Input id="attachment" type="file" className="cursor-pointer" />
                    <p className="text-xs text-muted-foreground">
                      최대 파일 크기: 10MB (지원 형식: jpg, png, pdf, doc, docx)
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full">문의 보내기</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* 문의 정보 */}
          <div>
            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">연락처 정보</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">전화번호</p>
                      <p className="text-muted-foreground">02-123-4567</p>
                      <p className="text-sm text-muted-foreground">(평일 10:00 - 18:00)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">이메일</p>
                      <p className="text-muted-foreground">support@harmonichub.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">주소</p>
                      <p className="text-muted-foreground">
                        서울특별시 강남구 테헤란로 123<br />
                        하모닉 빌딩 7층
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">고객센터 운영시간</p>
                      <p className="text-muted-foreground">
                        평일: 10:00 - 18:00<br />
                        점심시간: 12:30 - 13:30<br />
                        주말 및 공휴일: 휴무
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">자주 묻는 질문</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    문의하기 전에 자주 묻는 질문을 확인해보세요.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/guide?tab=faq">자주 묻는 질문 보기</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
