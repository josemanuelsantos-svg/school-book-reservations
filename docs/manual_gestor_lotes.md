# Manual del Gestor de Lotes y Almacén · Rol Logístico
## Colegio San Buenaventura

Este manual describe el flujo de trabajo y la interfaz simplificada asignada al perfil de **Gestor de Lotes/Almacén** en la plataforma del Colegio San Buenaventura.

---

## 1. Introducción y Limitación de Privilegios
El perfil de **Gestor de Lotes** ha sido diseñado específicamente para el personal encargado de la preparación física de las cajas de libros en el almacén del centro. 

Para proteger los datos sensibles del centro y simplificar el uso del operario, este rol **tiene restringidos** los accesos a:
* 🔒 **Dashboard financiero y analíticas**: No visualiza gráficos de facturación ni totales acumulados.
* 🔒 **Configuración global del colegio**: No puede alterar las fechas límite ni la información institucional.
* 🔒 **Catálogo de Libros**: No tiene permisos para añadir o modificar asignaturas ni alterar precios del catálogo.
* 🔒 **Comunicaciones**: No puede editar las plantillas de correo generales ni ver el registro histórico de emails.

Su única área de trabajo habilitada es el listado operativo de **Reservas / Pedidos**.

---

## 2. Acceso al Panel Logístico
1. Pulse sobre el botón de **"Acceso Colegio"** (icono de candado) en la esquina superior derecha del portal.
2. Introduzca la clave del perfil logístico. Por defecto: **`lotes`** o **`lotes123`**.
3. Pulse **"Entrar al Panel"**. Será redirigido automáticamente a la pestaña única de gestión de pedidos.

---

## 3. Flujo de Trabajo en Almacén (Paso a Paso)

El objetivo principal de este perfil es realizar el seguimiento y la preparación física de los lotes de libros reservados por los padres de alumnos.

### Paso 1: Localización del Lote a Preparar
1. En la tabla de reservas, utilice el buscador o los filtros para localizar los pedidos que están en estado **"Confirmado"** (es decir, el colegio dispone de los libros y ya se pueden meter en cajas).
2. Si lo prefiere, puede filtrar por un curso escolar específico (ej: *1º Primaria*) para preparar los lotes de todo ese grupo a la vez.

### Paso 2: Preparación Física
1. Haga clic en la reserva en la lista para ver el desglose en pantalla:
   * Verá el listado de alumnos del pedido.
   * Debajo de cada alumno, se listan todos los títulos de libros con su respectivo **Asunto, Título y Editorial**.
2. Vaya a la estantería del almacén y recoja las unidades exactas de cada libro listado.
3. Colóquelas dentro de una caja física etiquetada con el Código de Reserva (ej: `RES-2026-003`) y el nombre del tutor.
4. Si lo desea, pulse el botón **"Imprimir Recibo"** en el panel y pegue la hoja impresa en la tapa de la caja.

### Paso 3: Notificación y Cambio de Estado a "Preparado"
1. Una vez que la caja tiene todos los libros correspondientes en su interior, haga clic en el botón verde **"Avisar Recogida"** en la ficha del pedido.
2. El sistema realizará las siguientes acciones de forma automática:
   * Cambiará el estado de la reserva de *"Confirmado"* a **"Preparado"**.
   * Enviará un email de aviso simulado a los padres informándoles de que su caja de libros está lista y detallando el horario de recogida de secretaría.
   * La familia podrá ver la actualización del timeline en tiempo real en la web pública si consultan su código.

### Paso 4: Entrega en Mano al Padre/Tutor
1. Cuando el tutor se persone en el colegio para retirar los libros, verifique su Código de Reserva o su nombre.
2. Busque la caja física correspondiente en el almacén.
3. Abra la ficha del pedido en la plataforma y pulse sobre la casilla de cambio de estado para marcar la reserva como **"Entregado"**.
4. Pulse "Guardar" para cerrar el expediente de esa familia.

---

## 4. Exportación del Listado
En la parte superior de la tabla de reservas, dispone de la opción de exportar el listado de pedidos actual:
* Pulse **"Exportar (CSV)"** para descargar el archivo.
* Esto le permitirá trabajar con una lista de control en papel o en su propia tableta digital en el almacén del centro si no dispone de conexión a Internet en esa zona de trabajo.
