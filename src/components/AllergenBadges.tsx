
import { useId, useState } from "react";
import { ALLERGENS } from "../data/allergens";

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
  const tooltipId = useId();

  const allergen = ALLERGENS[allergenKey];

  if (!allergen) return null;

  const sizes = {
    sm: {
      pill: "px-2 py-1 text-[10px] gap-1",
      emoji: "text-[11px]",
    },
    md: {
      pill: "px-2.5 py-1 text-[11px] gap-1.5",
      emoji: "text-[13px]",
    },
  };

  const currentSize = sizes[size];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={`Alérgeno: ${allergen.label}. Consultar descripción`}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onClick={() => setOpen((previous) => !previous)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`
          inline-flex cursor-help select-none items-center
          rounded-full border
          border-[#c5a059]/30
          bg-[#c5a059]/[0.07]
          font-medium tracking-wide
          text-[#5F564C]
          transition-colors
          hover:border-[#c5a059]/70
          hover:bg-[#c5a059]/15
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#c5a059]
          ${currentSize.pill}
        `}
      >
        <span
          className={currentSize.emoji}
          aria-hidden="true"
        >
          {allergen.emoji}
        </span>

        <span>{allergen.label}</span>
      </button>

      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className="
            pointer-events-none absolute
            bottom-full left-1/2 z-50 mb-2
            w-52 -translate-x-1/2
            rounded-sm bg-[#1B1815]
            px-3 py-2 text-center
            text-[10px] leading-relaxed
            text-[#f5f5f1]
            shadow-xl
          "
        >
          <span className="mb-1 block font-bold uppercase tracking-wider text-[#c5a059]">
            {allergen.emoji} {allergen.label}
          </span>

          {allergen.description}
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
    theme === "light"
      ? "text-[#5F564C]"
      : "text-[#5F564C]";

  return (
    <div className="min-w-0">
      {label && (
        <p
          className={`
            mb-2 text-[9px] font-semibold
            uppercase tracking-[0.22em]
            ${labelColor}
          `}
        >
          Alérgenos
        </p>
      )}

      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label="Alérgenos del plato"
      >
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
