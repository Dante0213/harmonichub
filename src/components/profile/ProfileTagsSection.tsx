
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { KeyboardEvent } from "react";

interface ProfileTagsSectionProps {
  title: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
  placeholder: string;
}

export function ProfileTagsSection({
  title,
  tags,
  setTags,
  newTag,
  setNewTag,
  placeholder
}: ProfileTagsSectionProps) {
  const handleAddTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {title}
        </label>
      </div>
      
      <TagList 
        tags={tags} 
        onRemoveTag={handleRemoveTag} 
      />
      
      <TagInput 
        newTag={newTag}
        setNewTag={setNewTag}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onAddTag={handleAddTag}
      />
    </div>
  );
}

interface TagListProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

function TagList({ tags, onRemoveTag }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md text-sm"
        >
          <span>{tag}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-secondary/80"
            onClick={() => onRemoveTag(tag)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}

interface TagInputProps {
  newTag: string;
  setNewTag: (tag: string) => void;
  placeholder: string;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
}

function TagInput({ newTag, setNewTag, placeholder, onKeyDown, onAddTag }: TagInputProps) {
  return (
    <div className="flex gap-2">
      <Input
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="button" onClick={onAddTag}>
        추가
      </Button>
    </div>
  );
}
