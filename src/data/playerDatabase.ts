// Player Database - Top Scorers and Legendary Players
export interface PlayerRecord {
  name: string;
  goals: number;
  season: string;
  club: string;
  nationality?: string;
}

export interface LegendaryPlayer {
  name: string;
  nickname?: string;
  position: string;
  clubs: string[];
  totalGoals?: number;
  seasons: string[];
  achievements: string[];
  nationality: string;
}

// Top Scorers by Season (Historical Data)
export const topScorersHistory: PlayerRecord[] = [
  // Era Profesional Modern (1994-2026)
  { name: "Peri Sandria", goals: 34, season: "1994-95", club: "Bandung Raya", nationality: "Indonesia" },
  { name: "Dejan Gluscevic", goals: 30, season: "1995-96", club: "Bandung Raya", nationality: "Serbia" },
  { name: "Jacksen F. Tiago", goals: 26, season: "1996-97", club: "Persebaya Surabaya", nationality: "Indonesia" },
  { name: "Kurniawan Dwi Yulianto", goals: 20, season: "1997-98", club: "Pelita Jakarta", nationality: "Indonesia" },
  { name: "Alain Mabenda", goals: 11, season: "1998-99", club: "PSDS Deli Serdang", nationality: "Kamerun" },
  { name: "Bambang Pamungkas", goals: 24, season: "1999-2000", club: "Persija Jakarta", nationality: "Indonesia" },
  { name: "Sadissou Bako", goals: 22, season: "2001", club: "Barito Putera", nationality: "Benin" },
  { name: "Ilham Jaya Kesuma", goals: 26, season: "2002", club: "Persita Tangerang", nationality: "Indonesia" },
  { name: "Oscar Aravena", goals: 31, season: "2003", club: "PSM Makassar", nationality: "Chile" },
  { name: "Ilham Jaya Kesuma", goals: 22, season: "2004", club: "Persita Tangerang", nationality: "Indonesia" },
  { name: "Cristian Gonzáles", goals: 25, season: "2005", club: "Persik Kediri", nationality: "Uruguay" },
  { name: "Cristian Gonzáles", goals: 29, season: "2006", club: "Persik Kediri", nationality: "Uruguay" },
  { name: "Cristian Gonzáles", goals: 32, season: "2007-08", club: "Persik Kediri", nationality: "Uruguay" },
  { name: "Cristian Gonzáles", goals: 23, season: "2008-09", club: "Persik Kediri", nationality: "Uruguay" },
  { name: "Cristian Gonzáles", goals: 27, season: "2009-10", club: "Arema Indonesia", nationality: "Uruguay" },
  { name: "Cristian Gonzáles", goals: 19, season: "2010-11", club: "Persipura Jayapura", nationality: "Uruguay" },
  { name: "Budi Sudarsono", goals: 20, season: "2011-12", club: "Persebaya Surabaya", nationality: "Indonesia" },
  { name: "Elie Aiboy", goals: 18, season: "2013 (LPI)", club: "Persebaya 1927", nationality: "Indonesia" },
  { name: "Sergio van Dijk", goals: 23, season: "2013 (ISL)", club: "Persebaya Surabaya", nationality: "Belanda" },
  { name: "Sergio van Dijk", goals: 18, season: "2014", club: "Persib Bandung", nationality: "Belanda" },
  { name: "Marko Šimić", goals: 23, season: "2017", club: "Persija Jakarta", nationality: "Kroasia" },
  { name: "Marko Šimić", goals: 20, season: "2018", club: "Persija Jakarta", nationality: "Kroasia" },
  { name: "Marko Šimić", goals: 22, season: "2019", club: "Persija Jakarta", nationality: "Kroasia" },
  { name: "Ilija Spasojević", goals: 31, season: "2021-22", club: "Bali United", nationality: "Serbia" },
  { name: "Matheus Pato", goals: 23, season: "2022-23", club: "Borneo FC", nationality: "Brasil" },
  { name: "Gustavo Almeida", goals: 27, season: "2023-24", club: "Persib Bandung", nationality: "Brasil" },
  { name: "David da Silva", goals: 24, season: "2024-25", club: "Persib Bandung", nationality: "Brasil" },
  { name: "Ciro Alves", goals: 29, season: "2025-26", club: "Persib Bandung", nationality: "Brasil" }
];

