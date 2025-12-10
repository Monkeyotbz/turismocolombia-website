import React from 'react';

const ParrotOverlay: React.FC = () => (
  <>
    <img
      src="https://minecraft.wiki/images/Golden_Parrot_Fly_%28Dungeons%29.gif?535f1"
      alt="loro-volador"
      className="absolute z-10 pointer-events-none animate-loro-fly"
      style={{ width: 112, height: 112, top: 120, left: 0 }}
    />
    <img
      src="https://minecraft.wiki/images/Parrot_Fly_%28Dungeons%29.gif?cb665"
      alt="loro-volador-2"
      className="absolute z-10 pointer-events-none animate-loro-fly-lower"
      style={{ width: 112, height: 112, top: 300, left: 0 }}
    />
    <style>
      {`
        @keyframes loro-fly {
          0% { left: -128px; top: 120px; transform: scaleX(-1) rotate(0deg); }
          25% { top: 80px; transform: scaleX(-1) rotate(-10deg); }
          50% { top: 100px; transform: scaleX(-1) rotate(0deg); }
          75% { top: 180px; transform: scaleX(-1) rotate(10deg); }
          100% { left: 100vw; top: 120px; transform: scaleX(-1) rotate(0deg); }
        }
        @keyframes loro-fly-lower {
          0% { left: -128px; top: 300px; transform: scaleX(-1) rotate(0deg); }
          25% { top: 280px; transform: scaleX(-1) rotate(-10deg); }
          50% { top: 320px; transform: scaleX(-1) rotate(0deg); }
          75% { top: 340px; transform: scaleX(-1) rotate(10deg); }
          100% { left: 100vw; top: 300px; transform: scaleX(-1) rotate(0deg); }
        }
        .animate-loro-fly { animation: loro-fly 30s linear infinite; position: absolute; }
        .animate-loro-fly-lower { animation: loro-fly-lower 35s linear infinite; position: absolute; }
      `}
    </style>
  </>
);

export default ParrotOverlay;
