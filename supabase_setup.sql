-- SQL para configurar la base de datos en Supabase
-- Ejecuta estos comandos en el SQL Editor de Supabase

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de canciones
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  duration INTEGER NOT NULL,
  cover_url TEXT,
  genre VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de sesiones de streaming
CREATE TABLE IF NOT EXISTS stream_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_live BOOLEAN DEFAULT true,
  current_song_id UUID REFERENCES songs(id),
  listeners INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de historial de reproducciones
CREATE TABLE IF NOT EXISTS playback_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES stream_sessions(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  duration_played INTEGER
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_songs_artist ON songs(artist);
CREATE INDEX IF NOT EXISTS idx_stream_sessions_user_id ON stream_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_stream_sessions_is_live ON stream_sessions(is_live);
CREATE INDEX IF NOT EXISTS idx_stream_sessions_started_at ON stream_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_playback_history_session_id ON playback_history(session_id);
CREATE INDEX IF NOT EXISTS idx_playback_history_played_at ON playback_history(played_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE playback_history ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuarios
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Políticas RLS para canciones (todos pueden leer)
CREATE POLICY "Anyone can read songs"
  ON songs FOR SELECT
  USING (true);

-- Políticas RLS para sesiones de streaming
CREATE POLICY "Users can view all stream sessions"
  ON stream_sessions FOR SELECT
  USING (true);

CREATE POLICY "Users can create stream sessions"
  ON stream_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stream sessions"
  ON stream_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Políticas RLS para historial de reproducción
CREATE POLICY "Users can view their session playback history"
  ON playback_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM stream_sessions
      WHERE stream_sessions.id = playback_history.session_id
      AND stream_sessions.user_id = auth.uid()
    )
  );

-- Insertar canciones de ejemplo
INSERT INTO songs (title, artist, url, duration, cover_url, genre) VALUES
('Mountain Adventure', 'Scout Anthem Band', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 360, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', 'Adventure'),
('Campfire Stories', 'Scout Anthem Band', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 300, 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop', 'Folk'),
('Nature Calls', 'Scout Anthem Band', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 420, 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', 'Nature'),
('Unity Song', 'Scout Anthem Band', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 280, 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop', 'Inspiration')
ON CONFLICT DO NOTHING;
