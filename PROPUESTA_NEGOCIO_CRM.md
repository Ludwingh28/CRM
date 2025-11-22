# PROPUESTA DE NEGOCIO
## Sistema CRM para Gestión de Ventas y Distribución

---

## 1. RESUMEN EJECUTIVO

### 1.1 Descripción del Proyecto
Sistema CRM (Customer Relationship Management) especializado en la gestión de ventas, inventarios y distribución para empresas con canales mayoristas (DM) y minoristas (DH). El sistema permite el control integral desde el almacén hasta la preventa en campo, con geolocalización y seguimiento en tiempo real.

### 1.2 Alcance
Desarrollo completo del MVP (Minimum Viable Product) con funcionalidades CORE del sistema, incluyendo módulos de inventario, gestión de clientes con mapas GPS, preventas y reportería avanzada.

### 1.3 Inversión Total
**Bs. 27,000** (Veintisiete mil bolivianos)
- *No incluye: Hosting, infraestructura de servidor, ni licencias de base de datos*

---

## 2. MÓDULOS DEL SISTEMA

### 2.1 Inventario Almacén
**Descripción:** Control de productos en almacén central con trazabilidad completa.

**Funcionalidades:**
- Registro de productos (ID, tipo, nombre, cantidades)
- Control de precios (compra, mayorista, minorista)
- Gestión de fechas (ingreso, vencimiento de lotes)
- Alertas de stock bajo
- Historial de movimientos
- Búsqueda y filtros avanzados

**Tiempo estimado:** 3-4 semanas
- Análisis y diseño UML: 4 días
- Backend (Django + APIs): 8 días
- Frontend (React): 7 días
- Testing e integración: 3 días

---

### 2.2 Inventario Móvil
**Descripción:** Gestión de productos en camiones/rutas de distribución con sincronización al almacén.

**Funcionalidades:**
- Asignación de productos a camiones
- Control por chofer/ruta
- Integración con inventario almacén (resta automática)
- Validación de stock disponible
- Trazabilidad de productos en tránsito
- Registro de detalles y observaciones

**Tiempo estimado:** 3-4 semanas
- Análisis y diseño UML: 3 días
- Backend (Django + APIs): 7 días
- Frontend (React): 7 días
- Integración con Inventario Almacén: 3 días
- Testing: 2 días

---

### 2.3 Creación de Clientes
**Descripción:** Módulo de registro de nuevos clientes con geolocalización GPS.

**Funcionalidades:**
- Registro de datos del cliente (dueña, negocio, celular)
- Asignación de zona (DH/DM)
- Tipo de negocio
- Asignación de día de visita (Lunes-Sábado)
- Geolocalización GPS automática y manual
- Integración con OpenStreetMap
- Validación de datos

**Tiempo estimado:** 2-3 semanas
- Análisis y diseño UML: 3 días
- Backend (Django + APIs + Geo): 5 días
- Frontend (React + Leaflet): 7 días
- Testing: 2 días

---

### 2.4 Gestión de Clientes
**Descripción:** Visualización y administración de cartera de clientes con mapas interactivos.

**Funcionalidades:**
- Mapa interactivo con todos los clientes
- Filtros avanzados (zona, ruta, día de visita, búsqueda)
- Visualización de información del cliente en popups
- Tabla dinámica con exportación
- Edición y eliminación de clientes
- Geolocalización del usuario

**Tiempo estimado:** 3-4 semanas
- Análisis y diseño UML: 3 días
- Backend (Django + APIs geoespaciales): 6 días
- Frontend (React + Mapas): 8 días
- Testing e integración: 3 días

---

### 2.5 Gestión de Ventas (Preventas)
**Descripción:** Módulo de preventa en campo con validaciones de negocio y control de inventario.

**Funcionalidades:**
- Registro de preventas con productos del almacén
- Validación de precio (≥ precio minorista)
- Validación de stock disponible
- Resta automática de inventario
- Horario de entrega programado
- Timestamp GPS automático
- Observaciones y notas
- Registro de motivos de no venta (7 tipos predefinidos)
- Campo condicional para precio competencia

**Tiempo estimado:** 4-5 semanas
- Análisis y diseño UML: 4 días
- Backend (Django + lógica de negocio): 9 días
- Frontend (React + formularios): 8 días
- Integración con inventario: 3 días
- Testing y validaciones: 4 días

---

### 2.6 Reportes de Ventas
**Descripción:** Dashboard con métricas y KPIs de vendedores y ventas.

