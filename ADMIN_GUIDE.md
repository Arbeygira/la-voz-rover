# 🎙️ Manual del Administrador - La Voz Rover

## Introducción

Este manual es para los administradores y emisores de **La Voz Rover**, la emisora scout virtual. Aquí encontrarás cómo gestionar usuarios, canciones y sesiones de streaming.

## 📊 Panel de Control (Supabase)

### Acceder al Panel

1. Ve a https://supabase.com
2. Inicia sesión
3. Selecciona tu proyecto
4. Usa el **Table Editor** para administrar datos

### 📋 Tablas Principales

#### 1. Tabla `users`

Aquí se almacenan todos los usuarios registrados.

| Campo | Descripción |
|-------|-----------|
| `id` | ID único del usuario (generado automáticamente) |
| `email` | Email del usuario |
| `display_name` | Nombre que usa en la app |
| `avatar_url` | URL de su foto de perfil |
| `created_at` | Fecha de registro |
| `updated_at` | Última actualización |

**Acciones:**
- Ver todos los usuarios
- Buscar por email
- Ver detalles de cada usuario
- Eliminar usuarios (también elimina sus sesiones)

#### 2. Tabla `songs`

Catálogo de canciones disponibles.

| Campo | Descripción |
|-------|-----------|
| `id` | ID único de la canción |
| `title` | Título de la canción |
| `artist` | Nombre del artista |
| `url` | Enlace al archivo MP3 |
| `duration` | Duración en segundos |
| `cover_url` | URL de la portada (imagen) |
| `genre` | Género musical |
| `created_at` | Fecha de agregación |

**Acciones:**
- Agregar nuevas canciones
- Editar información de canciones
- Eliminar canciones
- Buscar por artista o género

#### 3. Tabla `stream_sessions`

Registro de sesiones de streaming.

| Campo | Descripción |
|-------|-----------|
| `id` | ID de la sesión |
| `user_id` | ID del locutor |
| `title` | Título de la emisión |
| `description` | Descripción |
| `is_live` | ¿Está en vivo? |
| `current_song_id` | Canción en reproducción |
| `listeners` | Número de oyentes |
| `started_at` | Hora de inicio |
| `ended_at` | Hora de fin |

#### 4. Tabla `playback_history`

Historial de canciones reproducidas.

| Campo | Descripción |
|-------|-----------|
| `id` | ID del registro |
| `session_id` | ID de la sesión |
| `song_id` | ID de la canción |
| `played_at` | Cuándo se reprodujo |
| `duration_played` | Segundos escuchados |

## 🎵 Agregar Canciones

### Método 1: Panel Web de Supabase

1. Ve a **Supabase Dashboard** → **Table Editor** → **songs**
2. Haz clic en el botón **+ Insert row**
3. Completa los campos:

   ```
   Title:        "Mi Canción"
   Artist:       "Mi Banda"
   URL:          "https://ejemplo.com/cancion.mp3"
   Duration:     180 (en segundos)
   Cover URL:    "https://ejemplo.com/portada.jpg"
   Genre:        "Rock" (o el género)
   ```

4. Haz clic en **Save**

### Método 2: SQL (Línea de Comandos)

Ve a **SQL Editor** y ejecuta:

```sql
INSERT INTO songs (title, artist, url, duration, cover_url, genre) 
VALUES (
  'Nombre de la Canción',
  'Nombre del Artista',
  'https://enlace-a-archivo.mp3',
  240,
  'https://enlace-a-portada.jpg',
  'Género'
);
```

### Servicios para Hospedar Archivos de Audio

**Opción 1: SoundCloud Developer** (Gratuito)
- Sube tus canciones a SoundCloud
- Obtén el enlace de streaming

**Opción 2: Supabase Storage**
- Usa el almacenamiento integrado de Supabase
- En Dashboard → Storage → Crea un bucket "songs"
- Sube archivos MP3

**Opción 3: Cloudinary**
- Registrate: https://cloudinary.com
- Sube archivos
- Obtén URLs de streaming

**Opción 4: Google Drive**
```
https://drive.google.com/uc?export=download&id=ARCHIVO_ID
```

## 👥 Gestionar Usuarios

### Ver Todos los Usuarios

1. Table Editor → **users**
2. Verás una lista con:
   - Email
   - Nombre mostrado
   - Fecha de registro

