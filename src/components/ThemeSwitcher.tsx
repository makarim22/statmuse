import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { soundEngine } from "../utils/soundEngine";

const THEMES = [
  { id: 'default', color: 'var(--theme-primary)', name: 'Neon Green' },
  { id: 'orange', color: '#FF5722', name: 'Construction Orange' },
  { id: 'pink', color: '#FF00FF', name: 'Cyberpunk Pink' },
  { id: 'yellow', color: '#FFEA00', name: 'Caution Yellow' }
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('garuda_theme') || 'default';
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    } catch (e) {}
  }, []);

  const applyTheme = (themeId: string) => {
    if (themeId === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
  };

  const selectTheme = (themeId: string) => {
    soundEngine.playClick();
    setActiveTheme(themeId);
    applyTheme(themeId);
    try {
      localStorage.setItem('garuda_theme', themeId);
    } catch (e) {}
    setIsOpen(false);
  };

  const activeColor = THEMES.find(t => t.id === activeTheme)?.color || 'var(--theme-primary)';

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white border-4 border-black p-2 flex flex-col gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fade-in origin-bottom-right">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`w-10 h-10 border-2 transition-transform hover:-translate-y-1 ${
                activeTheme === theme.id ? 'border-black border-4' : 'border-black'
              }`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
              aria-label={`Ubah tema ke ${theme.name}`}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        className="w-[56px] h-[56px] border-4 border-black flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
        style={{ backgroundColor: activeColor }}
        aria-label="Pilih Tema"
      >
        <Palette className="w-6 h-6 text-black relative z-10 mix-blend-difference" />
      </button>
    </div>
  );
}