**Funcionalidades:**
- Filtrado por canal (DH/DM/Todos)
- Métricas por vendedor:
  - Ruta asignada
  - Clientes asignados vs visitados
  - Número de preventas
  - Porcentaje de cobertura
  - Porcentaje de efectividad
  - Total de preventa (Bs)
- Exportación de reportes
- Gráficos y visualizaciones

**Tiempo estimado:** 3-4 semanas
- Análisis y diseño UML: 3 días
- Backend (Django + queries complejas): 7 días
- Frontend (React + Charts): 7 días
- Testing: 3 días

---

### 2.7 Módulos Transversales

#### 2.7.1 Autenticación y Autorización
- Login/Logout
- Roles y permisos (Admin, Vendedor, Almacenero)
- JWT tokens
- Sesiones seguras

**Tiempo estimado:** 2 semanas

#### 2.7.2 Panel de Administración
- Dashboard principal
- Gestión de usuarios
- Configuraciones del sistema
- Logs y auditoría

**Tiempo estimado:** 2 semanas

---

## 3. STACK TECNOLÓGICO

### 3.1 Frontend
- **Framework:** React 19.x (JavaScript)
- **Estilización:** Tailwind CSS v4
- **Iconos:** Lucide React
- **Mapas:** Leaflet + OpenStreetMap
- **Gráficos:** Recharts / Chart.js
- **Estado:** React Hooks + Context API
- **Peticiones HTTP:** Axios

### 3.2 Backend
- **Framework:** Django 4.2+ (Python 3.10+)
- **API:** Django REST Framework (DRF)
- **Autenticación:** Django REST Framework JWT
- **Geolocalización:** GeoDjango
- **Documentación API:** Swagger/OpenAPI

### 3.3 Base de Datos
*(Ver sección 4 para análisis comparativo)*

---

## 4. ANÁLISIS COMPARATIVO DE BASES DE DATOS

### 4.1 PostgreSQL (Recomendado)

#### Características
- **Licencia:** Open Source (PostgreSQL License)
- **Costo:** **GRATUITO** ✅
- **Versión sugerida:** PostgreSQL 15+

#### Ventajas
✅ **Gratuito y de código abierto**
✅ **Extensión PostGIS:** Soporte nativo para datos geoespaciales (crucial para mapas GPS)
✅ **Alto rendimiento:** Excelente para queries complejas y reportes
✅ **ACID compliant:** Transacciones confiables
✅ **JSON nativo:** Almacenamiento de datos flexibles
✅ **Gran comunidad:** Soporte abundante y documentación
✅ **Replicación y alta disponibilidad:** Configuración sencilla
✅ **Integración perfecta con Django:** GeoDjango funciona mejor con PostgreSQL
✅ **Escalabilidad horizontal:** Mediante extensiones como Citus

#### Desventajas
⚠️ No tiene soporte comercial oficial (aunque hay empresas que lo ofrecen)
⚠️ Requiere más conocimiento técnico para optimización avanzada

#### Caso de Uso Ideal
**PERFECTO para este proyecto** debido a:
- Funcionalidades geoespaciales (mapas de clientes)
- Costo cero
- Rendimiento superior en reportes complejos
- Compatibilidad nativa con Django

---

### 4.2 SQL Server

#### Características
- **Licencia:** Comercial (Microsoft)
- **Costo (Express):** **GRATUITO** con limitaciones
- **Costo (Standard):** ~USD $3,717 (2 cores)
- **Costo (Enterprise):** ~USD $14,256 (2 cores)
- **Versión sugerida:** SQL Server 2022

#### Ventajas SQL Server
✅ **Herramientas visuales:** SSMS (SQL Server Management Studio) muy potente
✅ **Integración con ecosistema Microsoft:** Si ya usan Azure/Windows
✅ **SQL Server Express:** Versión gratuita para proyectos pequeños
✅ **Reportes nativos:** SQL Server Reporting Services (SSRS)
✅ **Soporte comercial:** Soporte técnico oficial de Microsoft
✅ **Business Intelligence:** Herramientas integradas (SSIS, SSAS)

#### Limitaciones SQL Server Express (Gratuito)
⚠️ Máximo 10 GB por base de datos
⚠️ Máximo 1 GB de RAM para buffer pool
⚠️ Máximo 4 cores
⚠️ Sin SQL Server Agent (tareas programadas)
⚠️ Sin funcionalidades avanzadas de BI

