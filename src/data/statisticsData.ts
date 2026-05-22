export interface TopScorer {
  name: string;
  club: string;
  goals: number;
  season: string;
}

export interface RecordItem {
  title: string;
  value: string;
  holder: string;
  description: string;
}

export interface TriviaItem {
  fact: string;
}

export const topScorers: TopScorer[] = [
  { name: "Sylvano Comvalius", club: "Bali United", goals: 37, season: "2017" },
  { name: "Cristian Gonzáles", club: "Persik Kediri", goals: 32, season: "2007–08" },
  { name: "David da Silva", club: "Persib Bandung", goals: 30, season: "2023–24" },
  { name: "Matheus Pato", club: "Borneo FC", goals: 25, season: "2022–23" },
  { name: "Boaz Solossa", club: "Persipura Jayapura", goals: 28, season: "2008–09" },
  { name: "Dejan Gluscevic", club: "Mastrans Bandung Raya", goals: 30, season: "1995–96" },
  { name: "Kurniawan Dwi Yulianto", club: "Pelita Bakrie", goals: 30, season: "1997–98 (Tidak Selesai)" },
  { name: "Ilija Spasojević", club: "Bali United", goals: 23, season: "2021–22" },
  { name: "Marko Šimić", club: "Persija Jakarta", goals: 28, season: "2019" },
  { name: "Aleksandar Rakić", club: "PS TIRA", goals: 21, season: "2018" },
];

export const leagueRecords: RecordItem[] = [
  {
    title: "Gelar Terbanyak (Era Profesional)",
    value: "4 Gelar",
    holder: "Persipura Jayapura",
    description: "Persipura memenangkan Liga Indonesia pada musim 2005, 2008–09, 2010–11, dan 2013."
  },
  {
    title: "Gelar Terbanyak (Total Keseluruhan)",
    value: "11 Gelar",
    holder: "Persija Jakarta",
    description: "Persija mengoleksi 9 gelar era Perserikatan dan 2 gelar era Liga Indonesia/Liga 1."
  },
  {
    title: "Gol Terbanyak Satu Musim",
    value: "37 Gol",
    holder: "Sylvano Comvalius (Bali United)",
    description: "Dicetak pada Liga 1 musim 2017, memecahkan rekor 34 gol milik Peri Sandria yang bertahan 22 tahun."
  },
  {
    title: "Poin Tertinggi Satu Musim",
    value: "75 Poin",
    holder: "Bali United",
    description: "Dicetak pada musim 2021–22 saat menjadi juara Liga 1."
  },
  {
    title: "Juara Beruntun (Back-to-Back)",
    value: "2 Musim",
    holder: "Bali United",
    description: "Menjadi tim pertama di era Liga 1 yang back-to-back juara (2019 dan 2021–22, musim 2020 batal)."
  },
  {
    title: "Tak Terkalahkan Terlama",
    value: "22 Pertandingan",
    holder: "Arema FC",
    description: "Rekor tak terkalahkan diukir Arema FC pada gelaran Liga 1 2021-2022."
  }
];

export const leagueTrivia: TriviaItem[] = [
  { fact: "Niac Mitra adalah klub pertama yang berhasil menjadi juara beruntun di kompetisi Galatama (1982-1983)." },
  { fact: "Persib Bandung memenangkan edisi perdana Liga Indonesia (Liga Dunhill) pada musim 1994-1995 dengan mengalahkan Petrokimia Putra." },
  { fact: "Hanya ada dua klub dari luar pulau Jawa dan Sumatera yang pernah juara Liga Indonesia: Persipura Jayapura (Papua) dan Bali United (Bali)." },
  { fact: "Musim 1997-1998 dihentikan di tengah jalan karena krisis moneter dan kerusuhan politik di Indonesia." },
  { fact: "PSIS Semarang (1998-1999) dan Persik Kediri (2003) adalah tim yang berstatus sebagai tim promosi namun langsung berhasil menjadi juara kasta tertinggi." },
  { fact: "Cristian Gonzáles adalah satu-satunya pemain yang pernah menjadi Top Skor Liga Indonesia sebanyak 4 kali beruntun (2005 hingga 2008-09)." }
];
