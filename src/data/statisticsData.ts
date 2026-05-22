export interface TopScorer {
  name: string;
  club: string;
  goals: number | string;
  season: string;
  nationality?: string;
  position?: string;
  description?: string;
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

// Data Mentah: Top Skor Per Musim (Bisa ditambahkan lebih lanjut oleh user)
export const topScorers: TopScorer[] = [
  { name: "Sylvano Comvalius", club: "Bali United", goals: 37, season: "2017" },
  { name: "Peri Sandria", club: "Bandung Raya", goals: 34, season: "1994–95" },
  { name: "Cristian Gonzáles", club: "Persik Kediri", goals: 32, season: "2007–08" },
  { name: "Oscar Aravena", club: "PSM Makassar", goals: 31, season: "2003" },
  { name: "David da Silva", club: "Persib Bandung", goals: 30, season: "2023–24" },
  { name: "Dejan Gluscevic", club: "Mastrans Bandung Raya", goals: 30, season: "1995–96" },
  { name: "Cristian Gonzáles", club: "Persik Kediri", goals: 30, season: "2006" },
  { name: "Boaz Solossa", club: "Persipura Jayapura", goals: 28, season: "2008–09" },
  { name: "Marko Šimić", club: "Persija Jakarta", goals: 28, season: "2019" },
  { name: "Ilham Jayakesuma", club: "Persita Tangerang", goals: 26, season: "2002" },
  { name: "Jacksen F. Tiago", club: "Persebaya Surabaya", goals: 26, season: "1996–97" },
  { name: "Matheus Pato", club: "Borneo FC", goals: 25, season: "2022–23" },
  { name: "Emmanuel Kenmogne", club: "Persebaya Surabaya", goals: 25, season: "2014" },
  { name: "Bambang Pamungkas", club: "Persija Jakarta", goals: 24, season: "1999–00" },
  { name: "Ilija Spasojević", club: "Bali United", goals: 23, season: "2021–22" },
  { name: "Alberto Gonçalves", club: "Persipura Jayapura", goals: 25, season: "2011–12" },
];

// Data Mentah: Top Skor Sepanjang Masa (Kumulatif Karier) - Section Baru
export const allTimeTopScorers: TopScorer[] = [
  { name: "Cristian Gonzáles", club: "Berbagai Klub (Persik, Persib, Arema)", goals: "±249", season: "Sepanjang Karier" },
  { name: "Budi Sudarsono", club: "Berbagai Klub", goals: "±185", season: "Sepanjang Karier" },
  { name: "Boaz Solossa", club: "Persipura dkk", goals: "±176", season: "Sepanjang Karier" },
  { name: "Bambang Pamungkas", club: "Persija Jakarta", goals: "±178", season: "Sepanjang Karier" },
  { name: "Alberto 'Beto' Gonçalves", club: "Berbagai Klub", goals: "±176", season: "Sepanjang Karier" },
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
    description: "Menjadi tim pertama di era Liga 1 yang back-to-back juara (2019 dan 2021–22, musim 2020 batal akibat pandemi)."
  },
  {
    title: "Tak Terkalahkan Terlama (Unbeaten)",
    value: "23 Pertandingan",
    holder: "Arema FC",
    description: "Rekor tak terkalahkan diukir Arema FC pada gelaran Liga 1 2021-2022 sebelum akhirnya diputus."
  },
  {
    title: "Kemenangan Terbesar",
    value: "9-1",
    holder: "Persela Lamongan",
    description: "Kemenangan terbesar dicetak oleh Persela Lamongan saat membantai PSPS Pekanbaru dengan skor 9-1 pada ISL 2013."
  },
  {
    title: "Top Skor Terbanyak Beruntun",
    value: "4 Kali Beruntun",
    holder: "Cristian Gonzáles",
    description: "Menjadi top skor pada musim 2005, 2006, 2007-08 (bersama Persik) dan 2008-09 (bersama Persik & Persib)."
  }
];

export const leagueTrivia: TriviaItem[] = [
  { fact: "Era Liga Indonesia modern lahir pada tahun 1994 dengan nama Liga Dunhill, sebagai hasil peleburan kompetisi amatir (Perserikatan) dan semi-profesional (Galatama)." },
  { fact: "Niac Mitra adalah klub pertama yang berhasil menjadi juara beruntun di kompetisi kasta tertinggi yakni pada Galatama (1982-1983)." },
  { fact: "Persib Bandung memenangkan edisi perdana penggabungan liga (Liga Indonesia 1994-1995) dengan mengalahkan Petrokimia Putra di final." },
  { fact: "Hanya ada dua klub dari luar pulau Jawa dan Sumatera yang pernah juara di Era Profesional: Persipura Jayapura (Papua) dan Bali United (Bali)." },
  { fact: "Musim 1997-1998 dihentikan di tengah jalan karena krisis moneter dan kerusuhan politik di Indonesia, disusul pembatalan liga pada musim 2015 (sanksi FIFA) dan 2020 (Pandemi COVID-19)." },
  { fact: "PSIS Semarang (1998-1999) dan Persik Kediri (2003) adalah sejarah anomali di mana tim berstatus 'Promosi' langsung berhasil menjadi Juara Nasional pada musim debut mereka di kasta tertinggi." },
  { fact: "Boaz Solossa adalah satu-satunya pemain lokal yang memenangkan gelar Pemain Terbaik Liga terbanyak, yakni tiga kali (2008-09, 2010-11, 2013) bersama Persipura." }
];
