import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = '573145284548'; // Número de WhatsApp
  const defaultMessage = '¡Hola! Me gustaría obtener más información sobre sus servicios.';
  
  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 32 32" 
        className="w-9 h-9 fill-white"
      >
        <path d="M16.04 5c-6.08 0-11 4.92-11 10.98 0 2.17.64 4.21 1.87 5.99L5 27l5.19-1.69A10.98 10.98 0 0 0 16.04 27c6.08 0 11-4.92 11-10.98C27.04 9.92 22.12 5 16.04 5Zm0 19.98c-1.75 0-3.47-.46-4.98-1.34l-.36-.21-3.08 1 1-3.01-.23-.39a8.96 8.96 0 0 1-1.36-4.67c0-4.97 4.05-9.02 9.01-9.02 4.96 0 9.01 4.05 9.01 9.02 0 4.97-4.05 9.02-9.01 9.02Zm5.11-6.74c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.19.28-.74.9-.9 1.08-.16.19-.33.21-.61.07-.28-.14-1.17-.43-2.22-1.35-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.02-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.28-1 1-1 2.42 0 1.43 1.02 2.81 1.17 3 .14.19 2 3.2 4.84 4.36.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.12-.25-.19-.53-.33Z"/>
      </svg>
      
      {/* Tooltip */}
      <div className="absolute right-20 bg-gray-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        ¿Necesitas ayuda? ¡Chatea con nosotros!
      </div>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
    </button>
  );
};

export default WhatsAppButton;
