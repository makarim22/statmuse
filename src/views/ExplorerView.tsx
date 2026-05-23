import React, { useState } from "react";
import { motion } from "motion/react";
import { Download, Search, Filter, Calendar, Award, Sparkles, ArrowUpDown } from "lucide-react";
import { exportToCSV } from "../utils/exportUtils";
import { getClubsRanking, leagueData } from "../data/leagueData";
import TimelineVisualization from "../components/TimelineVisualization";

export default function ExplorerView({ onAskAboutSeason }: any) {
  const [selectedEra, setSelectedEra] = useState<string>("Semua");
  const [explorerQuery, setExplorerQuery] = useState("");
  const [explorerSortOrder, setExplorerSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedClubFilter, setSelectedClubFilter] = useState("Semua");
  const [explorerViewMode, setExplorerViewMode] = useState<'grid' | 'timeline'>('grid');
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);

  const allClubs = getClubsRanking();

  const getEraForSeason = (seasonStr: string): string => {
    const match = seasonStr.match(/\b\d{4}\b/);
    if (!match) return "modern";
    const year = parseInt(match[0]);
    if (year < 1994) return "perserikatan";
    if (year < 2008) return "klasik";
    return "modern";
  };

  const filteredSeasons = leagueData.filter(item => {
    const matchesSearch = 
      item.season.toLowerCase().includes(explorerQuery.toLowerCase()) ||
      item.winner.toLowerCase().includes(explorerQuery.toLowerCase()) ||
      item.runnerUp.toLowerCase().includes(explorerQuery.toLowerCase()) ||
      (item.topScorer && item.topScorer.toLowerCase().includes(explorerQuery.toLowerCase())) ||
      (item.coach && item.coach.toLowerCase().includes(explorerQuery.toLowerCase()));

    const matchesClub = selectedClubFilter === "Semua" || item.winner === selectedClubFilter || item.runnerUp === selectedClubFilter;
    const eraOfItem = getEraForSeason(item.season);
    const matchesEra = selectedEra === "Semua" || eraOfItem === selectedEra;

    return matchesSearch && matchesClub && matchesEra;
  });

  const sortedSeasons = [...filteredSeasons].sort((a, b) => {
    const extractYear = (seasonStr: string) => {
      const match = seasonStr.match(/\b\d{4}\b/);
      return match ? parseInt(match[0]) : 0;
    };
    const yrA = extractYear(a.season);
    const yrB = extractYear(b.season);
    return explorerSortOrder === 'desc' ? yrB - yrA : yrA - yrB;
  });

  return (
          <div className="space-y-8 animate-fade-in" id="explorer_view">
            <title>Riwayat Lengkap Juara Liga Indonesia (1930-2026) - Garuda Stats</title>
            <meta name="description" content="Eksplorasi garis waktu (timeline) sejarah sepak bola nasional sejak era kolonial hingga era profesional modern." />
            
            {/* Header section with inline query toggles */}
            <div className="border-b-4 border-black pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest inline-block">
                  Katalog Statistik Lengkap
                </span>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                  EKSPLORASI TIAP MUSIM SEJAK 1930
                </h2>
                <p className="text-sm font-bold text-slate-500">
                  Telusuri pilar juara nasional, pencetak gol terbanyak, pelatih, hingga catatan dualisme di sini.
                </p>
              </div>

              {/* Advanced Sorting and Filtering Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setExplorerViewMode(prev => prev === 'grid' ? 'timeline' : 'grid')}
                  className="px-4 py-2 bg-white text-black border-2 border-black hover:bg-[#00FF85] transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  title="Toggle view mode"
                >
                  <Calendar className="h-4 w-4" />
                  {explorerViewMode === 'grid' ? 'TIMELINE' : 'GRID'}
                </button>
                <button
                  onClick={() => exportToCSV(sortedSeasons, 'liga-indonesia-history.csv')}
                  className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#00FF85] hover:text-black transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  title="Download sebagai CSV"
                >
                  <Download className="h-4 w-4" />
                  CSV
                </button>
                <button
                  onClick={() => setExplorerSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="px-4 py-2.5 text-xs font-black uppercase tracking-widest bg-white border-2 border-black hover:bg-[#F2F2F2] text-black hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  URUT: {explorerSortOrder === 'desc' ? 'LATEST' : 'OLDEST'}
                </button>
              </div>
            </div>

            {/* BRAND NEW UPGRADE: INTERACTIVE HISTORICAL ERAS NAVIGATION */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block">Pilih Pembagian Era Sepakbola Nasional</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedEra("Semua")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "Semua"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  🌐 SEMUA ERA ({leagueData.length})
                </button>
                <button
                  onClick={() => setSelectedEra("perserikatan")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "perserikatan"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  🛡️ PERSERIKATAN (1930 - 1994)
                </button>
                <button
                  onClick={() => setSelectedEra("klasik")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "klasik"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  ⚡ ERA LIGINA (1994 - 2008)
                </button>
                <button
                  onClick={() => setSelectedEra("modern")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "modern"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  🚀 MODERN ISL & LIGA 1
                </button>
              </div>
            </div>

            {/* Controls Filter box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="filters_control_sub">
              {/* Search text input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                <input
                  type="text"
                  value={explorerQuery}
                  onChange={(e) => setExplorerQuery(e.target.value)}
                  placeholder="Cari kata kunci (Tahun/Klub/Topscorer/Pelatih)..."
                  className="w-full text-xs font-bold bg-white border-2 border-black rounded-none py-3.5 pl-11 pr-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder-slate-500 transition-all"
                />
              </div>

              {/* Club selection Filter */}
              <div className="relative flex items-center">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                <select
                  value={selectedClubFilter}
                  onChange={(e) => setSelectedClubFilter(e.target.value)}
                  className="w-full text-xs font-bold bg-white border-2 border-black rounded-none py-3.5 pl-11 pr-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none cursor-pointer"
                >
                  <option value="Semua">FILTER BERDASARKAN KLUB (SEMUA)</option>
                  {allClubs.map((club, idx) => (
                    <option key={idx} value={club.name}>{club.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Reset counters and information bubble */}
              <div className="bg-[#00FF85] border-2 border-black p-3.5 flex items-center justify-between text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="uppercase text-black">Hasil Saringan data:</span>
                <span className="bg-black text-white px-2.5 py-0.5 font-mono">{sortedSeasons.length} KOMPETISI</span>
              </div>
            </div>

            {/* Render loop for chronology cards / grid list */}
            {explorerViewMode === 'timeline' ? (
              <TimelineVisualization
                data={sortedSeasons}
                onSeasonClick={(season) => {
                  onAskAboutSeason(season);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="explorer_list">
                {sortedSeasons.length > 0 ? (
                sortedSeasons.map((record, idx) => {
                  const isExpanded = expandedSeason === record.season;
                  const itemEra = getEraForSeason(record.season);

                  return (
                    <motion.div
                      key={record.season}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(0.12, idx * 0.02) }}
                      className={`p-6 border-2 border-black bg-white flex flex-col justify-between hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all relative ${
                        record.isCancelled 
                          ? 'bg-[#F2F2F2]/50 outline-2 outline-dashed outline-red-400' 
                          : ''
                      }`}
                    >
                      <div>
                        {/* Top season label & result badges */}
                        <div className="flex justify-between items-center border-b-2 border-black pb-3 mb-4">
                          <span className="text-xs font-mono font-black italic bg-black text-white px-2.5 py-1">
                            MUSIM {record.season}
                          </span>
                          
                          {/* Era indicator badge */}
                          <span className="text-[8px] font-black uppercase px-2 py-0.5 border border-black bg-slate-100">
                            {itemEra === "perserikatan" ? "🛡️ PERSERIKATAN" : itemEra === "klasik" ? "⚡ ERA LIGINA" : "🚀 ISL / MDN"}
                          </span>
                        </div>

                        {/* Champions Title and runner up block */}
                        <div className="space-y-2">
                          <p className="text-[8px] font-black uppercase tracking-widest opacity-50">MAHKOTA JUARA (1ST)</p>
                          <h3 className={`text-2xl font-black italic tracking-tighter uppercase text-[#1A1A1A] leading-none ${record.isCancelled ? 'line-through text-slate-400' : ''}`}>
                            {record.winner}
                          </h3>

                          <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t-2 border-[#F2F2F2]">
                            <div>
                              <span className="text-[8px] font-black uppercase tracking-widest opacity-50">RUNNER-UP (2ND)</span>
                              <p className="text-sm font-bold text-slate-800 leading-tight uppercase mt-0.5">{record.runnerUp}</p>
                            </div>
                            
                            {record.coach && (
                              <div>
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-50">PELATIH JUARA</span>
                                <p className="text-sm font-bold text-[#00FF85] bg-black inline-block px-1.5 py-0.5 leading-none mt-1 uppercase text-xs">{record.coach}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Outer note / top scorer visual detail */}
                      {(record.topScorer || record.note) && (
                        <div className="mt-5 pt-3.5 border-t border-dashed border-black/30 space-y-2">
                          {record.topScorer && (
                            <div className="flex items-start gap-2 bg-[#F2F2F2] p-2.5 border border-black">
                              <Award className="h-4 w-4 mt-0.5 shrink-0" />
                              <div className="leading-tight">
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-60 block">Pemberian Top Scorer</span>
                                <span className="text-xs font-bold text-slate-800 uppercase leading-relaxed">{record.topScorer}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* BRAND NEW INTERACTIVE EXPANDER */}
                      <div className="mt-5 pt-3.5 border-t-2 border-black flex flex-col gap-2">
                        <button
                          onClick={() => setExpandedSeason(isExpanded ? null : record.season)}
                          className="w-full text-center py-2 bg-slate-100 hover:bg-[#00FF85] text-black font-black text-[10px] uppercase border border-black cursor-pointer transition-all"
                        >
                          {isExpanded ? "▲ TUTUP DETAIL HISTORIS" : "▼ LIHAT DETAIL HISTORIS & TRIVIA"}
                        </button>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-[#F2F2F2] p-4 border border-black space-y-3 text-xs leading-relaxed"
                          >
                            <p className="font-bold text-[#1A1A1A]">
                              💡 {record.note || `Kompetisi resmi kasta tertinggi sepak bola Indonesia pada musim ${record.season}. Dipimpin oleh jajaran pemain berbakat lokal serta taktik legendaris.`}
                            </p>
                            
                            <div className="bg-white p-2.5 border border-black space-y-1">
                              <span className="text-[8px] font-black uppercase tracking-widest text-[#1A1A1A] opacity-60">ARSIP DIGITAL</span>
                              <p className="font-mono text-[10px] text-zinc-700">Era: {itemEra === "perserikatan" ? "Amatir Serikat PSSI" : itemEra === "klasik" ? "Liga Indonesia Terpadu" : "Professional Era / Liga 1"}</p>
                            </div>

                            {/* Direct call-to-action button to ask the AI */}
                            <button
                              onClick={() => onAskAboutSeason(record.season)}
                              className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="h-3 w-3 text-[#00FF85]" />
                              TANYAKAN DETAIL LENGKAP KE ASISTEN AI
                            </button>
                          </motion.div>
                        )}
                      </div>

                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16 border-2 border-black bg-[#F2F2F2]/40 text-stone-500 font-bold uppercase">
                  ⚠️ Tidak ada kompetisi yang mencocokkan kata kunci "{explorerQuery}" dalam Era {selectedEra.toUpperCase()}.
                </div>
              )}
              </div>
            )}
          </div>
  );
}
