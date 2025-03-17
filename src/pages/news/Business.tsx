
import { Layout } from "@/components/layout/Layout";
import { SocialSidebar } from "@/components/social/SocialSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const businessData = [
  {
    title: "음악 교육 스타트업 투자 유치 성공",
    date: "2023년 7월 20일",
    summary: "온라인 음악 교육 플랫폼을 운영하는 스타트업이 100억 원 규모의 투자를 유치했습니다.",
    category: "투자/펀딩"
  },
  {
    title: "음악 저작권 관련 새로운 법안 발의",
    date: "2023년 7월 15일",
    summary: "디지털 시대에 맞는 음악 저작권 보호를 위한 새로운 법안이 국회에 발의되었습니다.",
    category: "법률/정책"
  },
  {
    title: "글로벌 음악 스트리밍 서비스, 한국 시장 본격 진출",
    date: "2023년 7월 10일",
    summary: "세계적인 음악 스트리밍 서비스가 한국 시장에 본격 진출합니다. 이로 인해 국내 음악 산업에 큰 변화가 예상됩니다.",
    category: "마켓/트렌드"
  },
  {
    title: "음악 교육용 AI 개발 기업, 국내 최초 유니콘 기업 등극",
    date: "2023년 7월 5일",
    summary: "AI를 활용한 음악 교육 솔루션을 개발하는 기업이 국내 최초로 음악 교육 분야 유니콘 기업으로 등극했습니다.",
    category: "기업/성장"
  },
  {
    title: "뮤직 테크 컨퍼런스 개최 예정",
    date: "2023년 6월 30일",
    summary: "음악과 기술의 융합을 주제로 한 '뮤직 테크 컨퍼런스'가 오는 8월 서울에서 개최될 예정입니다.",
    category: "이벤트/컨퍼런스"
  },
];

const Business = () => {
  return (
    <Layout>
      <div className="flex">
        <SocialSidebar />
        
        <div className="flex-1 md:ml-64">
          <div className="container px-4 py-10 mx-auto">
            <div className="flex items-center mb-6 gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">사업 소식</h1>
            </div>
            
            <div className="space-y-6">
              {businessData.map((business, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{business.title}</CardTitle>
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {business.category}
                      </span>
                    </div>
                    <CardDescription>{business.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{business.summary}</p>
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

export default Business;
