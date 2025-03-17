
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Theater } from "lucide-react";

const performanceData = [
  {
    title: "클래식 기타 페스티벌",
    date: "2023년 8월 15일",
    location: "서울 예술의전당",
    description: "국내외 유명 기타리스트들이 모여 클래식 기타의 아름다움을 선보이는 축제입니다."
  },
  {
    title: "피아노 마스터클래스",
    date: "2023년 9월 3일",
    location: "부산 문화회관",
    description: "세계적인 피아니스트가 진행하는 마스터클래스로, 청중들에게 연주와 해설을 선보입니다."
  },
  {
    title: "바이올린 콘서트",
    date: "2023년 9월 10일",
    location: "대구 콘서트홀",
    description: "유명 바이올리니스트의 솔로 콘서트. 바흐부터 현대 작곡가까지 다양한 레퍼토리를 선보입니다."
  },
  {
    title: "오페라 '라 트라비아타'",
    date: "2023년 10월 5일",
    location: "서울 국립극장",
    description: "베르디의 명작 오페라 '라 트라비아타'의 풀 스케일 공연입니다."
  },
  {
    title: "재즈 페스티벌",
    date: "2023년 10월 20일",
    location: "인천 펜타포트",
    description: "국내외 유명 재즈 뮤지션들이 한자리에 모여 다양한 재즈 음악을 선보입니다."
  },
];

const Performances = () => {
  return (
    <Layout>
      <div className="flex">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Theater className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">공연 소식</h1>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {performanceData.map((performance, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{performance.title}</CardTitle>
                    <CardDescription>{performance.date} - {performance.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{performance.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">자세히 보기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Performances;
