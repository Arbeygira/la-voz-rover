import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { DJLogin } from './pages/DJLogin';
import { Listener } from './pages/Listener';
import { DJDashboard } from './pages/DJDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDJLogin, setShowDJLogin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowDJLogin(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          <p className="text-white text-xl mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si hay usuario logeado (DJ/Admin)
  if (user) {
    return (
      <DJDashboard
        onLogout={handleLogout}
        userName={user.email?.split('@')[0] || 'DJ'}
      />
    );
  }

  // Si está seleccionada la opción de login DJ
  if (showDJLogin) {
    return (
      <DJLogin
        onSuccess={() => setShowDJLogin(false)}
        onBack={() => setShowDJLogin(false)}
      />
    );
  }

  // Interfaz por defecto para oyentes
  return (
    <Listener onShowDJLogin={() => setShowDJLogin(true)} />
  );
}

export default App;
