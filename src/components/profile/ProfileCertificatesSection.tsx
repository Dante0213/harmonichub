
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface ProfileCertificatesSectionProps {
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

export const ProfileCertificatesSection = ({ certificates, setCertificates }: ProfileCertificatesSectionProps) => {
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
  );
};
