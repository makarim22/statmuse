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
  { fact: "✨ TAHUKAH ANDA? Era Liga Indonesia modern lahir pada tahun 1994 dengan nama Liga Dunhill, hasil peleburan kompetisi amatir (Perserikatan) dan semi-profesional (Galatama). ✨" },
  { fact: "🏆 REKOR: Niac Mitra adalah klub pertama yang berhasil menjadi juara beruntun di kompetisi kasta tertinggi (Galatama 1982-1983). 🏆" },
  { fact: "👑 SEJARAH: Persib Bandung memenangkan edisi perdana penggabungan liga (Liga Indonesia 1994-1995) dengan mengalahkan Petrokimia Putra di final! 👑" },
  { fact: "🏝️ FAKTA UNIK: Hanya ada dua klub dari luar pulau Jawa dan Sumatera yang pernah juara di Era Profesional: Persipura Jayapura (Papua) dan Bali United (Bali). 🏝️" },
  { fact: "🛑 TRAGEDI LIGA: Musim 1997-1998 dihentikan karena krisis moneter, disusul pembatalan liga pada musim 2015 (sanksi FIFA) dan 2020 (Pandemi COVID-19). 🛑" },
  { fact: "🚀 ANOMALI PROMOSI: PSIS Semarang (1998-1999) dan Persik Kediri (2003) berhasil menjadi Juara Nasional langsung pada musim debut promosi mereka di kasta tertinggi! 🚀" },
  { fact: "⭐ LEGENDA: Boaz Solossa adalah satu-satunya pemain yang memenangkan gelar Pemain Terbaik Liga sebanyak 3 kali (2008-09, 2010-11, 2013). ⭐" },
  { fact: "🔥 GOAL MACHINE: Sylvano Comvalius mencetak 37 Gol dalam satu musim (2017), memecahkan rekor abadi Peri Sandria (34 Gol) yang bertahan sejak 1995! 🔥" }
];

export interface LegendaryPlayer {
  id: string;
  name: string;
  club: string;
  position: string;
  activeYears: string;
  achievements: string;
  biography: string;
}

