import newQuizQuestions from "../assets/quiz_questions_1000.json";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

const originalQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Klub mana yang berhasil menjadi juara pada edisi perdana Liga Indonesia (Liga Dunhill) musim 1994-1995?",
    options: ["Persija Jakarta", "Persib Bandung", "Pelita Jaya", "Persebaya Surabaya"],
    correctAnswer: 1,
    explanation: "Persib Bandung adalah juara edisi perdana Liga Indonesia (Ligina) musim 1994-1995 setelah mengalahkan Petrokimia Putra 1-0 di final melalui gol Sutiono Lamso."
  },
  {
    id: "q2",
    question: "Siapakah pemain yang memegang rekor pencetak gol terbanyak dalam 1 musim liga?",
    options: ["Boaz Solossa", "Cristian Gonzáles", "Sylvano Comvalius", "Peri Sandria"],
    correctAnswer: 2,
    explanation: "Sylvano Comvalius mencetak 37 gol untuk Bali United pada Liga 1 2017, memecahkan rekor abadi Peri Sandria (34 gol) yang bertahan sejak 1995."
  },
  {
    id: "q3",
    question: "Klub mana yang memegang rekor gelar juara kasta tertinggi terbanyak sejak era Perserikatan/Galatama hingga kini?",
    options: ["Persib Bandung", "Persija Jakarta", "Persipura Jayapura", "Arema FC"],
    correctAnswer: 1,
    explanation: "Persija Jakarta adalah klub tersukses di Indonesia secara keseluruhan dengan torehan 11 gelar juara (sebagian besar diraih di era Perserikatan)."
  },
  {
    id: "q4",
    question: "Satu-satunya pemain yang pernah meraih gelar Pemain Terbaik Liga Indonesia sebanyak 3 kali adalah...",
    options: ["Bambang Pamungkas", "Boaz Solossa", "Kurniawan Dwi Yulianto", "Ponaryo Astaman"],
    correctAnswer: 1,
    explanation: "Boaz Solossa adalah legenda sejati. Ia memenangkan penghargaan Pemain Terbaik pada musim 2008-09, 2010-11, dan 2013, semuanya bersama Persipura Jayapura."
  },
  {
    id: "q5",
    question: "Pada musim 2014, tim mana yang berhasil mengalahkan Persipura Jayapura di final ISL melalui drama adu penalti?",
    options: ["Arema Cronus", "Persib Bandung", "Sriwijaya FC", "Pelita Bandung Raya"],
    correctAnswer: 1,
    explanation: "Persib Bandung mengakhiri puasa gelar selama 19 tahun dengan mengalahkan Persipura di final ISL 2014 melalui drama adu penalti di Palembang."
  },
  {
    id: "q6",
    question: "Siapakah kiper pertama (dan satu-satunya hingga kini) yang pernah memenangkan gelar Pemain Terbaik di era profesional?",
    options: ["Kurnia Meiga", "Hendro Kartiko", "Ferry Rotinsulu", "Andritany Ardhiyasa"],
    correctAnswer: 0,
    explanation: "Kurnia Meiga dianugerahi gelar Pemain Terbaik pada ISL musim 2009-2010 setelah tampil luar biasa mengantarkan Arema Indonesia menjadi juara."
  },
  {
    id: "q7",
    question: "Klub dari luar Pulau Jawa pertama yang berhasil menjuarai Liga Indonesia era profesional adalah...",
    options: ["Persipura Jayapura", "PSM Makassar", "Sriwijaya FC", "Persik Kediri"],
    correctAnswer: 1,
    explanation: "PSM Makassar menjuarai Liga Bank Mandiri musim 1999-2000, menjadi tim pertama dari luar Jawa yang mengangkat trofi di era gabungan Perserikatan-Galatama."
  },
  {
    id: "q8",
    question: "Pemain asing manakah yang memenangkan gelar Top Skor dalam 4 musim beruntun?",
    options: ["Jacksen F. Tiago", "Julio Lopez", "Cristian Gonzáles", "Beto Gonçalves"],
    correctAnswer: 2,
    explanation: "Cristian Gonzáles 'El Loco' memenangkan gelar top skor secara beruntun dari tahun 2005 hingga 2008-2009 bersama Persik Kediri dan Persib Bandung."
  },
  {
    id: "q9",
    question: "Sriwijaya FC mencetak sejarah pada tahun 2007-2008. Pencapaian spesial apa yang mereka raih?",
    options: ["Juara tanpa terkalahkan", "Double Winner (Liga & Copa)", "Juara Liga Champions Asia", "Juara dengan poin 100"],
    correctAnswer: 1,
    explanation: "Di bawah asuhan Rahmad Darmawan, Sriwijaya FC mencetak sejarah sebagai tim pertama yang meraih 'Double Winner', yaitu menjuarai Liga Indonesia dan Copa Indonesia di musim yang sama."
  },
  {
    id: "q10",
    question: "Klub manakah yang meraih gelar juara 'Back-to-Back' (dua musim beruntun) di era Liga 1 modern?",
    options: ["Persija Jakarta", "Bali United", "PSM Makassar", "Bhayangkara FC"],
    correctAnswer: 1,
    explanation: "Bali United berhasil menjadi juara beruntun (Back-to-Back) pada kompetisi Liga 1 musim 2019 dan 2021-2022 (musim 2020 dibatalkan karena pandemi)."
  }
];

export const quizQuestions: QuizQuestion[] = [
  ...originalQuestions.map(q => ({ ...q, id: `orig_${q.id}` })),
  ...(newQuizQuestions as QuizQuestion[]).map(q => ({ ...q, id: `new_${q.id}` }))
];
