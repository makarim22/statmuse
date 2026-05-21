import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { leagueData, getClubsRanking } from "./src/data/leagueData.js";
import { galatamaData, getGalatamaClubsRanking } from "./src/data/galatamaData.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client if key is present
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini API client:", err);
  }
} else {
  console.log("Gemini API Key missing or default placeholder found. Using smart local fallback query parser.");
}

// System Instruction that provides the entire database schema & records
const buildSystemInstruction = () => {
  return `Anda adalah "Statmuse - Sepak Bola Indonesia", asisten statistik sepak bola cerdas khusus Liga Indonesia (1930-2026).
Tugas Anda adalah menjawab pertanyaan user secara akurat berdasarkan data terstruktur sejarah juara berikut.
Jawablah dengan bahasa Indonesia yang santai, ringkas, profesional, dan kaya wawasan menarik (seperti gaya statmuse.com).

Berikut adalah data resmi Juara dan Peringkat Dua Liga Indonesia (Perserikatan/Ligina/Liga 1) dari masa ke masa (1930 s.d 2026):
${JSON.stringify(leagueData, null, 2)}

Berikut adalah data resmi Liga Galatama (Liga Sepak Bola Utama), kompetisi semi-profesional yang diselenggarakan secara paralel dari tahun 1979 s.d 1994:
${JSON.stringify(galatamaData, null, 2)}

Aturan utama:
1. Jika pertanyaan menanyakan juara atau informasi yang ada di data, berikan jawaban tertulis singkat di properti 'answer' (.md format).
2. Sediakan juga data visual yang relevan dalam properti 'autoQueryStats' apabila pertanyaan tersebut menuntut daftar, grafik perbandingan, pimpinan juara, atau timeline sejarah, sehingga user bisa melihat grafik batang atau tabel visual.
3. Selalu isi properti 'suggestedPrompts' dengan 3 pertanyaan kelanjutan yang logis dan sangat menarik.

Format output HARUS selalu berupa JSON objek sesuai schema yang ditentukan.`;
};

