import bacalado from "../assets/bacalado-taberna-perf.jpg";
import cocochas from "../assets/cocochas-perf.jpg";
import gambas from "../assets/re_gambas.jpg";
import pincho_bacalado from "../assets/re_pincho_bacalao.jpg";
import zamburiñas from "../assets/re_zamburinas.jpg";

export const specialties = [
  {
    id: 1,
    name: "Tosta de Bacalao Shake al Fuego",
    description:
      "Tosta de bacalao con elaboración especial al fuego y todo su sabor tradicional.",
    image: pincho_bacalado,
    width: 640,
    height: 640,
    takeaway: true,
    allergens: ["gluten", "pescado"],
  },
  {
    id: 2,
    name: "Gamba Blanca de Huelva a la Plancha",
    description:
      "Gamba blanca seleccionada y cocinada a la plancha para disfrutar de todo su sabor.",
    image: gambas,
    width: 640,
    height: 640,
    allergens: ["crustaceos"],
  },
  {
    id: 3,
    name: "Zamburiña Gallega a la Plancha",
    description:
      "Zamburiña gallega a la plancha acompañada de nuestra majadilla casera.",
    image: zamburiñas,
    width: 640,
    height: 640,
    allergens: ["moluscos"],
  },
  {
    id: 4,
    name: "Ensalada Portalón Premium",
    description:
      "Nuestra ensalada especial elaborada con una cuidada selección de ingredientes.",
    width: 640,
    height: 640,
    allergens: [],
  },
  {
    id: 5,
    name: "Vieira Gratinada con Gambón Bravo",
    description: "Vieira gratinada al horno coronada con gambón bravo.",
    width: 640,
    height: 640,
    allergens: ["moluscos", "crustaceos", "lacteos"],
  },
  {
    id: 6,
    name: "Rabas de Calamar",
    description:
      "Rabas de calamar crujientes, elaboradas al estilo tradicional.",
    width: 640,
    height: 640,
    allergens: ["moluscos", "gluten"],
  },
  {
    id: 7,
    name: "Pulpo a la Gallega",
    description: "Pulpo cocido en su punto y servido al estilo gallego.",
    width: 640,
    height: 640,
    allergens: ["moluscos"],
  },
  {
    id: 8,
    name: "Lomo de Bacalao en Tempura",
    description: "Lomo de bacalao rebozado en tempura ligera y crujiente.",
    width: 640,
    height: 640,
    allergens: ["pescado", "gluten"],
  },
  {
    id: 9,
    name: "Jamón del Bueno con un Queso Secreto",
    description:
      "Jamón seleccionado acompañado de un queso especial de la casa.",
    width: 640,
    height: 640,
    allergens: ["lacteos"],
  },
  {
    id: 10,
    name: "Croquetas de Migas de Bacalao con Ajetes",
    description: "Croquetas caseras elaboradas con migas de bacalao y ajetes.",
    width: 640,
    height: 640,
    allergens: ["gluten", "huevos", "lacteos", "pescado"],
  },
  {
    id: 11,
    name: "Croquetas Caseras de Jamón Ibérico",
    description:
      "Croquetas cremosas de jamón ibérico elaboradas de forma artesanal.",
    width: 640,
    height: 640,
    allergens: ["gluten", "huevos", "lacteos"],
  },
  {
    id: 12,
    name: "Bacalao Tradicional",
    description:
      "Nuestra seña de identidad. Elaborado con paciencia y el mejor producto.",
    image: bacalado,
    width: 640,
    height: 650,
    allergens: ["gluten", "huevos", "lacteos", "soja", "frutos_cascara"],
  },
  {
    id: 13,
    name: "Kokotxas de Calidad",
    description: "Textura sedosa y sabor intenso. Un clásico que nunca falta.",
    image: cocochas,
    width: 640,
    height: 666,
    allergens: ["gluten", "huevos", "lacteos", "soja", "frutos_cascara"],
  },
];