// Legendary Players Database
export const legendaryPlayers: LegendaryPlayer[] = [
  {
    name: "Bambang Pamungkas",
    nickname: "Bepe",
    position: "Striker",
    clubs: ["Persija Jakarta"],
    totalGoals: 200,
    seasons: ["1993-2015"],
    achievements: [
      "Top Scorer Liga Indonesia 1999-2000 (24 gol)",
      "Legenda Persija Jakarta",
      "Pemain Terbaik Indonesia 2006",
      "Rekor penampilan terbanyak Persija"
    ],
    nationality: "Indonesia"
  },
  {
    name: "Cristian Gonzáles",
    nickname: "El Loco",
    position: "Striker",
    clubs: ["Persik Kediri", "Arema Indonesia", "Persipura Jayapura"],
    totalGoals: 180,
    seasons: ["2005-2014"],
    achievements: [
      "Top Scorer 6 musim berturut-turut (2005-2011)",
      "Rekor 32 gol dalam satu musim (2007-08)",
      "Pemain Asing Terbaik ISL",
      "Legenda Persik Kediri"
    ],
    nationality: "Uruguay"
  },
  {
    name: "Kurniawan Dwi Yulianto",
    nickname: "Yuli",
    position: "Striker",
    clubs: ["Persebaya Surabaya", "Pelita Jakarta", "Arema Malang"],
    totalGoals: 150,
    seasons: ["1990-2008"],
    achievements: [
      "Pemain Terbaik Asia Tenggara 1999",
      "Top Scorer berbagai kompetisi",
      "Legenda Timnas Indonesia",
      "Pelatih sukses era modern"
    ],
    nationality: "Indonesia"
  },
  {
    name: "Ilham Jaya Kesuma",
    nickname: "Ilham",
    position: "Striker",
    clubs: ["Persita Tangerang", "Persib Bandung"],
    totalGoals: 120,
    seasons: ["1998-2010"],
    achievements: [
      "Top Scorer Liga Indonesia 2002 (26 gol)",
      "Top Scorer Liga Indonesia 2004 (22 gol)",
      "Pemain Terbaik Indonesia 2002",
      "Legenda Persita Tangerang"
    ],
    nationality: "Indonesia"
  },
  {
    name: "Marko Šimić",
    nickname: "Simic",
    position: "Striker",
    clubs: ["Persija Jakarta"],
    totalGoals: 100,
    seasons: ["2017-2021"],
    achievements: [
      "Top Scorer 3 musim berturut-turut (2017-2019)",
      "Juara Liga 1 2018 bersama Persija",
      "Pemain Asing Terbaik Liga 1",
      "Legenda Persija modern"
    ],
    nationality: "Kroasia"
  },
  {
    name: "Sergio van Dijk",
    nickname: "Sergio",
    position: "Striker",
    clubs: ["Persebaya Surabaya", "Persib Bandung"],
    totalGoals: 90,
    seasons: ["2011-2016"],
    achievements: [
      "Top Scorer ISL 2013 (23 gol)",
      "Top Scorer ISL 2014 (18 gol)",
      "Juara ISL 2014 bersama Persib",
      "Naturalisasi pemain Indonesia"
    ],
    nationality: "Belanda-Indonesia"
  },
  {
    name: "Budi Sudarsono",
    nickname: "Budi",
    position: "Striker",
    clubs: ["Persebaya Surabaya", "Sriwijaya FC", "Persija Jakarta"],
    totalGoals: 110,
    seasons: ["2003-2016"],
    achievements: [
      "Top Scorer ISL 2011-12 (20 gol)",
      "Juara ISL 2007-08 bersama Sriwijaya",
      "Pemain Terbaik Indonesia 2008",
      "Legenda Timnas Indonesia"
    ],
    nationality: "Indonesia"
  },
  {
    name: "Ilija Spasojević",
    nickname: "Ilija",
    position: "Striker",
    clubs: ["Bali United"],
    totalGoals: 80,
    seasons: ["2019-2023"],
    achievements: [
      "Top Scorer Liga 1 2021-22 (31 gol - Rekor Era Modern)",
      "Juara Liga 1 2021-22 bersama Bali United",
      "Pemain Asing Terbaik Liga 1",
      "Rekor gol terbanyak era Liga 1"
    ],
    nationality: "Serbia"
  }
];

// Get top scorers by decade
export const getTopScorersByDecade = (decade: string): PlayerRecord[] => {
  return topScorersHistory.filter(player => {
    const match = player.season.match(/\b(19\d\d|20\d\d)\b/);
    if (match) {
      const year = parseInt(match[0]);
      const playerDecade = Math.floor(year / 10) * 10;
      return playerDecade === parseInt(decade);
    }
    return false;
  });
};

// Get top scorers by club
export const getTopScorersByClub = (clubName: string): PlayerRecord[] => {
  return topScorersHistory.filter(player => player.club === clubName);
};

// Get all-time top scorers (sorted by goals)
export const getAllTimeTopScorers = (): PlayerRecord[] => {
  return [...topScorersHistory].sort((a, b) => b.goals - a.goals);
};

// Get legendary players by position
export const getLegendaryPlayersByPosition = (position: string): LegendaryPlayer[] => {
  return legendaryPlayers.filter(player => player.position === position);
};

// Get legendary players by club
export const getLegendaryPlayersByClub = (clubName: string): LegendaryPlayer[] => {
  return legendaryPlayers.filter(player => player.clubs.includes(clubName));
};
