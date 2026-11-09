import { useState, useEffect } from 'react';
import type { Song } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { Play, Pause, Volume2, Music, LogIn, Radio } from 'lucide-react';

interface ListenerProps {
  onShowDJLogin: () => void;
}

export function Listener({ onShowDJLogin }: ListenerProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [listeners, setListeners] = useState(Math.floor(Math.random() * 500) + 150);
  const [audio] = useState(new Audio());

  useEffect(() => {
    fetchSongs();
    const interval = setInterval(() => {
      setListeners(Math.floor(Math.random() * 500) + 150);
    }, 8000);
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
      {/* Header con botón DJ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Radio className="text-red-500" size={32} />
            <div>
              <h1 className="text-3xl font-black text-white">LA VOZ ROVER</h1>
              <p className="text-red-400 text-sm font-semibold">EMISORA SCOUT VIRTUAL</p>
            </div>
          </div>
          <button
            onClick={onShowDJLogin}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105"
          >
            <LogIn size={20} />
            DJ LOGIN
          </button>
        </div>

        {/* Indicador en vivo */}
        <div className="border-t border-white/10 bg-gradient-to-r from-red-600/10 to-transparent px-4 py-2">
          <div className="flex items-center gap-2 text-white">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">EN VIVO</span>
            <span className="text-red-400">•</span>
            <span className="text-sm">{listeners.toLocaleString()} oyentes ahora</span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Visualizador de canción */}
          {currentSong && (
            <div className="mb-8 group cursor-pointer">
              <div className="relative bg-gradient-to-br from-red-600 to-red-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Fondo animado */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221%22 opacity=%220.5%22/></svg>')] animate-pulse"></div>
                </div>

                <div className="relative z-10">
                  {currentSong.cover_url ? (
                    <img
                      src={currentSong.cover_url}
                      alt={currentSong.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-red-500 to-red-900 rounded-2xl flex items-center justify-center">
                      <Music className="text-white/50" size={120} />
                    </div>
                  )}
                </div>
              </div>

              {/* Información de canción */}
              <div className="mt-8 text-center">
                <h2 className="text-4xl font-black text-white mb-2">{currentSong.title}</h2>
                <p className="text-xl text-gray-400">{currentSong.artist}</p>
              </div>

              {/* Barra de progreso */}
              <div className="mt-8">
                <div className="bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-400 h-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-gray-400 text-sm mt-3">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Controles principales */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl space-y-6">
            {/* Play Button */}
            <div className="flex justify-center">
              <button
                onClick={togglePlay}
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl transition transform hover:scale-110 active:scale-95 flex items-center justify-center group"
              >
                <div className="absolute inset-0 rounded-full bg-red-400/20 group-hover:bg-red-400/40 transition blur-xl"></div>
                <div className="relative">
                  {isPlaying ? (
                    <Pause size={48} fill="white" />
                  ) : (
                    <Play size={48} fill="white" className="ml-1" />
                  )}
                </div>
              </button>
            </div>

            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Volume2 className="text-red-400 flex-shrink-0" size={24} />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-red-500"
                />
                <span className="text-white font-semibold w-10 text-right">{volume}</span>
              </div>
            </div>

            {/* Playlist */}
            {songs.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Music size={20} className="text-red-500" />
                  Próximas Canciones
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {songs.map((song, index) => (
                    <div
                      key={song.id}
                      onClick={() => {
                        setCurrentSongIndex(index);
                        setIsPlaying(true);
                      }}
                      className={`p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                        index === currentSongIndex
                          ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-semibold">{song.title}</p>
                          <p className="text-gray-300 text-sm">{song.artist}</p>
                        </div>
                        <span className="text-gray-400 text-sm flex-shrink-0">
                          {formatTime(song.duration)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 text-center border border-white/10">
              <p className="text-gray-400 text-sm">Estado</p>
              <p className="text-2xl font-bold text-red-500 mt-1">EN VIVO</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 text-center border border-white/10">
              <p className="text-gray-400 text-sm">Oyentes</p>
              <p className="text-2xl font-bold text-white mt-1">{listeners}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 text-center border border-white/10">
              <p className="text-gray-400 text-sm">Canciones</p>
              <p className="text-2xl font-bold text-white mt-1">{songs.length}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10 py-3">
        <div className="max-w-2xl mx-auto px-4 text-center text-gray-500 text-sm">
          🎙️ La Voz Rover © 2026 - Emisora Scout Virtual
        </div>
      </footer>
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
