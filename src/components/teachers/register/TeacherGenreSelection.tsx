
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TeacherGenreSelectionProps {
  musicTypes: string[];
  handleMusicTypeChange: (value: string) => void;
}

export function TeacherGenreSelection({
  musicTypes,
  handleMusicTypeChange
}: TeacherGenreSelectionProps) {
  return (
    <div>
      <Label className="mb-2 block">음악 장르</Label>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="classic"
            checked={musicTypes.includes("클래식")}
            onCheckedChange={() => handleMusicTypeChange("클래식")}
          />
          <label
            htmlFor="classic"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            클래식
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="popular"
            checked={musicTypes.includes("실용음악")}
            onCheckedChange={() => handleMusicTypeChange("실용음악")}
          />
          <label
            htmlFor="popular"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            실용음악
          </label>
        </div>
      </div>
    </div>
  );
}
