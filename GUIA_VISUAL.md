# 🎬 GUÍA VISUAL - La Voz Rover

## Pantalla 1: Login / Registro

### Cuando abras la app por primera vez

```
┌─────────────────────────────────────────┐
│                                         │
│          La Voz Rover                   │
│       Emisora Scout Virtual             │
│                                         │
│      ┌───────────────────────────┐     │
│      │ 📧 tu@email.com           │     │
│      ├───────────────────────────┤     │
│      │ 🔐 ••••••••••••           │     │
│      ├───────────────────────────┤     │
│      │    Iniciar Sesión ➜       │     │
│      └───────────────────────────┘     │
│                                         │
│  ¿No tienes cuenta? Regístrate          │
│                                         │
└─────────────────────────────────────────┘
```

### Para Registrarse

1. Haz clic en "¿No tienes cuenta? Regístrate"
2. Completa:
   - **Nombre:** Tu nombre
   - **Email:** scout@ejemplo.com
   - **Contraseña:** MiContraseña123
3. Haz clic en "Registrarse"

## Pantalla 2: Reproductor (Después de Iniciar Sesión)

```
┌─────────────────────────────────────────┐
│ La Voz Rover          Cerrar Sesión ✕   │
│ 🎙️ Emisora Scout Virtual                 │
│                                         │
│ Bienvenido, Scout                       │
│ 🔴 EN VIVO · 245 escuchas activos        │
│                                         │
│  ┌───────────────────────────────┐     │
│  │                               │     │
│  │      [Album Art Image]        │     │
│  │                               │     │
│  └───────────────────────────────┘     │
│                                         │
│    Mountain Adventure                   │
│    Scout Anthem Band                    │
│                                         │
│  [━━━━━━━━━━○━━━━━━━━━━]  0:45 / 6:00  │
│                                         │
│      ┌────────────────┐                 │
│      │       ▶        │                 │
│      └────────────────┘                 │
│                                         │
│  Volume: [━━━━━━━━━━━━━━] 75%           │
│                                         │
│  Playlist (4)                           │
│  ✓ Mountain Adventure      Scout Anthem │
│    Campfire Stories        Scout Anthem │
│    Nature Calls            Scout Anthem │
│    Unity Song              Scout Anthem │
│                                         │
└─────────────────────────────────────────┘
```

## Funcionalidad Paso a Paso

### Paso 1: Registrarse

```
CLICK EN: "¿No tienes cuenta? Regístrate"
    ↓
INGRESA:
  • Email: scout@example.com
  • Nombre: Scout Principal
  • Contraseña: MiContraseña123
    ↓
CLICK EN: "Registrarse"
    ↓
✅ ¡Registrado automáticamente!
```

### Paso 2: Iniciar Sesión

```
INGRESA:
  • Email: scout@example.com
  • Contraseña: MiContraseña123
    ↓
CLICK EN: "Iniciar Sesión"
    ↓
✅ ¡Ya estás adentro!
```

### Paso 3: Reproducir Música

```
CLICK EN: Botón Play (triángulo grande)
    ↓
    🔊 ¡La música comienza!
    ↓
AJUSTA:
  • Volumen: Mueve el slider
  • Canción: Haz clic en otra de la playlist
    ↓
VISUALIZA:
  • Barra de progreso
  • Tiempo actual / Duración
  • Nombre de canción y artista
  • Cantidad de oyentes
```

### Paso 4: Cambiar Canciones

```
OPCIÓN 1: Espera a que termine
    ↓ Automáticamente va a la siguiente

OPCIÓN 2: Haz clic en otra canción de la playlist
    ↓ Cambia inmediatamente

OPCIÓN 3: Usa la barra de progreso
    ↓ Arrastra para ir a otro momento
```

### Paso 5: Controlar Volumen

```
SLIDER DE VOLUMEN:
[━━━━━━○━━━━━━]
    ↓
ARRASTRA A LA IZQUIERDA: Bajar volumen
ARRASTRA A LA DERECHA: Subir volumen
```

### Paso 6: Cerrar Sesión

```
CLICK EN: "Cerrar Sesión" (arriba a la derecha)
    ↓
✅ Sesión cerrada
    ↓
Te redirige a la pantalla de Login
```

## 📱 En Dispositivos Móviles

La interfaz se adapta automáticamente:

```
MÓVIL (Vertical):
┌───────────────┐
│ La Voz Rover  │
│ 🎙️ Scout      │
│               │
│ [Album Art]   │
│               │
│ Mi Canción    │
│ Mi Banda      │
│               │
│ [Progress bar]│
│               │
│     ▶         │
│               │
│ [Vol Slider]  │
│               │
│ Playlist...   │
│               │
└───────────────┘
```

## 🔊 Experiencia de Audición

### Escenario 1: Primera Canción

```
1. Abres La Voz Rover
2. Inicias sesión
3. Ves el reproductor con "Mountain Adventure"
4. Haces clic en Play
5. ¡Escuchas la música!
```

### Escenario 2: Cambiar Canción

```
1. Estás escuchando "Mountain Adventure"
2. Haces clic en "Campfire Stories"
3. Cambia inmediatamente
4. ¡Nueva música!
```

