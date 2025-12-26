import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import WelcomeModal from './components/WelcomeModal';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPageDynamic from './pages/PropertiesPageDynamic';
import ToursPageDynamic from './pages/ToursPageDynamic';
import PropertyDetailPageDynamic from './pages/PropertyDetailPageDynamic';
import TourDetailPageDynamic from './pages/TourDetailPageDynamic';
import LoginPageNew from './pages/LoginPageNew';
import SignupPageNew from './pages/SignupPageNew';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import NosotrosPage from './pages/NosotrosPage';
import DestinosPage from './pages/DestinosPage';
import AdminPropertyForm from './pages/AdminPropertyForms';
import ConfirmarCorreo from './pages/ConfirmarCorreo';
import AdminDashboard from './pages/AdminDashboard';
import AdminProperties from './pages/AdminProperties';
import AdminTours from './pages/AdminTours';
import AdminUsers from './pages/AdminUsers';
import ReservaPage from './pages/ReservaPage';
import PagoPage from './pages/PagoPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

// Layout wrapper para rutas públicas
function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
        <PublicLayout>
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPageDynamic />} />
              <Route path="/tours" element={<ToursPageDynamic />} />
              <Route path="/property/:id" element={<PropertyDetailPageDynamic />} />
              <Route path="/tour/:id" element={<TourDetailPageDynamic />} />
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
            
            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="tours" element={<AdminTours />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Configuración</h1><p className="text-gray-600 mt-2">Próximamente...</p></div>} />
              </Route>
            </Route>
          </Routes>
        </main>
        </PublicLayout>
        <WelcomeModal />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;