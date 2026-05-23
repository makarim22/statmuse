import React from 'react';
import { Trophy, Star } from 'lucide-react';
import ClubShield from './ClubShield';

interface ShareableClubCardProps {
  clubName: string;
  titles: number;
  runnerUps: number;
  primaryColor?: string;
  secondaryColor?: string;
  symbol?: string;
}

export default function ShareableClubCard({ 
  clubName, 
  titles, 
  runnerUps,
  primaryColor = '#00FF85',
  secondaryColor = '#000000',
  symbol = 'star'
}: ShareableClubCardProps) {
  // We use inline styles heavily here to ensure html-to-image captures them perfectly, 
  // though Tailwind works fine if classes are loaded.
  return (
    <div className="fixed top-[-9999px] left-[-9999px] opacity-0 pointer-events-none -z-50">
      <div 
        id={`shareable-club-${clubName.replace(/\s+/g, '-')}`}
        className="w-[1080px] h-[1080px] bg-[#FFFFFF] border-[24px] border-black flex flex-col justify-between overflow-hidden relative"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background Graphic Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '48px 48px' }}>
      </div>

      {/* Header / Watermark */}
      <div className="flex justify-between items-center p-8 border-b-[8px] border-black" style={{ backgroundColor: primaryColor }}>
        <h2 className="text-3xl font-black uppercase tracking-widest text-black flex items-center gap-4">
          <Star className="h-8 w-8 fill-black" />
          GARUDA STATS
        </h2>
        <p className="text-2xl font-black italic bg-black text-white px-6 py-2 border-4 border-white">
          LIGA INDONESIA
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 relative">
        <div className="w-[320px] h-[320px] mb-8 transform -rotate-3 border-8 border-black shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] bg-white flex items-center justify-center">
          <div className="scale-[2.5]">
            <ClubShield symbol={symbol} primaryColor={primaryColor} secondaryColor={secondaryColor} />
          </div>
        </div>
        
        <h1 className="text-[100px] font-black uppercase tracking-tighter leading-none mb-8 text-black" style={{ textShadow: '6px 6px 0px rgba(0,0,0,0.1)' }}>
          {clubName}
        </h1>

        <div className="flex gap-8">
          <div className="bg-black text-white px-12 py-6 border-[8px] border-[#00FF85] transform rotate-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]">
            <p className="text-2xl font-black uppercase tracking-widest mb-1 opacity-80">JUARA LIGA</p>
            <p className="text-[120px] font-black leading-none flex items-center gap-4">
              {titles} <Trophy className="h-20 w-20 text-[#00FF85]" />
            </p>
          </div>
          {runnerUps > 0 && (
            <div className="bg-white text-black px-12 py-6 border-[8px] border-black transform -rotate-2 shadow-[12px_12px_0px_0px_rgba(0,255,133,1)]">
              <p className="text-2xl font-black uppercase tracking-widest mb-1 opacity-60">RUNNER-UP</p>
              <p className="text-[120px] font-black leading-none text-slate-400">
                {runnerUps}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white p-6 flex justify-center items-center">
        <p className="text-2xl font-black tracking-widest uppercase">STATISTIK RESMI • DIBUAT DENGAN GARUDA STATS</p>
      </div>
      </div>
    </div>
  );
}
