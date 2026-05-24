export interface ClubMetadata {
  name: string;
  founded: number;
  nickname: string;
  city: string;
  description: string;
  colors: {
    primary: string;       // Hex color for background
    secondary: string;     // Hex color for accents/secondary
    border: string;        // Hex color for brutalist border
    text: string;          // Hex color for text inside badge
  };
  emblemSymbol: 'tiger' | 'crocodile' | 'mountain' | 'flame' | 'pearl' | 'ship' | 'leaf' | 'barong' | 'lion' | 'trident' | 'lightning' | 'wings' | 'claws' | 'horn' | 'monument' | 'sword' | 'star' | 'roof' | 'wave' | 'shield' | 'persib';
  logoUrl?: string; // Optional URL or overriding path for official club logo
}

export const clubMetadataList: Record<string, ClubMetadata> = {
  "Persija Jakarta": {
    name: "Persija Jakarta",
    founded: 1928,
    nickname: "Macan Kemayoran",
    city: "DKI Jakarta",
    description: "Klub kebanggaan Ibu Kota yang didirikan pada 28 November 1928 sebagai VIJ (Voetbalbond Indonesische Jacatra). Penguasa era amatir Perserikatan dengan 9 gelar bergengsi, ditambah 2 gelar di era profesional (Liga Indonesia 2001 & Liga 1 2018), menjadikan total 11 trofi nasional. Simbol kebanggaan Jakarta yang tak lekang oleh waktu.",
    colors: {
      primary: "#FF4500",
      secondary: "#E53935",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persija-jakarta"
  },
  "Persebaya Surabaya": {
    name: "Persebaya Surabaya",
    founded: 1927,
    nickname: "Bajul Ijo / Green Force",
    city: "Surabaya, Jawa Timur",
    description: "Didirikan pada 18 Juni 1927 sebagai SIVB (Soerabaiasche Indonesische Voetbal Bond), Persebaya adalah salah satu pendiri PSSI yang melegenda dengan mentalitas bermain ngotot, tangguh, dan bertumpu pada kolektivitas. Karakteristik arek-arek Suroboyo tercermin dalam dukungan fanatik Bonek Mania.",
    colors: {
      primary: "#006400",
      secondary: "#FFD700",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persebaya-surabaya"
  },
  "Persib Bandung": {
    name: "Persib Bandung",
    founded: 1933,
    nickname: "Maung Bandung / Pangeran Biru",
    city: "Bandung, Jawa Barat",
    description: "Dibentuk pada 14 Maret 1933, Persib adalah maskot sepak bola tanah Pasundan yang didukung oleh jutaan Bobotoh secara setia dan meluas. Meraih 5 gelar Perserikatan (era amatir) dan 5 gelar era profesional: juara Liga Indonesia perdana (1994/95), ISL 2014, serta dominasi Liga 1 dengan trofi 2023/24, 2024/25, dan 2025/26, menjadikan Persib sebagai raja era profesional modern.",
    colors: {
      primary: "#0B3C9B",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persib"
  },
  "Persis Solo": {
    name: "Persis Solo",
    founded: 1923,
    nickname: "Laskar Sambernyawa",
    city: "Surakarta, Jawa Tengah",
    description: "Sebagai salah satu klub sepak bola tertua dan pemrakarsa pembentukan PSSI pada 1930, Persis didirikan dengan nama Vorstenlandsche Voetbal Bond (VVB) pada 8 November 1923. Kuat secara historis di Surakarta, klub legendaris ini merebut 7 mahkota juara nasional sepanjang era 1930 hingga 1940-an.",
    colors: {
      primary: "#DC143C",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persis-solo"
  },
  "Persipura Jayapura": {
    name: "Persipura Jayapura",
    founded: 1963,
    nickname: "Mutiara Hitam",
    city: "Jayapura, Papua",
    description: "Klub tersukses era profesional modern modern (ISL) yang melambangkan kebanggaan segenap masyarakat Papua. Pertama berdiri resmi 1 Mei 1963, Persipura termasyhur dengan kejelian menelurkan seniman-seniman bola bergaya samba Indonesia berkat asahan permainan bola mengalir yang cepat, indah, dan presisi tajam.",
    colors: {
      primary: "#000000",
      secondary: "#E53935",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "pearl"
  },
  "PSM Makassar": {
    name: "PSM Makassar",
    founded: 1915,
    nickname: "Juku Eja / Pasukan Ramang",
    city: "Makassar, Sulawesi Selatan",
    description: "Berdiri resmi pada 2 November 1915 dengan identitas awal Macassarsche Voetbalbond (MVB), PSM didaulat sebagai klub sepak bola tertua yang masih eksis aktif di kancah Asia Tenggara. PSM mencerminkan karakter permainan keras yang jujur, militan, dan sarat kehormatan khas pesisir Sulawesi.",
    colors: {
      primary: "#800000",
      secondary: "#D4AF37",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "psm-makassar"
  },
  "PSMS Medan": {
    name: "PSMS Medan",
    founded: 1950,
    nickname: "Ayam Kinantan",
    city: "Medan, Sumatera Utara",
    description: "Didirikan pada 21 April 1950, PSMS identik dengan gaya permainan militan berjuluk 'Rap-Rap'—gaya merebut bola yang tangguh, keras namun bersih, diselingi kecepatan tinggi. Era keemasan PSMS tercatat tajam di masa Perserikatan saat menggondol lima piala nasional bergengsi.",
    colors: {
      primary: "#008000",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "leaf"
  },
  "Bali United": {
    name: "Bali United",
    founded: 1989,
    nickname: "Serdadu Tridatu",
    city: "Gianyar, Bali",
    description: "Berasal dari cikal bakal klub Putra Samarinda (1989) yang kemudian dibeli dan berpindah markas ke pulau Dewata pada tahun 2015. Dengan pembenahan infrastruktur modern, stadion mandiri, dan skema bisnis yang maju, mereka langsung menjelma menjadi raksasa baru dan menjuarai dua edisi kasta tertinggi secara berturut-turut.",
    colors: {
      primary: "#B22222",
      secondary: "#212121",
      border: "#D4AF37",
      text: "#FFFFFF"
    },
    emblemSymbol: "bali-united"
  },
  "Arema Indonesia": {
    name: "Arema Indonesia",
    founded: 1987,
    nickname: "Singo Edan",
    city: "Malang, Jawa Timur",
    description: "Dilahirkan pada 11 Agustus 1987 (dikenal juga lewat Arema FC), Arema merupakan jiwa pemersatu Arek Malang yang mendobrak hegemoni sepak bola nasional. Melalui gaya agresif enerjik didukung fanatisme membara gerombolan Aremania, ia meraih juara Galatama 1992/93, ISL 2009/10, dan aneka gelar bergengsi tanah air.",
    colors: {
      primary: "#1E3A8A",
      secondary: "#EA580C",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "arema"
  },
  "PSIS Semarang": {
    name: "PSIS Semarang",
    founded: 1932,
    nickname: "Laskar Mahesa Jenar",
    city: "Semarang, Jawa Tengah",
    description: "Berdiri semenjak 18 Mei 1932 sebagai Voetbalbond Indonesische Semarang (Voebis), PSIS adalah kebanggaan warga Semarang. Prestasi fenomenal mereka terukir kala memenangkan kejuaraan Liga Indonesia V di tahun 1999 dengan gol pamungkas dramatis Tugiyo di Stadion Klabat Monado.",
    colors: {
      primary: "#111827",
      secondary: "#3B82F6",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "trident"
  },
  "Bandung Raya": {
    name: "Bandung Raya",
    founded: 1987,
    nickname: "Mastrans Bandung Raya",
    city: "Bandung, Jawa Barat",
    description: "Klub Galatama ikonik asal Bandung yang mencatatkan kejutan spektakular saat merengkuh mahkota juara pada musim penggabungan kedua Liga Indonesia (1995/96). Dengan materi pemain bertalenta murni asuhan alm. Henk Wullems, mereka mematahkan rekor dominasi tim perserikatan tradisional.",
    colors: {
      primary: "#EAB308",
      secondary: "#06B6D4",
      border: "#1A1A1A",
      text: "#1A1A1A"
    },
    emblemSymbol: "lightning"
  },
  "Sriwijaya": {
    name: "Sriwijaya",
    founded: 2004,
    nickname: "Laskar Wong Kito",
    city: "Palembang, Sumatera Selatan",
    description: "Didirikan kembali pada 2004 melalui akuisisi lisensi Persijatim Jakarta dan dipindah ke kota Pempek Palembang. Berbekal finansial megah dan manajemen taktis mumpuni besutan Rahmad Darmawan dan Kas Hartadi yang menghasilkan gelar ganda bersejarah, Sriwijaya sukses mendominasi era perkenalan Liga Super Indonesia.",
    colors: {
      primary: "#EAB308",
      secondary: "#7F1D1D",
      border: "#1A1A1A",
      text: "#1A1A1A"
    },
    emblemSymbol: "wings"
  },
  "Persik Kediri": {
    name: "Persik Kediri",
    founded: 1950,
    nickname: "Macan Putih",
    city: "Kediri, Jawa Timur",
    description: "Dikenal luas di seluruh nusantara berkat pencapaian legendaris 'Double Champion' di mana klub promosi kasta terbawah ini seketika menyabet gelar Juara Liga Indonesia teratas pada edisi 2003 dan 2006. Memasang simbol kejayaan Prabu Jayabaya asal kediri dengan tumpuan taktik cepat nan mematikan.",
    colors: {
      primary: "#5B21B6",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persik-kediri"
  },
  "Petrokimia Putra": {
    name: "Petrokimia Putra",
    founded: 1988,
    nickname: "Kebo Giras",
    city: "Gresik, Jawa Timur",
    description: "Klub sepak bola semi-profesional yang didanai korporasi pupuk di Gresik, dibentuk resmi 20 Mei 1988. Puncak kejayaannya dialami kala sukses mengalahkan Persita Tangerang secara menegangkan pada babak final musim Liga Indonesia VIII (2002) di Senayan, Jakarta.",
    colors: {
      primary: "#84CC16",
      secondary: "#F59E0B",
      border: "#1A1A1A",
      text: "#1A1A1A"
    },
    emblemSymbol: "horn"
  },
  "PSIM Yogyakarta": {
    name: "PSIM Yogyakarta",
    founded: 1929,
    nickname: "Laskar Mataram",
    city: "DI Yogyakarta",
    description: "Sebagai salah satu dari tujuh pilar perintis berdirinya PSSI, PSIM dibentuk pertama kali tanggal 5 September 1929 sebagai PSIB (Perserikatan Sepak Raga Mataram). Klub sarat warisan sejarah ini menjuarai kompetisi teratas PSSI pada edisi 1932 dengan rivalitas kental membara bersama tetangga silsilah Mataram lainnya.",
    colors: {
      primary: "#1D4ED8",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "psim-yogyakarta"
  },
  "Persiraja Banda Aceh": {
    name: "Persiraja Banda Aceh",
    founded: 1957,
    nickname: "Laskar Rencong",
    city: "Banda Aceh, Aceh",
    description: "Klub kebanggaan Serambi Mekkah yang dibentuk pada 28 Juli 1957. Menuliskan tinta emas legendaris saat mematahkan dominasi klub raksasa Jawa dengan memenangkan kompetisi kasta teratas Perserikatan pada tahun 1980 melalui penampilan disiplin tangguh serta formasi serangan balik berkecepatan tinggi.",
    colors: {
      primary: "#F97316",
      secondary: "#1E3A8A",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "sword"
  },
  "Bhayangkara": {
    name: "Bhayangkara",
    founded: 2016,
    nickname: "The Guardian",
    city: "DKI Jakarta",
    description: "Dibentuk oleh kepolisian negara Republik Indonesia pasca restrukturisasi tahun 2016. Berbekal perpaduan pemain binaan terbaik dan pilar asing berkelas tinggi, Bhayangkara mencatatkan diri sebagai kampiun edisi perdana Liga 1 profesional pada musim 2017.",
    colors: {
      primary: "#A16207",
      secondary: "#1E293B",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "bhayangkara"
  },
  "Semen Padang": {
    name: "Semen Padang",
    founded: 1980,
    nickname: "Kabau Sirah",
    city: "Padang, Sumatera Barat",
    description: "Klub sepak bola profesional pertama BUMN di Indonesia yang lahir pada 23 Mei 1980. Mewakili kebanggaan seluruh masyarakat Minangkabau di Sumatera Barat dengan gaya permainan taktis penuh semangat juang tinggi, dan sukses menggondol trofi Liga Prima Indonesia (LPI) tahun 2013.",
    colors: {
      primary: "#DC143C",
      secondary: "#F59E0B",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "semen-padang"
  },
  "Borneo FC": {
    name: "Borneo FC",
    founded: 2014,
    nickname: "Pesut Etam",
    city: "Samarinda, Kalimantan Timur",
    description: "Klub kebanggaan masyarakat Samarinda, Kalimantan Timur yang dibentuk tahun 2014. Terkenal dengan basis infrastruktur dan akademi modern kelas satu, tim oranye ini menjadi kekuatan menakutkan baru di papan atas persaingan elit kompetisi Liga 1.",
    colors: {
      primary: "#EA580C",
      secondary: "#1E3A8A",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "borneo-fc"
  },
  "Madura United": {
    name: "Madura United",
    founded: 2016,
    nickname: "Laskar Sape Kerrab",
    city: "Pamekasan, Madura",
    description: "Hasil akuisisi lisensi klub pada tahun 2016 untuk mempertemukan seluruh kecintaan sepak bola Pulau Garam, Madura. Bermarkas di Gelora Madura Ratu Pamelingan, tim bercorak Merah Putih ini melambangkan kegigihan, semangat petarung, dan kedaulatan sepak bola profesional.",
    colors: {
      primary: "#DC2626",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "madura-united"
  },
  "Dewa United": {
    name: "Dewa United",
    founded: 2021,
    nickname: "Tangsel Warrior",
    city: "Tangerang Selatan, Banten",
    description: "Klub modern progresif yang naik kasta ke Liga 1 pada musim 2022. Memiliki markas latihan kelas premium dan jajaran pemain bertalenta tinggi, klub ini membawa kesegaran tata kelola profesional modern di kancah elit sepak bola nasional.",
    colors: {
      primary: "#A16207",
      secondary: "#000000",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "dewa-united"
  },
  "Persita Tangerang": {
    name: "Persita Tangerang",
    founded: 1953,
    nickname: "Pendekar Cisadane",
    city: "Tangerang, Banten",
    description: "Dibentuk sejak pertengahan abad 1953, kebanggaan Tangerang Raya ini memakai warna ungu ikonik di kancah sepak bola nasional. Melalui pertarungan tak kenal lelah, Pendekar Cisadane selalu menjadi rintangan tangguh bagi tim papan atas.",
    colors: {
      primary: "#7E22CE",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persita-tangerang"
  },
  "Barito Putera": {
    name: "Barito Putera",
    founded: 1988,
    nickname: "Laskar Antasari",
    city: "Banjarmasin, Kalimantan Selatan",
    description: "Klub kebanggaan Banua Kalimantan Selatan yang didirikan oleh tokoh olahraga legendaris H. Abdussamad Sulaiman HB pada tahun 1988. Selalu mengandalkan kebersamaan kekeluargaan tinggi serta terkenal melahirkan bintang-bintang muda berbakat untuk tim nasional.",
    colors: {
      primary: "#FACC15",
      secondary: "#1D4ED8",
      border: "#1A1A1A",
      text: "#000000"
    },
    emblemSymbol: "shield"
  },
  "PSS Sleman": {
    name: "PSS Sleman",
    founded: 1976,
    nickname: "Super Elang Jawa",
    city: "Sleman, DI Yogyakarta",
    description: "Mewakili Kabupaten Sleman, Daerah Istimewa Yogyakarta dengan maskot megah Elang Jawa. Terbentuk tahun 1976, PSS memiliki salah satu kelompok suporter paling kreatif dan loyal di Asia Tenggara yang senantiasa membakar semangat juang di Stadion Maguwoharjo.",
    colors: {
      primary: "#15803D",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wings"
  },
  "RANS Nusantara": {
    name: "RANS Nusantara",
    founded: 2021,
    nickname: "The Phoenix",
    city: "Jakarta / Sleman",
    description: "Klub bentukan tahun 2021 hasil akuisisi Cilegon United oleh RANS Entertainment. Sempat mencuri perhatian luas publik nasional dengan emblem burung Phoenix magenta yang melambangkan kebangkitan estetika sepak bola hiburan modern.",
    colors: {
      primary: "#701A75",
      secondary: "#EAB308",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wings"
  },
  "Persikabo 1973": {
    name: "Persikabo 1973",
    founded: 1973,
    nickname: "Laskar Padjajaran / Kabo Mania",
    city: "Bogor, Jawa Barat",
    description: "Mewakili identitas perjuangan Bogor Raya dengan silsilah historis militer yang kental. Melegenda dengan sebutan Laskar Padjajaran merah-putih-hijau, tim ini selalu dikenal pantang menyerah bertarung di arena kasta teratas.",
    colors: {
      primary: "#166534",
      secondary: "#EAB308",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "shield"
  },
  "Persiwa Wamena": {
    name: "Persiwa Wamena",
    founded: 1925,
    nickname: "Badai Pegunungan",
    city: "Wamena, Papua",
    description: "Laskar Badai Pegunungan Tengah didirikan resmi tahun 1925. Bermarkas di Stadion Pendidikan Wamena yang berada di dataran tinggi Papua, Persiwa disegani lawan karena ketangguhan fisik pemainnya dan keangkeran markas mereka.",
    colors: {
      primary: "#15803D",
      secondary: "#000000",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "mountain"
  },
  "Persela Lamongan": {
    name: "Persela Lamongan",
    founded: 1967,
    nickname: "Laskar Joko Tingkir",
    city: "Lamongan, Jawa Timur",
    description: "Didirikan pada 18 April 1967, Persela melegenda sebagai tim Jawa Timur yang gigih dan disegani. Terkenal lewat kepahlawanan kiper legendaris Choirul Huda, tim ini melambangkan jiwa keksatriaan Joko Tingkir.",
    colors: {
      primary: "#38BDF8",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#0284C7"
    },
    emblemSymbol: "claws"
  },
  "Pelita Jaya": {
    name: "Pelita Jaya",
    founded: 1986,
    nickname: "The Red Wonder / Laskar Pasoepati",
    city: "Karawang, Jawa Barat",
    description: "Salah satu klub Galatama paling mentereng di era 90-an milik Bakrie Group. Memiliki sejarah kepengurusan mandiri, bertabur bintang asing mewah seperti Roger Milla dan Mario Kempes, serta melegenda dalam melahirkan talenta hebat.",
    colors: {
      primary: "#DC2626",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "lightning"
  },
  "Persiba Balikpapan": {
    name: "Persiba Balikpapan",
    founded: 1950,
    nickname: "Beruang Madu",
    city: "Balikpapan, Kalimantan Timur",
    description: "Didirikan pada tahun 1950, Persiba melambangkan keuletan dan mentalitas pejuang kilang minyak Balikpapan. Dipersenjatai maskot ikonik Beruang Madu, laga di markas keramat Stadion Parikesit selalu menghadirkan atmosfer membara.",
    colors: {
      primary: "#1D4ED8",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "horn"
  },
  "Persisam Putra Samarinda": {
    name: "Persisam Putra Samarinda",
    founded: 1989,
    nickname: "Pesut Mahakam",
    city: "Samarinda, Kalimantan Timur",
    description: "Lahir sebagai merger Putra Samarinda dan Persisam, klub ini menjadi andalan pesisir Kalimantan sebelum bertransformasi menjadi Bali United. Memiliki masa kejayaan bertabur bintang kenamaan nasional di Stadion Segiri.",
    colors: {
      primary: "#EA580C",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wave"
  },
  "Persidafon Dafonsoro": {
    name: "Persidafon Dafonsoro",
    founded: 1970,
    nickname: "Gabus Sentani",
    city: "Jayapura, Papua",
    description: "Bermutu tinggi dari lereng gunung Dafonsoro, Persidafon mewarnai sejarah sepak bola Papua dengan talenta lokal murni yang indah dan bertenaga. Mengandalkan permainan dinamis cepat khas pesisir Danau Sentani.",
    colors: {
      primary: "#000000",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "sword"
  },
  "PSPS Pekanbaru": {
    name: "PSPS Pekanbaru",
    founded: 1955,
    nickname: "Askar Bertuah",
    city: "Pekanbaru, Riau",
    description: "Klub kebanggaan bumi Lancang Kuning Riau yang berdiri sejak 1955. Dikenal karena jajaran lini depan legendaris mereka di masa lampau serta dukungan fanatik kelompok Askar Theking di Stadion Kaharuddin Nasution.",
    colors: {
      primary: "#2563EB",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "shield"
  },
  "Persiram Raja Ampat": {
    name: "Persiram Raja Ampat",
    founded: 2004,
    nickname: "Dewa Laut",
    city: "Raja Ampat, Papua",
    description: "Mewakili keindahan kepulauan surga wisata Raja Ampat di kancah elit sepak bola nasional. Melambangkan kegagahan Dewa Laut pesisir barat Papua dengan tumpuan taktik bertahan-menyerang berkecepatan dinamis.",
    colors: {
      primary: "#0284C7",
      secondary: "#000000",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wave"
  },
  "Gresik United": {
    name: "Gresik United",
    founded: 2005,
    nickname: "Laskar Joko Samudro",
    city: "Gresik, Jawa Timur",
    description: "Merupakan peleburan bersejarah antara Petrokimia Putra Gresik (kampiun 2002) dan Persegres Gresik pada tahun 2005. Terkenal akan semangat membara arek-arek pudak pendukung setia Ultras Gresik.",
    colors: {
      primary: "#EAB308",
      secondary: "#1D4ED8",
      border: "#1A1A1A",
      text: "#1A1A1A"
    },
    emblemSymbol: "shield"
  },
  "Deltras Sidoarjo": {
    name: "Deltras Sidoarjo",
    founded: 1989,
    nickname: "The Lobster",
    city: "Sidoarjo, Jawa Timur",
    description: "Lahir dengan cikal bakal bendera Gelora Dewata di Bali sebelum dipindahkan ke Sidoarjo pada tahun 2001. Memiliki basis pertahanan taktis legendaris serta sejarah membina sederet striker pembunuh gawang lawan.",
    colors: {
      primary: "#DC2626",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wings"
  },
  "PSAP Sigli": {
    name: "PSAP Sigli",
    founded: 1970,
    nickname: "Laskar Aneuk Nanggroe",
    city: "Pidie, Aceh",
    description: "Dibentuk tahun 1970, PSAP melambangkan ketangguhan masyarakat Pidie, Aceh. Dikenal berkat pertarungan penuh disiplin keras dan militansi tinggi kala membela tanah kebanggaan Kuta Asan.",
    colors: {
      primary: "#059669",
      secondary: "#DC2626",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "sword"
  },
  "Bontang FC": {
    name: "Bontang FC",
    founded: 1988,
    nickname: "Laskar Bukit Tursina",
    city: "Bontang, Kalimantan Timur",
    description: "Berasal dari nama PKT (Pupuk Kaltim) Bontang, salah satu tim korporasi semi-profesional tersukses di era Galatama awal 90-an dan runner-up nasional 1999. Menyajikan permainan atraktif penuh gocekan modern.",
    colors: {
      primary: "#16A34A",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "shield"
  },
  "Persijap Jepara": {
    name: "Persijap Jepara",
    founded: 1954,
    nickname: "Laskar Kalinyamat",
    city: "Jepara, Jawa Tengah",
    description: "Dibentuk pada 11 April 1954, membopong semangat perjuangan Ratu Kalinyamat asal Jepara Jawa Tengah. Terkenal kokoh tangguh menyajikan pertarungan atraktif berwarna merah membara di Stadion Gelora Bumi Kartini.",
    colors: {
      primary: "#DC2626",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "persijap-jepara"
  },
  "Mitra Kukar": {
    name: "Mitra Kukar",
    founded: 1979,
    nickname: "Naga Mekes",
    city: "Kutai Kartanegara, Kalimantan Timur",
    description: "Didirikan asalnya sebagai Mitra Surabaya berakar Galatama sebelum hijrah ke Tenggarong, Kutai Kartanegara. Berkat sokongan finansial megah, tim bersimbol Naga Mekes ini sempat meramaikan singgasana papan atas kasta teratas.",
    colors: {
      primary: "#FACC15",
      secondary: "#16A34A",
      border: "#1A1A1A",
      text: "#000000"
    },
    emblemSymbol: "wings"
  },
  "Persepam Madura United": {
    name: "Persepam Madura United",
    founded: 1970,
    nickname: "Laskar Sapeh Ngamok",
    city: "Pamekasan, Madura",
    description: "Klub kebanggaan perintis sepak bola modern pulau Madura yang menembus hirarki tertinggi Indonesia Super League pada tahun 2013. Menerapkan taktik bertarung agresif, keras, jujur, demi kehormatan tanah pusaka Madura.",
    colors: {
      primary: "#DC2626",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "horn"
  },
  "Pelita Bandung Raya": {
    name: "Pelita Bandung Raya",
    founded: 2012,
    nickname: "The Boys Are Back",
    city: "Bandung, Jawa Barat",
    description: "Hasil peleburan antara lisensi Pelita Jaya dan Bandung Raya pada tahun 2012. Menyuguhkan rentetan kejutan menakjubkan di kancah nasional lewat dominasi pemain mudanya yang atraktif nan enerjik.",
    colors: {
      primary: "#2563EB",
      secondary: "#DC2626",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "lightning"
  },
  "PS TNI": {
    name: "PS TNI",
    founded: 2015,
    nickname: "The Army",
    city: "Cibinong, Bogor",
    description: "Klub bentukan institusi TNI dan tentara nasional yang mengedepankan determinasi tingkat tinggi, kekuatan fisik luar biasa prima, serta mental juang baja tak kenal lelah di kancah nasional.",
    colors: {
      primary: "#15803D",
      secondary: "#14532D",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "sword"
  },
  "PS Tira": {
    name: "PS Tira",
    founded: 2015,
    nickname: "The Army (Bantul)",
    city: "Bantul, Yogyakarta",
    description: "Representasi klub TNI saat mengarungi ketatnya kompetisi Liga 1 musim 2018 dengan bermarkas sementara di Stadion Sultan Agung, Bantul. Mengandalkan determinasi cepat dan taktis.",
    colors: {
      primary: "#15803D",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "sword"
  },
  "Perseru Serui": {
    name: "Perseru Serui",
    founded: 1970,
    nickname: "Cenderawasih Oranye",
    city: "Kepulauan Yapen, Papua",
    description: "Laskar legendaris asal Kepulauan Yapen Papua yang dikenal tangguh serta sangat dominan saat berlaga di markas angker mereka, Stadion Marora. Mewakili heroisme masyarakat adat Yapen.",
    colors: {
      primary: "#EA580C",
      secondary: "#000000",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wings"
  },
  "Persiba Bantul": {
    name: "Persiba Bantul",
    founded: 1967,
    nickname: "Laskar Sultan Agung",
    city: "Bantul, Yogyakarta",
    description: "Klub kebanggaan Bantul peraih gelar Divisi Utama 2010/2011 yang bersaing sengit di liga tertinggi Indonesia dengan mengandalkan dukungan fanatik massa merah membara nan militan.",
    colors: {
      primary: "#E11D48",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "flame"
  },
  "Putra Samarinda": {
    name: "Putra Samarinda",
    founded: 1989,
    nickname: "Pesut Mahakam",
    city: "Samarinda, Kalimantan Timur",
    description: "Klub papan atas Samarinda yang nantinya bermutasi lisensi menjadi Bali United. Diperkuat talenta-talenta lokal lincah, dinamis, dan berkarakter khas sepak bola Kalimantan.",
    colors: {
      primary: "#EA580C",
      secondary: "#1E3A8A",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wave"
  },
  "Kalteng Putra": {
    name: "Kalteng Putra",
    founded: 1970,
    nickname: "Laskar Isen Mulang",
    city: "Palangkaraya, Kalimantan Tengah",
    description: "Klub asal Kalimantan Tengah yang didirikan pada tahun 1970. Mengguncang kasta tertinggi pada musim 2019 dengan semangat Isen Mulang (Pantang Mundur).",
    colors: {
      primary: "#D21F3C",
      secondary: "#000000",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "shield"
  },
  "Perseru Badak Lampung": {
    name: "Perseru Badak Lampung",
    founded: 2019,
    nickname: "Laskar Saburai",
    city: "Bandar Lampung, Lampung",
    description: "Klub hasil merger lisensi Perseru Serui yang bermarkas di Stadion Sumpah Pemuda, Bandar Lampung pada musim 2019, mengusung kebanggaan warga Lampung.",
    colors: {
      primary: "#E01E5A",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "horn"
  },
  "Warna Agung": {
    name: "Warna Agung",
    founded: 1971,
    nickname: "Kampiun Perdana",
    city: "DKI Jakarta",
    description: "Klub Galatama legendaris asal Jakarta milik pengusaha cat Benny Mulyono. Dilatih oleh Endang Witarsa, Warna Agung menorehkan sejarah emas sebagai juara edisi pertama Galatama (1979/80) dengan mengandalkan talenta lokal berkualitas prima.",
    colors: {
      primary: "#FACC15",
      secondary: "#1D4ED8",
      border: "#1A1A1A",
      text: "#000000"
    },
    emblemSymbol: "star"
  },
  "NIAC Mitra": {
    name: "NIAC Mitra",
    founded: 1979,
    nickname: "Laskar Gunung Sari",
    city: "Surabaya, Jawa Timur",
    description: "New Indonesia Athletic Club (NIAC) Mitra adalah klub semi-profesional legendaris Surabaya yang merajai Galatama dengan 3 trofi juara. Terkenal karena pernah mengalahkan raksasa Inggris Arsenal 2-0 pada laga uji coba tahun 1983 di Stadion Gelora 10 November.",
    colors: {
      primary: "#06B6D4",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wings"
  },
  "Yanita Utama": {
    name: "Yanita Utama",
    founded: 1983,
    nickname: "Kekuatan Baru",
    city: "Bogor, Jawa Barat",
    description: "Klub Galatama bergelimang bintang asal Bogor milik pengusaha Yan Darmadi. Sempat merajai Galatama dengan menjuarai dua musim berturut-turut (1983/84 & 1984) sebelum dibubarkan secara mengejutkan pada tahun 1985.",
    colors: {
      primary: "#475569",
      secondary: "#F1F5F9",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "shield"
  },
  "Kramayudha Tiga Berlian": {
    name: "Kramayudha Tiga Berlian",
    founded: 1985,
    nickname: "Laskar Tiga Berlian",
    city: "Palembang / Jakarta",
    description: "Klub kelanjutan dari Yanita Utama yang diakuisisi oleh PT Krama Yudha Tiga Berlian Motors (distributor Mitsubishi). Meraih peringkat ketiga di Kejuaraan Klub Asia 1985–86 serta menjuarai Galatama edisi 1985 dan 1986–87.",
    colors: {
      primary: "#DC2626",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "lightning"
  },
  "Arseto": {
    name: "Arseto",
    founded: 1978,
    nickname: "Ksatria Biru",
    city: "Surakarta (Solo), Jawa Tengah",
    description: "Didirikan pada tahun 1978 oleh Sigid Harjoyudanto di Jakarta sebelum pindah markas ke Solo pada 1983. Bermarkas di Stadion Sriwedari, klub berjuluk Ksatria Biru ini menjuarai Galatama musim 1990–92 dan dibubarkan pada tahun 1998.",
    colors: {
      primary: "#1E3A8A",
      secondary: "#60A5FA",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "wings"
  },
  "Jayakarta": {
    name: "Jayakarta",
    founded: 1978,
    nickname: "Tim Ibu Kota",
    city: "DKI Jakarta",
    description: "Klub Galatama perintis asal Jakarta yang menjadi kekuatan tangguh di era awal kompetisi, berhasil menduduki peringkat kedua (runner-up) pada dua musim pertama Galatama.",
    colors: {
      primary: "#15803D",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "shield"
  },
  "UMS 80": {
    name: "UMS 80",
    founded: 1980,
    nickname: "Putra Petojo",
    city: "DKI Jakarta",
    description: "Union Makes Strength (UMS) adalah klub internal legendaris Persija Jakarta yang sempat membentuk tim profesional UMS '80 untuk berkompetisi di Galatama, meraih posisi runner-up pada musim 1982–83 dan 1984.",
    colors: {
      primary: "#F97316",
      secondary: "#000000",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "claws"
  },
  "Mercu Buana": {
    name: "Mercu Buana",
    founded: 1980,
    nickname: "Tim Probosutedjo",
    city: "Medan, Sumatera Utara",
    description: "Klub Galatama asal Medan bentukan pengusaha Probosutedjo yang sempat meramaikan persaingan papan atas di awal era 1980-an, menduduki peringkat runner-up pada musim 1983–84.",
    colors: {
      primary: "#047857",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "monument"
  },
  "Malut United": {
    name: "Malut United",
    founded: 2023,
    nickname: "Laskar Kie Raha",
    city: "Ternate, Maluku Utara",
    description: "Klub kebanggaan bumi rempah-rempah Maluku Utara. Meskipun terbilang baru, Malut United berhasil menembus kasta tertinggi sepak bola Indonesia dengan cepat, membawa kembali kejayaan sepak bola kawasan timur.",
    colors: {
      primary: "#DC2626",
      secondary: "#FFFFFF",
      border: "#1A1A1A",
      text: "#FFFFFF"
    },
    emblemSymbol: "malut-united"
  },
  "PSBS Biak": {
    name: "PSBS Biak",
    founded: 1968,
    nickname: "Badai Pasifik",
    city: "Biak Numfor, Papua",
    description: "Klub kebanggaan masyarakat Biak Numfor, Papua yang dijuluki Badai Pasifik. Tampil trengginas menjuarai kasta kedua dan langsung menggebrak kompetisi tertinggi dengan permainan enerjik khas pesisir.",
    colors: {
      primary: "#38BDF8",
      secondary: "#FACC15",
      border: "#1A1A1A",
      text: "#1A1A1A"
    },
    emblemSymbol: "psbs-biak"
  }
};
