import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Search, Sparkles, RefreshCw, History, TrendingUp, ChevronRight } from "lucide-react";
import { SearchQueryResponse } from "../types";
import { getClubsRanking } from "../data/leagueData";

export default function AiStatsView({ initialQuery, onClearInitialQuery, onExecuteSearch }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchQueryResponse | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Siapa klub juara terbanyak sepanjang sejarah Liga Indonesia?",
    "Persib Bandung vs Persija Jakarta"
  ]);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem("gemini_api_key");
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    localStorage.setItem("gemini_api_key", e.target.value);
  };

  const allClubs = getClubsRanking();
  const maxTitles = Math.max(...allClubs.map(c => c.titles));

  // Precompiled trivia events for exploration quick-actions
  const triviaFakta = [
    { title: "Rekor Gol Abadi Peri Sandria", tag: "⚡ REKOR GOL", query: "Siapa pencetak gol terbanyak sepanjang masa dalam semusim Liga Indonesia?", desc: "Mencetak 34 gol untuk Bandung Raya pada musim 1994-95." },
    { title: "Era Dualisme IPL vs ISL", tag: "🚨 DUALISME LIGA", query: "Ceritakan sejarah dualisme Liga Indonesia tahun 2011 sampai 2013", desc: "Ketika federasi terpecah menghasilkan dua liga & juara paralel." },
    { title: "Laga Klasik Penonton Terbanyak", tag: "🏟️ REKOR PENONTON", query: "Apa pertandingan Liga Indonesia dengan jumlah penonton terbanyak dalam sejarah?", desc: "Final Perserikatan 1985 (Persib vs PSMS) dihadiri 150.000 jiwa di Senayan." },
    { title: "Piala Juara Terbanyak Modern", tag: "⭐ MUTIARA HITAM", query: "Mengapa Persipura Jayapura disebut klub tersukses era profesional modern?", desc: "Menyabet 4 gelar juara ISL dengan skema penyerangan cemerlang." }
  ];

  const samplePrompts = [
    { text: "Klub juara terbanyak?", label: "🏆 JUARA TERBANYAK" },
    { text: "Siapa juara tahun 1994–95?", label: "⚡ MUSIM 1994/95" },
    { text: "Daftar juara 10 tahun terakhir", label: "📅 ERA MODERN" },
    { text: "Siapa pelatih juara terbanyak?", label: "👔 PELATIH SUKSES" },
    { text: "Persib Bandung vs Persija Jakarta", label: "🥊 RIVALITAS KLASIK" },
    { text: "Pencetak gol terbanyak dari tahun ke tahun", label: "⚽ TOP SCORERS" }
  ];

  const handleExecuteSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setSearchQuery(queryText);
    setIsSearching(true);

    setSearchHistory(prev => {
      const filtered = prev.filter(q => q !== queryText);
      return [queryText, ...filtered].slice(0, 5);
    });

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, apiKey })
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        throw new Error("HTTP error: " + response.status);
      }
    } catch (err) {
      console.error("Failed to query AI stats:", err);
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

  useEffect(() => {
    if (initialQuery) {
      handleExecuteSearch(initialQuery);
      onClearInitialQuery();
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(searchQuery);
  };

  return (
          <div className="space-y-10" id="ai_stats_view">
            <title>Pencarian AI & Statistik Interaktif - Garuda Stats</title>
            <meta name="description" content="Tanyakan asisten kecerdasan buatan (AI) Garuda Stats mengenai statistik sejarah juara Liga Indonesia dan Galatama secara interaktif." />
            
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
                    className="p-5 text-left bg-white border-2 border-black hover:bg-[#00FF85]/10 hover:border-[#00FF85] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 bg-black hover:bg-zinc-800 text-white rounded-none cursor-pointer duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00FF85]"
                      aria-label="Cari"
                    >
                      {isSearching ? <RefreshCw className="h-5 w-5 animate-spin text-[#00FF85]" /> : <Search className="h-5 w-5" />}
                    </button>
                  </div>
                </form>

                {/* API Key Input */}
                <div className="bg-white border-2 border-black p-3 space-y-2">
                  <label htmlFor="api_key_input" className="text-[10px] font-black uppercase tracking-widest block">
                    Kunci API Gemini (Opsional)
                  </label>
                  <input
                    type="password"
                    id="api_key_input"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    placeholder="Paste Gemini API Key Anda..."
                    className="w-full text-xs font-mono bg-[#F2F2F2] border border-black p-2 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
                  />
                  <p className="text-[9px] text-slate-500 font-bold leading-tight">
                    Untuk hasil pencarian AI yang lebih responsif tanpa batasan rate-limit, Anda bisa memasukkan kunci API Anda sendiri. 
                    Dapatkan secara gratis di <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 underline">Google AI Studio</a>. Kunci disimpan aman di browser lokal Anda.
                  </p>
                </div>

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
                          className="bg-white border border-black hover:bg-[#00FF85] hover:text-black hover:border-black px-2 py-1 text-[10px] font-bold uppercase truncate max-w-full text-left cursor-pointer transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
                        className={`text-left font-bold text-xs p-3 border-2 border-black transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black ${
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
                                className="text-left font-bold text-xs p-3 bg-white border-2 border-black hover:bg-[#00FF85] duration-150 cursor-pointer flex-1 flex items-center justify-between group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
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
  );
}
