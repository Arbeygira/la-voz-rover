@echo off
REM Archivo de inicio para La Voz Rover en Windows
REM Este archivo hace más fácil empezar para nuevos usuarios

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║           🎙️  LA VOZ ROVER - Emisora Scout Virtual  🎵   ║
echo ║                                                            ║
echo ║              Asistente de Inicio - Windows                ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Node.js no está instalado
    echo.
    echo Descarga Node.js desde: https://nodejs.org
    echo Después reinicia esta aplicación
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo.

REM Verificar si npm está instalado
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ ERROR: npm no está instalado
    echo Reinstala Node.js
    pause
    exit /b 1
)

echo ✅ npm detectado
echo.

REM Menú principal
echo Elige qué deseas hacer:
echo.
echo 1. Instalar dependencias (primera vez)
echo 2. Ejecutar servidor de desarrollo
echo 3. Compilar para producción
echo 4. Ver configuración Supabase
echo 5. Ver documentación
echo 6. Salir
echo.
set /p choice="Opción (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto dev
if "%choice%"=="3" goto build
if "%choice%"=="4" goto supabase
if "%choice%"=="5" goto docs
if "%choice%"=="6" goto end

echo Invalid option
timeout /t 2
goto menu

:install
cls
echo.
echo 📦 Instalando dependencias...
echo.
call npm install
if errorlevel 1 (
    echo.
    echo ❌ Error durante la instalación
    pause
    goto menu
)
echo.
echo ✅ ¡Dependencias instaladas correctamente!
echo.
pause
goto menu

:dev
cls
echo.
echo 🚀 Iniciando servidor de desarrollo...
echo.
echo El servidor estará disponible en:
echo 👉 http://localhost:5173
echo.
echo Presiona Ctrl + C para detener el servidor
echo.
timeout /t 3

call npm run dev
goto menu

:build
cls
echo.
echo 🏗️  Compilando para producción...
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ Error durante la compilación
    pause
    goto menu
)
echo.
echo ✅ ¡Compilación completada!
echo Los archivos están en la carpeta 'dist'
echo.
pause
goto menu

:supabase
cls
echo.
echo 🔐 Configuración de Supabase
echo.
echo URL del Proyecto:
echo https://dprgnjejzfrdimitbtii.supabase.co
echo.
echo Credenciales (.env.local):
echo VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co
echo VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr
echo.
echo Para configurar la BD:
echo 1. Ve a https://supabase.com
echo 2. Abre tu proyecto
echo 3. Ve a SQL Editor
echo 4. Copia el contenido de 'supabase_setup.sql'
echo 5. Pégalo y ejecuta
echo.
echo Para más detalles:
echo - Abre: SETUP_SUPABASE.md
echo.
pause
goto menu

:docs
cls
echo.
echo 📚 Documentación Disponible
echo.
echo 1. QUICKSTART.md - Inicio rápido (5 minutos)
echo 2. README.md - Documentación completa
echo 3. SETUP_SUPABASE.md - Configuración de BD
echo 4. ADMIN_GUIDE.md - Manual del administrador
echo 5. DEVELOPER_GUIDE.md - Guía de desarrollo
echo 6. GUIA_VISUAL.md - Guía visual
echo 7. RESUMEN.md - Resumen del proyecto
echo.
echo Abriendo explorador de archivos...
echo.
timeout /t 2
explorer .
goto menu

:end
cls
echo.
echo ¡Hasta luego! 🎙️🎵
echo.
exit /b 0

REM Si no se eligió opción válida
:menu
echo.
echo Presiona cualquier tecla para volver al menú...
pause >nul
cls
goto menu
