
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Store = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'all';

  useEffect(() => {
    console.log('현재 활성화된 탭:', activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    navigate(`/store?tab=${value}`);
  };

  const products = [
    {
      name: "입문자용 어쿠스틱 기타",
      price: 180000,
      description: "초보자에게 적합한 어쿠스틱 기타입니다. 부드러운 터치감과 깊은 울림을 자랑합니다.",
      category: "instruments"
    },
    {
      name: "디지털 피아노 P-45",
      price: 550000,
      description: "뛰어난 음질과 터치감을 제공하는 88건반 디지털 피아노입니다.",
      category: "instruments"
    },
    {
      name: "전자 드럼 세트",
      price: 850000,
      description: "아파트에서도 자유롭게 연습할 수 있는 고품질 전자 드럼 세트입니다.",
      category: "instruments"
    },
    {
      name: "바이올린 입문 세트",
      price: 250000,
      description: "초보자를 위한 풀 세트 바이올린으로, 케이스와 활이 포함되어 있습니다.",
      category: "instruments"
    },
    {
      name: "피아노 교본: 성인을 위한 기초",
      price: 25000,
      description: "성인 학습자를 위한, 쉽게 따라할 수 있는 피아노 기초 교재입니다.",
      category: "books"
    },
    {
      name: "기타 코드북",
      price: 18000,
      description: "초보자부터 중급자까지 모든 기타리스트를 위한 필수 코드북입니다.",
      category: "books"
    },
    {
      name: "드럼 리듬 교본",
      price: 22000,
      description: "다양한 장르의 드럼 리듬을 소개하는 종합 교재입니다.",
      category: "books"
    },
    {
      name: "바이올린 연습곡집",
      price: 28000,
      description: "단계별로 구성된, 바이올린 연주 실력 향상을 위한 연습곡집입니다.",
      category: "books"
    }
  ];

  const vodContents = [
    {
      name: "피아노 기초 마스터",
      price: 99000,
      description: "처음부터 차근차근 배우는 피아노 기초 강의입니다. 총 24개 레슨이 포함되어 있습니다.",
      instructor: "김지수",
      level: "초급",
      duration: "8주"
    },
    {
      name: "어쿠스틱 기타 입문",
      price: 89000,
      description: "기초부터 시작하는 어쿠스틱 기타 강의입니다. 코드와 스트로크 패턴을 배웁니다.",
      instructor: "박현우",
      level: "초급",
      duration: "6주"
    },
    {
      name: "재즈 피아노 기초",
      price: 110000,
      description: "기본 코드부터 재즈 스케일, 즉흥 연주까지 배우는 재즈 피아노 강의입니다.",
      instructor: "김지수",
      level: "중급",
      duration: "7주"
    },
    {
      name: "클래식 기타 마스터",
      price: 120000,
      description: "클래식 기타의 기본 테크닉부터 주요 레퍼토리까지 배울 수 있는 강의입니다.",
      instructor: "박현우",
      level: "중급",
      duration: "8주"
    },
    {
      name: "바이올린 테크닉",
      price: 130000,
      description: "다양한 바이올린 테크닉을 마스터할 수 있는 종합 강의입니다.",
      instructor: "이미나",
      level: "중급",
      duration: "10주"
    },
    {
      name: "드럼 리듬 패턴",
      price: 95000,
      description: "다양한 장르의 드럼 리듬 패턴을 배울 수 있는 강의입니다.",
      instructor: "정태현",
      level: "초급",
      duration: "5주"
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">스토어</h1>
        
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">전체 상품</TabsTrigger>
            <TabsTrigger value="instruments">악기</TabsTrigger>
            <TabsTrigger value="books">교재</TabsTrigger>
            <TabsTrigger value="vod">VOD 강의</TabsTrigger>
            <TabsTrigger value="accessories">악세서리</TabsTrigger>
          </TabsList>
          
          
          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.map((product, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">상품 이미지</span>
                    </div>
                    <p className="mb-4 text-sm">{product.description}</p>
                    <p className="text-lg font-semibold">₩{product.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">장바구니 담기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="instruments">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.filter(p => p.category === 'instruments').map((product, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">상품 이미지</span>
                    </div>
                    <p className="mb-4 text-sm">{product.description}</p>
                    <p className="text-lg font-semibold">₩{product.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">장바구니 담기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="books">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {products.filter(p => p.category === 'books').map((product, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">상품 이미지</span>
                    </div>
                    <p className="mb-4 text-sm">{product.description}</p>
                    <p className="text-lg font-semibold">₩{product.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">장바구니 담기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vod">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vodContents.map((vod, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{vod.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <p className="mb-4 text-sm">{vod.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
                        {vod.level}
                      </div>
                      <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
                        {vod.duration}
                      </div>
                      <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
                        강사: {vod.instructor}
                      </div>
                    </div>
                    <p className="text-lg font-semibold">₩{vod.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1">구매하기</Button>
                    <Link to="/learning" className="flex-1">
                      <Button className="w-full" variant="outline">미리보기</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          
          <TabsContent value="accessories">
            <div className="p-8 text-center text-muted-foreground">
              <p>현재 준비 중인 카테고리입니다.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Store;
