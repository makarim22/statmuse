import React, { useState } from "react";

interface ClubShieldProps {
  symbol: 'tiger' | 'crocodile' | 'mountain' | 'flame' | 'pearl' | 'ship' | 'leaf' | 'barong' | 'lion' | 'trident' | 'lightning' | 'wings' | 'claws' | 'horn' | 'monument' | 'sword' | 'star' | 'roof' | string;
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
