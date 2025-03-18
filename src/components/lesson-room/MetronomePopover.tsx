
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MetronomePopoverProps {
  metronomeActive: boolean;
  metronomeTempo: number;
  metronomeVolume: number;
  setMetronomeTempo: (tempo: number) => void;
  setMetronomeVolume: (volume: number) => void;
  onToggleMetronome: () => void;
}

export function MetronomePopover({
  metronomeActive,
  metronomeTempo,
  metronomeVolume,
  setMetronomeTempo,
  setMetronomeVolume,
  onToggleMetronome
}: MetronomePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={metronomeActive ? "bg-primary/20" : ""}
        >
          {/* 메트로놈 아이콘 SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 2 4 10h8a2 2 0 0 1 2 2c0 1.5-1.5 2-2 2h-8l-4 8" />
            <path d="M18 6 7 10" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">메트로놈</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">템포: {metronomeTempo} BPM</span>
              <Button 
                variant={metronomeActive ? "destructive" : "default"} 
                size="sm" 
                onClick={onToggleMetronome}
              >
                {metronomeActive ? "중지" : "시작"}
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>템포</span>
                  <span>{metronomeTempo} BPM</span>
                </div>
                <Slider 
                  min={40} 
                  max={208} 
                  step={1} 
                  value={[metronomeTempo]} 
                  onValueChange={(value) => setMetronomeTempo(value[0])} 
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>음량</span>
                  <span>{metronomeVolume}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={1} 
                  value={[metronomeVolume]} 
                  onValueChange={(value) => setMetronomeVolume(value[0])} 
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
