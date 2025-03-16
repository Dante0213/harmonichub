
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, PresentationControls } from "@react-three/drei";
import { Calendar } from "@/components/ui/calendar";
import { BellRing, CheckIcon, Music2, PianoIcon, PlusCircle, Users2 } from "lucide-react";

function Model({ rotation = [0, 0, 0] }) {
  // 3D 기타 모델 - 다른 모델로 대체 가능
  return (
    <mesh rotation={rotation} scale={[0.8, 0.8, 0.8]}>
      <boxGeometry args={[1, 3, 0.2]} />
      <meshStandardMaterial color="#764ABC" metalness={0.8} roughness={0.2} />
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[1.5, 0.2, 0.3]} />
        <meshStandardMaterial color="#764ABC" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      <mesh position={[0, 0.5, 0.15]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      <mesh position={[0, -0.5, 0.15]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      {/* 기타 줄 */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[(-0.25 + i * 0.1), 0, 0.12]}>
          <boxGeometry args={[0.01, 2.8, 0.01]} />
          <meshStandardMaterial color="#CCCCCC" metalness={1} roughness={0.1} />
        </mesh>
      ))}
    </mesh>
  );
}

function PianoModel() {
  return (
    <mesh rotation={[0, 0, 0]} scale={[0.7, 0.7, 0.7]} position={[0, -0.5, 0]}>
      {/* 피아노 본체 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.8, 1.5]} />
        <meshStandardMaterial color="#222222" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* 피아노 건반 */}
      <mesh position={[0, 0.41, 0.4]}>
        <boxGeometry args={[2.9, 0.02, 0.6]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.2} />
      </mesh>
      {/* 검은 건반 */}
      {[-1.2, -0.8, -0.4, 0.4, 0.8, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.43, 0.3]}>
          <boxGeometry args={[0.2, 0.04, 0.4]} />
          <meshStandardMaterial color="#111111" metalness={0.1} roughness={0.3} />
        </mesh>
      ))}
    </mesh>
  );
}