export const legendaryPlayers: LegendaryPlayer[] = [
  {
    id: "boaz",
    name: "Boaz Solossa",
    club: "Persipura Jayapura",
    position: "Penyerang",
    activeYears: "2004 - Sekarang",
    achievements: "4x Juara Liga, 3x Pemain Terbaik, 3x Top Skor",
    biography: "Ikon sepakbola Papua dan legenda terbesar Persipura. Memiliki kaki kiri mematikan dan insting mencetak gol yang luar biasa. Ia adalah satu-satunya pemain yang meraih gelar Pemain Terbaik terbanyak di era Liga Indonesia."
  },
  {
    id: "bambang",
    name: "Bambang Pamungkas",
    club: "Persija Jakarta",
    position: "Penyerang",
    activeYears: "1999 - 2019",
    achievements: "2x Juara Liga, 1x Top Skor, 1x Pemain Terbaik",
    biography: "Striker legendaris Persija dan Timnas Indonesia yang terkenal dengan sundulan mematikannya meski posturnya tidak terlalu tinggi. 'Bepe' adalah salah satu pemain paling ikonik di sejarah sepakbola nasional."
  },
  {
    id: "gonzales",
    name: "Cristian Gonzáles",
    club: "Persik / Arema / Persib",
    position: "Penyerang",
    activeYears: "2003 - 2023",
    achievements: "1x Juara Liga, 4x Top Skor Beruntun",
    biography: "Striker naturalisasi berjuluk 'El Loco' yang mendominasi kotak penalti. Pemegang rekor top skor terbanyak beruntun dan salah satu pencetak gol terbanyak sepanjang sejarah liga."
  },
  {
    id: "kurniawan",
    name: "Kurniawan Dwi Yulianto",
    club: "PSM / Persebaya / Persija",
    position: "Penyerang",
    activeYears: "1994 - 2013",
    achievements: "2x Juara Liga, 1x Top Skor",
    biography: "Si Kurus dengan kelincahan dan ketajaman tingkat tinggi. Memiliki pengalaman bermain di Eropa (Sampdoria, FC Luzern) dan selalu menjadi ancaman mematikan bagi bek lawan."
  },
  {
    id: "jacksen",
    name: "Jacksen F. Tiago",
    club: "Persebaya Surabaya",
    position: "Penyerang",
    activeYears: "1994 - 2001",
    achievements: "1x Juara Liga (Sebagai Pemain), 1x Top Skor",
    biography: "Striker asing asal Brasil yang sangat sukses baik sebagai pemain maupun pelatih. Menjadi top skor saat membawa Persebaya juara Liga Indonesia 1996-1997."
  },
  {
    id: "firman",
    name: "Firman Utina",
    club: "Persija / Sriwijaya / Persib",
    position: "Gelandang",
    activeYears: "1999 - 2018",
    achievements: "3x Juara Liga, 1x Pemain Terbaik Final Copa",
    biography: "Jenderal lapangan tengah dengan visi bermain dan umpan terobosan akurat. Sukses meraih gelar juara bersama berbagai klub raksasa Indonesia."
  },
  {
    id: "ponaryo",
    name: "Ponaryo Astaman",
    club: "PSM / Arema / Sriwijaya",
    position: "Gelandang",
    activeYears: "2000 - 2018",
    achievements: "1x Juara Liga, 1x Pemain Terbaik Liga",
    biography: "Gelandang bertahan cerdas dengan kepemimpinan luar biasa. Menjadi nyawa lini tengah dan meraih penghargaan Pemain Terbaik pada tahun 2004."
  },
  {
    id: "ferry",
    name: "Ferry Rotinsulu",
    club: "Sriwijaya FC",
    position: "Kiper",
    activeYears: "2001 - 2014",
    achievements: "1x Juara Liga, 3x Juara Copa Indonesia",
    biography: "Kiper legendaris Laskar Wong Kito. Sangat piawai dalam mengantisipasi penalti dan menjadi kunci kesuksesan Sriwijaya FC mendominasi sepakbola nasional di pertengahan 2000-an."
  },
  {
    id: "bustomi",
    name: "Ahmad Bustomi",
    club: "Arema Indonesia",
    position: "Gelandang",
    activeYears: "2004 - Sekarang",
    achievements: "1x Juara Liga",
    biography: "Gelandang metronom dengan gaya bermain tenang dan distribusi bola elegan. Menjadi dirigen lini tengah Arema saat menjuarai ISL 2009-2010."
  },
  {
    id: "beto",
    name: "Beto Gonçalves",
    club: "Persipura / Sriwijaya / Madura",
    position: "Penyerang",
    activeYears: "2008 - Sekarang",
    achievements: "1x Juara Liga, 1x Top Skor",
    biography: "Striker haus gol yang selalu konsisten mencetak puluhan gol setiap musimnya, meski usianya terus bertambah. Kini berstatus pemain naturalisasi."
  },
  {
    id: "simic",
    name: "Marko Šimić",
    club: "Persija Jakarta",
    position: "Penyerang",
    activeYears: "2018 - Sekarang",
    achievements: "1x Juara Liga, 1x Top Skor",
    biography: "Super Simic menjadi pujaan The Jakmania. Striker kuat dengan tembakan mematikan yang menjadi aktor utama Persija meraih gelar juara Liga 1 2018."
  },
  {
    id: "ortizan",
    name: "Ortizan Solossa",
    club: "Persipura / Persija / Arema",
    position: "Bek Sayap",
    activeYears: "1999 - 2014",
    achievements: "4x Juara Liga",
    biography: "Kakak dari Boaz Solossa. Bek sayap kiri modern pertama di Indonesia yang rajin melakukan overlap, memiliki crossing akurat, dan sangat sukses mengumpulkan trofi juara."
  },
  {
    id: "roby",
    name: "M. Roby",
    club: "Persija / Persisam",
    position: "Bek Tengah",
    activeYears: "2006 - Sekarang",
    achievements: "Bek tangguh langganan Timnas",
    biography: "Bek tengah lokal yang sangat tangguh dalam duel udara maupun tekel. Lama menjadi andalan Persisam Putra Samarinda dan Timnas."
  },
  {
    id: "kurnia",
    name: "Kurnia Meiga",
    club: "Arema FC",
    position: "Kiper",
    activeYears: "2008 - 2017",
    achievements: "1x Juara Liga, 1x Pemain Terbaik Liga",
    biography: "Kiper dengan postur raksasa dan refleks fenomenal. Satu-satunya kiper dalam sejarah Liga Indonesia yang pernah memenangkan gelar Pemain Terbaik (ISL 2009-2010)."
  },
  {
    id: "maman",
    name: "Maman Abdurrahman",
    club: "PSIS / Persib / Persija",
    position: "Bek Tengah",
    activeYears: "2001 - Sekarang",
    achievements: "1x Juara Liga, 1x Pemain Terbaik Liga",
    biography: "Bek elegan yang sangat tenang dalam mengawal pertahanan. Mengantarkan PSIS Semarang meraih runner-up dan terpilih sebagai pemain terbaik musim 2006."
  },
  {
    id: "evans",
    name: "Arthur Cunha / Renan Silva",
    club: "Borneo / Persija / Bhayangkara",
    position: "Gelandang / Bek",
    activeYears: "2018 - Sekarang",
    achievements: "1x Juara Liga, 1x Pemain Terbaik",
    biography: "Pemain asing yang memberi dampak instan. Renan Silva meraih gelar Pemain Terbaik 2019 karena magis kaki kirinya bersama Borneo FC."
  },
  {
    id: "spaso",
    name: "Ilija Spasojević",
    club: "Bhayangkara / Bali United",
    position: "Penyerang",
    activeYears: "2011 - Sekarang",
    achievements: "3x Juara Liga, 1x Top Skor",
    biography: "Target man klasik yang sangat sukses mengantarkan dua tim berbeda juara Liga 1 (Bhayangkara FC dan Bali United) dalam beberapa tahun beruntun."
  },
  {
    id: "bima",
    name: "Bima Sakti",
    club: "Pelita Jaya / PSM / Persema",
    position: "Gelandang",
    activeYears: "1994 - 2016",
    achievements: "1x Juara Liga, 1x Pemain Terbaik",
    biography: "Legenda dengan tendangan roket ikonik. Meraih gelar Pemain Terbaik saat membawa PSM Makassar menjuarai Liga Indonesia 1999-2000."
  },
  {
    id: "hendro",
    name: "Hendro Kartiko",
    club: "PSM / Persebaya / Persija",
    position: "Kiper",
    activeYears: "1994 - 2012",
    achievements: "2x Juara Liga",
    biography: "Dijuluki Fabien Barthez-nya Indonesia. Kiper berkepala plontos ini meraih kesuksesan besar bersama PSM dan Persebaya, serta selalu menjadi pilihan utama Timnas."
  },
  {
    id: "gumbs",
    name: "Keith Kayamba Gumbs",
    club: "Sriwijaya / Arema",
    position: "Penyerang",
    activeYears: "2007 - 2013",
    achievements: "1x Juara Liga, 3x Copa, 1x Pemain Terbaik",
    biography: "Pemain legendaris Sriwijaya FC yang sangat atletis dan cepat meski usianya sudah veteran. Pemain terbaik ISL 2011-2012."
  }
];
