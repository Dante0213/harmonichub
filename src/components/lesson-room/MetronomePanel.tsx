
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface MetronomePanelProps {
  isActive: boolean;
  tempo: number;
  volume: number;
  onToggle: () => void;
  onTempoChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

export function MetronomePanel({
  isActive,
  tempo,
  volume,
  onToggle,
  onTempoChange,
  onVolumeChange
}: MetronomePanelProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-4">메트로놈</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">템포:</span>
            <span className="text-sm font-medium">{tempo} BPM</span>
          </div>
          <Slider 
            value={[tempo]} 
            min={40} 
            max={220} 
            step={1}
            onValueChange={(value) => onTempoChange(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">음량:</span>
            <span className="text-sm font-medium">{volume}%</span>
          </div>
          <Slider 
            value={[volume]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(value) => onVolumeChange(value[0])}
          />
        </div>
        
        <Button 
          onClick={onToggle}
          variant={isActive ? "destructive" : "default"}
          className="w-full"
        >
          {isActive ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              중지
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              시작
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
