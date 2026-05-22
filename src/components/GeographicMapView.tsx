import { MapPin, Trophy, Award } from "lucide-react";
import { ClubSummary } from "../types";
import { clubMetadataList } from "../data/clubMetadata";
import ClubShield from "./ClubShield";

interface GeographicMapViewProps {
  clubs: ClubSummary[];
  onClubClick?: (club: ClubSummary) => void;
}

// Indonesian regions with approximate coordinates for visualization
const regions = [
  { name: "Sumatera", x: 15, y: 20, color: "#EF4444" },
  { name: "Jawa", x: 45, y: 50, color: "#3B82F6" },
  { name: "Kalimantan", x: 55, y: 35, color: "#10B981" },
  { name: "Sulawesi", x: 70, y: 40, color: "#F59E0B" },
  { name: "Papua", x: 85, y: 45, color: "#8B5CF6" },
  { name: "Bali & Nusa Tenggara", x: 60, y: 60, color: "#EC4899" }
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
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5" />
        <h3 className="text-xl font-black uppercase italic">Peta Geografis Klub Indonesia</h3>
      </div>

      {/* Simplified Indonesia Map Visualization */}
      <div className="border-4 border-black bg-gradient-to-br from-blue-100 to-blue-50 p-8 relative" style={{ minHeight: "500px" }}>
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Simplified Indonesia archipelago outline */}
            <path
              d="M 10 20 Q 20 18 30 22 L 40 25 Q 50 28 60 30 L 70 35 Q 80 38 90 45 L 85 50 Q 75 48 65 52 L 55 58 Q 45 60 35 58 L 25 55 Q 15 50 10 45 Z"
              fill="#94A3B8"
              stroke="#1E293B"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Region markers */}
        {regionStats.map((region, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            <div className="relative group">
              {/* Region dot */}
              <div
                className="h-12 w-12 rounded-full border-4 border-black flex items-center justify-center font-black text-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: region.color }}
              >
                {region.clubCount}
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-black text-white border-2 border-black px-3 py-2 text-xs font-bold whitespace-nowrap shadow-lg">
                  <p className="font-black uppercase">{region.name}</p>
                  <p className="text-[10px]">{region.clubCount} Klub</p>
                  <p className="text-[10px]">{region.totalTitles} Gelar Pro</p>
                  {region.totalAmatirTitles > 0 && (
                    <p className="text-[10px]">+{region.totalAmatirTitles} Gelar Amatir</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white border-2 border-black p-3 shadow-lg">
          <p className="text-xs font-black uppercase mb-2">Legenda</p>
          <div className="space-y-1 text-[10px] font-bold">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-black bg-blue-500"></div>
              <span>Jumlah klub di region</span>
            </div>
          </div>
        </div>
      </div>

      {/* Region Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regionStats.map((region, idx) => (
          <div key={idx} className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-black">
              <div
                className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center font-black text-white"
                style={{ backgroundColor: region.color }}
              >
                {region.clubCount}
              </div>
              <div>
                <h4 className="text-lg font-black uppercase">{region.name}</h4>
                <p className="text-[10px] font-bold text-slate-500">
                  {region.totalTitles} Gelar Profesional
                </p>
              </div>
            </div>

            {/* Clubs in region */}
            <div className="space-y-2">
              {region.clubs.length > 0 ? (
                region.clubs.map((club, clubIdx) => {
                  const meta = clubMetadataList[club.name];
                  return (
                    <button
                      key={clubIdx}
                      onClick={() => onClubClick?.(club)}
                      className="w-full flex items-center gap-2 p-2 bg-[#F2F2F2] border border-black hover:bg-[#00FF85] transition-colors text-left"
                    >
                      {meta && (
                        <div className="h-6 w-6 border border-black bg-white p-0.5 shrink-0">
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
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black uppercase truncate">{club.name}</p>
                        <p className="text-[9px] font-bold text-slate-500">
                          {club.titles} Pro {club.amatirTitles ? `+ ${club.amatirTitles} Amatir` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {club.titles > 0 && <Trophy className="h-3 w-3 text-yellow-600" />}
                        {club.runnerUps > 0 && <Award className="h-3 w-3 text-slate-400" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="text-xs font-bold text-slate-400 italic text-center py-2">
                  Belum ada klub juara dari region ini
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
