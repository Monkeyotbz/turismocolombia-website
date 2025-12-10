import { ShowcaseItem } from '../components/QuickCard';

const WHATSAPP_NUMBER = '573145284548';
const buildWhatsapp = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const quickProperties: ShowcaseItem[] = [
  {
    id: 'jardin-aguilas',
    name: 'Cabaña Las Águilas',
    location: 'Jardín, Antioquia',
    description:
      'Cabaña rodeada de naturaleza en destino rural. Diseñada para amantes de la naturaleza con jardín, balcón, WiFi gratis y cocina compartida. Incluye traslados al aeropuerto, alquiler de caballos, vistas a montañas, cascadas, ríos y cuevas. Una experiencia única e inolvidable.',
    image: '/JARDIN/Lasaguilas.png',
    priceLabel: 'Desde $180.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar la Cabaña Las Águilas en Jardín'),
    booking: 'https://www.booking.com/hotel/co/cabana-las-aguilas.es.html',
    tags: ['Naturaleza', 'Alquiler caballos', 'WiFi gratis', 'Traslado aeropuerto', 'Vistas panorámicas', 'Cocina compartida']
  },
  {
    id: 'medellin-opera',
    name: 'Hotel Opera Medellín Centro Only Adults',
    location: 'Centro, Medellín',
    description:
      'Hotel solo para adultos en la zona rosa del centro de Medellín. Habitaciones confortables, bar exclusivo hasta la 1:00 A.M, wifi y lavandería. Ubicado cerca del Edificio Coltejer, La Plazoleta de Botero y la estación Parque Berrío.',
    image: '/OPERA/OPERA.jpg',
    priceLabel: 'Desde $280.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar el Hotel Opera Medellín'),
    booking: 'https://www.booking.com',
    tags: ['Solo adultos', 'Bar hasta 1:00 A.M', 'WiFi gratis', 'Lavandería', 'Traslado aeropuerto', 'Cerca Parque Berrío']
  },
  {
    id: 'medellin-penthouse',
    name: 'Penthouse Panorama Medellín',
    location: 'El Poblado, Medellín',
    description:
      'Penthouse panorámico en El Poblado con terraza y vistas 360° a la ciudad. Ideal para viajes de lujo o estancias largas; incluye zonas sociales amplias, cocina equipada y múltiples ambientes para trabajar o descansar.',
    image: '/penthousemed/1.jpg',
    priceLabel: 'Desde $520.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar el Penthouse Panorama Medellín'),
    booking: 'https://www.booking.com',
    tags: ['Vistas 360°', 'Terraza', 'WiFi gratis', 'Cocina equipada', 'A/C', 'Espacios amplios']
  },
  {
    id: 'jerico-rural',
    name: 'Hospedaje Rural Jericó',
    location: 'Jericó, Antioquia',
    description:
      'Cabaña rural con wifi gratis y cocina compartida, perfecta para vivir Jericó: pueblo de balcones coloridos, cafés de origen y atardeceres frente al Cauca. Incluye traslados al aeropuerto, alquiler de bicicletas, vistas hermosas y desayuno americano diario. Habitaciones con cafetera, TV de pantalla plana y baño privado; a pocas cuadras de la iglesia principal y el mirador.',
    image: '/JERICO/671963015.jpg',
    priceLabel: 'Desde $190.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar el Hospedaje Rural en Jericó'),
    booking: 'https://www.booking.com',
    tags: ['Wifi gratis', 'Cocina compartida', 'Desayuno americano', 'Traslado aeropuerto', 'Alquiler de bicicletas', 'Vistas hermosas']
  },
  {
    id: 'cartagena-torresdellago',
    name: 'Hospedaje Delux Cartagena',
    location: 'Cartagena de Indias, Colombia',
    description:
      'Ofrece vistas al lago y piscina al aire libre y está en el barrio de Laguito, en Cartagena de Indias, a 4 min a pie de Playa El Laguito y a 5.2 km de Palacio de la Inquisición. Hay wifi gratis en todo el alojamiento y parking privado. Todas las unidades tienen aire acondicionado y disponen de baño privado, TV de pantalla plana, cocina totalmente equipada y balcón.\n\nParque Bolívar está a 5,2 km del alojamiento, y Museo del Oro de Cartagena está a 5,3 km. El aeropuerto (Aeropuerto Internacional Rafael Núñez) está a 10 km y el alojamiento ofrece servicio de traslado pagando una tarifa extra.',
    image: '/TORRESDELLAGO/TORRESDELLAGO.jpg',
    priceLabel: 'Desde $150.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar en Hospedaje Delux Cartagena'),
    booking: 'https://www.booking.com/Share-bHLtPF',
    tags: ['Piscina al aire libre', 'WiFi gratis', 'Parking privado', 'Aire acondicionado', 'TV plasma', 'Cocina equipada', 'Balcón privado', 'Traslado aeropuerto']
  },
  {
    id: 'cartagena-penthouse',
    name: 'Hospedajes Penthouse Cartagena El Laguito',
    location: 'El Laguito, Cartagena de Indias, Colombia',
    description:
      'Está en el barrio de Laguito, en Cartagena de Indias, a 1 min a pie de Playa El Laguito y a 4.9 km de Palacio de la Inquisición, y ofrece alojamiento equipado con balcón y wifi gratis. Este apartamento está a 4.3 km de Museo del Oro de Cartagena.\n\nEste apartamento con aire acondicionado se compone de 1 dormitorio independiente, una cocina totalmente equipada y 1 baño. Castillo de San Felipe de Barajas está a 6,1 km del alojamiento, y Muralla de Cartagena está a 6,4 km. El aeropuerto (Aeropuerto Internacional Rafael Núñez) está a 10 km.',
    image: '/ELLAGUITO/ELLAGUITO.jpg',
    priceLabel: 'Desde $250.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar el Penthouse en El Laguito'),
    booking: 'https://www.booking.com/Share-0mQvbg',
    tags: ['180 m² tamaño', 'Piscina', 'Baño privado', 'Balcón', 'Vistas panorámicas', 'WiFi gratis', 'Aire acondicionado', 'Cocina equipada']
  },
  {
    id: 'cartagena-nuevo-conquistador',
    name: 'Hospedaje Cartagena Turismocolombia',
    location: 'Cartagena de Indias, Colombia',
    description:
      'Se encuentra en Cartagena de Indias y ofrece alojamiento con piscina al aire libre y wifi gratis a 1 min a pie de Playa El Laguito y a 4.9 km de Palacio de la Inquisición. Algunas unidades tienen aire acondicionado e incluyen balcón y/o zona de estar con TV de pantalla plana. El apartamento ofrece servicio de alquiler de coches.\n\nParque Bolívar está a 4.9 km del alojamiento, y Museo del Oro de Cartagena está a 5 km. El aeropuerto (Aeropuerto Internacional Rafael Núñez) está a 10 km, y el alojamiento ofrece servicio de traslado de pago para ir o volver del aeropuerto.',
    image: '/NUEVO CONQUISTADOR/CONQUISTADOR.jpg',
    priceLabel: 'Desde $120.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar en Hospedaje Cartagena Turismocolombia'),
    booking: 'https://www.booking.com/Share-xOJgWPV',
    tags: ['Piscina al aire libre', 'WiFi gratis', 'Aire acondicionado', 'Baño privado', 'Balcón', 'TV pantalla plana', 'Traslado aeropuerto', 'Alquiler coches']
  },
  {
    id: 'cartagena-tres-carabelas',
    name: 'Hospedajes Cartagena Tours El Laguito',
    location: 'El Laguito, Cartagena de Indias, Colombia',
    description:
      'Se encuentra en Cartagena de Indias y ofrece alojamiento con wifi gratis y TV, además de la posibilidad de alojarse en la azotea. Cada unidad está equipada con aire acondicionado, baño privado y cocina con nevera y fogones. El apartamento ofrece servicio de alquiler de coches.\n\nPlaya de Bocagrande está a 7 min a pie del alojamiento y Palacio de la Inquisición está a 4.3 km. El aeropuerto (Aeropuerto Internacional Rafael Núñez) está a 9 km, y el apartamento ofrece servicio de traslado de pago para ir o volver del aeropuerto.',
    image: '/CARABELAS/CARABELAS.jpg',
    priceLabel: 'Desde $140.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar en Hospedajes Cartagena Tours El Laguito'),
    booking: 'https://www.booking.com/Share-FjVuSg',
    tags: ['Apartamentos', 'Piscina al aire libre', 'Baño privado', 'Balcón', 'Vistas', 'WiFi gratis', 'Aire acondicionado', 'Habitaciones familiares']
  },
  {
    id: 'cartagena-palmettos',
    name: 'Hoteles Cartagena Bocagrande',
    location: 'Bocagrande, Cartagena de Indias, Colombia',
    description:
      'Está a pocos pasos de Playa de Bocagrande y ofrece alojamiento con piscina al aire libre, spa y recepción 24 horas. Hay wifi gratis en todo el alojamiento y parking privado en el establecimiento. E apartamento ofrece servicio de alquiler de coches.\n\nPalacio de la Inquisición está a 3.1 km del alojamiento, y Parque Bolívar está a 3.2 km. El aeropuerto (Aeropuerto Internacional Rafael Núñez) está a 8 km, y el alojamiento ofrece servicio de traslado de pago para ir o volver del aeropuerto.',
    image: '/PALMETTOS/PALMETTOS.jpg',
    priceLabel: 'Desde $165.000 / noche',
    whatsapp: buildWhatsapp('Hola, quiero reservar en Hoteles Cartagena Bocagrande'),
    booking: 'https://www.booking.com/Share-a2zPYK',
    tags: ['Apartamentos', 'Piscina al aire libre', 'Parking privado', 'Baño privado', 'Balcón', 'WiFi gratis', 'Aire acondicionado', 'Recepción 24h']
  }
];

