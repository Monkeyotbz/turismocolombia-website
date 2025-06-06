import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard, { PropertyType } from '../components/PropertyCard';
import FilterSidebar, { FilterState } from '../components/FilterSidebar';
import { Sliders, RefreshCw } from 'lucide-react';

const PropertiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [allProperties, setAllProperties] = useState<PropertyType[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    propertyTypes: [],
    amenities: [],
    rating: null,
  });

  const [sortOption, setSortOption] = useState('recommended');
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = Number(searchParams.get('guests')) || 2;

  // Cargar propiedades desde el backend
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => {
        setAllProperties(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Aplica filtros y ordenamiento sobre allProperties
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let results = [...allProperties];

      if (destination) {
        results = results.filter(property =>
          property.location.toLowerCase().includes(destination.toLowerCase())
        );
      }

      results = results.filter(property =>
        property.price >= activeFilters.priceRange[0] &&
        property.price <= activeFilters.priceRange[1]
      );

      if (activeFilters.propertyTypes.length > 0) {
        results = results.filter(property =>
          activeFilters.propertyTypes.includes(property.type)
        );
      }

      if (activeFilters.amenities.length > 0) {
        results = results.filter(property =>
          activeFilters.amenities.every(amenity =>
            property.amenities.includes(amenity)
          )
        );
      }

      if (activeFilters.rating !== null) {
        results = results.filter(property =>
          property.rating >= activeFilters.rating!
        );
      }

      switch (sortOption) {
        case 'price-low':
          results = results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results = results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results = results.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }

      setFilteredProperties(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [allProperties, destination, activeFilters, sortOption]);

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const getSkeletonCards = () => {
    return Array(8).fill(null).map((_, index) => (
      <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
        <div className="w-full h-56 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex space-x-2 mb-3">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-28 mt-4"></div>
        </div>
      </div>
    ));
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {destination ? `Propiedades en ${destination}` : 'Todas las propiedades'}
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                {checkIn && checkOut ? ` · ${checkIn} a ${checkOut}` : ''}
                {guests ? ` · ${guests} ${guests === 1 ? 'persona' : 'personas'}` : ''}
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recommended">Recomendado</option>
                  <option value="price-low">Precio (menor a mayor)</option>
                  <option value="price-high">Precio (mayor a menor)</option>
                  <option value="rating">Mejor calificados</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              </div>
              <button 
                className="md:hidden flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg"
                onClick={toggleFilter}
              >
                <Sliders className="w-4 h-4" />
                <span>Filtros</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <div className="sticky top-24">
              <FilterSidebar onApplyFilters={handleApplyFilters} />
            </div>
          </div>
          
          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div className="md:hidden">
              <FilterSidebar 
                onApplyFilters={handleApplyFilters} 
                isMobile={true}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          )}
          
          {/* Property Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getSkeletonCards()}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <RefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron propiedades</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  No hay propiedades que coincidan con tus filtros actuales. Intenta ajustar tus criterios de búsqueda para encontrar más opciones.
                </p>
                <button
                  onClick={() => setActiveFilters({
                    priceRange: [0, 1000],
                    propertyTypes: [],
                    amenities: [],
                    rating: null,
                  })}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;