# 🛠️ Guía de Desarrollo - Extender La Voz Rover

Este documento explica cómo agregar nuevas características a La Voz Rover.

## 📚 Estructura del Código

### Componentes (`src/components/`)

Aquí van componentes reutilizables:

```typescript
// Ejemplo: src/components/SongCard.tsx
import type { Song } from '../lib/supabase';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: () => void;
}

export function SongCard({ song, isPlaying, onPlay }: SongCardProps) {
  return (
    <div className="p-4 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={onPlay}>
        {isPlaying ? 'Playing...' : 'Play'}
      </button>
    </div>
  );
}
```

### Páginas (`src/pages/`)

Páginas completas de la aplicación:

- `LoginPage.tsx`: Autenticación
- `Player.tsx`: Reproductor principal

Agregar una nueva página:

```typescript
// src/pages/PlaylistPage.tsx
export function PlaylistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <h1 className="text-white text-4xl">Mi Playlist</h1>
      {/* Contenido */}
    </div>
  );
}
```

### Hooks Personalizados (`src/hooks/`)

Lógica reutilizable:

```typescript
// src/hooks/useSongs.ts
import { useEffect, useState } from 'react';
import type { Song } from '../lib/supabase';
import { supabase } from '../lib/supabase';

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase.from('songs').select('*');
      setSongs(data || []);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  return { songs, loading };
}
```

## 🔄 Integración con Supabase

### Recuperar Datos

```typescript
import { supabase } from '../lib/supabase';

// Obtener todas las canciones
const { data, error } = await supabase
  .from('songs')
  .select('*');

// Filtrar por género
const { data } = await supabase
  .from('songs')
  .select('*')
  .eq('genre', 'Rock');

// Buscar por artista
const { data } = await supabase
  .from('songs')
  .select('*')
  .ilike('artist', '%The Beatles%');
```

### Insertar Datos

```typescript
// Agregar una canción
const { data, error } = await supabase
  .from('songs')
  .insert({
    title: 'Nueva Canción',
    artist: 'Mi Banda',
    url: 'https://...',
    duration: 240,
  });

if (error) console.error('Error:', error);
```

### Actualizar Datos

```typescript
// Actualizar una canción
const { error } = await supabase
  .from('songs')
  .update({ title: 'Nuevo Título' })
  .eq('id', songId);
```

### Eliminar Datos

```typescript
// Eliminar una canción
const { error } = await supabase
  .from('songs')
  .delete()
  .eq('id', songId);
```

## 🎨 Personalización de Estilos

### Usando Tailwind CSS

```typescript
// Ejemplo de uso de Tailwind
<div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-white mb-4">Título</h1>
</div>
```

### Agregar Temas

Crea un archivo `src/lib/themes.ts`:

```typescript
export const themes = {
  scout: {
    primary: 'from-purple-500 to-blue-500',
    dark: 'from-purple-900 to-blue-900',
    accent: 'purple-300',
  },
  fire: {
    primary: 'from-red-500 to-orange-500',
    dark: 'from-red-900 to-orange-900',
    accent: 'orange-300',
  },
};
```

## 🔐 Autenticación Avanzada

### Obtener Usuario Actual

```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log(user?.email);
```

### Verificar Sesión

```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  // Redirigir a login
}
```

### Actualizar Perfil

```typescript
const { error } = await supabase.auth.updateUser({
  email: 'newemail@example.com',
  password: 'nuevopassword123',
});
```

## 📡 Real-Time (Tiempo Real)

Escuchar cambios en tiempo real:

```typescript
import { useEffect } from 'react';

useEffect(() => {
  // Escuchar cambios en la tabla songs
  const channel = supabase
    .channel('songs_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'songs' },
      (payload) => {
        console.log('Cambio detectado:', payload);
        // Actualizar estado
      }
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
}, []);
```

## 📊 Ejemplos de Características Nuevas

### 1. Página de Favoritos