#### Desventajas
❌ **Costo elevado** para versiones productivas
❌ **Licenciamiento complejo** por cores/usuarios
❌ **Dependencia de Windows Server** (aunque existe en Linux)
❌ **Soporte geoespacial limitado** comparado con PostGIS
❌ **Menos compatible con Django** (requiere drivers adicionales)

#### Caso de Uso Ideal
Organizaciones que ya tienen infraestructura Microsoft y presupuesto para licencias.

---

### 4.3 Oracle Database

#### Características
- **Licencia:** Comercial (Oracle Corporation)
- **Costo (Standard Edition 2):** ~USD $17,500 por procesador
- **Costo (Enterprise Edition):** ~USD $47,500 por procesador
- **Costo (Express Edition):** **GRATUITO** con limitaciones severas
- **Versión sugerida:** Oracle 19c/21c

#### Ventajas Oracle
✅ **PL/SQL:** Lenguaje procedural muy potente
✅ **Rendimiento extremo:** Optimizado para grandes volúmenes
✅ **Oracle Spatial:** Funcionalidades geoespaciales avanzadas (requiere Enterprise)
✅ **Alta disponibilidad:** RAC (Real Application Clusters)
✅ **Seguridad avanzada:** Cifrado, auditoría, VPD
✅ **Soporte empresarial:** Soporte técnico de clase mundial
✅ **Particionamiento:** Manejo eficiente de tablas masivas
✅ **Recuperación ante desastres:** Data Guard

#### Limitaciones Oracle Express Edition (XE) - Gratuito
⚠️ **Máximo 12 GB de datos de usuario**
⚠️ **Máximo 2 GB de RAM**
⚠️ **Máximo 2 threads CPU**
⚠️ **Solo 1 instancia por máquina**
⚠️ **SIN Oracle Spatial** (funcionalidades geoespaciales)
⚠️ **SIN particionamiento**
⚠️ **SIN RAC**

#### Desventajas
❌ **COSTO PROHIBITIVO:** Licencias extremadamente caras
❌ **Licenciamiento complejo:** Auditorías de Oracle son temidas
❌ **Requiere DBA especializado:** Curva de aprendizaje muy alta
❌ **Soporte geoespacial solo en Enterprise:** Oracle Spatial no está en Standard
❌ **Integración con Django:** Requiere cx_Oracle, más complejo
❌ **Overkill para este proyecto:** Las capacidades superan las necesidades

#### Caso de Uso Ideal
Grandes corporaciones con presupuestos millonarios, requisitos de misión crítica 24/7, y cientos de miles de transacciones por segundo.

---

### 4.4 Comparativa Resumida

| Característica | PostgreSQL | SQL Server | Oracle |
|----------------|------------|------------|--------|
| **Costo** | ✅ Gratis | ⚠️ Express gratis / Std $3.7K | ❌ XE gratis / SE2 $17.5K |
| **Geoespacial** | ✅ PostGIS excelente | ⚠️ Básico | ❌ Solo en Enterprise |
| **Django** | ✅ Nativo (GeoDjango) | ⚠️ Requiere drivers | ⚠️ Requiere cx_Oracle |
| **Escalabilidad** | ✅ Excelente | ✅ Muy buena | ✅ Excepcional |
| **Curva aprendizaje** | ⚠️ Media | ✅ Fácil (SSMS) | ❌ Alta (DBA) |
| **Comunidad** | ✅ Enorme | ✅ Grande | ⚠️ Empresarial |
| **Soporte comercial** | ⚠️ Terceros | ✅ Microsoft | ✅ Oracle |
| **Licenciamiento** | ✅ Simple | ⚠️ Complejo | ❌ Muy complejo |

---

### 4.5 Recomendación para este Proyecto

#### ⭐ RECOMENDACIÓN PRINCIPAL: **PostgreSQL 15+**

**Justificación:**
1. **Costo cero** permite maximizar el margen del proyecto
2. **PostGIS** es superior para mapas de clientes con GPS
3. **Django tiene soporte nativo** (GeoDjango)
4. **Rendimiento excelente** para reportes y queries complejas
5. **Escalable** para crecimiento futuro sin costos adicionales
6. **Comunidad activa** facilita resolver problemas

#### Alternativa si el cliente lo requiere: **SQL Server Express**
- Solo si ya tienen infraestructura Microsoft
- Solo si el volumen de datos no superará 10 GB
- Migrar a Standard si crece ($3,717)

