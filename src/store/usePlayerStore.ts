import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
  xp: number;
  level: number;
  highScore: number;
  gamesPlayed: number;
  addXp: (amount: number) => void;
  updateHighScore: (score: number) => void;
  incrementGamesPlayed: () => void;
}

const calculateLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      highScore: 0,
      gamesPlayed: 0,
      addXp: (amount) => 
        set((state) => {
          const newXp = state.xp + amount;
          const newLevel = calculateLevel(newXp);
          return { xp: newXp, level: newLevel };
        }),
      updateHighScore: (score) =>
        set((state) => ({
          highScore: Math.max(state.highScore, score),
        })),
      incrementGamesPlayed: () =>
        set((state) => ({ gamesPlayed: state.gamesPlayed + 1 })),
    }),
    {
      name: 'garuda-player-storage', // name of item in the storage (must be unique)
    }
  )
);
