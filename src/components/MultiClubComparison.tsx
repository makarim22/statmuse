import { useState, useEffect } from "react";
import { X, Plus, Trash2, BarChart3, TrendingUp, Trophy } from "lucide-react";
import { ClubSummary } from "../types";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "./ClubShield";
import ClubRadarChart from "./ClubRadarChart";
import { soundEngine } from "../utils/soundEngine";

interface MultiClubComparisonProps {
  allClubs: ClubSummary[];
  onClose: () => void;
}

export default function MultiClubComparison({ allClubs, onClose }: MultiClubComparisonProps) {
  useEffect(() => {
    soundEngine.playThud();
  }, []);

  const [selectedClubs, setSelectedClubs] = useState<string[]>([
    allClubs[0]?.name || "",
    allClubs[1]?.name || ""
  ]);

  const addClub = () => {
    if (selectedClubs.length < 6) {
      const availableClub = allClubs.find(c => !selectedClubs.includes(c.name));
      if (availableClub) {
        setSelectedClubs([...selectedClubs, availableClub.name]);
      }
    }
  };

  const removeClub = (clubName: string) => {
    if (selectedClubs.length > 2) {
      setSelectedClubs(selectedClubs.filter(c => c !== clubName));
    }
  };

  const updateClub = (index: number, newClubName: string) => {
    const updated = [...selectedClubs];
    updated[index] = newClubName;
    setSelectedClubs(updated);
  };

  const getClubData = (clubName: string): ClubSummary | undefined => {
    return allClubs.find(c => c.name === clubName);
  };

  const maxTitles = Math.max(...selectedClubs.map(name => getClubData(name)?.titles || 0));
  const maxRunnerUps = Math.max(...selectedClubs.map(name => getClubData(name)?.runnerUps || 0));
  const maxTotalTitles = Math.max(...selectedClubs.map(name => {
    const club = getClubData(name);
    return (club?.titles || 0) + (club?.amatirTitles || 0);
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
              PERBANDINGAN MULTI-KLUB
            </h2>
            <p className="text-xs font-bold text-slate-500 mt-1">
              Bandingkan hingga 6 klub sekaligus secara head-to-head
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-black text-white hover:bg-[#00FF85] hover:text-black border-2 border-black transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Club Selectors */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-slate-600">
              Pilih Klub untuk Dibandingkan ({selectedClubs.length}/6)
            </span>
            {selectedClubs.length < 6 && (
              <button
                onClick={addClub}
                className="px-3 py-1.5 bg-[#00FF85] text-black border-2 border-black text-xs font-black uppercase flex items-center gap-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Plus className="h-3 w-3" />
                Tambah Klub
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedClubs.map((clubName, index) => (
              <div key={index} className="flex items-center gap-2 bg-[#F2F2F2] border-2 border-black p-2">
                <select
                  value={clubName}
                  onChange={(e) => updateClub(index, e.target.value)}
                  className="flex-1 text-xs font-black uppercase bg-white border-2 border-black px-2 py-1.5"
                >
                  {allClubs.map(club => (
                    <option key={club.name} value={club.name}>
                      {club.name}
                    </option>
                  ))}
                </select>
                {selectedClubs.length > 2 && (
                  <button
                    onClick={() => removeClub(clubName)}
                    className="p-1.5 bg-rose-500 text-white border-2 border-black hover:bg-rose-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-6">

          {/* Radar Chart Head-to-Head (Only when 2 clubs are selected) */}
          {selectedClubs.length === 2 && (
            <div className="h-[400px]">
              <ClubRadarChart 
                clubA={getClubData(selectedClubs[0])!} 
                clubB={getClubData(selectedClubs[1])!} 
              />
            </div>
          )}

          {/* Professional Titles Comparison */}
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5" />
              <h3 className="text-lg font-black uppercase">Gelar Era Profesional (1994-95+)</h3>
            </div>
            <div className="space-y-3">
              {selectedClubs.map(clubName => {
                const club = getClubData(clubName);
                const meta = clubMetadataList[clubName];
                const percentage = maxTitles > 0 ? (club?.titles || 0) / maxTitles * 100 : 0;

                return (
                  <div key={clubName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        {meta && (
                          <div className="h-6 w-6 border border-black bg-white p-0.5">
                            <ClubShield
                              symbol={meta.emblemSymbol}
                              primaryColor={meta.colors.primary}
                              secondaryColor={meta.colors.secondary}
                              className="h-full w-full"
                              clubName={clubName}
                              logoUrl={meta.logoUrl}
                            />
                          </div>
                        )}
                        <span className="uppercase">{clubName}</span>
                      </div>
                      <span className="font-mono bg-[#00FF85] border border-black px-2 py-0.5">
                        {club?.titles || 0} GELAR
                      </span>
                    </div>
                    <div className="relative h-8 w-full bg-[#F2F2F2] border-2 border-black">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-[#00FF85] border-r-2 border-black transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-[10px] font-black text-black uppercase">
                          {club?.seasonsWon.join(", ") || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Runner-Up Comparison */}
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5" />
              <h3 className="text-lg font-black uppercase">Posisi Runner-Up</h3>
            </div>
            <div className="space-y-3">
              {selectedClubs.map(clubName => {
                const club = getClubData(clubName);
                const percentage = maxRunnerUps > 0 ? (club?.runnerUps || 0) / maxRunnerUps * 100 : 0;

                return (
                  <div key={clubName} className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase w-32 truncate">{clubName}</span>
                    <div className="flex-1 relative h-6 bg-[#F2F2F2] border-2 border-black">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-amber-400 border-r-2 border-black transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-black w-16 text-right">
                      {club?.runnerUps || 0}x
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Titles (Professional + Amateur) */}
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5" />
              <h3 className="text-lg font-black uppercase">Total Gelar (Profesional + Amatir)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {selectedClubs.map(clubName => {
                const club = getClubData(clubName);
                const totalTitles = (club?.titles || 0) + (club?.amatirTitles || 0);
                const meta = clubMetadataList[clubName];

                return (
                  <div key={clubName} className="border-2 border-black bg-[#F2F2F2] p-3 text-center">
                    {meta && (
                      <div className="h-12 w-12 border border-black bg-white p-0.5 mx-auto mb-2">
                        <ClubShield
                          symbol={meta.emblemSymbol}
                          primaryColor={meta.colors.primary}
                          secondaryColor={meta.colors.secondary}
                          className="h-full w-full"
                          clubName={clubName}
                          logoUrl={meta.logoUrl}
                        />
                      </div>
                    )}
                    <p className="text-[10px] font-black uppercase text-slate-600 mb-1 truncate">
                      {clubName}
                    </p>
                    <p className="text-2xl font-mono font-black">{totalTitles}</p>
                    <p className="text-[9px] font-bold text-slate-500">
                      {club?.titles}P + {club?.amatirTitles || 0}A
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t-2 border-black">
          <button
            onClick={onClose}
            className="w-full py-3 bg-black text-white border-2 border-black font-black text-xs uppercase hover:bg-[#00FF85] hover:text-black transition-all"
          >
            Tutup Perbandingan
          </button>
        </div>

      </div>
    </div>
  );
}
