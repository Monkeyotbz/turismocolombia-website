import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Building2, Map, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  user_id: string;
  booking_type: string;
  check_in: string;
  check_out: string | null;
  guests: number;
  total_price: number;
  status: string;
  created_at: string;
  users: {
    email: string;
  };
  properties: {
    name: string;
  } | null;
  tours: {
    name: string;
  } | null;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    tours: 0,
    users: 0,
    bookings: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [propertiesRes, toursRes, usersRes, bookingsRes] = await Promise.all([
          supabase.from('properties').select('id', { count: 'exact', head: true }),
          supabase.from('tours').select('id', { count: 'exact', head: true }),
          supabase.from('users').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          properties: propertiesRes.count || 0,
          tours: toursRes.count || 0,
          users: usersRes.count || 0,
          bookings: bookingsRes.count || 0,
        });

        // Fetch recent bookings with user and property/tour info
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select(`
            *,
            users(email),
            properties(name),
            tours(name)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        setBookings(bookingsData || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Propiedades',
      value: stats.properties,
      icon: Building2,
      color: 'blue',
      bgColor: 'bg-blue-500',
    },
    {
      name: 'Tours',
      value: stats.tours,
      icon: Map,
      color: 'yellow',
      bgColor: 'bg-yellow-500',
    },
    {
      name: 'Usuarios',
      value: stats.users,
      icon: Users,
      color: 'red',
      bgColor: 'bg-red-500',
    },
    {
      name: 'Reservaciones',
      value: stats.bookings,
      icon: Calendar,
      color: 'green',
      bgColor: 'bg-green-500',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmada' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelada' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completada' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Bienvenido al Panel de Administración</h2>
        <p className="text-gray-600 mt-1">Aquí puedes gestionar todo el contenido de tu sitio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/properties"
            className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">Gestionar Propiedades</p>
              <p className="text-sm text-gray-500">Ver, crear y editar</p>
            </div>
          </Link>
          <Link
            to="/admin/tours"
            className="flex items-center gap-3 p-4 border-2 border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            <Map className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-semibold text-gray-800">Gestionar Tours</p>
              <p className="text-sm text-gray-500">Ver, crear y editar</p>
            </div>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Users className="w-8 h-8 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Gestionar Usuarios</p>
              <p className="text-sm text-gray-500">Ver perfiles</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Reservaciones Recientes</h3>
          <p className="text-sm text-gray-500 mt-1">Últimas 10 reservaciones realizadas</p>
        </div>
        
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Entrada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Huéspedes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {booking.users?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {booking.booking_type === 'property' 
                        ? booking.properties?.name 
                        : booking.tours?.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.booking_type === 'property' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.booking_type === 'property' ? 'Propiedad' : 'Tour'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(booking.check_in).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.guests}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      ${booking.total_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay reservaciones aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
