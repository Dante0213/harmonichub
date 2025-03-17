
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

interface ReelCommentsProps {
  reel: Reel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReelComments = ({ reel, isOpen, onOpenChange }: ReelCommentsProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[350px] sm:w-[350px] md:w-[350px] lg:w-[400px] bg-black/95 text-white border-l border-gray-700 overflow-hidden"
      >
        <SheetHeader className="relative">
          <SheetTitle className="text-white">댓글 {reel.commentCount || reel.comments || 0}개</SheetTitle>
          <SheetClose className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4 text-white" />
          </SheetClose>
        </SheetHeader>
        
        <div className="mt-6 overflow-y-auto h-[calc(100vh-200px)]">
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
  );
};
