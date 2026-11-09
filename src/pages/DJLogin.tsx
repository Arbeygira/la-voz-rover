import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, ArrowRight, Radio, X } from 'lucide-react';

interface DJLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function DJLogin({ onSuccess, onBack }: DJLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          await supabase.from('users').insert({
            id: data.user.id,
            email,
            display_name: displayName || email.split('@')[0],
          });
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Close Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 z-50 p-2 hover:bg-white/10 rounded-lg transition"
      >
        <X className="text-white" size={24} />
      </button>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Radio className="text-red-500" size={40} />
              <h1 className="text-3xl font-black text-white">LA VOZ</h1>
            </div>
            <p className="text-red-400 font-bold">DJ / LOCUTOR LOGIN</p>
            <p className="text-gray-400 text-sm mt-2">Acceso exclusivo para transmisores</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-white text-sm font-bold mb-2">Nombre de DJ</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tu nombre artístico"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-white text-sm font-bold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-red-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-bold mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-red-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
            >
              {loading ? 'Cargando...' : (isSignUp ? 'Registrar DJ' : 'Acceder como DJ')}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-red-400 hover:text-red-300 transition font-semibold"
            >
              {isSignUp
                ? '¿Ya tienes cuenta? Accede'
                : '¿Eres nuevo? Regístrate como DJ'}
            </button>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-400 text-xs text-center">
              Este acceso es solo para DJs y locutores registrados. Si no estás registrado, solicita tu acceso al administrador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
