
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment } from "@react-three/drei";
import { Euler } from "three";

function GuitarModel({ rotation = new Euler(0, Math.PI / 6, 0) }) {
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

export const Instrument3DModel = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<string>("guitar");

  const instrumentModels: Record<string, any> = {
    guitar: (props: any) => <GuitarModel {...props} />,
    piano: () => <PianoModel />,
    drums: () => <DrumModel />
  };

  return (
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
  );
};
