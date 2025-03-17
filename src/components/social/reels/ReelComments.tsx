
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Reel } from "./ReelsData";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ReelCommentsProps {
  reel: Reel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReelComments = ({ reel, isOpen, onOpenChange }: ReelCommentsProps) => {
  const [comments, setComments] = useState<any[]>(
    reel.commentData || 
    Array.from({ length: 5 }).map((_, index) => ({
      user: `사용자_${index}`,
      text: "정말 멋진 릴스네요! 👏",
      time: `${index + 1}시간 전`,
      likes: index * 3
    }))
  );
  
  const [newComment, setNewComment] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && comments.length > 0) {
      setTimeout(scrollToBottom, 300);
    }
  }, [isOpen, comments.length]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        user: "내 계정",
        text: newComment,
        time: "방금",
        likes: 0
      };
      
      setComments([...comments, comment]);
      setNewComment("");
      
      toast({
        title: "댓글이 추가되었습니다",
        duration: 2000
      });
      
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[350px] sm:w-[350px] md:w-[350px] lg:w-[400px] bg-black/95 text-white border-l border-gray-700 overflow-hidden"
      >
        <SheetHeader className="relative">
          <SheetTitle className="text-white">댓글 {comments.length}개</SheetTitle>
          <SheetClose className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4 text-white" />
          </SheetClose>
        </SheetHeader>
        
        <div className="mt-6 overflow-y-auto h-[calc(100vh-200px)]">
          {comments.map((comment, index) => (
            <div key={index} className="mb-4 p-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-sm">{comment.user}</p>
                  <p className="text-sm text-gray-300">{comment.text}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{comment.time}</span>
                    <span>좋아요 {comment.likes}개</span>
                    <button className="hover:text-white">답글달기</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-black">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
            <Input 
              type="text" 
              placeholder="댓글 추가..." 
              className="flex-1 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-400 pb-1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-400 hover:text-blue-300"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              게시
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
