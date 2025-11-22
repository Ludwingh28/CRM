#!/bin/bash
# Script de compilación para Linux/macOS
# Compila la propuesta LaTeX a PDF

set -e  # Salir si hay error

echo "============================================"
echo "Compilando PROPUESTA_NEGOCIO_CRM.tex"
echo "============================================"
echo ""

# Verificar que existe el archivo
if [ ! -f "PROPUESTA_NEGOCIO_CRM.tex" ]; then
    echo "❌ ERROR: No se encontró PROPUESTA_NEGOCIO_CRM.tex"
    exit 1
fi

# Verificar que pdflatex está instalado
if ! command -v pdflatex &> /dev/null; then
    echo "❌ ERROR: pdflatex no está instalado"
    echo ""
    echo "Instala LaTeX con:"
    echo "  Ubuntu/Debian: sudo apt-get install texlive-full"
    echo "  macOS:         brew install --cask mactex"
    echo "  Fedora:        sudo dnf install texlive-scheme-full"
    exit 1
fi

# Primera compilación
echo "📝 [1/2] Primera compilación..."
pdflatex -interaction=nonstopmode PROPUESTA_NEGOCIO_CRM.tex > /dev/null 2>&1 || {
    echo "❌ Error en la primera compilación"
    echo "Revisa el archivo .log para más detalles"
    exit 1
}

echo ""

# Segunda compilación (para TOC)
echo "📝 [2/2] Segunda compilación (actualizando TOC)..."
pdflatex -interaction=nonstopmode PROPUESTA_NEGOCIO_CRM.tex > /dev/null 2>&1 || {
    echo "❌ Error en la segunda compilación"
    echo "Revisa el archivo .log para más detalles"
    exit 1
}

echo ""
echo "============================================"
echo "✅ Compilación exitosa!"
echo "📄 PDF generado: PROPUESTA_NEGOCIO_CRM.pdf"
echo "============================================"
echo ""

# Limpiar archivos temporales
echo "🧹 Limpiando archivos temporales..."
rm -f *.aux *.log *.out *.toc 2>/dev/null || true

echo "✨ Listo!"
echo ""

# Intentar abrir el PDF automáticamente
if [ -f "PROPUESTA_NEGOCIO_CRM.pdf" ]; then
    echo "Abriendo PDF..."

    # Detectar sistema operativo y abrir con el comando apropiado
    case "$OSTYPE" in
        darwin*)
            # macOS
            open PROPUESTA_NEGOCIO_CRM.pdf
            ;;
        linux*)
            # Linux
            if command -v xdg-open &> /dev/null; then
                xdg-open PROPUESTA_NEGOCIO_CRM.pdf &
            elif command -v gnome-open &> /dev/null; then
                gnome-open PROPUESTA_NEGOCIO_CRM.pdf &
            else
                echo "ℹ️  Abre manualmente el archivo PROPUESTA_NEGOCIO_CRM.pdf"
            fi
            ;;
        *)
            echo "ℹ️  Abre manualmente el archivo PROPUESTA_NEGOCIO_CRM.pdf"
            ;;
    esac
else
    echo "❌ No se encontró el archivo PDF generado"
    exit 1
fi
