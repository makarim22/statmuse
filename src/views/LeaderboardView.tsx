import React, { useState } from "react";
import { Download, ArrowRightLeft, MapPin, Calendar } from "lucide-react";
import { getClubsRanking } from "../data/leagueData";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "../components/ClubShield";
import { exportClubRankingsToCSV, exportToJSON } from "../utils/exportUtils";

export default function LeaderboardView({ onOpenClubDetail, onOpenMultiCompare }: any) {
  const allClubs = getClubsRanking();
  const [compareClubA, setCompareClubA] = useState<string>(allClubs[0]?.name || "Persija Jakarta");
  const [compareClubB, setCompareClubB] = useState<string>(allClubs[1]?.name || "Persib Bandung");

  const clubAData = allClubs.find(c => c.name === compareClubA);
  const clubBData = allClubs.find(c => c.name === compareClubB);

  const getH2HWinnerMessage = () => {
    if (!clubAData || !clubBData) return "";
    if (clubAData.titles > clubBData.titles) return `${clubAData.name.toUpperCase()} LEBIH UNGGUL SECARA SEJARAH DENGAN SELISIH ${clubAData.titles - clubBData.titles} TROFI.`;
    if (clubBData.titles > clubAData.titles) return `${clubBData.name.toUpperCase()} LEBIH UNGGUL SECARA SEJARAH DENGAN SELISIH ${clubBData.titles - clubAData.titles} TROFI.`;
    if (clubAData.runnerUps > clubBData.runnerUps) return `KEDUA TIM SAMA-SAMA MEMPUNYAI ${clubAData.titles} TROFI, NAMUN ${clubAData.name.toUpperCase()} LEBIH SANGAR KARENA MEMEGANG LEBIH BANYAK POSISI RUNNER-UP (${clubAData.runnerUps} vs ${clubBData.runnerUps}).`;
    if (clubBData.runnerUps > clubAData.runnerUps) return `KEDUA TIM SAMA-SAMA MEMPUNYAI ${clubAData.titles} TROFI, NAMUN ${clubBData.name.toUpperCase()} UNGGUL DALAM JUMLAH RUNNER-UP (${clubBData.runnerUps} vs ${clubAData.runnerUps}).`;
    return `SANGAT SEIMBANG! KEDUA TIM MEMILIKI REKOR SEJARAH PEROLEHAN TROFI YANG IDENTIK (${clubAData.titles} GELAR & ${clubAData.runnerUps} RUNNER-UP).`;
  };

  return (
          <div className="space-y-12 animate-fade-in" id="leaderboard_view">
            
            <div className="border-b-4 border-black pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="bg-[#00FF85] px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-widest inline-block mb-2">
                  Peringkat Terbaik Sepanjang Masa
                </span>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">
                  PAPAN JUARA ABADI LIGA INDONESIA
                </h2>
                <p className="text-sm font-bold text-slate-500 max-w-3xl mt-1">
                  Klub dengan raihan mahkota kejuaraan liga kasta tertinggi nasional terbanyak sejak tahun 1930 hingga sekarang.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => exportClubRankingsToCSV(allClubs)}
                  className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#00FF85] hover:text-black transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  title="Download sebagai CSV"
                >
                  <Download className="h-4 w-4" />
                  CSV
                </button>
                <button
                  onClick={() => exportToJSON(allClubs, 'club-rankings.json')}
                  className="px-4 py-2 bg-white text-black border-2 border-black hover:bg-[#00FF85] transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  title="Download sebagai JSON"
                >
                  <Download className="h-4 w-4" />
                  JSON
                </button>
              </div>
            </div>

            {/* Brutalist Podium Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white" id="elite_podium">
              
              {/* Podium 2nd Place */}
              {allClubs[1] && (
                <div 
                  onClick={() => {
                    onOpenClubDetail(allClubs[1]);
                  }}
                  className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between items-center text-center space-y-6 relative overflow-hidden bg-[#F2F2F2]/40 hover:bg-[#00FF85]/5 duration-150 cursor-pointer group"
                >
                  <span className="text-xs font-black uppercase text-slate-500 tracking-widest">RUNNER-UP TERATAS</span>
                  
                  {/* Shield & Nickname */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-16 w-16 border-2 border-black bg-white p-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <ClubShield 
                        symbol={clubMetadataList[allClubs[1].name]?.emblemSymbol || "shield"} 
                        primaryColor={clubMetadataList[allClubs[1].name]?.colors.primary || "#CCC"} 
                        secondaryColor={clubMetadataList[allClubs[1].name]?.colors.secondary || "#1A1A1A"} 
                        className="h-full w-full"
                        clubName={allClubs[1].name}
                        logoUrl={clubMetadataList[allClubs[1].name]?.logoUrl}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">{allClubs[1].name}</h3>
                      <p className="text-[10px] font-black uppercase text-emerald-700 bg-[#00FF85]/20 border border-black/10 px-1 inline-block">
                        {clubMetadataList[allClubs[1].name]?.nickname || "Klub Legendaris"}
                      </p>
                    </div>
                  </div>

                  <div className="h-14 w-full bg-neutral-200 border-2 border-black flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[8px] font-black uppercase tracking-widest">PERINGKAT</span>
                    <span className="text-2xl font-mono font-black italic">#02</span>
                  </div>

                  <div className="w-full text-left bg-white border-2 border-black p-3 text-xs">
                    <div className="flex justify-between items-center opacity-60 text-[9px] font-black uppercase tracking-widest border-b border-black/10 pb-1 mb-1">
                      <span>Gelar Era Profesional</span>
                      <span className="bg-[#00FF85] text-black border border-black px-1">{allClubs[1].titles} Trofi Pro</span>
                    </div>
                    <p className="font-mono font-bold mt-1 line-clamp-1">{allClubs[1].seasonsWon.length > 0 ? allClubs[1].seasonsWon.join(", ") : "—"}</p>
                    {(allClubs[1].amatirTitles ?? 0) > 0 && (
                      <div className="mt-1.5 pt-1 border-t border-dashed border-black/20">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Amatir Perserikatan (Info Tambahan)</span>
                        <p className="font-mono text-[10px] text-slate-500 mt-0.5 line-clamp-1">{allClubs[1].amatirTitles}x: {allClubs[1].amatirSeasonsWon.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Podium 1st Place */}
              {allClubs[0] && (
                <div 
                  onClick={() => {
                    onOpenClubDetail(allClubs[0]);
                  }}
                  className="p-10 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between items-center text-center space-y-6 relative overflow-hidden bg-[#00FF85]/10 hover:bg-[#00FF85]/20 duration-150 cursor-pointer group"
                >
                  <div className="absolute top-4 right-4 bg-yellow-300 text-black border-2 border-black uppercase text-[9px] font-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    UTAMA
                  </div>
                  <span className="text-xs font-black uppercase text-emerald-800 tracking-widest">KOLEKTOR TROFI TERBANYAK</span>
                  
                  {/* Shield & Nickname */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-20 w-20 border-2 border-black bg-white p-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <ClubShield 
                        symbol={clubMetadataList[allClubs[0].name]?.emblemSymbol || "shield"} 
                        primaryColor={clubMetadataList[allClubs[0].name]?.colors.primary || "#FF5722"} 
                        secondaryColor={clubMetadataList[allClubs[0].name]?.colors.secondary || "#1A1A1A"} 
                        className="h-full w-full"
                        clubName={allClubs[0].name}
                        logoUrl={clubMetadataList[allClubs[0].name]?.logoUrl}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">{allClubs[0].name}</h3>
                      <p className="text-[10px] font-black uppercase bg-black text-[#00FF85] border border-black px-1.5 inline-block">
                        {clubMetadataList[allClubs[0].name]?.nickname || "Raja Trofi"}
                      </p>
                    </div>
                  </div>

                  <div className="h-16 w-full bg-[#00FF85] border-2 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">RAJA LIGA</span>
                    <span className="text-3xl font-mono font-black italic">#01</span>
                  </div>

                  <div className="w-full text-left bg-white border-2 border-black p-3 text-xs mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center opacity-60 text-[9px] font-black uppercase tracking-widest border-b border-black/10 pb-1 mb-1">
                      <span>Gelar Era Profesional</span>
                      <span className="bg-[#00FF85] text-black border border-black px-1">{allClubs[0].titles} Trofi Pro</span>
                    </div>
                    <p className="font-mono font-bold mt-1 line-clamp-1">{allClubs[0].seasonsWon.length > 0 ? allClubs[0].seasonsWon.join(", ") : "—"}</p>
                    {(allClubs[0].amatirTitles ?? 0) > 0 && (
                      <div className="mt-1.5 pt-1 border-t border-dashed border-black/20">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Amatir Perserikatan (Info Tambahan)</span>
                        <p className="font-mono text-[10px] text-slate-500 mt-0.5 line-clamp-1">{allClubs[0].amatirTitles}x: {allClubs[0].amatirSeasonsWon.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Podium 3rd Place */}
              {allClubs[2] && (
                <div 
                  onClick={() => {
                    onOpenClubDetail(allClubs[2]);
                  }}
                  className="p-8 flex flex-col justify-between items-center text-center space-y-6 relative overflow-hidden bg-[#F2F2F2]/10 hover:bg-[#00FF85]/5 duration-150 cursor-pointer group"
                >
                  <span className="text-xs font-black uppercase text-amber-800 tracking-widest font-sans">PERINGKAT KETIGA</span>
                  
                  {/* Shield & Nickname */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-16 w-16 border-2 border-black bg-white p-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <ClubShield 
                        symbol={clubMetadataList[allClubs[2].name]?.emblemSymbol || "shield"} 
                        primaryColor={clubMetadataList[allClubs[2].name]?.colors.primary || "#0D47A1"} 
                        secondaryColor={clubMetadataList[allClubs[2].name]?.colors.secondary || "#1A1A1A"} 
                        className="h-full w-full"
                        clubName={allClubs[2].name}
                        logoUrl={clubMetadataList[allClubs[2].name]?.logoUrl}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">{allClubs[2].name}</h3>
                      <p className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 border border-black/15 px-1 inline-block">
                        {clubMetadataList[allClubs[2].name]?.nickname || "Klub Pangeran"}
                      </p>
                    </div>
                  </div>

                  <div className="h-14 w-full bg-amber-200 border-2 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black uppercase tracking-widest">PERINGKAT</span>
                    <span className="text-3xl font-mono font-black italic">#03</span>
                  </div>

                  <div className="w-full text-left bg-white border-2 border-black p-3">
                    <div className="flex justify-between items-center opacity-60 text-[9px] font-black uppercase tracking-widest border-b border-black/10 pb-1 mb-1">
                      <span>Gelar Era Profesional</span>
                      <span className="bg-[#00FF85] text-black border border-black px-1">{allClubs[2].titles} Trofi Pro</span>
                    </div>
                    <p className="text-xs font-black mt-1 line-clamp-1">{allClubs[2].seasonsWon.length > 0 ? allClubs[2].seasonsWon.join(", ") : "—"}</p>
                    {(allClubs[2].amatirTitles ?? 0) > 0 && (
                      <div className="mt-1.5 pt-1 border-t border-dashed border-black/20">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Amatir Perserikatan (Info Tambahan)</span>
                        <p className="font-mono text-[10px] text-slate-500 mt-0.5 line-clamp-1">{allClubs[2].amatirTitles}x: {allClubs[2].amatirSeasonsWon.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* BRAND NEW UPGRADE: DYNAMIC KLUB VS KLUB COMPARISON TOOL */}
            <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6" id="vs_mode_panel">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-4 gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 bg-black text-[#00FF85] border border-black flex items-center justify-center font-bold text-xs">VS</span>
                  <div>
                    <h3 className="text-xl font-black uppercase italic leading-none">MODUL ADU KLUB (VS MODE)</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Uji kekuatan historis head-to-head secara instan</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMultiCompareOpen(true)}
                  className="bg-black text-[#00FF85] border-2 border-black px-4 py-2 text-xs font-black uppercase hover:bg-[#00FF85] hover:text-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none flex items-center gap-2"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  BANDINGKAN 3+ KLUB
                </button>
              </div>

              {/* Selector boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Club A choice */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">PILIH KLUB UTAMA</label>
                  <select
                    value={compareClubA}
                    onChange={(e) => setCompareClubA(e.target.value)}
                    className="w-full text-sm font-black bg-white border-2 border-black rounded-none p-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer appearance-none uppercase"
                  >
                    {allClubs.map((club, idx) => (
                      <option key={idx} value={club.name}>{club.name} ({club.titles} Pro{club.amatirTitles > 0 ? ` +${club.amatirTitles} Amatir` : ''})</option>
                    ))}
                  </select>
                </div>

                {/* Club B choice */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">PILIH KLUB TANDINGAN</label>
                  <select
                    value={compareClubB}
                    onChange={(e) => setCompareClubB(e.target.value)}
                    className="w-full text-sm font-black bg-white border-2 border-black rounded-none p-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer appearance-none uppercase"
                  >
                    {allClubs.map((club, idx) => (
                      <option key={idx} value={club.name}>{club.name} ({club.titles} Pro{club.amatirTitles > 0 ? ` +${club.amatirTitles} Amatir` : ''})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison scoreboard metrics */}
              {clubAData && clubBData ? (
                <div className="bg-[#F2F2F2] border-2 border-black p-6 space-y-6">
                  {/* Verdict badge */}
                  <div className="bg-black text-[#00FF85] text-center p-3 text-xs font-black uppercase tracking-wider">
                    🏆 HASIL: {getH2HWinnerMessage()}
                  </div>

                  {/* Visual metrics breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    
                    {/* National Titles metric container */}
                     <div className="bg-white border-2 border-black p-4 flex flex-col justify-between">
                       <span className="text-[9px] font-black uppercase tracking-widest opacity-60">GELAR ERA PROFESIONAL (UTAMA)</span>
                       <div className="flex justify-around items-center my-3">
                         <div className="text-center">
                           <div className="text-3xl font-mono font-black">{clubAData.titles}</div>
                           {clubAData.amatirTitles > 0 && <div className="text-[9px] font-bold text-slate-400">+{clubAData.amatirTitles} Amatir</div>}
                         </div>
                         <div className="text-xs font-black opacity-30">vs</div>
                         <div className="text-center">
                           <div className="text-3xl font-mono font-black">{clubBData.titles}</div>
                           {clubBData.amatirTitles > 0 && <div className="text-[9px] font-bold text-slate-400">+{clubBData.amatirTitles} Amatir</div>}
                         </div>
                       </div>
                       <div className="w-full h-3 bg-red-100 border border-black overflow-hidden flex">
                         <div 
                           className="h-full bg-black" 
                           style={{ width: `${(clubAData.titles / ((clubAData.titles + clubBData.titles) || 1)) * 100}%` }}
                         />
                         <div 
                           className="h-full bg-[#00FF85]" 
                           style={{ width: `${(clubBData.titles / ((clubAData.titles + clubBData.titles) || 1)) * 100}%` }}
                         />
                       </div>
                     </div>

                    {/* Runner-ups count metric container */}
                    <div className="bg-white border-2 border-black p-4 flex flex-col justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-60">TEMPAT KEDUA (RUNNER-UP)</span>
                      <div className="flex justify-around items-center my-3">
                        <div className="text-3xl font-mono font-black">{clubAData.runnerUps}</div>
                        <div className="text-xs font-black opacity-30">vs</div>
                        <div className="text-3xl font-mono font-black">{clubBData.runnerUps}</div>
                      </div>
                      <div className="w-full h-3 bg-red-100 border border-black overflow-hidden flex">
                        <div 
                          className="h-full bg-black" 
                          style={{ width: `${(clubAData.runnerUps / ((clubAData.runnerUps + clubBData.runnerUps) || 1)) * 100}%` }}
                        />
                        <div 
                          className="h-full bg-[#00FF85]" 
                          style={{ width: `${(clubBData.runnerUps / ((clubAData.runnerUps + clubBData.runnerUps) || 1)) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Dynamic AI Inquiry action */}
                    <div className="bg-[#00FF85]/20 border-2 border-black p-4 flex flex-col justify-between items-center text-center">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-80 text-emerald-800">TANYAKAN KE ASISTEN</span>
                      <p className="text-[10px] font-bold text-slate-700 leading-tight my-2">Bandingkan rivalitas taktis kedua klub ini via AI Engine.</p>
                      <button
                        onClick={() => handleExecuteSearch(`${clubAData.name} vs ${clubBData.name}`)}
                        className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-black uppercase text-[10px] transition-all cursor-pointer"
                      >
                        ANALISIS RIVALITAS
                      </button>
                    </div>

                  </div>

                  {/* List winner years comparisons side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 border border-black space-y-2">
                      <h4 className="font-extrabold text-xs uppercase bg-black text-white px-2 py-1 inline-block">
                        TAHUN JUARA - {clubAData.name.toUpperCase()}
                      </h4>
                      <p className="text-xs font-mono font-bold text-slate-800 leading-relaxed">
                        {clubAData.seasonsWon.length > 0 ? clubAData.seasonsWon.join(", ") : "Belum memenangkan mahkota juara tingkat tertinggi"}
                      </p>
                    </div>
                    <div className="bg-white p-4 border border-black space-y-2">
                      <h4 className="font-extrabold text-xs uppercase bg-[#00FF85] text-black px-2 py-1 inline-block">
                        TAHUN JUARA - {clubBData.name.toUpperCase()}
                      </h4>
                      <p className="text-xs font-mono font-bold text-slate-800 leading-relaxed">
                        {clubBData.seasonsWon.length > 0 ? clubBData.seasonsWon.join(", ") : "Belum memenangkan mahkota juara tingkat tertinggi"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* List of remaining Champions in Brutalist Table */}
            <div className="border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white" id="leaderboard_table">
              <div className="p-4 border-b-2 border-black bg-[#F2F2F2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider block">DAFTAR KESELURUHAN SEJARAH JUARA LIGA</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Diurutkan: Gelar Era Profesional (Utama) · Gelar Perserikatan Amatir sebagai Info Tambahan</span>
                </div>
                <span className="text-xs font-mono font-bold bg-[#00FF85] border border-black px-2 py-0.5">{allClubs.length} TIM UNGGUL</span>
              </div>
              <div className="divide-y-2 divide-black">
                {allClubs.slice(3).map((club, index) => {
                  const meta = clubMetadataList[club.name];
                  return (
                    <div 
                      key={index} 
                      onClick={() => {
                        onOpenClubDetail(club);
                      }}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#00FF85]/5 cursor-pointer transition-all duration-100 group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank badge */}
                        <span className="h-10 w-10 bg-black text-white font-mono font-black rounded-none flex items-center justify-center text-sm select-none group-hover:bg-[#00FF85] group-hover:text-black transition-colors shrink-0">
                          {index + 4}
                        </span>

                        {/* Custom Club Shield */}
                        {meta && (
                          <div className="h-12 w-12 border-2 border-black bg-white p-0.5 shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <ClubShield 
                              symbol={meta.emblemSymbol} 
                              primaryColor={meta.colors.primary} 
                              secondaryColor={meta.colors.secondary} 
                              className="h-full w-full"
                              clubName={club.name}
                              logoUrl={meta.logoUrl}
                            />
                          </div>
                        )}

                        <div>
                          <h4 className="text-base font-black uppercase tracking-tight flex flex-wrap items-center gap-2">
                            {club.name}
                            {meta?.nickname && (
                              <span className="text-[10px] font-black px-1.5 py-0.5 bg-black text-[#00FF85] uppercase">
                                {meta.nickname}
                              </span>
                            )}
                            {club.historicalNames.length > 0 && (
                              <span className="text-[10px] font-bold opacity-50 bg-[#F2F2F2] border border-black px-1.5 py-0.5 uppercase normal-case">
                                (dahulu: {club.historicalNames.join(", ")})
                              </span>
                            )}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3 w-3" />
                              <span>{meta?.city || "Indonesia"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3" />
                              <span>Berdiri: {meta?.founded || "-"} M</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-start">
                        <div className="text-right sm:pr-4">
                          <span className="text-[8px] font-black uppercase opacity-50">Runner-up</span>
                          <p className="text-xs font-black uppercase">{club.runnerUps} KALI</p>
                        </div>
                        <div className="bg-white group-hover:bg-[#00FF85] border-2 border-black px-5 py-2 text-center min-w-[100px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center transition-colors">
                          <span className="text-[8px] font-black uppercase tracking-widest leading-none block text-black mb-0.5">GELAR PRO</span>
                          <span className="text-xl font-mono font-black text-black leading-none">{club.titles}</span>
                          {club.amatirTitles > 0 && (
                            <span className="text-[8px] font-bold text-slate-500 leading-none mt-0.5">+{club.amatirTitles} Amatir</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footnote notes of history */}
            <div className="p-6 bg-[#F2F2F2] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs text-[#1A1A1A] space-y-2">
              <p className="font-black uppercase tracking-wider text-sm italic">
                📋 CATATAN SEJARAH UTAMA & PENYATUAN NAMA:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800 font-medium">
                <div>
                  <p>
                    • <strong>VIJ Batavia (Voetbalbond Indonesische Jacatra):</strong> Disatukan ke dalam catatan Persija Jakarta karena merupakan nama awal saat dibentuk tahun 1928 di era pembentukan PSSI pertama kali.
                  </p>
                </div>
                <div>
                  <p>
                    • <strong>SIVB Surabaya (Soerabaiasche Indonesische Voetbal Bond):</strong> Disatukan ke dalam Persebaya Surabaya sebagai pendahulu historis langsung yang mendirikan klub persatuan Kota Pahlawan tersebut.
                  </p>
                </div>
              </div>
            </div>
          </div>
  );
}
