import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import ToursPage from './pages/ToursPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import TourDetailPage from './pages/TourDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import BlogPage from './pages/BlogPage';
import NosotrosPage from './pages/NosotrosPage';
import DestinosPage from './pages/DestinosPage';
import AdminPropertyForm from './pages/AdminPropertyForms';
import ConfirmarCorreo from './pages/ConfirmarCorreo';
import ReservaPage from './pages/ReservaPage';
import PagoPage from './pages/PagoPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Barra de promoción */}

        {/* Ajusta el margen superior del Navbar */}
        <div className="">
          <Navbar />
        </div>
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/tour/:id" element={<TourDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/destinations" element={<DestinosPage />} />
            <Route path="/admin/properties/new" element={<AdminPropertyForm />} />
            <Route path="/confirmar-correo" element={<ConfirmarCorreo />} />
            <Route path="/reserva" element={<ReservaPage />} />
            <Route path="/pago" element={<PagoPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;