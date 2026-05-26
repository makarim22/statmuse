import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Award } from "lucide-react";
import { SeasonRecord } from "../types";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "./ClubShield";

interface TimelineVisualizationProps {
  data: SeasonRecord[];
  onSeasonClick?: (season: string) => void;
}

export default function TimelineVisualization({ data, onSeasonClick }: TimelineVisualizationProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Recalculate draggable width when data changes
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [data]);

  const getEraForSeason = (seasonStr: string): string => {
    const match = seasonStr.match(/\b\d{4}\b/);
    if (!match) return "modern";
    const year = parseInt(match[0]);
    if (year < 1994) return "Perserikatan";
    if (year < 2008) return "Ligina";
    return "Modern";
  };

  return (
    <div className="w-full relative border-4 border-black bg-white overflow-hidden py-16" ref={carouselRef}>
      {/* Background horizontal line */}
      <div className="absolute top-1/2 left-0 right-0 h-4 bg-black transform -translate-y-1/2 z-0" />
      
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: "grabbing" }}
        className="flex flex-row items-center px-10 cursor-grab z-10 relative"
      >
        {data.map((season, idx) => {
          const winnerMeta = clubMetadataList[season.winner];
          const runnerUpMeta = clubMetadataList[season.runnerUp];
          const isTop = idx % 2 === 0;
          const era = getEraForSeason(season.season);
          
          return (
            <motion.div 
              key={season.season} 
              className="relative flex flex-col items-center justify-center min-w-[320px] px-6"
            >
              
              {/* Node on the timeline */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="h-8 w-8 rounded-full bg-primary border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" />
              </div>

              {/* Connecting Line */}
              <div 
                className={`absolute left-1/2 w-2 bg-black z-10 ${
                  isTop ? "bottom-1/2 top-[120px]" : "top-1/2 bottom-[120px]"
                }`} 
                style={{ transform: 'translateX(-50%)' }}
              />

              {/* Content Card */}
              <div 
                className={`border-4 border-black bg-white p-5 w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-30 transition-transform hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F2F2F2] ${
                  isTop ? "mb-[250px]" : "mt-[250px]"
                }`}
                onClick={() => onSeasonClick?.(season.season)}
              >
                <div className="flex justify-between items-center border-b-4 border-black pb-3 mb-4">
                  <span className="font-black text-xl uppercase italic">{season.season}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 border-2 border-black">{era}</span>
                </div>

                {!season.isCancelled ? (
                  <div className="space-y-4">
                    {/* Winner */}
                    <div className="flex items-center gap-3">
                      {winnerMeta && (
                        <div className="h-12 w-12 shrink-0 border-2 border-black bg-white p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
                        <p className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1">
                          <Trophy className="h-4 w-4" /> JUARA
                        </p>
                        <p className="text-base font-black uppercase leading-tight truncate w-[160px]" title={season.winner}>{season.winner}</p>
                      </div>
                    </div>

                    {/* Runner-up */}
                    <div className="flex items-center gap-3 opacity-80">
                      {runnerUpMeta && (
                        <div className="h-8 w-8 shrink-0 border-2 border-black bg-white grayscale">
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
                          <Award className="h-3 w-3" /> RUNNER-UP
                        </p>
                        <p className="text-xs font-bold uppercase leading-tight truncate w-[160px]" title={season.runnerUp}>{season.runnerUp}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                   <div className="text-sm font-black uppercase text-rose-600 border-4 border-rose-600 p-3 bg-rose-50 text-center">
                      ⚠️ KOMPETISI DIBATALKAN
                   </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <p className="text-[10px] font-black text-black uppercase tracking-widest bg-primary px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          ← GESER (DRAG) UNTUK MENELUSURI WAKTU →
        </p>
      </div>
    </div>
  );
}
