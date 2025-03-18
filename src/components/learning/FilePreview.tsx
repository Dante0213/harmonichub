
import { FileTypeIcon } from "./FileTypeIcon";

interface FilePreviewProps {
  fileType?: "image" | "audio" | "video" | "document";
  fileUrl?: string;
  title?: string;
}

export const FilePreview = ({ fileType, fileUrl, title }: FilePreviewProps) => {
  if (!fileUrl) {
    return (
      <div className="flex items-center justify-center bg-muted h-40 rounded-md">
        <FileTypeIcon fileType={fileType} size="lg" />
        <p className="ml-2 text-muted-foreground">미리보기를 사용할 수 없습니다</p>
      </div>
    );
  }

  switch (fileType) {
    case "image":
      return (
        <div className="flex justify-center">
          <img
            src={fileUrl}
            alt={title || "이미지"}
            className="max-h-80 object-contain rounded-md"
          />
        </div>
      );
    case "audio":
      return (
        <audio controls className="w-full my-4">
          <source src={fileUrl} />
          브라우저가 오디오 재생을 지원하지 않습니다.
        </audio>
      );
    case "video":
      return (
        <video controls className="w-full max-h-80 object-contain rounded-md">
          <source src={fileUrl} />
          브라우저가 비디오 재생을 지원하지 않습니다.
        </video>
      );
    default:
      return (
        <div className="flex items-center justify-center bg-muted h-40 rounded-md">
          <FileTypeIcon fileType={fileType} size="lg" />
          <p className="ml-2">문서 파일 ({fileUrl.split('.').pop()})</p>
        </div>
      );
  }
};
