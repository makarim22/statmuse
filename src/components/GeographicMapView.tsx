import { MapPin, Trophy, Award } from "lucide-react";
import { ClubSummary } from "../types";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "./ClubShield";
import indonesiaMapUrl from '../assets/indonesia.svg';

interface GeographicMapViewProps {
  clubs: ClubSummary[];
  onClubClick?: (club: ClubSummary) => void;
}

// Indonesian regions with approximate coordinates for visualization
const regions = [
  { name: "Sumatera", x: 18, y: 32, color: "#EF4444" },
  { name: "Jawa", x: 42, y: 56, color: "#3B82F6" },
  { name: "Kalimantan", x: 48, y: 32, color: "#10B981" },
  { name: "Sulawesi", x: 70, y: 42, color: "#F59E0B" },
  { name: "Papua", x: 88, y: 46, color: "#8B5CF6" },
  { name: "Bali & Nusa Tenggara", x: 65, y: 62, color: "#EC4899" }
];

// City coordinates (approximate positions on Indonesia map)
const cityCoordinates: Record<string, { x: number; y: number; region: string }> = {
  "DKI Jakarta": { x: 42, y: 52, region: "Jawa" },
  "Bandung, Jawa Barat": { x: 43, y: 53, region: "Jawa" },
  "Surabaya, Jawa Timur": { x: 50, y: 53, region: "Jawa" },
  "Semarang, Jawa Tengah": { x: 46, y: 52, region: "Jawa" },
  "DI Yogyakarta": { x: 46, y: 54, region: "Jawa" },
  "Surakarta, Jawa Tengah": { x: 47, y: 53, region: "Jawa" },
  "Malang, Jawa Timur": { x: 51, y: 54, region: "Jawa" },
  "Medan, Sumatera Utara": { x: 18, y: 22, region: "Sumatera" },
  "Palembang, Sumatera Selatan": { x: 25, y: 30, region: "Sumatera" },
  "Banda Aceh, Aceh": { x: 15, y: 18, region: "Sumatera" },
  "Pekanbaru, Riau": { x: 22, y: 25, region: "Sumatera" },
  "Padang, Sumatera Barat": { x: 20, y: 28, region: "Sumatera" },
  "Makassar, Sulawesi Selatan": { x: 72, y: 42, region: "Sulawesi" },
  "Jayapura, Papua": { x: 88, y: 45, region: "Papua" },
  "Samarinda, Kalimantan Timur": { x: 62, y: 35, region: "Kalimantan" },
  "Balikpapan, Kalimantan Timur": { x: 63, y: 37, region: "Kalimantan" },
  "Banjarmasin, Kalimantan Selatan": { x: 60, y: 40, region: "Kalimantan" },
  "Bontang, Kalimantan Timur": { x: 64, y: 34, region: "Kalimantan" },
  "Gianyar, Bali": { x: 58, y: 58, region: "Bali & Nusa Tenggara" },
  "Tangerang, Banten": { x: 41, y: 52, region: "Jawa" },
  "Bogor, Jawa Barat": { x: 42, y: 53, region: "Jawa" },
  "Kediri, Jawa Timur": { x: 49, y: 54, region: "Jawa" },
  "Gresik, Jawa Timur": { x: 51, y: 52, region: "Jawa" },
  "Sidoarjo, Jawa Timur": { x: 50, y: 53, region: "Jawa" },
  "Pamekasan, Madura": { x: 52, y: 52, region: "Jawa" },
  "Tangerang Selatan, Banten": { x: 41, y: 52, region: "Jawa" },
  "Sleman, DI Yogyakarta": { x: 46, y: 54, region: "Jawa" },
  "Lamongan, Jawa Timur": { x: 49, y: 52, region: "Jawa" },
  "Jepara, Jawa Tengah": { x: 47, y: 51, region: "Jawa" }
};

