import React from "react";
import { Calendar, Sparkles, Trophy } from "lucide-react";
import { getLiginaData, getLiginaClubsRanking } from "../data/leagueData";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "../components/ClubShield";

export default function LigaIndonesiaView({ onAskAboutLiginaSeason, onOpenClubDetail }: any) {
            const ranking = getLiginaClubsRanking();
          const bestClub = ranking[0];
          const uniqueChampions = ranking.filter(c => c.titles > 0).length;
          const dataList = getLiginaData();

          return (
            <div className="space-y-10" id="liga_indonesia_view">
              <title>Sejarah Liga Indonesia (1994-2007) - Garuda Stats</title>
              <meta name="description" content="Era unifikasi Divisi Utama Liga Indonesia (Ligina) hingga era Indonesia Super League (ISL)." />
              {/* Liga Indonesia Hero Card */}
              <div className="bg-[#0284C7] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 select-none pointer-events-none">
                  <Trophy className="h-96 w-96 text-white" />
                </div>
                <div className="relative z-10 max-w-4xl space-y-4">
                  <span className="bg-yellow-300 text-black px-3 py-1 text-xs font-black border-2 border-black uppercase tracking-widest inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Era Penyatuan (1994 - 2008)
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
                    LIGA INDONESIA (LIGINA)
                  </h2>
                  <p className="text-sm sm:text-base font-bold leading-relaxed opacity-95 text-stone-100">
                    Liga Indonesia (Ligina), atau Divisi Utama Liga Indonesia, resmi dibentuk pada tahun 1994 sebagai hasil peleburan kompetisi Perserikatan (amatir) dan Galatama (semi-profesional). Era ini menandai sejarah baru sepak bola profesional Indonesia dengan format pembagian wilayah (Barat, Tengah, Timur) serta babak 8 Besar yang legendaris, melahirkan juara ikonik seperti Bandung Raya, Petrokimia Putra, Persik Kediri, Sriwijaya FC, dan permulaan kejayaan mutlak Persipura Jayapura.
                  </p>
                </div>
              </div>

              {/* Liga Indonesia Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Durasi Era</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black tracking-tighter">14 TAHUN</span>
                  </div>
                  <span className="text-[9px] text-[#0284C7] font-black bg-[#0284C7]/10 border border-black px-1.5 py-0.5 mt-3 w-max">1994 S.D 2008</span>
                </div>
                <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-[#F2F2F2]/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Klub Tersukses</p>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-black italic tracking-tighter truncate uppercase text-[#0284C7]">
                      {bestClub ? bestClub.name.toUpperCase() : "PERSEBAYA & PERSIK"}
                    </span>
                    <span className="text-xs font-bold opacity-75 mt-1">
                      Masing-masing mengoleksi {bestClub ? bestClub.titles : 2} Gelar Juara
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Tim Juara Unik</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black tracking-tighter">{uniqueChampions} KLUB</span>
                    <span className="text-xs font-bold uppercase opacity-55">Kampiun Berbeda</span>
                  </div>
                  <span className="text-[9px] text-black font-bold bg-yellow-300 border border-black px-1.5 py-0.5 mt-3 w-max">ERA PERSAINGAN BARU</span>
                </div>
              </div>

              {/* Layout Leaderboard & Daftar Musim */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Leaderboard Column (Left/4) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="border-4 border-black p-6 bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">KLASEMEN SEPANJANG MASA</h3>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      Daftar klub pengumpul trofi juara Divisi Utama Liga Indonesia terbanyak sepanjang sejarah 13 edisi aktif.
                    </p>
                  </div>

                  <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="p-3 border-b-2 border-black bg-[#F2F2F2] flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider">DAFTAR KOLEKTOR TROFI</span>
                      <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5">{ranking.length} TIM</span>
                    </div>
                    <div className="divide-y-2 divide-black">
                      {ranking.map((club, idx) => {
                        const meta = clubMetadataList[club.name];
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              onOpenClubDetail(club);
                            }}
                            className="p-4 flex items-center justify-between hover:bg-[#0284C7]/5 cursor-pointer transition-all duration-100 group bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <span className="h-7 w-7 bg-black text-white font-mono font-black flex items-center justify-center text-xs group-hover:bg-[#0284C7] transition-colors">
                                {idx + 1}
                              </span>
                              {meta && (
                                <div className="h-8 w-8 border border-black bg-white p-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
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
                                <h4 className="font-extrabold text-sm uppercase group-hover:text-[#0284C7] transition-colors line-clamp-1 text-black">
                                  {club.name}
                                </h4>
                                {club.historicalNames.length > 0 && (
                                  <p className="text-[9px] font-bold text-stone-400 uppercase leading-none">
                                    Alias: {club.historicalNames.join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-lg font-black italic tracking-tight text-black">{club.titles}🏆</span>
                              <p className="text-[8px] font-mono font-bold text-stone-500 uppercase leading-none">
                                {club.runnerUps}x RUNNER-UP
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Seasons Grid Column (Right/8) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-black pb-4">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-black">RIWAYAT PER MUSIM</h3>
                    <span className="text-xs font-mono font-bold bg-[#0284C7] text-white border border-black px-2.5 py-1">
                      {dataList.length} EDISI LIGA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                    {dataList.map((record) => {
                      return (
                        <div
                          key={record.season}
                          className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
                        >
                          {/* Card Header */}
                          <div className="p-4 border-b-2 border-black bg-[#0284C7]/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4.5 w-4.5 text-[#0284C7]" />
                              <span className="text-sm font-black tracking-tight text-black">{record.season}</span>
                            </div>
                            <span className="text-[9px] font-black uppercase bg-black text-primary border border-black px-2 py-0.5">
                              {record.isCancelled ? "BATAL" : "PROFESIONAL"}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-4 flex-grow">
                            {record.isCancelled ? (
                              <div className="p-3 border-2 border-red-500 bg-red-50 text-red-700 rounded-none text-xs space-y-1">
                                <p className="font-extrabold uppercase flex items-center gap-1">❌ KOMPETISI DIBATALKAN</p>
                                <p className="font-medium text-[11px] leading-relaxed">{record.note}</p>
                              </div>
                            ) : (
                              <>
                                {/* Champion Row */}
                                <div
                                  onClick={() => {
                                    const c = ranking.find(x => x.name === record.winner || x.historicalNames.includes(record.winner)) || {
                                      name: record.winner,
                                      titles: 1,
                                      runnerUps: 0,
                                      seasonsWon: [record.season],
                                      historicalNames: []
                                    };
                                    onOpenClubDetail(c);
                                  }}
                                  className="flex items-center gap-3 p-2 border border-black bg-[#F8FAF3] hover:bg-primary/10 cursor-pointer transition-colors"
                                >
                                  <div className="h-9 w-9 bg-yellow-300 border border-black flex items-center justify-center shrink-0">
                                    🏆
                                  </div>
                                  <div className="min-w-0 flex-grow">
                                    <p className="text-[9px] font-bold text-stone-500 uppercase leading-none">JUARA (CHAMPION)</p>
                                    <h4 className="font-extrabold text-sm uppercase text-black truncate">{record.winner}</h4>
                                  </div>
                                </div>

                                {/* Runner-up Row */}
                                <div
                                  onClick={() => {
                                    const c = ranking.find(x => x.name === record.runnerUp || x.historicalNames.includes(record.runnerUp)) || {
                                      name: record.runnerUp,
                                      titles: 0,
                                      runnerUps: 1,
                                      seasonsWon: [],
                                      historicalNames: []
                                    };
                                    onOpenClubDetail(c);
                                  }}
                                  className="flex items-center gap-3 p-2 border border-black bg-white hover:bg-slate-100 cursor-pointer transition-colors"
                                >
                                  <div className="h-9 w-9 bg-[#F2F2F2] border border-black flex items-center justify-center shrink-0 text-stone-500 font-mono font-bold text-xs">
                                    2nd
                                  </div>
                                  <div className="min-w-0 flex-grow">
                                    <p className="text-[9px] font-bold text-stone-500 uppercase leading-none">RUNNER-UP</p>
                                    <h4 className="font-extrabold text-sm uppercase text-black truncate">{record.runnerUp}</h4>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Stats Info */}
                            <div className="pt-2 border-t border-dashed border-stone-300 space-y-1.5 text-xs">
                              {record.topScorer && (
                                <div className="flex items-start gap-1">
                                  <span className="font-bold text-stone-500 shrink-0">Top Skor:</span>
                                  <span className="font-semibold text-stone-900">{record.topScorer}</span>
                                </div>
                              )}
                              {record.coach && (
                                <div className="flex items-start gap-1">
                                  <span className="font-bold text-stone-500 shrink-0">Pelatih Juara:</span>
                                  <span className="font-semibold text-[#0284C7]">{record.coach}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="p-2 border-t-2 border-black bg-stone-50">
                            <button
                              onClick={() => onAskAboutLiginaSeason(record.season)}
                              className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="h-3 w-3 text-primary" />
                              TANYAKAN DETAIL KE ASISTEN AI
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
}
