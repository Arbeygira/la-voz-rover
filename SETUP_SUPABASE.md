# 📝 Guía de Configuración de Supabase para La Voz Rover

## Paso 1: Acceder a Supabase

1. Ve a https://supabase.com
2. Inicia sesión con tu cuenta o crea una nueva
3. Tu proyecto ya está vinculado a: `https://dprgnjejzfrdimitbtii.supabase.co`

## Paso 2: Habilitar Autenticación por Email/Password

1. En el dashboard de Supabase, ve a **Authentication** → **Providers**
2. Busca **Email** y asegúrate de que está **habilitado**
3. Haz clic en **Email** (el que dice "Built-in")
4. Verifica que esté en estado "Enabled"

### Configurar URLs de Redirección

1. En Authentication → URL Configuration
2. Agrega estas URLs en **Authorized redirect URLs**:
   - `http://localhost:5173` (para desarrollo)
   - `http://localhost:3000` (alternativa)
   - Tu dominio de producción (ej: `https://tudominio.com`)

3. Agrega estas URLs en **Site URL**:
   - `http://localhost:5173` (para desarrollo)

## Paso 3: Crear las Tablas de la Base de Datos

1. Ve a **SQL Editor** en el menú izquierdo
2. Copia todo el contenido del archivo `supabase_setup.sql` del proyecto
3. Pégalo en el editor SQL
4. Haz clic en **Run** (o presiona `Ctrl + Enter`)

Esto creará automáticamente:
- ✅ Tabla `users`
- ✅ Tabla `songs`
- ✅ Tabla `stream_sessions`
- ✅ Tabla `playback_history`
- ✅ Índices para mejor rendimiento
- ✅ Políticas de seguridad (RLS)
- ✅ Canciones de ejemplo

## Paso 4: Verificar las Tablas

1. Ve a **Table Editor** en el menú izquierdo
2. Deberías ver estas tablas:
   - `users`
   - `songs` (con 4 canciones de ejemplo)
   - `stream_sessions`
   - `playback_history`

## Paso 5: Verificar las Claves API

1. Ve a **Settings** → **API**
2. Anota estos valores (ya están en `.env.local`):
   - **Project URL**: `https://dprgnjejzfrdimitbtii.supabase.co`
   - **Anon Key**: `fC9vkVlTA3tpiPFExq97PA_JStbslbr`

## Paso 6: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## Pruebas Iniciales

### Prueba 1: Registrarse
1. Abre `http://localhost:5173`
2. Haz clic en "¿No tienes cuenta? Regístrate"
3. Ingresa:
   - Email: `scout@ejemplo.com`
   - Nombre: `Scout Principal`
   - Contraseña: `MiContraseña123!`
4. Haz clic en "Registrarse"

### Prueba 2: Iniciar Sesión
1. Ingresa tu email y contraseña
2. Haz clic en "Iniciar Sesión"

### Prueba 3: Reproducir Música
1. Una vez logged in, verás el reproductor
2. Haz clic en el botón Play (triangulo grande)
3. Ajusta el volumen
4. Navega por las canciones

## Solución de Problemas

### Error: "No se puede conectar a Supabase"
**Solución**: Verifica que las claves API en `.env.local` sean correctas

### Las canciones no cargan
**Solución**: 
1. Ve a Supabase → Table Editor
2. Abre la tabla `songs`
3. Verifica que las canciones estén ahí
4. Si está vacía, ejecuta nuevamente el SQL de inserción

### Inicio de sesión no funciona
**Solución**:
1. Verifica que Email/Password esté habilitado en Authentication
2. Revisa que los URLs de redirección incluyan `http://localhost:5173`
3. Verifica que la tabla `users` esté creada

### El reproductor no suena
**Solución**:
1. Verifica que los URLs de las canciones sean accesibles (SoundHelix.com debe estar disponible)
2. Asegúrate de que el volumen no esté al 0%
3. Prueba en otro navegador o dispositivo

## Agregar Más Canciones

Puedes agregar canciones directamente en Supabase:

1. Ve a **Table Editor** → **songs**
2. Haz clic en **Insert row**
3. Completa los campos:
   - **title**: Nombre de la canción
   - **artist**: Nombre del artista
   - **url**: URL del archivo MP3
   - **duration**: Duración en segundos
   - **cover_url**: URL de la portada (opcional)
   - **genre**: Género de música

### Servicios para Hospedar Archivos de Audio

- **Cloudinary**: https://cloudinary.com (Almacenamiento de imágenes y audio)
- **Firebase Storage**: https://firebase.google.com (Google)
- **AWS S3**: https://aws.amazon.com (Amazon)
- **Supabase Storage**: https://supabase.com/docs/guides/storage (Integrado)

## Desplegar a Producción

### Opción 1: Vercel (Recomendado)

1. Ve a https://vercel.com
2. Conecta tu repositorio GitHub
3. En Variables de Entorno, agrega:
   ```
   VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
   VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
   ```
4. Haz clic en Deploy
5. Actualiza los URLs de redirección en Supabase con tu dominio de Vercel

### Opción 2: Netlify

1. Ve a https://netlify.com
2. Conecta tu repositorio GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. En Variables de Entorno, agrega las mismas que Vercel
6. Actualiza los URLs de redirección en Supabase

## Seguridad

⚠️ **IMPORTANTE**: 

- Las claves API están configuradas con permisos públicos (Anon Key)
- Esto es correcto para un cliente web
- Los usuarios solo pueden ver/modificar sus propios datos gracias a las políticas RLS
- En producción, siempre usa HTTPS
- Nunca compartas las claves en repositorios públicos

## Contacto y Soporte

Si tienes problemas:

1. Revisa los logs en Supabase → Database → Logs
2. Abre un issue en GitHub
3. Verifica la documentación de Supabase: https://supabase.com/docs

---

**¡Listo! Tu emisora scout virtual está configurada y lista para usar.** 🎙️🎵
