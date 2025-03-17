
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

const newsData = [
  {
    title: "세계적인 피아니스트 국내 공연 예정",
    date: "2023년 7월 15일",
    summary: "세계적으로 유명한 피아니스트 OOO가 오는 9월 한국에서 첫 공연을 가질 예정입니다.",
    source: "음악 뉴스"
  },
  {
    title: "음악 교육 활성화 위한 정부 지원금 확대",
    date: "2023년 7월 10일",
    summary: "정부가 음악 교육 활성화를 위해 지원금을 확대하기로 결정했습니다. 이로 인해 많은 음악 학교와 학생들이 혜택을 받을 것으로 예상됩니다.",
    source: "교육부 보도자료"
  },
  {
    title: "국내 작곡가, 국제 작곡 대회 대상 수상",
    date: "2023년 7월 5일",
    summary: "국내 유명 작곡가 OOO씨가 국제 작곡 대회에서 대상을 수상했습니다. 한국인으로는 최초의 수상이라 더욱 의미가 깊습니다.",
    source: "문화 일보"
  },
  {
    title: "클래식 음악의 디지털 전환, 스트리밍 서비스 증가",
    date: "2023년 6월 28일",
    summary: "클래식 음악도 디지털 시대에 맞춰 변화하고 있습니다. 전용 스트리밍 서비스가 증가하고 청취자층도 다양화되고 있습니다.",
    source: "테크 뮤직"
  },
  {
    title: "뮤직 테라피, 의료 현장에서의 활용 증가",
    date: "2023년 6월 20일",
    summary: "음악 치료(뮤직 테라피)가 다양한 의료 현장에서 활용되고 있습니다. 특히 정신 건강 분야에서 그 효과가 두드러지게 나타나고 있습니다.",
    source: "헬스 투데이"
  },
];

const News = () => {
  return (
    <Layout>
      <div className="flex">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Newspaper className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">뉴스 소식</h1>
            </div>
            
            <div className="space-y-6">
              {newsData.map((news, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                    <CardDescription className="flex justify-between">
                      <span>{news.date}</span>
                      <span className="text-primary">{news.source}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{news.summary}</p>
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

export default News;
