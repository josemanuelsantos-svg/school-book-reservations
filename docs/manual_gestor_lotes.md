# Manual Completo de Operario de Lotes y Almacén · Gestión Logística
## Colegio San Buenaventura

Este manual operativo describe detalladamente las tareas diarias de preparación física de lotes de libros, etiquetado de cajas, gestión de estados y entrega de pedidos asignados al perfil de **Gestor de Lotes y Almacén** del Colegio San Buenaventura.

---

## Índice
1. **Introducción y Contexto del Rol Logístico**
2. **Acceso al Panel de Almacén**
3. **Flujo de Trabajo Logístico Paso a Paso**
   * *Fase A: Selección y Localización del Lote*
   * *Fase B: Preparación Física (Picking List)*
   * *Fase C: Etiquetado e Impresión de Hojas de Control*
   * *Fase D: Notificación de Recogida ("Avisar Recogida")*
   * *Fase E: Entrega en Mano al Tutor ("Entregado")*
4. **Consejos y Buenas Prácticas en Almacén**

---

## 1. Introducción y Contexto del Rol Logístico
El perfil de **Gestor de Lotes** es un rol operativo diseñado específicamente para el personal encargado del empaquetado físico de los libros en el almacén del centro. 

### Restricción de Datos (Seguridad de la Información)
Por motivos de confidencialidad de datos financieros y de negocio del centro, este perfil **tiene restringida y oculta** la visualización de:
* 🔒 **Dashboard financiero y analíticas**: No visualiza importes económicos consolidados, precios unitarios, facturación de recibos ni gráficos de Chart.js.
* 🔒 **Configuración global**: No puede cambiar el calendario de plazos de reserva, los teléfonos o correos institucionales.
* 🔒 **Catálogo de Libros**: No tiene acceso a añadir, modificar precios o dar de baja libros de texto.
* 🔒 **Comunicaciones**: No puede editar las plantillas de correo generales ni ver el registro histórico de emails de la bandeja de salida.

Su pantalla principal está adaptada única y exclusivamente al listado de **Reservas / Pedidos** para evitar distracciones y centrarse en la logística de preparación.

---

## 2. Acceso al Panel de Almacén
1. Acceda a la plataforma web principal del colegio.
2. Haga clic en el botón **"Acceso Colegio"** (icono de candado) situado en el extremo derecho del menú superior.
3. Introduzca la contraseña asignada al personal de almacén: **`lotes`** o **`lotes123`**.
4. Pulse **"Entrar al Panel"**. Será dirigido automáticamente a la sección de control de pedidos.

---

## 3. Flujo de Trabajo Logístico Paso a Paso

El proceso diario en el almacén se compone de cinco fases consecutivas que garantizan que cada familia reciba exactamente los libros correspondientes a la matrícula de sus hijos.

### Fase A: Selección y Localización del Lote
1. En la tabla de reservas, verá el listado completo de pedidos activos.
2. Identifique los pedidos en estado **"Confirmado"** (pedidos validados administrativamente cuyas unidades ya se han adquirido y están en el centro listas para empaquetar).
3. **Búsqueda y Filtros**:
   * Puede usar el buscador superior para encontrar un código de reserva específico (ej: `RES-2026-004`) o el nombre del tutor si acude a preguntar.
   * **Recomendación**: Filtre la tabla por un curso escolar específico (ej: *Infantil 3 años*) en el menú desplegable de cursos. Esto le permitirá preparar en cadena todas las cajas de ese grupo, optimizando los tiempos de recogida de libros de una misma estantería.

---

### Fase B: Preparación Física (Picking List)
1. Haga clic sobre la reserva que desea preparar para abrir su panel de detalles.
2. El sistema le mostrará la lista de libros reservados, agrupada de manera clara por cada hijo (ejemplo: *"Alumno 1: Lucas García Pérez - 1º Primaria"*).
3. **Listado de Picking**:
   * Recorra la lista en pantalla y recoja de las estanterías del almacén las unidades físicas de cada ejemplar correspondiente, verificando el Título y la Editorial (ej: *Caballitos de mar ¿Lo ves? - EDELVIVES*).
   * Introduzca todos los libros del pedido familiar juntos en una caja física de cartón.

---

### Fase C: Etiquetado e Impresión de Hojas de Control
Para evitar pérdidas e intercambios de cajas entre familias, es obligatorio etiquetar físicamente cada lote.

1. Dentro de la ficha abierta del pedido, haga clic en el botón **"Imprimir Recibo"**.
2. Se abrirá la ventana de impresión de su sistema.
3. **Impresión de Ficha de Caja**:
   * Imprima el recibo detallado en una hoja de papel (A4 o formato etiqueta adhesiva).
   * La hoja impresa mostrará de forma muy limpia el Código de Reserva en grande, el Nombre del Tutor, el Teléfono de contacto, los Nombres de los Alumnos y el listado de libros incluidos dentro de la caja.
4. Pegue la hoja impresa con cinta adhesiva en un lateral visible de la caja física de cartón.

---

### Fase D: Notificación de Recogida ("Avisar Recogida")
Una vez empaquetado y etiquetado el lote de libros de la familia:

1. Haga clic en el botón verde **"Avisar Recogida"** en la ficha del pedido en pantalla.
2. El sistema realizará las siguientes acciones de forma automática en la base de datos de Supabase Cloud:
   * Cambiará el estado de la reserva de *"Confirmado"* a **"Preparado"**.
   * Generará y enviará un email de confirmación simulado al tutor registrado (ej: *javier.rodriguez@example.com*), informándole de que su caja de libros ya está lista y detallando el horario de retirada de secretaría (9:00 a 14:00).
   * *Aviso público*: A partir de este momento, si la familia entra a la web y busca su reserva en la pestaña de consulta, verá el timeline en estado "Preparado" con un mensaje destacado indicándole que ya puede acudir a por su lote.
3. Coloque la caja física en la sección del almacén destinada a "Lotes Listos para Recogida", ordenada alfabéticamente por el primer apellido del tutor.

---

### Fase E: Entrega en Mano al Tutor ("Entregado")
Al inicio de curso, los padres acudirán al almacén o secretaría a recoger su pedido.

1. Solicite al tutor su **Código de Reserva** o, en su defecto, su nombre y apellidos.
2. Busque la reserva en el buscador de la aplicación para confirmar que su estado de preparación es *"Preparado"*.
3. Retire la caja física del estante y entréguesela a la familia.
4. En la ficha del pedido en pantalla, cambie el estado de la reserva a **"Entregado"** en el selector de estados y pulse **"Guardar"**. El expediente quedará cerrado con éxito.

---

## 4. Consejos y Buenas Prácticas en Almacén
* **Trabajo en cadena**: Es más rápido preparar primero todos los lotes de Educación Infantil, luego Educación Primaria, ESO y Bachillerato, ya que las estanterías de libros se encuentran agrupadas por niveles educativos.
* **Exportación de control**: Si no dispone de conexión Wi-Fi estable en el almacén del centro, puede pulsar el botón **"Exportar (CSV)"** al inicio de la jornada en una zona con conexión. Podrá guardar el listado de reservas en su tableta o imprimirlo para marcar a bolígrafo las cajas preparadas antes de volcarlas al sistema.
* **Seguridad de etiquetado**: Nunca entregue una caja sin comprobar que el código físico pegado en el cartón coincide exactamente con el código del recibo que presenta la familia.
