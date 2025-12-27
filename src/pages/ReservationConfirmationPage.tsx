import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, Phone, CreditCard, MapPin, Calendar, Users, Home } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ReservationConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState<any>(null);

  useEffect(() => {
    // Obtener datos de la reserva desde sessionStorage
    const data = sessionStorage.getItem('lastReservation');
    if (data) {
      setReservationData(JSON.parse(data));
    }
  }, []);

  const whatsappMessage = `Hola! Quiero confirmar mi reserva en ${reservationData?.propertyName || 'TurismoColombia.fit'}. 
  
Mis datos son:
- Nombres completos: 
- Cédula/Pasaporte: 
- Teléfono: 
- Hora de llegada estimada: 
- Fechas: ${reservationData?.checkIn || ''} al ${reservationData?.checkOut || ''}
- Huéspedes: ${reservationData?.guests || ''}

Confirmo que pagaré el 50% al llegar.`;

  const whatsappLink = `https://wa.me/573145284548?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header de éxito */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Reserva Registrada!
          </h1>
          <p className="text-xl text-gray-600">
            Ahora confirma tu reserva siguiendo estos pasos
          </p>
        </div>

        {/* Información de la reserva */}
        {reservationData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Resumen de tu reserva</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Propiedad</p>
                  <p className="font-semibold">{reservationData.propertyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Fechas</p>
                  <p className="font-semibold">{reservationData.checkIn} al {reservationData.checkOut}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Huéspedes</p>
                  <p className="font-semibold">{reservationData.guests} personas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-semibold text-blue-600">${reservationData.total?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de bienvenida */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">¡Hola! 👋</h2>
          <p className="text-lg leading-relaxed">
            Soy Johan, CEO Marketing de <span className="font-bold">TurismoColombia.fit</span>. 
            A partir de ahora, guárdanos en tus contactos. Te damos la bienvenida a una experiencia única en Colombia.
          </p>
        </div>

        {/* Instrucciones paso a paso */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle className="w-7 h-7 text-blue-600" />
            Pasos para confirmar tu reserva
          </h2>

          <div className="space-y-6">
            {/* Paso 1 */}
            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <h3 className="font-bold text-lg text-gray-900 mb-3">1. Envíanos tus datos por WhatsApp</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Nombres completos</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Cédula o Pasaporte</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Número telefónico válido</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Hora estimada de llegada</strong></span>
                </li>
              </ul>
            </div>

            {/* Paso 2 */}
            <div className="border-l-4 border-green-600 pl-6 py-2">
              <h3 className="font-bold text-lg text-gray-900 mb-3">2. Método de pago</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-900 font-semibold mb-2">💰 Opción 1: Pago al llegar</p>
                <p className="text-gray-700">Paga el <strong>50% del total</strong> al momento de tu llegada</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-semibold mb-3">💳 Opción 2: Transferencia bancaria (50%)</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded p-3">
                    <p className="font-bold text-gray-900">Bancolombia - Ahorros</p>
                    <p className="text-gray-700">Cuenta: <strong>40446976879</strong></p>
                    <p className="text-gray-700">A nombre de: <strong>Marlenny María Suarez Benjumea</strong></p>
                    <p className="text-gray-700">CC: 43550917</p>
                    <p className="text-xs text-gray-500 mt-2">Código Swift (giros internacionales): <strong>COLOCOBM</strong></p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="font-bold text-gray-900">Davivienda - Ahorros</p>
                    <p className="text-gray-700">Cuenta: <strong>488404459858</strong></p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="font-bold text-gray-900">Nequi</p>
                    <p className="text-gray-700">Número: <strong>3007093036</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="border-l-4 border-purple-600 pl-6 py-2">
              <h3 className="font-bold text-lg text-gray-900 mb-3">3. Servicios adicionales</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span>¿Necesitas <strong>traslados desde el aeropuerto</strong>? ¡Cuenta con nosotros!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 text-xl font-bold mt-1">🎁</span>
                  <span>Reclama tu <strong>bono -10% para tours en Medellín</strong></span>
                </li>
              </ul>
              <a
                href="/tours"
                className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Ver tours disponibles
              </a>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaWhatsapp className="w-7 h-7" />
            Confirmar por WhatsApp
          </a>

          <button
            onClick={() => {
              // Abrir chatbot
              const chatWidget = document.querySelector('.chat-widget-button') as HTMLElement;
              if (chatWidget) chatWidget.click();
            }}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <MessageCircle className="w-7 h-7" />
            Usar Chatbot
          </button>
        </div>

        {/* Información de contacto */}
        <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-6 mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">Canales de contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white rounded-lg p-4">
              <FaWhatsapp className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <a href="https://wa.me/573145284548" className="font-semibold text-blue-600 hover:underline">
                  +57 314 528 4548
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg p-4">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Llamadas</p>
                <a href="tel:+573245366804" className="font-semibold text-blue-600 hover:underline">
                  +57 324 536 6804
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmationPage;