function DrumModel() {
  return (
    <group rotation={[0, 0, 0]} scale={[0.6, 0.6, 0.6]} position={[0, -0.5, 0]}>
      {/* 드럼 바디 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.7, 32]} />
        <meshStandardMaterial color="#B22222" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* 드럼 상단 면 */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#EFEFEF" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* 드럼 하단 면 */}
      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#EFEFEF" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* 심벌즈 */}
      <mesh position={[1.5, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* 스네어 드럼 */}
      <mesh position={[-1.2, 0.5, 0.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

const instrumentModels = {
  guitar: (props) => <Model {...props} />,
  piano: () => <PianoModel />,
  drums: () => <DrumModel />
};

const LessonRoom = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedInstrument, setSelectedInstrument] = useState<string>("guitar");

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">레슨실</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 3D 악기 모델 */}
          <Card className="col-span-1 lg:col-span-2 h-[450px] relative overflow-hidden">
            <CardHeader>
              <CardTitle>악기 모델</CardTitle>
              <CardDescription>다양한 악기를 3D로 살펴보세요</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[350px]">
              <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-md p-2">
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant={selectedInstrument === "guitar" ? "default" : "outline"} 
                    onClick={() => setSelectedInstrument("guitar")}
                  >
                    기타
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedInstrument === "piano" ? "default" : "outline"} 
                    onClick={() => setSelectedInstrument("piano")}
                  >
                    피아노
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedInstrument === "drums" ? "default" : "outline"} 
                    onClick={() => setSelectedInstrument("drums")}
                  >
                    드럼
                  </Button>
                </div>
              </div>
              <Suspense fallback={<div className="flex items-center justify-center h-full">로딩중...</div>}>
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <PresentationControls
                    global
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}>
                    {instrumentModels[selectedInstrument]({ rotation: [0, Math.PI / 6, 0] })}
                  </PresentationControls>
                  <Environment preset="city" />
                </Canvas>
              </Suspense>
            </CardContent>
          </Card>

          {/* 레슨 일정 */}
          <Card>
            <CardHeader>
              <CardTitle>레슨 일정</CardTitle>
              <CardDescription>다가오는 레슨 일정을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mb-4"
              />
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <BellRing className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">오늘 오후 3시</p>
                    <p className="text-xs text-muted-foreground">김지수 선생님과 피아노 레슨</p>
                  </div>
                  <Button size="sm" variant="outline">
                    입장
                  </Button>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <BellRing className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">내일 오전 11시</p>
                    <p className="text-xs text-muted-foreground">박현우 선생님과 기타 레슨</p>
                  </div>
                  <Button size="sm" variant="outline">
                    입장
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="instructors">
          <TabsList className="mb-4">
            <TabsTrigger value="instructors">강사 소개</TabsTrigger>
            <TabsTrigger value="lessonroom">레슨룸 입장</TabsTrigger>
            <TabsTrigger value="reservation">레슨 예약</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "김지수",
                  instrument: "피아노",
                  experience: "10년",
                  description: "클래식부터 재즈까지 다양한 장르를 가르칩니다."
                },
                {
                  name: "박현우",
                  instrument: "기타",
                  experience: "8년",
                  description: "어쿠스틱, 일렉트릭 기타 모두 전문적으로 지도합니다."
                },
                {
                  name: "이미나",
                  instrument: "바이올린",
                  experience: "15년",
                  description: "초보자부터 전공생까지 맞춤형 레슨을 제공합니다."
                },
                {
                  name: "정태현",
                  instrument: "드럼",
                  experience: "12년",
                  description: "기초 리듬부터 고급 테크닉까지 체계적으로 가르칩니다."
                },
                {
                  name: "최서영",
                  instrument: "보컬",
                  experience: "9년",
                  description: "발성법, 호흡법, 무대 매너까지 종합적으로 지도합니다."
                },
                {
                  name: "한준호",
                  instrument: "베이스",
                  experience: "7년",
                  description: "다양한 장르의 베이스 테크닉을 가르칩니다."
                }
              ].map((instructor, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        {instructor.instrument === "피아노" && <PianoIcon className="h-5 w-5 text-primary" />}
                        {instructor.instrument === "기타" && <Music2 className="h-5 w-5 text-primary" />}
                        {instructor.instrument !== "피아노" && instructor.instrument !== "기타" && <Music2 className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <CardTitle>{instructor.name}</CardTitle>
                        <CardDescription>{instructor.instrument} | 경력 {instructor.experience}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{instructor.description}</p>
                    <div className="mt-4 flex justify-between">
                      <Button size="sm" variant="outline">프로필</Button>
                      <Button size="sm">레슨 예약</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lessonroom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "피아노 레슨룸 1", status: "사용 가능", capacity: 1 },
                { name: "피아노 레슨룸 2", status: "사용 중", capacity: 1 },
                { name: "기타 레슨룸", status: "사용 가능", capacity: 2 },
                { name: "드럼 레슨룸", status: "사용 가능", capacity: 2 },
                { name: "앙상블 레슨룸", status: "사용 중", capacity: 5 },
                { name: "보컬 레슨룸", status: "사용 가능", capacity: 2 },
              ].map((room, i) => (
                <Card key={i} className={room.status === "사용 중" ? "opacity-60" : ""}>
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span className={`flex items-center gap-1 ${room.status === "사용 가능" ? "text-green-500" : "text-red-500"}`}>
                        {room.status === "사용 가능" ? <CheckIcon className="h-3 w-3" /> : null}
                        {room.status}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users2 className="h-3 w-3" /> {room.capacity}명
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" disabled={room.status === "사용 중"}>입장하기</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reservation">
            <Card>
              <CardHeader>
                <CardTitle>레슨 예약</CardTitle>
                <CardDescription>원하는 시간과 강사를 선택하여 레슨을 예약하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                {/* 예약 가능 시간 목록 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time, i) => (
                    <Button key={i} variant="outline" className="flex items-center justify-center">{time}</Button>
                  ))}
                </div>
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">악기 선택</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>피아노</option>
                        <option>기타</option>
                        <option>드럼</option>
                        <option>바이올린</option>
                        <option>보컬</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">강사 선택</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>김지수</option>
                        <option>박현우</option>
                        <option>이미나</option>
                        <option>정태현</option>
                        <option>최서영</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">레슨 유형</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>1회 레슨</option>
                        <option>4회 패키지</option>
                        <option>8회 패키지</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full">예약하기</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LessonRoom;
