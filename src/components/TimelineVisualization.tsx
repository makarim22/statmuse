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
    if (year >= 2020) return "bg-[#00FF85]";
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
              <div className="border-t-2 border-black p-4 bg-[#F2F2F2]/30">
                <div className="space-y-3">
                  {decadeSeasons.map((season, idx) => {
                    const winnerMeta = clubMetadataList[season.winner];
                    const runnerUpMeta = clubMetadataList[season.runnerUp];
                    const isHovered = hoveredSeason === season.season;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredSeason(season.season)}
                        onMouseLeave={() => setHoveredSeason(null)}
                        onClick={() => onSeasonClick?.(season.season)}
                        className={`border-2 border-black bg-white p-4 transition-all cursor-pointer ${
                          isHovered ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' : ''
                        } ${season.isCancelled ? 'opacity-50' : ''}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Season Info */}
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-black text-[#00FF85] border-2 border-black flex items-center justify-center font-mono font-black text-xs">
                              {season.season.split('–')[0]}
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-slate-500">MUSIM</p>
                              <p className="text-lg font-black uppercase">{season.season}</p>
                            </div>
                          </div>

                          {/* Winner & Runner-up */}
                          {!season.isCancelled ? (
                            <div className="flex items-center gap-4">
                              {/* Winner */}
                              <div className="flex items-center gap-2">
                                {winnerMeta && (
                                  <div className="h-10 w-10 border-2 border-black bg-white p-0.5">
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
                                  <p className="text-[9px] font-black uppercase text-emerald-600 flex items-center gap-1">
                                    <Trophy className="h-3 w-3" />
                                    JUARA
                                  </p>
                                  <p className="text-sm font-black uppercase">{season.winner}</p>
                                </div>
                              </div>

                              {/* Runner-up */}
                              <div className="flex items-center gap-2">
                                {runnerUpMeta && (
                                  <div className="h-8 w-8 border border-black bg-white p-0.5">
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
                                  <p className="text-xs font-black uppercase">{season.runnerUp}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm font-black uppercase text-rose-600">
                              ⚠️ KOMPETISI DIBATALKAN
                            </div>
                          )}
                        </div>

                        {/* Additional Info */}
                        {(season.topScorer || season.coach) && (
                          <div className="mt-3 pt-3 border-t border-black/10 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {season.topScorer && (
                              <div>
                                <span className="font-black uppercase text-slate-500">⚽ Top Scorer:</span>
                                <span className="ml-2 font-bold">{season.topScorer}</span>
                              </div>
                            )}
                            {season.coach && (
                              <div>
                                <span className="font-black uppercase text-slate-500">👔 Pelatih:</span>
                                <span className="ml-2 font-bold">{season.coach}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {season.note && (
                          <div className="mt-2 text-[10px] font-bold text-slate-600 italic">
                            📝 {season.note}
                          </div>
                        )}
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
