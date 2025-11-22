@echo off
REM Script de compilación para Windows
REM Compila la propuesta LaTeX a PDF

echo ============================================
echo Compilando PROPUESTA_NEGOCIO_CRM.tex
echo ============================================
echo.

REM Primera compilación
echo [1/2] Primera compilación...
pdflatex PROPUESTA_NEGOCIO_CRM.tex
if %errorlevel% neq 0 (
    echo.
    echo ERROR: La compilación falló
    echo Verifica que tengas MiKTeX o TeX Live instalado
    pause
    exit /b 1
)

echo.
echo [2/2] Segunda compilación (actualizando TOC)...
pdflatex PROPUESTA_NEGOCIO_CRM.tex
if %errorlevel% neq 0 (
    echo.
    echo ERROR: La segunda compilación falló
    pause
    exit /b 1
)

echo.
echo ============================================
echo Compilación exitosa!
echo PDF generado: PROPUESTA_NEGOCIO_CRM.pdf
echo ============================================
echo.

REM Abrir el PDF automáticamente
if exist PROPUESTA_NEGOCIO_CRM.pdf (
    echo Abriendo PDF...
    start PROPUESTA_NEGOCIO_CRM.pdf
) else (
    echo No se encontró el archivo PDF
)

pause
