import React, { useEffect } from "react";
import { X, User, Flag, Trophy, Target } from "lucide-react";
import { TopScorer } from "../data/statisticsData";
import { soundEngine } from "../utils/soundEngine";

interface PlayerDetailModalProps {
  player: TopScorer | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ player, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playThud();
    }
  }, [isOpen]);

  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] animate-fade-in z-10">
        
        {/* Header */}
        <div className="bg-[#00FF85] border-b-4 border-black p-4 md:p-6 flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 bg-black flex items-center justify-center border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <User className="h-8 w-8 text-[#00FF85]" />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-black">
                {player.name}
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black uppercase border border-black">
                  {player.position || "Striker"}
                </span>
                <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase border border-black flex items-center gap-1">
                  <Flag className="h-3 w-3" />
                  {player.nationality || "Indonesia"}
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="bg-white text-black border-2 border-black p-1 hover:bg-black hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#F2F2F2] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1 flex items-center gap-1">
                <Target className="h-3 w-3" /> Catatan Gol
              </p>
              <p className="text-4xl font-black italic">{player.goals}</p>
              <p className="text-xs font-bold mt-1">Musim: {player.season}</p>
            </div>
            
            <div className="bg-[#F2F2F2] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1 flex items-center gap-1">
                <Trophy className="h-3 w-3" /> Klub Representasi
              </p>
              <p className="text-xl font-black uppercase leading-tight">{player.club}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase border-b-2 border-black pb-2">Profil Singkat</h3>
            <p className="text-sm font-medium leading-relaxed">
              {player.description || `${player.name} adalah salah satu legenda pencetak gol terbanyak di kompetisi kasta tertinggi sepak bola Indonesia. Ketajamannya di depan gawang membuatnya dikenang sebagai striker menakutkan bagi pertahanan lawan.`}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayerDetailModal;