export default function GeographicMapView({ clubs, onClubClick }: GeographicMapViewProps) {
  // Group clubs by region
  const clubsByRegion: Record<string, ClubSummary[]> = {};

  clubs.forEach(club => {
    const meta = clubMetadataList[club.name];
    if (meta) {
      const cityData = cityCoordinates[meta.city];
      if (cityData) {
        const region = cityData.region;
        if (!clubsByRegion[region]) {
          clubsByRegion[region] = [];
        }
        clubsByRegion[region].push(club);
      }
    }
  });

  // Calculate region statistics
  const regionStats = regions.map(region => {
    const clubsInRegion = clubsByRegion[region.name] || [];
    // Sort clubs inside region by titles
    clubsInRegion.sort((a, b) => b.titles - a.titles);
    
    const totalTitles = clubsInRegion.reduce((sum, club) => sum + club.titles, 0);
    const totalAmatirTitles = clubsInRegion.reduce((sum, club) => sum + (club.amatirTitles || 0), 0);
    return {
      ...region,
      clubCount: clubsInRegion.length,
      totalTitles,
      totalAmatirTitles,
      clubs: clubsInRegion
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
        <div className="h-12 w-12 bg-black flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_#00FF85]">
          <MapPin className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter italic">Peta Distribusi Juara</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Pemetaan Geografis Klub Tersukses di Indonesia</p>
        </div>
      </div>

      {/* Brutalist Indonesia Map Visualization */}
      <div className="border-4 border-black bg-white p-4 sm:p-8 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ minHeight: "500px" }}>
        {/* Dot Pattern Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
        />

        {/* Real SVG Map (Imported) */}
        <div className="absolute inset-0 pointer-events-none p-4 opacity-70">
          <img 
            src={indonesiaMapUrl} 
            alt="Peta Indonesia" 
            className="w-full h-full object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] grayscale" 
          />
        </div>

        {/* Region markers */}
        {regionStats.map((region, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            <div className="relative group">
              {/* Brutalist Region Box */}
              <div
                className={`h-10 w-10 sm:h-12 sm:w-12 border-4 border-black flex items-center justify-center font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${region.clubCount === 0 ? 'opacity-50 grayscale' : ''}`}
              >
                <span className="text-lg sm:text-xl">{region.clubCount}</span>
                <div className="absolute -top-2 -right-2 h-4 w-4 border-2 border-black" style={{ backgroundColor: region.color }} />
              </div>

              {/* Enhanced Brutalist Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 w-56 translate-y-2 group-hover:translate-y-0">
                <div className="bg-white text-black border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black uppercase text-base border-b-4 border-black pb-2 mb-3" style={{ color: region.color }}>{region.name}</p>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between items-center bg-gray-100 px-2 py-1 border border-black">
                      <span className="text-[10px] font-black uppercase">Klub Juara:</span>
                      <span className="text-xs font-black">{region.clubCount}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#00FF85]/20 px-2 py-1 border border-black">
                      <span className="text-[10px] font-black uppercase">Gelar Pro:</span>
                      <span className="text-xs font-black">{region.totalTitles}</span>
                    </div>
                    {region.totalAmatirTitles > 0 && (
                      <div className="flex justify-between items-center bg-gray-100 px-2 py-1 border border-black">
                        <span className="text-[10px] font-black uppercase">Gelar Amatir:</span>
                        <span className="text-xs font-black">{region.totalAmatirTitles}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Top Clubs Preview */}
                  {region.clubs.length > 0 && (
                     <div className="mt-3 pt-3 border-t-4 border-black">
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-2 tracking-widest">Klub Tersukses:</p>
                        <div className="space-y-1.5">
                          {region.clubs.slice(0, 3).map((c, i) => (
                             <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase truncate whitespace-nowrap bg-gray-50 border border-gray-200 px-1.5 py-1">
                               <span className="truncate pr-2">• {c.name}</span>
                               <span className="font-black bg-black text-white px-1 ml-auto">{c.titles}</span>
                             </div>
                          ))}
                        </div>
                        {region.clubs.length > 3 && <p className="text-[9px] font-bold italic mt-2 text-center">+{region.clubs.length - 3} klub lainnya</p>}
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Legend Box */}
        <div className="absolute bottom-4 right-4 bg-white border-4 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 hidden sm:block">
          <p className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-2">Legenda Peta</p>
          <div className="space-y-2 text-[10px] font-bold uppercase">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-black bg-white flex items-center justify-center text-[8px] font-black">#</div>
              <span>Jumlah Klub Juara di Region</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-black bg-[#EF4444]"></div>
              <span>Warna Identitas Region</span>
            </div>
          </div>
        </div>
      </div>

      {/* Region Details Grid (Brutalist style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionStats.map((region, idx) => {
          if (region.clubCount === 0) return null; // Hide empty regions in list
          
          return (
            <div key={idx} className="border-4 border-black bg-white flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              <div className="flex items-center gap-4 p-4 border-b-4 border-black bg-gray-50">
                <div
                  className="h-12 w-12 border-2 border-black flex items-center justify-center font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  style={{ backgroundColor: region.color }}
                >
                  {region.clubCount}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter leading-none" style={{ color: region.color }}>{region.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold bg-[#00FF85]/30 px-1 border border-black uppercase tracking-wider">{region.totalTitles} Pro</span>
                    {region.totalAmatirTitles > 0 && (
                      <span className="text-[10px] font-bold bg-gray-200 px-1 border border-black uppercase tracking-wider">+{region.totalAmatirTitles} Amatir</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Clubs in region */}
              <div className="p-4 space-y-3 flex-1 bg-white">
                {region.clubs.map((club, clubIdx) => {
                  const meta = clubMetadataList[club.name];
                  return (
                    <button
                      key={clubIdx}
                      onClick={() => onClubClick?.(club)}
                      className="w-full flex items-center gap-3 p-2 bg-white border-2 border-black hover:bg-[#00FF85] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left group"
                    >
                      {meta && (
                        <div className="h-8 w-8 border-2 border-black bg-white p-1 shrink-0 flex items-center justify-center">
                          <ClubShield
                            symbol={meta.emblemSymbol}
                            primaryColor={meta.colors.primary}
                            secondaryColor={meta.colors.secondary}
                            className="h-full w-full group-hover:scale-110 transition-transform"
                            clubName={club.name}
                            logoUrl={meta.logoUrl}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black uppercase truncate">{club.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                          {club.titles} Pro {club.amatirTitles ? `+ ${club.amatirTitles} Amatir` : ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {club.titles > 0 && (
                          <div className="flex items-center gap-1 bg-black text-white px-1.5 py-0.5 border border-black">
                            <Trophy className="h-3 w-3 text-yellow-400" />
                            <span className="text-[10px] font-black">{club.titles}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
