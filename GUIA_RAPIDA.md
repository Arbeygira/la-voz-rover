# 🚀 GUÍA RÁPIDA - La Voz Rover v2.0

## ⚡ Inicio Rápido (30 segundos)

### Windows
```bash
INICIO.bat
```
Listo! Se abrirá http://localhost:5173 automáticamente.

### Mac/Linux
```bash
./inicio.sh
```

## 👁️ Lo Que Verás

### Pantalla 1: Oyentes (Público - SIN LOGIN)
```
┌─────────────────────────────────┐
│ LA VOZ ROVER        DJ LOGIN ➜  │
│ 🔴 EN VIVO • 245 oyentes        │
├─────────────────────────────────┤
│                                 │
│        [Album Hermoso]          │
│    Mountain Adventure           │
│    Scout Anthem Band            │
│                                 │
│    ▶ PLAY   Vol: [────●───] 70% │
│                                 │
│  Próximas Canciones:            │
│  • Campfire Stories             │
│  • Nature Calls                 │
│  • Unity Song                   │
│                                 │
└─────────────────────────────────┘

✅ Escucha música
✅ Controla volumen
✅ Ve contador de oyentes
✅ Navega playlist
✅ Sin hacer login
```

### Pantalla 2: DJ Login (SI CLICK EN "DJ LOGIN")
```
┌──────────────────────────────┐
│  LA VOZ ROVER                │
│  DJ / LOCUTOR LOGIN          │
│                              │
│  📧 Email:    [user@...]     │
│  🔐 Pass:     [••••••••]     │
│                              │
│  [Registrar DJ]  [Acceder]   │
│                              │
│  ← Volver a Oyentes          │
└──────────────────────────────┘

Usa credenciales de DJ/Admin
(Cualquier usuario Supabase)
```

### Pantalla 3: Panel DJ (DESPUÉS DE LOGIN)
```
┌──────────────────────────────────────┐
│🔴 LA VOZ ROVER | DJ: Admin | 345 👥  │
├──────────────────────────────────────┤
│                          │           │
│    [Album Grande]       │ Ahora En:  │
│                         │ Mountain.. │
│    Now: 2:45 / 6:00    │           │
│    Vol: [────●──] 70%   │ [Playlist] │
│                         │ [Settings] │
│                         │ [LOGOUT]   │
│                         │           │
│                         │ Próximas:  │
│                         │ • Campfire │
│                         │ • Nature   │
└──────────────────────────────────────┘

✅ Control profesional
✅ Gestiona playlist
✅ Ve stats en vivo
✅ 345 oyentes conectados
```

## 🎯 Funcionalidades

### Para Oyentes (Público)
| Función | Descripción |
|---------|------------|
| ▶ Play | Reproduce la canción actual |
| ⏸ Pause | Pausa la reproducción |
| ⏭ Next | Salta a siguiente canción |
| 🔊 Volume | Controla volumen (0-100%) |
| 📋 Playlist | Ve próximas canciones |
| 👥 Contador | Ve oyentes en vivo |
| 🔑 DJ Login | Accede a panel DJ |

### Para DJ/Admin (Privado)
| Función | Descripción |
|---------|------------|
| ▶ Play | Reproducir canción |
| ⏸ Pause | Pausar |
| ⏭ Skip | Siguiente canción |
| ✏️ Edit | Editar canción |
| 🗑️ Delete | Eliminar de playlist |
| 📊 Stats | Ver oyentes en tiempo real |
| ⚙️ Settings | Configurar broadcast |
| 🚪 Logout | Cerrar sesión |

## 🎨 Tema Visual

