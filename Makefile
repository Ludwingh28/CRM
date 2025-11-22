# Makefile para compilar la propuesta LaTeX

# Variables
LATEX = pdflatex
DOCUMENT = PROPUESTA_NEGOCIO_CRM
TEXFILE = $(DOCUMENT).tex
PDFFILE = $(DOCUMENT).pdf

# Archivos temporales
TEMP_FILES = *.aux *.log *.out *.toc *.lof *.lot *.fls *.fdb_latexmk *.synctex.gz

.PHONY: all clean view help

# Compilar el documento (por defecto)
all: $(PDFFILE)

# Regla para generar el PDF
$(PDFFILE): $(TEXFILE)
	@echo "=== Compilación 1/2: Generando estructura ==="
	$(LATEX) $(TEXFILE)
	@echo ""
	@echo "=== Compilación 2/2: Actualizando referencias ==="
	$(LATEX) $(TEXFILE)
	@echo ""
	@echo "✅ Documento compilado exitosamente: $(PDFFILE)"

# Limpiar archivos temporales
clean:
	@echo "🧹 Limpiando archivos temporales..."
	@rm -f $(TEMP_FILES)
	@echo "✅ Limpieza completada"

# Limpiar todo (incluyendo el PDF)
cleanall: clean
	@echo "🗑️  Eliminando PDF..."
	@rm -f $(PDFFILE)
	@echo "✅ Eliminación completa"

# Ver el PDF (Linux)
view: $(PDFFILE)
	@if command -v xdg-open > /dev/null; then \
		xdg-open $(PDFFILE); \
	elif command -v open > /dev/null; then \
		open $(PDFFILE); \
	else \
		echo "❌ No se encontró un visor de PDF. Abre manualmente $(PDFFILE)"; \
	fi

# Ayuda
help:
	@echo "Makefile para PROPUESTA_NEGOCIO_CRM.tex"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  make          - Compilar el documento LaTeX a PDF"
	@echo "  make all      - Igual que 'make'"
	@echo "  make clean    - Eliminar archivos temporales (.aux, .log, etc.)"
	@echo "  make cleanall - Eliminar archivos temporales y el PDF"
	@echo "  make view     - Abrir el PDF generado"
	@echo "  make help     - Mostrar esta ayuda"
	@echo ""
	@echo "Ejemplo de uso:"
	@echo "  make          # Compila el documento"
	@echo "  make view     # Abre el PDF"
	@echo "  make clean    # Limpia archivos temporales"
