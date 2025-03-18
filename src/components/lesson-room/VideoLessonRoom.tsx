
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mic, MicOff, Video, VideoOff, Share, MessageSquare, Music, FileUp, Volume2, ScreenShare } from "lucide-react";
import { toast } from "sonner";

interface VideoLessonRoomProps {
  isOpen: boolean;
  onClose: () => void;
  lessonInfo: {
    title: string;
    teacherName: string;
    time: string;
  };
}

export function VideoLessonRoom({ isOpen, onClose, lessonInfo }: VideoLessonRoomProps) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("video");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([
    {sender: "시스템", text: "레슨이 시작되었습니다. 화상 통화 및 다양한 기능을 사용할 수 있습니다."},
    {sender: lessonInfo.teacherName, text: "안녕하세요! 오늘 레슨을 시작하겠습니다."}
  ]);
  const [newMessage, setNewMessage] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pianoContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 로컬 비디오 스트림 가져오기
  useEffect(() => {
    if (isOpen && videoEnabled) {
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
          setVideoEnabled(false);
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
  }, [isOpen, videoEnabled, micEnabled]);

  // 가상 피아노 건반 생성
  useEffect(() => {
    if (pianoContainerRef.current) {
      renderVirtualPiano();
    }
  }, []);

  // 메시지가 추가될 때 채팅창 스크롤 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const renderVirtualPiano = () => {
    // 이 부분은 실제로 다양한 건반을 생성하고 이벤트를 연결해야 합니다
    // 간단한 구현을 위해 정적 HTML로 표현합니다
  };

  const handleToggleMic = () => {
    setMicEnabled(prev => !prev);
    toast(micEnabled ? "마이크가 꺼졌습니다." : "마이크가 켜졌습니다.");
    
    // 실제 구현에서는 미디어 스트림의 오디오 트랙 활성화/비활성화
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !micEnabled;
      });
    }
  };

  const handleToggleVideo = () => {
    setVideoEnabled(prev => !prev);
    toast(videoEnabled ? "카메라가 꺼졌습니다." : "카메라가 켜졌습니다.");
    
    // 실제 구현에서는 미디어 스트림의 비디오 트랙 활성화/비활성화
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled;
      });
    }
  };

  const handleShareScreen = () => {
    toast.info("화면 공유 기능을 시작합니다...");
    // 실제 구현에서는 navigator.mediaDevices.getDisplayMedia() 사용
  };

  const handleFileUpload = () => {
    // 파일 선택 다이얼로그
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        toast.success(`파일 "${file.name}"이(가) 공유 준비되었습니다.`);
        // 실제 구현에서는 WebRTC 데이터 채널을 통해 파일 전송 구현
      }
    };
    input.click();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      sender: "나",
      text: newMessage
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
    
    // 실제 구현에서는 WebRTC 데이터 채널을 통해 메시지 전송
  };

  const handleStartMetronome = () => {
    toast.info("메트로놈이 시작되었습니다.");
    // 실제 구현에서는 Web Audio API를 사용하여 메트로놈 구현
  };

  const handleEndLesson = () => {
    if (confirm("정말 레슨을 종료하시겠습니까?")) {
      toast.info("레슨이 종료되었습니다.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex justify-between items-center">
            <span>{lessonInfo.title} - {lessonInfo.teacherName} 선생님</span>
            <span className="text-sm font-normal text-muted-foreground">{lessonInfo.time}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-4 h-[calc(90vh-4rem)]">
          {/* 메인 화상 영역 - 3/4 */}
          <div className="col-span-1 md:col-span-3 h-full flex flex-col">
            {/* 비디오 영역 */}
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
            </div>
            
            {/* 컨트롤 바 */}
            <div className="h-16 bg-background border-t flex items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleMic}
                  className={!micEnabled ? "bg-red-100 text-red-500 border-red-200" : ""}
                >
                  {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleVideo}
                  className={!videoEnabled ? "bg-red-100 text-red-500 border-red-200" : ""}
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handleShareScreen}>
                  <ScreenShare className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleFileUpload}>
                  <FileUp className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleStartMetronome}>
                  <Music className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setActiveTab("chat")}>
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
              
              <div>
                <Button variant="destructive" onClick={handleEndLesson}>
                  레슨 종료
                </Button>
              </div>
            </div>
          </div>
          
          {/* 사이드바 - 1/4 */}
          <div className="col-span-1 h-full border-l">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid grid-cols-2 w-full rounded-none border-b">
                <TabsTrigger value="video">피아노 건반</TabsTrigger>
                <TabsTrigger value="chat">채팅</TabsTrigger>
              </TabsList>
              
              <TabsContent value="video" className="flex-1 overflow-y-auto p-4">
                <div ref={pianoContainerRef} className="w-full">
                  {/* 가상 피아노 건반 렌더링 */}
                  <div className="border rounded-md p-2 mb-4">
                    <h3 className="text-sm font-medium mb-2">가상 피아노</h3>
                    <div className="flex relative h-32 mb-4">
                      {/* 하얀 건반 */}
                      {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note, i) => (
                        <div 
                          key={note} 
                          className="flex-1 bg-white border border-gray-300 flex items-end justify-center pb-2 rounded-b-sm"
                        >
                          <span className="text-xs text-gray-500">{note}</span>
                        </div>
                      ))}
                      
                      {/* 검은 건반 */}
                      <div className="absolute top-0 left-[12%] w-[8%] h-[60%] bg-black rounded-b-sm"></div>
                      <div className="absolute top-0 left-[26%] w-[8%] h-[60%] bg-black rounded-b-sm"></div>
                      <div className="absolute top-0 left-[55%] w-[8%] h-[60%] bg-black rounded-b-sm"></div>
                      <div className="absolute top-0 left-[69%] w-[8%] h-[60%] bg-black rounded-b-sm"></div>
                      <div className="absolute top-0 left-[83%] w-[8%] h-[60%] bg-black rounded-b-sm"></div>
                    </div>
                  </div>
                  
                  {/* MIDI 연결 상태 */}
                  <div className="border rounded-md p-2 mb-4">
                    <h3 className="text-sm font-medium mb-2">MIDI 장치 연결</h3>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => toast.info("MIDI 장치 연결을 시도합니다...")}>
                      MIDI 장치 연결하기
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      USB로 연결된 MIDI 키보드를 감지합니다
                    </p>
                  </div>
                  
                  {/* 메트로놈 */}
                  <div className="border rounded-md p-2">
                    <h3 className="text-sm font-medium mb-2">메트로놈</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs">템포: 120 BPM</span>
                      <Button variant="outline" size="sm" onClick={handleStartMetronome}>
                        시작
                      </Button>
                    </div>
                    <input 
                      type="range" 
                      min="60" 
                      max="180" 
                      defaultValue="120" 
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="flex-1 flex flex-col h-full">
                {/* 채팅 메시지 */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-2"
                >
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded-lg max-w-[80%] ${
                        msg.sender === "나" 
                          ? "bg-primary text-primary-foreground ml-auto" 
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-xs font-medium">{msg.sender}</p>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))}
                </div>
                
                {/* 메시지 입력 */}
                <form 
                  onSubmit={handleSendMessage}
                  className="p-2 border-t flex items-center"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 p-2 text-sm border rounded-md mr-2"
                  />
                  <Button type="submit" size="sm">전송</Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