#### ❌ NO RECOMENDADO: **Oracle**
- Costo desproporcionado para este proyecto
- Oracle Spatial no está disponible en versiones accesibles
- Complejidad innecesaria
- ROI negativo

---

## 5. INFRAESTRUCTURA Y DESPLIEGUE

### 5.1 Arquitectura Recomendada
**VPS (Virtual Private Server)** en proveedor cloud confiable.

### 5.2 Comparativa de Proveedores

#### 5.2.1 Hostinger VPS

**Planes recomendados:**

| Plan | CPU | RAM | Almacenamiento | Tráfico | Precio/mes |
|------|-----|-----|----------------|---------|------------|
| VPS 1 | 1 vCore | 4 GB | 50 GB SSD | 1 TB | ~USD $8.99 |
| VPS 2 | 2 vCores | 8 GB | 100 GB SSD | 2 TB | ~USD $12.99 |
| VPS 3 | 4 vCores | 12 GB | 150 GB SSD | 3 TB | ~USD $19.99 |

**Ventajas Hostinger:**
✅ Panel de control intuitivo (hPanel)
✅ Precio muy competitivo
✅ Soporte 24/7 en español
✅ Backups semanales automáticos
✅ IPv6 incluido
✅ Configuración rápida
✅ Ideal para startups

**Desventajas:**
⚠️ SLA 99.9% (menor que enterprise)
⚠️ Recursos compartidos (aunque garantizados)

---

#### 5.2.2 DigitalOcean Droplets

**Planes recomendados:**

| Plan | CPU | RAM | Almacenamiento | Transferencia | Precio/mes |
|------|-----|-----|----------------|---------------|------------|
| Basic | 1 vCPU | 2 GB | 50 GB SSD | 2 TB | USD $12 |
| Basic | 2 vCPUs | 4 GB | 80 GB SSD | 4 TB | USD $24 |
| General | 2 vCPUs | 8 GB | 160 GB SSD | 5 TB | USD $48 |

**Ventajas DigitalOcean:**
✅ SLA 99.99%
✅ Excelente documentación técnica
✅ API completa para automatización
✅ Snapshots y backups fáciles
✅ Marketplace con imágenes preconfiguradas
✅ Escalabilidad horizontal sencilla
✅ Comunidad técnica muy activa

**Desventajas:**
⚠️ Precio ligeramente mayor
⚠️ Soporte básico no incluido (solo tickets)

---

#### 5.2.3 AWS Lightsail

**Planes recomendados:**

| Plan | CPU | RAM | Almacenamiento | Transferencia | Precio/mes |
|------|-----|-----|----------------|---------------|------------|
| Small | 2 vCPUs | 2 GB | 60 GB SSD | 3 TB | USD $12 |
| Medium | 2 vCPUs | 4 GB | 80 GB SSD | 4 TB | USD $24 |
| Large | 2 vCPUs | 8 GB | 160 GB SSD | 5 TB | USD $48 |

**Ventajas AWS Lightsail:**
✅ Respaldo del ecosistema AWS
✅ Fácil escalamiento a EC2 si crece
✅ CDN incluido (CloudFront)
✅ Bases de datos administradas disponibles
✅ Balanceadores de carga
✅ DNS integrado (Route 53)

**Desventajas:**
⚠️ Más complejo que alternativas
⚠️ Costos adicionales por servicios extras

---

#### 5.2.4 Vultr

**Planes recomendados:**

| Plan | CPU | RAM | Almacenamiento | Ancho de banda | Precio/mes |
|------|-----|-----|----------------|----------------|------------|
| Cloud | 1 vCore | 2 GB | 55 GB SSD | 2 TB | USD $12 |
| Cloud | 2 vCores | 4 GB | 80 GB SSD | 3 TB | USD $24 |
| Cloud | 4 vCores | 8 GB | 160 GB SSD | 4 TB | USD $48 |

**Ventajas Vultr:**
✅ Excelente precio/rendimiento
✅ 25+ ubicaciones globales
✅ Snapshots ilimitados
✅ DDoS protection incluido
✅ Uptime 100% SLA
✅ Facturación por hora

---

### 5.3 Recomendación de Hosting

#### ⭐ RECOMENDACIÓN PRINCIPAL: **DigitalOcean Droplet 2 vCPUs / 4 GB RAM**

**Precio:** USD $24/mes (~Bs. 165/mes)

