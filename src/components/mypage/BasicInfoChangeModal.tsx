
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileTagsSection } from "@/components/profile/ProfileTagsSection";
import { ProfileEducationSection } from "@/components/profile/ProfileEducationSection";
import { ProfileExperienceSection } from "@/components/profile/ProfileExperienceSection";
import { ProfileCertificatesSection } from "@/components/profile/ProfileCertificatesSection";
import { ProfileImageUpload } from "@/components/profile/ProfileImageUpload";
import { useBasicInfo } from "./useBasicInfo";
import { Reel } from "@/components/social/reels/ReelsData";
import { v4 as uuidv4 } from "uuid";

interface BasicInfoChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BasicInfoChangeModal({ open, onOpenChange }: BasicInfoChangeModalProps) {
  const { formData, setFormData, handleSubmit } = useBasicInfo();
  
  // 프로필 데이터
  const [profileData, setProfileData] = useState<Reel | null>(null);
  const [instruments, setInstruments] = useState<string[]>([]);
  const [newInstrument, setNewInstrument] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState("");
  const [education, setEducation] = useState<{id: string; institution: string; degree: string; year: string}[]>([]);
  const [experience, setExperience] = useState<{id: string; company: string; position: string; period: string}[]>([]);
  const [certificates, setCertificates] = useState<{id: string; name: string; issuer: string; year: string}[]>([]);
  const [profileImage, setProfileImage] = useState<string>("/user-avatar.png");
  const [bio, setBio] = useState("");
  
  // 프로필 데이터 로드
  useEffect(() => {
    if (open) {
      const userDataStr = sessionStorage.getItem('userData');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setFormData({
          ...formData,
          nickname: userData.nickname || "",
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
      }
      
      // 저장된 프로필 데이터 로드
      const profileDataStr = localStorage.getItem('userProfileData');
      if (profileDataStr) {
        try {
          const parsedProfileData = JSON.parse(profileDataStr);
          setProfileData(parsedProfileData);
          setInstruments(parsedProfileData.instruments || []);
          setGenres(parsedProfileData.genres || []);
          setEducation(parsedProfileData.education || []);
          setExperience(parsedProfileData.experience || []);
          setCertificates(parsedProfileData.certificates || []);
          setBio(parsedProfileData.bio || "");
          
          // 프로필 이미지가 있으면 불러오기
          const savedProfileImage = localStorage.getItem('userProfileImage');
          if (savedProfileImage) {
            setProfileImage(savedProfileImage);
          }
        } catch (error) {
          console.error('프로필 데이터 파싱 오류:', error);
        }
      }
    }
  }, [open]);
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 기본 사용자 정보 저장
    handleSubmit(e);
    
    // 프로필 정보 저장
    const updatedProfileData: Reel = {
      id: profileData?.id || "current-user",
      user: formData.nickname,
      userHandle: formData.email?.split('@')[0] || "user",
      avatar: formData.nickname?.charAt(0) || "사",
      bio: bio,
      time: "",
      content: "",
      likes: 0,
      comments: 0,
      isProfessional: sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData') || '{}').isProfessional || false : false,
      instruments: instruments,
      genres: genres,
      education: education,
      experience: experience,
      certificates: certificates,
      imageUrl: profileImage
    };
    
    // 로컬 스토리지에 프로필 데이터 저장
    localStorage.setItem('userProfileData', JSON.stringify(updatedProfileData));
    
    // 프로필 이미지 저장
    if (profileImage) {
      localStorage.setItem('userProfileImage', profileImage);
    }
    
    // SNS 프로필 페이지에서 사용할 수 있도록 프로필 데이터 저장
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>기본 정보 변경</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* 프로필 이미지 업로드 */}
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              avatarFallback={formData.nickname?.charAt(0) || "사"}
            />
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                  disabled
                />
              </div>
              
              <div>
                <Label htmlFor="phone">연락처</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">소개</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1"
                  placeholder="자신을 소개해주세요"
                />
              </div>
            </div>
            
            {/* 악기 & 장르 */}
            <ProfileTagsSection
              title="악기"
              tags={instruments}
              setTags={setInstruments}
              newTag={newInstrument}
              setNewTag={setNewInstrument}
              placeholder="악기 추가"
            />
            
            <ProfileTagsSection
              title="장르"
              tags={genres}
              setTags={setGenres}
              newTag={newGenre}
              setNewTag={setNewGenre}
              placeholder="장르 추가"
            />
            
            {/* 학력, 경력, 자격증 섹션 */}
            <ProfileEducationSection
              education={education}
              setEducation={setEducation}
            />
            
            <ProfileExperienceSection
              experience={experience}
              setExperience={setExperience}
            />
            
            <ProfileCertificatesSection
              certificates={certificates}
              setCertificates={setCertificates}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
