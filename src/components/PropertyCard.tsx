import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export type PropertyType = {
  id: number;
  name: string;
  location: string;
  type: string;
  prices: { price: number }[];
  imageUrls?: string[]; // camelCase
  image_urls?: string[]; // snake_case
  rating?: number;
  // ...otros campos
};

interface Props {
  property: PropertyType;
}

const BACKEND_URL = "http://localhost:5000"; // sin barra al final

const PropertyCard: React.FC<Props> = ({ property }) => {
  // Unifica el acceso a las imágenes
  const imgs: string[] =
    Array.isArray(property.imageUrls) && property.imageUrls.length > 0
      ? property.imageUrls
      : Array.isArray(property.image_urls) && property.image_urls.length > 0
      ? property.image_urls
      : [];

  // Imagen aleatoria al cargar
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    if (imgs.length > 0) {
      setImgIdx(Math.floor(Math.random() * imgs.length));
    }
  }, [property.id]);

  // Construye la URL completa
  const imgSrc =
    imgs.length > 0
      ? (imgs[imgIdx]?.startsWith('http') ? imgs[imgIdx] : `${BACKEND_URL}${imgs[imgIdx]}`)
      : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  return (
    <Link 
      to={`/property/${property.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <img
          src={imgSrc}
          alt={property.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {property.name}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm text-gray-600">{property.rating ?? 0}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{property.location}</p>
        <div className="text-gray-700 font-bold mb-2">
          ${Array.isArray(property.prices) && property.prices.length > 0
            ? property.prices[0].price
            : 0}
          <span className="text-sm font-normal text-gray-500">/noche</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;