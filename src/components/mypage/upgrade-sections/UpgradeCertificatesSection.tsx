
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface UpgradeCertificatesSectionProps {
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

export function UpgradeCertificatesSection({
  certificates,
  setCertificates
}: UpgradeCertificatesSectionProps) {
  const addCertificate = () => {
    setCertificates([...certificates, { id: uuidv4(), name: "", issuer: "", year: "" }]);
  };

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter(item => item.id !== id));
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    setCertificates(
      certificates.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>자격증</Label>
        <Button 
          type="button" 
          size="sm" 
          variant="outline" 
          onClick={addCertificate}
        >
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </div>
      
      {certificates.map((cert, index) => (
        <div key={cert.id} className="space-y-2 p-3 border rounded-md">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">자격증 정보 {index + 1}</Label>
            {index > 0 && (
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                onClick={() => removeCertificate(cert.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`name-${cert.id}`} className="text-xs">자격증명</Label>
              <Input
                id={`name-${cert.id}`}
                value={cert.name}
                onChange={(e) => updateCertificate(cert.id, "name", e.target.value)}
                placeholder="피아노 교사 자격증"
              />
            </div>
            <div>
              <Label htmlFor={`issuer-${cert.id}`} className="text-xs">발급기관</Label>
              <Input
                id={`issuer-${cert.id}`}
                value={cert.issuer}
                onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
                placeholder="한국음악교육협회"
              />
            </div>
            <div>
              <Label htmlFor={`year-${cert.id}`} className="text-xs">취득연도</Label>
              <Input
                id={`year-${cert.id}`}
                value={cert.year}
                onChange={(e) => updateCertificate(cert.id, "year", e.target.value)}
                placeholder="2019"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