```typescript
// src/pages/FavoritesPage.tsx
import { useEffect, useState } from 'react';
import type { Song } from '../lib/supabase';
import { supabase } from '../lib/supabase';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Song[]>([]);

  useEffect(() => {
    const getFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('favorites')
        .select('songs(*)')
        .eq('user_id', user.id);

      setFavorites(data?.map(f => f.songs) || []);
    };

    getFavorites();
  }, []);

  return (
    <div>
      <h1 className="text-white text-4xl">Mis Favoritos</h1>
      {favorites.map(song => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  );
}
```

### 2. Sistema de Puntuación

```typescript
// src/hooks/useRating.ts
import { supabase } from '../lib/supabase';

export async function rateSong(songId: string, rating: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('ratings')
    .insert({
      user_id: user.id,
      song_id: songId,
      rating: rating, // 1-5 estrellas
    });

  return !error;
}
```

Primero, agrega la tabla en Supabase:

```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  song_id UUID NOT NULL REFERENCES songs(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Notificaciones en Tiempo Real

```typescript
// src/components/Notifications.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel('notifications')
      .on('broadcast', { event: 'notify' }, (payload) => {
        setNotifications(prev => [...prev, payload.message]);
      })
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  return (
    <div className="fixed top-4 right-4 space-y-2">
      {notifications.map((notif, i) => (
        <div key={i} className="bg-green-500 text-white p-4 rounded">
          {notif}
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Despliegue de Cambios

1. **Desarrollo Local**
   ```bash
   npm run dev
   ```

2. **Compilar y Probar**
   ```bash
   npm run build
   npm run preview
   ```

3. **Hacer Commit**
   ```bash
   git add .
   git commit -m "Agregar nueva característica"
   git push origin master
   ```

4. **Despliegue Automático**
   - Vercel y Netlify desplegarán automáticamente
   - Puedes ver el estado en el dashboard de cada servicio

## 🧪 Testing (Pruebas)

### Instalar Testing Library

```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```

### Ejemplo de Prueba

```typescript
// src/components/SongCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SongCard } from './SongCard';

describe('SongCard', () => {
  it('renders song title', () => {
    const song = {
      id: '1',
      title: 'Test Song',
      artist: 'Test Artist',
      url: 'http://...',
      duration: 180,
      cover_url: '',
      created_at: new Date().toISOString(),
    };

    render(<SongCard song={song} isPlaying={false} onPlay={() => {}} />);
    expect(screen.getByText('Test Song')).toBeInTheDocument();
  });
});
```

## 📦 Agregar Nuevas Dependencias

Si necesitas una librería:

```bash
npm install nombre-libreria
```

Para dependencias de desarrollo:

```bash
npm install -D nombre-libreria
```

Ejemplos útiles:
- `axios`: Peticiones HTTP
- `recharts`: Gráficos
- `framer-motion`: Animaciones
- `zustand`: State management
- `react-router-dom`: Navegación avanzada

## 🐛 Debugging

### Console.log

```typescript
console.log('Valor:', variable);
console.error('Error:', error);
console.warn('Advertencia:', warning);
```

### React Developer Tools

Instala la extensión: React Developer Tools en Chrome/Firefox

### Supabase Logs

Ve a Supabase Dashboard → Logs para ver errores de la BD

## 📝 Convenciones de Código

### Nombres de Archivos

- Componentes: `PascalCase` (SongCard.tsx)
- Hooks: camelCase con prefijo `use` (useAuth.ts)
- Tipos: `PascalCase` (Song, User)
- Funciones: camelCase (fetchSongs)

### Imports

```typescript
// Agrupar en este orden:
// 1. React y librerías externas
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// 2. Tipos locales
import type { Song } from '../lib/supabase';

// 3. Componentes locales
import { SongCard } from '../components/SongCard';

// 4. Estilos
import './styles.css';
```

## 🎓 Próximos Pasos

1. Familiarízate con la documentación de React
2. Lee ejemplos en el código existente
3. Prueba agregar un pequeño componente
4. Explora las características de Supabase
5. ¡Crea algo increíble!

## 📚 Recursos

- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Supabase JS Client:** https://supabase.com/docs/reference/javascript
- **Vite Docs:** https://vite.dev

---

**¡Happy Coding!** 💻🎵
