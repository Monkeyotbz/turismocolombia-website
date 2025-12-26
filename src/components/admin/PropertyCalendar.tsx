import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '../../supabaseClient';
import { X, DollarSign, Lock } from 'lucide-react';
import BlockDatesModal from '../BlockDatesModal';
import SpecialPriceModal from '../SpecialPriceModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface PropertyCalendarProps {
  propertyId: string;
  propertyName: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'booking' | 'blocked' | 'special_price';
  data?: any;
}

const PropertyCalendar = ({ propertyId, propertyName, isOpen, onClose }: PropertyCalendarProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    if (isOpen && propertyId) {
      fetchCalendarData();
    }
  }, [isOpen, propertyId]);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      // Obtener información de la propiedad (precio base)
      const { data: property } = await supabase
        .from('properties')
        .select('price_per_night')
        .eq('id', propertyId)
        .single();
      
      if (property) {
        setBasePrice(property.price_per_night);
      }

      // Obtener reservas
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, users(email)')
        .eq('property_id', propertyId)
        .neq('status', 'cancelled');

      // Obtener fechas bloqueadas
      const { data: blocked } = await supabase
        .from('blocked_dates')
        .select('*')
        .eq('property_id', propertyId);

      // Obtener precios especiales
      const { data: specialPrices } = await supabase
        .from('special_pricing')
        .select('*')
        .eq('property_id', propertyId)
        .eq('active', true);

      const allEvents: CalendarEvent[] = [];

      // Agregar reservas al calendario
      bookings?.forEach(booking => {
        allEvents.push({
          id: booking.id,
          title: `Reserva - ${booking.users?.email || 'Usuario'}`,
          start: new Date(booking.check_in),
          end: new Date(booking.check_out),
          type: 'booking',
          data: booking,
        });
      });

      // Agregar fechas bloqueadas
      blocked?.forEach(block => {
        allEvents.push({
          id: block.id,
          title: `Bloqueado - ${block.reason || 'Sin razón'}`,
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked',
          data: block,
        });
      });

      // Agregar precios especiales
      specialPrices?.forEach(price => {
        allEvents.push({
          id: price.id,
          title: `$${price.price_per_night.toLocaleString()} - ${price.reason || 'Precio especial'}`,
          start: new Date(price.start_date),
          end: new Date(price.end_date),
          type: 'special_price',
          data: price,
        });
      });

      setEvents(allEvents);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3174ad';
    
    switch (event.type) {
      case 'booking':
        backgroundColor = '#10b981'; // Verde
        break;
      case 'blocked':
        backgroundColor = '#ef4444'; // Rojo
        break;
      case 'special_price':
        backgroundColor = '#f59e0b'; // Amarillo
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{propertyName}</h2>
            <p className="text-gray-600 text-sm mt-1">Calendario de Disponibilidad</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBlockModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Lock className="w-4 h-4" />
              Bloquear Fechas
            </button>
            <button
              onClick={() => setShowPriceModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              <DollarSign className="w-4 h-4" />
              Precio Especial
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Leyenda */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Reservas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Bloqueado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Precio Especial</span>
          </div>
        </div>

        {/* Calendario */}
        <div className="flex-1 p-6 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={(event: CalendarEvent) => setSelectedEvent(event)}
              culture="es"
              messages={{
                next: 'Siguiente',
                previous: 'Anterior',
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                agenda: 'Agenda',
                date: 'Fecha',
                time: 'Hora',
                event: 'Evento',
                noEventsInRange: 'No hay eventos en este rango',
                showMore: (total: number) => `+ Ver más (${total})`,
              }}
            />
          )}
        </div>

        {/* Modal de Detalles del Evento */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Detalles</h3>
                <button onClick={() => setSelectedEvent(null)}>
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-semibold capitalize">{selectedEvent.type === 'booking' ? 'Reserva' : selectedEvent.type === 'blocked' ? 'Bloqueado' : 'Precio Especial'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Desde</p>
                  <p className="font-semibold">{format(selectedEvent.start, 'dd/MM/yyyy', { locale: es })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hasta</p>
                  <p className="font-semibold">{format(selectedEvent.end, 'dd/MM/yyyy', { locale: es })}</p>
                </div>

                {selectedEvent.type === 'booking' && selectedEvent.data && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Cliente</p>
                      <p className="font-semibold">{selectedEvent.data.users?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Huéspedes</p>
                      <p className="font-semibold">{selectedEvent.data.guests} personas</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Precio Total</p>
                      <p className="font-semibold text-green-600">
                        ${selectedEvent.data.total_price?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estado</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedEvent.data.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        selectedEvent.data.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedEvent.data.status}
                      </span>
                    </div>
                  </>
                )}

                {selectedEvent.type === 'special_price' && selectedEvent.data && (
                  <div>
                    <p className="text-sm text-gray-500">Precio por Noche</p>
                    <p className="font-semibold text-yellow-600">
                      ${selectedEvent.data.price_per_night?.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modales */}
        <BlockDatesModal
          isOpen={showBlockModal}
          onClose={() => setShowBlockModal(false)}
          propertyId={propertyId}
          propertyName={propertyName}
          onSuccess={fetchCalendarData}
        />
        <SpecialPriceModal
          isOpen={showPriceModal}
          onClose={() => setShowPriceModal(false)}
          propertyId={propertyId}
          propertyName={propertyName}
          basePrice={basePrice}
          onSuccess={fetchCalendarData}
        />
      </div>
    </div>
  );
};

export default PropertyCalendar;
