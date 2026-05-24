import React from 'react';
import { Award } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

export default function PlayerBadge() {
  const { level, xp } = usePlayerStore();

  const getRankByXP = (currentLevel: number) => {
    if (currentLevel >= 10) return { title: "LEGENDA LIGA!", color: "var(--theme-primary)" };
    if (currentLevel >= 7) return { title: "KAPTEN TIM", color: "#3B82F6" };
    if (currentLevel >= 5) return { title: "PEMAIN INTI", color: "#EAB308" };
    if (currentLevel >= 3) return { title: "PEMAIN CADANGAN", color: "#F97316" };
    return { title: "PEMAIN MAGANG", color: "#EF4444" };
  };

  const rank = getRankByXP(level);

  return (
    <div className="flex items-center gap-3 bg-black border-4 border-black shadow-[4px_4px_0px_0px_var(--theme-primary)] px-3 py-1.5 select-none hover:-translate-y-1 transition-transform cursor-default z-50">
      <div 
        className="h-8 w-8 border-2 border-black flex items-center justify-center shrink-0"
        style={{ backgroundColor: rank.color }}
      >
        <Award className="h-5 w-5 text-black" />
      </div>
      <div className="flex flex-col justify-center leading-none pr-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PANGKAT (LVL {level})</span>
        <span className="text-xs sm:text-sm font-black text-white">{rank.title}</span>
      </div>
    </div>
  );
}
