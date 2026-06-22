import pinchos from "../assets/hero-portalon-optimized.jpg"
import calientes from "../assets/re_pincho_gambas.jpg"
import fríos from "../assets/re_pincho_navaja.jpg"
import temporada from "../assets/re_pincho_bacalao.jpg"
import caseros from "../assets/re_pincho_caviar.jpg"

export const barItems = [
  {
    id: 1,
    title: "La barra, el corazón de El Portalón",
    description:
      "Nuestra barra es el punto de encuentro de vecinos, visitantes y amantes del buen tapeo. Cada día se llena de pinchos recién elaborados, conversaciones entre amigos y el ambiente auténtico de un bar de siempre. Un lugar donde disfrutar sin prisas de la gastronomía tradicional.",
    image:
      pinchos,
    wide: true,
  },
  {
    id: 2,
    title: "Pinchos calientes recién hechos",
    description:
      "Tortillas jugosas, croquetas caseras, cazuelitas y especialidades recién salidas de cocina. Elaboraciones artesanas que se sirven en su mejor momento para disfrutar de todo su sabor.",
    image:
      calientes,
    wide: false,
    allergens: ["gluten", "huevos", "lacteos","soja","frutos_cascara","moluscos"],
  },
  {
    id: 3,
    title: "Pinchos fríos y sabores tradicionales",
    description:
      "Una selección de pinchos preparados diariamente con ingredientes frescos y recetas de siempre. Opciones ligeras, sabrosas y perfectas para acompañar un vino de la Ribera del Duero.",
    image:
      fríos,
    wide: false,
    allergens: ["gluten", "huevos", "lacteos","soja","frutos_cascara","moluscos"],
  },
  {
    id: 4,
    title: "Especialidades de temporada",
    description:
      "Nuestra barra evoluciona con cada estación. Trabajamos con productos de temporada para ofrecer propuestas diferentes durante todo el año, respetando el sabor y la calidad de cada ingrediente.",
    image:
      temporada,
    wide: false,
    allergens: ["gluten", "huevos", "lacteos","soja","frutos_cascara","moluscos"],
  },
  {
    id: 5,
    title: "Pinchos caseros elaborados cada día",
    description:
      "Detrás de cada pincho hay tiempo, dedicación y cocina de verdad. Apostamos por recetas propias y elaboración diaria para que cada bocado refleje el carácter y la tradición de El Portalón.",
    image:
      caseros,
    wide: false,
    allergens: ["gluten", "huevos", "lacteos","soja","frutos_cascara","moluscos"],
  },
];