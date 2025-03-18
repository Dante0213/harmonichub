
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function AddressSearch({ value, onChange, className }: AddressSearchProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 모달 토글
  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    if (!isSearchModalOpen) {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  // 주소 검색 시뮬레이션
  const searchAddress = () => {
    if (searchTerm.trim() === "") return;

    // 실제로는 API 호출
    setTimeout(() => {
      const mockResults = [
        `${searchTerm} 관련 주소 1`,
        `${searchTerm} 관련 주소 2`,
        `${searchTerm} 중앙로 123`,
        `${searchTerm} 번화가 456`,
        `${searchTerm} 건물 사거리`
      ];
      setSearchResults(mockResults);
    }, 300);
  };

  // 주소 선택 핸들러
  const selectAddress = (address: string) => {
    onChange(address);
    setIsSearchModalOpen(false);
  };

  // 직접 입력 값 변경 핸들러 (추가된 부분)
  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            placeholder="주소를 입력하세요"
            value={value}
            onChange={handleDirectInput}
            className="pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button type="button" variant="outline" onClick={toggleSearchModal}>
          <Search className="h-4 w-4 mr-1" /> 검색
        </Button>
      </div>

      {isSearchModalOpen && (
        <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
          <div className="p-3 border-b">
            <div className="flex gap-2">
              <Input
                placeholder="지역명, 도로명, 건물명 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="button" variant="default" onClick={searchAddress}>
                검색
              </Button>
            </div>
          </div>
          
          <div className="max-h-[200px] overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((address, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-accent cursor-pointer"
                    onClick={() => selectAddress(address)}
                  >
                    {address}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-center text-muted-foreground">
                {searchTerm ? "검색 결과가 없습니다" : "검색어를 입력해주세요"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
