import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { X, Plus, Upload } from "lucide-react";
import { Reel } from "@/components/social/reels/ReelsData";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    onClose();
  };

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

  const addInstrument = () => {
    if (newInstrument.trim() !== "") {
      setInstruments([...instruments, newInstrument.trim()]);
      setNewInstrument("");
    }
  };

  const removeInstrument = (index: number) => {
    setInstruments(instruments.filter((_, i) => i !== index));
  };

  const addGenre = () => {
    if (newGenre.trim() !== "") {
      setGenres([...genres, newGenre.trim()]);
      setNewGenre("");
    }
  };

  const removeGenre = (index: number) => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([
      ...education, 
      {id: uuidv4(), institution: "", degree: "", year: ""}
    ]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setEducation(education.map(item => 
      item.id === id ? {...item, [field]: value} : item
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(item => item.id !== id));
  };

  const addExperience = () => {
    setExperience([
      ...experience, 
      {id: uuidv4(), company: "", position: "", period: ""}
    ]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setExperience(experience.map(item => 
      item.id === id ? {...item, [field]: value} : item
    ));
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(item => item.id !== id));
  };

  const addCertificate = () => {
    setCertificates([
      ...certificates, 
      {id: uuidv4(), name: "", issuer: "", year: ""}
    ]);
  };

  const updateCertificate = (id: string, field: string, value: string) => {
    setCertificates(certificates.map(item => 
      item.id === id ? {...item, [field]: value} : item
    ));
  };

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter(item => item.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <Avatar className="h-24 w-24">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={userData.user} />
                ) : (
                  <AvatarFallback className="text-2xl">{userData.avatar}</AvatarFallback>
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

            <div className="space-y-4">
              <FormLabel>악기</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {instruments.map((instrument, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {instrument}
                    <button 
                      type="button" 
                      onClick={() => removeInstrument(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="악기 추가"
                  value={newInstrument}
                  onChange={e => setNewInstrument(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addInstrument} size="sm">
                  추가
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <FormLabel>장르</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {genres.map((genre, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {genre}
                    <button 
                      type="button" 
                      onClick={() => removeGenre(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="장르 추가"
                  value={newGenre}
                  onChange={e => setNewGenre(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addGenre} size="sm">
                  추가
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>학력</FormLabel>
                <Button 
                  type="button" 
                  onClick={addEducation} 
                  size="sm" 
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" /> 학력 추가
                </Button>
              </div>
              
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md">
                  <div className="col-span-5">
                    <FormLabel className="text-xs">기관/학교</FormLabel>
                    <Input
                      value={edu.institution}
                      onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="기관/학교 이름"
                    />
                  </div>
                  <div className="col-span-4">
                    <FormLabel className="text-xs">학위/전공</FormLabel>
                    <Input
                      value={edu.degree}
                      onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="학위/전공"
                    />
                  </div>
                  <div className="col-span-2">
                    <FormLabel className="text-xs">기간</FormLabel>
                    <Input
                      value={edu.year}
                      onChange={e => updateEducation(edu.id, 'year', e.target.value)}
                      placeholder="기간"
                    />
                  </div>
                  <div className="col-span-1 flex items-end justify-center h-full">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeEducation(edu.id)}
                      className="h-9 w-9 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>경력</FormLabel>
                <Button 
                  type="button" 
                  onClick={addExperience} 
                  size="sm" 
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" /> 경력 추가
                </Button>
              </div>
              
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md">
                  <div className="col-span-5">
                    <FormLabel className="text-xs">회사/단체</FormLabel>
                    <Input
                      value={exp.company}
                      onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="회사/단체 이름"
                    />
                  </div>
                  <div className="col-span-4">
                    <FormLabel className="text-xs">직책/역할</FormLabel>
                    <Input
                      value={exp.position}
                      onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="직책/역할"
                    />
                  </div>
                  <div className="col-span-2">
                    <FormLabel className="text-xs">기간</FormLabel>
                    <Input
                      value={exp.period}
                      onChange={e => updateExperience(exp.id, 'period', e.target.value)}
                      placeholder="기간"
                    />
                  </div>
                  <div className="col-span-1 flex items-end justify-center h-full">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeExperience(exp.id)}
                      className="h-9 w-9 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>자격증</FormLabel>
                <Button 
                  type="button" 
                  onClick={addCertificate} 
                  size="sm" 
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" /> 자격증 추가
                </Button>
              </div>
              
              {certificates.map((cert) => (
                <div key={cert.id} className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md">
                  <div className="col-span-5">
                    <FormLabel className="text-xs">자격증 이름</FormLabel>
                    <Input
                      value={cert.name}
                      onChange={e => updateCertificate(cert.id, 'name', e.target.value)}
                      placeholder="자격증 이름"
                    />
                  </div>
                  <div className="col-span-4">
                    <FormLabel className="text-xs">발급 기관</FormLabel>
                    <Input
                      value={cert.issuer}
                      onChange={e => updateCertificate(cert.id, 'issuer', e.target.value)}
                      placeholder="발급 기관"
                    />
                  </div>
                  <div className="col-span-2">
                    <FormLabel className="text-xs">취득년도</FormLabel>
                    <Input
                      value={cert.year}
                      onChange={e => updateCertificate(cert.id, 'year', e.target.value)}
                      placeholder="취득년도"
                    />
                  </div>
                  <div className="col-span-1 flex items-end justify-center h-full">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCertificate(cert.id)}
                      className="h-9 w-9 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

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
