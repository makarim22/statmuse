import { SeasonRecord, ClubSummary } from '../types';

export const leagueData: SeasonRecord[] = [
  { season: "1930", winner: "Persija Jakarta", runnerUp: "SIVB Surabaya" },
  { season: "1931", winner: "Persija Jakarta", runnerUp: "PSIM Yogyakarta" },
  { season: "1932", winner: "PSIM Yogyakarta", runnerUp: "VIJ Batavia" },
  { season: "1933", winner: "Persija Jakarta", runnerUp: "Persib Bandung" },
  { season: "1934", winner: "VIJ Batavia", runnerUp: "Persib Bandung" },
  { season: "1935", winner: "Persis Solo", runnerUp: "PPVIM Meester Cornelis" },
  { season: "1936", winner: "Persis Solo", runnerUp: "Persib Bandung" },
  { season: "1937", winner: "Persib Bandung", runnerUp: "Persis Solo" },
  { season: "1938", winner: "VIJ Batavia", runnerUp: "Persebaya Surabaya" },
  { season: "1939", winner: "Persis Solo", runnerUp: "PSIM Yogyakarta" },
  { season: "1940", winner: "Persis Solo", runnerUp: "PSIM Yogyakarta" },
  { season: "1941", winner: "Persis Solo", runnerUp: "Persebaya Surabaya" },
  { season: "1942", winner: "Persis Solo", runnerUp: "Persebaya Surabaya" },
  { season: "1943", winner: "Persis Solo", runnerUp: "PSIM Yogyakarta" },
  { season: "1950", winner: "Persib Bandung", runnerUp: "Persebaya Surabaya" },
  { season: "1951", winner: "Persebaya Surabaya", runnerUp: "PSM Makassar" },
  { season: "1952", winner: "Persebaya Surabaya", runnerUp: "Persija Jakarta" },
  { season: "1953–1954", winner: "Persija Jakarta", runnerUp: "PSMS Medan" },
  { season: "1955–1957", winner: "PSM Makassar", runnerUp: "PSMS Medan" },
  { season: "1957–1959", winner: "PSM Makassar", runnerUp: "Persib Bandung" },
  { season: "1959–1961", winner: "Persib Bandung", runnerUp: "PSM Makassar" },
  { season: "1962–1964", winner: "Persija Jakarta", runnerUp: "PSM Makassar" },
  { season: "1964–1965", winner: "PSM Makassar", runnerUp: "Persebaya Surabaya" },
  { season: "1965–1966", winner: "PSM Makassar", runnerUp: "Persib Bandung" },
  { season: "1966–1967", winner: "PSMS Medan", runnerUp: "Persib Bandung" },
  { season: "1968–1969", winner: "PSMS Medan", runnerUp: "Persija Jakarta" },
  { season: "1969–1971", winner: "PSMS Medan", runnerUp: "Persebaya Surabaya" },
  { season: "1971–1973", winner: "Persija Jakarta", runnerUp: "Persebaya Surabaya" },
  { season: "1975–1978", winner: "Persebaya Surabaya", runnerUp: "Persija Jakarta" },
  { season: "1978–1979", winner: "Persija Jakarta", runnerUp: "PSMS Medan" },
  { season: "1980", winner: "Persiraja Banda Aceh", runnerUp: "Persipura Jayapura" },
  { season: "1983", winner: "PSMS Medan", runnerUp: "Persib Bandung" },
  { season: "1985", winner: "PSMS Medan", runnerUp: "Persib Bandung" },
  { season: "1986", winner: "Persib Bandung", runnerUp: "Perseman Manokwari" },
  { season: "1986–1987", winner: "PSIS Semarang", runnerUp: "Persebaya Surabaya" },
  { season: "1987–1988", winner: "Persebaya Surabaya", runnerUp: "Persija Jakarta" },
  { season: "1989–1990", winner: "Persib Bandung", runnerUp: "Persebaya Surabaya" },
  { season: "1991–1992", winner: "PSM Makassar", runnerUp: "PSMS Medan" },
  { season: "1993–1994", winner: "Persib Bandung", runnerUp: "PSM Makassar" },
  { 
    season: "1994–95", 
    winner: "Persib Bandung", 
    runnerUp: "Petrokimia Putra", 
    topScorer: "Peri Sandria (Bandung Raya, 34 gol)", 
    coach: "Indra Thohir" 
  },
  { 
    season: "1995–96", 
    winner: "Bandung Raya", 
    runnerUp: "PSM Makassar", 
    topScorer: "Dejan Gluscevic (Bandung Raya, 30 gol)", 
    coach: "Henk Wullems" 
  },
  { 
    season: "1996–97", 
    winner: "Persebaya Surabaya", 
    runnerUp: "Bandung Raya", 
    topScorer: "Jacksen F. Tiago (Persebaya Surabaya, 26 gol)", 
    coach: "Rusdy Bahalwan" 
  },
  { 
    season: "1997–98", 
    winner: "Kompetisi dibatalkan", 
    runnerUp: "-", 
    topScorer: "Kurniawan Dwi Yulianto (Pelita Jakarta, 20 gol)", 
    coach: "-",
    isCancelled: true,
    note: "Kompetisi dihentikan karena krisis moneter dan situasi politik di Indonesia."
  },
  { 
    season: "1998–99", 
    winner: "PSIS Semarang", 
    runnerUp: "Persebaya Surabaya", 
    topScorer: "Alain Mabenda (PSDS Deli Serdang, 11 gol)", 
    coach: "Edy Paryono" 
  },
  { 
    season: "1999–2000", 
    winner: "PSM Makassar", 
    runnerUp: "PKT Bontang", 
    topScorer: "Bambang Pamungkas (Persija Jakarta, 24 gol)", 
    coach: "Syamsuddin Umar" 
  },
  { 
    season: "2001", 
    winner: "Persija Jakarta", 
    runnerUp: "PSM Makassar", 
    topScorer: "Sadissou Bako (Barito Putera, 22 gol)", 
    coach: "Sofyan Hadi" 
  },
  { 
    season: "2002", 
    winner: "Petrokimia Putra", 
    runnerUp: "Persita Tangerang", 
    topScorer: "Ilham Jaya Kesuma (Persita Tangerang, 26 gol)", 
    coach: "Serghei Dubrovin" 
  },
  { 
    season: "2003", 
    winner: "Persik Kediri", 
    runnerUp: "PSM Makassar", 
    topScorer: "Oscar Aravena (PSM Makassar, 31 gol)", 
    coach: "Jaya Hartono" 
  },
  { 
    season: "2004", 
    winner: "Persebaya Surabaya", 
    runnerUp: "PSM Makassar", 
    topScorer: "Ilham Jaya Kesuma (Persita Tangerang, 22 gol)", 
    coach: "Jacksen F. Tiago" 
  },
  { 
    season: "2005", 
    winner: "Persipura Jayapura", 
    runnerUp: "Persija Jakarta", 
    topScorer: "Cristian Gonzáles (Persik Kediri, 25 gol)", 
    coach: "Rahmad Darmawan" 
  },
  { 
    season: "2006", 
    winner: "Persik Kediri", 
    runnerUp: "PSIS Semarang", 
    topScorer: "Cristian Gonzáles (Persik Kediri, 29 gol)", 
    coach: "Daniel Roekito" 
  },
  { 
    season: "2007–08", 
    winner: "Sriwijaya", 
    runnerUp: "PSMS Medan", 
    topScorer: "Cristian Gonzáles (Persik Kediri, 32 gol)", 
    coach: "Rahmad Darmawan" 
  },
  {
    season: "2008–09",
    winner: "Persipura Jayapura",
    runnerUp: "Persiwa Wamena",
    topScorer: "Cristian Gonzáles (Persik Kediri, 23 gol)",
    coach: "Jacksen F. Tiago"
  },
  {
    season: "2009–10",
    winner: "Arema Indonesia",
    runnerUp: "Persipura Jayapura",
    topScorer: "Cristian Gonzáles (Arema Indonesia, 27 gol)",
    coach: "Jaya Hartono"
  },
  {
    season: "2010–11",
    winner: "Persipura Jayapura",
    runnerUp: "Arema Indonesia",
    topScorer: "Cristian Gonzáles (Persipura Jayapura, 19 gol)",
    coach: "Jacksen F. Tiago"
  },
  {
    season: "2011–12",
    winner: "Sriwijaya",
    runnerUp: "Persipura Jayapura",
    topScorer: "Budi Sudarsono (Persebaya Surabaya, 20 gol)",
    coach: "Rahmad Darmawan"
  },
  {
    season: "2013 (LPI)",
    winner: "Semen Padang",
    runnerUp: "Persebaya 1927",
    topScorer: "Elie Aiboy (Persebaya 1927, 18 gol)",
    coach: "Nil Maizar",
    note: "Liga Prima Indonesia (LPI) - kompetisi pecahan/dualistik"
  },
  {
    season: "2013 (ISL)",
    winner: "Persipura Jayapura",
    runnerUp: "Arema Indonesia",
    topScorer: "Sergio van Dijk (Persebaya Surabaya, 23 gol)",
    coach: "Jacksen F. Tiago",
    note: "Indonesia Super League (ISL)"
  },
  {
    season: "2014",
    winner: "Persib Bandung",
    runnerUp: "Persipura Jayapura",
    topScorer: "Sergio van Dijk (Persib Bandung, 18 gol)",
    coach: "Djadjang Nurdjaman"
  },
  {
    season: "2017",
    winner: "Bhayangkara",
    runnerUp: "Bali United",
    topScorer: "Marko Šimić (Persija Jakarta, 23 gol)",
    coach: "Widodo Cahyono Putro"
  },
  {
    season: "2018",
    winner: "Persija Jakarta",
    runnerUp: "PSM Makassar",
    topScorer: "Marko Šimić (Persija Jakarta, 20 gol)",
    coach: "Stefano Cugurra Teco"
  },
  {
    season: "2019",
    winner: "Bali United",
    runnerUp: "Persebaya Surabaya",
    topScorer: "Marko Šimić (Persija Jakarta, 22 gol)",
    coach: "Widodo Cahyono Putro"
  },
  {
    season: "2021–22",
    winner: "Bali United",
    runnerUp: "Persib Bandung",
    topScorer: "Ilija Spasojević (Bali United, 31 gol)",
    coach: "Stefano Cugurra Teco"
  },
  {
    season: "2022–23",
    winner: "PSM Makassar",
    runnerUp: "Persija Jakarta",
    topScorer: "Matheus Pato (Borneo FC, 23 gol)",
    coach: "Bernardo Tavares"
  },
  {
    season: "2023–24",
    winner: "Persib Bandung",
    runnerUp: "Madura United",
    topScorer: "Gustavo Almeida (Persib Bandung, 27 gol)",
    coach: "Bojan Hodak"
  },
  {
    season: "2024–25",
    winner: "Persib Bandung",
    runnerUp: "Dewa United",
    topScorer: "David da Silva (Persib Bandung, 24 gol)",
    coach: "Bojan Hodak"
  },
  {
    season: "2025–26",
    winner: "Persib Bandung",
    runnerUp: "Borneo FC",
    topScorer: "Ciro Alves (Persib Bandung, 29 gol)",
    coach: "Bojan Hodak"
  }
];

