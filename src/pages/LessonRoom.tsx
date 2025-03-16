
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Calendar, Users } from "lucide-react";

const LessonRoom = () => {
  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">레슨실</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">예정된 레슨</TabsTrigger>
            <TabsTrigger value="available">이용 가능한 레슨</TabsTrigger>
            <TabsTrigger value="teachers">강사 목록</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>피아노 기초 레슨 {i + 1}</CardTitle>
                    <CardDescription>김민지 강사</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>2023년 6월 15일, 오후 3:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <span>화상 레슨 (Zoom)</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">레슨룸 입장하기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="available">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{["피아노", "기타", "드럼", "바이올린", "보컬"][i]} 레슨</CardTitle>
                    <CardDescription>{["초급", "중급", "고급", "초급-중급", "중급-고급"][i]} 레벨</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">1:1 맞춤형 레슨으로 빠르게 실력을 향상시키세요.</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4" />
                      <span>{["김민지", "이승우", "정다영", "박준호", "최수진"][i]} 강사</span>
                    </div>
                    <p className="font-semibold text-right">₩{[30000, 35000, 40000, 32000, 38000][i]} / 시간</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">예약하기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="teachers">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{["김민지", "이승우", "정다영", "박준호"][i]} 강사</CardTitle>
                    <CardDescription>{["피아노", "기타", "드럼", "바이올린"][i]} 전문</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      {[
                        "10년 이상의 교육 경력을 가진 피아노 전문 강사입니다. 초급부터 고급까지 맞춤형 지도를 제공합니다.",
                        "유명 밴드 출신 기타리스트로, 다양한 장르의 기타 연주법을 가르칩니다.",
                        "현직 스튜디오 세션 드러머로 활동 중이며, 기초부터 고급 테크닉까지 알려드립니다.",
                        "클래식 음악 전공자로, 바이올린의 기본기부터 고급 테크닉까지 지도합니다."
                      ][i]}
                    </p>
                    <div className="flex justify-between">
                      <span>평점: {[4.9, 4.7, 4.8, 4.9][i]}/5.0</span>
                      <span>레슨: {[120, 95, 105, 88][i]}회</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">프로필 보기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LessonRoom;