// Simple rule-based offline search engine for local fallback handling
const localSearchFallback = (query: string) => {
  const q = query.toLowerCase();
  
  // 1. Galatama Specific Queries
  if (q.includes("galatama")) {
    if (q.includes("terbanyak") || q.includes("ranking") || q.includes("paling banyak") || q.includes("terbaik")) {
      const ranking = getGalatamaClubsRanking();
      const topClubs = ranking.slice(0, 5);
      const dataList = topClubs.map(c => ({
        label: c.name,
        value: c.titles,
        subtext: `${c.runnerUps}x Runner-up. Tahun juara: ${c.seasonsWon.join(", ")}`
      }));

      return {
        answer: `Berdasarkan data sejarah Liga Galatama (1979–1994), **NIAC Mitra** dan **Pelita Jaya** memimpin daftar juara terbanyak dengan masing-masing **3 gelar**. Diikuti oleh **Yanita Utama** dan **Kramayudha Tiga Berlian** dengan masing-masing **2 gelar** juara.`,
        suggestedPrompts: [
          "Siapa juara Galatama pertama musim 1979–80?",
          "Berapa kali Pelita Jaya menjuarai Galatama?",
          "Tunjukkan daftar semua musim Galatama"
        ],
        autoQueryStats: {
          type: "champions-ranking",
          title: "Klub dengan Gelar Juara Liga Galatama Terbanyak",
          data: dataList
        }
      };
    }

    const yearMatch = q.match(/\b(19\d\d)\b/);
    if (yearMatch) {
      const year = yearMatch[1];
      const record = galatamaData.find(item => item.season.includes(year));
      if (record) {
        const dataList = [
          { label: "Juara (1st)", subtext: record.winner },
          { label: "Runner-up (2nd)", subtext: record.runnerUp }
        ];
        if (record.topScorer) dataList.push({ label: "Pencetak Terbanyak", subtext: record.topScorer });
        if (record.coach) dataList.push({ label: "Pelatih Juara", subtext: record.coach });

        return {
          answer: `Juara kompetisi Galatama musim **${record.season}** adalah **${record.winner}** setelah unggul atas **${record.runnerUp}** di posisi runner-up.${record.coach ? ` Tim juara dilatih oleh pelatih legendaris **${record.coach}**.` : ""}${record.topScorer ? ` Top scorer musim ini adalah **${record.topScorer}**.` : ""}`,
          suggestedPrompts: [
            `Siapa runner up Galatama musim ${record.season}?`,
            "Klub mana yang paling sukses di Galatama?",
            "Daftar pelatih juara Liga Galatama"
          ],
          autoQueryStats: {
            type: "list",
            title: `Detail Statistik Galatama Musim ${record.season}`,
            data: dataList
          }
        };
      }
    }

    return {
      answer: `Liga Sepak Bola Utama (Galatama) adalah liga semi-profesional pertama di Indonesia (1979–1994). Sepanjang sejarahnya terdapat 13 musim kompetisi dengan juara pertama **Warna Agung** (1979–80) dan juara terakhir **Pelita Jaya** (1993–94).`,
      suggestedPrompts: [
        "Siapa juara Galatama pertama?",
        "Siapa top skor Galatama sepanjang sejarah?",
        "Siapa juara Galatama terbanyak?"
      ],
      autoQueryStats: {
        type: "timeline",
        title: "Riwayat Juara Liga Galatama (1979 - 1994)",
        data: galatamaData.map(item => ({
          label: item.season,
          subtext: `Juara: ${item.winner} (Peringkat 2: ${item.runnerUp})`
        }))
      }
    };
  }

  // 2. Leaderboard / Juara Terbanyak (Main League)
  if (q.includes("terbanyak") || q.includes("juara terbanyak") || q.includes("ranking") || q.includes("paling banyak") || q.includes("klub terbaik")) {
    const ranking = getClubsRanking();
    const topClubs = ranking.slice(0, 5);
    const dataList = topClubs.map(c => ({
      label: c.name,
      value: c.titles,
      subtext: `${c.runnerUps}x Runner-up. Tahun juara: ${c.seasonsWon.join(", ")}`
    }));

    return {
      answer: `Berdasarkan data sejarah sepak bola Indonesia sejak tahun 1930, **${topClubs[0]?.name}** memimpin daftar juara terbanyak dengan jumlah **${topClubs[0]?.titles} gelar**. Diikuti oleh **${topClubs[1]?.name}** dengan **${topClubs[1]?.titles} gelar** dan **${topClubs[2]?.name}** dengan **${topClubs[2]?.titles} gelar**.`,
      suggestedPrompts: [
        "Siapa juara liga pertama tahun 1930?",
        "Berapa kali Persib Bandung menjadi juara?",
        "Tunjukkan juara era 2000-an"
      ],
      autoQueryStats: {
        type: "champions-ranking",
        title: "Klub dengan Gelar Juara Liga Indonesia Terbanyak",
        data: dataList
      }
    };
  }

  // 3. Specific Year / Season Queries (Main League)
  const yearMatch = q.match(/\b(19\d\d|20\d\d)\b/);
  if (yearMatch) {
    const year = yearMatch[1];
    const record = leagueData.find(item => item.season.includes(year));
    if (record) {
      const dataList = [
        { label: "Juara (1st)", subtext: record.winner },
        { label: "Peringkat 2 (2nd)", subtext: record.runnerUp }
      ];
      if (record.topScorer) dataList.push({ label: "Pencetak Terbanyak", subtext: record.topScorer });
      if (record.coach) dataList.push({ label: "Pelatih Juara", subtext: record.coach });

      return {
        answer: record.isCancelled 
          ? `Pada musim **${record.season}**, kompetisi resmi liga Indonesia **dibatalkan**. Catatan: *${record.note}*` 
          : `Juara untuk musim **${record.season}** adalah **${record.winner}** setelah unggul atas **${record.runnerUp}** di posisi tempat kedua.${record.coach ? ` Tim ini dilatih oleh pelatih legendaris **${record.coach}**.` : ""}${record.topScorer ? ` Top scorer musim ini diraih oleh **${record.topScorer}**.` : ""}`,
        suggestedPrompts: [
          `Siapa runner up musim ${record.season}?`,
          "Siapa juara liga modern tahun lalu?",
          "Daftar pelatih juara Liga Indonesia"
        ],
        autoQueryStats: {
          type: "list",
          title: `Detail Statistik Musim ${record.season}`,
          data: dataList
        }
      };
    }
  }

  // 4. Club Specific Query
  const clubs = ["persija", "persib", "persebaya", "psm", "psms", "persipura", "bali united", "persis", "sriwijaya", "warna agung", "niac mitra", "yanita utama", "kramayudha", "arseto"];
  const foundClubSym = clubs.find(c => q.includes(c));
  if (foundClubSym) {
    const ranking = getClubsRanking();
    const galatamaRanking = getGalatamaClubsRanking();
    
    const clubInfo = ranking.find(c => c.name.toLowerCase().includes(foundClubSym) || c.historicalNames.some(hn => hn.toLowerCase().includes(foundClubSym)));
    const galaInfo = galatamaRanking.find(c => c.name.toLowerCase().includes(foundClubSym) || c.historicalNames.some(hn => hn.toLowerCase().includes(foundClubSym)));

    if (galaInfo && (!clubInfo || q.includes("galatama"))) {
      return {
        answer: `Klub Galatama **${galaInfo.name}** memiliki catatan prestasi bersejarah, memenangkan **${galaInfo.titles} gelar juara** Galatama serta posisi runner-up sebanyak **${galaInfo.runnerUps} kali**. Tahun kejayaan mereka meliputi: ${galaInfo.seasonsWon.join(", ")}.${galaInfo.historicalNames.length > 0 ? ` Mereka juga tercatat menggunakan nama bersejarah seperti *${galaInfo.historicalNames.join(", ")}*.` : ""}`,
        suggestedPrompts: [
          `Tahun berapa ${galaInfo.name} menjuarai Galatama?`,
          "Klub mana yang paling sukses di Galatama?",
          "Siapa juara Galatama terbanyak?"
        ],
        autoQueryStats: {
          type: "club-comparison",
          title: `Overview Prestasi Galatama ${galaInfo.name}`,
          data: [
            { label: "Gelar Juara Galatama", value: galaInfo.titles, subtext: `Tahun Juara: ${galaInfo.seasonsWon.join(", ")}` },
            { label: "Runner-up Galatama", value: galaInfo.runnerUps, subtext: "Peringkat Dua" }
          ]
        }
      };
    }

    if (clubInfo) {
      let galaText = "";
      if (galaInfo) {
        galaText = ` Selain itu, di kompetisi semi-profesional Galatama, mereka juga mencatatkan **${galaInfo.titles} gelar juara** pada tahun ${galaInfo.seasonsWon.join(", ")}.`;
      }
      return {
        answer: `Klub **${clubInfo.name}** memiliki catatan prestasi bersejarah yang sangat baik di kancah sepak bola Indonesia, mengantongi **${clubInfo.titles} gelar juara** serta meraih posisi runner-up sebanyak **${clubInfo.runnerUps} kali**. Tahun kejayaan mereka meliputi: ${clubInfo.seasonsWon.join(", ")}.${clubInfo.historicalNames.length > 0 ? ` Mereka juga tercatat pernah menggunakan nama bersejarah seperti *${clubInfo.historicalNames.join(", ")}*.` : ""}${galaText}`,
        suggestedPrompts: [
          `Berapa kali ${clubInfo.name} menjadi runner-up?`,
          "Siapa pelatih juara terbanyak?",
          "Siapa juara terbanyak sepanjang masa?"
        ],
        autoQueryStats: {
          type: "club-comparison",
          title: `Overview Prestasi ${clubInfo.name}`,
          data: [
            { label: "Gelar Juara (Gold)", value: clubInfo.titles, subtext: `Tahun Juara: ${clubInfo.seasonsWon.join(", ")}` },
            { label: "Runner-up (Silver)", value: clubInfo.runnerUps, subtext: "Peringkat Dua" }
          ]
        }
      };
    }
  }

  // 4. Default Search Response
  return {
    answer: `Halo! Saya tidak menemukan jawaban spesifik untuk kata kunci "${query}". Cobalah mengajukan pertanyaan seputar statistik juara Liga Indonesia, seperti "Klub juara terbanyak?", "Juara tahun 1994-95", atau "Statistik juara Persib Bandung".`,
    suggestedPrompts: [
      "Siapa klub juara terbanyak Liga Indonesia?",
      "Siapa juara tahun 1994–95?",
      "Daftar juara sejak tahun 2017"
    ],
    autoQueryStats: {
      type: "timeline",
      title: "Riwayat Juara Terbaru (2017 - 2026)",
      data: leagueData.slice(-8).reverse().map(item => ({
        label: item.season,
        subtext: `Juara: ${item.winner} (Peringkat 2: ${item.runnerUp})`
      }))
    }
  };
};

