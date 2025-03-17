
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

interface ProfileImageUploadProps {
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  avatarFallback: string;
}

export const ProfileImageUpload = ({ 
  profileImage, 
  setProfileImage, 
  avatarFallback 
}: ProfileImageUploadProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <Avatar className="h-24 w-24">
        {profileImage ? (
          <AvatarImage src={profileImage} alt="Profile" />
        ) : (
          <AvatarFallback className="text-2xl">{avatarFallback}</AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          id="profile-image"
          className="hidden"
          onChange={handleImageUpload}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => document.getElementById('profile-image')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          프로필 이미지 업로드
        </Button>
        {profileImage && (
          <Button 
            type="button" 
            variant="destructive" 
            size="sm"
            onClick={() => setProfileImage("")}
          >
            <X className="h-4 w-4 mr-1" />
            삭제
          </Button>
        )}
      </div>
    </div>
  );
};