### Escenario 3: Ajustar Volumen

```
1. La canción es muy fuerte
2. Baj das el slider de volumen
3. ¡Mejor!
4. Lo vuelves a subir cuando quieres
```

## ⚙️ Configuración Técnica (Para Admins)

### Acceder a Supabase

```
1. Ve a https://supabase.com
2. Inicia sesión
3. Abre tu proyecto
4. Puedes ver:
   - Usuarios registrados
   - Canciones disponibles
   - Sesiones en vivo
   - Historial de reproducción
```

### Agregar una Canción

```
1. Ve a Supabase Dashboard
2. Tabla Editor → songs
3. Haz clic en "+ Insert row"
4. Completa:
   - Title: "Mi Canción"
   - Artist: "Mi Banda"
   - URL: "https://link-del-archivo.mp3"
   - Duration: 240 (segundos)
   - Cover URL: "https://link-de-imagen.jpg"
5. Haz clic en "Save"
6. ¡Listo! Aparecerá en la app
```

## 🎨 Personalización Visual

### Cambiar Colores

En `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        'scout-purple': '#667eea',  // ← Cambia aquí
        'scout-blue': '#764ba2',    // ← O aquí
      },
    },
  },
}
```

Usa colores como:
- `#FF6B6B` (Rojo)
- `#4ECDC4` (Verde)
- `#FFE66D` (Amarillo)
- `#95E1D3` (Turquesa)

### Cambiar Fuente

En `src/App.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
/* Cambia Poppins por otra fuente de Google */
```

## 📊 Estadísticas y Monitoreo

### Ver Usuarios

Supabase → Table Editor → users

```
Email                  Nombre              Registrado
────────────────────────────────────────────────────
scout@example.com      Scout Principal     Nov 8, 2026
otra@example.com       Otro Scout         Nov 8, 2026
```

### Ver Oyentes en Vivo

Supabase → Table Editor → stream_sessions

```
Locutor          Título            Oyentes    Canción Actual
─────────────────────────────────────────────────────────────
Scout Principal  En Vivo           245        Mountain Adv.
```

### Ver Historial de Canciones

Supabase → Table Editor → playback_history

```
Canción            Banda             Reproducida
──────────────────────────────────────────────
Mountain Adventure Scout Anthem Band Nov 8, 2026 7:15 PM
Campfire Stories   Scout Anthem Band Nov 8, 2026 7:20 PM
```

## 🚀 Comandos de Terminal

### Para Usuarios Normales

```bash
# Abrir la app
npm run dev

# Detener la app
Ctrl + C
```

### Para Desarrolladores

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver compilación
npm run preview

# Verificar tipos
npm run type-check

# Buscar errores
npm run lint
```

## 🆘 Si Algo No Funciona

### Problema: "npm: comando no encontrado"
```
SOLUCIÓN:
1. Descarga Node.js: https://nodejs.org
2. Instálalo
3. Reinicia la terminal
4. Intenta de nuevo
```

### Problema: La música no se escucha
```
SOLUCIÓN:
1. Verifica que el volumen no esté en 0
2. Prueba en otro navegador
3. Verifica tu conexión a internet
4. Recarga la página
```

### Problema: No puedo iniciar sesión
```
SOLUCIÓN:
1. Verifica que hayas registrado correctamente
2. Revisa que el email sea correcto
3. Verifica que Supabase esté configurado
4. Revisa los logs de Supabase
```

### Problema: Aparece error en la consola
```
SOLUCIÓN:
1. Abre Developer Tools (F12)
2. Ve a Console
3. Lee el error
4. Abre un issue en GitHub con la imagen del error
```

## 📚 Dónde Buscar Ayuda

| Problema | Lugar |
|----------|-------|
| Errores técnicos | Consola del navegador (F12) |
| Datos de BD | Supabase Dashboard |
| Documentación | Archivos .md del proyecto |
| Issues | GitHub del proyecto |
| Supabase | https://supabase.com/docs |

## ✨ Características Bonus

### Contador de Oyentes
```
Simula oyentes en tiempo real
Se actualiza cada 5 segundos
Número realista (50-500)
```

### Canciones de Ejemplo
```
La app viene con 4 canciones de demo
Puedes cambiarlas en Supabase
O agregar más
```

### Tema Oscuro Hermoso
```
Fondo degradado (púrpura a azul)
Contraste blanco perfecto
Iconos simpáticos
Animaciones suaves
```

## 🎉 ¡Ya estás Listo!

```
✅ Descargaste el código
✅ Instalaste dependencias
✅ Configuraste Supabase
✅ Ejecutaste npm run dev
✅ ¡La app está corriendo!
✅ Puedes registrarte
✅ Puedes iniciar sesión
✅ Puedes escuchar música
✅ ¡Disfruta La Voz Rover!
```

---

**Necesitas ayuda?** Lee los archivos:
- QUICKSTART.md - Inicio rápido
- SETUP_SUPABASE.md - Configuración BD
- README.md - Documentación completa

**¡Que disfrutes!** 🎵🎙️
