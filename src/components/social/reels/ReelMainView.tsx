
import { ReelUserInfo } from "./ReelUserInfo";
import { Reel } from "./ReelsData";
import { useState } from "react";
import { ReelVideoPlayer } from "./ReelVideoPlayer";
import { ReelInteractionButtons } from "./ReelInteractionButtons";
import { ReelComments } from "./ReelComments";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { toast } = useToast();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const copyLinkToClipboard = () => {
    const reelUrl = `${window.location.origin}/reel/${reel.id}`;
    navigator.clipboard.writeText(reelUrl);
    toast({
      title: "링크가 복사되었습니다",
      duration: 2000
    });
  };

  const handleUploadClick = () => {
    setIsUploadOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 실제 업로드 로직은 여기에 구현
      toast({
        title: "영상이 업로드되었습니다",
        description: "잠시 후 릴스에 반영됩니다",
        duration: 3000
      });
      setIsUploadOpen(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden shadow-pastel">
      <ReelVideoPlayer
        videoUrl={reel.videoUrl || "https://example.com/placeholder.mp4"}
        isMuted={isMuted}
        volume={volume}
        onVideoClick={togglePlay}
        isPlaying={isPlaying}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <ReelInteractionButtons
            isLiked={isLiked}
            likeCount={likeCount}
            commentCount={reel.commentCount || reel.comments || 0}
            isMuted={isMuted}
            volume={volume}
            onLikeToggle={toggleLike}
            onCommentToggle={() => setIsCommentsOpen(true)}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={toggleMute}
            onCopyLink={copyLinkToClipboard}
            onUploadClick={handleUploadClick}
          />
          
          <ReelUserInfo reel={reel} onUserClick={onUserClick} />
          
          <div className="mb-12">
            <p className="text-base mb-2">{reel.description || reel.content}</p>
            <div className="flex flex-wrap gap-2">
              {reel.hashtags && reel.hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ReelComments 
        reel={reel} 
        isOpen={isCommentsOpen} 
        onOpenChange={setIsCommentsOpen} 
      />

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>릴스 영상 업로드</DialogTitle>
            <DialogDescription>
              15초에서 60초 사이의 짧은 영상을 업로드해보세요
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="video-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                영상 선택
              </label>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                onChange={handleFileSelect}
              />
              <p className="text-xs text-muted-foreground">
                MP4, MOV 형식의 파일 (최대 100MB)
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                취소
              </Button>
              <Button type="submit">업로드</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
