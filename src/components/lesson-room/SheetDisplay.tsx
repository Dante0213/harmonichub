
import { FileText } from "lucide-react";

interface SheetDisplayProps {
  pdfObjectUrl: string | null;
  selectedSheet: string | null;
}

export function SheetDisplay({ pdfObjectUrl, selectedSheet }: SheetDisplayProps) {
  if (pdfObjectUrl) {
    return (
      <object 
        data={pdfObjectUrl} 
        type="application/pdf" 
        width="100%" 
        height="100%"
        className="w-full h-full"
      >
        <p>PDF를 표시할 수 없습니다. <a href={pdfObjectUrl} target="_blank" rel="noopener noreferrer">다운로드</a></p>
      </object>
    );
  }
  
  if (selectedSheet) {
    return (
      <div className="flex flex-col items-center justify-center">
        <FileText className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-gray-600 font-medium">{selectedSheet}</p>
        <p className="text-gray-500 text-sm">선택된 악보가 표시됩니다</p>
      </div>
    );
  }
  
  return (
    <p className="text-gray-500">왼쪽 라이브러리에서 악보를 선택하세요</p>
  );
}
