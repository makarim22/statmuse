import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MapPin, Award, ShieldAlert, Sparkles, BookOpen, Copy, Check, Download } from "lucide-react";
import { ClubMetadata } from "../data/clubMetadata";
import ClubShield from "./ClubShield";
import { copyStatCardToClipboard } from "../utils/exportUtils";
import { soundEngine } from "../utils/soundEngine";
import { downloadCardAsImage } from "../utils/imageExport";
import ShareableClubCard from "./ShareableClubCard";

interface ClubDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: {
    name: string;
    titles: number;
    runnerUps: number;
    seasonsWon: string[];
    historicalNames: string[];
    amatirTitles?: number;
    amatirSeasonsWon?: string[];
  } | null;
  metadata: ClubMetadata | null;
  onAskAI: (query: string) => void;
}

export default function ClubDetailModal({ isOpen, onClose, club, metadata, onAskAI }: ClubDetailModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      soundEngine.playThud();
    }
  }, [isOpen]);

  if (!isOpen || !club) return null;

  // Primary colors fallback fallback if not matched in metadata list
  const primaryBg = metadata?.colors.primary || "#F2F2F2";
  const secondaryBg = metadata?.colors.secondary || "#1A1A1A";
  const textCol = metadata?.colors.text || "#1A1A1A";
  const borderCol = metadata?.colors.border || "#1A1A1A";

  const handleAskHistoryAI = () => {
    onAskAI(`Bagaimana sejarah lengkap kejayaan klub ${club.name} (${metadata?.nickname || ""}) dan daftar pilar penting prestasinya?`);
    onClose();
  };

  const handleCopyStatCard = async () => {
    const success = await copyStatCardToClipboard(club);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownloadImage = () => {
    const elementId = `shareable-club-${club.name.replace(/\s+/g, '-')}`;
    downloadCardAsImage(elementId, `GarudaStats-${club.name.replace(/\s+/g, '')}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="club_detail_modal_container">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Sheet box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[90vh] overflow-y-auto"
        >
          <title>{`${club.name} (${metadata?.nickname || ""}) - Sejarah Klub - Garuda Stats`}</title>
          <meta name="description" content={`Informasi sejarah lengkap klub ${club.name}, perolehan ${club.titles} trofi era profesional, dan ${club.amatirTitles || 0} trofi Perserikatan.`} />
          {/* Close button top corner */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 bg-black text-white hover:bg-[#00FF85] hover:text-black hover:border-black border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00FF85]"
            title="Tutup Detail"
            aria-label="Tutup detail"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header layout matching brand visual identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b-4 border-black" id="modal_banner_header">
            {/* Elegant shield vector wrapper */}
            <div className="h-24 w-24 border-4 border-black bg-white flex items-center justify-center shrink-0 p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {metadata ? (
                <ClubShield 
                  symbol={metadata.emblemSymbol} 
                  primaryColor={metadata.colors.primary} 
                  secondaryColor={metadata.colors.secondary} 
                  className="h-full w-full"
                  clubName={club.name}
                  logoUrl={metadata.logoUrl}
                />
              ) : (
                <div className="h-16 w-16 bg-neutral-200" />
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-black tracking-widest bg-black text-[#00FF85] px-2.5 py-0.5 uppercase inline-block">
                KONTRIBUTOR SEJARAH LIGA ID
              </span>
              <h3 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase leading-none">
                {club.name}
              </h3>
              {club.historicalNames.length > 0 && (
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Dahulu dikenal: {club.historicalNames.join(", ")}
                </p>
              )}
            </div>
          </div>

          {/* Inner content scrollable sheet */}
          <div className="py-6 space-y-6" id="modal_body_scrollable">
            {/* Badges/Technical summary metadata block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Home base / City */}
              <div className="flex items-center gap-3 p-4 bg-[#F2F2F2] border-2 border-black">
                <div className="h-10 w-10 bg-white border-2 border-black flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-black" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-500 leading-none block">KOTA ASAL / MARKA</span>
                  <p className="text-sm font-black uppercase text-black italic mt-0.5">{metadata?.city || club.name}</p>
                </div>
              </div>

              {/* Founded year & Nickname */}
              <div className="flex items-center gap-3 p-4 bg-[#F2F2F2] border-2 border-black">
                <div className="h-10 w-10 bg-[#00FF85] border-2 border-black flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-black" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-500 leading-none block font-sans">TAHUN BERDIRI</span>
                  <p className="text-sm font-black text-black font-mono mt-0.5">{metadata?.founded ? `${metadata.founded} M` : "-"}</p>
                </div>
              </div>

            </div>

            {/* General Description section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">RINGKASAN SEJARAH KLUB</span>
              </div>
              <div className="p-5 bg-white border-2 border-black text-sm text-[#1A1A1A] font-medium leading-relaxed font-sans shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {metadata?.description || `Klub ${club.name} merupakan tim perserikatan bersejarah tinggi yang tercatat dalam kontribusi olahraga nasional.`}
              </div>
            </div>

            {/* Titles Statistics visual row */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Professional era champion counting */}
              <div className="p-4 bg-emerald-50 border-2 flex flex-col justify-between relative overflow-hidden" style={{ borderColor: '#1A1A1A' }}>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">GELAR ERA PROFESIONAL</span>
                  <p className="text-[9px] font-bold text-slate-500">Liga Indonesia 1994/95 + ISL + Liga 1</p>
                </div>
                <div className="text-4xl font-mono font-black italic mt-4 flex items-baseline gap-1" style={{ color: metadata?.colors.primary || '#10B981' }}>
                  {club.titles}
                  <span className="text-xs font-bold font-sans uppercase">Trofi</span>
                </div>
                {(club.amatirTitles ?? 0) > 0 && (
                  <div className="mt-2 pt-2 border-t border-dashed border-black/20">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block">+ Amatir Perserikatan (Info Tambahan)</span>
                    <span className="text-sm font-mono font-black text-slate-600">{club.amatirTitles} Trofi</span>
                  </div>
                )}
              </div>

              {/* Tally of runner up finishes */}
              <div className="p-4 bg-amber-50 border-2 flex flex-col justify-between relative overflow-hidden" style={{ borderColor: '#1A1A1A' }}>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-800 font-sans">RUNNER-UP (2ND)</span>
                  <p className="text-xs font-bold text-slate-500">Peringkat Dua Terakhir</p>
                </div>
                <div className="text-4xl font-mono font-black italic mt-4 text-amber-700 flex items-baseline gap-1">
                  {club.runnerUps}
                  <span className="text-xs font-bold font-sans uppercase">Kali</span>
                </div>
              </div>

            </div>

            {/* List of concrete Seasons won with visual badges */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">GELAR ERA PROFESIONAL:</span>
              <div className="flex flex-wrap gap-2">
                {club.seasonsWon.length > 0 ? (
                  club.seasonsWon.map((yr, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 text-xs font-mono font-bold border-2 border-black bg-[#00FF85] uppercase tracking-tight text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Award className="h-3 w-3 shrink-0 text-black" />
                      {yr}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-bold text-stone-500 italic">Belum mencatatkan kemenangan di era profesional</span>
                )}
              </div>
            </div>

            {/* Amateur Perserikatan titles - shown as supplementary info */}
            {(club.amatirTitles ?? 0) > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">GELAR ERA AMATIR PERSERIKATAN (1930-1994) — INFO TAMBAHAN:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(club.amatirSeasonsWon ?? []).map((yr, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 text-xs font-mono font-bold border border-black/40 bg-slate-100 uppercase tracking-tight text-slate-600 flex items-center gap-1"
                    >
                      <Award className="h-3 w-3 shrink-0 text-slate-400" />
                      {yr}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row at bottom */}
          <div className="pt-6 border-t-2 border-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" id="modal_footer_actions">
            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-black font-black text-[10px] sm:text-xs uppercase hover:bg-neutral-100 cursor-pointer text-center duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
            >
              Kembali
            </button>
            <button
              onClick={handleCopyStatCard}
              className="w-full py-3 border-2 border-black font-black text-[10px] sm:text-xs uppercase hover:bg-[#00FF85] cursor-pointer text-center duration-150 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
            >
              {copySuccess ? (
                <>
                  <Check className="h-4 w-4 shrink-0" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 shrink-0" />
                  Salin Teks
                </>
              )}
            </button>
            <button
              onClick={handleDownloadImage}
              className="w-full py-3 border-2 border-black font-black text-[10px] sm:text-xs uppercase hover:bg-rose-400 hover:text-white cursor-pointer text-center duration-150 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
            >
              <Download className="h-4 w-4 shrink-0" />
              Download Kartu
            </button>
            <button
              onClick={handleAskHistoryAI}
              className="w-full py-3 bg-black hover:bg-[#00FF85] hover:text-black hover:border-black text-white border-2 border-black font-black text-[10px] sm:text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00FF85]"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-[#00FF85] animate-pulse" />
              Tanya AI
            </button>
          </div>

          {/* Off-screen Render Target for the PNG Download */}
          <ShareableClubCard 
            clubName={club.name}
            titles={club.titles}
            runnerUps={club.runnerUps}
            primaryColor={primaryBg}
            secondaryColor={secondaryBg}
            symbol={metadata?.emblemSymbol || "star"}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