**Justificación:**
1. Balance perfecto entre precio y rendimiento
2. SLA 99.99% confiable
3. Excelente para Django + PostgreSQL
4. Escalable cuando crezca el negocio
5. Documentación superior para desarrollo
6. Snapshots antes de actualizaciones

#### Configuración Recomendada:
- **OS:** Ubuntu 22.04 LTS
- **Web Server:** Nginx
- **WSGI:** Gunicorn
- **Base de Datos:** PostgreSQL 15
- **SSL:** Let's Encrypt (gratis)
- **Monitoreo:** Uptime Robot (gratis)
- **Backups:** DigitalOcean Backups automáticos (+20% costo)

#### Alternativa económica: **Hostinger VPS 2**
- Para presupuestos más ajustados
- Precio: USD $12.99/mes (~Bs. 90/mes)
- Suficiente para MVP inicial

---

## 6. CRONOGRAMA DE DESARROLLO

### 6.1 Equipo de Desarrollo
- **Equipo:** Desarrolladores Especializados
- **Metodología:** PUDS (Proceso Unificado de Desarrollo de Software)
- **Modelado:** UML

### 6.2 Fases del PUDS

#### FASE 1: INICIO (1 semana)
**Objetivos:**
- Entender la visión del negocio
- Definir casos de uso principales
- Crear plan de proyecto
- Estimar riesgos

**Entregables:**
- Documento de Visión
- Casos de Uso preliminares
- Plan de desarrollo
- Arquitectura candidata

**Esfuerzo:** 60 horas

---

#### FASE 2: ELABORACIÓN (2 semanas)
**Objetivos:**
- Definir arquitectura
- Casos de uso detallados
- Diagramas UML completos
- Prototipos de alto riesgo

**Actividades:**
- Diagramas de Casos de Uso (todos los módulos)
- Diagramas de Clases (modelo de datos)
- Diagramas de Secuencia (flujos críticos)
- Diagramas de Actividad (procesos de negocio)
- Diagramas de Componentes (arquitectura)
- Diagramas de Despliegue (infraestructura)
- Diseño de BD (modelo ER)
- Prototipo UI/UX (Figma)

**Entregables:**
- Modelo de Casos de Uso completo
- Modelo de Análisis y Diseño (UML)
- Arquitectura de Software documentada
- Prototipo navegable
- Plan de iteraciones

**Esfuerzo:** 120 horas

---

#### FASE 3: CONSTRUCCIÓN (8 semanas)

##### Iteración 1: Infraestructura Base (1 semana)
**Objetivos:**
- Configurar entorno desarrollo
- Setup Django + React
- Configurar PostgreSQL
- Autenticación JWT
- CI/CD básico

**Esfuerzo:** 60 horas

##### Iteración 2: Módulo Inventario (3 semanas)
**Objetivos:**
- Inventario Almacén (backend + frontend)
- Inventario Móvil (backend + frontend)
- Integración entre inventarios
- Testing unitario

**Esfuerzo:** 180 horas

##### Iteración 3: Módulo Clientes (2 semanas)
**Objetivos:**
- Creación de Clientes (backend + frontend + mapas)
- Gestión de Clientes (backend + frontend + mapas)
- Integración PostGIS
- Testing

**Esfuerzo:** 120 horas

##### Iteración 4: Módulo Ventas (2 semanas)
**Objetivos:**
- Gestión de Preventas (backend + frontend)
- Motivos de No Venta (backend + frontend)
- Integración con Inventario
- Validaciones de negocio
- Testing

**Esfuerzo:** 120 horas

**Esfuerzo Total Construcción:** 480 horas

---

#### FASE 4: TRANSICIÓN (1 semana)
**Objetivos:**
- Testing integral
- Corrección de bugs
- Documentación de usuario
- Capacitación
- Despliegue a producción
- Soporte inicial

**Actividades:**
- Testing de integración
- Testing de aceptación (UAT)
- Corrección de defectos
- Manual de usuario
- Manual técnico
- Capacitación al cliente
- Migración de datos (si aplica)
- Despliegue

**Entregables:**
- Sistema en producción
- Manuales de usuario
- Documentación técnica
- Video tutoriales
- Acta de entrega

**Esfuerzo:** 60 horas

---

### 6.3 Resumen de Cronograma

| Fase | Duración | Esfuerzo (horas) | Entregables Clave |
|------|----------|------------------|-------------------|
| **Inicio** | 1 semana | 60h | Documento Visión, Casos de Uso |
| **Elaboración** | 2 semanas | 120h | Arquitectura, UML completo, Prototipo |
| **Construcción** | 8 semanas | 480h | Sistema funcional completo |
| **Transición** | 1 semana | 60h | Sistema en producción |
| **TOTAL** | **12 semanas** | **720h** | **CRM Productivo** |

