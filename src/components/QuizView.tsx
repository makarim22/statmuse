import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, CheckCircle2, XCircle, RotateCcw, Trophy, Award, Zap, Heart, Star, Flame, Share2 } from "lucide-react";
import { quizQuestions, QuizQuestion } from "../data/quizData";
import { soundEngine } from "../utils/soundEngine";
import { haptics } from "../utils/haptics";
import { usePlayerStore } from "../store/usePlayerStore";
import ConfettiExplosion from "react-confetti-explosion";

export default function QuizView() {
  // --- Persistent Gamification State via Zustand ---
  const { xp: totalXP, addXp, highScore: highestSurvivalScore, updateHighScore, level } = usePlayerStore();

  // --- Game State ---
  const [gameState, setGameState] = useState<'start' | 'playing_classic' | 'playing_survival' | 'results'>('start');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [justLeveledUp, setJustLeveledUp] = useState(false);

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === currentQuestion?.correctAnswer;

  // Rank Titles Logic based on Zustand Level
  const getRankByXP = (currentLevel: number) => {
    if (currentLevel >= 10) return { title: "LEGENDA LIGA!", color: "var(--theme-primary)" };
    if (currentLevel >= 7) return { title: "KAPTEN TIM", color: "#3B82F6" };
    if (currentLevel >= 5) return { title: "PEMAIN INTI", color: "#EAB308" };
    if (currentLevel >= 3) return { title: "PEMAIN CADANGAN", color: "#F97316" };
    return { title: "PEMAIN MAGANG", color: "#EF4444" };
  };
  const currentRank = getRankByXP(level);

  // Helper to get random questions
  const getRandomQuestions = (count = 10, exclude: QuizQuestion[] = []): QuizQuestion[] => {
    const pool = quizQuestions.filter(q => !exclude.includes(q));
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleStartClassic = () => {
    setActiveQuestions(getRandomQuestions(10));
    setGameState('playing_classic');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSessionXP(0);
    setSelectedOption(null);
  };

  const handleStartSurvival = () => {
    setActiveQuestions(getRandomQuestions(1)); // Start with 1, load more as we go
    setGameState('playing_survival');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSessionXP(0);
    setLives(3);
    setSelectedOption(null);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return; // Prevent changing answer
    setSelectedOption(index);
    if (index === currentQuestion?.correctAnswer) {
      setScore(prev => prev + 1);
      setSessionXP(prev => prev + 10);
      soundEngine.playCoinUp();
      haptics.success();
    } else {
      soundEngine.playError();
      haptics.error();
      if (gameState === 'playing_survival') {
        setLives(prev => prev - 1);
      }
    }
  };

  const finishGame = (awardedXP: number) => {
    const previousLevel = level;
    addXp(awardedXP);
    
    // We need to calculate what the level WILL be because Zustand update might be async/batched
    const newLevel = Math.floor(Math.sqrt((totalXP + awardedXP) / 100)) + 1;
    if (newLevel > previousLevel) {
      setJustLeveledUp(true);
      soundEngine.playLevelUp(); // Triumphant sound
      haptics.levelUp();
    }

    if (gameState === 'playing_survival') {
      if (score > highestSurvivalScore && score > 0) {
        updateHighScore(score);
        if (newLevel <= previousLevel) {
          soundEngine.playLevelUp();
          haptics.success();
        }
      }
    } else if (gameState === 'playing_classic' && score === 10) {
      if (newLevel <= previousLevel) {
        soundEngine.playLevelUp();
        haptics.success();
      }
    }
    
    setGameState('results');
  };

  const handleShare = async () => {
    haptics.medium();
    const isSurvival = activeQuestions.length !== 10;
    const modeText = isSurvival ? 'Mode Survival' : 'Mode Klasik';
    const scoreText = isSurvival ? `${score} Streak` : `${score}/10`;
    
    const shareData = {
      title: 'Skor Kuis Garuda Stats',
      text: `Saya baru saja meraih skor ${scoreText} di ${modeText} Kuis Sejarah Sepak Bola Indonesia! Bisakah kamu mengalahkan skorku?`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert("Skor disalin ke clipboard!");
    }
  };

  const handleNext = () => {
    if (gameState === 'playing_classic') {
      if (currentQuestionIndex < activeQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        finishGame(sessionXP);
      }
    } else if (gameState === 'playing_survival') {
      if (lives <= 0) {
        finishGame(sessionXP);
      } else {
        // Load next survival question
        const pool = quizQuestions.filter(q => !activeQuestions.includes(q));
        if (pool.length > 0) {
          const nextQ = pool[Math.floor(Math.random() * pool.length)];
          setActiveQuestions(prev => [...prev, nextQ]);
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
        } else {
          // Answered all 1000+ questions
          finishGame(sessionXP);
        }
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="quiz_view">
      <title>Kuis Trivia Sejarah Sepak Bola Indonesia - Garuda Stats</title>
      <meta name="description" content="Uji wawasan sepak bola nasional Anda dengan kuis pilihan ganda interaktif mengenai sejarah PSSI, juara liga, dan Galatama." />
      
      {/* Neo-Brutalist Player Dashboard Banner */}
      <div className="bg-black text-white p-4 sm:p-6 border-b-4 border-primary flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="h-14 w-14 border-2 border-primary flex items-center justify-center shrink-0" style={{ backgroundColor: currentRank.color }}>
            <Award className="h-8 w-8 text-black" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">STATUS PROFIL ANDA</span>
            <h2 className="text-xl sm:text-2xl font-black italic uppercase leading-none tracking-tight text-primary">{currentRank.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold uppercase bg-white/20 px-1.5 rounded-sm">LVL. {level}</span>
              <span className="text-xs font-bold text-slate-300">{totalXP} Total XP</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="text-right border-l-2 border-white/20 pl-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">REKOR SURVIVAL</span>
            <div className="flex justify-end items-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-xl font-black">{highestSurvivalScore} <span className="text-xs">STREAK</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4 mt-6">
        <div className="h-12 w-12 bg-primary flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <Gamepad2 className="h-6 w-6 text-black" />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter italic">Kuis Sejarah</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Pilih Mode Permainan & Kumpulkan XP</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* START SCREEN - MODE SELECTION */}
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Classic Mode Card */}
              <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between items-center text-center space-y-6 hover:bg-[#F2F2F2]/50 transition-colors">
                <div className="h-20 w-20 bg-blue-100 border-2 border-black flex items-center justify-center rounded-full mb-2">
                  <Star className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Mode Klasik</h2>
                  <p className="text-sm font-bold text-slate-600">
                    Sesi santai. Jawab 10 pertanyaan trivia acak tanpa tekanan. Dapatkan 10 XP untuk setiap jawaban benar.
                  </p>
                </div>
                <button 
                  onClick={() => { soundEngine.playClick(); haptics.medium(); handleStartClassic(); }}
                  onMouseEnter={() => { soundEngine.playHover(); haptics.light(); }}
                  className="w-full bg-black text-white border-4 border-black px-6 py-4 text-lg font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--theme-primary)] active:translate-y-0 active:shadow-none transition-all"
                >
                  MAIN KLASIK (10 SOAL)
                </button>
              </div>

              {/* Survival Mode Card */}
              <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between items-center text-center space-y-6 hover:bg-[#F2F2F2]/50 transition-colors">
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 border border-black uppercase animate-pulse">
                  HARDCORE
                </div>
                <div className="h-20 w-20 bg-orange-100 border-2 border-black flex items-center justify-center rounded-full mb-2">
                  <Flame className="h-10 w-10 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-orange-600">Mode Survival</h2>
                  <p className="text-sm font-bold text-slate-600">
                    Bertahan selama mungkin! Anda hanya diberi <strong className="text-red-500">3 Nyawa</strong>. 1 Kesalahan = 1 Nyawa Hilang. 
                  </p>
                </div>
                <button 
                  onClick={() => { soundEngine.playClick(); haptics.medium(); handleStartSurvival(); }}
                  onMouseEnter={() => { soundEngine.playHover(); haptics.light(); }}
                  className="w-full bg-primary text-black border-4 border-black px-6 py-4 text-lg font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all"
                >
                  MAIN SURVIVAL
                </button>
              </div>
            </motion.div>
          )}

          {/* PLAYING SCREEN */}
          {(gameState === 'playing_classic' || gameState === 'playing_survival') && currentQuestion && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* HUD / Progress Bar */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-black text-white px-4 py-1 text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-black flex items-center gap-2">
                  {gameState === 'playing_classic' ? (
                    `SOAL ${currentQuestionIndex + 1} / ${activeQuestions.length}`
                  ) : (
                    <>
                      <Flame className="h-4 w-4 text-orange-500" />
                      STREAK: {score}
                    </>
                  )}
                </span>
                
                {gameState === 'playing_survival' ? (
                  <div className="bg-white border-2 border-black px-3 py-1 flex gap-1 shadow-[2px_2px_0px_0px_#000]">
                    {[1, 2, 3].map(heartIdx => (
                      <span key={heartIdx}>
                        {lives >= heartIdx ? (
                          <Heart className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" />
                        ) : (
                          <Heart className="h-5 w-5 text-slate-300" />
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="bg-white text-black px-4 py-1 text-sm font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    SKOR: {score}
                  </span>
                )}
              </div>
              
              {gameState === 'playing_classic' && (
                <div className="w-full bg-gray-200 border-2 border-black h-4 mb-8">
                  <div 
                    className="bg-primary h-full border-r-2 border-black transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>
              )}

              {/* Question Card */}
              <div className={`border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 mb-8 ${gameState === 'playing_survival' ? 'border-t-8 border-t-orange-500' : ''}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    +10 XP JIKA BENAR
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black leading-tight mb-8">
                  {currentQuestion.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    let btnClass = "bg-gray-100 hover:bg-gray-200";
                    if (isAnswered) {
                      if (idx === currentQuestion.correctAnswer) {
                        btnClass = "bg-primary text-black font-black scale-[1.02] border-black"; // Correct
                      } else if (idx === selectedOption) {
                        btnClass = "bg-[#EF4444] text-white font-black scale-[0.98] border-black"; // Wrong
                      } else {
                        btnClass = "bg-gray-100 opacity-50"; // Unchosen
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(idx)}
                        onMouseEnter={() => { if (!isAnswered) { soundEngine.playHover(); haptics.light(); } }}
                        className={`flex items-center p-4 border-4 border-black text-left font-bold text-lg transition-all ${!isAnswered ? 'hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none' : ''} ${btnClass}`}
                      >
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white font-black mr-4 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanatory Feedback Box */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`border-4 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isCorrect ? 'bg-primary/20' : 'bg-[#EF4444]/10'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-600" />
                        )}
                        <h4 className="text-xl font-black uppercase tracking-wider">
                          {isCorrect ? "Tepat Sekali! (+10 XP)" : "Jawaban Kurang Tepat"}
                        </h4>
                      </div>
                      <div className="pl-11">
                        <p className="text-sm font-black uppercase text-slate-500 mb-1">Fakta Sejarah:</p>
                        <p className="font-medium text-lg leading-relaxed text-slate-800">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                      {gameState === 'playing_survival' && !isCorrect && lives > 0 && (
                         <div className="mt-4 pt-4 border-t-2 border-red-200 text-red-600 font-black uppercase flex items-center gap-2">
                           ⚠️ HATI-HATI! SISA NYAWA: {lives}
                         </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => { soundEngine.playClick(); haptics.medium(); handleNext(); }}
                        onMouseEnter={() => { soundEngine.playHover(); haptics.light(); }}
                        className="bg-black text-white border-4 border-black px-8 py-3 text-lg font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--theme-primary)] active:translate-y-0 active:shadow-none transition-all"
                      >
                        {(gameState === 'playing_survival' && lives <= 0) || (gameState === 'playing_classic' && currentQuestionIndex >= activeQuestions.length - 1)
                          ? 'Lihat Hasil Akhir 🏆' 
                          : 'Pertanyaan Berikutnya ➔'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* RESULTS SCREEN */}
          {gameState === 'results' && (() => {
            const isSurvival = activeQuestions.length !== 10; // Simple check since survival length is variable
            const newRecord = isSurvival && score > highestSurvivalScore;
            const perfectClassic = !isSurvival && score === 10;
            const showConfetti = newRecord || perfectClassic || justLeveledUp;
            
            return (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 text-center relative overflow-visible"
              >
                {showConfetti && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                    <ConfettiExplosion 
                      force={0.8} 
                      duration={3000} 
                      particleCount={250} 
                      width={1600}
                      colors={['#00FF85', '#FF5722', '#FF00FF', '#FFEA00', '#3B82F6']} 
                    />
                  </div>
                )}
                {newRecord && (
                  <div className="absolute top-0 left-0 w-full bg-primary border-b-4 border-black py-2 font-black uppercase tracking-widest text-black animate-pulse z-10">
                    🔥 REKOR SURVIVAL BARU TERCIPTA! 🔥
                  </div>
                )}
                {justLeveledUp && !newRecord && (
                  <div className="absolute top-0 left-0 w-full bg-emerald-400 border-b-4 border-black py-2 font-black uppercase tracking-widest text-black animate-pulse z-10">
                    ⬆️ LEVEL UP! TEMA BARU MUNGKIN TERBUKA! ⬆️
                  </div>
                )}
                <div className={`w-32 h-32 mx-auto border-4 border-black flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 mt-8 relative z-20`} style={{ backgroundColor: currentRank.color }}>
                  {isSurvival && newRecord ? <Flame className="h-16 w-16 text-black" /> : <Trophy className="h-16 w-16 text-black" />}
                </div>
                
                <h2 className="text-2xl font-bold uppercase text-slate-500 tracking-widest mb-2">HASIL SESI INI</h2>
                <div className="text-7xl font-black italic tracking-tighter mb-2">
                  {score} <span className="text-4xl text-slate-300">
                    {isSurvival ? 'STREAK' : '/ 10'}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-2 mb-8 text-emerald-600 font-black text-xl">
                   <Zap className="h-6 w-6 fill-emerald-600" />
                   + {sessionXP} XP DITAMBAHKAN
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6 relative z-20">
                   <button 
                    onClick={() => { setJustLeveledUp(false); soundEngine.playClick(); haptics.medium(); handleStartClassic(); }}
                    onMouseEnter={() => { soundEngine.playHover(); haptics.light(); }}
                    className="flex items-center justify-center gap-2 bg-white text-black border-4 border-black px-6 py-4 font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <RotateCcw className="h-5 w-5" /> ULANG KLASIK
                  </button>
                  <button 
                    onClick={() => { setJustLeveledUp(false); soundEngine.playClick(); haptics.medium(); handleStartSurvival(); }}
                    onMouseEnter={() => { soundEngine.playHover(); haptics.light(); }}
                    className="flex items-center justify-center gap-2 bg-primary text-black border-4 border-black px-6 py-4 font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Flame className="h-5 w-5" /> ULANG SURVIVAL
                  </button>
                </div>

                <div className="flex justify-center relative z-20">
                  <button
                    onClick={handleShare}
                    onMouseEnter={() => { soundEngine.playHover(); haptics.light(); }}
                    className="flex items-center justify-center gap-2 bg-black text-white border-4 border-black px-8 py-4 font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Share2 className="h-5 w-5" /> BAGIKAN SKOR
                  </button>
                </div>
              </motion.div>
            );
          })()}
          
        </AnimatePresence>
      </div>
    </div>
  );
}
