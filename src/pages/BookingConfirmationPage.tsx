import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, MessageCircle } from 'lucide-react';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [confirmationData, setConfirmationData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('confirmationData');
    if (data) {
      setConfirmationData(JSON.parse(data));
    } else {
      navigate('/properties');
    }
  }, [navigate]);

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[110px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando confirmación...</p>
        </div>
      </div>
    );
  }

  const { 
    propertyName, 
    checkIn, 
    checkOut, 
    guests, 
    customerData, 
    confirmationId, 
    priceBreakdown 
  } = confirmationData;

  const handleWhatsApp = () => {
    const message = `Hola, he realizado una reserva en ${propertyName} con confirmación ${confirmationId}. Agradezco si pueden validar los detalles de mi reserva.`;
    const whatsappLink = `https://wa.me/573145284548?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleDownloadVoucher = () => {
    // En producción, aquí generarías un PDF
    const voucherContent = `
CONFIRMACIÓN DE RESERVA
ID: ${confirmationId}

PROPIEDAD: ${propertyName}
HUÉSPED: ${customerData.fullName}
EMAIL: ${customerData.email}
TELÉFONO: ${customerData.phone}

FECHAS:
Entrada: ${new Date(checkIn).toLocaleDateString('es-CO')}
Salida: ${new Date(checkOut).toLocaleDateString('es-CO')}
Huéspedes: ${guests}

TOTAL: $${priceBreakdown.totalPrice.toLocaleString('es-CO')}

Confirme su reserva a través de WhatsApp o espere nuestro contacto.
`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(voucherContent));
    element.setAttribute('download', `reserva-${confirmationId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-[110px]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-center text-white mb-8 shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="bg-white/30 rounded-full p-4 backdrop-blur-lg">
                <Check className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Reserva Confirmada!</h1>
            <p className="text-green-100 text-lg">Tu aventura en Colombia está por comenzar</p>
          </div>

          {/* Confirmation details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Información de confirmación */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📋 Detalles de confirmación
              </h2>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">ID de Confirmación</p>
                  <p className="text-2xl font-bold text-blue-600 font-mono">{confirmationId}</p>
                  <p className="text-xs text-gray-500 mt-1">Guarda este número para referencias futuras</p>
                </div>

                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between pb-3 border-b">
                    <span className="font-semibold">Propiedad:</span>
                    <span>{propertyName}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span className="font-semibold">📅 Entrada:</span>
                    <span>{new Date(checkIn).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span className="font-semibold">📅 Salida:</span>
                    <span>{new Date(checkOut).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span className="font-semibold">👥 Huéspedes:</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b">
                    <span className="font-semibold">🌙 Noches:</span>
                    <span>{priceBreakdown.nights}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-blue-600 pt-2">
                    <span>Total:</span>
                    <span>${priceBreakdown.totalPrice.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del huésped */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                👤 Información del huésped
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="text-lg font-semibold text-gray-900">{customerData.fullName}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-900 break-all">{customerData.email}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="text-lg font-semibold text-gray-900">{customerData.phone}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">País</p>
                  <p className="text-lg font-semibold text-gray-900">{customerData.country}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                  <p>✓ Te enviaremos un email de confirmación a tu correo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📌 Próximos pasos</h2>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contacto de confirmación</p>
                  <p className="text-gray-600 text-sm">Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para confirmar detalles</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Información de acceso</p>
                  <p className="text-gray-600 text-sm">Recibirás las instrucciones de check-in y acceso 48 horas antes de tu llegada</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">¡A disfrutar tu viaje!</p>
                  <p className="text-gray-600 text-sm">Prepárate para vivir una experiencia inolvidable en Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </button>

            <button
              onClick={handleDownloadVoucher}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Descargar comprobante
            </button>
          </div>

          {/* Important info */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <p className="text-sm text-amber-900 mb-3">
              <strong>ℹ️ Importante:</strong>
            </p>
            <ul className="space-y-2 text-sm text-amber-900">
              <li>• La reserva está confirmada solo cuando recibas nuestro email de confirmación</li>
              <li>• Puedes cancelar hasta 7 días antes de tu fecha de llegada sin penalización</li>
              <li>• Si necesitas cambiar fechas, contáctanos por WhatsApp o email</li>
              <li>• Llegaremos 15 minutos antes de tu hora de check-in confirmada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
