# 🚀 Guía de Inicio Rápido - La Voz Rover

## Requisitos

- **Node.js** 16 o superior: https://nodejs.org
- **npm** (incluye Node.js)
- Una **cuenta en Supabase**: https://supabase.com

## Instalación (5 minutos)

### 1️⃣ Clonar el Proyecto

```bash
git clone https://github.com/Arbeygira/la-voz-rover.git
cd la-voz-rover
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

Esto instalará:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase

### 3️⃣ Configurar Variables de Entorno

El archivo `.env.local` ya está configurado con:

```env
VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
```

✅ **Ya está listo para usar**

### 4️⃣ Configurar Supabase (Una sola vez)

1. Ve a https://supabase.com
2. Inicia sesión
3. Abre tu proyecto: https://supabase.co/dashboard (clic en el proyecto)
4. Ve a **SQL Editor**
5. Copia el contenido del archivo `supabase_setup.sql`
6. Pégalo en el editor
7. Haz clic en **Run**

Para más detalles, lee: [SETUP_SUPABASE.md](./SETUP_SUPABASE.md)

## 🎮 Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

Abre en tu navegador: **http://localhost:5173**

### Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### Ver Vista Previa de Producción

```bash
npm run preview
```

## 🎯 Cómo Usar La Voz Rover

### Registrarse
1. Haz clic en "¿No tienes cuenta? Regístrate"
2. Ingresa email y contraseña
3. Nombre opcional
4. ¡Listo! Automáticamente te habrá registrado

### Iniciar Sesión
1. Ingresa tu email
2. Ingresa tu contraseña
3. Haz clic en "Iniciar Sesión"

### Reproducir Música
1. Haz clic en el botón **Play** (triángulo grande)
2. Ajusta el volumen con el slider
3. Haz clic en canciones de la playlist para cambiar
4. El contador de oyentes se actualiza en tiempo real

### Cerrar Sesión
Haz clic en **Cerrar Sesión** en la esquina superior derecha

## 📁 Estructura del Proyecto

```
la-voz-rover/
├── src/
│   ├── pages/
│   │   ├── LoginPage.tsx      # Página de autenticación
│   │   └── Player.tsx          # Reproductor de música
│   ├── hooks/
│   │   └── useAuth.ts          # Hook de autenticación
│   ├── lib/
│   │   └── supabase.ts         # Configuración Supabase
│   ├── App.tsx                 # Componente principal
│   └── main.tsx                # Punto de entrada
├── public/                     # Archivos estáticos
├── dist/                       # Build de producción (generado)
├── package.json                # Dependencias
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración Vite
├── README.md                   # Documentación completa
├── SETUP_SUPABASE.md           # Guía de configuración Supabase
└── supabase_setup.sql          # Script SQL para BD

```

## 🎨 Características

✅ Autenticación segura con email/contraseña  
✅ Reproductor de música en vivo  
✅ Contador de oyentes en tiempo real  
✅ Interfaz moderna con Tailwind CSS  
✅ Responsive (funciona en móvil y desktop)  
✅ Datos persistentes en Supabase  

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor con hot reload

# Compilación
npm run build        # Compilar para producción
npm run preview      # Ver vista previa del build

# Verificación
npm run lint         # Revisar código con ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| react | 18.x | Interfaz de usuario |
| typescript | 5.x | Tipado estático |
| vite | 8.x | Build tool y dev server |
| tailwindcss | 4.x | Estilos CSS |
| @supabase/supabase-js | Latest | Backend y autenticación |
| lucide-react | Latest | Iconos SVG |

## 🌐 Desplegar a Internet

### Opción 1: Vercel (Recomendado)

1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Vite
4. Agrega variables de entorno (mismas del `.env.local`)
5. ¡Haz deploy!

```bash
# O desde la línea de comandos
npm i -g vercel
vercel
```

### Opción 2: Netlify

1. Ve a https://netlify.com
2. Conecta tu repositorio de GitHub
3. Configuración automática:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Agrega variables de entorno
5. Deploy automático

### Opción 3: GitHub Pages

```bash
npm run build
# Copia el contenido de dist/ a gh-pages
```

## 🔐 Seguridad

La aplicación usa:
- ✅ Supabase Authentication para users
- ✅ Row Level Security (RLS) en la BD
- ✅ Variables de entorno para credenciales
- ✅ HTTPS en producción (automático en Vercel/Netlify)

## 🐛 Solución de Problemas

### "npm command not found"
Instala Node.js: https://nodejs.org

### "Cannot find module supabase"
Ejecuta: `npm install`

### La música no se escucha
1. Verifica que tengas conexión a internet
2. Asegúrate de que el volumen del navegador esté encendido
3. Prueba en otro navegador

### No puedo iniciar sesión
1. Verifica que hayas ejecutado el SQL de Supabase
2. Confirma que Email Auth esté habilitado en Supabase
3. Prueba con otro email

## 📞 Soporte

- Documentación Supabase: https://supabase.com/docs
- Documentación React: https://react.dev
- Documentación Vite: https://vite.dev
- Issues: https://github.com/Arbeygira/la-voz-rover/issues

## 📄 Licencia

MIT - Libre para usar, modificar y compartir

## 🤝 Contribuir

¿Quieres mejorar La Voz Rover?

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/MiFeature`
3. Commit: `git commit -m "Agrego MiFeature"`
4. Push: `git push origin feature/MiFeature`
5. Pull Request

---

**¿Listo para empezar? Ejecuta `npm run dev` y ¡disfruta!** 🎙️🎵
