import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import Background from './Background';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const manejarBusqueda = (searchParams: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (searchParams.destination) queryParams.append('destination', searchParams.destination);
    if (searchParams.checkIn) queryParams.append('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) queryParams.append('checkOut', searchParams.checkOut);
    queryParams.append('guests', searchParams.guests.toString());
    navigate(`/properties?${queryParams.toString()}`);
  };

  const heroBackgrounds = [
    'https://images.pexels.com/photos/2884864/pexels-photo-2884864.jpeg',
  ];

  return (
    <Background backgrounds={heroBackgrounds} className="relative" minHeight="70vh">
      {/* Degradado overlay (por debajo del contenido) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/80 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center pt-32 sm:pt-36 md:pt-28 pb-14 min-h-[70vh] md:min-h-[100vh]">
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Descubre la magia y diversidad de Colombia
          </h1>
          <p className="text-base sm:text-lg lg:text-xxl text-white">
            Destinos exoticos, cultura vibrante y naturaleza incomparable en un solo lugar.
          </p>
          <div className="mt-6">
            <SearchBar onSearch={manejarBusqueda} className="max-w-xl sm:max-w-2xl mx-auto" />
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-opacity-30 transition-all">
              <p className="text-white text-xl sm:text-2xl font-bold">1500+</p>
              <p className="text-blue-100 mt-1 text-xs sm:text-sm">Propiedades</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-opacity-30 transition-all">
              <p className="text-white text-xl sm:text-2xl font-bold">+10</p>
              <p className="text-blue-100 mt-1 text-xs sm:text-sm">Destinos</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-opacity-30 transition-all">
              <p className="text-white text-xl sm:text-2xl font-bold">10k+</p>
              <p className="text-blue-100 mt-1 text-xs sm:text-sm">Clientes satisfechos</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-opacity-30 transition-all">
              <p className="text-white text-xl sm:text-2xl font-bold">24/7</p>
              <p className="text-blue-100 mt-1 text-xs sm:text-sm">Atencion al cliente</p>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default HeroSection;
