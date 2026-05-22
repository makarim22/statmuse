import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { topScorers, allTimeTopScorers, leagueRecords, leagueTrivia, TopScorer, legendaryPlayers } from "../data/statisticsData";
import { Award, Target, Zap, BookOpen, Search, User, ChevronDown, ChevronUp } from "lucide-react";
import PlayerDetailModal from "./PlayerDetailModal";
import GoalTrendChart from "./GoalTrendChart";

const AllTimeStatsView: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<TopScorer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hall of Fame state
  const [hofSearchQuery, setHofSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredLegends = legendaryPlayers.filter(p => 
    p.name.toLowerCase().includes(hofSearchQuery.toLowerCase()) || 
    p.club.toLowerCase().includes(hofSearchQuery.toLowerCase()) ||
    p.position.toLowerCase().includes(hofSearchQuery.toLowerCase())
  );

  const handlePlayerClick = (player: TopScorer) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };
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

      {/* Goal Trend Chart (Advanced Analytics) */}
      <GoalTrendChart className="mb-12" />

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

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Data Per Musim */}
          <div className="flex-1 overflow-x-auto border-2 border-black">
            <div className="bg-black text-[#00FF85] p-3 border-b-2 border-black">
              <h4 className="font-black uppercase text-sm">Pencetak Gol Terbanyak (Per Musim)</h4>
            </div>
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#F2F2F2] border-b-2 border-black text-xs font-black uppercase tracking-wider">
                  <th className="p-3 border-r border-black/20 w-12 text-center">#</th>
                  <th className="p-3 border-r border-black/20">Pemain</th>
                  <th className="p-3 border-r border-black/20">Musim</th>
                  <th className="p-3 text-right">Gol</th>
                </tr>
              </thead>
              <tbody>
                {topScorers.map((scorer, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-black/10 hover:bg-[#00FF85]/10 transition-colors cursor-pointer"
                    onClick={() => handlePlayerClick(scorer)}
                  >
                    <td className="p-3 border-r border-black/20 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3 border-r border-black/20 font-black text-sm uppercase">
                      {scorer.name}
                      <span className="block text-[10px] font-bold text-slate-500 normal-case">{scorer.club}</span>
                    </td>
                    <td className="p-3 border-r border-black/20 font-mono text-xs">{scorer.season}</td>
                    <td className="p-3 text-right">
                      <span className="bg-[#00FF85] border border-black px-2 py-0.5 font-black text-lg italic inline-block transform -skew-x-6 group-hover:scale-110 transition-transform">
                        {scorer.goals}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Data Kumulatif Sepanjang Masa */}
          <div className="flex-1 overflow-x-auto border-2 border-black">
            <div className="bg-[#00FF85] text-black p-3 border-b-2 border-black">
              <h4 className="font-black uppercase text-sm">Top Skor Kumulatif (Sepanjang Karier)</h4>
            </div>
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#F2F2F2] border-b-2 border-black text-xs font-black uppercase tracking-wider">
                  <th className="p-3 border-r border-black/20 w-12 text-center">#</th>
                  <th className="p-3 border-r border-black/20">Pemain</th>
                  <th className="p-3 border-r border-black/20">Klub / Status</th>
                  <th className="p-3 text-right">Gol</th>
                </tr>
              </thead>
              <tbody>
                {allTimeTopScorers.map((scorer, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-black/10 hover:bg-black/5 transition-colors cursor-pointer"
                    onClick={() => handlePlayerClick(scorer)}
                  >
                    <td className="p-3 border-r border-black/20 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3 border-r border-black/20 font-black text-sm uppercase">{scorer.name}</td>
                    <td className="p-3 border-r border-black/20 font-bold text-[10px] uppercase text-slate-500">{scorer.club}</td>
                    <td className="p-3 text-right">
                      <span className="bg-black text-[#00FF85] border border-black px-2 py-0.5 font-black text-lg italic inline-block transform -skew-x-6">
                        {scorer.goals}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

        {/* Hall of Fame (Database Pemain Legendaris) */}
        <div className="border-4 border-black bg-[#F2F2F2] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-12 p-6 md:p-8" id="hall_of_fame">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b-4 border-black pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white flex items-center justify-center border-2 border-black transform -rotate-3 shadow-[2px_2px_0px_0px_#000]">
                <User className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase italic leading-none text-black">Hall of Fame</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Database Pemain Ikonik & Legendaris</p>
              </div>
            </div>
            
            {/* Search Input for Hall of Fame */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black opacity-50" />
              <input
                type="text"
                value={hofSearchQuery}
                onChange={(e) => setHofSearchQuery(e.target.value)}
                placeholder="Cari nama, klub, atau posisi..."
                className="w-full bg-white border-2 border-black py-2 pl-9 pr-3 text-sm font-bold uppercase tracking-wider text-black placeholder:text-black/30 focus:outline-none focus:ring-0 focus:border-emerald-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </div>

          <div className="border-2 border-black bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-black text-[#00FF85] border-b-2 border-black text-xs font-black uppercase tracking-wider">
                    <th className="p-4 border-r border-white/20 w-10 text-center"></th>
                    <th className="p-4 border-r border-white/20">Nama Pemain</th>
                    <th className="p-4 border-r border-white/20">Klub Ikonik</th>
                    <th className="p-4 border-r border-white/20 text-center">Posisi</th>
                    <th className="p-4 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLegends.length > 0 ? (
                    filteredLegends.map((player) => (
                      <React.Fragment key={player.id}>
                        {/* Main Row */}
                        <tr 
                          className={`border-b border-black/20 hover:bg-[#00FF85]/10 cursor-pointer transition-colors ${expandedRow === player.id ? 'bg-[#00FF85]/20' : ''}`}
                          onClick={() => setExpandedRow(expandedRow === player.id ? null : player.id)}
                        >
                          <td className="p-4 border-r border-black/20 text-center text-xs font-bold text-slate-400">
                            #{filteredLegends.indexOf(player) + 1}
                          </td>
                          <td className="p-4 border-r border-black/20">
                            <span className="font-black uppercase text-sm">{player.name}</span>
                          </td>
                          <td className="p-4 border-r border-black/20 text-xs font-bold text-slate-600">
                            {player.club}
                          </td>
                          <td className="p-4 border-r border-black/20 text-center text-xs font-bold">
                            <span className="bg-black text-white px-2 py-1 uppercase">{player.position}</span>
                          </td>
                          <td className="p-4 text-center">
                            <button className="h-6 w-6 bg-white border border-black flex items-center justify-center mx-auto shadow-[1px_1px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                              {expandedRow === player.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Biography Row using AnimatePresence */}
                        <AnimatePresence>
                          {expandedRow === player.id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="bg-[#F2F2F2] border-b-2 border-black"
                            >
                              <td colSpan={5} className="p-0 border-none">
                                <div className="p-6 border-t border-black/10">
                                  <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-1">
                                      <h4 className="text-sm font-black uppercase mb-2 border-b-2 border-black pb-1 inline-block">Biografi Singkat</h4>
                                      <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4">
                                        {player.biography}
                                      </p>
                                    </div>
                                    <div className="lg:w-1/3 space-y-4">
                                      <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_#000]">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Masa Aktif</p>
                                        <p className="font-mono font-black text-sm">{player.activeYears}</p>
                                      </div>
                                      <div className="bg-[#00FF85]/20 border-2 border-black p-3 shadow-[2px_2px_0px_0px_#000]">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Pencapaian Utama</p>
                                        <p className="font-bold text-xs uppercase leading-snug">{player.achievements}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 font-bold uppercase text-sm">
                        Pemain legendaris tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      
      {/* Player Detail Modal */}
      <PlayerDetailModal 
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AllTimeStatsView;
