import React from 'react';
import { Target, Star, User } from 'lucide-react';
import { TopScorer } from '../data/statisticsData';

interface ShareablePlayerCardProps {
  player: TopScorer;
}

export default function ShareablePlayerCard({ player }: ShareablePlayerCardProps) {
  return (
    <div className="fixed top-[-9999px] left-[-9999px] opacity-0 pointer-events-none -z-50">
      <div 
        id={`shareable-player-${player.name.replace(/\s+/g, '-')}`}
        className="w-[1080px] h-[1080px] bg-[#FFFFFF] border-[24px] border-black flex flex-col justify-between overflow-hidden relative"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background Graphic Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 4px, transparent 4px, transparent 12px)' }}>
      </div>

      {/* Header / Watermark */}
      <div className="flex justify-between items-center p-8 border-b-[8px] border-black bg-black">
        <h2 className="text-3xl font-black uppercase tracking-widest text-primary flex items-center gap-4">
          <Star className="h-8 w-8 fill-primary" />
          GARUDA STATS
        </h2>
        <p className="text-2xl font-black italic bg-primary text-black px-6 py-2 border-4 border-black">
          TOP SKOR
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 relative">
        <div className="w-[260px] h-[260px] mb-8 border-[8px] border-black shadow-[16px_16px_0px_0px_rgba(0,255,133,1)] bg-white flex items-center justify-center">
          <User className="w-[140px] h-[140px] text-black" />
        </div>
        
        <h1 className="text-[90px] font-black uppercase tracking-tighter leading-tight mb-4 text-black" style={{ textShadow: '6px 6px 0px rgba(0,255,133,0.3)' }}>
          {player.name}
        </h1>
        <p className="text-3xl font-black uppercase tracking-widest text-slate-500 mb-8">
          {player.club} • {player.season}
        </p>

        <div className="flex gap-8">
          <div className="bg-primary text-black px-16 py-8 border-[8px] border-black transform rotate-2 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-black uppercase tracking-widest mb-2 opacity-80">GOL DICETAK</p>
            <p className="text-[140px] font-black leading-none flex items-center gap-6">
              {player.goals} <Target className="h-24 w-24 text-black" />
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white p-6 flex justify-center items-center border-t-[8px] border-primary">
        <p className="text-2xl font-black tracking-widest uppercase">STATISTIK RESMI • DIBUAT DENGAN GARUDA STATS</p>
      </div>
      </div>
    </div>
  );
}
