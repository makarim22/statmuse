import { useState } from "react";
import { Calendar, Trophy, Award, ChevronDown, ChevronUp } from "lucide-react";
import { SeasonRecord } from "../types";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "./ClubShield";

interface TimelineVisualizationProps {
  data: SeasonRecord[];
  onSeasonClick?: (season: string) => void;
}

export default function TimelineVisualization({ data, onSeasonClick }: TimelineVisualizationProps) {
  const [expandedDecade, setExpandedDecade] = useState<string | null>("2020s");
  const [hoveredSeason, setHoveredSeason] = useState<string | null>(null);

  // Group seasons by decade
  const groupByDecade = (seasons: SeasonRecord[]) => {
    const decades: Record<string, SeasonRecord[]> = {};

    seasons.forEach(season => {
      const match = season.season.match(/\b(19\d\d|20\d\d)\b/);
      if (match) {
        const year = parseInt(match[0]);
        const decade = Math.floor(year / 10) * 10;
        const decadeKey = `${decade}s`;

        if (!decades[decadeKey]) {
          decades[decadeKey] = [];
        }
        decades[decadeKey].push(season);
      }
    });

    return decades;
  };

  const decades = groupByDecade(data);
  const sortedDecades = Object.keys(decades).sort((a, b) => {
    const yearA = parseInt(a);
    const yearB = parseInt(b);
    return yearB - yearA; // Descending order (newest first)
  });

  const toggleDecade = (decade: string) => {
    setExpandedDecade(expandedDecade === decade ? null : decade);
  };

  const getDecadeLabel = (decade: string) => {
    const year = parseInt(decade);
    if (year >= 2020) return "🚀 ERA MODERN TERKINI";
    if (year >= 2010) return "⚡ ERA PROFESIONAL MATANG";
    if (year >= 2000) return "🏆 ERA TRANSISI PROFESIONAL";
    if (year >= 1990) return "🎯 ERA PENGGABUNGAN";
    if (year >= 1980) return "🛡️ ERA PERSERIKATAN AKHIR";
    if (year >= 1950) return "📜 ERA PERSERIKATAN KLASIK";
    return "🏛️ ERA KOLONIAL & AWAL";
  };

  const getDecadeColor = (decade: string) => {
    const year = parseInt(decade);
    if (year >= 2020) return "bg-primary";
    if (year >= 2010) return "bg-blue-400";
    if (year >= 2000) return "bg-purple-400";
    if (year >= 1990) return "bg-yellow-400";
    if (year >= 1980) return "bg-orange-400";
    if (year >= 1950) return "bg-rose-400";
    return "bg-slate-400";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5" />
        <h3 className="text-xl font-black uppercase italic">Timeline Interaktif Juara</h3>
      </div>

      {/* Decade Accordion */}
      {sortedDecades.map(decade => {
        const isExpanded = expandedDecade === decade;
        const decadeSeasons = decades[decade];
        const championCount = decadeSeasons.filter(s => !s.isCancelled).length;

        return (
          <div key={decade} className="border-2 border-black bg-white">
            {/* Decade Header */}
            <button
              onClick={() => toggleDecade(decade)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#F2F2F2] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 ${getDecadeColor(decade)} border-2 border-black flex items-center justify-center font-black text-lg`}>
                  {decade.substring(0, 2)}
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-black uppercase">{decade}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    {getDecadeLabel(decade)} • {championCount} Musim
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {/* Decade Content */}
            {isExpanded && (
              <div className="border-t-2 border-black p-4 bg-[#F2F2F2]/30 relative overflow-hidden">
                {/* Central Timeline Line (Desktop) */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-black transform -translate-x-1/2 z-0" />
                {/* Timeline Line (Mobile) */}
                <div className="md:hidden absolute top-0 bottom-0 left-8 w-1 bg-black z-0" />

                <div className="space-y-8 py-6 relative z-10">
                  {decadeSeasons.map((season, idx) => {
                    const winnerMeta = clubMetadataList[season.winner];
                    const runnerUpMeta = clubMetadataList[season.runnerUp];
                    const isHovered = hoveredSeason === season.season;
                    const isEven = idx % 2 === 0;

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col md:flex-row w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} relative group`}
                      >
                        {/* Center Node Badge (Desktop) */}
                        <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary border-2 border-black z-30 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform px-3 py-1.5 font-black uppercase text-xs tracking-widest">
                          {season.season}
                        </div>
                        {/* Node Badge (Mobile) */}
                        <div className="md:hidden absolute top-8 left-8 transform -translate-x-1/2 bg-primary border-2 border-black z-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-2 py-1 font-black uppercase text-[10px] tracking-widest whitespace-nowrap">
                          {season.season}
                        </div>

                        {/* Card Wrapper to handle spacing */}
                        <div className={`w-full md:w-[47%] pl-20 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                          <div
                            onMouseEnter={() => setHoveredSeason(season.season)}
                            onMouseLeave={() => setHoveredSeason(null)}
                            onClick={() => onSeasonClick?.(season.season)}
                            className={`border-4 border-black bg-white p-5 transition-all cursor-pointer relative ${
                              isHovered ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                            } ${season.isCancelled ? 'opacity-50' : ''}`}
                          >
                            {/* Connecting Line from Card to Center (Desktop) */}
                            <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 h-1 bg-black w-10 ${isEven ? 'right-[-40px]' : 'left-[-40px]'}`} />

                            <div className="flex flex-col gap-4">
                              {/* Season year badge is now on the timeline axis */}

                              {/* Winner & Runner-up */}
                              {!season.isCancelled ? (
                                <div className="space-y-4">
                                  {/* Winner */}
                                  <div className="flex items-center gap-3">
                                    {winnerMeta && (
                                      <div className="h-12 w-12 border-2 border-black bg-[#F2F2F2] p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <ClubShield
                                          symbol={winnerMeta.emblemSymbol}
                                          primaryColor={winnerMeta.colors.primary}
                                          secondaryColor={winnerMeta.colors.secondary}
                                          className="h-full w-full"
                                          clubName={season.winner}
                                          logoUrl={winnerMeta.logoUrl}
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <p className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1 bg-primary/20 inline-flex px-1 border border-emerald-600/30">
                                        <Trophy className="h-3 w-3" />
                                        JUARA
                                      </p>
                                      <p className="text-base font-black uppercase leading-tight mt-1">{season.winner}</p>
                                    </div>
                                  </div>

                                  {/* Runner-up */}
                                  <div className="flex items-center gap-3 opacity-80">
                                    {runnerUpMeta && (
                                      <div className="h-8 w-8 border border-black bg-[#F2F2F2] p-0.5 grayscale">
                                        <ClubShield
                                          symbol={runnerUpMeta.emblemSymbol}
                                          primaryColor={runnerUpMeta.colors.primary}
                                          secondaryColor={runnerUpMeta.colors.secondary}
                                          className="h-full w-full"
                                          clubName={season.runnerUp}
                                          logoUrl={runnerUpMeta.logoUrl}
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <p className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-1">
                                        <Award className="h-3 w-3" />
                                        RUNNER-UP
                                      </p>
                                      <p className="text-xs font-bold uppercase">{season.runnerUp}</p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm font-black uppercase text-rose-600 border-2 border-rose-600 p-2 bg-rose-50 text-center">
                                  ⚠️ KOMPETISI DIBATALKAN
                                </div>
                              )}

                              {/* Additional Info */}
                              {(season.topScorer || season.coach) && (
                                <div className="mt-2 pt-3 border-t-2 border-black border-dashed flex flex-col gap-2 text-xs">
                                  {season.topScorer && (
                                    <div className="flex justify-between items-center bg-[#F2F2F2] p-1.5 border border-black/10">
                                      <span className="font-black uppercase text-[9px] tracking-widest">⚽ Top Scorer:</span>
                                      <span className="font-bold">{season.topScorer}</span>
                                    </div>
                                  )}
                                  {season.coach && (
                                    <div className="flex justify-between items-center bg-[#F2F2F2] p-1.5 border border-black/10">
                                      <span className="font-black uppercase text-[9px] tracking-widest">👔 Pelatih:</span>
                                      <span className="font-bold">{season.coach}</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {season.note && (
                                <div className="mt-1 bg-amber-100 border border-black p-2 text-[10px] font-bold text-black italic">
                                  📝 {season.note}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
