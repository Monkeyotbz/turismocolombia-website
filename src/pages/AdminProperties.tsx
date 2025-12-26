import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  property_type: string;
  featured: boolean;
  active: boolean;
  created_at: string;
}

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta propiedad?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error al eliminar la propiedad');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Propiedades</h1>
          <p className="text-gray-600 mt-1">Administra todas las propiedades del sistema</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Propiedad
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-gray-800">{properties.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Activas</p>
          <p className="text-2xl font-bold text-green-600">
            {properties.filter(p => p.active).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Destacadas</p>
          <p className="text-2xl font-bold text-yellow-600">
            {properties.filter(p => p.featured).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Inactivas</p>
          <p className="text-2xl font-bold text-red-600">
            {properties.filter(p => !p.active).length}
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
                  Propiedad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio/Noche
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacidad
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
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{property.name}</p>
                      {property.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 inline-block">
                          Destacada
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {property.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                    {property.property_type}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    ${property.price_per_night.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {property.guests} huéspedes
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(property.id, property.active)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {property.active ? 'Activa' : 'Inactiva'}
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
                        onClick={() => handleDelete(property.id)}
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

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron propiedades</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProperties;
