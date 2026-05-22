# GARUDA STATS — Design Document
> Database Sejarah Juara Liga Indonesia (1930–2026)

---

## 1. Ringkasan Aplikasi

**Garuda Stats** adalah aplikasi web full-stack yang mendokumentasikan seluruh sejarah juara sepak bola kasta tertinggi Indonesia sejak 1930 hingga sekarang. Aplikasi ini menggabungkan arsip data statis yang kaya dengan antarmuka interaktif bergaya **Neo-Brutalist**, dilengkapi mesin pencari natural-language berbasis AI (Gemini) untuk menjawab pertanyaan statistik seputar liga.

---

## 2. Tech Stack

| Lapisan | Teknologi |
|---------|-----------|
| **UI Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 (utility-first, tanpa design system custom) |
| **Animasi** | Motion (Framer Motion) — `motion/react` |
| **Icon** | Lucide React |
| **Markdown** | `react-markdown` |
| **Server** | Express.js (Node via `tsx`) |
| **AI Engine** | Google Gemini API (`@google/genai`) |
| **Font** | Inter · Space Grotesk · JetBrains Mono (Google Fonts) |

### Arsitektur Deployment

```
Browser (React SPA)
      ↕ fetch /api/search
Express Server (server.ts)
      ↕ generateContent()
Google Gemini API (gemini-3.5-flash)
      ↓ fallback jika API key tidak ada
Local Rule-Based Parser (localSearchFallback)
```

Di mode **development**, Vite dijalankan sebagai middleware Express (`createViteServer`). Di mode **production**, Express menyajikan static bundle dari folder `dist/`.

---

## 3. Struktur Direktori

