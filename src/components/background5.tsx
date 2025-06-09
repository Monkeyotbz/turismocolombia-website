import React from 'react';

// Cambia la URL por la imagen del Eje Cafetero
const BG_IMAGE = "https://images.unsplash.com/photo-1599651317690-b0283c307261?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ";

const background5: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
      src="https://minecraft.wiki/images/Golden_Parrot_Fly_%28Dungeons%29.gif?535f1"
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

export default background5;