### Buscar un Usuario

1. En la tabla **users**
2. Usa el filtro de búsqueda
3. Escribe el email

### Eliminar un Usuario

1. Selecciona el usuario
2. Haz clic en el ícono de papelera
3. Confirma la eliminación

⚠️ Esto también eliminará:
- Sus sesiones de streaming
- Su historial de reproducción

## 📊 Monitorear Sesiones en Vivo

### Ver Sesiones Activas

1. Table Editor → **stream_sessions**
2. Filtra por `is_live = true`
3. Verás:
   - Locutor (user_id)
   - Título de la emisión
   - Número de oyentes
   - Canción actual

### Estadísticas

Para ver datos por período:

```sql
SELECT 
  DATE(started_at) as fecha,
  COUNT(*) as sesiones,
  AVG(listeners) as promedio_oyentes
FROM stream_sessions
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(started_at)
ORDER BY fecha DESC;
```

Ejecuta esto en **SQL Editor** para ver estadísticas.

## 🔐 Seguridad y Permisos

### Roles y Permisos (Row Level Security)

Las políticas están configuradas para:

**Para Usuarios:**
- Solo pueden ver/editar sus propios datos
- No pueden ver datos de otros usuarios

**Para Canciones:**
- Todos pueden ver todas las canciones
- Solo administradores pueden agregar/editar

**Para Sesiones de Streaming:**
- Todos pueden ver sesiones en vivo
- Cada usuario solo puede crear/editar sus propias sesiones

### Cambiar Permisos

En SQL Editor, ejecuta:

```sql
-- Ver políticas RLS actuales
SELECT * FROM pg_policies 
WHERE tablename = 'canciones';

-- Crear nueva política (ejemplo)
CREATE POLICY "permite_lectura_publica"
  ON songs FOR SELECT
  USING (true);
```

## 🎛️ Mantenimiento

### Backup de Datos

Supabase realiza backups automáticos. Para exportar datos:

1. Ve a **Settings** → **Database**
2. Haz clic en **Download dump**
3. Se descargará un archivo SQL completo

### Limpiar Datos Antiguos

Para eliminar sesiones de hace más de 90 días:

```sql
DELETE FROM stream_sessions
WHERE ended_at < NOW() - INTERVAL '90 days';
```

### Revisar Logs

1. Ve a **Logs** en el menú principal
2. Verás todas las operaciones de la BD
3. Busca errores o accesos sospechosos

## 📱 Características Futuras Sugeridas

### Próximas Mejoras

- [ ] Panel de administración web
- [ ] Edición de perfiles de usuario
- [ ] Cargar canciones desde el navegador
- [ ] Estadísticas de reproducción
- [ ] Sistema de puntos y logros
- [ ] Chat en vivo durante streaming
- [ ] Reproducción automática de playlist
- [ ] Temporizador de sesión automática

## 🆘 Solución de Problemas

### Las canciones no se reproducen
**Causa:** URL del archivo no válida o servidor caído
**Solución:** 
1. Verifica que el enlace sea accesible
2. Prueba en un navegador
3. Usa otra fuente de hosting

### No se crean nuevos usuarios
**Causa:** Email/Password no habilitado en Auth
**Solución:**
1. Ve a Authentication → Providers
2. Asegúrate que Email esté en "Enabled"

### Se ve un contador de oyentes muy bajo
**Causa:** Es normal durante desarrollo (es simulado)
**Solución:** En producción aumentará con usuarios reales

### Error "Permission denied" al insertar canciones
**Causa:** Políticas RLS restrictivas
**Solución:**
1. Usa Supabase como administrador
2. O crea una política menos restrictiva

## 📞 Contacto Técnico

Para soporte técnico:
- Abre un issue en GitHub
- Contacta al desarrollador
- Revisa la documentación de Supabase

## 📚 Recursos

- **Documentación Supabase:** https://supabase.com/docs
- **Dashboard Supabase:** https://supabase.co/dashboard
- **GitHub del Proyecto:** https://github.com/Arbeygira/la-voz-rover
- **Comunidad Supabase:** https://discord.supabase.com

---

**Última actualización:** Noviembre 2026  
**Versión:** 1.0

---

¿Necesitas ayuda? Contacta al administrador del sistema.
