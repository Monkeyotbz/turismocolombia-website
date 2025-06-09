import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import Background from './Background'; // Importa el componente Background

const backgrounds = [
  "",
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);
  const [prevBgIndex, setPrevBgIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevBgIndex(bgIndex);
      setIsFading(true);
      fadeTimeout.current = setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
        setIsFading(false);
      }, 1000); // 5 segundos de transición
    }, 3000); // Cambio cada 7 segundos (5s transición + 2s visible)

    return () => {
      clearInterval(interval);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [bgIndex]);

  const manejarBusqueda = (searchParams: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (searchParams.destination) {
      queryParams.append('destination', searchParams.destination);
    }
    if (searchParams.checkIn) {
      queryParams.append('checkIn', searchParams.checkIn);
    }
    if (searchParams.checkOut) {
      queryParams.append('checkOut', searchParams.checkOut);
    }
    queryParams.append('guests', searchParams.guests.toString());
    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <Background>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen anterior */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[5000ms]"
          style={{
            backgroundImage: `url('${backgrounds[prevBgIndex]}')`,
            opacity: isFading ? 1 : 0,
            transitionProperty: 'opacity',
          }}
        ></div>
        {/* Imagen actual */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[5000ms]"
          style={{
            backgroundImage: `url('${backgrounds[bgIndex]}')`,
            opacity: isFading ? 0 : 1,
            transitionProperty: 'opacity',
          }}
        ></div>
        {/* Degradado overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none"></div>
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Descubre la magia y diversidad de Colombia
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              destinos exóticos, cultura vibrante y naturaleza incomparable en un solo lugar.
            </p>
            <SearchBar 
              onSearch={manejarBusqueda} 
              className="max-w-4xl mx-auto mt-8"
            />
          </div>
          <div className="mt-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all">
                <p className="text-white text-3xl font-bold">1500+</p>
                <p className="text-blue-100 mt-1">Propiedades</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all">
                <p className="text-white text-3xl font-bold">+10</p>
                <p className="text-blue-100 mt-1">Destinos</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all">
                <p className="text-white text-3xl font-bold">10k+</p>
                <p className="text-blue-100 mt-1">Clientes satisfechos</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all">
                <p className="text-white text-3xl font-bold">24/7</p>
                <p className="text-blue-100 mt-1">Atención al cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default HeroSection;