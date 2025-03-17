
import { ReelUserInfo } from "./ReelUserInfo";
import { Reel } from "./ReelsData";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Volume2, VolumeX, Link, Send } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/components/ui/sheet";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface ReelMainViewProps {
  reel: Reel;
  onUserClick?: (user: Reel) => void;
}

export const ReelMainView = ({ reel, onUserClick }: ReelMainViewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(reel.isLiked || false);
  const [likeCount, setLikeCount] = useState(reel.likeCount || reel.likes || 0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          videoRef.current?.play();
        } else {
          setIsPlaying(false);
          videoRef.current?.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const copyLinkToClipboard = () => {
    const reelUrl = `${window.location.origin}/reel/${reel.id}`;
    navigator.clipboard.writeText(reelUrl);
    // 여기서 토스트 메시지를 표시할 수 있습니다
  };

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={reel.videoUrl || "https://example.com/placeholder.mp4"}
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-black/50 hover:bg-black/70 text-white ${isLiked ? 'text-red-500' : ''}`}
              onClick={toggleLike}
            >
              <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
              <span className="text-xs absolute -bottom-5">{likeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsCommentsOpen(true)}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs absolute -bottom-5">{reel.commentCount || reel.comments || 0}</span>
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-black/90 border-none text-white">
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyLinkToClipboard}
                    className="flex items-center gap-2 text-white hover:bg-white/20"
                  >
                    <Link className="w-4 h-4" />
                    <span>링크 복사</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2 text-white hover:bg-white/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>다른 유저에게 보내기</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 bg-black/90 border-none">
                <div className="h-24 flex flex-col items-center justify-center">
                  <Slider
                    orientation="vertical"
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="h-full"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <ReelUserInfo reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
          
          <div className="mb-4">
            <p className="text-base mb-2">{reel.description || reel.content}</p>
            <div className="flex flex-wrap gap-2">
              {reel.hashtags && reel.hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 재생/일시정지 버튼 중앙에 배치 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white w-16 h-16"
            onClick={togglePlay}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </Button>
        )}
      </div>

      {/* 댓글 시트 */}
      <Sheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <SheetContent side="right" className="w-[350px] bg-black/95 text-white border-l border-gray-700">
          <SheetHeader>
            <SheetTitle className="text-white">댓글 {reel.commentCount || reel.comments || 0}개</SheetTitle>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto h-[calc(100vh-100px)]">
            {reel.commentData ? (
              reel.commentData.map((comment, index) => (
                <div key={index} className="mb-4 p-2">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-sm">{comment.user || `사용자_${index}`}</p>
                      <p className="text-sm text-gray-300">{comment.text}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <span>{comment.time || '2시간 전'}</span>
                        <span>좋아요 {comment.likes || 0}개</span>
                        <button className="hover:text-white">답글달기</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="mb-4 p-2">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-sm">사용자_{index}</p>
                      <p className="text-sm text-gray-300">정말 멋진 릴스네요! 👏</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <span>{index + 1}시간 전</span>
                        <span>좋아요 {index * 3}개</span>
                        <button className="hover:text-white">답글달기</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-black">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
              <input 
                type="text" 
                placeholder="댓글 추가..." 
                className="flex-1 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-400 pb-1"
              />
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">게시</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
