# Manual de Administración General · Portal de Gestión de Libros
## Colegio San Buenaventura

Este documento describe la funcionalidad completa del perfil de **Administrador General** en el sistema de gestión de reserva de libros del Colegio San Buenaventura.

---

## 1. Acceso al Panel Administrativo
1. Acceda a la plataforma web principal.
2. En la parte superior derecha de la cabecera (Header), pulse sobre el botón **"Acceso Colegio"** (icono de candado).
3. Introduzca la contraseña de administración configurada. Por defecto: **`admin`** o **`admin123`**.
4. Pulse **"Entrar al Panel"**. Su sesión permanecerá activa hasta que pulse "Cerrar Sesión" en la barra lateral izquierda.

---

## 2. Dashboard General (Métricas y Analíticas)
El Dashboard es el panel principal de control y ofrece una visión consolidada en tiempo real:

### Tarjetas de Métricas Clave
* **Reservas Totales**: Número acumulado de reservas completadas por las familias.
* **Importe Total Solicitado**: Suma total en euros (€) de todos los libros solicitados y pendientes de facturación.
* **Confirmadas / Listas**: Reservas en estado *Confirmado*, *Preparado* o *Entregado*.
* **Pendientes de Confirmar**: Pedidos que acaban de llegar de las familias y están a la espera de validación administrativa.

### Gráficos Interactivos (Chart.js)
El panel cuenta con tres analíticas de datos interactivas para facilitar la toma de decisiones logísticas:
1. **Evolución Temporal de Reservas**: Gráfico lineal que monitoriza cronológicamente la llegada de reservas diarias. Ayuda a identificar las semanas con mayor tráfico y cuellos de botella.
2. **Estado de Lotes por Nivel**: Gráfico de barras apiladas que clasifica el estado de preparación (`Pendiente`, `Confirmado`, `Preparado`, `Entregado`) desglosado por nivel educativo: Infantil, Primaria, ESO y Bachillerato.
3. **Distribución Económica por Editorial**: Gráfico circular de tipo Donut que calcula los costes consolidados de todos los libros reservados para mostrar qué porcentaje de facturación corresponde a cada editorial (SM, Edelvives, Oxford, Burlington, etc.).

### Previsión de Compra y Exportación a CSV
Al final de la página se encuentra la tabla de **"Previsiones de Compra y Stock Requerido"**. Consolida todas las reservas activas para indicar cuántas unidades físicas de cada ISBN deben adquirirse al distribuidor:
* Muestra el Curso, Asignatura, Título, Editorial, Precio unitario, Unidades reservadas e Importe total consolidado por ejemplar.
* Para descargar este informe en formato Excel/CSV, haga clic en el botón superior derecho **"Exportar Previsión (CSV)"**. Podrá abrirlo directamente en Microsoft Excel para enviarlo al proveedor oficial de libros.
* **Alumnos Reservados por Curso**: Cuadrícula de información compacta que desglosa el número exacto de alumnos con reserva realizada en cada uno de los niveles educativos.

---

## 3. Gestión de Reservas y Pedidos
Desde la pestaña **"Reservas / Pedidos"** de la barra lateral se realiza la operativa diaria:

### Herramientas de Búsqueda y Filtrado
* **Buscador global**: Introduzca el código de reserva, el nombre del alumno, el nombre del tutor o el teléfono para buscar coincidencias exactas.
* **Filtros rápidos**: Seleccione un curso escolar o un estado de reserva específico para acotar la búsqueda en pantalla.

