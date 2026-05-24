import React, { useState } from "react";
import AremaLogo from "./logos/AremaLogo";
import BaliUnitedLogo from "./logos/BaliUnitedLogo";
import BhayangkaraLogo from "./logos/BhayangkaraLogo";
import BorneoFcLogo from "./logos/BorneoFcLogo";
import DewaUnitedLogo from "./logos/DewaUnitedLogo";
import MaduraUnitedLogo from "./logos/MaduraUnitedLogo";
import MalutUnitedLogo from "./logos/MalutUnitedLogo";
import PersebayaSurabayaLogo from "./logos/PersebayaSurabayaLogo";
import PersijaJakartaLogo from "./logos/PersijaJakartaLogo";
import PersijapJeparaLogo from "./logos/PersijapJeparaLogo";
import PersikKediriLogo from "./logos/PersikKediriLogo";
import PersisSoloLogo from "./logos/PersisSoloLogo";
import PersitaTangerangLogo from "./logos/PersitaTangerangLogo";
import PsbsBiakLogo from "./logos/PsbsBiakLogo";
import PsimYogyakartaLogo from "./logos/PsimYogyakartaLogo";
import PsmMakassarLogo from "./logos/PsmMakassarLogo";
import SemenPadangLogo from "./logos/SemenPadangLogo";

interface ClubShieldProps {
  symbol: 'tiger' | 'crocodile' | 'mountain' | 'flame' | 'pearl' | 'ship' | 'leaf' | 'barong' | 'lion' | 'trident' | 'lightning' | 'wings' | 'claws' | 'horn' | 'monument' | 'sword' | 'star' | 'roof' | 'wave' | 'shield' | 'persib' | 'arema' | 'bali-united' | 'bhayangkara' | 'borneo-fc' | 'dewa-united' | 'madura-united' | 'malut-united' | 'persebaya-surabaya' | 'persija-jakarta' | 'persijap-jepara' | 'persik-kediri' | 'persis-solo' | 'persita-tangerang' | 'psbs-biak' | 'psim-yogyakarta' | 'psm-makassar' | 'semen-padang' | string;
  primaryColor: string;
  secondaryColor: string;
  className?: string;
  clubName?: string;
  logoUrl?: string;
}

