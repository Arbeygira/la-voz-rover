# La Voz Rover - Emisora Scout Virtual v2.0

Una emisora scout virtual moderna con **acceso público para oyentes** y panel profesional para DJ/Admin.

## 🚀 Características (v2.0)

### Para Oyentes (Acceso Público)
- ✅ **Sin login requerido** - Escucha directamente
- 🎵 Reproductor de música en vivo
- 👥 Contador de oyentes en tiempo real
- 📱 Interfaz responsive y hermosa
- 🎨 Diseño moderno con tema rojo

### Para DJ/Admin (Autenticación Requerida)
- ✅ Dashboard profesional
- 🎙️ Control de streaming en vivo
- 📊 Estadísticas en tiempo real
- 🎚️ Gestión de playlist avanzada
- ⚙️ Panel de configuración
- 🔴 Tema rojo moderno con glassmorphism

## 🛠️ Instalación Rápida

### Opción 1: Con el Script (Recomendado)

**Windows:**
```bash
INICIO.bat
```

**Mac/Linux:**
```bash
./inicio.sh
```

### Opción 2: Manual

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
Crea `.env.local`:
```env
VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
```

4. **Iniciar**
```bash
npm run dev
```

Abre http://localhost:5173

## 📖 Guía de Uso

### 🎧 Para Oyentes (Público)

```
1. Abre http://localhost:5173
2. ¡Sin login requerido!
3. Ajusta volumen y disfruta
4. Ve el contador de oyentes
5. (Opcional) Click en "DJ LOGIN" para entrar al panel
```

**Características disponibles:**
- Reproductor de música
- Control de volumen
- Lista de próximas canciones
- Contador de oyentes en vivo
- Acceso a login de DJ

### 🎙️ Para DJ/Admin (Autenticación)

```
1. Click en "DJ LOGIN"
2. Ingresa email y contraseña
3. Acceso a panel profesional
4. Gestiona playlist
5. Monitorea oyentes
6. Configura streaming
```

**Panel DJ incluye:**
- Reproductor avanzado
- Gestión de canciones
- Estadísticas en vivo
- Configuración de broadcast
- Logout seguro

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
