import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import PropertyCard, { PropertyType } from '../components/PropertyCard';
import { ArrowRight, ThumbsUp, BadgePercent, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubscribeModal from '../components/SubscribeModal';
import AboutCEOSection from '../components/AboutCEOSection';
import Background from '../components/Background'; // Importa el componente Background
import { useUser } from "../context/UserContext";

const destinations = [
  {
    name: 'Jardin Antioquia',
    image: '/JardinA.jpg',
    properties: 10
  },
  {
    name: 'cartagena, Bolívar', 
    image: '/Cartagena1.3.jpg',
    properties: 15
  },
  {
    name: 'Medellín, Antioquia',
    image: '/Medellin1.jpg',
    properties: 5
  },
  {
    name: 'Jerico Antioquia',
    image: 'Jerico1.jpg',
    properties: 2
  }
];

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<PropertyType[]>([]);
  const { user } = useUser(); // OBTIENE EL USUARIO

  useEffect(() => {
    // Solo muestra el modal si NO hay usuario
    if (!user) {
      const timer = setTimeout(() => setShowModal(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [user]);

  useEffect(() => {
    // Petición al backend para obtener propiedades
    fetch("http://localhost:5000/properties")
      .then(res => res.json())
      .then(data => setFeaturedProperties(data))
      .catch(() => setFeaturedProperties([]));
  }, []);

  return (
    <Background>
      <div>
        {!user && (
          <SubscribeModal open={showModal} onClose={() => setShowModal(false)} />
        )}
        <HeroSection />
        <AboutCEOSection />
        
        {/* Featured Properties */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Propiedades Destacadas</h2>
                <p className="text-gray-600 mt-2">Alojamientos seleccionados para tu próxima aventura</p>
              </div>
              <Link 
                to="/properties" 
                className="flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                Ver todas
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.length === 0 ? (
                <div className="col-span-4 text-center text-gray-400 py-8">
                  No hay propiedades destacadas disponibles.
                </div>
              ) : (
                featuredProperties.slice(0, 4).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">¿Por qué elegir Colombiaturismo.fit?</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Ofrecemos una experiencia de reserva excepcional con ofertas exclusivas y recomendaciones personalizadas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Mejor Precio Garantizado</h3>
                <p className="text-gray-600">
                  Igualamos o superamos cualquier precio de la competencia, asegurando que siempre obtengas la mejor oferta disponible.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgePercent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ofertas Exclusivas</h3>
                <p className="text-gray-600">
                  Accede a promociones y descuentos especiales que no encontrarás en otras plataformas de reservas.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Experiencia Local</h3>
                <p className="text-gray-600">
                  Obtén consejos y recomendaciones de nuestro equipo de expertos locales en viajes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Destinos Populares</h2>
                <p className="text-gray-600 mt-2">Explora nuestros destinos más reservados alrededor de Colombia</p>
              </div>
              <Link 
                to="/destinations" 
                className="flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                Ver todos los destinos
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination, index) => (
                <Link
                  key={index}
                  to={`/properties?destination=${encodeURIComponent(destination.name)}`}
                  className="group rounded-xl overflow-hidden shadow-md relative"
                >
                  <div className="relative w-full h-80">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
                    <p className="text-white text-sm opacity-90">{destination.properties} propiedades</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Background>
  );
};

export default HomePage;