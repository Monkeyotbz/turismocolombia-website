import React, { useState, useEffect } from 'react';
import PropertyCard, { PropertyType } from '../components/PropertyCard';
import Background from '../components/Background'; // Importa el componente Background

const propertyTypes = [
  'Todas',
  'Villa',
  'Cabaña',
  'Apartamento',
  'Bungalow',
  'Casa',
  'Cottage'
];

const PropertiesPage: React.FC = () => {
  const [allProperties, setAllProperties] = useState<PropertyType[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('Todas');

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/properties') // <-- Cambia aquí
      .then(res => res.json())
      .then(data => {
        setAllProperties(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let results = [...allProperties];
    if (filterType !== 'Todas') {
      results = results.filter(p => p.type === filterType);
    }
    setFilteredProperties(results);
  }, [allProperties, filterType]);

  return (
    <Background>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Propiedades</h1>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-48"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="md:w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(null).map((_, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse h-80" />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron propiedades</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  No hay propiedades que coincidan con el tipo seleccionado.
                </p>
                <button
                  onClick={() => setFilterType('Todas')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver todas
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Background>
  );
};

export default PropertiesPage;