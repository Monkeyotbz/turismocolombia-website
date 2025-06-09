import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- importa useNavigate

const PHOTOS_PER_BLOCK = 5;

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // <-- inicializa useNavigate
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

  // Bloques de fotos
  const totalBlocks = Math.ceil(imgs.length / PHOTOS_PER_BLOCK);
  const startIdx = photoBlock * PHOTOS_PER_BLOCK;
  const blockImgs = imgs.slice(startIdx, startIdx + PHOTOS_PER_BLOCK);

  function getImgUrl(img: string) {
    if (!img) return 'https://via.placeholder.com/600x400?text=Sin+Imagen';
    if (img.startsWith('http')) return img;
    const cleanImg = img.startsWith('/uploads') ? img : `/uploads/${img.replace(/^\/+/, '')}`;
    return `http://localhost:5000${cleanImg}`;
  }

  // Ejemplo de uso:
  const mainImg = blockImgs[0] ? getImgUrl(blockImgs[0]) : 'https://via.placeholder.com/600x400?text=Sin+Imagen';
  const mosaicImgs = blockImgs.slice(1).map(getImgUrl);

  // --- Lógica para reservar ---
  const handleReservar = () => {
    // Aquí puedes usar tu contexto de autenticación o simplemente revisar el token
    const isAuthenticated = !!localStorage.getItem('token');
    if (isAuthenticated) {
      alert('¡Reserva enviada!');
      // Aquí puedes poner la lógica real de reserva
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-28 pb-10 px-4">
      {/* Título y ubicación */}
      <h1 className="text-3xl font-bold mb-1">{property.name}</h1>
      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <span className="text-yellow-500">★</span>
        <span className="font-semibold">{property.rating ?? 0}</span>
        <span>· {property.location}</span>
      </div>

      {/* Galería tipo mosaico con navegación por bloques */}
      {!showAllPhotos ? (
        <div className="relative mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden">
            <div className="col-span-2 row-span-2">
              <img src={mainImg} alt="principal" className="w-full h-full object-cover rounded-l-xl" style={{ minHeight: 320, maxHeight: 420 }} />
            </div>
            {mosaicImgs.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`foto ${startIdx + i + 2}`}
                className={`w-full h-full object-cover ${i === 2 ? 'rounded-tr-xl' : ''} ${i === 3 ? 'rounded-br-xl' : ''}`}
                style={{ minHeight: 160, maxHeight: 210 }}
              />
            ))}
          </div>
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
          <button
            className="absolute right-8 top-8 bg-white/90 px-4 py-2 rounded-lg shadow font-semibold"
            onClick={() => setShowAllPhotos(true)}
          >
            Mostrar todas las fotos
          </button>
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

      {/* Info y panel de reserva */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info principal */}
        <div className="md:col-span-2">
          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
          {/* Características */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Características</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
              <div><b>Tipo:</b> {property.type}</div>
              <div><b>Habitaciones:</b> {property.bedrooms}</div>
              <div><b>Baños:</b> {property.bathrooms}</div>
              <div><b>Metros cuadrados:</b> {property.squareMeters}</div>
              <div><b>Estado:</b> {property.status}</div>
            </div>
          </div>
          {/* Amenities */}
          {property.amenities && Array.isArray(property.amenities) && property.amenities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Comodidades</h2>
              <ul className="flex flex-wrap gap-2">
                {property.amenities.map((a: string, i: number) => (
                  <li key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{a}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Reviews */}
          {property.reviews && Array.isArray(property.reviews) && property.reviews.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Reseñas</h2>
              <div className="space-y-4">
                {property.reviews.map((review: any, i: number) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.user || 'Usuario'}</span>
                      <span className="text-yellow-500">★</span>
                      <span>{review.rating ?? ''}</span>
                    </div>
                    <div className="text-gray-700">{review.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Panel de reserva */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="text-2xl font-bold mb-2">
              ${Array.isArray(property.prices) && property.prices.length > 0 ? property.prices[0].price : 0}
              <span className="text-base font-normal text-gray-500"> / noche</span>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Personas</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  min={1}
                  max={property.maxGuests || 20}
                  value={guests}
                  onChange={e => setGuests(Number(e.target.value))}
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleReservar}
              >
                Reservar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;