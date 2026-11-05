
import type { specialties } from "../data/specialties";
import AllergenBadges, {
  type AllergenKey,
} from "./AllergenBadges";

type Specialty = (typeof specialties)[number];

interface SpecialtyCardProps {
  item: Specialty;
}

export default function SpecialtyCard({
  item,
}: SpecialtyCardProps) {
  const isTakeaway =
    "takeaway" in item && item.takeaway === true;

  return (
    <article
      className="
        group flex h-full flex-col
        border border-[#c5a059]/25
        bg-white/50 p-4
        transition-colors duration-200
        hover:border-[#c5a059]/60
        hover:bg-white/80
        sm:p-5
      "
    >
      {/* Nombre y disponibilidad */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h4
          className="
            min-w-0 flex-1
            font-serif text-lg leading-snug
            text-[#2A241D]
            transition-colors duration-200
            group-hover:text-[#9A783D]
            sm:text-xl
          "
        >
          {item.name}
        </h4>

        {isTakeaway && (
          <span
            className="
              inline-flex shrink-0 items-center
              border border-[#c5a059]/50
              bg-[#c5a059]/10
              px-2 py-1
              text-[9px] font-bold uppercase
              tracking-wider text-[#9A783D]
            "
            aria-label="Disponible para llevar"
            title="Disponible para llevar"
          >
            Para llevar
          </span>
        )}
      </div>

      {/* Descripción */}
      <p
        className="
          text-sm font-light leading-relaxed
          text-[#5F564C]
        "
      >
        {item.description}
      </p>

      {/* Alérgenos */}
      {item.allergens.length > 0 && (
        <div className="mt-auto pt-4">
          <div className="border-t border-[#c5a059]/15 pt-3">
            <AllergenBadges
              allergens={item.allergens as AllergenKey[]}
              size="sm"
              label={false}
              theme="light"
            />
          </div>
        </div>
      )}
    </article>
  );
}
