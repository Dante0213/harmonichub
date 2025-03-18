
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bluetooth, Check, X } from "lucide-react";

interface MidiDevice {
  id: string;
  name: string;
  manufacturer: string;
  connected: boolean;
}

export function MidiConnectionPanel() {
  const [midiDevices, setMidiDevices] = useState<MidiDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanForDevices = () => {
    setIsScanning(true);
    toast.info("MIDI 장치 스캔 중...");

    // 실제 구현에서는 navigator.requestMIDIAccess()를 사용하여 MIDI 장치 접근
    // 여기서는 데모를 위해 타이머 후 가상 장치 목록 표시
    setTimeout(() => {
      const mockDevices: MidiDevice[] = [
        { id: "device1", name: "Yamaha P-125", manufacturer: "Yamaha", connected: false },
        { id: "device2", name: "Roland FP-30", manufacturer: "Roland", connected: false }
      ];
      setMidiDevices(mockDevices);
      setIsScanning(false);
      toast.success("MIDI 장치 스캔 완료");
    }, 1500);
  };

  const handleConnectDevice = (deviceId: string) => {
    setMidiDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, connected: !device.connected }
          : device
      )
    );
    
    const device = midiDevices.find(d => d.id === deviceId);
    if (device) {
      if (!device.connected) {
        toast.success(`${device.name} 연결됨`);
      } else {
        toast.info(`${device.name} 연결 해제됨`);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="border rounded-md p-3 mb-4">
        <h3 className="text-sm font-medium mb-2">MIDI 장치 연결</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mb-3" 
          onClick={handleScanForDevices}
          disabled={isScanning}
        >
          <Bluetooth className="h-4 w-4 mr-2" />
          {isScanning ? "스캔 중..." : "MIDI 장치 스캔하기"}
        </Button>
        
        {midiDevices.length > 0 && (
          <div className="space-y-2 mt-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">발견된 장치</p>
            {midiDevices.map(device => (
              <div key={device.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div>
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.manufacturer}</p>
                </div>
                <Button 
                  variant={device.connected ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleConnectDevice(device.id)}
                >
                  {device.connected ? (
                    <>
                      <Check className="h-3 w-3 mr-1" /> 연결됨
                    </>
                  ) : "연결하기"}
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-2">
          USB로 연결된 MIDI 키보드를 감지합니다
        </p>
      </div>
    </div>
  );
}