**Duración aproximada:** 3 meses

---

### 6.4 Hitos Críticos

| Hito | Fecha | Descripción |
|------|-------|-------------|
| H1 | Semana 1 | Aprobación de Visión y Plan |
| H2 | Semana 3 | Aprobación de Arquitectura y Diseño UML |
| H3 | Semana 4 | Infraestructura y Autenticación |
| H4 | Semana 7 | Módulo Inventario completo |
| H5 | Semana 9 | Módulo Clientes completo |
| H6 | Semana 11 | Módulo Ventas completo |
| H7 | Semana 12 | Sistema en Producción |

---

## 7. DESGLOSE DE COSTOS

### 7.1 Desarrollo del Sistema (CORE)
**Precio:** **Bs. 27,000**

**Incluye:**
- ✅ Análisis y diseño UML completo
- ✅ Desarrollo de todos los módulos CORE
- ✅ Testing integral
- ✅ Documentación técnica y de usuario
- ✅ Capacitación (8 horas)
- ✅ 30 días de soporte post-entrega

**Forma de pago sugerida:**
- 40% (Bs. 10,800) - Inicio del proyecto
- 30% (Bs. 8,100) - Entrega de módulos Inventario
- 30% (Bs. 8,100) - Entrega final y puesta en producción

---

### 7.2 Infraestructura (NO INCLUIDA)

#### Opción 1: PostgreSQL en DigitalOcean (Recomendado)
**Costos mensuales:**
- VPS 2 vCPUs / 4 GB RAM: USD $24/mes (~Bs. 165/mes)
- Backups automáticos: USD $4.80/mes (~Bs. 33/mes)
- **Total:** USD $28.80/mes (~**Bs. 198/mes**)

**Costo anual:** ~Bs. 2,376/año

#### Opción 2: PostgreSQL en Hostinger (Económica)
**Costos mensuales:**
- VPS 2 (2 vCores / 8 GB): USD $12.99/mes (~Bs. 90/mes)
- **Total:** USD $12.99/mes (~**Bs. 90/mes**)

**Costo anual:** ~Bs. 1,080/año

#### Opción 3: SQL Server Standard (Si lo requieren)
**Costos iniciales:**
- Licencia SQL Server Standard: USD $3,717 (~Bs. 25,669)
- VPS 2 vCPUs / 4 GB RAM: USD $24/mes (~Bs. 165/mes)

**Costo año 1:** ~Bs. 27,649
**Costo años siguientes:** ~Bs. 1,980/año (solo hosting)

#### Opción 4: Oracle (NO RECOMENDADO)
**Costos iniciales:**
- Licencia Oracle SE2: USD $17,500 (~Bs. 120,750) 💸
- VPS robusto requerido: USD $48/mes (~Bs. 331/mes)
- DBA especializado: Costo adicional

**Costo año 1:** ~Bs. 124,722 ❌ INVIABLE

---

### 7.3 Costos Adicionales Opcionales

| Concepto | Costo | Nota |
|----------|-------|------|
| **Dominio (.com)** | Bs. 100/año | Registro inicial |
| **SSL Certificado** | GRATIS | Let's Encrypt |
| **Monitoreo (UptimeRobot)** | GRATIS | Plan básico |
| **CDN (Cloudflare)** | GRATIS | Plan básico |
| **Soporte mensual** | Bs. 500/mes | Post-garantía |
| **Mantenimiento** | Bs. 1,500/mes | Incluye actualizaciones |

---

### 7.4 Inversión Total Primer Año

#### Escenario 1: PostgreSQL + DigitalOcean (RECOMENDADO) ⭐
- Desarrollo: Bs. 27,000
- Hosting anual: Bs. 2,376
- Dominio: Bs. 100
- **TOTAL AÑO 1:** **Bs. 29,476**

#### Escenario 2: PostgreSQL + Hostinger (ECONÓMICO)
- Desarrollo: Bs. 27,000
- Hosting anual: Bs. 1,080
- Dominio: Bs. 100
- **TOTAL AÑO 1:** **Bs. 28,180**

#### Escenario 3: SQL Server Standard (SI LO REQUIEREN)
- Desarrollo: Bs. 27,000
- Licencia SQL Server: Bs. 25,669
- Hosting anual: Bs. 1,980
- Dominio: Bs. 100
- **TOTAL AÑO 1:** **Bs. 54,749**

