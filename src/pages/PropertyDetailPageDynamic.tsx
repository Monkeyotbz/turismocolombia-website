import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaUserFriends, FaWifi, FaSwimmingPool, FaCheckCircle, FaPlaneArrival, FaSnowflake, FaEye, FaParking } from 'react-icons/fa';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  property_type: string;
  amenities: string[];
  property_images: Array<{
    id: string;
    image_url: string;
    display_order: number;
  }>;
}

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <FaWifi />,
  parking: <FaParking />,
  piscina: <FaSwimmingPool />,
  vistas: <FaEye />,
  traslado: <FaPlaneArrival />,
  aire: <FaSnowflake />,
  default: <FaCheckCircle />
};

const getAmenityIcon = (amenity: string): JSX.Element => {
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes('wifi')) return amenityIcons.wifi;
  if (lowerAmenity.includes('parking') || lowerAmenity.includes('estacionamiento')) return amenityIcons.parking;
  if (lowerAmenity.includes('piscina') || lowerAmenity.includes('alberca')) return amenityIcons.piscina;
  if (lowerAmenity.includes('vista')) return amenityIcons.vistas;
  if (lowerAmenity.includes('traslado') || lowerAmenity.includes('aeropuerto')) return amenityIcons.traslado;
  if (lowerAmenity.includes('aire') || lowerAmenity.includes('a/c') || lowerAmenity.includes('acondicionado')) return amenityIcons.aire;
  return amenityIcons.default;
};

const PropertyDetailPageDynamic: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    if (!id) return;

    try {
      // Buscar por slug (nombre convertido a URL)
      const { data: properties, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images(
            id,
            image_url,
            display_order
          )
        `)
        .eq('active', true);

      if (error) throw error;

      // Buscar la propiedad que coincida con el slug
      const property = properties?.find((p: any) => {
        const slug = p.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '');
        return slug === id;
      });

      if (property) {
        setProperty(property);
      } else {
        setProperty(null);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-[110px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white pt-[110px] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
        <p className="text-gray-600 mb-8">Lo sentimos, no pudimos encontrar esta propiedad.</p>
        <button
          onClick={() => navigate('/properties')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a propiedades
        </button>
      </div>
    );
  }

  // Ordenar imágenes por display_order
  const images = property.property_images
    ?.sort((a, b) => a.display_order - b.display_order)
    .map(img => img.image_url) || [];

  const mainImage = images[0] || '/placeholder-property.jpg';
  const mosaicImages = images.slice(1, 5);

  const whatsappLink = `https://wa.me/573145284548?text=${encodeURIComponent(`Hola, quiero reservar ${property.name}`)}`;

  return (
    <div className="min-h-screen bg-white pt-[110px]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/properties')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a propiedades
        </button>

        {/* Título y ubicación */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-600" />
            <span>{property.location}, {property.city}</span>
          </div>
        </div>

        {/* Galería de imágenes */}
        <div className="mb-8">
          {!showAllPhotos ? (
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-xl overflow-hidden">
              {/* Imagen principal */}
              <div className="col-span-2 row-span-2 relative">
                <img
                  src={mainImage}
                  alt={property.name}
                  className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition"
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
              {/* Mosaico de imágenes */}
              {mosaicImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`${property.name} ${idx + 2}`}
                    className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition"
                    onClick={() => setShowAllPhotos(true)}
                  />
                </div>
              ))}
              {images.length > 5 && (
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition"
                >
                  Ver todas las fotos ({images.length})
                </button>
              )}
            </div>
          ) : (
            // Modal de todas las fotos
            <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto">
              <div className="min-h-screen py-8 px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">Todas las fotos</h2>
                    <button
                      onClick={() => setShowAllPhotos(false)}
                      className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Cerrar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${property.name} ${idx + 1}`}
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="md:col-span-2 space-y-8">
            {/* Información básica */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-6 text-gray-700 mb-4">
                <div className="flex items-center gap-2">
                  <FaBed className="text-blue-600" />
                  <span>{property.bedrooms} {property.bedrooms === 1 ? 'habitación' : 'habitaciones'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-blue-600" />
                  <span>{property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-blue-600" />
                  <span>{property.guests} huéspedes</span>
                </div>
              </div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                {property.property_type}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca de este lugar</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenidades */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Qué ofrece este lugar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="text-blue-600 text-xl">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar de reserva */}
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-32">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${property.price_per_night.toLocaleString('es-CO')}
                </div>
                <div className="text-gray-600">por noche</div>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  Reservar por WhatsApp
                </a>

                <button
                  onClick={() => navigate(`/booking/${id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
                >
                  Reservar ahora
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                  <FaCheckCircle className="text-green-600" />
                  <span>Cancelación flexible</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaCheckCircle className="text-green-600" />
                  <span>Confirmación inmediata</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPageDynamic;
