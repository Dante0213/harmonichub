
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TeacherFiltersProps {
  categoryFilter: string | null;
  setCategoryFilter: (value: string | null) => void;
  specialtyFilter: string | null;
  setSpecialtyFilter: (value: string | null) => void;
  specialties: string[];
}

export function TeacherFilters({ 
  categoryFilter, 
  setCategoryFilter, 
  specialtyFilter, 
  setSpecialtyFilter,
  specialties 
}: TeacherFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <ToggleGroup type="single" value={categoryFilter || ""} onValueChange={(value) => setCategoryFilter(value || null)}>
        <ToggleGroupItem value="클래식" className="text-sm">클래식</ToggleGroupItem>
        <ToggleGroupItem value="실용음악" className="text-sm">실용음악</ToggleGroupItem>
      </ToggleGroup>
      
      <Select onValueChange={(value) => setSpecialtyFilter(value === "all" ? null : value)} value={specialtyFilter || "all"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="전공 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 전공</SelectItem>
          {specialties.map(specialty => (
            <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
