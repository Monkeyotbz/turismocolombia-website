import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Building2, Map, Users, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    tours: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [propertiesRes, toursRes, usersRes] = await Promise.all([
          supabase.from('properties').select('id', { count: 'exact', head: true }),
          supabase.from('tours').select('id', { count: 'exact', head: true }),
          supabase.from('users').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          properties: propertiesRes.count || 0,
          tours: toursRes.count || 0,
          users: usersRes.count || 0,
        });
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
      name: 'Rendimiento',
      value: '98%',
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-500',
    },
  ];

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
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/properties"
            className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">Gestionar Propiedades</p>
              <p className="text-sm text-gray-500">Ver, crear y editar</p>
            </div>
          </a>
          <a
            href="/admin/tours"
            className="flex items-center gap-3 p-4 border-2 border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            <Map className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-semibold text-gray-800">Gestionar Tours</p>
              <p className="text-sm text-gray-500">Ver, crear y editar</p>
            </div>
          </a>
          <a
            href="/admin/users"
            className="flex items-center gap-3 p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Users className="w-8 h-8 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Gestionar Usuarios</p>
              <p className="text-sm text-gray-500">Ver perfiles</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
