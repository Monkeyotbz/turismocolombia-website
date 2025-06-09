import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type PropertyType = {
  id: number;
  name: string;
  location: string;
  type: string;
  prices: { price: number }[];
  imageUrls?: string[];
  image_urls?: string[];
  rating?: number;
  amenities?: string[];
};

interface Props {
  property: PropertyType;
}

const BACKEND_URL = "http://localhost:5000";

const amenitiesIcons: Record<string, JSX.Element> = {
  "Piscina": <span className="material-icons text-blue-400">pool</span>,
  "WiFi gratis": <span className="material-icons text-green-500">wifi</span>,
  "Parking privado": <span className="material-icons text-gray-700">local_parking</span>,
  "Aire acondicionado": <span className="material-icons text-blue-300">ac_unit</span>,
  "Vistas al mar": <span className="material-icons text-blue-500">waves</span>,
};

const PropertyCard: React.FC<Props> = ({ property }) => {
  const imgs: string[] =
    Array.isArray(property.imageUrls) && property.imageUrls.length > 0
      ? property.imageUrls
      : Array.isArray(property.image_urls) && property.image_urls.length > 0
      ? property.image_urls
      : [];

  const [imgIdx, setImgIdx] = useState(0);

  // Carrusel automático
  useEffect(() => {
    if (imgs.length < 2) return;
    const interval = setInterval(() => {
      setImgIdx(idx => (idx + 1) % imgs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [imgs.length]);

  // Botones manuales
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx(idx => (idx - 1 + imgs.length) % imgs.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx(idx => (idx + 1) % imgs.length);
  };

  const currentImg = imgs[imgIdx]
    ? (imgs[imgIdx].startsWith('http') ? imgs[imgIdx] : `${BACKEND_URL}${imgs[imgIdx]}`)
    : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 max-w-xl mx-auto">
      {/* Carrusel de imágenes */}
      <div className="relative h-56 select-none">
        <img
          src={currentImg}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        {imgs.length > 1 && (
          <>
            {/* Botón anterior */}
            <button
              onClick={prevImg}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-1 transition"
              aria-label="Anterior"
              tabIndex={0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* Botón siguiente */}
            <button
              onClick={nextImg}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-1 transition"
              aria-label="Siguiente"
              tabIndex={0}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {/* Cantidad de fotos */}
            <span className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              {imgs.length} fotos
            </span>
          </>
        )}
      </div>

      {/* Info principal */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{property.name}</h3>
          <div className="flex items-center gap-1">
            <span className="bg-yellow-400 text-white px-2 py-1 rounded font-semibold text-sm flex items-center">
              <Star className="w-4 h-4 mr-1" /> {property.rating ?? 0}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2">{property.location}</p>
        {/* Amenidades */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(property.amenities ?? ["Piscina", "WiFi gratis", "Parking privado"]).map((am, i) => (
            <span key={i} className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium gap-1">
              {amenitiesIcons[am] ?? null}{am}
            </span>
          ))}
        </div>
        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-700">
              ${Array.isArray(property.prices) && property.prices.length > 0 ? property.prices[0].price : 0}
            </span>
            <span className="text-sm text-gray-500 ml-1">/noche</span>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Ver alojamiento
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;