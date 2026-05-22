import React from "react";
import { topScorers, leagueRecords, leagueTrivia } from "../data/statisticsData";
import { Award, Target, Zap, BookOpen } from "lucide-react";

const AllTimeStatsView: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in" id="all_time_stats_view">
      {/* Header */}
      <div className="border-b-4 border-black pb-5">
        <span className="bg-[#00FF85] px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-widest inline-block mb-2">
          Pusat Data Sejarah
        </span>
        <h2 className="text-4xl font-black italic tracking-tighter uppercase">
          Statistik Sepanjang Masa
        </h2>
        <p className="text-sm font-bold text-slate-500 max-w-3xl mt-1">
          Kumpulan rekor tertinggi, deretan pencetak gol terbanyak (top skor), serta trivia menarik di kancah Liga Indonesia.
        </p>
      </div>

      {/* Top Scorers Grid */}
      <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
          <div className="h-10 w-10 bg-black flex items-center justify-center border border-black transform rotate-3">
            <Target className="h-5 w-5 text-[#00FF85]" />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase italic leading-none">Pencetak Gol Terbanyak</h3>
            <p className="text-xs font-bold text-slate-500 uppercase">Rekor gol terbanyak dalam 1 musim</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#F2F2F2] border-b-2 border-black text-xs font-black uppercase tracking-wider">
                <th className="p-3 border-r border-black/20 w-12 text-center">#</th>
                <th className="p-3 border-r border-black/20">Pemain</th>
                <th className="p-3 border-r border-black/20">Klub</th>
                <th className="p-3 border-r border-black/20">Musim</th>
                <th className="p-3 text-right">Gol</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((scorer, idx) => (
                <tr key={idx} className="border-b border-black/10 hover:bg-[#00FF85]/10 transition-colors">
                  <td className="p-3 border-r border-black/20 text-center font-bold text-slate-400">{idx + 1}</td>
                  <td className="p-3 border-r border-black/20 font-black text-sm uppercase">{scorer.name}</td>
                  <td className="p-3 border-r border-black/20 font-bold text-xs">{scorer.club}</td>
                  <td className="p-3 border-r border-black/20 font-mono text-xs">{scorer.season}</td>
                  <td className="p-3 text-right">
                    <span className="bg-[#00FF85] border border-black px-2 py-0.5 font-black text-lg italic inline-block transform -skew-x-6">
                      {scorer.goals}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid for Records and Trivia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* League Records */}
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
            <div className="h-10 w-10 bg-black flex items-center justify-center border border-black transform -rotate-3">
              <Award className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic leading-none">Rekor Bersejarah</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Pencapaian luar biasa klub & individu</p>
            </div>
          </div>

          <div className="space-y-4">
            {leagueRecords.map((record, idx) => (
              <div key={idx} className="p-4 border-2 border-black bg-[#F2F2F2] hover:bg-white transition-colors relative group">
                <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-[10px] font-black uppercase">
                  {record.holder}
                </div>
                <h4 className="font-black text-sm uppercase pr-32">{record.title}</h4>
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <span className="text-2xl font-black italic tracking-tighter text-[#00FF85] drop-shadow-[1px_1px_0px_#000]">
                    {record.value}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600 border-t border-dashed border-black/20 pt-2 mt-1">
                  {record.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* League Trivia */}
        <div className="border-4 border-black bg-black text-white shadow-[8px_8px_0px_0px_#00FF85] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-white/20 pb-4">
            <div className="h-10 w-10 bg-[#00FF85] flex items-center justify-center border border-black">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic leading-none text-[#00FF85]">Fakta Menarik (Trivia)</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Tahukah Anda tentang sejarah ini?</p>
            </div>
          </div>

          <div className="space-y-4">
            {leagueTrivia.map((trivia, idx) => (
              <div key={idx} className="flex gap-4 p-4 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="shrink-0 pt-0.5">
                  <BookOpen className="h-4 w-4 text-[#00FF85]" />
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {trivia.fact}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllTimeStatsView;
