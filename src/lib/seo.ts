export const siteUrl = "https://bar-portalon-roa.com";

export const routeSeo: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Bar El Portalón | Restaurante en Roa, Ribera del Duero",
    description:
      "Bar El Portalón en Roa, Burgos. Cocina tradicional, tapeo, bacalao y producto de temporada en la Ribiera del Duero.",
  },
  "/barra": {
    title: "La Barra | Bar El Portalón en Roa",
    description:
      "Pinchos, raciones y ambiente de barra en Bar El Portalón, Plaza Mayor de Roa.",
  },
  "/galeria": {
    title: "Galería | Bar El Portalón",
    description:
      "Imágenes del local, la barra, especialidades y ambiente de Bar El Portalón en Roa.",
  },
  "/entrevinos": {
    title: "Entrevinos de Roa | Bar El Portalón",
    description:
      "Descubre Entrevinos de Roa, vinos de Ribiera del Duero disponibles en Bar El Portalón.",
  },
  "/antiguos-eventos": {
    title: "Ediciones anteriores de las Jornadas del Bacalao | Bar El Portalón",
    description:
      "Historia de las Jornadas del Bacalao de Bar El Portalón: ediciones pasadas, platos y tradición.",
  },
  "/politica": {
    title: "Política de privacidad | Bar El Portalón",
    description: "Política de privacidad de Bar El Portalón.",
  },
  "/aviso": {
    title: "Aviso legal | Bar El Portalón",
    description: "Aviso legal de Bar El Portalón.",
  },
};

export function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }

  element.content = content;
}
