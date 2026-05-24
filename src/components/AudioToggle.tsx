import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function AudioToggle() {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  // Sync state if it somehow changes externally
  useEffect(() => {
    setIsMuted(soundEngine.isMuted);
  }, []);

  const handleToggle = () => {
    soundEngine.toggleMute();
    setIsMuted(soundEngine.isMuted);
  };

  return (
    <button
      onClick={handleToggle}
      title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
      aria-label={isMuted ? "Aktifkan efek suara" : "Senyapkan efek suara"}
      className={`fixed bottom-6 right-6 z-50 p-3 border-4 border-black transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 ${
        isMuted 
          ? 'bg-rose-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
          : 'bg-primary text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
      }`}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </button>
  );
}
