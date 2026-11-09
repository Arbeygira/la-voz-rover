import { useState, useEffect } from 'react';
import type { Song } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { Play, Pause, Volume2, Music, LogOut, Radio, Plus, Edit2, Trash2, Settings } from 'lucide-react';

interface DJDashboardProps {
  onLogout: () => void;
  userName: string;
}

export function DJDashboard({ onLogout, userName }: DJDashboardProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [listeners, setListeners] = useState(Math.floor(Math.random() * 1000) + 300);
  const [activeTab, setActiveTab] = useState<'now' | 'playlist' | 'settings'>('now');
  const [audio] = useState(new Audio());

  useEffect(() => {
    fetchSongs();
    const interval = setInterval(() => {
      setListeners(Math.floor(Math.random() * 1000) + 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');
    if (error) {
      setSongs(defaultSongs);
    } else if (data && data.length > 0) {
      setSongs(data);
    } else {
      setSongs(defaultSongs);
    }
  };

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume, audio]);

  useEffect(() => {
    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        setCurrentSongIndex(0);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio, currentSongIndex, songs.length]);

  const togglePlay = async () => {
    if (!songs.length) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = songs[currentSongIndex].url;
      audio.play();
      setIsPlaying(true);
    }
  };

  const currentSong = songs[currentSongIndex];
  const progress = currentSong ? (currentTime / currentSong.duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
              <Radio className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">LA VOZ ROVER</h1>
              <p className="text-red-400 text-xs font-semibold">DJ: {userName.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Oyentes en vivo */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Oyentes</p>
                <p className="text-white font-bold">{listeners}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 font-bold py-2 px-4 rounded-lg transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">SALIR</span>
            </button>
          </div>
        </div>

        {/* Estado en vivo */}
        <div className="bg-gradient-to-r from-red-600/20 to-transparent border-t border-red-500/20 px-4 py-2">
          <p className="text-red-400 text-sm font-semibold">🔴 EN VIVO • Compartiendo con {listeners} oyentes</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reproductor Principal - Columna izquierda */}
          <div className="lg:col-span-2">
            {currentSong && (
              <>
                {/* Album Art */}
                <div className="mb-8">
                  <div className="relative bg-gradient-to-br from-red-600 to-red-900 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="aspect-square">
                      {currentSong.cover_url ? (
                        <img
                          src={currentSong.cover_url}
                          alt={currentSong.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-900 flex items-center justify-center">
                          <Music className="text-white/50" size={120} />
                        </div>
                      )}
                    </div>

                    {/* Overlay info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                      <h2 className="text-3xl font-black text-white">{currentSong.title}</h2>
                      <p className="text-red-200 text-lg">{currentSong.artist}</p>
                    </div>
                  </div>
                </div>

                {/* Info y progreso */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
                  <div className="space-y-4">
                    {/* Barra de progreso */}
                    <div>
                      <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-400 h-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(currentSong.duration)}</span>
                      </div>
                    </div>

                    {/* Botones de control */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button className="p-3 hover:bg-white/10 rounded-lg transition">
                          <Music size={20} className="text-gray-400" />
                        </button>
                      </div>

                      <button
                        onClick={togglePlay}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg transition transform hover:scale-110 active:scale-95 flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <Pause size={36} fill="white" />
                        ) : (
                          <Play size={36} fill="white" className="ml-1" />
                        )}
                      </button>

                      <div className="flex gap-3">
                        <button className="p-3 hover:bg-white/10 rounded-lg transition">
                          <Settings size={20} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Volume */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3">
                        <Volume2 size={20} className="text-red-400" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-red-500"
                        />
                        <span className="text-white font-bold w-8">{volume}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400 text-sm">Estado</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">🔴 EN VIVO</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-400 text-sm">Oyentes</p>
                    <p className="text-2xl font-bold text-blue-400 mt-1">{listeners}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Panel Derecho - Playlist y Settings */}
          <div className="lg:col-span-1">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-white/5 p-2 rounded-lg border border-white/10">
              <button
                onClick={() => setActiveTab('now')}
                className={`flex-1 py-2 px-3 rounded transition font-semibold text-sm ${
                  activeTab === 'now'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Ahora
              </button>
              <button
                onClick={() => setActiveTab('playlist')}
                className={`flex-1 py-2 px-3 rounded transition font-semibold text-sm ${
                  activeTab === 'playlist'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Playlist
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-2 px-3 rounded transition font-semibold text-sm ${
                  activeTab === 'settings'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Config
              </button>
            </div>

            {/* Contenido según tab */}
            {activeTab === 'now' && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Music size={20} className="text-red-500" />
                  Ahora en Vivo
                </h3>
                {currentSong && (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-gray-400 text-xs mb-1">TRANSMITIENDO</p>
                    <p className="text-white font-bold text-lg">{currentSong.title}</p>
                    <p className="text-gray-400 text-sm">{currentSong.artist}</p>
                    <p className="text-red-400 text-xs mt-3 font-semibold">
                      {formatTime(currentTime)} / {formatTime(currentSong.duration)}
                    </p>
                  </div>
                )}
                <div className="text-xs text-gray-500 p-3 bg-black/30 rounded">
                  Oyentes activos: {listeners}
                </div>
              </div>
            )}

            {activeTab === 'playlist' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold">Playlist ({songs.length})</h3>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <Plus size={18} className="text-red-500" />
                  </button>
                </div>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  {songs.map((song, index) => (
                    <div
                      key={song.id}
                      onClick={() => {
                        setCurrentSongIndex(index);
                        setIsPlaying(true);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition ${
                        index === currentSongIndex
                          ? 'bg-red-600/50 border border-red-500/50'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">{song.title}</p>
                          <p className="text-gray-400 text-xs">{song.artist}</p>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-white/10 rounded">
                            <Edit2 size={14} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-white/10 rounded">
                            <Trash2 size={14} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                <div>
                  <label className="text-white text-sm font-bold block mb-2">Nombre de DJ</label>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-white">
                    {userName}
                  </div>
                </div>
                <div>
                  <label className="text-white text-sm font-bold block mb-2">Estado</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:outline-none focus:border-red-500">
                    <option>🔴 EN VIVO</option>
                    <option>⏸️ PAUSA</option>
                    <option>⚫ OFFLINE</option>
                  </select>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">
                  Guardar Cambios
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const defaultSongs = [
  {
    id: '1',
    title: 'Mountain Adventure',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 360,
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Campfire Stories',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 300,
    cover_url: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Nature Calls',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 420,
    cover_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Unity Song',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 280,
    cover_url: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop',
    created_at: new Date().toISOString(),
  },
];