export const quickTours: ShowcaseItem[] = [
  {
    id: 'rosario-full-day',
    name: 'Islas del Rosario full day',
    location: 'Salida desde Cartagena',
    description:
      'Lancha rapida, visita a 3 islas, snorkel y almuerzo tipico. Cupos diarios confirmados.',
    image: '/Isla%20Palmarito%20Beach.jpg',
    priceLabel: 'Desde $180.000 / persona',
    whatsapp: buildWhatsapp('Hola, quiero reservar el tour Islas del Rosario full day'),
    booking: 'https://www.booking.com',
    tags: ['Lancha rapida', 'Almuerzo', 'Snorkel']
  },
  {
    id: 'cholon-playa-tranquila',
    name: 'Cholon + Playa Tranquila',
    location: 'Cartagena, Bolivar',
    description:
      'Plan de fiesta en Cholon y tarde de playa calma. Incluye bebidas de bienvenida y guia.',
    image: '/Cholon%20Cartagena.jpg',
    priceLabel: 'Desde $220.000 / persona',
    whatsapp: buildWhatsapp('Hola, quiero info del tour Cholon + Playa Tranquila'),
    booking: 'https://www.booking.com',
    tags: ['Musica', 'Playa', 'Bebida de bienvenida']
  },
  {
    id: 'graffiti-medellin',
    name: 'Graffiti tour + Comuna 13',
    location: 'Medellin, Antioquia',
    description:
      'Recorrido guiado por la Comuna 13 con escaleras electricas, arte urbano y historias locales.',
    image: '/Medellin1.jpg',
    priceLabel: 'Desde $80.000 / persona',
    whatsapp: buildWhatsapp('Hola, quiero agendar el graffiti tour en Medellin'),
    booking: 'https://www.booking.com',
    tags: ['Guia local', 'Transporte', 'Fotografia']
  },
  {
    id: 'cafe-jardin',
    name: 'Tour de cafe en Jardin',
    location: 'Jardin, Antioquia',
    description:
      'Visita finca cafetera, proceso completo del grano a la taza y cata guiada.',
    image: '/Jardin3.png',
    priceLabel: 'Desde $95.000 / persona',
    whatsapp: buildWhatsapp('Hola, quiero reservar el tour de cafe en Jardin'),
    booking: 'https://www.booking.com',
    tags: ['Cata', 'Paisaje', 'Guia']
  }
];

export const suggestedDestinations = [
  'Cartagena',
  'Medellin',
  'Bogota',
  'Islas del Rosario',
  'Jardin',
  'Eje Cafetero'
];
