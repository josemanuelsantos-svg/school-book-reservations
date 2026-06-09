# Manual Completo de Administración General · Gestión Escolar
## Colegio San Buenaventura

Este manual técnico y operativo está destinado al personal directivo y administrativo del **Colegio San Buenaventura** encargado de gestionar el proceso anual de reserva, compra, facturación y distribución de los libros de texto para el curso **2026/2027**.

---

## Índice
1. **Acceso y Roles de Seguridad**
2. **Dashboard de Analíticas y Control Logístico (Chart.js)**
   * *Métricas Generales en Tiempo Real*
   * *Gráficos de Analítica Avanzada*
   * *Consolidación de Stock y Exportación a Proveedores*
3. **Gestión de Reservas y Pedidos**
   * *Búsqueda, Filtros y Fichas de Control*
   * *Edición Manual de Datos de Alumnos y Libros*
   * *Flujo de Cambios de Estado y Avisos Automáticos*
4. **Mantenimiento del Catálogo de Libros**
5. **Configuración del Módulo de Comunicaciones por Email**
   * *Edición de Plantillas y Uso de Variables Dinámicas*
   * *Simulaciones de Envío de Correos*
   * *Bandeja de Salida Virtual e Inspección de Auditoría*
6. **Ajustes y Configuración Global del Centro**

---

## 1. Acceso y Roles de Seguridad
La plataforma escolar cuenta con un acceso protegido en el extremo derecho de la barra de navegación del Header (representado por el botón **"Acceso Colegio"** con un icono de candado). Al pulsarlo, se desplegará el cuadro de inicio de sesión:

* **Administrador General**:
  * **Contraseña**: **`admin`** o **`admin123`**.
  * **Permisos**: Acceso completo y sin restricciones a todas las secciones (Dashboard, Reservas, Catálogo, Comunicaciones, Configuración, Ayuda).
* **Gestor de Lotes / Almacén**:
  * **Contraseña**: **`lotes`** o **`lotes123`**.
  * **Permisos**: Acceso restringido exclusivamente al listado de reservas y preparación de cajas (sección de logística). Tiene bloqueada la visualización de datos de ingresos, catálogo, plantillas y ajustes globales.
* **Cierre de Sesión**: Para proteger la seguridad de los datos de las familias, pulse el botón **"Cerrar Sesión"** en la parte inferior de la barra lateral izquierda al terminar su jornada de trabajo.

---

## 2. Dashboard de Analíticas y Control Logístico (Chart.js)
El Dashboard general es la pantalla de bienvenida para el perfil Administrador y ofrece un resumen estadístico consolidado y animado:

### Métricas Generales en Tiempo Real
* **Reservas Totales**: El volumen acumulado de solicitudes completadas por las familias.
* **Importe Total Solicitado**: Sumatorio en euros (€) de todos los libros reservados. Representa el volumen económico global que el colegio facturará a través de los recibos de Septiembre.
* **Reservas Confirmadas/Listas**: Total de solicitudes en estado *Confirmado*, *Preparado* o *Entregado* (lotes validados y en proceso logístico).
* **Pendientes de Confirmar**: Reservas recién enviadas por la web pública que requieren validación de datos antes de unirse al proceso de compra global.

### Gráficos de Analítica Avanzada
Los gráficos dinámicos (desarrollados con Chart.js) reaccionan con animaciones suaves al cargar la pantalla y ofrecen información detallada al pasar el cursor (tooltips inteligentes):

1. **Evolución Temporal de Reservas (Línea)**: Muestra el número de reservas registradas cada día en el tiempo. Permite evaluar picos de afluencia de las familias para planificar los recursos del personal administrativo.
2. **Estado de Lotes por Nivel (Barras Apiladas)**: Clasifica las reservas según su nivel educativo (Infantil, Primaria, ESO, Bachillerato) y apila visualmente la proporción de pedidos según su estado de preparación (`Pendiente` en rojo, `Confirmado` en azul, `Preparado` en oro y `Entregado` en verde).
3. **Distribución Económica por Editorial (Donut)**: Analiza el coste acumulado de todos los libros reservados y agrupa los importes económicos según la editorial proveedora (SM, Edelvives, Oxford, Burlington, etc.). Esencial para conocer el volumen de compra exacto que se debe negociar con cada editorial.
* *Nota de Accesibilidad*: Si activa el modo oscuro, los gráficos se redibujan de forma transparente leyendo los nuevos estilos computados de CSS para que los ejes y etiquetas sigan siendo perfectamente legibles.

