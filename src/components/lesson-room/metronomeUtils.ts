
export const createMetronomeClick = (
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  metronomeVolume: number
) => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  const audioContext = audioContextRef.current;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 800;
  gainNode.gain.value = metronomeVolume / 100;
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.05);
};
