
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Reel } from "@/components/social/reels/ReelsData";

import { ProfileImageUpload } from "./ProfileImageUpload";
import { ProfileTagsSection } from "./ProfileTagsSection";
import { ProfileEducationSection } from "./ProfileEducationSection";
import { ProfileExperienceSection } from "./ProfileExperienceSection";
import { ProfileCertificatesSection } from "./ProfileCertificatesSection";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Reel;
  onUpdate: (updatedData: Reel) => void;
}

interface ProfileFormData {
  bio: string;
  instruments: string[];
  genres: string[];
  education: {id: string; institution: string; degree: string; year: string}[];
  experience: {id: string; company: string; position: string; period: string}[];
  certificates: {id: string; name: string; issuer: string; year: string}[];
}

export const ProfileEditModal = ({ isOpen, onClose, userData, onUpdate }: ProfileEditModalProps) => {
  const defaultValues: ProfileFormData = {
    bio: userData.bio || "",
    instruments: userData.instruments || [],
    genres: userData.genres || [],
    education: userData.education || [],
    experience: userData.experience || [],
    certificates: userData.certificates || []
  };

  const form = useForm<ProfileFormData>({
    defaultValues
  });

  // useEffect로 userData가 변경되면 form 값도 업데이트
  useEffect(() => {
    if (isOpen) {
      form.reset({
        bio: userData.bio || "",
        instruments: userData.instruments || [],
        genres: userData.genres || [],
        education: userData.education || [],
        experience: userData.experience || [],
        certificates: userData.certificates || []
      });
      
      setInstruments(userData.instruments || []);
      setGenres(userData.genres || []);
      setEducation(userData.education || []);
      setExperience(userData.experience || []);
      setCertificates(userData.certificates || []);
      setProfileImage(userData.imageUrl || "");
    }
  }, [isOpen, userData]);

  const [instruments, setInstruments] = useState<string[]>(defaultValues.instruments);
  const [newInstrument, setNewInstrument] = useState("");
  
  const [genres, setGenres] = useState<string[]>(defaultValues.genres);
  const [newGenre, setNewGenre] = useState("");
  
  const [education, setEducation] = useState(defaultValues.education);
  const [experience, setExperience] = useState(defaultValues.experience);
  const [certificates, setCertificates] = useState(defaultValues.certificates);
  
  const [profileImage, setProfileImage] = useState<string>(userData.imageUrl || "");

  const handleSubmit = (data: ProfileFormData) => {
    // Save profile image to localStorage
    if (profileImage) {
      localStorage.setItem('userProfileImage', profileImage);
    }
    
    const updatedData = {
      ...userData,
      bio: data.bio,
      instruments,
      genres,
      education,
      experience,
      certificates,
      imageUrl: profileImage
    };
    
    onUpdate(updatedData);
    
    // 세션 스토리지의 사용자 데이터에도 반영 (닉네임 동기화)
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      try {
        const parsedUserData = JSON.parse(userDataStr);
        parsedUserData.nickname = updatedData.user;
        sessionStorage.setItem('userData', JSON.stringify(parsedUserData));
      } catch (error) {
        console.error('사용자 데이터 업데이트 오류:', error);
      }
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Profile Image Upload */}
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              avatarFallback={userData.avatar}
            />
            
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>소개</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="자신을 소개해주세요." 
                      {...field} 
                      className="min-h-[100px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Instruments Tags */}
            <ProfileTagsSection
              title="악기"
              tags={instruments}
              setTags={setInstruments}
              newTag={newInstrument}
              setNewTag={setNewInstrument}
              placeholder="악기 추가"
            />

            {/* Genres Tags */}
            <ProfileTagsSection
              title="장르"
              tags={genres}
              setTags={setGenres}
              newTag={newGenre}
              setNewTag={setNewGenre}
              placeholder="장르 추가"
            />

            {/* Education Section */}
            <ProfileEducationSection
              education={education}
              setEducation={setEducation}
            />

            {/* Experience Section */}
            <ProfileExperienceSection
              experience={experience}
              setExperience={setExperience}
            />

            {/* Certificates Section */}
            <ProfileCertificatesSection
              certificates={certificates}
              setCertificates={setCertificates}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">
                저장
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