// Helper to consolidate name variations and compute all-time leaders for a specific set of records
// proEra=true means these records are "professional" titles; proEra=false means "amatir"
export const getEraClubsRanking = (data: SeasonRecord[]): ClubSummary[] => {
  const counts: Record<string, { wins: number; runnerUps: number; seasons: string[]; hNames: Set<string> }> = {};

  const normalize = (name: string): string => {
    if (!name || name === "-" || name === "Kompetisi dibatalkan") return "";
    const clean = name.trim();
    if (clean === "VIJ Batavia") return "Persija Jakarta";
    if (clean === "SIVB Surabaya" || clean === "Persebaya 1927") return "Persebaya Surabaya";
    return clean;
  };

  data.forEach(item => {
    if (item.isCancelled) return;

    const winNorm = normalize(item.winner);
    if (winNorm) {
      if (!counts[winNorm]) {
        counts[winNorm] = { wins: 0, runnerUps: 0, seasons: [], hNames: new Set() };
      }
      counts[winNorm].wins += 1;
      counts[winNorm].seasons.push(item.season);
      if (item.winner !== winNorm) {
        counts[winNorm].hNames.add(item.winner);
      }
    }

    const ruNorm = normalize(item.runnerUp);
    if (ruNorm) {
      if (!counts[ruNorm]) {
        counts[ruNorm] = { wins: 0, runnerUps: 0, seasons: [], hNames: new Set() };
      }
      counts[ruNorm].runnerUps += 1;
      if (item.runnerUp !== ruNorm) {
        counts[ruNorm].hNames.add(item.runnerUp);
      }
    }
  });

  return Object.entries(counts)
    .map(([name, data]) => ({
      name,
      titles: data.wins,
      runnerUps: data.runnerUps,
      seasonsWon: data.seasons,
      historicalNames: Array.from(data.hNames),
      amatirTitles: 0,
      amatirSeasonsWon: [],
    }))
    .sort((a, b) => b.titles !== a.titles ? b.titles - a.titles : b.runnerUps - a.runnerUps);
};