---

## 8. METODOLOGÍA DE DESARROLLO

### 8.1 PUDS (Proceso Unificado de Desarrollo de Software)

#### Principios Clave:
1. **Dirigido por Casos de Uso:** Los casos de uso guían el desarrollo
2. **Centrado en la Arquitectura:** Arquitectura sólida desde el inicio
3. **Iterativo e Incremental:** Entregas parciales funcionales
4. **Gestión de Riesgos:** Identificación y mitigación temprana

#### Workflows (Disciplinas):
- **Modelado del Negocio:** Entender procesos del cliente
- **Requisitos:** Captura con casos de uso UML
- **Análisis y Diseño:** Diagramas UML completos
- **Implementación:** Codificación en iteraciones
- **Pruebas:** Testing continuo
- **Despliegue:** CI/CD

---

### 8.2 Artefactos UML a Generar

#### Diagramas Estructurales:
1. **Diagrama de Clases:** Modelo de dominio completo
2. **Diagrama de Objetos:** Instancias de ejemplo
3. **Diagrama de Componentes:** Arquitectura de software
4. **Diagrama de Despliegue:** Infraestructura física/virtual
5. **Diagrama de Paquetes:** Organización de módulos

#### Diagramas de Comportamiento:
1. **Diagrama de Casos de Uso:** 15-20 casos de uso principales
2. **Diagrama de Secuencia:** Flujos críticos (10+)
3. **Diagrama de Actividad:** Procesos de negocio (6+)
4. **Diagrama de Estado:** Ciclo de vida de entidades clave
5. **Diagrama de Comunicación:** Interacción entre objetos

#### Modelo de Datos:
1. **Modelo Entidad-Relación (ER):** Base de datos completa
2. **Modelo Relacional:** Normalización 3FN
3. **Script DDL:** Creación de tablas, índices, constraints

---

### 8.3 Herramientas

| Categoría | Herramienta | Uso |
|-----------|-------------|-----|
| **UML** | Visual Paradigm / StarUML | Diagramas |
| **Gestión** | Jira / Trello | Seguimiento tareas |
| **Versionado** | Git + GitHub/GitLab | Control de versiones |
| **CI/CD** | GitHub Actions / GitLab CI | Automatización |
| **Testing** | PyTest / Jest | Pruebas unitarias |
| **Documentación** | Sphinx / MkDocs | Docs técnicas |
| **Prototipado** | Figma | Diseño UI/UX |

---

## 9. ENTREGABLES

### 9.1 Documentación

#### Fase de Inicio:
- ✅ Documento de Visión
- ✅ Casos de Uso Preliminares
- ✅ Plan de Desarrollo de Software
- ✅ Glosario de Términos

#### Fase de Elaboración:
- ✅ Especificación de Requisitos (SRS)
- ✅ Modelo de Casos de Uso Completo
- ✅ Modelo de Análisis y Diseño
- ✅ Diagramas UML Completos (15+ diagramas)
- ✅ Modelo de Datos (ER + Relacional)
- ✅ Documento de Arquitectura de Software
- ✅ Prototipo UI/UX Navegable

#### Fase de Construcción:
- ✅ Código Fuente Completo (repositorio Git)
- ✅ Scripts de Base de Datos
- ✅ Manual Técnico de Instalación
- ✅ Documentación de APIs (Swagger)
- ✅ Casos de Prueba y Resultados

#### Fase de Transición:
- ✅ Manual de Usuario (PDF + interactivo)
- ✅ Video Tutoriales (6+ videos)
- ✅ Guía de Administración del Sistema
- ✅ Plan de Respaldos y Recuperación
- ✅ Acta de Entrega y Aceptación

---

### 9.2 Software

#### Frontend:
- ✅ Aplicación React (build optimizado)
- ✅ Componentes reutilizables
- ✅ Responsive Design (móvil/tablet/desktop)
- ✅ PWA ready (opcional)

#### Backend:
- ✅ API REST Django (Django REST Framework)
- ✅ Autenticación JWT
- ✅ Endpoints documentados
- ✅ Migraciones de BD
- ✅ Seeds de datos de prueba

#### Base de Datos:
- ✅ Esquema PostgreSQL completo
- ✅ Datos de prueba cargados
- ✅ Índices optimizados
- ✅ Triggers y stored procedures (si se requieren)

