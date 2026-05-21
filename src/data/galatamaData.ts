import { SeasonRecord, ClubSummary } from '../types';

export const galatamaData: SeasonRecord[] = [
  {
    season: "1979–80",
    winner: "Warna Agung",
    runnerUp: "Jayakarta",
    topScorer: "Hadi Ismanto (Indonesia Muda, 22 gol)",
    coach: "Endang Witarsa"
  },
  {
    season: "1980–82",
    winner: "NIAC Mitra",
    runnerUp: "Jayakarta",
    topScorer: "Syamsul Arifin (NIAC Mitra, 30 gol)",
    coach: "M. Basri"
  },
  {
    season: "1982–83",
    winner: "NIAC Mitra",
    runnerUp: "UMS 80",
    topScorer: "Dede Sulaeman (Indonesia Muda, 17 gol)",
    coach: "M. Basri"
  },
  {
    season: "1983–84",
    winner: "Yanita Utama",
    runnerUp: "Mercu Buana",
    topScorer: "Bambang Nurdiansyah (Mercu Buana, 16 gol)",
    coach: "Jacob Sihasale"
  },
  {
    season: "1984",
    winner: "Yanita Utama",
    runnerUp: "UMS 80",
    topScorer: "Bambang Nurdiansyah (Yanita Utama, 13 gol)",
    coach: "Jacob Sihasale"
  },
  {
    season: "1985",
    winner: "Kramayudha Tiga Berlian",
    runnerUp: "Arseto",
    topScorer: "Bambang Nurdiansyah (Kramayudha Tiga Berlian, 9 gol)",
    coach: "Abdul Kadir"
  },
  {
    season: "1986–87",
    winner: "Kramayudha Tiga Berlian",
    runnerUp: "Pelita Jaya",
    topScorer: "Ricky Yacob (Arseto Solo, 9 gol)",
    coach: "Abdul Kadir"
  },
  {
    season: "1987–88",
    winner: "NIAC Mitra",
    runnerUp: "Pelita Jaya",
    topScorer: "Nasrul Koto (Arseto Solo, 16 gol)",
    coach: "M. Basri"
  },
  {
    season: "1988–89",
    winner: "Pelita Jaya",
    runnerUp: "NIAC Mitra",
    topScorer: "Mecky Tata (Arema, 18 gol) & Dadang Kurnia (Bandung Raya, 18 gol)",
    coach: "Benny Dollo"
  },
  {
    season: "1990",
    winner: "Pelita Jaya",
    runnerUp: "Kramayudha Tiga Berlian",
    topScorer: "Bambang Nurdiansyah (Pelita Jaya, 15 gol)",
    coach: "Benny Dollo"
  },
  {
    season: "1990–92",
    winner: "Arseto",
    runnerUp: "Pupuk Kaltim",
    topScorer: "Singgih Pitono (Arema Malang, 21 gol)",
    coach: "Dananjaya"
  },
  {
    season: "1992–93",
    winner: "Arema Malang",
    runnerUp: "Pupuk Kaltim",
    topScorer: "Singgih Pitono (Arema Malang, 16 gol)",
    coach: "Gusnul Yakin"
  },
  {
    season: "1993–94",
    winner: "Pelita Jaya",
    runnerUp: "Gelora Dewata",
    topScorer: "Ansyari Lubis (Pelita Jaya, 19 gol)",
    coach: "Selimir Milošević"
  }
];

export const getGalatamaClubsRanking = (): ClubSummary[] => {
  const counts: Record<string, { wins: number; runnerUps: number; seasons: string[]; hNames: Set<string> }> = {};

  const normalize = (name: string): string => {
    if (!name || name === "-") return "";
    const clean = name.trim();
    if (clean === "Niac Mitra") return "NIAC Mitra";
    if (clean === "Arema Malang") return "Arema Indonesia";
    if (clean === "Pupuk Kaltim") return "Bontang FC";
    if (clean === "Gelora Dewata") return "Deltras Sidoarjo";
    return clean;
  };

  galatamaData.forEach(item => {
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
      historicalNames: Array.from(data.hNames)
    }))
    .sort((a, b) => b.titles !== a.titles ? b.titles - a.titles : b.runnerUps - a.runnerUps);
};