```
sejarah-juara-liga-indonesia/
├── server.ts               # Express backend + Gemini AI handler
├── src/
│   ├── App.tsx             # Komponen root (2800+ baris) — semua tampilan tab
│   ├── index.css           # CSS global: font import, scrollbar, Tailwind
│   ├── main.tsx            # Entry point React
│   ├── types.ts            # Interface TypeScript global (SeasonRecord, ClubSummary, dll.)
│   ├── components/
│   │   ├── ClubShield.tsx  # Komponen SVG lambang klub (fallback generatif)
│   │   └── ClubDetailModal.tsx  # Modal detail klub (era pro + amatir)
│   └── data/
│       ├── leagueData.ts   # Dataset utama (~95 musim) + fungsi ranking era
│       ├── galatamaData.ts # Dataset Liga Galatama 1979–1994
│       ├── standingsData.ts # Data klasemen per musim (Liga 1 2010-an dst.)
│       └── clubMetadata.ts # Metadata klub: nama, kota, warna, deskripsi, logo
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Design Language: Neo-Brutalism

Seluruh UI menggunakan gaya **Neo-Brutalist** — estetika desain web kontemporer yang mengedepankan:

| Prinsip | Implementasi |
|---------|--------------|
| Border tegas | `border-2 border-black` atau `border-4 border-black` di semua elemen |
| Shadow "cetak" | `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` (Tailwind arbitrary) |
| Tipografi bold | `font-black`, `italic`, `tracking-tighter`, `uppercase` |
| Warna terbatas | Hitam, putih, abu-abu, dan aksen **#00FF85** (neon green) |
| Anti-rounded | `rounded-none` — sudut persegi tajam di mana pun |
| Hover effect | `hover:translate-x-0.5 hover:-translate-y-0.5` untuk efek "angkat" |

### Palet Warna Utama

```
#000000  — Hitam utama (border, teks, tombol utama)
#FFFFFF  — Putih (background kartu)
#F2F2F2  — Abu-abu terang (background sekunder)
#00FF85  — Neon Green (aksen aktif, highlight, badge penting)
#1A1A1A  — Hampir hitam (warna teks utama)
```

### Warna Era (badge kontekstual)
```
Era Perserikatan (1930–1994) → indigo / slate
Era Galatama (1979–1994)     → #8A5CF5 (ungu)
Era Ligina/Klasik (1994–2008) → hitam / abu-abu
Era Modern ISL/Liga 1         → hijau neon (#00FF85)
```

---

## 5. Sistem Tipografi

```css
--font-sans:    "Inter"          → body text, label, angka kecil
--font-display: "Space Grotesk" → tidak digunakan dominan, tersedia
--font-mono:    "JetBrains Mono" → angka statistik, kode musim, font-mono class
```

Hierarchy ukuran teks representatif:
- **Hero number**: `text-5xl font-black tracking-tighter`
- **Section heading**: `text-4xl font-black italic tracking-tighter uppercase`
- **Card title**: `text-2xl font-black italic tracking-tighter uppercase`
- **Stat label**: `text-[9px] font-black uppercase tracking-widest`
- **Body copy**: `text-sm font-bold text-slate-600`

---

## 6. Komponen Utama

### 6.1 Navigasi (`<nav>`)
- Sticky top, `border-b-4 border-black`
- Logo: kotak `#00FF85` + ikon Trophy, tulisan `GARUDA STATS`
- Tab pills: 8 tab dengan state aktif (`bg-[#00FF85] text-black shadow`)
- Tab aktif disimpan di state `activeTab`

**Daftar Tab:**

| ID | Label | Konten |
|----|-------|--------|
| `ai-stats` | ASISTEN AI | Statmuse-style search box |
| `standings` | KLASEMEN | Tabel klasemen liga terkini |
| `leaderboard` | PAPAN JUARA | Podium + tabel all-time champions |
| `explorer` | RIWAYAT LENGKAP | Timeline semua musim dengan filter |
| `galatama` | LIGA GALATAMA | Khusus era Galatama 1979–94 |
| `perserikatan` | PERSERIKATAN | Khusus era Perserikatan 1930–94 |
| `liga-indonesia` | LIGA INDONESIA | Khusus era Ligina 1994–2008 |
| `era-modern` | ERA MODERN | Khusus ISL + Liga 1 2008–sekarang |

### 6.2 Quick Highlights Bar
4 kartu metrik di atas semua konten:
1. **Total Kompetisi** — jumlah musim tidak-dibatalkan
2. **Klub Paling Sukses** — pemegang gelar profesional terbanyak
3. **Trofi Pemegang Unik** — jumlah klub berbeda yang pernah juara
4. **Gelar Pro Tertinggi** — rekor trofi profesional terbanyak

### 6.3 Tab: ASISTEN AI (`ai-stats`)
- Search bar dengan ikon Sparkles
- Kirim query ke `POST /api/search`
- Respons ditampilkan sebagai:
  - **Text**: ReactMarkdown render
  - **Widget visual**: bar chart/ranking/timeline/list berdasarkan `autoQueryStats.type`
- Suggested prompts sebagai tombol cepat
- Search history (max 5, persisten di sesi)
- Trivia "Fakta Menarik" sebagai quick-launch cards

**Widget Tipe:**
```
champions-ranking → Bar chart horizontal dengan nilai trofi
club-comparison   → Pasangan row perbandingan antar klub
timeline          → Daftar musim urut kronologis
list              → Tabel info sederhana (label + subtext)
```

### 6.4 Tab: KLASEMEN (`standings`)
- Selector musim (dropdown: 2024-2025, 2023-2024, dst.)
- Bento box ringkasan: pemimpin liga, serangan terproduktif, pertahanan terbaik, regulasi
- Tabel klasemen dengan kolom: Rank, Klub, M, MG, S, K, Gol, SG, PTS, Form
- Sortable headers (klik kolom untuk sort asc/desc)
- Filter search by nama klub
- Baris warna: hijau (top 4), merah (relegasi 16-18)
- Klik baris → buka ClubDetailModal
- Form guide: badge W/D/L berwarna

### 6.5 Tab: PAPAN JUARA (`leaderboard`)

**Podium Top 3** (3-kolom grid):
- Posisi 2 (kiri), Posisi 1 (tengah, lebih besar), Posisi 3 (kanan)
- Tiap kartu: shield klub, nama, peringkat, daftar gelar era profesional + info amatir
- Klik → buka ClubDetailModal

**VS Mode (Head-to-Head)**:
- Dua selector dropdown (Klub A vs Klub B)
- Verdict badge: siapa lebih unggul
- Bar chart perbandingan gelar profesional + runner-up
- Daftar tahun juara masing-masing

**Leaderboard Table** (rank 4 ke bawah):
- Rank badge, shield, nama, nickname, kota, berdiri, runner-up, gelar pro, +amatir badge

### 6.6 Tab: RIWAYAT LENGKAP (`explorer`)
- Era filter buttons: Semua / Perserikatan / Era Ligina / ISL & Liga 1
- Search text + filter club dropdown
- Grid 2 kolom kartu musim
- Tiap kartu: musim, era badge, juara, runner-up, pelatih, top scorer
- Expandable detail section (accordion)

### 6.7 Tab Era Khusus (Galatama, Perserikatan, Ligina, Modern)
- Hero banner berwarna khas era
- Metrics bento (durasi, klub tersukses, unik champions)
- Leaderboard per-era (kiri) + grid musim (kanan)
- Klik club → ClubDetailModal

---

## 7. Komponen Sub-Halaman

### ClubShield (`ClubShield.tsx`)
- Menampilkan logo nyata via `logoUrl` (img tag dengan fallback)
- Fallback: SVG generatif berdasarkan `emblemSymbol` + `primaryColor` / `secondaryColor`
- Simbol yang didukung: `shield`, `diamond`, `star`, `triangle`, `circle`, `cross`, `crown`, dll.

### ClubDetailModal (`ClubDetailModal.tsx`)
- Full-screen overlay dengan `AnimatePresence`
- Header: shield + nama + historical names
- Body: kota, tahun berdiri, deskripsi, **Gelar Era Profesional** (hijau), Gelar Amatir Perserikatan (abu), runner-up
- Badge tahun juara: hijau untuk profesional, abu untuk amatir
- Footer: tombol kembali + tombol "Tanya Asisten AI"

---

## 8. Data Layer & Logika Era

### 8.1 Tipe Data Utama (`types.ts`)

```typescript
interface SeasonRecord {
  season: string;       // e.g. "1994–95", "2023-2024"
  winner: string;
  runnerUp: string;
  topScorer?: string;
  coach?: string;
  note?: string;
  isCancelled?: boolean;
}

interface ClubSummary {
  name: string;
  titles: number;           // Era Profesional (UTAMA)
  runnerUps: number;        // Era Profesional
  seasonsWon: string[];     // Era Profesional
  historicalNames: string[];
  amatirTitles: number;     // Era Amatir/Perserikatan (INFO TAMBAHAN)
  amatirSeasonsWon: string[];
}
```

### 8.2 Pembagian Era

| Era | Rentang | Nama Kompetisi |
|-----|---------|----------------|
| **Amatir / Perserikatan** | 1930 – 1993/94 | PSSI Stedenwedstrijden, Kejuaraan Nasional PSSI, Divisi Utama PSSI |
| **Semi-Profesional** | 1979 – 1994 | Liga Sepak Bola Utama (Galatama) — paralel |
| **Profesional (Ligina)** | 1994/95 – 2007/08 | Divisi Utama Liga Indonesia |
| **Profesional Modern** | 2008/09 – Sekarang | Indonesia Super League, Liga 1 |

### 8.3 Fungsi Ranking (`leagueData.ts`)

```
getClubsRanking()        → Ranking utama: pro titles (1994+) + amatir sebagai info
getPerserikatanData()    → Filter musim 1930–1994
getLiginaData()          → Filter musim 1994/95–2007/08
getModernLeagueData()    → Filter musim 2008/09+
getProfesionalData()     → Filter musim 1994/95+ (all pro)
getGalatamaClubsRanking() → Ranking khusus era Galatama
```

**Urutan sort `getClubsRanking()`:**
1. Gelar profesional (desc)
2. Runner-up profesional (desc) — tiebreaker
3. Total gelar gabungan (desc) — tiebreaker akhir

### 8.4 Normalisasi Nama Klub
```
"VIJ Batavia"          → "Persija Jakarta"
"SIVB Surabaya"        → "Persebaya Surabaya"
"Persebaya 1927"       → "Persebaya Surabaya"
```

---

## 9. API Backend

### `POST /api/search`

**Request Body:**
```json
{ "query": "Klub juara terbanyak?" }
```

**Response Schema:**
```json
{
  "answer": "string (Markdown)",
  "suggestedPrompts": ["string", "string", "string"],
  "autoQueryStats": {
    "type": "champions-ranking | timeline | club-comparison | list",
    "title": "string",
    "data": [{ "label": "string", "value": number, "subtext": "string" }]
  }
}
```

**Flow:**
1. Jika `GEMINI_API_KEY` tersedia → kirim ke Gemini `gemini-3.5-flash` dengan system instruction berisi seluruh dataset JSON
2. Jika tidak ada / error → `localSearchFallback()` (rule-based parser berbasis keyword)

### `GET /api/history`
Mengembalikan seluruh data mentah: `seasons`, `ranking`, `galatamaSeasons`, `galatamaRanking`

---

## 10. State Management

Seluruh state dikelola secara lokal di `App.tsx` via `useState`:

| State | Tipe | Tujuan |
|-------|------|--------|
| `activeTab` | union string | Tab navigasi aktif |
| `selectedStandingsSeason` | string | Musim klasemen yang dipilih |
| `standingsSortField` | keyof StandingsEntry | Kolom sort aktif klasemen |
| `searchQuery` | string | Input query AI |
| `isSearching` | boolean | Loading state AI |
| `searchResult` | SearchQueryResponse | Hasil AI |
| `searchHistory` | string[] | Riwayat query (max 5) |
| `selectedEra` | string | Filter era di explorer |
| `compareClubA/B` | string | Klub VS mode |
| `explorerQuery` | string | Search teks di explorer |
| `explorerSortOrder` | `'asc'|'desc'` | Urutan musim di explorer |
| `selectedClubFilter` | string | Filter klub di explorer |
| `expandedSeason` | string | Season card yang dibuka |
| `selectedModalClub` | ClubSummary | Data klub untuk modal |
| `isModalOpen` | boolean | Visibilitas modal |

---

## 11. Animasi & Interaksi

| Elemen | Teknik |
|--------|--------|
| Tab switch | CSS `animate-fade-in` (custom) |
| Season cards | `motion.div` dengan `initial/animate` opacity + y |
| ClubDetailModal | `AnimatePresence` + `motion.div` scale + opacity |
| Card hover | `hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[...]` |
| Shield hover | `group-hover:scale-110` |
| Tombol hover | `hover:bg-[#00FF85]` color transition |

---

## 12. Responsivitas

Menggunakan Tailwind breakpoints:
- **Mobile-first**: tata letak 1 kolom default
- **`sm:`** (640px+): 2 kolom, tabel muncul
- **`md:`** (768px+): form grid 3 kolom, bento box 4 kolom
- **`lg:`** (1024px+): layout sidebar Galatama (col-4 + col-8)

---

## 13. Konvensi Kode

- Semua ID HTML (`id="..."`) diberi nama deskriptif untuk aksesibilitas & testing browser
- Warna aksen era tidak di-hardcode sembarangan — gunakan kelas Tailwind yang sudah terdefinisi
- Nama klub selalu di-normalize melalui fungsi `normalize()` sebelum operasi filter/sort
- Data `isCancelled: true` selalu dieksklusi dari perhitungan juara, ditampilkan dengan visual khusus (strikethrough + outline merah)
- Historical names (nama lama klub) ditampilkan sebagai info tambahan, bukan menggantikan nama utama

---

## 14. Pengembangan Lanjutan (Potensial)

- [ ] Pemisahan `App.tsx` menjadi komponen-komponen per tab (saat ini 2800+ baris monolitik)
- [ ] Penambahan data statistik per musim lebih lengkap (jumlah klub, format, penonton, gol total)
- [ ] Filter amatir vs profesional di tab Explorer
- [ ] Halaman profil klub individual (route `/klub/:nama`)
- [ ] Server-side rendering (Next.js) untuk SEO lebih baik
- [ ] Offline PWA support dengan service worker + data cache
