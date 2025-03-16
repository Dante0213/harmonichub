
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Store = () => {
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

  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">스토어</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">전체 상품</TabsTrigger>
            <TabsTrigger value="instruments">악기</TabsTrigger>
            <TabsTrigger value="books">교재</TabsTrigger>
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
