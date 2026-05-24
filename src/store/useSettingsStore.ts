import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { soundEngine } from '../utils/soundEngine';

interface SettingsState {
  theme: string;
  isMuted: boolean;
  setTheme: (themeId: string) => void;
  toggleMute: () => void;
  setMute: (muted: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'default',
      isMuted: false, // Default unmuted
      setTheme: (themeId) => set({ theme: themeId }),
      toggleMute: () => set((state) => {
        const newMuted = !state.isMuted;
        if (newMuted) {
          soundEngine.mute();
        } else {
          soundEngine.unmute();
        }
        return { isMuted: newMuted };
      }),
      setMute: (muted) => set(() => {
        if (muted) {
          soundEngine.mute();
        } else {
          soundEngine.unmute();
        }
        return { isMuted: muted };
      }),
    }),
    {
      name: 'garuda-settings-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Sync with sound engine on mount
          if (state.isMuted) {
            soundEngine.mute();
          } else {
            soundEngine.unmute();
          }
          
          // Apply theme on mount
          if (state.theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
          } else {
            document.documentElement.setAttribute('data-theme', state.theme);
          }
        }
      }
    }
  )
);
