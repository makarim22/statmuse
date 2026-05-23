import React, { useState } from "react";
import { motion } from "motion/react";
import { Download, Search, ArrowUpDown, Trophy } from "lucide-react";
import { standingsSeasonList, StandingsEntry } from "../data/standingsData";
import { exportStandingsToCSV } from "../utils/exportUtils";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "../components/ClubShield";
import { getClubsRanking } from "../data/leagueData";

export default function StandingsView({ onOpenClubDetail }: any) {
  const [selectedStandingsSeason, setSelectedStandingsSeason] = useState<string>("2024-2025");
  const [standingsSearchQuery, setStandingsSearchQuery] = useState<string>("");
  const [standingsSortField, setStandingsSortField] = useState<keyof StandingsEntry | "gd">("points");
  const [standingsSortAsc, setStandingsSortAsc] = useState<boolean>(false);
  const allClubs = getClubsRanking();

            const standingsRawData = standingsSeasonList[selectedStandingsSeason] || [];

          // Filter based on search query
          const filteredStandings = standingsRawData.filter(entry => 
            entry.clubName.toLowerCase().includes(standingsSearchQuery.toLowerCase())
          );

          // Sort based on chosen column
          const sortedStandings = [...filteredStandings].sort((a, b) => {
            let valA: any = 0;
            let valB: any = 0;

            if (standingsSortField === "gd") {
              valA = a.goalsFor - a.goalsAgainst;
              valB = b.goalsFor - b.goalsAgainst;
            } else {
              valA = a[standingsSortField as keyof StandingsEntry];
              valB = b[standingsSortField as keyof StandingsEntry];
            }

            if (typeof valA === "number" && typeof valB === "number") {
              return standingsSortAsc ? valA - valB : valB - valA;
            }
            return 0;
          });

          const handleSortStandings = (field: keyof StandingsEntry | "gd") => {
            if (standingsSortField === field) {
              setStandingsSortAsc(prev => !prev);
            } else {
              setStandingsSortField(field);
              setStandingsSortAsc(false);
            }
          };

          const topAttack = [...standingsRawData].sort((a, b) => b.goalsFor - a.goalsFor)[0];
          const bestDefense = [...standingsRawData].filter(e => e.played > 0).sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];
          const currentLeader = standingsRawData[0];

          return (
            <div className="space-y-10 animate-fade-in" id="standings_view">
              <title>Klasemen Liga 1 Indonesia Terbaru - Garuda Stats</title>
              <meta name="description" content="Tabel Klasemen Resmi terbaru Liga 1 Indonesia beserta rekor pertandingan kandang/tandang, poin, dan selisih gol." />
              
              {/* Header section with Season Toggles */}
              <div className="border-b-4 border-black pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="bg-[#00FF85] px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-widest inline-block mb-1">
                    Klasemen Resmi Terbaru
                  </span>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                    TABEL KLASEMEN LIGA 1 INDONESIA
                  </h2>
                  <p className="text-sm font-bold text-slate-500">
                    Sistem promosi kasta tertinggi sepak bola tanah air. Klik klub mana pun untuk langsung menelusuri sejarah, julukan, dan prestasi lengkapnya.
                  </p>
                </div>

                {/* Season Switcher Dropdown and Export */}
                <div className="flex items-center gap-3 self-start sm:self-center flex-wrap">
                  <button
                    onClick={() => exportStandingsToCSV(sortedStandings, selectedStandingsSeason)}
                    className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#00FF85] hover:text-black transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00FF85]"
                    title="Download klasemen sebagai CSV"
                    aria-label="Unduh Klasemen sebagai CSV"
                  >
                    <Download className="h-4 w-4" />
                    CSV
                  </button>
                  <span className="text-xs font-black uppercase tracking-wider text-black select-none">
                    Saring Musim:
                  </span>
                  <div className="relative inline-block w-48">
                    <select
                      value={selectedStandingsSeason}
                      onChange={(e) => setSelectedStandingsSeason(e.target.value)}
                      className="appearance-none w-full bg-white text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 pr-10 border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00FF85] focus:bg-[#00FF85]/10 focus:ring-0"
                      aria-label="Pilih musim klasemen"
                    >
                      {Object.keys(standingsSeasonList).map((seasonId) => (
                        <option key={seasonId} value={seasonId} className="text-black font-black uppercase">
                          {seasonId === "2024-2025" ? "🚀 " : "📅 "}
                          {seasonId.replace("-west", " (Barat)").replace("-east", " (Timur)")}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black border-l-2 border-black bg-white">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neo-Brutalist Standings Summary Bento Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="standings_bento">
                
                {/* 1. Leader (Spans 2 columns and 2 rows on large screens) */}
                <motion.div 
                  drag 
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
                  dragElastic={0.2} 
                  whileDrag={{ scale: 1.02, zIndex: 50, rotate: -1 }}
                  className="bg-white border-4 border-black p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:col-span-2 lg:row-span-2 cursor-grab active:cursor-grabbing bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')]"
                >
                  <div>
                    <span className="text-xs font-black tracking-widest bg-emerald-500 text-white px-3 py-1 uppercase border-2 border-black">🏆 PEMIMPIN LIGA</span>
                    <h4 className="text-4xl sm:text-5xl font-black uppercase tracking-tight italic mt-6 truncate">
                      {currentLeader ? currentLeader.clubName : "-"}
                    </h4>
                    <p className="text-sm font-bold text-slate-600 mt-2">Memimpin persaingan ketat mahkota juara.</p>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-black/10 pt-4 mt-8">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Poin Dominan:</span>
                    <span className="text-3xl font-mono font-black">{currentLeader ? `${currentLeader.points} PTS` : "-"}</span>
                  </div>
                </motion.div>

                {/* 2. Top Attack */}
                <motion.div 
                  drag 
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
                  dragElastic={0.2} 
                  whileDrag={{ scale: 1.05, zIndex: 50, rotate: 2 }}
                  className="bg-yellow-400 border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-grab active:cursor-grabbing"
                >
                  <div>
                    <span className="text-[9px] font-black tracking-widest bg-black text-yellow-400 px-2 py-0.5 uppercase border border-black">⚽ SERANGAN TERPRODUKTIF</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic mt-2 truncate text-black">
                      {topAttack ? topAttack.clubName : "-"}
                    </h4>
                    <p className="text-xs font-bold text-black/70 mt-0.5">Lini serang paling subur merobek jala lawan.</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/20 pt-3 mt-4">
                    <span className="text-xs font-bold text-black/70 uppercase">Total Gol:</span>
                    <span className="text-xl font-mono font-black text-black">{topAttack ? `${topAttack.goalsFor} Gol` : "-"}</span>
                  </div>
                </motion.div>

                {/* 3. Best Defense */}
                <motion.div 
                  drag 
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
                  dragElastic={0.2} 
                  whileDrag={{ scale: 1.05, zIndex: 50, rotate: -2 }}
                  className="bg-blue-600 border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-grab active:cursor-grabbing"
                >
                  <div>
                    <span className="text-[9px] font-black tracking-widest bg-white text-blue-600 px-2 py-0.5 uppercase border border-black">🛡️ PERTAHANAN KOKOH</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic mt-2 truncate text-white">
                      {bestDefense ? bestDefense.clubName : "-"}
                    </h4>
                    <p className="text-xs font-bold text-blue-100 mt-0.5">Gawang batu tersulit dijebol penyerang rival.</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/20 pt-3 mt-4">
                    <span className="text-xs font-bold text-blue-200 uppercase">Kebobolan:</span>
                    <span className="text-xl font-mono font-black text-white">{bestDefense ? `${bestDefense.goalsAgainst} Gol` : "-"}</span>
                  </div>
                </motion.div>

                {/* 4. Format Info (Spans 3 columns at the bottom) */}
                <motion.div 
                  drag 
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
                  dragElastic={0.2} 
                  whileDrag={{ scale: 1.01, zIndex: 50 }}
                  className="bg-[#00FF85]/10 border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden lg:col-span-3 cursor-grab active:cursor-grabbing"
                >
                  <div className="absolute right-[-10px] bottom-[-40px] opacity-10">
                    <Trophy className="h-40 w-40 text-emerald-950 font-black transform rotate-12" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black tracking-widest bg-black text-[#00FF85] px-2 py-0.5 uppercase">📝 REGULASI LIGA</span>
                      <h4 className="text-xl font-black uppercase tracking-tight italic mt-2 leading-none">
                        CHAMPIONSHIP & PLAYOFFS
                      </h4>
                      <p className="text-xs font-semibold text-slate-700 mt-2 leading-relaxed max-w-2xl">
                        Peringkat 1-4 melaju memperebutkan mahkota nasional dalam Championship Series / Slot Asia. Sementara 3 peringkat terbawah (16-18) didegradasi langsung ke kompetisi kasta kedua.
                      </p>
                    </div>
                    <div className="bg-white border-2 border-black px-4 py-2 font-mono font-black text-sm uppercase flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-2">
                      SISTEM GUGUR
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Filtering, Search & Reset Controls */}
              <div className="bg-[#F2F2F2] border-2 border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  <input
                    type="text"
                    value={standingsSearchQuery}
                    onChange={(e) => setStandingsSearchQuery(e.target.value)}
                    placeholder="Saring berdasarkan nama klub..."
                    className="w-full text-xs font-bold bg-white border-2 border-black rounded-none py-2.5 pl-10 pr-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00FF85] focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-slate-400"
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                  <span>Hasil Saringan:</span>
                  <span className="bg-[#00FF85] border border-black px-2 py-0.5 font-mono">{filteredStandings.length} dari {standingsRawData.length} tim</span>
                  {standingsSearchQuery && (
                    <button 
                      onClick={() => setStandingsSearchQuery("")}
                      className="bg-black text-white px-2 py-0.5 hover:bg-neutral-800 border border-black cursor-pointer uppercase text-[9px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF85]"
                      aria-label="Batal saring tabel klasemen"
                    >
                      Batal Saring
                    </button>
                  )}
                </div>
              </div>

              {/* Main Standings Table layout in Brutalist Neo Styling */}
              <div className="overflow-x-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <table className="w-full text-left font-sans border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black bg-black text-white text-xs font-black tracking-widest uppercase">
                      <th className="px-3 py-3 w-12 text-center">#</th>
                      <th className="px-4 py-3 min-w-[200px]">KLUB PESERTA</th>
                      <th 
                        onClick={() => handleSortStandings("played")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>M</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("won")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>MG</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("draw")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>S</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("lost")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>K</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 py-3 w-24 text-center">GOL (F:A)</th>
                      <th 
                        onClick={() => handleSortStandings("gd")} 
                        className="px-3 py-3 w-20 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>SG</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("points")} 
                        className="px-4 py-3 w-24 text-center bg-[#00FF85] text-black cursor-pointer hover:opacity-90 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>PTS</span>
                          <ArrowUpDown className="h-3.5 w-3.5 text-black" />
                        </div>
                      </th>
                      <th className="px-4 py-3 min-w-[140px] text-center hidden md:table-cell">5 LAGA TERAKHIR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black bg-white text-sm font-bold">
                    {sortedStandings.length > 0 ? (
                      sortedStandings.map((entry) => {
                        const meta = clubMetadataList[entry.clubName];
                        const isTopZone = entry.rank <= 4;
                        const isRelegationZone = entry.rank >= 16;
                        
                        return (
                          <tr 
                            key={entry.clubName}
                            onClick={() => {
                              // Find pre-computed club data (has pro/amatir split) or build a minimal fallback
                              const existingClub = allClubs.find(c => c.name === entry.clubName);
                              const mockany: any = existingClub ?? {
                                name: entry.clubName,
                                titles: 0,
                                runnerUps: 0,
                                seasonsWon: [],
                                historicalNames: [],
                                amatirTitles: 0,
                                amatirSeasonsWon: [],
                              };
                              onOpenClubDetail(mockany);
                            }}
                            className={`hover:bg-[#00FF85]/5 transition-all duration-100 cursor-pointer group ${
                              isTopZone ? 'bg-emerald-500/5' : isRelegationZone ? 'bg-rose-500/5' : ''
                            }`}
                          >
                            {/* 1. Placement rank badge */}
                            <td className="px-3 py-3 w-12 text-center select-none font-mono font-black border-r border-black/10">
                              <span className={`inline-flex items-center justify-center h-7 w-7 border border-black font-black text-xs ${
                                isTopZone 
                                  ? 'bg-[#00FF85] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                                  : isRelegationZone 
                                    ? 'bg-rose-500 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                                    : 'bg-[#F2F2F2] text-black'
                              }`}>
                                {entry.rank}
                              </span>
                            </td>

                            {/* 2. Club Name and Shield */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {meta && (
                                  <div className="h-8 w-8 border border-black bg-white p-0.5 shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 duration-105">
                                    <ClubShield 
                                      symbol={meta.emblemSymbol} 
                                      primaryColor={meta.colors.primary} 
                                      secondaryColor={meta.colors.secondary} 
                                      className="h-full w-full"
                                      clubName={entry.clubName}
                                      logoUrl={meta.logoUrl}
                                    />
                                  </div>
                                )}
                                <div>
                                  <span className="text-sm font-black uppercase tracking-tight text-black group-hover:text-emerald-950 duration-75 block leading-none">
                                    {entry.clubName}
                                  </span>
                                  {meta?.nickname && (
                                    <span className="text-[9px] font-black tracking-wider opacity-60 uppercase block mt-1">
                                      {meta.nickname}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* 3. Played matches */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-zinc-600 border-l border-black/10">
                              {entry.played}
                            </td>

                            {/* 4. Won games */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-emerald-800">
                              {entry.won}
                            </td>

                            {/* 5. Draw games */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-slate-500">
                              {entry.draw}
                            </td>

                            {/* 6. Lost games */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-rose-800">
                              {entry.lost}
                            </td>

                            {/* 7. Goals stats column */}
                            <td className="px-3 py-3 w-24 text-center font-mono text-slate-600 text-xs border-l border-r border-black/10">
                              {entry.goalsFor}:{entry.goalsAgainst}
                            </td>

                            {/* 8. Goal difference */}
                            <td className="px-3 py-3 w-20 text-center font-mono">
                              <span className={`text-xs px-1.5 py-0.5 border ${
                                (entry.goalsFor - entry.goalsAgainst) >= 0 
                                  ? 'text-emerald-700 bg-emerald-50 border-emerald-300' 
                                  : 'text-rose-700 bg-rose-50 border-rose-300'
                              }`}>
                                {(entry.goalsFor - entry.goalsAgainst) >= 0 ? "+" : ""}{entry.goalsFor - entry.goalsAgainst}
                              </span>
                            </td>

                            {/* 9. Standings points total */}
                            <td className="px-4 py-3 w-24 text-center font-mono font-black text-base bg-zinc-50 border-l-2 border-black">
                              {entry.points}
                            </td>

                            {/* 10. Form dots list */}
                            <td className="px-4 py-3 min-w-[140px] hidden md:table-cell border-l border-black/10 text-center align-middle">
                              <div className="flex items-center justify-center gap-1.5 h-full">
                                {entry.form.map((formResult, fIdx) => (
                                  <span 
                                    key={fIdx} 
                                    className={`inline-flex items-center justify-center text-[9px] font-black leading-none h-5 w-5 border border-black ${
                                      formResult === "W" 
                                        ? 'bg-[#00FF85] text-black' 
                                        : formResult === "D" 
                                          ? 'bg-amber-300 text-black' 
                                          : 'bg-rose-500 text-white'
                                    }`}
                                    title={formResult === "W" ? "Menang" : formResult === "D" ? "Seri" : "Kalah"}
                                  >
                                    {formResult}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center py-12 text-stone-500 font-bold uppercase bg-stone-100">
                          ⚠️ Tidak ada klub yang cocok dengan kata kunci "{standingsSearchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Informative Legend explanation panel in Brutalist frame */}
              <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-800 font-bold">
                <div className="flex items-start gap-2">
                  <span className="h-5 w-5 shrink-0 bg-[#00FF85] border border-black flex items-center justify-center font-black text-[9px]">1-4</span>
                  <div>
                    <span className="uppercase text-black block tracking-tight font-black">Championship & Zona Asia</span>
                    <p className="font-medium text-slate-500 mt-0.5">Musim reguler teratas berhak maju memperebutkan gelar piala bergilir tertinggi serta jatah representasi Indonesia di kancah antarklub Benua Asia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-5 w-5 shrink-0 bg-[#F2F2F2] border border-black flex items-center justify-center font-black text-[9px]">5-15</span>
                  <div>
                    <span className="uppercase text-black block tracking-tight font-black">Zona Tengah Aman</span>
                    <p className="font-medium text-slate-500 mt-0.5">Klub tetap mengamankan hak kompetisi kasta tertinggi Liga 1 di musim berikutnya tanpa ancaman jatuh ataupun hak playoff khusus.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-5 w-5 shrink-0 bg-rose-500 border border-black text-white flex items-center justify-center font-black text-[9px]">16-18</span>
                  <div>
                    <span className="uppercase text-black block tracking-tight font-black">Zona Relegasi / Degradasi</span>
                    <p className="font-medium text-slate-500 mt-0.5">Tiga tim terbawah pada akhir musim secara mutlak turun kasta bertarung di Liga 2 pada gelombang pagelaran musim berikutnya.</p>
                  </div>
                </div>
              </div>

            </div>
          );
}