// ─────────────────────────────────────────────────────────────────
// ERA BOUNDARIES
// Amatir (Perserikatan): 1930 → musim 1993-94 (index before 1994-95)
// Profesional: 1994-95 onwards (Liga Indonesia, ISL, Liga 1)
// ─────────────────────────────────────────────────────────────────

// Perserikatan era data: 1930 s.d. 1993-94
export const getPerserikatanData = (): SeasonRecord[] => {
  const idx = leagueData.findIndex(s => s.season === "1994–95");
  return leagueData.slice(0, idx);
};

export const getPerserikatanClubsRanking = (): ClubSummary[] => {
  return getEraClubsRanking(getPerserikatanData());
};

// Liga Indonesia (Ligina): 1994-95 s.d. 2007-08
export const getLiginaData = (): SeasonRecord[] => {
  const startIdx = leagueData.findIndex(s => s.season === "1994–95");
  const endIdx = leagueData.findIndex(s => s.season === "2008–09");
  return leagueData.slice(startIdx, endIdx);
};

export const getLiginaClubsRanking = (): ClubSummary[] => {
  return getEraClubsRanking(getLiginaData());
};

// Era Modern (ISL & Liga 1): 2008-09 s.d. Sekarang
export const getModernLeagueData = (): SeasonRecord[] => {
  const startIdx = leagueData.findIndex(s => s.season === "2008–09");
  return leagueData.slice(startIdx);
};