export default function ClubShield({ symbol, primaryColor, secondaryColor, className = "h-16 w-16", clubName, logoUrl }: ClubShieldProps) {
  const [hasImageError, setHasImageError] = useState(false);

  // Generate a standard slug path (e.g., "persija-jakarta" -> "/logos/persija-jakarta.png")
  const getSlug = (name?: string) => {
    if (!name) return "";
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const slug = getSlug(clubName);
  const localImgPath = slug ? `/logos/${slug}.png` : "";

  // Prefer explicit online/configured logoUrl, fallback to standard local logo filename, then to SVG
  const activeImgSrc = logoUrl || localImgPath;
  const tryToRenderImage = activeImgSrc && !hasImageError;

  if (tryToRenderImage) {
    return (
      <div 
        className={`${className} bg-white border-2 border-black flex items-center justify-center p-1.5 overflow-hidden select-none relative group transform duration-150 hover:scale-105 shadow-[2px_2px_0px_0px_rgba(1,0,0,1)]`}
        title={clubName}
      >
        {/* Color hue accent as a backdrop */}
        <div 
          className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-15" 
          style={{ backgroundColor: primaryColor }}
        />
        <img 
          src={activeImgSrc}
          alt={clubName || "Lambang Klub"}
          className="h-full w-full object-contain relative z-10 max-h-full max-w-full"
          onError={() => setHasImageError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Build a beautiful neo-brutalist vectorized shield in JSX
  const renderSymbolContent = () => {
    switch (symbol) {
      case "tiger":
        return (
          <>
            {/* Tiger Stripes */}
            <path d="M15 35 Q30 30 45 42 M10 50 Q28 45 50 55 M15 65 Q32 60 45 75" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M85 35 Q70 30 55 42 M90 50 Q72 45 50 55 M85 65 Q68 60 55 75" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="48" r="8" fill="#1A1A1A" />
          </>
        );
      case "crocodile":
        return (
          <>
            {/* Croc Jaw Teeth */}
            <path d="M30 40 L40 50 L50 40 L60 50 L70 40" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <path d="M30 65 L40 55 L50 65 L60 55 L70 65" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <path d="M25 50 H75" stroke={secondaryColor} strokeWidth="3" />
          </>
        );
      case "mountain":
        return (
          <>
            {/* Mountain Peaks (Bandung) */}
            <polygon points="50,30 25,75 75,75" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
            <polygon points="50,42 35,75 65,75" fill={primaryColor} stroke="#1A1A1A" strokeWidth="2" />
            <path d="M20 75 Q50 68 80 75" stroke="#1A1A1A" strokeWidth="4" fill="none" />
          </>
        );
      case "flame":
        return (
          <>
            {/* Fire tongues (Sambernyawa) */}
            <path d="M50 25 C55 38 70 48 70 62 C70 75 61 82 50 82 C39 82 30 75 30 62 C30 48 45 38 50 25 Z" fill="#FFEB3B" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M50 40 C53 48 62 55 62 65 C62 72 57 77 50 77 C43 77 38 72 38 65 C38 55 47 48 50 40 Z" fill="#FF5252" />
          </>
        );
      case "pearl":
        return (
          <>
            {/* Glowing pearl round on red/black striped background */}
            <line x1="50" y1="20" x2="50" y2="80" stroke="#1A1A1A" strokeWidth="6" />
            <circle cx="50" cy="50" r="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="4" />
            <circle cx="46" cy="46" r="5" fill="#E6F4EA" />
          </>
        );
      case "ship":
        return (
          <>
            {/* Sails / Phinisi ship */}
            <path d="M50 20 V75 M25 55 L50 25 L75 55 Z" fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
            <path d="M20 62 Q50 75 80 62 L75 75 H25 Z" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
          </>
        );
      case "leaf":
        return (
          <>
            {/* Tobacco Leaf style */}
            <path d="M50 20 C25 40 40 75 50 80 C60 75 75 40 50 20 Z" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="4" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="#1A1A1A" strokeWidth="3" />
            <line x1="50" y1="40" x2="35" y2="35" stroke="#1A1A1A" strokeWidth="2.5" />
            <line x1="50" y1="50" x2="65" y2="45" stroke="#1A1A1A" strokeWidth="2.5" />
            <line x1="50" y1="60" x2="33" y2="58" stroke="#1A1A1A" strokeWidth="2.5" />
          </>
        );
      case "barong":
        return (
          <>
            {/* Barong wild eyes & mask geometric */}
            <rect x="25" y="32" width="50" height="30" fill="none" stroke="#1A1A1A" strokeWidth="4" />
            <circle cx="38" cy="47" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="38" cy="47" r="2" fill="#000" />
            <circle cx="62" cy="47" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="62" cy="47" r="2" fill="#000" />
            <path d="M40 70 L45 74 L50 70 L55 74 L60 70" stroke="#1A1A1A" strokeWidth="3.5" fill="none" />
          </>
        );
      case "lion":
        return (
          <>
            {/* Lion Mane/Wild Hair */}
            <circle cx="50" cy="50" r="20" fill="none" stroke="#1A1A1A" strokeWidth="4" />
            <path d="M42 42 L30 30 M58 42 L70 30 M50 35 V20 M35 50 H20 M65 50 H80 M38 58 L28 70 M62 58 L72 70" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="50" r="8" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="2" />
          </>
        );
      case "trident":
        return (
          <>
            {/* Poseidon Trident prongs */}
            <path d="M35 30 V50 C35 60 65 60 65 50 V30 M50 20 V80" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M32 30 H38 M62 30 H68 M47 20 H53" stroke="#1A1A1A" strokeWidth="4" />
          </>
        );
      case "lightning":
        return (
          <>
            {/* Retro 90s lightning bolt */}
            <polygon points="60,20 25,52 48,52 40,82 75,50 52,50" fill="#FFEB3B" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
          </>
        );
      case "wings":
        return (
          <>
            {/* Golden wings spread */}
            <path d="M50 35 C32 35 20 45 15 65 C25 65 32 55 50 48" fill="none" stroke="#1A1A1A" strokeWidth="4" />
            <path d="M50 35 C68 35 80 45 85 65 C75 65 68 55 50 48" fill="none" stroke="#1A1A1A" strokeWidth="4" />
            <path d="M18 53 C28 53 35 48 50 43 M82 53 C72 53 65 48 50 43" stroke="#1A1A1A" strokeWidth="3" />
            <polygon points="50,30 42,70 50,78 58,70" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="3" />
          </>
        );
      case "claws":
        return (
          <>
            {/* Claws / Tiger slashes */}
            <path d="M30 30 C35 45 32 60 22 75 M50 25 C55 45 50 65 40 80 M70 30 C75 45 72 60 62 75" stroke="#FFF" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 30 C35 45 32 60 22 75 M50 25 C55 45 50 65 40 80 M70 30 C75 45 72 60 62 75" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
          </>
        );
      case "horn":
        return (
          <>
            {/* Kebo Giras Crescent horns */}
            <path d="M25 45 Q50 28 75 45 Q50 62 25 45" fill="none" stroke="#1A1A1A" strokeWidth="4" />
            <path d="M20 40 Q50 15 80 40 Q50 50 20 40" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="50" cy="55" r="8" fill="#1A1A1A" />
          </>
        );
      case "monument":
        return (
          <>
            {/* DIY Jogja Tugu monument */}
            <polygon points="50,22 45,30 55,30" fill="#1A1A1A" />
            <rect x="44" y="30" width="12" height="35" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="3.5" />
            <rect x="36" y="65" width="28" height="12" fill="#1A1A1A" />
            <line x1="50" y1="30" x2="50" y2="65" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="3,3" />
          </>
        );
      case "sword":
        return (
          <>
            {/* Rencong cross dagger */}
            <path d="M50 20 L50 70 M30 35 H70" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
            <path d="M45 20 L50 15 L55 20 M30 30 L25 35 L30 40 M70 30 L75 35 L70 40" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="50" cy="45" r="6" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="2.5" />
          </>
        );
      case "star":
        return (
          <>
            {/* Security solid multi-star */}
            <polygon points="50,18 59,38 80,38 63,51 69,72 50,59 31,72 37,51 20,38 41,38" fill="#FFD700" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
          </>
        );
      case "roof":
        return (
          <>
            {/* Curved Rumah Gadang twin roofs */}
            <path d="M15 45 Q50 30 85 45 L70 65 H30 Z" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
            <path d="M50 35 V65" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="50" cy="52" r="6" fill="#1A1A1A" />
          </>
        );
      case "wave":
        return (
          <>
            {/* Marine waves for Pesut Etam (Borneo) */}
            <path d="M25 40 Q37.5 30 50 40 T75 40" stroke="#1A1A1A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M25 54 Q37.5 44 50 54 T75 54" stroke="#1A1A1A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M25 68 Q37.5 58 50 68 T75 68" stroke="#1A1A1A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </>
        );
      case "shield":
        return (
          <>
            {/* Nest-styled central metal defense crest */}
            <path d="M35 35 H65 V55 C65 65 50 72 50 72 C50 72 35 65 35 55 Z" fill={secondaryColor} stroke="#1A1A1A" strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="50" cy="48" r="4" fill="#1A1A1A" />
          </>
        );
      case "arema":
        return <AremaLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "bali-united":
        return <BaliUnitedLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "bhayangkara":
        return <BhayangkaraLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "borneo-fc":
        return <BorneoFcLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "dewa-united":
        return <DewaUnitedLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "madura-united":
        return <MaduraUnitedLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "malut-united":
        return <MalutUnitedLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persebaya-surabaya":
        return <PersebayaSurabayaLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persija-jakarta":
        return <PersijaJakartaLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persijap-jepara":
        return <PersijapJeparaLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persik-kediri":
        return <PersikKediriLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persis-solo":
        return <PersisSoloLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persita-tangerang":
        return <PersitaTangerangLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "psbs-biak":
        return <PsbsBiakLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "psim-yogyakarta":
        return <PsimYogyakartaLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "psm-makassar":
        return <PsmMakassarLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "semen-padang":
        return <SemenPadangLogo x="25" y="25" width="50" height="50" primaryColor={primaryColor} secondaryColor={secondaryColor} borderColor="#1A1A1A" />;
      case "persib":
        return (
          <g transform="translate(30, 20) scale(0.055)">
            {/* Stars */}
            <g fill={secondaryColor} stroke="#1A1A1A" strokeWidth="20" strokeLinejoin="round">
              <polygon points="106.27 24.94 124.69 82.16 184.6 82.06 136.04 117.27 154.67 174.38 106.27 138.96 57.87 174.38 76.5 117.27 28 82.06 87.9 82.16 106.27 24.94"/>
              <polygon points="271.09 0 289.51 57.22 349.42 57.12 300.86 92.33 319.49 149.44 271.09 114.02 222.69 149.44 241.32 92.33 192.82 57.12 252.72 57.22 271.09 0"/>
              <polygon points="455.56 0 473.98 57.22 533.88 57.11 485.32 92.32 503.96 149.44 455.56 114.01 407.15 149.44 425.79 92.32 377.28 57.11 437.18 57.22 455.56 0"/>
              <polygon points="620.39 24.94 638.82 82.16 698.72 82.06 650.16 117.27 668.8 174.38 620.39 138.96 571.99 174.38 590.63 117.27 542.12 82.06 602.02 82.16 620.39 24.94"/>
            </g>
            
            {/* Outer and Inner Shield */}
            <path fill="#1A1A1A" d="M32.37,264.48q146.58-35,331-35.74,184.41.8,331,35.74c20.13,4.38,31.85,22.45,32.38,37.33V715.65c0,201.21-162.53,364.35-363.06,364.35h-.6C162.6,1080,0,916.86,0,715.65V301.81c.53-14.88,12.25-32.95,32.37-37.33Z"/>
            <path fill={secondaryColor} stroke="#1A1A1A" strokeWidth="20" d="M713.28,314.36l-.6,399.69c0,194.7-155,350.74-349,350.74h-.53c-194,0-349-156-349-350.74l-.66-399.69C12.78,290.12,21.85,280,43.1,275.7c96.52-18.6,193.18-31.22,320.29-32.88,127.05,1.66,223.71,14.28,320.3,32.88C704.87,280,713.94,290.12,713.28,314.36Z"/>
            
            {/* PERSIB Text Bar */}
            <polygon fill="#1A1A1A" points="168.82 672.8 251.24 672.8 251.24 639.79 323.07 639.79 323.07 672.8 363.39 672.8 403.71 672.8 403.71 639.79 475.48 639.79 475.48 672.8 557.97 672.8 557.97 639.79 629.73 639.79 629.73 672.8 698.71 672.8 698.71 736.71 363.39 736.71 28 736.71 28 672.8 96.99 672.8 96.99 639.79 168.82 639.79 168.82 672.8"/>
            
            {/* Top Yellow area (Brutalist colored) */}
            <path fill="#FACC15" stroke="#1A1A1A" strokeWidth="15" d="M698.72,315.43V659.12H643.43v-26a7,7,0,0,0-6.81-7H551.08a7,7,0,0,0-6.82,7v26H489.18v-26a7,7,0,0,0-6.82-7H396.89a7,7,0,0,0-6.88,7v26h-53.3v-26a7,7,0,0,0-6.81-7H244.43a7,7,0,0,0-6.82,7v26H182.46v-26a7,7,0,0,0-6.82-7H90.17a7,7,0,0,0-6.82,7v26H28V315.43c0-24.58,4.31-20.14,24.43-26.51,93.81-16.35,187.3-30.62,311-31,123.6.4,217.09,14.67,311,31C694.41,295.29,698.72,290.85,698.72,315.43Z"/>
            
            {/* Mountain */}
            <path fill="#16A34A" stroke="#1A1A1A" strokeWidth="15" d="M643.44,633.15a7,7,0,0,0-6.82-7H551.08a7,7,0,0,0-6.82,7v26H489.18v-26a7,7,0,0,0-6.82-7H396.89a7.05,7.05,0,0,0-6.88,7v26h-53.3v-26a7,7,0,0,0-6.82-7H244.43a7,7,0,0,0-6.82,7v26H182.46v-26a7,7,0,0,0-6.82-7H90.17a7,7,0,0,0-6.82,7v26H28l70-98.65.06-.06c7.75-10.9,13.18-14.15,29.93-14.15H598.68c16.75,0,22.18,3.25,29.93,14.15l.06.06,70,98.65H643.44Z"/>
            
            {/* Waves */}
            <g fill={primaryColor} stroke="#1A1A1A" strokeWidth="15">
              <path d="M644.76,754.37a18.18,18.18,0,0,0-11.26,0l-81,25.65a17.27,17.27,0,0,1-11.25,0L461,754.24a17.69,17.69,0,0,0-11.26,0l-81,25.64a20.35,20.35,0,0,1-5.37.93,19.43,19.43,0,0,1-5.36-.93l-81-25.64a17.69,17.69,0,0,0-11.26,0L185.5,780a17.26,17.26,0,0,1-11.25,0l-81-25.65a18.18,18.18,0,0,0-11.26,0L32,770.45a303,303,0,0,0,7.22,32.82L82,789.51a17.69,17.69,0,0,1,11.26,0l81,25.65a17.66,17.66,0,0,0,11.25,0l80.24-25.78a17.69,17.69,0,0,1,11.26,0L358,815a19.43,19.43,0,0,0,5.36.93,20.35,20.35,0,0,0,5.37-.93l81-25.64a17.69,17.69,0,0,1,11.26,0l80.24,25.78a17.67,17.67,0,0,0,11.25,0l81-25.65a17.69,17.69,0,0,1,11.26,0l42.77,13.76c3-10.9,5.36-21.86,7.21-32.82ZM357.37,780l-81.5-25.78a2.49,2.49,0,0,1,.66.13l81.57,25.84C357.83,780.15,357.63,780.08,357.37,780Zm12,0-.47.13,81.31-25.78a3.18,3.18,0,0,1,.66-.13Z"/>
              <path d="M357.76,851.23l-81-25.65a17.66,17.66,0,0,0-11.25,0l-80.24,25.78a17.22,17.22,0,0,1-11.26,0L93,825.72a18.08,18.08,0,0,0-11.25,0L50.05,835.88a331.67,331.67,0,0,0,13.84,30.69l17.81-5.71a17.52,17.52,0,0,1,11.25,0l81,25.64a17.69,17.69,0,0,0,11.26,0l80.24-25.78a17.66,17.66,0,0,1,11.25,0l81,25.65a22.65,22.65,0,0,0,5.63.93,23.1,23.1,0,0,0,5.63-.93l81-25.65a17.66,17.66,0,0,1,11.25,0l80.24,25.78a17.7,17.7,0,0,0,11.26,0l81-25.64a17.52,17.52,0,0,1,11.25,0l17.81,5.71a334.34,334.34,0,0,0,13.84-30.69L645,825.72a18.08,18.08,0,0,0-11.25,0l-81,25.64a17.23,17.23,0,0,1-11.26,0l-80.24-25.78a17.66,17.66,0,0,0-11.25,0l-81,25.65a20.17,20.17,0,0,1-5.63.93,19.83,19.83,0,0,1-5.63-.93Z"/>
              <path d="M357.76,922.57l-81-25.64a17.59,17.59,0,0,0-11.25,0L185.24,922.7a17.62,17.62,0,0,1-11.26,0L93,897.06a17.89,17.89,0,0,0-11.19,0,346.2,346.2,0,0,0,31.65,41.65L174,957.84a17.62,17.62,0,0,0,11.26,0l80.24-25.77a17.13,17.13,0,0,1,11.25,0l81,25.64a22.2,22.2,0,0,0,5.63.93,22.63,22.63,0,0,0,5.63-.93l81-25.64a17.13,17.13,0,0,1,11.25,0l80.24,25.77a17.63,17.63,0,0,0,11.26,0l60.57-19.13A339.56,339.56,0,0,0,645,897.06a18.08,18.08,0,0,0-11.25,0l-81,25.64a17.63,17.63,0,0,1-11.26,0l-80.24-25.77a17.59,17.59,0,0,0-11.25,0l-81,25.64a19.81,19.81,0,0,1-5.63.93,19.48,19.48,0,0,1-5.63-.93Z"/>
              <path d="M357.76,993.91l-81-25.64a17.59,17.59,0,0,0-11.25,0L185.24,994a17.2,17.2,0,0,1-7.09.87,335.77,335.77,0,0,0,41,23.38l46.35-14.88a17.13,17.13,0,0,1,11.25,0l81,25.57a17.36,17.36,0,0,0,5.63.93A17.62,17.62,0,0,0,369,1029l81-25.57a17.13,17.13,0,0,1,11.25,0l46.41,14.88a334.11,334.11,0,0,0,40.91-23.38,17.13,17.13,0,0,1-7.08-.87l-80.24-25.77a17.59,17.59,0,0,0-11.25,0l-81,25.64a19.81,19.81,0,0,1-5.63.93,19.48,19.48,0,0,1-5.63-.93Z"/>
            </g>
          </g>
        );
      default:
        return (
          <circle cx="50" cy="50" r="16" fill="#1A1A1A" />
        );
    }
  };

  return (
    <svg 
      className={`${className} transform duration-150 hover:scale-105 select-none`}
      viewBox="0 0 100 100" 
      width="100%" 
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Shield Shell */}
      <path 
        d="M15 15 H85 V60 C85 75 55 90 50 92 C45 90 15 75 15 60 Z" 
        fill={primaryColor} 
        stroke="#1A1A1A" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      {/* Subtle Inner Nest Border */}
      <path 
        d="M22 22 H78 V58 C78 70 53 82 50 84 C47 82 22 70 22 58 Z" 
        fill="none" 
        stroke="#1A1A1A" 
        strokeWidth="2" 
        strokeDasharray="4,4"
        opacity="0.65"
      />
      {renderSymbolContent()}
    </svg>
  );
}
