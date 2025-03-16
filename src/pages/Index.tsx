
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Users } from "lucide-react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Environment } from "@react-three/drei";

// 3D 모델 컴포넌트
function MusicNotes() {
  return (
    <group>
      {[...Array(7)].map((_, i) => (
        <group key={i} position={[Math.sin(i * 1) * 2, Math.cos(i * 1) * 2, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial 
              color={["#FF5555", "#55FF55", "#5555FF", "#FFFF55", "#FF55FF", "#55FFFF", "#FFFFFF"][i % 7]} 
              metalness={0.3} 
              roughness={0.7} 
            />
          </mesh>
          <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.05, 1, 0.05]} />
            <meshStandardMaterial 
              color={["#FF5555", "#55FF55", "#5555FF", "#FFFF55", "#FF55FF", "#55FFFF", "#FFFFFF"][i % 7]} 
              metalness={0.3} 
              roughness={0.7} 
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("instructors");
  
  const testimonials = [
    {
      name: "이지은",
      avatar: "E",
      instrument: "피아노",
      rating: 5,
      text: "일대일 맞춤 레슨으로 3개월 만에 기초를 완벽하게 다질 수 있었습니다. 선생님께서 친절하게 지도해주셔서 빠르게 실력이 향상되었어요."
    },
    {
      name: "김현우",
      avatar: "H",
      instrument: "기타",
      rating: 5,
      text: "어려웠던 핑거스타일 기법을 온라인 레슨을 통해 마스터했습니다. 높은 화질의 화상과 다양한 각도에서의 시연이 큰 도움이 되었습니다."
    },
    {
      name: "박소연",
      avatar: "S",
      instrument: "바이올린",
      rating: 4,
      text: "처음 바이올린을 접했는데, 체계적인 커리큘럼과 세심한 피드백 덕분에 생각보다 빠르게 곡을 연주할 수 있게 되었습니다."
    },
    {
      name: "정동혁",
      avatar: "D",
      instrument: "드럼",
      rating: 5,
      text: "집에서도 효과적으로 드럼을 배울 수 있다는 것이 놀라웠습니다. 선생님의 전문적인 조언과 꾸준한 연습으로 취미를 넘어 실력을 키울 수 있었습니다."
    }
  ];

  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* 후기 섹션 */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">수강생 후기</h2>
          
          <Carousel className="mb-12">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.instrument} 수강생</CardDescription>
                        </div>
                      </div>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-4">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* 3D 음악 노트 섹션 */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 h-[400px]">
              <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <PresentationControls
                  global
                  zoom={0.8}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}>
                  <MusicNotes />
                </PresentationControls>
                <Environment preset="city" />
              </Canvas>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">음악의 세계로 초대합니다</h2>
              <p className="text-lg text-muted-foreground mb-6">
                초보자부터 전문가까지, 모든 레벨의 음악가를 위한 맞춤형 학습 경험을 제공합니다.
                실시간 화상 레슨, 다양한 연습 자료, 그리고 활발한 커뮤니티를 통해 음악적 여정을 함께하세요.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">전문 강사진</h3>
                    <p className="text-sm text-muted-foreground">50+ 인증된 강사</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">높은 만족도</h3>
                    <p className="text-sm text-muted-foreground">평균 4.8/5.0</p>
                  </div>
                </div>
              </div>
              <Button size="lg">무료 체험 레슨 신청하기</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* 강사 소개 섹션 */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">전문 강사진 소개</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="w-full flex justify-center mb-8">
              <TabsTrigger value="instructors">인기 강사</TabsTrigger>
              <TabsTrigger value="new">신규 강사</TabsTrigger>
              <TabsTrigger value="piano">피아노</TabsTrigger>
              <TabsTrigger value="guitar">기타</TabsTrigger>
              <TabsTrigger value="violin">바이올린</TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructors" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "김지수",
                  avatar: "J",
                  instrument: "피아노",
                  experience: "10년",
                  students: 120,
                  rating: 4.9
                },
                {
                  name: "박현우",
                  avatar: "H",
                  instrument: "기타",
                  experience: "8년",
                  students: 85,
                  rating: 4.7
                },
                {
                  name: "이미나",
                  avatar: "M",
                  instrument: "바이올린",
                  experience: "15년",
                  students: 95,
                  rating: 4.8
                },
                {
                  name: "정태현",
                  avatar: "T",
                  instrument: "드럼",
                  experience: "12년",
                  students: 70,
                  rating: 4.6
                }
              ].map((instructor, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-2">
                      <AvatarFallback className="text-2xl">{instructor.avatar}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{instructor.name}</CardTitle>
                    <CardDescription>{instructor.instrument} | 경력 {instructor.experience}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{instructor.students}+</p>
                        <p>수강생</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{instructor.rating}</p>
                        <p>평점</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">12+</p>
                        <p>강의</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">강사 프로필</Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="new">
              <div className="text-center py-10">
                <p className="text-muted-foreground">다른 탭을 선택하세요.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="piano">
              <div className="text-center py-10">
                <p className="text-muted-foreground">다른 탭을 선택하세요.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="guitar">
              <div className="text-center py-10">
                <p className="text-muted-foreground">다른 탭을 선택하세요.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="violin">
              <div className="text-center py-10">
                <p className="text-muted-foreground">다른 탭을 선택하세요.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
