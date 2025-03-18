
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface SheetLibraryProps {
  selectedSheet: string | null;
  onSheetSelect: (sheetTitle: string) => void;
  onFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SheetLibrary({
  selectedSheet,
  onSheetSelect,
  onFileUpload,
  fileInputRef,
  onFileChange
}: SheetLibraryProps) {
  // 샘플 악보 목록
  const sampleSheets = [
    {
      title: "쇼팽 녹턴 Op.9 No.2",
      genre: "클래식",
      level: "중급"
    },
    {
      title: "베토벤 엘리제를 위하여",
      genre: "클래식",
      level: "초급"
    },
    {
      title: "모차르트 터키 행진곡",
      genre: "클래식",
      level: "중급"
    },
    {
      title: "리스트 라 캄파넬라",
      genre: "클래식",
      level: "고급"
    },
    {
      title: "드뷔시 달빛",
      genre: "클래식",
      level: "중급"
    }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium"></h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onFileUpload}
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          <span>파일 업로드</span>
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
      <div className="space-y-2">
        {sampleSheets.map((sheet, index) => (
          <div 
            key={index}
            className={`p-2 border rounded-md cursor-pointer hover:bg-accent ${selectedSheet === sheet.title ? "bg-accent" : ""}`}
            onClick={() => onSheetSelect(sheet.title)}
          >
            <p className="font-medium">{sheet.title}</p>
            <p className="text-xs text-muted-foreground">{sheet.genre} | {sheet.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
