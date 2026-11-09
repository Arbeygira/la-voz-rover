# La Voz Rover - Emisora Scout Virtual

Una emisora scout virtual moderna con autenticación y reproducción de música en vivo.

## 🚀 Características

- ✅ Autenticación segura con Supabase
- 🎵 Reproductor de música en vivo
- 🎙️ Control de sesiones de streaming
- 👥 Sistema de oyentes en tiempo real
- 📱 Interfaz responsive y moderna
- 🎨 Diseño atractivo con Tailwind CSS

## 🛠️ Instalación

### Requisitos Previos
- Node.js 16+
- npm o yarn
- Cuenta en Supabase

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Arbeygira/la-voz-rover.git
cd la-voz-rover
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
```

4. **Configurar Supabase**

Ejecuta las siguientes queries en Supabase SQL Editor:

```sql
-- Crear tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de canciones
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  duration INTEGER NOT NULL,
  cover_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de sesiones de streaming
CREATE TABLE stream_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_live BOOLEAN DEFAULT true,
  current_song_id UUID REFERENCES songs(id),
  listeners INTEGER DEFAULT 0,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_stream_sessions_user_id ON stream_sessions(user_id);
CREATE INDEX idx_stream_sessions_is_live ON stream_sessions(is_live);
```

5. **Configurar autenticación en Supabase**

- Ve a Authentication > Providers
- Habilita Email/Password
- Configura los URLs de redirección:
  - `http://localhost:5173` (desarrollo)
  - Tu dominio de producción

6. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── pages/            # Páginas principales
│   ├── LoginPage.tsx # Página de autenticación
│   └── Player.tsx    # Página del reproductor
├── hooks/            # Custom hooks
│   └── useAuth.ts    # Hook de autenticación
├── lib/              # Librerías y utilidades
│   └── supabase.ts   # Configuración de Supabase
├── App.tsx           # Componente principal
├── App.css           # Estilos globales
└── main.tsx          # Punto de entrada
```

## 🎯 Uso

### Registrarse
1. Click en "¿No tienes cuenta? Regístrate"
2. Ingresa tu email y contraseña
3. ¡Listo! Ya estás registrado

### Iniciar Sesión
1. Ingresa tu email y contraseña
2. Click en "Iniciar Sesión"

### Reproducir Música
1. Click en el botón Play (triángulo grande)
2. Ajusta el volumen con el slider
3. Navega por la playlist haciendo click en las canciones

## 🔧 Configuración Avanzada

### Agregar Canciones a Supabase

```sql
INSERT INTO songs (title, artist, url, duration, cover_url) VALUES
('Mountain Adventure', 'Scout Anthem Band', 'https://...', 360, 'https://...'),
('Campfire Stories', 'Scout Anthem Band', 'https://...', 300, 'https://...'),
('Nature Calls', 'Scout Anthem Band', 'https://...', 420, 'https://...');
```

### Variables de Entorno

- `VITE_SUPABASE_URL`: URL de tu proyecto Supabase
- `VITE_SUPABASE_ANON_KEY`: Clave anónima de Supabase

## 📦 Dependencias Principales

- **React 18**: Librería UI
- **TypeScript**: Tipado estático
- **Vite**: Bundler rápido
- **Tailwind CSS**: Framework CSS
- **Supabase**: Backend y autenticación
- **Lucide React**: Iconos SVG

## 🚀 Despliegue

### En Vercel

1. Conecta tu repositorio GitHub
2. Agrega variables de entorno en Vercel
3. ¡Listo! Se despliega automáticamente

### En Netlify

1. Conecta tu repositorio GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Agrega variables de entorno
5. ¡Listo!

## 🔐 Seguridad

- Las credenciales de Supabase están en variables de entorno
- Las contraseñas se hashean automáticamente
- Se usa HTTPS en producción
- Las sesiones se validan en tiempo real

## 📝 Licencia

MIT - Libre para usar y modificar

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en GitHub.

---

**Hecho con ❤️ para los Scouts**
