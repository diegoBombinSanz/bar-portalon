"use client";

import { useState } from "react";

export const ALLERGENS = {
  gluten: {
    id: "gluten",
    emoji: "🌾",
    label: "Gluten",
    description: "Cereales con gluten (trigo, centeno, cebada, avena...)",
  },
  crustaceos: {
    id: "crustaceos",
    emoji: "🦐",
    label: "Crustáceos",
    description: "Cangrejo, gamba, langosta, langostino...",
  },
  huevos: {
    id: "huevos",
    emoji: "🥚",
    label: "Huevo",
    description: "Huevo y productos derivados",
  },
  pescado: {
    id: "pescado",
    emoji: "🐟",
    label: "Pescado",
    description: "Pescado y productos a base de pescado",
  },
  cacahuetes: {
    id: "cacahuetes",
    emoji: "🥜",
    label: "Cacahuete",
    description: "Cacahuetes y productos a base de cacahuetes",
  },
  soja: {
    id: "soja",
    emoji: "🌱",
    label: "Soja",
    description: "Soja y productos a base de soja",
  },
  lacteos: {
    id: "lacteos",
    emoji: "🥛",
    label: "Lácteos",
    description: "Leche y sus derivados (incluida la lactosa)",
  },
  frutos_cascara: {
    id: "frutos_cascara",
    emoji: "🌰",
    label: "Frutos secos",
    description: "Almendras, avellanas, nueces, anacardos, pistachos...",
  },
  apio: {
    id: "apio",
    emoji: "🌿",
    label: "Apio",
    description: "Apio y productos derivados",
  },
  mostaza: {
    id: "mostaza",
    emoji: "🟡",
    label: "Mostaza",
    description: "Mostaza y productos derivados",
  },
  sesamo: {
    id: "sesamo",
    emoji: "✳️",
    label: "Sésamo",
    description: "Granos de sésamo y productos a base de sésamo",
  },
  sulfitos: {
    id: "sulfitos",
    emoji: "🍷",
    label: "Sulfitos",
    description: "Dióxido de azufre y sulfitos (concentración > 10 mg/kg)",
  },
  altramuces: {
    id: "altramuces",
    emoji: "🫘",
    label: "Altramuces",
    description: "Altramuces y productos a base de altramuces",
  },
  moluscos: {
    id: "moluscos",
    emoji: "🦑",
    label: "Moluscos",
    description: "Mejillones, ostras, calamares, almejas...",
  },
} as const;

export type AllergenKey = keyof typeof ALLERGENS;

interface AllergenBadgeProps {
  allergenKey: AllergenKey;
  size?: "sm" | "md";
}

function AllergenBadge({
  allergenKey,
  size = "md",
}: AllergenBadgeProps) {
  const [open, setOpen] = useState(false);

  const a = ALLERGENS[allergenKey];
  if (!a) return null;

  const sizes = {
    sm: {
      pill: "px-2 py-0.5 text-[10px] gap-1",
      emoji: "text-[11px]",
    },
    md: {
      pill: "px-2.5 py-1 text-[11px] gap-1.5",
      emoji: "text-[13px]",
    },
  };

  const s = sizes[size];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-label={`Alérgeno: ${a.label}`}
        className={`inline-flex items-center ${s.pill} rounded-full border border-[#c5a059]/30 bg-[#c5a059]/8 text-[#2A241D]/70 hover:border-[#c5a059]/60 hover:bg-[#c5a059]/15 hover:text-[#2A241D] transition-all cursor-default select-none font-medium tracking-wide`}
        style={{ backgroundColor: "rgba(197,160,89,0.07)" }}
      >
        <span className={s.emoji}>{a.emoji}</span>
        <span>{a.label}</span>
      </button>

      {open && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          style={{ minWidth: "200px" }}
        >
          <div className="bg-[#1B1815] text-[#f5f5f1] text-[10px] leading-relaxed px-3 py-2 rounded-sm shadow-xl whitespace-normal text-center">
            <span className="font-bold uppercase tracking-wider text-[#c5a059] block mb-0.5">
              {a.emoji} {a.label}
            </span>
            {a.description}
          </div>

          <div className="w-2 h-2 bg-[#1B1815] rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
}

interface AllergenBadgesProps {
  allergens?: AllergenKey[];
  size?: "sm" | "md";
  label?: boolean;
  theme?: "dark" | "light";
}

export default function AllergenBadges({
  allergens = [],
  size = "md",
  label = true,
  theme = "dark",
}: AllergenBadgesProps) {
  if (!allergens.length) return null;

  const labelColor =
    theme === "light" ? "text-[#5F564C]" : "text-[#5F564C]";

  return (
    <div className="mt-3">
      {label && (
        <p
          className={`text-[9px] uppercase tracking-[0.22em] font-semibold mb-2 ${labelColor}`}
        >
          Alérgenos
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {allergens.map((key) => (
          <AllergenBadge
            key={key}
            allergenKey={key}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}