import React from "react";
import { Calendar, Sparkles, Trophy } from "lucide-react";
import { galatamaData, getGalatamaClubsRanking } from "../data/galatamaData";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "../components/ClubShield";

export default function GalatamaView({ onAskAboutGalatamaSeason, onOpenClubDetail }: any) {
  return (
          <div className="space-y-10" id="galatama_view">
            <title>Sejarah Liga Galatama (1979-1994) - Garuda Stats</title>
            <meta name="description" content="Catatan sejarah, klasemen sepanjang masa, dan daftar juara Liga Galatama, kompetisi semi-profesional legendaris Indonesia." />
            {/* Galatama Hero Card */}
            <div className="bg-[#8A5CF5] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 select-none pointer-events-none">
                <Trophy className="h-96 w-96 text-white" />
              </div>
              <div className="relative z-10 max-w-4xl space-y-4">
                <span className="bg-yellow-300 text-black px-3 py-1 text-xs font-black border-2 border-black uppercase tracking-widest inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Era Semi-Profesional (1979 - 1994)
                </span>
                <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
                  LIGA SEPAK BOLA<br />UTAMA (GALATAMA)
                </h2>
                <p className="text-sm sm:text-base font-bold leading-relaxed opacity-95 text-stone-100">
                  Liga Sepak Bola Utama (Galatama) adalah liga sepak bola semi-profesional pertama di Indonesia, didirikan pada tahun 1979 oleh PSSI. Berjalan sejajar dengan kompetisi amatir Perserikatan, Galatama menjadi pionir kompetisi sepak bola bayaran dan industri olahraga di Asia Tenggara. Kompetisi ini melahirkan klub-klub legendaris yang dikelola secara mandiri seperti NIAC Mitra Surabaya, Warna Agung Jakarta, Krama Yudha Tiga Berlian, hingga raksasa bertabur bintang Pelita Jaya, sebelum akhirnya melebur dengan Perserikatan menjadi Liga Indonesia (Ligina) pada tahun 1994.
                </p>
              </div>
            </div>

            {/* Galatama Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-white">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Durasi Liga</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-black tracking-tighter">15 TAHUN</span>
                </div>
                <span className="text-[9px] text-[#8A5CF5] font-black bg-[#8A5CF5]/10 border border-black px-1.5 py-0.5 mt-3 w-max">1979 S.D 1994</span>
              </div>
              <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-[#F2F2F2]/50">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Klub Tersukses</p>
                <div className="flex flex-col mt-2">
                  <span className="text-2xl font-black italic tracking-tighter truncate uppercase text-[#8A5CF5]">NIAC MITRA & PELITA JAYA</span>
                  <span className="text-xs font-bold opacity-75 mt-1">Masing-masing 3 Gelar Juara</span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between bg-white">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Tim Juara Unik</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-black tracking-tighter">7 KLUB</span>
                  <span className="text-xs font-bold uppercase opacity-55">Kampiun Berbeda</span>
                </div>
                <span className="text-[9px] text-black font-bold bg-yellow-300 border border-black px-1.5 py-0.5 mt-3 w-max">KOMPETISI KETAT</span>
              </div>
            </div>

            {/* Layout Leaderboard & Daftar Musim */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Leaderboard Column (Left/4) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="border-4 border-black p-6 bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">KLASEMEN SEPANJANG MASA</h3>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    Daftar klub pengumpul trofi Galatama terbanyak sepanjang sejarah 13 musim penyelenggaraan.
                  </p>
                </div>

                <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="p-3 border-b-2 border-black bg-[#F2F2F2] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider">DAFTAR KOLEKTOR TROFI</span>
                    <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5">7 TIM</span>
                  </div>
                  <div className="divide-y-2 divide-black">
                    {getGalatamaClubsRanking().map((club, idx) => {
                      const meta = clubMetadataList[club.name];
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            onOpenClubDetail(club);
                          }}
                          className="p-4 flex items-center justify-between hover:bg-[#8A5CF5]/5 cursor-pointer transition-all duration-100 group bg-white"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-7 w-7 bg-black text-white font-mono font-black flex items-center justify-center text-xs group-hover:bg-[#8A5CF5] transition-colors">
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
                              <h4 className="font-extrabold text-sm uppercase group-hover:text-[#8A5CF5] transition-colors line-clamp-1 text-black">
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
                  <span className="text-xs font-mono font-bold bg-[#8A5CF5] text-white border border-black px-2.5 py-1">
                    {galatamaData.length} EDISI LIGA
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {galatamaData.map((record) => {
                    return (
                      <div
                        key={record.season}
                        className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
                      >
                        {/* Card Header */}
                        <div className="p-4 border-b-2 border-black bg-[#8A5CF5]/5 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4.5 w-4.5 text-[#8A5CF5]" />
                            <span className="text-sm font-black tracking-tight text-black">{record.season}</span>
                          </div>
                          <span className="text-[9px] font-black uppercase bg-black text-[#00FF85] border border-black px-2 py-0.5">
                            SEMI-PRO
                          </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-4 flex-grow">
                          {/* Champion Row */}
                          <div
                            onClick={() => {
                              const ranking = getGalatamaClubsRanking();
                              const c = ranking.find(x => x.name === record.winner || x.historicalNames.includes(record.winner)) || {
                                name: record.winner,
                                titles: 1,
                                runnerUps: 0,
                                seasonsWon: [record.season],
                                historicalNames: [],
                                amatirTitles: 0,
                                amatirSeasonsWon: [],
                              };
                              onOpenClubDetail(c);
                            }}
                            className="flex items-center gap-3 p-2 border border-black bg-[#F8FAF3] hover:bg-[#00FF85]/10 cursor-pointer transition-colors"
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
                              const ranking = getGalatamaClubsRanking();
                              const c = ranking.find(x => x.name === record.runnerUp || x.historicalNames.includes(record.runnerUp)) || {
                                name: record.runnerUp,
                                titles: 0,
                                runnerUps: 1,
                                seasonsWon: [],
                                historicalNames: [],
                                amatirTitles: 0,
                                amatirSeasonsWon: [],
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
                                <span className="font-semibold text-[#8A5CF5]">{record.coach}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="p-2 border-t-2 border-black bg-stone-50">
                          <button
                            onClick={() => onAskAboutGalatamaSeason(record.season)}
                            className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="h-3 w-3 text-[#00FF85]" />
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
