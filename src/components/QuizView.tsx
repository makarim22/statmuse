import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, CheckCircle2, XCircle, RotateCcw, Trophy, Award } from "lucide-react";
import { quizQuestions, QuizQuestion } from "../data/quizData";
import { soundEngine } from "../utils/soundEngine";

export default function QuizView() {
  // Helper to get 10 random questions
  const getRandomQuestions = (count = 10): QuizQuestion[] => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => getRandomQuestions(10));
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === currentQuestion?.correctAnswer;

  const handleStart = () => {
    setActiveQuestions(getRandomQuestions(10));
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return; // Prevent changing answer
    setSelectedOption(index);
    if (index === currentQuestion?.correctAnswer) {
      setScore(prev => prev + 1);
      soundEngine.playSuccess();
    } else {
      soundEngine.playError();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setGameState('results');
    }
  };

  const getRank = (score: number) => {
    if (score >= 9) return { title: "Legenda Liga!", color: "#00FF85", desc: "Pengetahuan Anda tentang sejarah sepak bola Indonesia sangat luar biasa. Anda adalah kamus berjalan!" };
    if (score >= 6) return { title: "Pemain Inti", color: "#EAB308", desc: "Bagus! Anda cukup menguasai sejarah liga, meski masih ada beberapa momen yang terlewatkan." };
    if (score >= 4) return { title: "Pemain Cadangan", color: "#F97316", desc: "Lumayan, tapi Anda perlu lebih sering membaca arsip sejarah sepak bola nasional." };
    return { title: "Pemain Magang", color: "#EF4444", desc: "Sepertinya Anda baru mengikuti Liga Indonesia. Terus belajar dan cintai sepak bola lokal!" };
  };

  return (
    <div className="space-y-8 animate-fade-in" id="quiz_view">
      <title>Kuis Trivia Sejarah Sepak Bola Indonesia - Garuda Stats</title>
      <meta name="description" content="Uji wawasan sepak bola nasional Anda dengan kuis pilihan ganda interaktif mengenai sejarah PSSI, juara liga, dan Galatama." />
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
        <div className="h-12 w-12 bg-[#00FF85] flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <Gamepad2 className="h-6 w-6 text-black" />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter italic">Kuis Sejarah</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Uji Pengetahuan Sepak Bola Nasional Anda</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* START SCREEN */}
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 text-center"
            >
              <Award className="h-24 w-24 mx-auto mb-6 text-black" />
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">Tebak Sejarah!</h2>
              <p className="text-lg font-medium text-slate-600 mb-10 max-w-lg mx-auto">
                Seberapa jauh Anda mengenal sejarah Liga Indonesia? Jawab 10 pertanyaan trivia ini dan buktikan apakah Anda pantas menyandang status "Legenda".
              </p>
              <button 
                onClick={handleStart}
                className="bg-[#00FF85] text-black border-4 border-black px-12 py-4 text-xl font-black uppercase tracking-wider hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all"
              >
                Mulai Kuis
              </button>
            </motion.div>
          )}

          {/* PLAYING SCREEN */}
          {gameState === 'playing' && currentQuestion && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Score & Progress Bar */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-black text-white px-4 py-1 text-sm font-black uppercase tracking-widest border-2 border-black">
                  Soal {currentQuestionIndex + 1} / {activeQuestions.length}
                </span>
                <span className="bg-white text-black px-4 py-1 text-sm font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  Skor: {score}
                </span>
              </div>
              <div className="w-full bg-gray-200 border-2 border-black h-4 mb-8">
                <div 
                  className="bg-[#00FF85] h-full border-r-2 border-black transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 mb-8">
                <h3 className="text-2xl md:text-3xl font-black leading-tight mb-8">
                  {currentQuestion.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    let btnClass = "bg-gray-100 hover:bg-gray-200";
                    if (isAnswered) {
                      if (idx === currentQuestion.correctAnswer) {
                        btnClass = "bg-[#00FF85] text-black font-black scale-[1.02] border-black"; // Correct Answer
                      } else if (idx === selectedOption) {
                        btnClass = "bg-[#EF4444] text-white font-black scale-[0.98] border-black"; // Wrong Answer chosen
                      } else {
                        btnClass = "bg-gray-100 opacity-50"; // Unchosen
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(idx)}
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
                    <div className={`border-4 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isCorrect ? 'bg-[#00FF85]/20' : 'bg-[#EF4444]/10'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-600" />
                        )}
                        <h4 className="text-xl font-black uppercase tracking-wider">
                          {isCorrect ? "Tepat Sekali!" : "Jawaban Kurang Tepat"}
                        </h4>
                      </div>
                      <div className="pl-11">
                        <p className="text-sm font-black uppercase text-slate-500 mb-1">Fakta Sejarah:</p>
                        <p className="font-medium text-lg leading-relaxed text-slate-800">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={handleNext}
                        className="bg-black text-white border-4 border-black px-8 py-3 text-lg font-black uppercase tracking-wider hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#00FF85] active:translate-y-0 active:shadow-none transition-all"
                      >
                        {currentQuestionIndex < activeQuestions.length - 1 ? 'Pertanyaan Berikutnya ➔' : 'Lihat Hasil Akhir 🏆'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* RESULTS SCREEN */}
          {gameState === 'results' && (() => {
            const rank = getRank(score);
            return (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 text-center"
              >
                <div className="w-32 h-32 mx-auto border-4 border-black flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-3" style={{ backgroundColor: rank.color }}>
                  <Trophy className="h-16 w-16 text-black" />
                </div>
                
                <h2 className="text-2xl font-bold uppercase text-slate-500 tracking-widest mb-2">Skor Akhir Anda</h2>
                <div className="text-7xl font-black italic tracking-tighter mb-6">
                  {score} <span className="text-4xl text-slate-300">/ {activeQuestions.length}</span>
                </div>
                
                <div className="bg-gray-100 border-4 border-black p-6 mb-10 max-w-md mx-auto">
                  <p className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">Status Pengetahuan</p>
                  <h3 className="text-3xl font-black uppercase text-black mb-4" style={{ color: rank.color === '#00FF85' ? '#059669' : rank.color }}>
                    {rank.title}
                  </h3>
                  <p className="font-medium text-slate-700">
                    {rank.desc}
                  </p>
                </div>

                <button 
                  onClick={handleStart}
                  className="flex items-center justify-center gap-3 bg-black text-white border-4 border-black px-10 py-4 text-xl font-black uppercase tracking-wider mx-auto hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#00FF85] active:translate-y-0 active:shadow-none transition-all"
                >
                  <RotateCcw className="h-6 w-6" /> Main Lagi
                </button>
              </motion.div>
            );
          })()}
          
        </AnimatePresence>
      </div>
    </div>
  );
}