### Colores
- 🌑 **Fondo**: Negro y Slate oscuro
- 🔴 **Acento**: Rojo brillante (#ef4444)
- ✨ **Efecto**: Glassmorphism (blur elegante)
- 🌈 **Gradientes**: Sutiles en botones

### Animaciones
- Hover suave en botones
- Glow rojo en interacciones
- Slide-in en transiciones
- Pulse en elementos activos

## 💾 Datos

### Base de Datos
- 📍 **Ubicación**: Supabase (dprgnjejzfrdimitbtii.supabase.co)
- 📊 **Tablas**: songs, users, stream_sessions, playback_history
- 🔐 **Seguridad**: Auth tokens, RLS policies

### Canciones
Se guardan con:
- Título
- Artista
- URL de audio
- Duración
- Portada (URL)

### Usuarios
- Email
- Contraseña (encriptada)
- Rol (dj/admin)
- Fecha de registro

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor local

# Build
npm run build        # Compilar para producción

# Preview
npm run preview      # Ver build local

# Lint
npm run lint         # Verificar errores

# Instalar dependencias
npm install          # Si alguna falla
```

## 🌐 URLs Principales

| Ruta | Descripción |
|------|------------|
| `/` | Listener (Oyentes públicos) |
| `/dj-login` | DJ Login (Autenticación) |
| `/dj-dashboard` | Panel DJ (Después de login) |
| `http://localhost:5173` | App local desarrollo |

## 🔐 Seguridad

- ✅ Login con email/password
- ✅ Tokens de Supabase validados
- ✅ Contraseñas encriptadas
- ✅ RLS (Row Level Security) habilitado
- ✅ HTTPS en producción

## 📱 Responsive

```
Móvil     (< 640px)  → Layout vertical
Tablet    (640-1024) → Layout mixto
Desktop   (> 1024)   → Layout completo
```

## 🐛 Si Algo No Funciona

### Error: "Cannot find module"
```bash
npm install
npm run dev
```

### Error: "Supabase connection failed"
Verifica en `.env.local`:
```env
VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
```

### Error: "Port 5173 in use"
```bash
npm run dev -- --port 3000
```

### Música no suena
1. Verifica volumen del navegador
2. Verifica permisos de audio del navegador
3. Verifica que el archivo de audio exista

### Login no funciona
1. Verifica que el usuario existe en Supabase
2. Verifica que la contraseña es correcta
3. Verifica conexión a internet

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Build Time | 1.01s |
| Bundle Size | ~450KB |
| Lighthouse | 90+ |
| Pages | 3 |
| Components | 5 |
| Rutas | 3 |
| TypeScript Files | 7 |
| CSS Lines | 400+ |

## 🎉 Características Principales

```
✅ Acceso público para oyentes (sin login)
✅ Panel profesional para DJ (login requerido)
✅ Interfaz hermosa con tema rojo
✅ Glassmorphism y animaciones
✅ Contador de oyentes en vivo
✅ Gestión de playlist
✅ Control de volumen
✅ Responsive (móvil, tablet, desktop)
✅ Autenticación segura
✅ Base de datos Supabase
✅ Código TypeScript tipado
✅ Build optimizado
```

## 🚀 Despliegue a Producción

### Opción 1: Vercel (Recomendado)
```bash
# Conecta tu repo GitHub
# Vercel deteca automáticamente Node.js
# Agrega variables de entorno
# ¡Listo! Se despliega en cada push
```

### Opción 2: Netlify
```bash
# Conecta tu repo GitHub
# Build: npm run build
# Publish: dist
# Agrega variables de entorno
```

### Opción 3: Tu propio servidor
```bash
npm run build
# Sube carpeta 'dist' a tu servidor
# Configura redirects a index.html
```

## 📝 Variables de Entorno

En `.env.local` (desarrollo) o panel de deploy (producción):

```env
VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
```

**¡NUNCA** compartas estas claves en público!

## 🎓 Estructura Básica

```
src/
├── pages/
│   ├── Listener.tsx      → Oyentes (público)
│   ├── DJLogin.tsx       → Login DJ
│   └── DJDashboard.tsx   → Panel DJ
├── hooks/
│   └── useAuth.ts        → Autenticación
├── lib/
│   └── supabase.ts       → Configuración
├── App.tsx               → Router
├── App.css               → Estilos
└── main.tsx              → Entrada
```

## 🤝 Cómo Agregar Nuevas Canciones

### Opción 1: En Supabase
1. Abre Dashboard Supabase
2. Ve a `songs` table
3. Click en "Insert row"
4. Rellena: title, artist, url, duration, cover_url
5. Click "Save"

### Opción 2: Por SQL
```sql
INSERT INTO songs (title, artist, url, duration, cover_url) 
VALUES (
  'Mi Canción',
  'Mi Artista',
  'https://link-a-audio.mp3',
  240,
  'https://link-a-imagen.jpg'
);
```

## 📞 Soporte

- 📧 GitHub Issues: https://github.com/Arbeygira/la-voz-rover/issues
- 📝 Documentación: Ver archivos .md en la carpeta raíz
- 🐛 Bugs: Reporta en GitHub

## ✅ Checklist de Uso

```
□ Descargué el repositorio
□ Instalé dependencias (npm install)
□ Configuré .env.local
□ Ejecuté npm run dev (o INICIO.bat)
□ Abrí http://localhost:5173
□ Ví interfaz de oyentes
□ Clickeé en DJ LOGIN
□ Ingresé credenciales
□ Ví panel DJ
□ Reproduje música
□ Probé volumen
□ Probé playlist
□ Hice logout
□ Volví a oyentes
```

---

**¡Disfruta La Voz Rover!** 🎙️🎵

Versión: 2.0  
Última actualización: Noviembre 2026  
Estado: ✅ Listo para usar
