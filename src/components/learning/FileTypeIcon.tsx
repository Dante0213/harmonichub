
import { FileText, Music, Image as ImageIcon, Video } from "lucide-react";

interface FileTypeIconProps {
  fileType?: "image" | "audio" | "video" | "document";
  size?: "sm" | "md" | "lg";
}

export const FileTypeIcon = ({ fileType, size = "md" }: FileTypeIconProps) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-5 w-5";
      case "lg":
        return "h-10 w-10";
      default:
        return "h-6 w-6";
    }
  };

  switch (fileType) {
    case "image":
      return <ImageIcon className={`${getSizeClass()} text-blue-500`} />;
    case "audio":
      return <Music className={`${getSizeClass()} text-purple-500`} />;
    case "video":
      return <Video className={`${getSizeClass()} text-red-500`} />;
    default:
      return <FileText className={`${getSizeClass()} text-green-500`} />;
  }
};
