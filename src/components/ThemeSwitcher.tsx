import { useState } from "react";
import { Palette, Lock } from "lucide-react";
import { soundEngine } from "../utils/soundEngine";
import { useSettingsStore } from "../store/useSettingsStore";
import { usePlayerStore } from "../store/usePlayerStore";

const THEMES = [
  { id: 'default', color: '#00FF85', name: 'Neon Green', requiredLevel: 1 },
  { id: 'orange', color: '#FF5722', name: 'Construction Orange', requiredLevel: 3 },
  { id: 'pink', color: '#FF00FF', name: 'Cyberpunk Pink', requiredLevel: 5 },
  { id: 'yellow', color: '#FFEA00', name: 'Caution Yellow', requiredLevel: 7 }
];

export default function ThemeSwitcher() {
  const { theme: activeTheme, setTheme } = useSettingsStore();
  const { level } = usePlayerStore();
  const [isOpen, setIsOpen] = useState(false);

  const applyTheme = (themeId: string) => {
    if (themeId === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
  };

  const selectTheme = (themeId: string, requiredLevel: number) => {
    if (level < requiredLevel) {
      soundEngine.playError();
      return;
    }
    soundEngine.playClick();
    setTheme(themeId);
    applyTheme(themeId);
    setIsOpen(false);
  };

  const activeColor = THEMES.find(t => t.id === activeTheme)?.color || 'var(--theme-primary)';

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white border-4 border-black p-2 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fade-in origin-bottom-right">
          {THEMES.map((theme) => {
            const isLocked = level < theme.requiredLevel;
            return (
              <button
                key={theme.id}
                onClick={() => selectTheme(theme.id, theme.requiredLevel)}
                onMouseEnter={() => !isLocked && soundEngine.playHover()}
                className={`w-10 h-10 border-2 transition-transform relative flex items-center justify-center ${
                  isLocked ? 'grayscale opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'
                } ${
                  activeTheme === theme.id ? 'border-black border-4' : 'border-black'
                }`}
                style={{ backgroundColor: theme.color }}
                title={isLocked ? `Terbuka di Level ${theme.requiredLevel}` : theme.name}
                aria-label={isLocked ? `Tema terkunci, butuh level ${theme.requiredLevel}` : `Ubah tema ke ${theme.name}`}
              >
                {isLocked && <Lock className="w-4 h-4 text-black mix-blend-overlay opacity-80" />}
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        className="w-[56px] h-[56px] border-4 border-black flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
        style={{ backgroundColor: activeColor }}
        aria-label="Pilih Tema"
      >
        <Palette className="w-6 h-6 text-black relative z-10 mix-blend-difference" />
      </button>
    </div>
  );
}
