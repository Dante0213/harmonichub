
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddressSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function AddressSearch({ value, onChange }: AddressSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 테스트 주소 목록 (실제 구현에서는 카카오/네이버 주소 API 등을 사용)
  const testAddresses = [
    "서울특별시 강남구 테헤란로 152",
    "서울특별시 서초구 반포대로 58",
    "서울특별시 마포구 와우산로 94",
    "경기도 성남시 분당구 판교역로 235",
    "부산광역시 해운대구 센텀중앙로 79"
  ];

  const handleSearch = () => {
    if (!searchTerm) return;
    
    setLoading(true);
    
    // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다
    // 여기서는 테스트 데이터로 대체합니다
    setTimeout(() => {
      const results = testAddresses.filter(addr => 
        addr.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
    }, 500);
  };

  const handleSelect = (address: string) => {
    onChange(address);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input value={value} disabled placeholder="주소 검색 버튼을 클릭하세요" />
        <Button type="button" onClick={() => setOpen(true)}>
          주소 검색
        </Button>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>주소 검색</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Input 
                placeholder="도로명, 지번 주소를 입력하세요" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <Button type="button" onClick={handleSearch} disabled={loading}>
                {loading ? "검색 중..." : "검색"}
              </Button>
            </div>
            
            <div className="border rounded h-60 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  {loading ? "검색 중..." : "검색 결과가 표시됩니다"}
                </div>
              ) : (
                <ul className="divide-y">
                  {searchResults.map((address, index) => (
                    <li 
                      key={index} 
                      className="p-3 cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => handleSelect(address)}
                    >
                      {address}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              실제 서비스에서는 카카오 또는 네이버 주소 API를 연동하여 정확한 주소 검색이 가능합니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
