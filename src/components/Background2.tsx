import React from 'react';

// Cambia la URL por la imagen del Eje Cafetero
const BG_IMAGE = "https://images.unsplash.com/photo-1562857556-d9b1011927f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbG9tYmlhfGVufDB8fDB8fHww";

const Background2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="min-h-screen w-full relative overflow-x-hidden"
    style={{
      backgroundImage: `url(${BG_IMAGE})`,
      backgroundSize: 'cover', // Cubre toda la pantalla
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', // Evita que se repita la imagen
    }}
  >
    {/* Primer loro volando animado */}
    <img
      src="https://minecraft.wiki/images/Toucan_Fly.gif?d3a79"
      alt="loro-volador"
      className="absolute z-10 pointer-events-none animate-loro-fly"
      style={{
        width: 128, // Tamaño más grande
        height: 128,
        top: 120, // Posición inicial más arriba
        left: 0,
      }}
    />

    {/* Segundo loro volando más abajo */}
    <img
      src="https://minecraft.wiki/images/Parrot_Fly_%28Dungeons%29.gif?cb665"
      alt="loro-volador-2"
      className="absolute z-10 pointer-events-none animate-loro-fly-lower"
      style={{
        width: 128, // Tamaño más grande
        height: 128,
        top: 300, // Posición inicial más abajo
        left: 0,
      }}
    />

    <style>
      {`
        @keyframes loro-fly {
          0% {
            left: -128px; /* Empieza fuera de la pantalla */
            top: 120px;
            transform: scaleX(-1) rotate(0deg); /* Mirando hacia la izquierda */
          }
          25% {
            top: 80px;
            transform: scaleX(-1) rotate(-10deg); /* Mirando hacia la izquierda */
          }
          50% {
            top: 100px;
            transform: scaleX(-1) rotate(0deg); /* Mirando hacia la izquierda */
          }
          75% {
            top: 180px;
            transform: scaleX(-1) rotate(10deg); /* Mirando hacia la izquierda */
          }
          100% {
            left: 100vw; /* Termina fuera de la pantalla */
            top: 120px;
            transform: scaleX(-1) rotate(0deg); /* Mirando hacia la izquierda */
          }
        }

        @keyframes loro-fly-lower {
          0% {
            left: -128px; /* Empieza fuera de la pantalla */
            top: 300px; /* Más abajo */
            transform: scaleX(-1) rotate(0deg); /* Mirando hacia la izquierda */
          }
          25% {
            top: 280px;
            transform: scaleX(-1) rotate(-10deg); /* Mirando hacia la izquierda */
          }
          50% {
            top: 320px;
            transform: scaleX(-1) rotate(0deg); /* Mirando hacia la izquierda */
          }
          75% {
            top: 340px;
            transform: scaleX(-1) rotate(10deg); /* Mirando hacia la izquierda */
          }
          100% {
            left: 100vw; /* Termina fuera de la pantalla */
            top: 300px; /* Más abajo */
            transform: scaleX(-1) rotate(0deg); /* Mirando hacia la izquierda */
          }
        }

        .animate-loro-fly {
          animation: loro-fly 30s linear infinite; /* Velocidad más lenta */
          position: absolute;
        }

        .animate-loro-fly-lower {
          animation: loro-fly-lower 35s linear infinite; /* Velocidad más lenta */
          position: absolute;
        }
      `}
    </style>
    <div className="relative z-20">{children}</div>
  </div>
);

export default Background2;