### Consolidación de Stock y Exportación a Proveedores
Al final del Dashboard se encuentra la tabla de **Previsiones de Compra y Stock Requerido**:
* Esta tabla recorre todas las reservas activas del sistema, desglosa los libros individuales que componen cada una, y los agrupa por ISBN/Título.
* Indica la cantidad exacta de unidades físicas que el colegio debe comprar a los distribuidores de cada ejemplar, mostrando el coste consolidado por título.
* **Exportación a CSV**: Pulse el botón **"Exportar Previsión (CSV)"** para descargar esta lista en un archivo compatible con Microsoft Excel. Puede enviar este archivo directamente al proveedor de libros para realizar el pedido de compra mayorista sin necesidad de contar libros a mano.
* **Alumnos Reservados por Curso**: Cuadrícula compacta que muestra cuántos alumnos con reserva registrada pertenecen a cada uno de los 15 cursos oficiales disponibles (ej: *3 alumnos en Infantil 3 años, 40 alumnos en 1º Primaria*).

---

## 3. Gestión de Reservas y Pedidos
Ubicada en la pestaña **"Reservas / Pedidos"**, es el núcleo operativo de la aplicación.

### Búsqueda, Filtros y Fichas de Control
* **Buscador**: Permite filtrar instantáneamente la lista escribiendo parte del código de reserva (ej: `RES-2026-001`), el nombre del alumno, el nombre del tutor, el correo o el teléfono.
* **Filtros por Curso y Estado**: Dos menús desplegables para acotar la visualización (ej: ver solo pedidos en estado *"Preparado"* de *"1º ESO"*).
* **Exportar Listado**: Permite descargar la lista de reservas filtrada en pantalla en un archivo CSV para control en papel o importación externa.

### Edición Manual de Datos de Alumnos y Libros
Si un tutor solicita corregir un error en los datos de la reserva:
1. Haga clic en la reserva correspondiente para abrir su ficha detallada.
2. Pulse el botón **"Editar Reserva"** en la esquina superior derecha.
3. Podrá corregir de forma directa los nombres de los alumnos, sus cursos asignados y los datos de contacto del tutor legal.
4. Para modificar los libros del lote, active o desactive los checkboxes del listado de libros de cada alumno. El sistema recalculará de forma automática el subtotal por alumno y el Importe Total consolidado de la reserva.
5. Pulse **"Guardar Cambios"** para actualizar la reserva en local y sincronizarla en Supabase Cloud.

### Flujo de Cambios de Estado y Avisos Automáticos
La gestión de los pedidos sigue un flujo de estados estricto:
1. **Validación**: Al revisar un pedido entrante (`Pendiente`), cámbielo a `Confirmado` en la ficha de la reserva para indicar que el colegio acepta la reserva.
2. **Aviso de Recogida**: Una vez que el lote de libros físico está empaquetado en el almacén del centro, abra la reserva y haga clic en el botón verde **"Avisar Recogida"**.
   * El sistema cambiará el estado de la reserva a **"Preparado"**.
   * Registrará y enviará de manera automática la plantilla de email de aviso de recogida al correo del tutor, detallando las instrucciones y el horario de retirada.
3. **Entrega final**: Al entregar la caja física al padre o madre al inicio del curso, marque el estado de la reserva como **"Entregado"** para cerrar definitivamente el flujo del pedido.

---

## 4. Mantenimiento del Catálogo de Libros
Desde la sección **"Catálogo de Libros"** de la barra lateral, la administración tiene el control total sobre los títulos ofertados a las familias:

* **Añadir un Nuevo Libro**:
  1. Pulse el botón **"+ Añadir Libro"** en la parte superior derecha.
  2. Introduzca el ID único/ISBN del libro.
  3. Introduzca el Título, Asignatura (ej: *Lengua*, *Matemáticas*, *Inglés*), Editorial, Curso escolar al que se aplica y el Precio con IVA incluido.
  4. Marque si el libro es **Obligatorio** (se preseleccionará y bloqueará en el wizard de familias) o si es **Opcional** (las familias eligen libremente si reservarlo o no).
  5. Pulse **"Guardar Libro"**.
