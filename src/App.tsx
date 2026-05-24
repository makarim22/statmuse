import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, useNavigate, useSearchParams, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import {
  Search,
  Trophy,
  Calendar,
  HelpCircle,
  TrendingUp,
  Award,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Sparkles,
  RefreshCw,
  Clock,
  Shirt,
  Compass,
  ArrowRightLeft,
  BookOpen,
  History,
  FileText,
  MapPin,
  Download,
  Share2,
  Copy,
  Gamepad2
} from "lucide-react";
import { 
  leagueData, 
  getClubsRanking,
  getPerserikatanData,
  getPerserikatanClubsRanking,
  getLiginaData,
  getLiginaClubsRanking,
  getModernLeagueData,
  getModernClubsRanking
} from "./data/leagueData";
import { galatamaData, getGalatamaClubsRanking } from "./data/galatamaData";
import { SeasonRecord, ClubSummary, SearchQueryResponse } from "./types";
import { clubMetadataList } from "./data/clubMetadata";
import ClubShield from "./components/ClubShield";
import ClubDetailModal from "./components/ClubDetailModal";
import TimelineVisualization from "./components/TimelineVisualization";
import { standingsSeasonList, StandingsEntry } from "./data/standingsData";
import { exportToCSV, exportClubRankingsToCSV, exportToJSON, exportStandingsToCSV, copyStatCardToClipboard } from "./utils/exportUtils";
import { leagueTrivia } from "./data/statisticsData";
import { soundEngine } from "./utils/soundEngine";
import AudioToggle from "./components/AudioToggle";
import InstallPWA from "./components/InstallPWA";

// Lazy loaded components and views
const MultiClubComparison = lazy(() => import("./components/MultiClubComparison"));
const GeographicMapView = lazy(() => import("./components/GeographicMapView"));
const AllTimeStatsView = lazy(() => import("./components/AllTimeStatsView"));
const QuizView = lazy(() => import("./components/QuizView"));

const AiStatsView = lazy(() => import("./views/AiStatsView"));
const StandingsView = lazy(() => import("./views/StandingsView"));
const LeaderboardView = lazy(() => import("./views/LeaderboardView"));
const ExplorerView = lazy(() => import("./views/ExplorerView"));
const GalatamaView = lazy(() => import("./views/GalatamaView"));
const PerserikatanView = lazy(() => import("./views/PerserikatanView"));
const LigaIndonesiaView = lazy(() => import("./views/LigaIndonesiaView"));
const EraModernView = lazy(() => import("./views/EraModernView"));