#### Despliegue:
- ✅ Sistema en producción (VPS configurado)
- ✅ Certificado SSL instalado
- ✅ Dominio apuntando correctamente
- ✅ Backups automáticos configurados
- ✅ Monitoreo básico activo

---

## 10. GARANTÍA Y SOPORTE

### 10.1 Garantía
- **30 días de garantía** post-entrega
- Corrección de bugs sin costo adicional
- Soporte técnico vía email/WhatsApp

### 10.2 Soporte Post-Garantía
- **Plan Básico:** Bs. 500/mes
  - Soporte vía email (respuesta en 48h)
  - Resolución de bugs

- **Plan Mantenimiento:** Bs. 1,500/mes
  - Soporte prioritario (respuesta en 24h)
  - Actualizaciones de seguridad
  - Mejoras menores
  - Monitoreo proactivo

---

## 11. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Cambios de requisitos | Media | Alto | Documentación clara, cambios formales |
| Problemas de rendimiento BD | Baja | Medio | Pruebas de carga, índices optimizados |
| Falta de experiencia equipo | Media | Medio | Capacitación, pair programming |
| Problemas de integración | Media | Alto | Testing continuo, integración temprana |
| Retrasos en desarrollo | Media | Alto | Buffer de 1 semana, seguimiento diario |
| Problemas con geolocalización | Baja | Medio | Pruebas en múltiples dispositivos |

---

## 12. CONCLUSIONES Y RECOMENDACIONES

### 12.1 Resumen Ejecutivo

**Inversión Total Recomendada (Año 1):**
- Desarrollo: **Bs. 27,000**
- Infraestructura (PostgreSQL + DigitalOcean): **Bs. 2,476**
- **TOTAL: Bs. 29,476**

**ROI Esperado:**
- Sistema que optimiza gestión de inventario, clientes y ventas
- Reducción de errores manuales
- Trazabilidad completa
- Reportes en tiempo real
- Escalable para crecimiento

---

### 12.2 Recomendaciones Técnicas

#### ✅ Stack Recomendado:
- **Frontend:** React + Tailwind CSS
- **Backend:** Django + DRF
- **BD:** PostgreSQL 15 + PostGIS
- **Hosting:** DigitalOcean Droplet 2vCPU/4GB
- **Total mes:** ~USD $28.80 (~Bs. 198)

#### ❌ NO Recomendado:
- Oracle Database (costo prohibitivo, overkill)
- Shared hosting (no soporta Django adecuadamente)
- MongoDB (requiere datos relacionales)

---

### 12.3 Ventaja Competitiva

Este sistema ofrece:
1. **Geolocalización real** de clientes y vendedores
2. **Integración de inventarios** (almacén → móvil → venta)
3. **Validaciones de negocio** automáticas
4. **Reportería avanzada** con métricas clave
5. **Escalabilidad** sin cambio de arquitectura
6. **Costo contenido** vs soluciones comerciales (Salesforce, Zoho CRM)

---

## 13. ANEXOS

### Anexo A: Casos de Uso Principales

1. Gestionar Inventario Almacén
2. Transferir Productos a Inventario Móvil
3. Registrar Cliente con GPS
4. Buscar Clientes en Mapa
5. Crear Preventa
6. Registrar Motivo de No Venta
7. Generar Reporte de Vendedor
8. Autenticar Usuario

### Anexo B: Tecnologías Detalladas

**Frontend:**
- react: ^19.2.0
- tailwindcss: ^4.1.17
- react-leaflet: ^4.2.1
- leaflet: ^1.9.4
- lucide-react: ^0.263.1
- axios: ^1.6.2
- react-router-dom: ^6.20.1

**Backend:**
- Django: ^4.2.7
- djangorestframework: ^3.14.0
- psycopg2-binary: ^2.9.9
- djangorestframework-simplejwt: ^5.3.0
- django-cors-headers: ^4.3.1
- django-filter: ^23.5
- drf-spectacular: ^0.27.0

---

## CONTACTO

**Equipo de Desarrollo:**
- Desarrolladores Especializados en React + Django

**Metodología:**
- PUDS (Proceso Unificado de Desarrollo de Software)
- Modelado UML completo

**Duración:** 3 meses

**Inversión:** Bs. 27,000 (desarrollo) + ~Bs. 2,500 (infraestructura año 1)

---

*Documento generado: 2025*
*Versión: 1.0*
*Confidencial - Para uso del cliente únicamente*
