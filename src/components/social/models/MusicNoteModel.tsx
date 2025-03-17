
import { Group } from "three";

export function MusicNoteModel() {
  return (
    <group scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#FF1493" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]}>
        <boxGeometry args={[0.1, 1.6, 0.1]} />
        <meshStandardMaterial color="#FF1493" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

export const Environment = ({ preset }: { preset: string }) => {
  return null; // Three.js 환경 설정 (실제로는 @react-three/drei의 Environment 컴포넌트가 필요)
};