### Operaciones con una Reserva
Haga clic en cualquier reserva del listado para abrir su ficha y realizar acciones avanzadas:
1. **Modificar el Estado**: Cambie el flujo del lote de manera ordenada (`Pendiente` ➔ `Confirmado` ➔ `Preparado` ➔ `Entregado`).
2. **Avisar Recogida**: Cuando el lote está preparado, pulse este botón. El sistema actualizará el estado de la reserva a "Preparado" de forma automática y registrará una plantilla de email preconfigurada notificando al tutor que ya puede recogerlo.
3. **Imprimir / Guardar Recibo**: Permite abrir el menú de impresión de su navegador para guardar la ficha familiar o imprimirla para pegarla físicamente en la caja del lote.
4. **Editar libros / alumnos**: Puede quitar asignaturas opcionales o corregir nombres de alumnos a petición del tutor pulsando sobre el botón de edición.

---

## 4. Gestión del Catálogo de Libros
Desde la sección **"Catálogo de Libros"** puede mantener actualizado el inventario de asignaturas del colegio:
* **Editar un libro**: Pulse en el botón de edición para corregir el Título, Asignatura, Editorial, ISBN o precio.
* **Añadir un nuevo libro**: Pulse el botón **"+ Añadir Libro"** en la esquina superior derecha, rellene los campos solicitados y pulse "Guardar Libro". Los cambios se replicarán al instante en el catálogo público que visualizan las familias al hacer la matrícula de libros.
* **Eliminar libro**: Borra el libro del catálogo del centro escolar.

---

## 5. Comunicaciones y Plantillas de Correo
El módulo de **"Comunicaciones"** gestiona los mensajes que se envían a las familias desde la plataforma:

### Edición de Plantillas
Puede definir el asunto y el cuerpo del mensaje para tres tipos de notificaciones automáticas seleccionando la pestaña correspondiente:
* **Confirmación de Reserva**: Se envía automáticamente al tutor cuando finaliza el asistente público.
* **Aviso de Lote Preparado**: Se envía cuando el personal marca un pedido como "Listo para recoger".
* **Reenvío manual / Recordatorio**: Permite enviar notificaciones puntuales o avisos adicionales.

### Variables Dinámicas Disponibles
Puede utilizar etiquetas especiales encerradas entre llaves en el texto del asunto o cuerpo. El sistema las reemplazará automáticamente con la información real de la reserva al enviar el correo:
* `{tutor}`: Nombre completo del tutor/padre.
* `{alumno(s)}`: Nombre(s) del alumno o de los alumnos incluidos en el pedido.
* `{curso(s)}`: Los cursos de los niños (ej: *1º Primaria, 3º Primaria*).
* `{total}`: El importe consolidado total estimado del pedido (ej: *120.50 €*).
* `{codigo}`: ID único de reserva (ej: *RES-2026-001*).

### Historial de Correos Simulado (Bandeja de Salida)
Al final de la pestaña se encuentra el registro de todos los correos virtuales enviados:
* Permite verificar la fecha y hora exacta del envío y a qué destinatario iba dirigido.
* Pulse **"Ver Detalle"** para abrir una ventana modal con el cuerpo completo del email tal y como lo redactó el sistema tras reemplazar las variables.
* Si el tutor afirma no haber recibido la notificación, pulse **"Reenviar Correo"** para enviar la copia digital de inmediato.

---

## 6. Configuración del Colegio (Ajustes Globales)
Ajustes principales del proceso de reservas accesibles desde la sección **"Configuración Colegio"**:
* **Nombre de la Institución**: Nombre oficial reflejado en recibos y correos (ej. *Colegio San Buenaventura*).
* **Año Académico**: Período escolar de aplicación (ej. *2026/2027*).
* **Fecha Límite de Reserva**: Permite definir la fecha máxima en la que el formulario público estará abierto para recibir reservas de las familias. *Al superarse esta fecha, la app bloqueará automáticamente las nuevas solicitudes.*
* **Email y Teléfono de Contacto**: Dirección y teléfono que aparecen por defecto en el pie de página de la web de cara al soporte familiar.
* **Mensaje de Pie de Recibo**: Información legal o instrucciones generales adicionales que se imprimen al pie de la copia del ticket en formato PDF.
* Pulse **"Guardar Configuración"** para confirmar y sincronizar los ajustes globales en la nube de Supabase.
