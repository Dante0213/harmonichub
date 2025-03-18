
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { PianoKeyboard } from "./PianoKeyboard";

interface VideoAreaProps {
  videoEnabled: boolean;
  micEnabled: boolean;
}

export function VideoArea({ videoEnabled, micEnabled }: VideoAreaProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // 로컬 비디오 스트림 가져오기
  useEffect(() => {
    if (videoEnabled) {
      const getMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: micEnabled 
          });
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          // 실제 WebRTC 구현에서는 여기서 RTCPeerConnection을 설정하고
          // 스트림을 연결해야 합니다
          
          toast.success("카메라 및 마이크에 연결되었습니다.");
        } catch (err) {
          console.error("미디어 장치에 접근할 수 없습니다:", err);
          toast.error("카메라나 마이크에 접근할 수 없습니다.");
        }
      };
      
      getMedia();
      
      // 컴포넌트가 언마운트될 때 미디어 스트림 정리
      return () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          const stream = localVideoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [videoEnabled, micEnabled]);
  
  return (
    <div className="flex-1 bg-gray-900 relative">
      {/* 원격 비디오 (선생님) */}
      <div className="w-full h-full">
        <video 
          ref={remoteVideoRef}
          autoPlay 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/placeholder-teacher-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* 로컬 비디오 (학생) */}
      <div className="absolute bottom-4 right-4 w-1/4 h-1/4 border-2 border-white rounded-lg overflow-hidden shadow-lg">
        <video 
          ref={localVideoRef}
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        {!videoEnabled && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <p className="text-white text-sm">카메라 꺼짐</p>
          </div>
        )}
      </div>
      
      {/* 피아노 건반 */}
      <PianoKeyboard />
    </div>
  );
}
