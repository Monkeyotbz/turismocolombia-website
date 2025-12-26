import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';

interface Tour {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  price: number;
  duration: string;
  difficulty: string;
  max_people: number;
  featured: boolean;
  active: boolean;
  created_at: string;
}

const AdminTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este tour?')) return;

    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('Error al eliminar el tour');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('tours')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchTours();
    } catch (error) {
      console.error('Error updating tour:', error);
    }
  };

  const filteredTours = tours.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Tours</h1>
          <p className="text-gray-600 mt-1">Administra todos los tours del sistema</p>
        </div>
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Tour
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-gray-800">{tours.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Activos</p>
          <p className="text-2xl font-bold text-green-600">
            {tours.filter(t => t.active).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Destacados</p>
          <p className="text-2xl font-bold text-yellow-600">
            {tours.filter(t => t.featured).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Inactivos</p>
          <p className="text-2xl font-bold text-red-600">
            {tours.filter(t => !t.active).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dificultad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{tour.name}</p>
                      {tour.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 inline-block">
                          Destacado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {tour.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {tour.duration}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    ${tour.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tour.difficulty === 'fácil' ? 'bg-green-100 text-green-800' :
                      tour.difficulty === 'moderado' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tour.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(tour.id, tour.active)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tour.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tour.active ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron tours</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTours;
