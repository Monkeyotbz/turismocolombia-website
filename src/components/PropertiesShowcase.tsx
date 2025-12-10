import React from 'react';
import QuickCard from './QuickCard';
import { quickProperties } from '../data/showcases';

type PropertiesShowcaseProps = {
  /** Maximum number of items to show. If omitted, show all. Default is 6 for homepage usage. */
  limit?: number;
};

const PropertiesShowcase: React.FC<PropertiesShowcaseProps> = ({ limit = 6 }) => {
  const items = quickProperties.slice(0, limit ?? quickProperties.length);
  const hasMore = quickProperties.length > items.length;

  return (
    <section id="properties" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="inline-block text-sm uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">Propiedades destacadas</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 leading-tight">
              <span className="text-yellow-300">Encuentra</span>{' '}
              <span className="text-blue-600">alojamientos</span>{' '}
              <span className="text-red-600">que enamoran</span>
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 text-lg">Alojamientos seleccionados por ubicación, servicio y experiencia. <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md font-medium">Reserva rápido</span> y directo desde la ficha — tu próxima aventura empieza aquí.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/properties" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold shadow">Ver todas las propiedades</a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <QuickCard key={item.id} item={item} ctaLabel="Quiero reservar" detailRoute="property" />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <a href="/properties" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow font-semibold">Ver más propiedades</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesShowcase;
