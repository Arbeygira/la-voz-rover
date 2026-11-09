import { useState, useEffect } from 'react';
import type { Song } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { Play, Pause, Volume2, Music } from 'lucide-react';

interface PlayerProps {
  onLogout: () => void;
  userName: string;
}

export function Player({ onLogout, userName }: PlayerProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [listeners, setListeners] = useState(Math.floor(Math.random() * 500) + 50);
  const [audio] = useState(new Audio());

  useEffect(() => {
    fetchSongs();
    const interval = setInterval(() => {
      setListeners(Math.floor(Math.random() * 500) + 50);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');
    if (error) {
      console.error('Error fetching songs:', error);
      // Usar datos de demostración si no hay conexión
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">La Voz Rover</h1>
            <p className="text-purple-200">Emisora Scout Virtual</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500/30 hover:bg-red-500/50 text-white px-6 py-2 rounded-lg transition border border-red-500/50"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Welcome Message */}
        <div className="mb-8 p-4 bg-white/10 rounded-lg border border-white/20">
          <p className="text-white">
            Bienvenido, <span className="font-bold text-purple-300">{userName}</span>
          </p>
          <p className="text-purple-200 text-sm mt-1">
            🔴 EN VIVO · {listeners.toLocaleString()} escuchas activos
          </p>
        </div>

        {/* Album Art */}
        {currentSong && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              {currentSong.cover_url ? (
                <img
                  src={currentSong.cover_url}
                  alt={currentSong.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-purple-700 to-blue-700 rounded-lg flex items-center justify-center">
                  <Music className="text-white" size={80} />
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white">{currentSong.title}</h2>
              <p className="text-purple-200 text-lg mt-2">{currentSong.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="bg-white/20 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-400 to-blue-400 h-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-purple-200 text-xs mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 space-y-6">
          {/* Play Button */}
          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-6 rounded-full transition transform hover:scale-105 shadow-lg"
            >
              {isPlaying ? (
                <Pause size={40} fill="white" />
              ) : (
                <Play size={40} fill="white" />
              )}
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4">
            <Volume2 className="text-purple-300" size={24} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-white w-12 text-right">{volume}%</span>
          </div>

          {/* Playlist */}
          {songs.length > 0 && (
            <div>
              <h3 className="text-white font-bold mb-4">Playlist ({songs.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      index === currentSongIndex
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                        : 'bg-white/10 hover:bg-white/20'
                    } border ${
                      index === currentSongIndex
                        ? 'border-purple-400'
                        : 'border-white/20'
                    }`}
                  >
                    <p className="text-white font-semibold">{song.title}</p>
                    <p className="text-purple-200 text-sm">{song.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const defaultSongs: Song[] = [
  {
    id: '1',
    title: 'Mountain Adventure',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 360,
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Campfire Stories',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 300,
    cover_url: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Nature Calls',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 420,
    cover_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Unity Song',
    artist: 'Scout Anthem Band',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 280,
    cover_url: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop',
    created_at: new Date().toISOString(),
  },
];
