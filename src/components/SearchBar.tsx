import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { quickProperties, quickTours, suggestedDestinations } from '../data/showcases';

interface SearchBarProps {
  onSearch: (searchParams: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => void;
  className?: string;
}

/** Minimal SearchBar: single input with local suggestions from properties/tours/destinations. */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const items = useMemo(() => {
    const propsMatches = quickProperties
      .filter(p => (p.name + ' ' + p.location).toLowerCase().includes(query.toLowerCase()))
      .map(p => ({ type: 'property' as const, id: p.id, title: p.name, subtitle: p.location }));

    const toursMatches = quickTours
      .filter(t => (t.name + ' ' + t.location).toLowerCase().includes(query.toLowerCase()))
      .map(t => ({ type: 'tour' as const, id: t.id, title: t.name, subtitle: t.location }));

    const destMatches = suggestedDestinations
      .filter(d => d.toLowerCase().includes(query.toLowerCase()))
      .map(d => ({ type: 'destination' as const, id: d, title: d, subtitle: '' }));

    // Prioritize properties, then tours, then destinations
    return [...propsMatches, ...toursMatches, ...destMatches].slice(0, 6);
  }, [query]);

  const handleSelect = (title: string) => {
    setQuery(title);
    setShowList(false);
    onSearch({ destination: title, checkIn: '', checkOut: '', guests: 2 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowList(false);
    onSearch({ destination: query, checkIn: '', checkOut: '', guests: 2 });
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowList(true); }}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 150)}
          placeholder="Buscar propiedades, tours o destinos"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {showList && query.trim().length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50 max-h-56 overflow-auto">
          {items.length === 0 ? (
            <li className="p-3 text-sm text-gray-500">No se encontraron resultados</li>
          ) : (
            items.map(it => (
              <li
                key={`${it.type}-${it.id}`}
                onMouseDown={() => handleSelect(it.title)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex flex-col"
              >
                <span className="text-sm font-medium text-gray-900">{it.title}</span>
                {it.subtitle && <span className="text-xs text-gray-500">{it.subtitle}</span>}
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
