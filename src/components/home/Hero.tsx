
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PresentationControls } from "@react-three/drei";

// 악기 3D 모델 컴포넌트
function GuitarModel() {
  return (
    <mesh rotation={[0, Math.PI / 6, 0]} scale={[0.8, 0.8, 0.8]}>
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

export function Hero() {
  // 캔버스 크기 조절 함수
  const [canvasWidth, setCanvasWidth] = useState('100%');
  const [canvasHeight, setCanvasHeight] = useState('100%');

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            나만의 음악 여정을 시작하세요
          </h1>
          <p className="mb-10 text-xl text-muted-foreground">
            실시간 화상 레슨, 음악 관련 상품, 음악가 커뮤니티, 그리고 다양한 학습 자료를 통해
            여러분의 음악 실력을 향상시키세요.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
            <Button size="lg" asChild>
              <Link to="/signup">무료로 시작하기</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/lesson-room">레슨실 둘러보기</Link>
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 h-[400px] relative">
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
                <GuitarModel />
              </PresentationControls>
              <Environment preset="sunset" />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
