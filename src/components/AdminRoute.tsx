import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminRoute = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      console.log('🔍 Checking admin role...');
      console.log('👤 User:', user);
      
      if (!user) {
        console.log('❌ No user found - redirecting to home');
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log('🔎 Fetching user role from database...');
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        console.log('📊 Database response:', { data, error });

        if (error) {
          console.error('❌ Error fetching role:', error);
          throw error;
        }
        
        const hasAdminRole = data?.role === 'admin';
        console.log('✅ Is admin?', hasAdminRole);
        setIsAdmin(hasAdminRole);
      } catch (error) {
        console.error('💥 Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🚫 Redirecting to home - no user');
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    console.log('🚫 Redirecting to home - not admin');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted - rendering admin panel');
  return <Outlet />;
};

export default AdminRoute;
