
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MoreVertical, Flag } from "lucide-react";

interface ReelReportMenuProps {
  reelId: string | number;
}

export const ReelReportMenu = ({ reelId }: ReelReportMenuProps) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string | null>(null);
  const [otherReasonText, setOtherReasonText] = useState("");
  const { toast } = useToast();

  const reportReasons = [
    "스팸",
    "미성년자 접근 위험",
    "혐오 발언",
    "폭력 또는 위험 단체",
    "불법",
    "규제 상품 판매",
    "저작권 침해",
    "거짓 정보",
    "기타"
  ];

  const handleReportClick = (reason: string) => {
    if (reason === "기타") {
      setReportReason(reason);
      setIsReportDialogOpen(true);
    } else {
      submitReport(reason);
    }
  };

  const submitReport = (reason: string, details?: string) => {
    // 실제 구현에서는 API 호출을 통해 신고 내용 전송
    console.log("신고 접수:", { reelId, reason, details });
    
    toast({
      title: "신고가 접수되었습니다",
      description: "신고 내용이 검토팀에 전달되었습니다",
      duration: 1000
    });
    
    // 상태 초기화
    setReportReason(null);
    setOtherReasonText("");
    setIsReportDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-black/90 border-gray-700 text-white">
          <DropdownMenuLabel className="flex items-center gap-2 text-white">
            <Flag className="w-4 h-4" />
            <span>콘텐츠 신고하기</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          {reportReasons.map((reason) => (
            <DropdownMenuItem 
              key={reason}
              onClick={() => handleReportClick(reason)}
              className="text-white hover:bg-white/20 cursor-pointer"
            >
              {reason}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>신고 상세 사유</DialogTitle>
            <DialogDescription>
              신고하시는 상세한 사유를 작성해주세요
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={otherReasonText}
              onChange={(e) => setOtherReasonText(e.target.value)}
              placeholder="상세 내용을 작성해주세요"
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsReportDialogOpen(false)}
            >
              취소
            </Button>
            <Button 
              onClick={() => submitReport("기타", otherReasonText)}
              disabled={!otherReasonText.trim()}
            >
              접수
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