* **Editar un Libro Existente**: Haga clic en el botón de edición (icono de lápiz) en la fila del libro en la tabla, modifique los datos necesarios (ej. actualizar el precio) y guarde.
* **Eliminar un Libro**: Pulse el botón de borrado (icono de papelera) para dar de baja el libro del catálogo del centro.
* *Nota*: Cualquier cambio realizado en el catálogo se aplica al instante en el formulario público de reservas.

---

## 5. Configuración del Módulo de Comunicaciones por Email
El sistema cuenta con un simulador completo de envío de notificaciones por correo electrónico a las familias.

### Edición de Plantillas y Uso de Variables Dinámicas
En la pestaña **"Comunicaciones"**, usted puede redactar y guardar el asunto y cuerpo de tres notificaciones críticas:
* **Confirmación de Pedido**: Correo de bienvenida enviado al registrar una reserva.
* **Aviso de Recogida (Listo)**: Correo enviado al pulsar "Avisar Recogida" en un lote preparado.
* **Aviso Plazo Límite**: Correo recordatorio general sobre la fecha de cierre de las reservas.

Para redactar mensajes personalizados masivos, use las siguientes variables encerradas entre llaves `{}`. El sistema las sustituirá por los datos reales del alumno y tutor en el momento de realizar el envío:
* `{tutor}`: Nombre completo del padre/madre.
* `{alumno(s)}`: Listado de nombres de los hijos incluidos en la reserva.
* `{curso(s)}`: Los cursos de los niños (ej: *1º Primaria, 3º Primaria*).
* `{codigo}`: ID único de la reserva (ej: *RES-2026-001*).
* `{total}`: Importe total consolidado del pedido (ej: *139.90 €*).

### Simulaciones de Envío de Correos
Debajo de la redacción de la plantilla, puede elegir a quién enviar el mensaje en el menú desplegable **"Destinatarios"**:
* *Todos los Tutores*: Envío masivo a toda la base de datos de reservas activas.
* *Tutores con Pedidos "Pendientes"*: Para enviar recordatorios o alertas de validación.
* *Tutores con Pedidos "Preparados"*: Para realizar reenvíos masivos de aviso de recogida.
* *Pedido Individual*: Seleccione una reserva específica para enviarle el correo de forma aislada.
* Pulse el botón **"Simular Envío Masivo / Individual"** para ejecutar la simulación.

### Bandeja de Salida Virtual e Inspección de Auditoría
En la columna derecha de la sección de comunicaciones se muestra el historial de todos los correos simulados por la plataforma:
* Cada elemento muestra el destinatario, la fecha y hora de envío, y el asunto.
* Pulse **"Ver Detalle"** en cualquier correo para abrir una ventana modal que muestra el cuerpo del mensaje tal y como lo recibió la familia, permitiéndole verificar que la sustitución de variables dinámicas ha funcionado correctamente.
* **Remitente y Destinatario de Auditoría**:
  * Los correos salientes del colegio hacia las familias se registran con el remitente **`libros@sanbuenaventura.org`**.
  * Las solicitudes de cambio entrantes de los padres se registran con el destinatario **`administracion@sanbuenaventura.org`** y el remitente "Tutor (Familia)".
* **Reenviar Correo**: Si un padre indica que no le ha llegado la notificación, abra el detalle del correo y pulse **"Reenviar Correo"** para forzar un reenvío inmediato de la copia digital.

---

## 6. Ajustes y Configuración Global del Centro
En la pestaña **"Configuración Colegio"**, la administración puede definir los parámetros de negocio de la plataforma:

* **Nombre de la Institución**: El nombre comercial reflejado en las cabeceras (por defecto: *Colegio San Buenaventura*).
* **Año Académico**: Período escolar activo (ej. *2026/2027*).
* **Fecha Límite de Reserva**: Fecha en formato calendario (`AAAA-MM-DD`). Al superarse este día, el portal público desactivará el flujo de "Nueva Reserva" y mostrará un mensaje indicando a las familias que el plazo ha finalizado, manteniéndose activo únicamente el portal de autoconsulta de estados.
* **Datos de Contacto de Ayuda**: Teléfono y correo electrónico que se muestran en el pie de página de la web pública (ej: **`administracion@sanbuenaventura.org`** y `+34 915 267 161`).
* **Mensaje de Pie de Recibo**: Texto legal o explicativo que se imprimirá al final de los tickets en formato PDF guardados por los padres (ej. políticas de devolución, plazos de recogida o recordatorios de facturación).
* Pulse el botón **"Guardar Configuración"** para confirmar y sincronizar los ajustes en Supabase.