// Loading Fallback for Suspense (Neo-Brutalist design)
const LoadingFallback = () => (
  <div className="w-full py-20 flex flex-col items-center justify-center gap-4 animate-pulse" id="loading_fallback">
    <div className="h-12 w-12 border-4 border-black bg-[#00FF85] flex items-center justify-center animate-spin">
      <div className="h-4 w-4 bg-black"></div>
    </div>
    <span className="font-black uppercase tracking-widest text-xs">Memuat Data...</span>
  </div>
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = (path: string) => {
    const cleanPath = path.replace(/^\//, '');
    const validTabs = ['ai-stats', 'standings', 'leaderboard', 'map', 'stats', 'explorer', 'galatama', 'perserikatan', 'liga-indonesia', 'era-modern', 'kuis'];
    return validTabs.includes(cleanPath) ? cleanPath : 'standings';
  };
  const activeTab = getTabFromPath(location.pathname);
  
  const [searchParams, setSearchParams] = useSearchParams();

  // Derived state from URL parameters
  const clubParam = searchParams.get('club');
  const allClubs = getClubsRanking();
  const selectedModalClub = clubParam ? allClubs.find(c => c.name === clubParam) || null : null;
  const isModalOpen = !!selectedModalClub;
  
  const isMultiCompareOpen = searchParams.get('compare') === 'true';

  // Modal open handlers
  const openClubDetail = (club: any) => {
    setSearchParams(prev => {
      prev.set('club', club.name);
      return prev;
    });
  };

  const closeClubDetail = () => {
    setSearchParams(prev => {
      prev.delete('club');
      return prev;
    });
  };

  const openMultiCompare = () => {
    setSearchParams(prev => {
      prev.set('compare', 'true');
      return prev;
    });
  };

  const closeMultiCompare = () => {
    setSearchParams(prev => {
      prev.delete('compare');
      return prev;
    });
  };

  const navigateToAiQuery = (query: string) => {
    navigate(`/ai-stats?q=${encodeURIComponent(query)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize audio context on first mount
  useEffect(() => {
    const unlockAudio = () => {
      soundEngine.init();
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    
    return () => document.removeEventListener('click', unlockAudio);
  }, []);

  // Play click sound on tab change
  useEffect(() => {
    soundEngine.playClick();
  }, [activeTab]);


  const totalSeasonsCount = leagueData.filter(d => !d.isCancelled).length;
  const uniqueWinnersCount = allClubs.length;

  const handleAskAboutSeason = (seasonName: string) => {
    navigateToAiQuery(`Siapa juara liga tahun ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
  };

  const handleAskAboutGalatamaSeason = (seasonName: string) => {
    navigateToAiQuery(`Siapa juara Galatama musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
  };

  const handleAskAboutPerserikatanSeason = (seasonName: string) => {
    navigateToAiQuery(`Siapa juara Perserikatan musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
  };

  const handleAskAboutLiginaSeason = (seasonName: string) => {
    navigateToAiQuery(`Siapa juara Liga Indonesia (Ligina) musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
  };

  const handleAskAboutModernSeason = (seasonName: string) => {
    navigateToAiQuery(`Siapa juara Liga Indonesia/Liga 1 musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
  };
  return (
    <div className="min-h-screen bg-transparent text-[#1A1A1A] font-sans antialiased selection:bg-[#00FF85] selection:text-black" id="main_root">
      
      {/* Audio Toggle */}
      <AudioToggle />
      
      {/* PWA Install/Update Prompt */}
      <InstallPWA />

      {/* Navigation Bar in Bold Neo-Brutalist Layout */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b-4 border-black px-4 sm:px-10 py-4 flex flex-col lg:flex-row items-center justify-between gap-4" id="app_header">
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 bg-[#00FF85] border-2 border-black flex items-center justify-center transform -rotate-3 hover:rotate-0 duration-150">
              <Trophy className="h-5 w-5 text-black font-black" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic leading-none">
                GARUDA STATS
              </h1>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest opacity-60">Database Sejarah Juara</p>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs (Horizontally Scrollable on Mobile) */}
        <div className="flex flex-nowrap lg:flex-wrap overflow-x-auto hide-scrollbar justify-start lg:justify-center bg-white/70 backdrop-blur-md border-2 border-black p-1 rounded-none gap-1 w-full" id="nav_tabs">
          <button
            onClick={() => navigate('/ai-stats')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'ai-stats' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_ai"
          >
            PENCARIAN AI
          </button>
          <button
            onClick={() => navigate('/standings')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'standings' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_standings"
          >
            KLASEMEN LIGA
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'leaderboard' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_leaders"
          >
            PAPAN JUARA & VS MODE
          </button>
          <button
            onClick={() => navigate('/map')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'map' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_map"
          >
            PETA DISTRIBUSI
          </button>
          <button
            onClick={() => navigate('/stats')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'stats' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_stats"
          >
            STATISTIK & REKOR
          </button>
          <button
            onClick={() => navigate('/kuis')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'kuis' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_kuis"
          >
            KUIS SEJARAH
          </button>
          <button
            onClick={() => navigate('/explorer')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'explorer' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_explorer"
          >
            RIWAYAT LENGKAP
          </button>
          <button
            onClick={() => navigate('/perserikatan')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'perserikatan' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_perserikatan"
          >
            PERSERIKATAN
          </button>
          <button
            onClick={() => navigate('/galatama')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'galatama' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_galatama"
          >
            LIGA GALATAMA
          </button>
          <button
            onClick={() => navigate('/liga-indonesia')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'liga-indonesia' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_liga_indonesia"
          >
            LIGA INDONESIA
          </button>
          <button
            onClick={() => navigate('/era-modern')}
            className={`shrink-0 px-4 py-3 sm:py-2 min-h-[44px] text-xs font-black uppercase tracking-widest cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeTab === 'era-modern' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_era_modern"
          >
            ERA MODERN
          </button>
        </div>
      </nav>

      {/* Marquee Ticker (Neo-Brutalist) */}
      <div className="w-full bg-black text-[#00FF85] border-b-4 border-black overflow-hidden py-3 whitespace-nowrap flex items-center relative z-10 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
        <motion.div
          animate={{ x: [0, -3000] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {leagueTrivia.map((trivia, idx) => (
            <span key={idx} className="font-black uppercase text-xs sm:text-sm tracking-widest whitespace-nowrap">
              {trivia.fact}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {leagueTrivia.map((trivia, idx) => (
            <span key={`dup-${idx}`} className="font-black uppercase text-xs sm:text-sm tracking-widest whitespace-nowrap">
              {trivia.fact}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-6 sm:py-10" id="main_content">
        
        {/* Quick Highlights Row (Heavy Metric Cards) */}
        {activeTab === 'leaderboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-black mb-10 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" id="quick_highlights">
            <div className="p-4 sm:p-6 border-b-2 sm:border-r-2 lg:border-b-0 border-black flex flex-col justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total Kompetisi</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tighter">{totalSeasonsCount}</span>
                <span className="text-xs font-bold uppercase opacity-55">Musim</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-[#00FF85]/20 border border-black px-1.5 py-0.5 mt-3 w-max">TUNTAS SEJAK 1930</span>
            </div>

            <div className="p-4 sm:p-6 border-b-2 lg:border-b-0 sm:border-r-2 lg:border-r-2 border-black flex flex-col justify-between bg-[#F2F2F2]/50">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Klub Paling Sukses</p>
              <div className="flex flex-col mt-2">
                <span className="text-2xl sm:text-3xl font-black italic tracking-tighter truncate uppercase">{allClubs[0]?.name}</span>
                <span className="text-xs font-bold opacity-75 mt-1">{allClubs[0]?.titles} Gelar Era Profesional</span>
                {(allClubs[0]?.amatirTitles ?? 0) > 0 && (
                  <span className="text-[9px] font-bold opacity-50 mt-0.5">+{allClubs[0]?.amatirTitles} Amatir Perserikatan</span>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 border-b-2 sm:border-b-0 sm:border-r-2 lg:border-r-2 border-black flex flex-col justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Trofi Pemegang Unik</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tighter">{uniqueWinnersCount}</span>
                <span className="text-xs font-bold uppercase opacity-55">Klub Berbeda</span>
              </div>
              <span className="text-[10px] text-black font-bold bg-yellow-300 border border-black px-1.5 py-0.5 mt-3 w-max">LIGA DINAMIS</span>
            </div>

            <div className="p-4 sm:p-6 flex flex-col justify-between bg-[#F2F2F2]/80">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Rentang Waktu</p>
              <div className="flex flex-col mt-2">
                <span className="text-3xl sm:text-4xl font-black italic tracking-tighter">96 TAHUN</span>
                <span className="text-xs font-bold opacity-60 mt-1">Era Kolonial s.d Proyeksi 2026</span>
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route 
              path="/ai-stats" 
              element={
                <AiStatsView />
              } 
            />
            <Route 
              path="/standings" 
              element={
                <StandingsView 
                  onOpenClubDetail={openClubDetail} 
                />
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <LeaderboardView 
                  onOpenClubDetail={openClubDetail}
                  onOpenMultiCompare={openMultiCompare}
                  onAskAI={navigateToAiQuery}
                />
              } 
            />
            <Route 
              path="/map" 
              element={
                <div className="space-y-8 animate-fade-in" id="map_view">
                   <GeographicMapView
                      clubs={getClubsRanking()}
                      onClubClick={openClubDetail}
                    />
                </div>
              } 
            />
            <Route path="/stats" element={<AllTimeStatsView />} />
            <Route 
              path="/explorer" 
              element={
                <ExplorerView 
                  onAskAboutSeason={handleAskAboutSeason}
                  onOpenClubDetail={openClubDetail}
                />
              } 
            />
            <Route 
              path="/galatama" 
              element={
                <GalatamaView 
                  onAskAboutGalatamaSeason={handleAskAboutGalatamaSeason}
                  onOpenClubDetail={openClubDetail}
                />
              } 
            />
            <Route 
              path="/perserikatan" 
              element={
                <PerserikatanView 
                  onAskAboutPerserikatanSeason={handleAskAboutPerserikatanSeason}
                  onOpenClubDetail={openClubDetail}
                />
              } 
            />
            <Route 
              path="/liga-indonesia" 
              element={
                <LigaIndonesiaView 
                  onAskAboutLiginaSeason={handleAskAboutLiginaSeason}
                  onOpenClubDetail={openClubDetail}
                />
              } 
            />
            <Route 
              path="/era-modern" 
              element={
                <EraModernView 
                  onAskAboutModernSeason={handleAskAboutModernSeason}
                  onOpenClubDetail={openClubDetail}
                />
              } 
            />
            <Route path="/kuis" element={<QuizView />} />
            <Route path="/" element={<Navigate to="/standings" replace />} />
            <Route path="*" element={<Navigate to="/standings" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Styled Brutalist Footer Frame */}
      <footer className="mt-20 bg-black text-white border-t-4 border-black py-16 px-4 sm:px-10" id="app_footer_nav">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-black tracking-tighter uppercase italic text-[#00FF85]">GARUDA STATS</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 max-w-md">
              Dibuat mengacu pada data resmi juara dari PSSI serta diolah oleh model AI Google Gemini secara live demi literasi sepakbola nasional.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest opacity-70 justify-center">
            <span>Vite SPA</span>
            <span>•</span>
            <span>React App</span>
            <span>•</span>
            <span>Gemini LLM</span>
            <span>•</span>
            <span>Express API</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/20 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono font-bold uppercase tracking-wider opacity-40">
          <span>Hak Cipta Terbuka data Statfootball Indonesia @ 2026</span>
          <span>Waktu server: 2026-05-21</span>
        </div>
      </footer>

      {/* Global Interactive Club Details Modal overlay */}
      <ClubDetailModal
        isOpen={isModalOpen}
        onClose={closeClubDetail}
        club={selectedModalClub}
        metadata={selectedModalClub ? clubMetadataList[selectedModalClub.name] : null}
        onAskAI={navigateToAiQuery}
      />

      {/* Multi-Club Comparison Modal */}
      {isMultiCompareOpen && (
        <Suspense fallback={null}>
          <MultiClubComparison
            allClubs={allClubs}
            onClose={closeMultiCompare}
            onAskAI={navigateToAiQuery}
          />
        </Suspense>
      )}
    </div>
  );
}

