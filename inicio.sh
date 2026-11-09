#!/bin/bash
# Archivo de inicio para La Voz Rover en Mac/Linux
# Este archivo hace más fácil empezar para nuevos usuarios

clear

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║           🎙️  LA VOZ ROVER - Emisora Scout Virtual  🎵   ║"
echo "║                                                            ║"
echo "║            Asistente de Inicio - Mac/Linux                ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js no está instalado"
    echo ""
    echo "Descarga Node.js desde: https://nodejs.org"
    echo "Después ejecuta este script de nuevo"
    echo ""
    exit 1
fi

echo "✅ Node.js detectado ($(node --version))"
echo ""

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ ERROR: npm no está instalado"
    echo "Reinstala Node.js"
    exit 1
fi

echo "✅ npm detectado ($(npm --version))"
echo ""

# Menú principal
show_menu() {
    clear
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║          LA VOZ ROVER - Menú Principal                    ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Elige qué deseas hacer:"
    echo ""
    echo "1. Instalar dependencias (primera vez)"
    echo "2. Ejecutar servidor de desarrollo"
    echo "3. Compilar para producción"
    echo "4. Ver configuración Supabase"
    echo "5. Ver documentación"
    echo "6. Salir"
    echo ""
    read -p "Opción (1-6): " choice
    
    case $choice in
        1) install_deps ;;
        2) run_dev ;;
        3) build_prod ;;
        4) show_supabase ;;
        5) show_docs ;;
        6) exit_app ;;
        *) 
            echo "Opción inválida"
            sleep 2
            show_menu
            ;;
    esac
}

install_deps() {
    clear
    echo ""
    echo "📦 Instalando dependencias..."
    echo ""
    
    npm install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ ¡Dependencias instaladas correctamente!"
        echo ""
        read -p "Presiona Enter para continuar..."
        show_menu
    else
        echo ""
        echo "❌ Error durante la instalación"
        read -p "Presiona Enter para continuar..."
        show_menu
    fi
}

run_dev() {
    clear
    echo ""
    echo "🚀 Iniciando servidor de desarrollo..."
    echo ""
    echo "El servidor estará disponible en:"
    echo "👉 http://localhost:5173"
    echo ""
    echo "Presiona Ctrl + C para detener el servidor"
    echo ""
    sleep 3
    
    npm run dev
}

build_prod() {
    clear
    echo ""
    echo "🏗️  Compilando para producción..."
    echo ""
    
    npm run build
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ ¡Compilación completada!"
        echo "Los archivos están en la carpeta 'dist'"
        echo ""
        read -p "Presiona Enter para continuar..."
        show_menu
    else
        echo ""
        echo "❌ Error durante la compilación"
        read -p "Presiona Enter para continuar..."
        show_menu
    fi
}

show_supabase() {
    clear
    echo ""
    echo "🔐 Configuración de Supabase"
    echo ""
    echo "URL del Proyecto:"
    echo "https://dprgnjejzfrdimitbtii.supabase.co"
    echo ""
    echo "Credenciales (.env.local):"
    echo "VITE_SUPABASE_URL=https://dprgnjejzfrdimitbtii.supabase.co"
    echo "VITE_SUPABASE_ANON_KEY=fC9vkVlTA3tpiPFExq97PA_JStbslbr"
    echo ""
    echo "Para configurar la BD:"
    echo "1. Ve a https://supabase.com"
    echo "2. Abre tu proyecto"
    echo "3. Ve a SQL Editor"
    echo "4. Copia el contenido de 'supabase_setup.sql'"
    echo "5. Pégalo y ejecuta"
    echo ""
    echo "Para más detalles: Abre SETUP_SUPABASE.md"
    echo ""
    read -p "Presiona Enter para continuar..."
    show_menu
}

show_docs() {
    clear
    echo ""
    echo "📚 Documentación Disponible"
    echo ""
    echo "1. QUICKSTART.md - Inicio rápido (5 minutos)"
    echo "2. README.md - Documentación completa"
    echo "3. SETUP_SUPABASE.md - Configuración de BD"
    echo "4. ADMIN_GUIDE.md - Manual del administrador"
    echo "5. DEVELOPER_GUIDE.md - Guía de desarrollo"
    echo "6. GUIA_VISUAL.md - Guía visual"
    echo "7. RESUMEN.md - Resumen del proyecto"
    echo ""
    echo "Los archivos están en este directorio"
    echo "Ábrelos con tu editor de texto favorito"
    echo ""
    read -p "Presiona Enter para continuar..."
    show_menu
}

exit_app() {
    clear
    echo ""
    echo "¡Hasta luego! 🎙️🎵"
    echo ""
    exit 0
}

# Iniciar el menú
show_menu