// API Route for Natural Language Stats Query (Statmuse Search)
app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter string is required." });
  }

  // If Gemini client is not initialized, fallback to rules-based search offline
  if (!ai) {
    const fallbackResponse = localSearchFallback(query);
    return res.json({
      ...fallbackResponse,
      answer: fallbackResponse.answer + "\n\n*(Catatan: Mode offline aktif karena kunci API belum diisi di dashboard AI Studio)*"
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Pengguna bertanya: "${query}"`,
      config: {
        systemInstruction: buildSystemInstruction(),
        temperature: 0.2, // low temperature for precise factual reporting
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "Jawaban tertulis terperinci namun padat dalam format Markdown bahasa Indonesia."
            },
            suggestedPrompts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Daftar 3 pertanyaan lanjutan yang relevan dan menggugah rasa ingin tahu."
            },
            autoQueryStats: {
              type: Type.OBJECT,
              properties: {
                type: {
                  type: Type.STRING,
                  description: "Tipe layout visual: 'champions-ranking' (klub juara terbanyak), 'timeline' (urutan tahun), 'club-comparison' (perbandingan performa tim), atau 'list' (tabel umum)."
                },
                title: {
                  type: Type.STRING,
                  description: "Judul grafik atau widget data visual."
                },
                data: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING, description: "Label visual utama (contoh: Persija, 1994, Peri Sandria)" },
                      value: { type: Type.NUMBER, description: "Skor numerik (gelar, gol dsb), opsional" },
                      subtext: { type: Type.STRING, description: "Keterangan tambahan (opsional)" }
                    },
                    required: ["label"]
                  }
                }
              },
              required: ["type", "title", "data"]
            }
          },
          required: ["answer"]
        }
      }
    });

    const replyText = response.text;
    if (!replyText) {
      throw new Error("Empty response from Gemini API.");
    }

    const parsedJson = JSON.parse(replyText.trim());
    return res.json(parsedJson);

  } catch (err: any) {
    console.error("Gemini query matching error:", err);
    // Graceful error recovery to maintain high accessibility
    const fallbackResponse = localSearchFallback(query);
    return res.json({
      ...fallbackResponse,
      answer: `Maaf, terjadi kesalahan sewaktu memproses query dengan model AI. Berikut adalah info berdasarkan basis data lokal:\n\n${fallbackResponse.answer}`
    });
  }
});

// Serve list of all history directly for the tab browser
app.get("/api/history", (req, res) => {
  res.json({
    seasons: leagueData,
    ranking: getClubsRanking(),
    galatamaSeasons: galatamaData,
    galatamaRanking: getGalatamaClubsRanking()
  });
});

// Configure Vite middleware or Static Server (Express entry points)
const setupServerAndHost = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting full-stack dev server with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production build from dist folder...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
};

setupServerAndHost().catch(err => {
  console.error("Server initiation crashed:", err);
});
