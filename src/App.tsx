import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import WelcomeModal from './components/WelcomeModal';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import ToursPage from './pages/ToursPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import TourDetailPage from './pages/TourDetailPage';
import LoginPage from './pages/LoginPage';
import LoginPageNew from './pages/LoginPageNew';
import SignupPage from './pages/SignupPage';
import SignupPageNew from './pages/SignupPageNew';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import NosotrosPage from './pages/NosotrosPage';
import DestinosPage from './pages/DestinosPage';
import AdminPropertyForm from './pages/AdminPropertyForms';
import ConfirmarCorreo from './pages/ConfirmarCorreo';
import ReservaPage from './pages/ReservaPage';
import PagoPage from './pages/PagoPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

function App() {
  return (
    <Router>
      <AuthProvider>
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
            <Route path="/login" element={<LoginPageNew />} />
            <Route path="/signup" element={<SignupPageNew />} />
            <Route path="/register" element={<SignupPageNew />} />
            <Route path="/registro" element={<SignupPageNew />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <WelcomeModal />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;