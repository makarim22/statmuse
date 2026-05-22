import { useState, useEffect } from "react";
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
  Copy
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
import MultiClubComparison from "./components/MultiClubComparison";
import TimelineVisualization from "./components/TimelineVisualization";
import GeographicMapView from "./components/GeographicMapView";
import { standingsSeasonList, StandingsEntry } from "./data/standingsData";
import { exportToCSV, exportClubRankingsToCSV, exportToJSON, exportStandingsToCSV, copyStatCardToClipboard } from "./utils/exportUtils";

export default function App() {
  // Navigation tabs: 'ai-stats' (Statmuse search), 'standings' (Recent standings), 'leaderboard' (All-time champions list), 'map' (Geographic Map), 'explorer' (Chronological timeline), 'galatama' (Liga Galatama), 'perserikatan' (Perserikatan), 'liga-indonesia' (Liga Indonesia), 'era-modern' (Era Modern)
  const [activeTab, setActiveTab] = useState<'ai-stats' | 'standings' | 'leaderboard' | 'map' | 'explorer' | 'galatama' | 'perserikatan' | 'liga-indonesia' | 'era-modern'>('standings');
  
  // Standings view state
  const [selectedStandingsSeason, setSelectedStandingsSeason] = useState<string>("2024-2025");
  const [standingsSearchQuery, setStandingsSearchQuery] = useState<string>("");
  const [standingsSortField, setStandingsSortField] = useState<keyof StandingsEntry | "gd">("points");
  const [standingsSortAsc, setStandingsSortAsc] = useState<boolean>(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchQueryResponse | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Siapa klub juara terbanyak sepanjang sejarah Liga Indonesia?",
    "Persib Bandung vs Persija Jakarta"
  ]);

  // Historical Era Filters for 'explorer'
  // 'Semua' | 'perserikatan' (1930 - 1994) | 'klasik' (1994 - 2008) | 'modern' (2008 - Sekarang)
  const [selectedEra, setSelectedEra] = useState<string>("Semua");

  // H2H Club Comparison selectors in 'leaderboard'
  const allClubs = getClubsRanking();
  const [compareClubA, setCompareClubA] = useState<string>(allClubs[0]?.name || "Persija Jakarta");
  const [compareClubB, setCompareClubB] = useState<string>(allClubs[1]?.name || "Persib Bandung");

  // Filter and sorting states for the complete database explorer
  const [explorerQuery, setExplorerQuery] = useState("");
  const [explorerSortOrder, setExplorerSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedClubFilter, setSelectedClubFilter] = useState("Semua");
  const [explorerViewMode, setExplorerViewMode] = useState<'grid' | 'timeline'>('grid');

  // For expanding detailed view on a season card
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);

  // States for Club Detail Modal
  const [selectedModalClub, setSelectedModalClub] = useState<ClubSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Multi-Club Comparison Modal
  const [isMultiCompareOpen, setIsMultiCompareOpen] = useState(false);

  // Load a default summary query on first load
  useEffect(() => {
    handleExecuteSearch("Siapa klub juara terbanyak sepanjang sejarah Liga Indonesia?");
  }, []);

  const handleExecuteSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setSearchQuery(queryText);
    setIsSearching(true);

    // Save to local search history beautifully
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q !== queryText);
      return [queryText, ...filtered].slice(0, 5); // Keep up to 5 unique recent queries
    });

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText })
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        throw new Error("HTTP error: " + response.status);
      }
    } catch (err) {
      console.error("Failed to query AI stats:", err);
      // Premium handcrafted fallback responses based on keywords to keep user experience high
      let fallbackLabel = "INFORMASI OFFLINE";
      let fallbackAnswer = "Maaf, kami sedang mengalami kesulitan tersambung ke server AI kami saat ini. Namun, berikut rangkuman all-time berdasarkan basis data persatuan sepakbola Indonesia:";
      let fallbackWidgetData: any = null;

      if (queryText.toLowerCase().includes("banyak") || queryText.toLowerCase().includes("tinggi") || queryText.toLowerCase().includes("ranking")) {
        fallbackAnswer = "Berikut adalah daftar klub tersukses berdasarkan **era profesional** (Liga Indonesia 1994/95 s.d. sekarang) sebagai perhitungan utama. Gelar era amatir Perserikatan (1930–1994) dicantumkan sebagai informasi tambahan:\n\n1. **Persib Bandung**: 5 Gelar Era Profesional (+ 5 Era Amatir Perserikatan = 10 total).\n2. **Persipura Jayapura**: 4 Gelar Era Profesional.\n3. **Persija Jakarta**: 2 Gelar Era Profesional (+ 9 Era Amatir = 11 total).\n4. **Persebaya Surabaya**: 2 Gelar Era Profesional (+ 6 Era Amatir = 8 total).\n5. **PSM Makassar**: 2 Gelar Era Profesional (+ 4 Era Amatir = 6 total).";
        fallbackWidgetData = {
          type: 'champions-ranking',
          title: "DISTRIBUSI MAHKOTA ERA PROFESIONAL (UTAMA)",
          data: [
            { label: "Persib Bandung", value: 5, subtext: "+5 Amatir Perserikatan = 10 total" },
            { label: "Persipura Jayapura", value: 4, subtext: "Penguasa mutlak era ISL modern" },
            { label: "Persija Jakarta", value: 2, subtext: "+9 Amatir Perserikatan = 11 total" },
            { label: "Persebaya Surabaya", value: 2, subtext: "+6 Amatir Perserikatan = 8 total" },
            { label: "Bali United", value: 2, subtext: "Kekuatan dominan Liga 1 modern" }
          ]
        };
      } else if (queryText.toLowerCase().includes("persib") && queryText.toLowerCase().includes("persija")) {
        fallbackAnswer = "Rivalitas **El Clasico Indonesia** antara **Persija Jakarta** dan **Persib Bandung** adalah perseteruan paling ikonis di tanah air.\n\n- **Persija Jakarta** (Era Profesional: **2 Gelar** + Era Amatir: 9 Gelar Perserikatan): Mendominasi era amatir perserikatan awal kemerdekaan dengan 9 trofi, dan menambah 2 gelar profesional (2001 dan 2018).\n- **Persib Bandung** (Era Profesional: **5 Gelar** + Era Amatir: 5 Gelar Perserikatan): Raja era profesional dengan 5 trofi sejak 1994/95, plus 5 trofi Perserikatan. Juara Liga 1 terbaru 2023-24, 2024-25, 2025-26.\n\nDalam konteks **era profesional modern**, Persib jauh lebih dominan. Namun secara total historis, Persija unggul berkat dominasi era Perserikatan.";
        fallbackWidgetData = {
          type: 'club-comparison',
          title: "PERBANDINGAN TROFI KLASIK (ERA PROFESIONAL)",
          data: [
            { label: "Persija Jakarta - Profesional", value: 2, subtext: "2001 & 2018 (Liga Indonesia + Liga 1)" },
            { label: "Persib Bandung - Profesional", value: 5, subtext: "1994/95, 2014, 2023/24, 2024/25, 2025/26" },
            { label: "Persija Jakarta - Amatir (Perserikatan)", value: 9, subtext: "Era 1931–1979 (info tambahan)" },
            { label: "Persib Bandung - Amatir (Perserikatan)", value: 5, subtext: "Era 1937–1993/94 (info tambahan)" }
          ]
        };
      } else {
        fallbackAnswer = `Kami mencatat kueri Anda mengenai **"${queryText}"**. Berikut rangkumannya:\n\nSeluruh data pemenang tahun demi tahun tersedia lengkap secara teratur dan dapat dieksplorasi di tab **Riwayat Lengkap** atau **Papan Juara**. Anda dapat melihat detail tahun gelar, kepelatihan luar biasa seperti Indra Thohir, hingga top-skor legendaris seperti rekor fantastis Peri Sandria (34 Gol) pada musim penggabungan perdana 1994/95.`;
      }

      setSearchResult({
        answer: fallbackAnswer,
        suggestedPrompts: [
          "Daftar Tim Terbanyak Juara",
          "Juara liga tahun 1994–95",
          "Persib Bandung vs Persija Jakarta"
        ],
        autoQueryStats: fallbackWidgetData
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(searchQuery);
  };

  // Precompiled trivia events for exploration quick-actions
  const triviaFakta = [
    {
      title: "Rekor Gol Abadi Peri Sandria",
      tag: "⚡ REKOR GOL",
      query: "Siapa pencetak gol terbanyak sepanjang masa dalam semusim Liga Indonesia?",
      desc: "Mencetak 34 gol untuk Bandung Raya pada musim 1994-95."
    },
    {
      title: "Era Dualisme IPL vs ISL",
      tag: "🚨 DUALISME LIGA",
      query: "Ceritakan sejarah dualisme Liga Indonesia tahun 2011 sampai 2013",
      desc: "Ketika federasi terpecah menghasilkan dua liga & juara paralel."
    },
    {
      title: "Laga Klasik Penonton Terbanyak",
      tag: "🏟️ REKOR PENONTON",
      query: "Apa pertandingan Liga Indonesia dengan jumlah penonton terbanyak dalam sejarah?",
      desc: "Final Perserikatan 1985 (Persib vs PSMS) dihadiri 150.000 jiwa di Senayan."
    },
    {
      title: "Piala Juara Terbanyak Modern",
      tag: "⭐ MUTIARA HITAM",
      query: "Mengapa Persipura Jayapura disebut klub tersukses era profesional modern?",
      desc: "Menyabet 4 gelar juara ISL dengan skema penyerangan cemerlang."
    }
  ];

  const samplePrompts = [
    { text: "Klub juara terbanyak?", label: "🏆 JUARA TERBANYAK" },
    { text: "Siapa juara tahun 1994–95?", label: "⚡ MUSIM 1994/95" },
    { text: "Daftar juara 10 tahun terakhir", label: "📅 ERA MODERN" },
    { text: "Siapa pelatih juara terbanyak?", label: "👔 PELATIH SUKSES" },
    { text: "Persib Bandung vs Persija Jakarta", label: "🥊 RIVALITAS KLASIK" },
    { text: "Pencetak gol terbanyak dari tahun ke tahun", label: "⚽ TOP SCORERS" }
  ];

  // Helper calculation to parse precise calendar year for Era sorting
  const getEraForSeason = (seasonStr: string): string => {
    const match = seasonStr.match(/\b\d{4}\b/);
    if (!match) return "modern";
    const year = parseInt(match[0]);
    if (year < 1994) return "perserikatan";
    if (year < 2008) return "klasik";
    return "modern";
  };

  const totalSeasonsCount = leagueData.filter(d => !d.isCancelled).length;
  const uniqueWinnersCount = allClubs.length;
  const maxTitles = Math.max(...allClubs.map(c => c.titles));

  // Reactive parsing filter logic with Era grouping support
  const filteredSeasons = leagueData.filter(item => {
    const matchesSearch = 
      item.season.toLowerCase().includes(explorerQuery.toLowerCase()) ||
      item.winner.toLowerCase().includes(explorerQuery.toLowerCase()) ||
      item.runnerUp.toLowerCase().includes(explorerQuery.toLowerCase()) ||
      (item.topScorer && item.topScorer.toLowerCase().includes(explorerQuery.toLowerCase())) ||
      (item.coach && item.coach.toLowerCase().includes(explorerQuery.toLowerCase()));

    const matchesClub = 
      selectedClubFilter === "Semua" ||
      item.winner === selectedClubFilter ||
      item.runnerUp === selectedClubFilter;

    // Era categorization comparison
    const eraOfItem = getEraForSeason(item.season);
    const matchesEra = selectedEra === "Semua" || eraOfItem === selectedEra;

    return matchesSearch && matchesClub && matchesEra;
  });

  const sortedSeasons = [...filteredSeasons].sort((a, b) => {
    const extractYear = (seasonStr: string) => {
      const match = seasonStr.match(/\b\d{4}\b/);
      return match ? parseInt(match[0]) : 0;
    };
    const yrA = extractYear(a.season);
    const yrB = extractYear(b.season);
    return explorerSortOrder === 'desc' ? yrB - yrA : yrA - yrB;
  });

  // Calculate H2H state dynamically between chosen comparison clubs
  const clubAData = allClubs.find(c => c.name === compareClubA);
  const clubBData = allClubs.find(c => c.name === compareClubB);

  const getH2HWinnerMessage = () => {
    if (!clubAData || !clubBData) return "";
    if (clubAData.titles > clubBData.titles) {
      return `${clubAData.name.toUpperCase()} LEBIH UNGGUL SECARA SEJARAH DENGAN SELISIH ${clubAData.titles - clubBData.titles} TROFI.`;
    } else if (clubBData.titles > clubAData.titles) {
      return `${clubBData.name.toUpperCase()} LEBIH UNGGUL SECARA SEJARAH DENGAN SELISIH ${clubBData.titles - clubAData.titles} TROFI.`;
    } else {
      // Tie breaker runner-ups
      if (clubAData.runnerUps > clubBData.runnerUps) {
        return `KEDUA TIM SAMA-SAMA MEMPUNYAI ${clubAData.titles} TROFI, NAMUN ${clubAData.name.toUpperCase()} LEBIH SANGAR KARENA MEMEGANG LEBIH BANYAK POSISI RUNNER-UP (${clubAData.runnerUps} vs ${clubBData.runnerUps}).`;
      } else if (clubBData.runnerUps > clubAData.runnerUps) {
        return `KEDUA TIM SAMA-SAMA MEMPUNYAI ${clubAData.titles} TROFI, NAMUN ${clubBData.name.toUpperCase()} UNGGUL DALAM JUMLAH RUNNER-UP (${clubBData.runnerUps} vs ${clubAData.runnerUps}).`;
      }
      return `SANGAT SEIMBANG! KEDUA TIM MEMILIKI REKOR SEJARAH PEROLEHAN TROFI YANG IDENTIK (${clubAData.titles} GELAR & ${clubAData.runnerUps} RUNNER-UP).`;
    }
  };

  const handleAskAboutSeason = (seasonName: string) => {
    setActiveTab('ai-stats');
    handleExecuteSearch(`Siapa juara liga tahun ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutGalatamaSeason = (seasonName: string) => {
    setActiveTab('ai-stats');
    handleExecuteSearch(`Siapa juara Galatama musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutPerserikatanSeason = (seasonName: string) => {
    setActiveTab('ai-stats');
    handleExecuteSearch(`Siapa juara Perserikatan musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutLiginaSeason = (seasonName: string) => {
    setActiveTab('ai-stats');
    handleExecuteSearch(`Siapa juara Liga Indonesia (Ligina) musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutModernSeason = (seasonName: string) => {
    setActiveTab('ai-stats');
    handleExecuteSearch(`Siapa juara Liga Indonesia/Liga 1 musim ${seasonName} dan bagaimana jalannya kompetisi waktu itu?`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-sans antialiased selection:bg-[#00FF85] selection:text-black" id="main_root">
      
      {/* Navigation Bar in Bold Neo-Brutalist Layout */}
      <nav className="sticky top-0 z-40 bg-white border-b-4 border-black px-4 sm:px-10 py-5 flex flex-col lg:flex-row items-center justify-between gap-4" id="app_header">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#00FF85] border-2 border-black flex items-center justify-center transform -rotate-3 hover:rotate-0 duration-150">
            <Trophy className="h-5 w-5 text-black font-black" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
              GARUDA STATS
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Database Sejarah Juara Liga Indonesia</p>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex flex-wrap justify-center bg-white border-2 border-black p-1 rounded-none gap-1" id="nav_tabs">
          <button
            onClick={() => setActiveTab('ai-stats')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'ai-stats' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_ai"
          >
            PENCARIAN AI
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'standings' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_standings"
          >
            KLASEMEN LIGA
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'leaderboard' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_leaders"
          >
            PAPAN JUARA & VS MODE
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'map' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_map"
          >
            PETA DISTRIBUSI
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'explorer' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_explorer"
          >
            RIWAYAT LENGKAP
          </button>
          <button
            onClick={() => setActiveTab('perserikatan')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'perserikatan' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_perserikatan"
          >
            PERSERIKATAN
          </button>
          <button
            onClick={() => setActiveTab('galatama')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'galatama' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_galatama"
          >
            LIGA GALATAMA
          </button>
          <button
            onClick={() => setActiveTab('liga-indonesia')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'liga-indonesia' 
                ? 'bg-[#00FF85] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'text-[#1A1A1A] hover:bg-[#F2F2F2]'
            }`}
            id="tab_liga_indonesia"
          >
            LIGA INDONESIA
          </button>
          <button
            onClick={() => setActiveTab('era-modern')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-10" id="main_content">
        
        {/* Quick Highlights Row (Heavy Metric Cards) */}
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

        {/* VIEW 1: ADVANCED AI QUERY ENGINE (STATMUSE LAYOUT WITH DISCOVERABILITY & TRIVIA) */}
        {activeTab === 'ai-stats' && (
          <div className="space-y-10" id="ai_stats_view">
            
            {/* Top Interactive Curated Trivia Row */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-[#00FF85]" />
                <span className="text-xs font-black uppercase tracking-widest">Eksplorasi Sejarah Tersembunyi (Klik untuk Analisis AI)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {triviaFakta.map((fact, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExecuteSearch(fact.query)}
                    className="p-5 text-left bg-white border-2 border-black hover:bg-[#00FF85]/10 hover:border-[#00FF85] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black tracking-widest bg-black text-[#00FF85] px-1.5 py-0.5 uppercase">
                        {fact.tag}
                      </span>
                      <h4 className="font-extrabold max-w-xs text-sm leading-tight text-black group-hover:text-emerald-950">
                        {fact.title}
                      </h4>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 font-sans leading-relaxed">
                      {fact.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Search input and prompt choices */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-4">
                  <span className="bg-[#00FF85] px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-widest inline-block">
                    Statmuse Indonesia 
                  </span>
                  <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9] mb-4">
                    ASISTEN<br />STATISTIK
                  </h2>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">
                    Ajukan pertanyaan statistik seputar juara liga bergaya Statmuse. Dapatkan rangkuman fakta dan bagan visual instan.
                  </p>
                </div>

                {/* Neo-brutalist Search Box */}
                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Contoh: Juara terbanyak, siapa juara 1994, Persib vs Persija"
                      className="w-full text-sm font-bold bg-white border-4 border-black rounded-none p-4.5 pr-14 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-slate-400"
                      id="query_input"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 bg-black hover:bg-zinc-800 text-white rounded-none cursor-pointer duration-150"
                    >
                      {isSearching ? <RefreshCw className="h-5 w-5 animate-spin text-[#00FF85]" /> : <Search className="h-5 w-5" />}
                    </button>
                  </div>
                </form>

                {/* Session search logs */}
                {searchHistory.length > 0 && (
                  <div className="bg-[#F2F2F2] border-2 border-black p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#1A1A1A] opacity-60">
                      <History className="h-3 w-3" />
                      <span>Pencarian Terkini Sesi Ini</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {searchHistory.map((histQuery, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleExecuteSearch(histQuery)}
                          className="bg-white border border-black hover:bg-[#00FF85] hover:text-black hover:border-black px-2 py-1 text-[10px] font-bold uppercase truncate max-w-full text-left cursor-pointer transition-all duration-100"
                        >
                          {histQuery}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Statmuse Popular Prompt Selection Grid */}
                <div className="border-t-2 border-black pt-6" id="popular_prompts">
                  <p className="text-[10px] font-black uppercase opacity-60 mb-3 tracking-widest">Pencarian Terpopuler</p>
                  <div className="grid grid-cols-1 gap-2">
                    {samplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExecuteSearch(p.text)}
                        className={`text-left font-bold text-xs p-3 border-2 border-black transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                          searchQuery === p.text ? 'bg-[#00FF85] text-black' : 'bg-[#F2F2F2] hover:bg-[#00FF85]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right output and visual graph analysis board */}
              <div className="lg:col-span-8 flex flex-col justify-between min-h-[500px]">
                <AnimatePresence mode="wait">
                  {isSearching ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center border-4 border-black bg-[#F2F2F2]/40 p-10 space-y-4"
                    >
                      <div className="relative h-16 w-16">
                        <div className="h-full w-full rounded-none border-4 border-black border-t-[#00FF85] animate-spin" />
                      </div>
                      <p className="text-sm font-black uppercase tracking-widest">MEMBEDAH BASIS DATA OLAHRAGA INDONESIA...</p>
                    </motion.div>
                  ) : searchResult ? (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex-1 flex flex-col justify-between border-4 border-black bg-white p-6 sm:p-10 space-y-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {/* Header line with metadata */}
                      <div className="flex items-center justify-between border-b-2 border-black pb-4">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 bg-[#00FF85] border border-black animate-ping" />
                          <span className="text-[10px] font-black tracking-widest uppercase">HASIL ANALISIS DATA</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-[#F2F2F2] border border-black px-2 py-0.5">EST: 2026.05</span>
                      </div>

                      {/* Rich Response Content Area */}
                      <div className="prose prose-emerald max-w-none text-[#1A1A1A] font-medium leading-relaxed font-sans text-md sm:text-lg" id="markdown_body">
                        <ReactMarkdown>{searchResult.answer}</ReactMarkdown>
                      </div>

                      {/* Highly polished dynamic visualization widgets */}
                      {searchResult.autoQueryStats && (
                        <div className="border-t-2 border-black pt-6 space-y-4" id="visualization_widget">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <h3 className="text-md font-black tracking-tight uppercase italic flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-black" />
                              {searchResult.autoQueryStats.title}
                            </h3>
                            <span className="text-[8px] font-black tracking-widest bg-black text-white px-2 py-0.5 uppercase">
                              Visual: {searchResult.autoQueryStats.type}
                            </span>
                          </div>

                          {/* Chart: champions-ranking style */}
                          {searchResult.autoQueryStats.type === 'champions-ranking' && (
                            <div className="space-y-3 bg-[#F2F2F2]/60 p-4 border-2 border-black">
                              {searchResult.autoQueryStats.data.map((item: any, idx: number) => {
                                const val = item.value ?? 1;
                                const scalePercent = Math.min(100, Math.max(15, Math.round((val / (maxTitles || 10)) * 100)));
                                return (
                                  <div key={idx} className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold leading-none">
                                      <span className="uppercase">{idx + 1}. {item.label}</span>
                                      <span className="font-mono bg-[#00FF85] border border-black px-1">{val} GELAR</span>
                                    </div>
                                    <div className="relative h-6 w-full bg-white border-2 border-black flex items-center px-1">
                                      <div 
                                        className="absolute left-0 top-0 bottom-0 bg-[#00FF85] border-r border-black"
                                        style={{ width: `${scalePercent}%` }}
                                      />
                                      <span className="relative z-10 text-[9px] font-black text-black uppercase truncate pl-1">{item.subtext || ""}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Chart: Timeline / Sequence list */}
                          {searchResult.autoQueryStats.type === 'timeline' && (
                            <div className="relative border-l-4 border-black pl-4 space-y-5 bg-[#F2F2F2]/20 p-5 border-2 border-black">
                              {searchResult.autoQueryStats.data.slice(0, 8).map((item: any, idx: number) => (
                                <div key={idx} className="relative">
                                  {/* Dot */}
                                  <div className="absolute -left-[27px] top-1 h-3.5 w-3.5 bg-[#00FF85] border-2 border-black" />
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 leading-none mb-1">
                                    <span className="text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5">{item.label}</span>
                                    <span className="text-[10px] font-bold opacity-60 uppercase">{item.value ? `${item.value} Gelar` : ""}</span>
                                  </div>
                                  <p className="text-sm font-black uppercase text-black leading-tight">{item.subtext}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Chart: club-comparison dual statistics */}
                          {searchResult.autoQueryStats.type === 'club-comparison' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {searchResult.autoQueryStats.data.map((item: any, idx: number) => (
                                <div key={idx} className="p-4 bg-white border-2 border-black flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                  <div className="space-y-1">
                                    <span className="text-[8px] uppercase font-black opacity-55">KATEGORI PRESTASI</span>
                                    <h4 className="text-sm font-black uppercase italic leading-none">{item.label}</h4>
                                    <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">{item.subtext || ""}</p>
                                  </div>
                                  {item.value !== undefined && (
                                    <div className="text-3xl font-black text-black bg-[#00FF85] h-12 w-12 border-2 border-black flex items-center justify-center font-mono">
                                      {item.value}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Pure Data table list formatting */}
                          {searchResult.autoQueryStats.type === 'list' && (
                            <div className="overflow-x-auto border-2 border-black">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="border-b-2 border-black bg-[#F2F2F2]">
                                    <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider">Metrik Deskripsi</th>
                                    <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-right">Informasi Resmi</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-black bg-white">
                                  {searchResult.autoQueryStats.data.map((item: any, idx: number) => (
                                    <tr key={idx} className="text-xs font-bold hover:bg-[#F2F2F2]/50">
                                      <td className="px-4 py-3 text-black uppercase">{item.label}</td>
                                      <td className="px-4 py-3 text-right text-emerald-700 bg-emerald-500/5">{item.subtext || "-"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Statmuse Styled Follow-up prompts */}
                      {searchResult.suggestedPrompts && (
                        <div className="border-t-2 border-black pt-6 space-y-3">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block">
                            Ingin menyelam lebih dalam? Ketuk pertanyaan berikut:
                          </span>
                          <div className="flex flex-col md:flex-row gap-2">
                            {searchResult.suggestedPrompts.map((promptText, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleExecuteSearch(promptText)}
                                className="text-left font-bold text-xs p-3 bg-white border-2 border-black hover:bg-[#00FF85] duration-150 cursor-pointer flex-1 flex items-center justify-between group"
                              >
                                <span className="truncate uppercase">{promptText}</span>
                                <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center border-4 border-black bg-[#F2F2F2]/30 text-stone-500 font-bold uppercase p-10">
                      Silakan kirimkan pertanyaan atau pilih kueri di atas untuk memulai analisis cerdas.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* VIEW KLASEMEN INTERAKTIF */}
        {activeTab === 'standings' && (() => {
          const standingsRawData = standingsSeasonList[selectedStandingsSeason] || [];

          // Filter based on search query
          const filteredStandings = standingsRawData.filter(entry => 
            entry.clubName.toLowerCase().includes(standingsSearchQuery.toLowerCase())
          );

          // Sort based on chosen column
          const sortedStandings = [...filteredStandings].sort((a, b) => {
            let valA: any = 0;
            let valB: any = 0;

            if (standingsSortField === "gd") {
              valA = a.goalsFor - a.goalsAgainst;
              valB = b.goalsFor - b.goalsAgainst;
            } else {
              valA = a[standingsSortField as keyof StandingsEntry];
              valB = b[standingsSortField as keyof StandingsEntry];
            }

            if (typeof valA === "number" && typeof valB === "number") {
              return standingsSortAsc ? valA - valB : valB - valA;
            }
            return 0;
          });

          const handleSortStandings = (field: keyof StandingsEntry | "gd") => {
            if (standingsSortField === field) {
              setStandingsSortAsc(prev => !prev);
            } else {
              setStandingsSortField(field);
              setStandingsSortAsc(false);
            }
          };

          const topAttack = [...standingsRawData].sort((a, b) => b.goalsFor - a.goalsFor)[0];
          const bestDefense = [...standingsRawData].filter(e => e.played > 0).sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];
          const currentLeader = standingsRawData[0];

          return (
            <div className="space-y-10 animate-fade-in" id="standings_view">
              
              {/* Header section with Season Toggles */}
              <div className="border-b-4 border-black pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="bg-[#00FF85] px-3 py-1 text-xs font-bold border-2 border-black uppercase tracking-widest inline-block mb-1">
                    Klasemen Resmi Terbaru
                  </span>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                    TABEL KLASEMEN LIGA 1 INDONESIA
                  </h2>
                  <p className="text-sm font-bold text-slate-500">
                    Sistem promosi kasta tertinggi sepak bola tanah air. Klik klub mana pun untuk langsung menelusuri sejarah, julukan, dan prestasi lengkapnya.
                  </p>
                </div>

                {/* Season Switcher Dropdown and Export */}
                <div className="flex items-center gap-3 self-start sm:self-center flex-wrap">
                  <button
                    onClick={() => exportStandingsToCSV(sortedStandings, selectedStandingsSeason)}
                    className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#00FF85] hover:text-black transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                    title="Download klasemen sebagai CSV"
                  >
                    <Download className="h-4 w-4" />
                    CSV
                  </button>
                  <span className="text-xs font-black uppercase tracking-wider text-black select-none">
                    Saring Musim:
                  </span>
                  <div className="relative inline-block w-48">
                    <select
                      value={selectedStandingsSeason}
                      onChange={(e) => setSelectedStandingsSeason(e.target.value)}
                      className="appearance-none w-full bg-white text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 pr-10 border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer focus:outline-none focus:bg-[#00FF85]/10 focus:ring-0"
                    >
                      {[
                        { id: "2024-2025", label: "🚀 2024/25" },
                        { id: "2023-2024", label: "📅 2023/24" },
                        { id: "2022-2023", label: "📅 2022/23" },
                        { id: "2021-2022", label: "📅 2021/22" },
                        { id: "2019", label: "📅 2019" },
                        { id: "2018", label: "📅 2018" },
                        { id: "2017", label: "📅 2017" },
                        { id: "2014-west", label: "📅 2014 (Barat)" },
                        { id: "2014-east", label: "📅 2014 (Timur)" },
                        { id: "2013", label: "📅 2013" },
                        { id: "2011-2012", label: "📅 2011/12" },
                        { id: "2010-2011", label: "📅 2010/11" },
                      ].map((s) => (
                        <option key={s.id} value={s.id} className="text-black font-black uppercase">
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black border-l-2 border-black bg-white">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neo-Brutalist Standings Summary Bento Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="standings_bento">
                
                {/* 1. Leader */}
                <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <span className="text-[9px] font-black tracking-widest bg-emerald-500 text-white px-2 py-0.5 uppercase">🏆 PEMIMPIN LIGA</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic mt-2 truncate">
                      {currentLeader ? currentLeader.clubName : "-"}
                    </h4>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">Memimpin persaingan ketat mahkota juara.</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 pt-3 mt-4">
                    <span className="text-xs font-bold text-slate-500">Poin:</span>
                    <span className="text-sm font-mono font-black">{currentLeader ? `${currentLeader.points} PTS` : "-"}</span>
                  </div>
                </div>

                {/* 2. Top Attack */}
                <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <span className="text-[9px] font-black tracking-widest bg-yellow-400 text-black px-2 py-0.5 uppercase">⚽ SERANGAN TERPRODUKTIF</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic mt-2 truncate">
                      {topAttack ? topAttack.clubName : "-"}
                    </h4>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">Lini serang paling subur merobek jala lawan.</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 pt-3 mt-4">
                    <span className="text-xs font-bold text-slate-500">Total Gol:</span>
                    <span className="text-sm font-mono font-black">{topAttack ? `${topAttack.goalsFor} Gol` : "-"}</span>
                  </div>
                </div>

                {/* 3. Best Defense */}
                <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <span className="text-[9px] font-black tracking-widest bg-blue-600 text-white px-2 py-0.5 uppercase">🛡️ PERTAHANAN KOKOH</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight italic mt-2 truncate">
                      {bestDefense ? bestDefense.clubName : "-"}
                    </h4>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">Gawang batu tersulit dijebol penyerang rival.</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 pt-3 mt-4">
                    <span className="text-xs font-bold text-slate-500">Kebobolan:</span>
                    <span className="text-sm font-mono font-black">{bestDefense ? `${bestDefense.goalsAgainst} Gol` : "-"}</span>
                  </div>
                </div>

                {/* 4. Format Info */}
                <div className="bg-[#00FF85]/10 border-2 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
                    <Trophy className="h-28 w-28 text-emerald-950 font-black transform rotate-12" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest bg-black text-[#00FF85] px-2 py-0.5 uppercase">📝 REGULASI LIGA</span>
                    <h4 className="text-lg font-black uppercase tracking-tight italic mt-2 leading-none">
                      CHAMPIONSHIP & PLAYOFFS
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-700 mt-2.5 leading-relaxed">
                      Peringkat 1-4 melaju memperebutkan mahkota nasional dalam Championship Series / Slot Asia. Sementara 3 peringkat terbawah (16-18) didegradasi langsung ke kompetisi kasta kedua.
                    </p>
                  </div>
                </div>

              </div>

              {/* Filtering, Search & Reset Controls */}
              <div className="bg-[#F2F2F2] border-2 border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  <input
                    type="text"
                    value={standingsSearchQuery}
                    onChange={(e) => setStandingsSearchQuery(e.target.value)}
                    placeholder="Saring berdasarkan nama klub..."
                    className="w-full text-xs font-bold bg-white border-2 border-black rounded-none py-2.5 pl-10 pr-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-slate-400"
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                  <span>Hasil Saringan:</span>
                  <span className="bg-[#00FF85] border border-black px-2 py-0.5 font-mono">{filteredStandings.length} dari {standingsRawData.length} tim</span>
                  {standingsSearchQuery && (
                    <button 
                      onClick={() => setStandingsSearchQuery("")}
                      className="bg-black text-white px-2 py-0.5 hover:bg-neutral-800 border border-black cursor-pointer uppercase text-[9px]"
                    >
                      Batal Saring
                    </button>
                  )}
                </div>
              </div>

              {/* Main Standings Table layout in Brutalist Neo Styling */}
              <div className="overflow-x-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <table className="w-full text-left font-sans border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black bg-black text-white text-xs font-black tracking-widest uppercase">
                      <th className="px-3 py-3 w-12 text-center">#</th>
                      <th className="px-4 py-3 min-w-[200px]">KLUB PESERTA</th>
                      <th 
                        onClick={() => handleSortStandings("played")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>M</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("won")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>MG</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("draw")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>S</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("lost")} 
                        className="px-3 py-3 w-16 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>K</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-3 py-3 w-24 text-center">GOL (F:A)</th>
                      <th 
                        onClick={() => handleSortStandings("gd")} 
                        className="px-3 py-3 w-20 text-center cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>SG</span>
                          <ArrowUpDown className="h-3 w-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSortStandings("points")} 
                        className="px-4 py-3 w-24 text-center bg-[#00FF85] text-black cursor-pointer hover:opacity-90 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>PTS</span>
                          <ArrowUpDown className="h-3.5 w-3.5 text-black" />
                        </div>
                      </th>
                      <th className="px-4 py-3 min-w-[140px] text-center hidden md:table-cell">5 LAGA TERAKHIR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black bg-white text-sm font-bold">
                    {sortedStandings.length > 0 ? (
                      sortedStandings.map((entry) => {
                        const meta = clubMetadataList[entry.clubName];
                        const isTopZone = entry.rank <= 4;
                        const isRelegationZone = entry.rank >= 16;
                        
                        return (
                          <tr 
                            key={entry.clubName}
                            onClick={() => {
                              // Find pre-computed club data (has pro/amatir split) or build a minimal fallback
                              const existingClub = allClubs.find(c => c.name === entry.clubName);
                              const mockClubSummary: ClubSummary = existingClub ?? {
                                name: entry.clubName,
                                titles: 0,
                                runnerUps: 0,
                                seasonsWon: [],
                                historicalNames: [],
                                amatirTitles: 0,
                                amatirSeasonsWon: [],
                              };
                              setSelectedModalClub(mockClubSummary);
                              setIsModalOpen(true);
                            }}
                            className={`hover:bg-[#00FF85]/5 transition-all duration-100 cursor-pointer group ${
                              isTopZone ? 'bg-emerald-500/5' : isRelegationZone ? 'bg-rose-500/5' : ''
                            }`}
                          >
                            {/* 1. Placement rank badge */}
                            <td className="px-3 py-3 w-12 text-center select-none font-mono font-black border-r border-black/10">
                              <span className={`inline-flex items-center justify-center h-7 w-7 border border-black font-black text-xs ${
                                isTopZone 
                                  ? 'bg-[#00FF85] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                                  : isRelegationZone 
                                    ? 'bg-rose-500 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                                    : 'bg-[#F2F2F2] text-black'
                              }`}>
                                {entry.rank}
                              </span>
                            </td>

                            {/* 2. Club Name and Shield */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {meta && (
                                  <div className="h-8 w-8 border border-black bg-white p-0.5 shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 duration-105">
                                    <ClubShield 
                                      symbol={meta.emblemSymbol} 
                                      primaryColor={meta.colors.primary} 
                                      secondaryColor={meta.colors.secondary} 
                                      className="h-full w-full"
                                      clubName={entry.clubName}
                                      logoUrl={meta.logoUrl}
                                    />
                                  </div>
                                )}
                                <div>
                                  <span className="text-sm font-black uppercase tracking-tight text-black group-hover:text-emerald-950 duration-75 block leading-none">
                                    {entry.clubName}
                                  </span>
                                  {meta?.nickname && (
                                    <span className="text-[9px] font-black tracking-wider opacity-60 uppercase block mt-1">
                                      {meta.nickname}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* 3. Played matches */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-zinc-600 border-l border-black/10">
                              {entry.played}
                            </td>

                            {/* 4. Won games */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-emerald-800">
                              {entry.won}
                            </td>

                            {/* 5. Draw games */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-slate-500">
                              {entry.draw}
                            </td>

                            {/* 6. Lost games */}
                            <td className="px-3 py-3 w-16 text-center font-mono text-rose-800">
                              {entry.lost}
                            </td>

                            {/* 7. Goals stats column */}
                            <td className="px-3 py-3 w-24 text-center font-mono text-slate-600 text-xs border-l border-r border-black/10">
                              {entry.goalsFor}:{entry.goalsAgainst}
                            </td>

                            {/* 8. Goal difference */}
                            <td className="px-3 py-3 w-20 text-center font-mono">
                              <span className={`text-xs px-1.5 py-0.5 border ${
                                (entry.goalsFor - entry.goalsAgainst) >= 0 
                                  ? 'text-emerald-700 bg-emerald-50 border-emerald-300' 
                                  : 'text-rose-700 bg-rose-50 border-rose-300'
                              }`}>
                                {(entry.goalsFor - entry.goalsAgainst) >= 0 ? "+" : ""}{entry.goalsFor - entry.goalsAgainst}
                              </span>
                            </td>

                            {/* 9. Standings points total */}
                            <td className="px-4 py-3 w-24 text-center font-mono font-black text-base bg-zinc-50 border-l-2 border-black">
                              {entry.points}
                            </td>

                            {/* 10. Form dots list */}
                            <td className="px-4 py-3 min-w-[140px] hidden md:table-cell border-l border-black/10 text-center align-middle">
                              <div className="flex items-center justify-center gap-1.5 h-full">
                                {entry.form.map((formResult, fIdx) => (
                                  <span 
                                    key={fIdx} 
                                    className={`inline-flex items-center justify-center text-[9px] font-black leading-none h-5 w-5 border border-black ${
                                      formResult === "W" 
                                        ? 'bg-[#00FF85] text-black' 
                                        : formResult === "D" 
                                          ? 'bg-amber-300 text-black' 
                                          : 'bg-rose-500 text-white'
                                    }`}
                                    title={formResult === "W" ? "Menang" : formResult === "D" ? "Seri" : "Kalah"}
                                  >
                                    {formResult}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center py-12 text-stone-500 font-bold uppercase bg-stone-100">
                          ⚠️ Tidak ada klub yang cocok dengan kata kunci "{standingsSearchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Informative Legend explanation panel in Brutalist frame */}
              <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-800 font-bold">
                <div className="flex items-start gap-2">
                  <span className="h-5 w-5 shrink-0 bg-[#00FF85] border border-black flex items-center justify-center font-black text-[9px]">1-4</span>
                  <div>
                    <span className="uppercase text-black block tracking-tight font-black">Championship & Zona Asia</span>
                    <p className="font-medium text-slate-500 mt-0.5">Musim reguler teratas berhak maju memperebutkan gelar piala bergilir tertinggi serta jatah representasi Indonesia di kancah antarklub Benua Asia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-5 w-5 shrink-0 bg-[#F2F2F2] border border-black flex items-center justify-center font-black text-[9px]">5-15</span>
                  <div>
                    <span className="uppercase text-black block tracking-tight font-black">Zona Tengah Aman</span>
                    <p className="font-medium text-slate-500 mt-0.5">Klub tetap mengamankan hak kompetisi kasta tertinggi Liga 1 di musim berikutnya tanpa ancaman jatuh ataupun hak playoff khusus.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-5 w-5 shrink-0 bg-rose-500 border border-black text-white flex items-center justify-center font-black text-[9px]">16-18</span>
                  <div>
                    <span className="uppercase text-black block tracking-tight font-black">Zona Relegasi / Degradasi</span>
                    <p className="font-medium text-slate-500 mt-0.5">Tiga tim terbawah pada akhir musim secara mutlak turun kasta bertarung di Liga 2 pada gelombang pagelaran musim berikutnya.</p>
                  </div>
                </div>
              </div>

            </div>
          );
        })()}

        {/* VIEW 2: CHAMPIONS LEADERBOARD PODIUM WITH BRAND NEW INTERACTIVE VS COMPARE MODE */}
        {activeTab === 'leaderboard' && (
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
                    setSelectedModalClub(allClubs[1]);
                    setIsModalOpen(true);
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
                    setSelectedModalClub(allClubs[0]);
                    setIsModalOpen(true);
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
                    setSelectedModalClub(allClubs[2]);
                    setIsModalOpen(true);
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
                        setSelectedModalClub(club);
                        setIsModalOpen(true);
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
        )}

        {/* VIEW: GEOGRAPHIC MAP VIEW */}
        {activeTab === 'map' && (
          <div className="space-y-8 animate-fade-in" id="map_view">
             <GeographicMapView
                clubs={allClubs}
                onClubClick={(club) => {
                  setSelectedModalClub(club);
                  setIsModalOpen(true);
                }}
              />
          </div>
        )}

        {/* VIEW 3: CHRONOLOGICAL SEASONS TIMELINE WITH BRAND NEW ERA FILTERS & DETAIL MODAL EXPANDERS */}
        {activeTab === 'explorer' && (
          <div className="space-y-8 animate-fade-in" id="explorer_view">
            
            {/* Header section with inline query toggles */}
            <div className="border-b-4 border-black pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest inline-block">
                  Katalog Statistik Lengkap
                </span>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                  EKSPLORASI TIAP MUSIM SEJAK 1930
                </h2>
                <p className="text-sm font-bold text-slate-500">
                  Telusuri pilar juara nasional, pencetak gol terbanyak, pelatih, hingga catatan dualisme di sini.
                </p>
              </div>

              {/* Advanced Sorting and Filtering Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setExplorerViewMode(prev => prev === 'grid' ? 'timeline' : 'grid')}
                  className="px-4 py-2 bg-white text-black border-2 border-black hover:bg-[#00FF85] transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  title="Toggle view mode"
                >
                  <Calendar className="h-4 w-4" />
                  {explorerViewMode === 'grid' ? 'TIMELINE' : 'GRID'}
                </button>
                <button
                  onClick={() => exportToCSV(sortedSeasons, 'liga-indonesia-history.csv')}
                  className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-[#00FF85] hover:text-black transition-all text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  title="Download sebagai CSV"
                >
                  <Download className="h-4 w-4" />
                  CSV
                </button>
                <button
                  onClick={() => setExplorerSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="px-4 py-2.5 text-xs font-black uppercase tracking-widest bg-white border-2 border-black hover:bg-[#F2F2F2] text-black hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  URUT: {explorerSortOrder === 'desc' ? 'LATEST' : 'OLDEST'}
                </button>
              </div>
            </div>

            {/* BRAND NEW UPGRADE: INTERACTIVE HISTORICAL ERAS NAVIGATION */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block">Pilih Pembagian Era Sepakbola Nasional</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedEra("Semua")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "Semua"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  🌐 SEMUA ERA ({leagueData.length})
                </button>
                <button
                  onClick={() => setSelectedEra("perserikatan")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "perserikatan"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  🛡️ PERSERIKATAN (1930 - 1994)
                </button>
                <button
                  onClick={() => setSelectedEra("klasik")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "klasik"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  ⚡ ERA LIGINA (1994 - 2008)
                </button>
                <button
                  onClick={() => setSelectedEra("modern")}
                  className={`p-3 text-xs font-black uppercase tracking-wider text-center border-2 border-black cursor-pointer transition-all ${
                    selectedEra === "modern"
                      ? 'bg-black text-[#00FF85] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black hover:bg-[#F2F2F2]'
                  }`}
                >
                  🚀 MODERN ISL & LIGA 1
                </button>
              </div>
            </div>

            {/* Controls Filter box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="filters_control_sub">
              {/* Search text input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                <input
                  type="text"
                  value={explorerQuery}
                  onChange={(e) => setExplorerQuery(e.target.value)}
                  placeholder="Cari kata kunci (Tahun/Klub/Topscorer/Pelatih)..."
                  className="w-full text-xs font-bold bg-white border-2 border-black rounded-none py-3.5 pl-11 pr-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder-slate-500 transition-all"
                />
              </div>

              {/* Club selection Filter */}
              <div className="relative flex items-center">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                <select
                  value={selectedClubFilter}
                  onChange={(e) => setSelectedClubFilter(e.target.value)}
                  className="w-full text-xs font-bold bg-white border-2 border-black rounded-none py-3.5 pl-11 pr-4 focus:outline-none focus:bg-[#00FF85]/5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none cursor-pointer"
                >
                  <option value="Semua">FILTER BERDASARKAN KLUB (SEMUA)</option>
                  {allClubs.map((club, idx) => (
                    <option key={idx} value={club.name}>{club.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Reset counters and information bubble */}
              <div className="bg-[#00FF85] border-2 border-black p-3.5 flex items-center justify-between text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="uppercase text-black">Hasil Saringan data:</span>
                <span className="bg-black text-white px-2.5 py-0.5 font-mono">{sortedSeasons.length} KOMPETISI</span>
              </div>
            </div>

            {/* Render loop for chronology cards / grid list */}
            {explorerViewMode === 'timeline' ? (
              <TimelineVisualization
                data={sortedSeasons}
                onSeasonClick={(season) => {
                  setActiveTab('ai-stats');
                  handleExecuteSearch(`Siapa juara liga tahun ${season} dan bagaimana jalannya kompetisi waktu itu?`);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="explorer_list">
                {sortedSeasons.length > 0 ? (
                sortedSeasons.map((record, idx) => {
                  const isExpanded = expandedSeason === record.season;
                  const itemEra = getEraForSeason(record.season);

                  return (
                    <motion.div
                      key={record.season}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(0.12, idx * 0.02) }}
                      className={`p-6 border-2 border-black bg-white flex flex-col justify-between hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all relative ${
                        record.isCancelled 
                          ? 'bg-[#F2F2F2]/50 outline-2 outline-dashed outline-red-400' 
                          : ''
                      }`}
                    >
                      <div>
                        {/* Top season label & result badges */}
                        <div className="flex justify-between items-center border-b-2 border-black pb-3 mb-4">
                          <span className="text-xs font-mono font-black italic bg-black text-white px-2.5 py-1">
                            MUSIM {record.season}
                          </span>
                          
                          {/* Era indicator badge */}
                          <span className="text-[8px] font-black uppercase px-2 py-0.5 border border-black bg-slate-100">
                            {itemEra === "perserikatan" ? "🛡️ PERSERIKATAN" : itemEra === "klasik" ? "⚡ ERA LIGINA" : "🚀 ISL / MDN"}
                          </span>
                        </div>

                        {/* Champions Title and runner up block */}
                        <div className="space-y-2">
                          <p className="text-[8px] font-black uppercase tracking-widest opacity-50">MAHKOTA JUARA (1ST)</p>
                          <h3 className={`text-2xl font-black italic tracking-tighter uppercase text-[#1A1A1A] leading-none ${record.isCancelled ? 'line-through text-slate-400' : ''}`}>
                            {record.winner}
                          </h3>

                          <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t-2 border-[#F2F2F2]">
                            <div>
                              <span className="text-[8px] font-black uppercase tracking-widest opacity-50">RUNNER-UP (2ND)</span>
                              <p className="text-sm font-bold text-slate-800 leading-tight uppercase mt-0.5">{record.runnerUp}</p>
                            </div>
                            
                            {record.coach && (
                              <div>
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-50">PELATIH JUARA</span>
                                <p className="text-sm font-bold text-[#00FF85] bg-black inline-block px-1.5 py-0.5 leading-none mt-1 uppercase text-xs">{record.coach}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Outer note / top scorer visual detail */}
                      {(record.topScorer || record.note) && (
                        <div className="mt-5 pt-3.5 border-t border-dashed border-black/30 space-y-2">
                          {record.topScorer && (
                            <div className="flex items-start gap-2 bg-[#F2F2F2] p-2.5 border border-black">
                              <Award className="h-4 w-4 mt-0.5 shrink-0" />
                              <div className="leading-tight">
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-60 block">Pemberian Top Scorer</span>
                                <span className="text-xs font-bold text-slate-800 uppercase leading-relaxed">{record.topScorer}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* BRAND NEW INTERACTIVE EXPANDER */}
                      <div className="mt-5 pt-3.5 border-t-2 border-black flex flex-col gap-2">
                        <button
                          onClick={() => setExpandedSeason(isExpanded ? null : record.season)}
                          className="w-full text-center py-2 bg-slate-100 hover:bg-[#00FF85] text-black font-black text-[10px] uppercase border border-black cursor-pointer transition-all"
                        >
                          {isExpanded ? "▲ TUTUP DETAIL HISTORIS" : "▼ LIHAT DETAIL HISTORIS & TRIVIA"}
                        </button>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-[#F2F2F2] p-4 border border-black space-y-3 text-xs leading-relaxed"
                          >
                            <p className="font-bold text-[#1A1A1A]">
                              💡 {record.note || `Kompetisi resmi kasta tertinggi sepak bola Indonesia pada musim ${record.season}. Dipimpin oleh jajaran pemain berbakat lokal serta taktik legendaris.`}
                            </p>
                            
                            <div className="bg-white p-2.5 border border-black space-y-1">
                              <span className="text-[8px] font-black uppercase tracking-widest text-[#1A1A1A] opacity-60">ARSIP DIGITAL</span>
                              <p className="font-mono text-[10px] text-zinc-700">Era: {itemEra === "perserikatan" ? "Amatir Serikat PSSI" : itemEra === "klasik" ? "Liga Indonesia Terpadu" : "Professional Era / Liga 1"}</p>
                            </div>

                            {/* Direct call-to-action button to ask the AI */}
                            <button
                              onClick={() => handleAskAboutSeason(record.season)}
                              className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="h-3 w-3 text-[#00FF85]" />
                              TANYAKAN DETAIL LENGKAP KE ASISTEN AI
                            </button>
                          </motion.div>
                        )}
                      </div>

                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16 border-2 border-black bg-[#F2F2F2]/40 text-stone-500 font-bold uppercase">
                  ⚠️ Tidak ada kompetisi yang mencocokkan kata kunci "{explorerQuery}" dalam Era {selectedEra.toUpperCase()}.
                </div>
              )}
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: LIGA GALATAMA DETAIL SECTION */}
        {activeTab === 'galatama' && (
          <div className="space-y-10" id="galatama_view">
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
                            setSelectedModalClub(club);
                            setIsModalOpen(true);
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
                              setSelectedModalClub(c);
                              setIsModalOpen(true);
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
                              setSelectedModalClub(c);
                              setIsModalOpen(true);
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
                            onClick={() => handleAskAboutGalatamaSeason(record.season)}
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
        )}

        {/* VIEW 6: PERSERIKATAN DETAIL SECTION */}
        {activeTab === 'perserikatan' && (() => {
          const ranking = getPerserikatanClubsRanking();
          const bestClub = ranking[0];
          const uniqueChampions = ranking.filter(c => c.titles > 0).length;
          const dataList = getPerserikatanData();

          return (
            <div className="space-y-10" id="perserikatan_view">
              {/* Perserikatan Hero Card */}
              <div className="bg-[#E64A19] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 select-none pointer-events-none">
                  <Trophy className="h-96 w-96 text-white" />
                </div>
                <div className="relative z-10 max-w-4xl space-y-4">
                  <span className="bg-yellow-300 text-black px-3 py-1 text-xs font-black border-2 border-black uppercase tracking-widest inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Era Amatir PSSI (1930 - 1994)
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
                    KOMPETISI PERSERIKATAN
                  </h2>
                  <p className="text-sm sm:text-base font-bold leading-relaxed opacity-95 text-stone-100">
                    Perserikatan (Kejuaraan Nasional PSSI) adalah kompetisi sepak bola amatir antarklub perserikatan (bond) di Indonesia yang diselenggarakan sejak tahun 1930 hingga melebur dengan Galatama pada tahun 1994. Kompetisi ini didominasi oleh tim-tim daerah tradisional berstatus 'perserikatan' seperti Persija Jakarta, Persis Solo, Persib Bandung, Persebaya Surabaya, PSM Makassar, dan PSMS Medan. Atmosfer pertandingan sangat kental dengan sentimen kedaerahan dan fanatisme suporter yang membara.
                  </p>
                </div>
              </div>

              {/* Perserikatan Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Durasi Era</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black tracking-tighter">64 TAHUN</span>
                  </div>
                  <span className="text-[9px] text-[#E64A19] font-black bg-[#E64A19]/10 border border-black px-1.5 py-0.5 mt-3 w-max">1930 S.D 1994</span>
                </div>
                <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-[#F2F2F2]/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Klub Tersukses</p>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-black italic tracking-tighter truncate uppercase text-[#E64A19]">
                      {bestClub ? bestClub.name.toUpperCase() : "PERSIJA JAKARTA"}
                    </span>
                    <span className="text-xs font-bold opacity-75 mt-1">
                      Mengoleksi {bestClub ? bestClub.titles : 9} Gelar Juara
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Tim Juara Unik</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black tracking-tighter">{uniqueChampions} KLUB</span>
                    <span className="text-xs font-bold uppercase opacity-55">Kampiun Berbeda</span>
                  </div>
                  <span className="text-[9px] text-black font-bold bg-yellow-300 border border-black px-1.5 py-0.5 mt-3 w-max">SEJARAH KLASIK</span>
                </div>
              </div>

              {/* Layout Leaderboard & Daftar Musim */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Leaderboard Column (Left/4) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="border-4 border-black p-6 bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">KLASEMEN SEPANJANG MASA</h3>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      Daftar klub perserikatan pengumpul trofi juara terbanyak sejak edisi perdana tahun 1930.
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
                              setSelectedModalClub(club);
                              setIsModalOpen(true);
                            }}
                            className="p-4 flex items-center justify-between hover:bg-[#E64A19]/5 cursor-pointer transition-all duration-100 group bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <span className="h-7 w-7 bg-black text-white font-mono font-black flex items-center justify-center text-xs group-hover:bg-[#E64A19] transition-colors">
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
                                <h4 className="font-extrabold text-sm uppercase group-hover:text-[#E64A19] transition-colors line-clamp-1 text-black">
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
                    <span className="text-xs font-mono font-bold bg-[#E64A19] text-white border border-black px-2.5 py-1">
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
                          <div className="p-4 border-b-2 border-black bg-[#E64A19]/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4.5 w-4.5 text-[#E64A19]" />
                              <span className="text-sm font-black tracking-tight text-black">{record.season}</span>
                            </div>
                            <span className="text-[9px] font-black uppercase bg-black text-yellow-300 border border-black px-2 py-0.5">
                              AMATIR
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-4 flex-grow">
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
                                setSelectedModalClub(c);
                                setIsModalOpen(true);
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
                                const c = ranking.find(x => x.name === record.runnerUp || x.historicalNames.includes(record.runnerUp)) || {
                                  name: record.runnerUp,
                                  titles: 0,
                                  runnerUps: 1,
                                  seasonsWon: [],
                                  historicalNames: []
                                };
                                setSelectedModalClub(c);
                                setIsModalOpen(true);
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
                                  <span className="font-semibold text-[#E64A19]">{record.coach}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="p-2 border-t-2 border-black bg-stone-50">
                            <button
                              onClick={() => handleAskAboutPerserikatanSeason(record.season)}
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
        })()}

        {/* VIEW 7: LIGA INDONESIA DETAIL SECTION */}
        {activeTab === 'liga-indonesia' && (() => {
          const ranking = getLiginaClubsRanking();
          const bestClub = ranking[0];
          const uniqueChampions = ranking.filter(c => c.titles > 0).length;
          const dataList = getLiginaData();

          return (
            <div className="space-y-10" id="liga_indonesia_view">
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
                              setSelectedModalClub(club);
                              setIsModalOpen(true);
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
                            <span className="text-[9px] font-black uppercase bg-black text-[#00FF85] border border-black px-2 py-0.5">
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
                                    setSelectedModalClub(c);
                                    setIsModalOpen(true);
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
                                    const c = ranking.find(x => x.name === record.runnerUp || x.historicalNames.includes(record.runnerUp)) || {
                                      name: record.runnerUp,
                                      titles: 0,
                                      runnerUps: 1,
                                      seasonsWon: [],
                                      historicalNames: []
                                    };
                                    setSelectedModalClub(c);
                                    setIsModalOpen(true);
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
                              onClick={() => handleAskAboutLiginaSeason(record.season)}
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
        })()}

        {/* VIEW 8: ERA MODERN DETAIL SECTION */}
        {activeTab === 'era-modern' && (() => {
          const ranking = getModernClubsRanking();
          const bestClub = ranking[0];
          const uniqueChampions = ranking.filter(c => c.titles > 0).length;
          const dataList = getModernLeagueData();

          return (
            <div className="space-y-10" id="era_modern_view">
              {/* Era Modern Hero Card */}
              <div className="bg-[#0D9488] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 select-none pointer-events-none">
                  <Trophy className="h-96 w-96 text-white" />
                </div>
                <div className="relative z-10 max-w-4xl space-y-4">
                  <span className="bg-yellow-300 text-black px-3 py-1 text-xs font-black border-2 border-black uppercase tracking-widest inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Era Profesional Modern (2008 - Sekarang)
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
                    ERA MODERN (ISL & LIGA 1)
                  </h2>
                  <p className="text-sm sm:text-base font-bold leading-relaxed opacity-95 text-stone-100">
                    Era Modern dimulai sejak pembentukan Indonesia Super League (ISL) pada tahun 2008 sebagai kasta tertinggi sepak bola profesional penuh di tanah air, kemudian dilanjutkan dengan bergulirnya kompetisi Liga 1 sejak tahun 2017. Era ini ditandai dengan standarisasi klub profesional yang mandiri finansial, pemanfaatan regulasi pemain asing premium, persaingan hak siar TV digital secara komersial, hingga lahirnya kekuatan modern yang sukses menjuarai persaingan ketat nasional.
                  </p>
                </div>
              </div>

              {/* Era Modern Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Durasi Era</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black tracking-tighter">18 TAHUN</span>
                  </div>
                  <span className="text-[9px] text-[#0D9488] font-black bg-[#0D9488]/10 border border-black px-1.5 py-0.5 mt-3 w-max">2008 S.D SEKARANG</span>
                </div>
                <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex flex-col justify-between bg-[#F2F2F2]/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Klub Tersukses</p>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-black italic tracking-tighter truncate uppercase text-[#0D9488]">
                      {bestClub ? bestClub.name.toUpperCase() : "PERSIPURA JAYAPURA"}
                    </span>
                    <span className="text-xs font-bold opacity-75 mt-1">
                      Mengoleksi {bestClub ? bestClub.titles : 4} Gelar Juara
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between bg-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Tim Juara Unik</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-black tracking-tighter">{uniqueChampions} KLUB</span>
                    <span className="text-xs font-bold uppercase opacity-55">Kampiun Berbeda</span>
                  </div>
                  <span className="text-[9px] text-black font-bold bg-yellow-300 border border-black px-1.5 py-0.5 mt-3 w-max">SEPAK BOLA INDUSTRI</span>
                </div>
              </div>

              {/* Layout Leaderboard & Daftar Musim */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Leaderboard Column (Left/4) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="border-4 border-black p-6 bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">KLASEMEN SEPANJANG MASA</h3>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      Daftar klub pengumpul trofi kasta tertinggi profesional (ISL & Liga 1) terbanyak sejak bergulirnya musim modern 2008.
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
                              setSelectedModalClub(club);
                              setIsModalOpen(true);
                            }}
                            className="p-4 flex items-center justify-between hover:bg-[#0D9488]/5 cursor-pointer transition-all duration-100 group bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <span className="h-7 w-7 bg-black text-white font-mono font-black flex items-center justify-center text-xs group-hover:bg-[#0D9488] transition-colors">
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
                                <h4 className="font-extrabold text-sm uppercase group-hover:text-[#0D9488] transition-colors line-clamp-1 text-black">
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
                    <span className="text-xs font-mono font-bold bg-[#0D9488] text-white border border-black px-2.5 py-1">
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
                          <div className="p-4 border-b-2 border-black bg-[#0D9488]/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4.5 w-4.5 text-[#0D9488]" />
                              <span className="text-sm font-black tracking-tight text-black">{record.season}</span>
                            </div>
                            <span className="text-[9px] font-black uppercase bg-black text-[#00FF85] border border-black px-2 py-0.5">
                              PROFESIONAL
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-4 flex-grow">
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
                                setSelectedModalClub(c);
                                setIsModalOpen(true);
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
                                const c = ranking.find(x => x.name === record.runnerUp || x.historicalNames.includes(record.runnerUp)) || {
                                  name: record.runnerUp,
                                  titles: 0,
                                  runnerUps: 1,
                                  seasonsWon: [],
                                  historicalNames: []
                                };
                                setSelectedModalClub(c);
                                setIsModalOpen(true);
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
                                  <span className="font-semibold text-[#0D9488]">{record.coach}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="p-2 border-t-2 border-black bg-stone-50">
                            <button
                              onClick={() => handleAskAboutModernSeason(record.season)}
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
        })()}
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
        onClose={() => setIsModalOpen(false)}
        club={selectedModalClub}
        metadata={selectedModalClub ? clubMetadataList[selectedModalClub.name] : null}
        onAskAI={(query) => {
          setActiveTab('ai-stats');
          handleExecuteSearch(query);
        }}
      />

      {/* Multi-Club Comparison Modal */}
      {isMultiCompareOpen && (
        <MultiClubComparison
          allClubs={allClubs}
          onClose={() => setIsMultiCompareOpen(false)}
        />
      )}
    </div>
  );
}
