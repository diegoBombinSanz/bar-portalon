export const restaurantData = {
  name: "Bar El Portalón",
  cif: "H25305525",
  location: {
    city: "Roa",
    province: "Burgos",
    address: "Plaza Mayor, 14",
    googleMapsUrl: "https://maps.google.com/?q=Bar+El+Portalon+Roa",
  },
  contact: {
    phone: "+34 947 000 000", // Reemplazar por real
    whatsapp: "+34 600 000 000",
    email: "prueba@purba.com",
    tripadvisor: "https://www.tripadvisor.es/Restaurant_Review-g2137389-d8331828-Reviews-El_Portalon_De_Roa-Roa_Province_of_Burgos_Castile_and_Leon.html",
  },
  // ESTADO DE LAS JORNADAS: 'COMING_SOON', 'ACTIVE', 'PAST'
  codDaysStatus: "ACTIVE",
  codDaysConfig: {
    dates: "Del 15 de Mayo al 2 de Junio",
    title: "Jornadas del Bacalao 2026",
    teaser:
      "Vuelve nuestra cita más esperada con el mejor producto del Atlántico.",
    activeMessage:
      "¡Ya han comenzado! Disfruta de nuestro menú especial de bacalao.",
    pastMessage:
      "Gracias por acompañarnos. Volveremos con la mejor selección de bacalao muy pronto.",
    featuredPlates: [
      "Bacalao a la Taberna",
      "Kokotxas de Bacalao al Pil-Pil",
    ],
  },
  specialties: [
    {
      id: 1,
      name: "Bacalao Tradicional",
      description:
        "Nuestra seña de identidad. Elaborado con paciencia y el mejor producto.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/51/c1/21/caption.jpg?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Kokotxas de Calidad",
      description:
        "Textura sedosa y sabor intenso. Un clásico que nunca falta.",
      image:
        "https://img05.restaurantguru.com/rccc-food-Bar-El-Portalon-2025-03.jpg?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Gambas de Lonja",
      description:
        "Producto fresco seleccionado diariamente para garantizar la excelencia.",
      image:
        "https://img05.restaurantguru.com/r28a-food-Bar-El-Portalon-2025-06.jpg?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  reviews: [
    {
      user: "Carmen M.",
      text: "El trato es exquisito y la comida una maravilla. El bacalao es obligatorio si pasas por Roa.",
      rating: 5,
    },
    {
      user: "Javier R.",
      text: "Un lugar acogedor donde te sientes como en casa. Los pinchos de la barra son otro nivel.",
      rating: 5,
    },
  ],
};



