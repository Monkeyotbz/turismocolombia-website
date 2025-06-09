import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaUserFriends, FaWifi, FaCar, FaSwimmingPool, FaCheckCircle, FaPlaneArrival, FaSnowflake, FaEye, FaDoorOpen, FaParking, FaHome, FaRegCalendarAlt } from 'react-icons/fa';

const PHOTOS_PER_BLOCK = 5;

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <FaWifi />,
  parking: <FaParking />,
  piscina: <FaSwimmingPool />,
  vistas: <FaEye />,
  traslado: <FaPlaneArrival />,
  aire: <FaSnowflake />,
  baño: <FaBath />,
  balcón: <FaDoorOpen />,
  apartamento: <FaHome />,
  'parking privado': <FaCar />,
  'baño privado': <FaBath />,
  'traslado aeropuerto': <FaPlaneArrival />,
  'aire acondicionado': <FaSnowflake />,
  'wifi gratis': <FaWifi />,
  'vistas al mar': <FaEye />,
  'vistas a la ciudad': <FaEye />,
  'baño gratis': <FaBath />,
  'habitaciones familiares': <FaUserFriends />,
};

function getAmenityIcon(name: string) {
  const key = name.toLowerCase();
  return amenityIcons[key] || <FaCheckCircle />;
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [photoBlock, setPhotoBlock] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
      .then(res => res.json())
      .then(data => setProperty(data));
  }, [id]);

  if (!property) {
    return <div className="text-center py-16">Cargando propiedad...</div>;
  }

  // Manejo de imágenes
  let imgs: string[] = [];
  if (Array.isArray(property.imageUrls)) {
    imgs = property.imageUrls;
  } else if (Array.isArray(property.image_urls)) {
    imgs = property.image_urls;
  } else if (typeof property.imageUrls === 'string') {
    try { imgs = JSON.parse(property.imageUrls); } catch { imgs = []; }
  } else if (typeof property.image_urls === 'string') {
    try { imgs = JSON.parse(property.image_urls); } catch { imgs = []; }
  }

  const totalBlocks = Math.ceil(imgs.length / PHOTOS_PER_BLOCK);
  const startIdx = photoBlock * PHOTOS_PER_BLOCK;
  const blockImgs = imgs.slice(startIdx, startIdx + PHOTOS_PER_BLOCK);

  function getImgUrl(img: string) {
    if (!img) return 'https://via.placeholder.com/600x400?text=Sin+Imagen';
    if (img.startsWith('http')) return img;
    const cleanImg = img.startsWith('/uploads') ? img : `/uploads/${img.replace(/^\/+/, '')}`;
    return `http://localhost:5000${cleanImg}`;
  }

  const mainImg = blockImgs[0] ? getImgUrl(blockImgs[0]) : 'https://via.placeholder.com/600x400?text=Sin+Imagen';
  const mosaicImgs = blockImgs.slice(1).map(getImgUrl);

  const handleReservar = () => {
    const user = localStorage.getItem('user');
    const isAuthenticated = !!user;
    const reserva = {
      propertyId: property._id,
      propertyName: property.name,
      checkIn,
      checkOut,
      guests,
      price: Array.isArray(property.prices) && property.prices.length > 0 ? property.prices[0].price : 0,
      image: imgs[0] ? getImgUrl(imgs[0]) : '',
      location: property.location,
    };
    if (isAuthenticated) {
      navigate('/reserva', { state: { reserva } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-28 pb-10 px-2 md:px-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div>
          <h1 className="text-3xl font-bold mb-1">{property.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 text-base">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>{property.location}</span>
            <span className="flex items-center gap-1 ml-4">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold">{property.rating ?? 0}</span>
            </span>
          </div>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => document.getElementById('reserva-panel')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Reservar tu apartamento
        </button>
      </div>

      {/* Galería tipo Booking */}
      {!showAllPhotos ? (
        <div className="relative mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden min-h-[320px] max-h-[420px]">
            <div className="col-span-2 row-span-2">
              <img src={mainImg} alt="principal" className="w-full h-full object-cover rounded-l-xl" />
            </div>
            {mosaicImgs.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`foto ${startIdx + i + 2}`}
                className={`w-full h-full object-cover ${i === 2 ? 'rounded-tr-xl' : ''} ${i === 3 ? 'rounded-br-xl' : ''}`}
              />
            ))}
          </div>
          {/* Miniaturas debajo */}
          <div className="flex gap-2 mt-2">
            {imgs.slice(0, 6).map((img, i) => (
              <img
                key={i}
                src={getImgUrl(img)}
                alt={`miniatura ${i + 1}`}
                className="w-20 h-14 object-cover rounded cursor-pointer border-2 border-white hover:border-blue-400"
                onClick={() => { setPhotoBlock(Math.floor(i / PHOTOS_PER_BLOCK)); }}
              />
            ))}
            {imgs.length > 6 && (
              <button
                className="ml-2 px-3 py-1 bg-white border rounded shadow text-blue-600 font-semibold"
                onClick={() => setShowAllPhotos(true)}
              >
                {imgs.length - 6}+ fotos más
              </button>
            )}
          </div>
          {/* Navegación de bloques */}
          {totalBlocks > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 rounded-full shadow font-bold text-xl"
                onClick={() => setPhotoBlock(b => (b - 1 + totalBlocks) % totalBlocks)}
                style={{ zIndex: 10 }}
              >
                {"<"}
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 rounded-full shadow font-bold text-xl"
                onClick={() => setPhotoBlock(b => (b + 1) % totalBlocks)}
                style={{ zIndex: 10 }}
              >
                {">"}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center overflow-auto">
          <button
            className="self-end m-6 bg-white px-4 py-2 rounded-lg font-semibold"
            onClick={() => setShowAllPhotos(false)}
          >
            Cerrar
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 w-full max-w-6xl">
            {imgs.map((img, i) => (
              <img
                key={i}
                src={getImgUrl(img)}
                alt={`foto ${i + 1}`}
                className="w-full h-72 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Info y panel lateral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Info principal */}
        <div className="md:col-span-2">
          {/* Características principales tipo Booking */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <FaHome className="text-blue-500" /> <span>{property.type}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <FaBed className="text-blue-500" /> <span>{property.bedrooms} Habitaciones</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <FaBath className="text-blue-500" /> <span>{property.bathrooms} Baños</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <FaRulerCombined className="text-blue-500" /> <span>{property.squareMeters} m²</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <FaUserFriends className="text-blue-500" /> <span>Hasta {property.maxGuests || 1} personas</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <FaCheckCircle className="text-blue-500" /> <span>{property.status}</span>
            </div>
          </div>
          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
          {/* Comodidades/Amenities con íconos */}
          {property.amenities && Array.isArray(property.amenities) && property.amenities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Comodidades</h2>
              <ul className="flex flex-wrap gap-3">
                {property.amenities.map((a: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {getAmenityIcon(a)} {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Reseñas */}
          {property.reviews && Array.isArray(property.reviews) && property.reviews.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Reseñas</h2>
              <div className="space-y-4">
                {property.reviews.map((review: any, i: number) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.user || 'Usuario'}</span>
                      <FaStar className="text-yellow-500" />
                      <span>{review.rating ?? ''}</span>
                    </div>
                    <div className="text-gray-700">{review.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Panel lateral de reserva y mapa */}
        <div className="md:col-span-1">
          <div id="reserva-panel" className="bg-white rounded-3xl shadow-2xl p-8 sticky top-24 mb-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              Completa tu <span className="text-blue-600">reserva</span>
            </h2>
            <div className="text-3xl font-bold mb-4 flex items-center gap-2 justify-center">
              ${Array.isArray(property.prices) && property.prices.length > 0 ? property.prices[0].price : 0}
              <span className="text-lg font-normal text-gray-500">/ noche</span>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Check-in</label>
                <input
                  type="date"
                  className="w-full border rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Check-out</label>
                <input
                  type="date"
                  className="w-full border rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Personas</label>
                <input
                  type="number"
                  className="w-full border rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min={1}
                  max={property.maxGuests || 20}
                  value={guests}
                  onChange={e => setGuests(Number(e.target.value))}
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:bg-blue-700 transition"
                onClick={handleReservar}
              >
                Reservar ahora
              </button>
            </form>
          </div>
          {/* Mapa tipo Booking */}
          <div className="bg-blue-50 rounded-xl shadow p-4 flex flex-col items-center">
            <div className="w-full h-56 rounded-lg overflow-hidden mb-2">
              <iframe
                title="mapa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700 transition">
              Ver en el mapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;