
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProfileTagsSectionProps {
  title: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  newTag: string;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export const ProfileTagsSection = ({
  title,
  tags,
  setTags,
  newTag,
  setNewTag,
  placeholder
}: ProfileTagsSectionProps) => {
  const addTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <FormLabel>{title}</FormLabel>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(index)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          className="flex-1"
        />
        <Button type="button" onClick={addTag} size="sm">
          추가
        </Button>
      </div>
    </div>
  );
};
