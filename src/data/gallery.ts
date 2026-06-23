import bacalado from "../assets/cocochas-perf.jpg";
import casa1 from "../assets/re_casa_1.jpg";
import casa2 from "../assets/re_casa_2.jpg";
import gambas from "../assets/re_gambas.jpg";
import pincho_bacalao from "../assets/re_pincho_bacalao.jpg";
import pincho_caviar from "../assets/re_pincho_caviar.jpg";
import pincho_gambas from "../assets/re_pincho_gambas.jpg";
import pincho_guindilla from "../assets/re_pincho_guindilla.jpg";
import pincho_navaja from "../assets/re_pincho_navaja.jpg";
import zamburiñas from "../assets/re_zamburinas.jpg";

export const categorias = [
  "Todo",
  "El Local",
  "La Barra",
  "Especialidades",
  "Ambiente",
  "Para llevar",
];

export const fotos = [
  {
    id: 1,
    src: casa1,
    alt: "Para llevar",
    cat: "Para llevar",
    cols: 2,
    prevew: true,
  },{
    id: 2,
    src: casa2,
    alt: "Para llevar",
    cat: "Para llevar",
    cols: 2,
    preview: false,
  },
  {
    id: 3,
    src: gambas,
    alt: "Gambas frescas",
    cat: "La Barra",
    cols: 1,
    preview: false,
  },
  {
    id: 4,
    src: bacalado,
    alt: "Bacalao tradicional",
    cat: "Especialidades",
    cols: 1,
    preview: true,
  },
  {
    id: 5,
    src: pincho_bacalao,
    alt: "Bacalao tradicional",
    cat: "Especialidades",
    cols: 1,
  },
  {
    id: 6,
    src: pincho_caviar,
    alt: "Caviar de esturión",
    cat: "La Barra",
    cols: 1,
    preview: true,
  },
  {
    id: 7,
    src: pincho_gambas,
    alt: "Gambas frescas",
    cat: "La Barra",
    cols: 1,
    preview: false,
  },
  {
    id: 8,
    src: pincho_guindilla,
    alt: "Pincho de guindilla",
    cat: "La Barra",
    cols: 1,
    preview: true,
  },
  {
    id: 9,
    src: pincho_navaja,
    alt: "Pincho de navaja",
    cat: "La Barra",
    cols: 2,
    preview: true,
  },
  {
    id: 10,
    src: zamburiñas,
    alt: "Zamburiñas a la plancha",
    cat: "Especialidades",
    cols: 1,
    preview: true,
  }
];