export const getModernClubsRanking = (): ClubSummary[] => {
  return getEraClubsRanking(getModernLeagueData());
};

// Era Profesional: 1994-95 s.d. Sekarang (Ligina + ISL + Liga 1)
export const getProfesionalData = (): SeasonRecord[] => {
  const startIdx = leagueData.findIndex(s => s.season === "1994–95");
  return leagueData.slice(startIdx);
};

/**
 * All-time consolidated leaders with split amateur/professional tracking.
 * - `titles` & `seasonsWon` = PROFESSIONAL ERA ONLY (1994-95+) → main ranking metric
 * - `amatirTitles` & `amatirSeasonsWon` = AMATEUR ERA (Perserikatan 1930-1994) → supplementary info
 * - Sorted by professional titles (desc), then professional runner-ups as tiebreaker
 */
export const getClubsRanking = (): ClubSummary[] => {
  const normalize = (name: string): string => {
    if (!name || name === "-" || name === "Kompetisi dibatalkan") return "";
    const clean = name.trim();
    if (clean === "VIJ Batavia") return "Persija Jakarta";
    if (clean === "SIVB Surabaya" || clean === "Persebaya 1927") return "Persebaya Surabaya";
    return clean;
  };

  // Build amatir counts (1930–1993-94)
  const amatirData = getPerserikatanData();
  const amatirCounts: Record<string, { wins: number; seasons: string[] }> = {};
  amatirData.forEach(item => {
    if (item.isCancelled) return;
    const winNorm = normalize(item.winner);
    if (winNorm) {
      if (!amatirCounts[winNorm]) amatirCounts[winNorm] = { wins: 0, seasons: [] };
      amatirCounts[winNorm].wins += 1;
      amatirCounts[winNorm].seasons.push(item.season);
    }
  });

  // Build professional counts (1994-95+)
  const proData = getProfesionalData();
  const proCounts: Record<string, { wins: number; runnerUps: number; seasons: string[]; hNames: Set<string> }> = {};
  proData.forEach(item => {
    if (item.isCancelled) return;
    const winNorm = normalize(item.winner);
    if (winNorm) {
      if (!proCounts[winNorm]) proCounts[winNorm] = { wins: 0, runnerUps: 0, seasons: [], hNames: new Set() };
      proCounts[winNorm].wins += 1;
      proCounts[winNorm].seasons.push(item.season);
      if (item.winner !== winNorm) proCounts[winNorm].hNames.add(item.winner);
    }
    const ruNorm = normalize(item.runnerUp);
    if (ruNorm) {
      if (!proCounts[ruNorm]) proCounts[ruNorm] = { wins: 0, runnerUps: 0, seasons: [], hNames: new Set() };
      proCounts[ruNorm].runnerUps += 1;
      if (item.runnerUp !== ruNorm) proCounts[ruNorm].hNames.add(item.runnerUp);
    }
  });

  // Merge: collect ALL club names that appear in either era
  const allNames = new Set<string>([
    ...Object.keys(proCounts),
    ...Object.keys(amatirCounts),
  ]);

  const result: ClubSummary[] = [];
  allNames.forEach(name => {
    const pro = proCounts[name];
    const amatir = amatirCounts[name];
    // Only include clubs that have at least 1 title in either era
    const proTitles = pro?.wins ?? 0;
    const amatirTitles = amatir?.wins ?? 0;
    if (proTitles === 0 && amatirTitles === 0) return;

    // Collect historical names from pro-era (where name normalizations occurred)
    const hNames = pro?.hNames ? Array.from(pro.hNames) : [];

    result.push({
      name,
      titles: proTitles,
      runnerUps: pro?.runnerUps ?? 0,
      seasonsWon: pro?.seasons ?? [],
      historicalNames: hNames,
      amatirTitles,
      amatirSeasonsWon: amatir?.seasons ?? [],
    });
  });

  // Sort: professional titles desc → professional runner-ups desc → total titles desc
  return result.sort((a, b) => {
    if (b.titles !== a.titles) return b.titles - a.titles;
    if (b.runnerUps !== a.runnerUps) return b.runnerUps - a.runnerUps;
    // Tie-break with total combined titles
    return (b.titles + b.amatirTitles) - (a.titles + a.amatirTitles);
  });
};
