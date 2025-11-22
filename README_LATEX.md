# Instrucciones para Compilar la Propuesta LaTeX

## Documento: PROPUESTA_NEGOCIO_CRM.tex

### Requisitos Previos

Necesitas tener instalado un sistema completo de LaTeX. Recomendaciones por sistema operativo:

#### Windows
- **MiKTeX**: https://miktex.org/download
- **TeX Live**: https://www.tug.org/texlive/

#### macOS
```bash
brew install --cask mactex
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install texlive-full
```

#### Linux (Fedora/RHEL)
```bash
sudo dnf install texlive-scheme-full
```

### Paquetes LaTeX Requeridos

El documento utiliza los siguientes paquetes (se instalan automáticamente con texlive-full):

- `inputenc`, `babel` - Soporte UTF-8 y español
- `geometry` - Márgenes personalizados
- `graphicx` - Imágenes
- `booktabs`, `longtable` - Tablas profesionales
- `xcolor`, `colortbl` - Colores en tablas
- `multirow`, `array` - Tablas avanzadas
- `enumitem` - Listas personalizadas
- `titlesec` - Formato de títulos
- `fancyhdr` - Encabezados/pies de página
- `hyperref` - Enlaces y PDF metadata
- `tcolorbox` - Cajas de información
- `amsmath`, `amssymb` - Símbolos matemáticos

### Compilación

#### Opción 1: Línea de Comandos (Recomendado)

```bash
# Primera compilación
pdflatex PROPUESTA_NEGOCIO_CRM.tex

# Segunda compilación (para actualizar tabla de contenidos)
pdflatex PROPUESTA_NEGOCIO_CRM.tex
```

**Nota:** Se requieren 2 compilaciones para que la tabla de contenidos se genere correctamente.

#### Opción 2: Usando Makefile (si lo creamos)

```bash
make
```

#### Opción 3: Editores LaTeX con Interfaz Gráfica

**Overleaf (Online - Recomendado para principiantes)**
1. Ve a https://www.overleaf.com
2. Crea una cuenta gratuita
3. Nuevo Proyecto → Subir Proyecto
4. Sube el archivo `PROPUESTA_NEGOCIO_CRM.tex`
5. Haz clic en "Recompile"

**TeXstudio (Multiplataforma)**
1. Descarga: https://www.texstudio.org/
2. Abre el archivo .tex
3. Presiona F5 o haz clic en "Build & View"

**TeXmaker (Multiplataforma)**
1. Descarga: https://www.xm1math.net/texmaker/
2. Abre el archivo .tex
3. Tools → PDFLaTeX

**TeXworks (Incluido con MiKTeX)**
1. Abre el archivo .tex
2. Selecciona "pdfLaTeX" en el menú desplegable
3. Presiona el botón verde de compilar

### Salida

Después de compilar, obtendrás:

- **PROPUESTA_NEGOCIO_CRM.pdf** - Documento final
- PROPUESTA_NEGOCIO_CRM.aux - Archivo auxiliar
- PROPUESTA_NEGOCIO_CRM.log - Log de compilación
- PROPUESTA_NEGOCIO_CRM.out - Enlaces PDF
- PROPUESTA_NEGOCIO_CRM.toc - Tabla de contenidos

**Solo necesitas el archivo .pdf**. Los demás son archivos temporales que puedes eliminar.

### Limpieza de Archivos Temporales

#### Linux/macOS
```bash
rm -f *.aux *.log *.out *.toc
```

#### Windows (PowerShell)
```powershell
Remove-Item *.aux, *.log, *.out, *.toc
```

#### Windows (CMD)
```cmd
del *.aux *.log *.out *.toc
```

### Personalización del Documento

#### Cambiar Colores Corporativos

Busca estas líneas en el documento (cerca del inicio):

```latex
\definecolor{azuloscuro}{RGB}{0,51,102}
\definecolor{azulclaro}{RGB}{0,102,204}
\definecolor{verde}{RGB}{0,153,51}
\definecolor{rojo}{RGB}{204,0,0}
```

Modifica los valores RGB según tus colores corporativos.

#### Agregar Logo de Empresa

1. Coloca tu logo (logo.png o logo.pdf) en la misma carpeta
2. En la portada, agrega después de `\begin{titlepage}`:

```latex
\begin{center}
    \includegraphics[width=5cm]{logo.png}
\end{center}
\vspace{1cm}
```

#### Cambiar Información de Contacto

Edita la sección final del documento (antes de `\end{document}`):

```latex
\section*{CONTACTO}
```

### Solución de Problemas

#### Error: "File not found"
- Asegúrate de tener instalado `texlive-full`
- Si usas MiKTeX, permite la instalación automática de paquetes

#### Error: "Package babel Error: Unknown option 'spanish'"
```bash
# Linux
sudo apt-get install texlive-lang-spanish

# MiKTeX: Los paquetes se instalan automáticamente
```

#### La tabla de contenidos no aparece
- Compila el documento **dos veces**
- La primera compilación genera el índice, la segunda lo muestra

#### Símbolos raros en el PDF
- Asegúrate de que el archivo .tex esté guardado con codificación UTF-8

#### Cajas de colores no se muestran
```bash
# Instalar tcolorbox
sudo apt-get install texlive-extra-utils
```

### Conversión a Otros Formatos

#### LaTeX → Word (aproximado)
```bash
pandoc PROPUESTA_NEGOCIO_CRM.tex -o propuesta.docx
```

**Nota:** La conversión no será perfecta. LaTeX y Word tienen paradigmas diferentes.

#### LaTeX → HTML
```bash
htlatex PROPUESTA_NEGOCIO_CRM.tex
```

### Recursos Adicionales

- **Documentación LaTeX**: https://www.latex-project.org/help/documentation/
- **Tutorial español**: https://ondiz.github.io/cursoLatex/
- **Overleaf Learn**: https://www.overleaf.com/learn
- **TeX StackExchange**: https://tex.stackexchange.com/

### Ventajas del Documento LaTeX

✅ **Formato profesional** automático
✅ **Tabla de contenidos** generada automáticamente
✅ **Referencias cruzadas** automáticas
✅ **Numeración** consistente de secciones
✅ **Tipografía** de calidad editorial
✅ **PDF optimizado** para impresión
✅ **Control total** sobre el diseño
✅ **Versionable** con Git (texto plano)

### Diferencias con Markdown

| Característica | Markdown | LaTeX |
|----------------|----------|-------|
| Facilidad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Calidad tipográfica | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Tablas complejas | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Ecuaciones matemáticas | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Control de diseño | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Portada profesional | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Índices automáticos | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

**Creado:** 2025
**Versión:** 1.0
**Autor:** Equipo de Desarrollo CRM
