// ==========================================
// CONFIGURACIÓN DE CONEXIÓN CLOUD (SUPABASE)
// ==========================================
// Rellena estas claves con los datos de tu proyecto de Supabase (Settings -> API)
const SUPABASE_URL = "https://wcrfbhbgbhmpytbwfqlx.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcmZiaGJnYmhtcHl0YndmcWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTQzNTMsImV4cCI6MjA5NjIzMDM1M30.Y2YP_XVx_5cLvPCyM714rgniebZ_fpHvCgZcs60fXb8";

let supabaseClient = null;
if (typeof supabase !== "undefined" && SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ==========================================
// CONFIGURACIÓN DE TEMA (CLARO/OSCURO)
// ==========================================
const savedTheme = localStorage.getItem("sb_theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("sb_theme", targetTheme);
  render();
};

// ==========================================
// BASE DE DATOS Y DATOS POR DEFECTO
// ==========================================

const DEFAULT_SETTINGS = {
  schoolName: "Colegio San Buenaventura",
  schoolYear: "2026/2027",
  contactEmail: "administracion@sanbuenaventura.org",
  contactPhone: "+34 915 267 161",
  deadlineDate: "2026-07-20",
  customReceiptMessage: "Gracias por realizar la reserva de libros. Recuerde que el cobro no se realiza por esta plataforma. Se cargará en el recibo escolar habitual del mes de Septiembre."
};

const DEFAULT_BOOKS = [
  // Infantil 3 años
  { id: "9788426391834", title: "Caballitos de mar ¿Lo ves? (Animales Letra Mayúscula)", subject: "Proyectos", grade: "Infantil 3 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "9788426391858", title: "Prehistoria ¿Lo ves? (Historia/Cultura Letra Mayúscula) con WQ", subject: "Proyectos", grade: "Infantil 3 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "entusiasmat-3", title: "EntusiasMAT. Proyecto de innovación matemática (Sólo de venta en el colegio)", subject: "Matemáticas", grade: "Infantil 3 años", price: 95.00, publisher: "TEKMAN BOOK", required: true },
  { id: "glp-3", title: "Great Little People. (Solo de venta en el centro) Material de aula + licencia y libro para la familia.", subject: "Inglés", grade: "Infantil 3 años", price: 42.75, publisher: "MACMILLAN", required: true },

  // Infantil 4 años
  { id: "9788426395634", title: "Calzadas romanas ¿Lo ves? (Historia/Cultura Letra Mayúscula)", subject: "Proyectos", grade: "Infantil 4 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "9788414007440", title: "Dragones ¿Lo ves? por ciclo 4 años", subject: "Proyectos", grade: "Infantil 4 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "9788414006658", title: "Agua ¿Lo ves? por ciclo 4 años", subject: "Proyectos", grade: "Infantil 4 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "entusiasmat-4", title: "EntusiasMAT. Proyecto de innovación matemática (Sólo de venta en el colegio)", subject: "Matemáticas", grade: "Infantil 4 años", price: 65.00, publisher: "TEKMAN BOOK", required: true },
  { id: "glp-4", title: "Great Little People. (Solo de venta en el centro) Material de aula + licencia y libro para la familia.", subject: "Inglés", grade: "Infantil 4 años", price: 42.75, publisher: "MACMILLAN", required: true },
  { id: "9788414007730", title: "Molalaletra Nivel 2 (Pauta) Alumno", subject: "Lectoescritura", grade: "Infantil 4 años", price: 51.57, publisher: "EDELVIVES", required: true },

  // Infantil 5 años
  { id: "9788414011676", title: "Egipto Alumno", subject: "Proyectos", grade: "Infantil 5 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "9788414020760", title: "Vuelta al mundo 5 años. 2020", subject: "Proyectos", grade: "Infantil 5 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "9788414006696", title: "El cerebro. ¿Lo ves? 5 años", subject: "Proyectos", grade: "Infantil 5 años", price: 34.52, publisher: "EDELVIVES", required: true },
  { id: "9788414007761", title: "Molalaletra Nivel 3 (Pauta) Alumno", subject: "Lectoescritura", grade: "Infantil 5 años", price: 52.45, publisher: "EDELVIVES", required: true },
  { id: "entusiasmat-5", title: "EntusiasMAT. Proyecto de innovación matemática (Sólo de venta en el colegio)", subject: "Matemáticas", grade: "Infantil 5 años", price: 65.00, publisher: "TEKMAN BOOK", required: true },
  { id: "glp-5", title: "Great Little People. (Solo de venta en el centro) Material de aula + licencia y libro para la familia.", subject: "Inglés", grade: "Infantil 5 años", price: 42.75, publisher: "MACMILLAN", required: true },

  // 1º Primaria
  { id: "9788414068274", title: "Lengua Castellana y Lit. 1º Primaria (Ligada pauta + imprenta)", subject: "Lengua", grade: "1º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414068397", title: "Matemáticas 1º Primaria (Pauta)", subject: "Matemáticas", grade: "1º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414068601", title: "Ciencias Sociales 1º Primaria (Pauta)", subject: "Sociales", grade: "1º Primaria", price: 31.29, publisher: "EDELVIVES", required: true },
  { id: "9788414073001", title: "Religión 1º Primaria", subject: "Religión", grade: "1º Primaria", price: 32.09, publisher: "EDELVIVES", required: true },
  { id: "9788410147478", title: "Natural Science 1 Roots (Outside the Box)", subject: "Naturales", grade: "1º Primaria", price: 33.66, publisher: "Mcmillan", required: true },
  { id: "9791388230011", title: "Time Travellers 2nd Ed Student's Book 1 Red Series (print)", subject: "Inglés", grade: "1º Primaria", price: 30.88, publisher: "MILTON", required: true },
  { id: "1ep-milton-rp", title: "Read&Play Milton 1º EP", subject: "Inglés", grade: "1º Primaria", price: 24.10, publisher: "MILTON", required: true },
  { id: "9788434894082", title: "Lectura: Para dormir a un Rey", subject: "Lectura", grade: "1º Primaria", price: 24.02, publisher: "SM", required: true },
  { id: "9788413923826", title: "Lectura: El desastre de Troti", subject: "Lectura", grade: "1º Primaria", price: 9.03, publisher: "SM", required: true },
  { id: "9788413923833", title: "Lectura: Los Mug, atrapados en el móvil", subject: "Lectura", grade: "1º Primaria", price: 9.03, publisher: "SM", required: true },
  { id: "9788467579192", title: "Lectura: Osita Coco está triste", subject: "Lectura", grade: "1º Primaria", price: 9.03, publisher: "SM", required: true },
  { id: "9788467585919", title: "Lectura: Cinco ovejitas y Azul", subject: "Lectura", grade: "1º Primaria", price: 9.03, publisher: "SM", required: true },
  { id: "9788491825425", title: "Lectura: Las pulgas que cambiaron el mundo", subject: "Lectura", grade: "1º Primaria", price: 0, publisher: "Ala Delta", required: false, notSoldInSchool: true },

  // 2º Primaria
  { id: "9788414068779", title: "Lengua Castellana y Literatura 2º Primaria", subject: "Lengua", grade: "2º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414068823", title: "Matemáticas 2º Primaria", subject: "Matemáticas", grade: "2º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414068991", title: "Ciencias Sociales 2º Primaria", subject: "Sociales", grade: "2º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414073018", title: "Religión 2º Primaria", subject: "Religión", grade: "2º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788419417466", title: "Natural Science 2 Outside the Box Sb Pk", subject: "Naturales", grade: "2º Primaria", price: 33.66, publisher: "Mcmillan", required: true },
  { id: "9791388230028", title: "Time Travellers 2nd Ed Student's Book 2 Red Series", subject: "Inglés", grade: "2º Primaria", price: 30.88, publisher: "MILTON", required: true },
  { id: "2ep-milton-rp", title: "Read&Play Milton 2º EP", subject: "Inglés", grade: "2º Primaria", price: 24.10, publisher: "MILTON", required: true },
  { id: "9788467552423", title: "Diccionario Avanzado Primaria. Lengua Española", subject: "Lengua", grade: "2º Primaria", price: 21.38, publisher: "SM", required: true },
  { id: "9788434895959", title: "Lecturas: Para dormir a una princesa", subject: "Lectura", grade: "2º Primaria", price: 24.02, publisher: "SM LITERATURA", required: true },
  { id: "9788467513578", title: "Lecturas: El regalo de cumpleaños", subject: "Lectura", grade: "2º Primaria", price: 24.02, publisher: "SM LITERATURA", required: true },
  { id: "9788467591644", title: "Lectura: Simón miedoso", subject: "Lectura", grade: "2º Primaria", price: 9.03, publisher: "SM LITERATURA", required: true },
  { id: "9788467579949", title: "Lectura: La lista de cumpleaños", subject: "Lectura", grade: "2º Primaria", price: 9.03, publisher: "SM LITERATURA", required: true },
  { id: "9788467579864", title: "Lectura: Morris, regálame un amigo", subject: "Lectura", grade: "2º Primaria", price: 9.03, publisher: "SM LITERATURA", required: true },
  { id: "9788467585568", title: "Lectura: Ojos negros", subject: "Lectura", grade: "2º Primaria", price: 9.03, publisher: "SM LITERATURA", required: true },
  { id: "9788467590470", title: "Lectura: Narices!", subject: "Lectura", grade: "2º Primaria", price: 9.03, publisher: "SM LITERATURA", required: true },

  // 3º Primaria
  { id: "9788414069158", title: "Lengua Castellana y Literatura 3º Primaria", subject: "Lengua", grade: "3º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414069257", title: "Matemáticas 3º Primaria (Madrid, Can, LRj, Val)", subject: "Matemáticas", grade: "3º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414069349", title: "Ciencias de la Naturaleza 3º Primaria", subject: "Naturales", grade: "3º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414045770", title: "Ciencias Sociales 3º Primaria", subject: "Sociales", grade: "3º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414073025", title: "Religión 3º Primaria", subject: "Religión", grade: "3º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9791388230035", title: "Time Travellers 2nd Ed Student's Book 3 Red Series", subject: "Inglés", grade: "3º Primaria", price: 33.38, publisher: "MILTON", required: true },
  { id: "9788419716545", title: "Bookroom Bites 3º Imagine! Blue Primaria con Read&Play", subject: "Inglés", grade: "3º Primaria", price: 25.65, publisher: "MILTON", required: true },
  { id: "9788414015391", title: "Lectura: Por fin vacaciones (El colegio de los animales mágicos)", subject: "Lectura", grade: "3º Primaria", price: 17.10, publisher: "EDELVIVES LITERATURA", required: true },
  { id: "9788414005453", title: "Lectura: El minotauro y el laberinto (Mitos Clásicos)", subject: "Lectura", grade: "3º Primaria", price: 14.01, publisher: "EDELVIVES LITERATURA", required: true },
  { id: "9788414006542", title: "Lectura: Combate en el castillo (Aprendiz de caballero)", subject: "Lectura", grade: "3º Primaria", price: 11.97, publisher: "EDELVIVES LITERATURA", required: true },
  { id: "9788467577020", title: "Lectura: ¡Que vienen los dinosaurios!", subject: "Lectura", grade: "3º Primaria", price: 9.03, publisher: "SM", required: true },
  { id: "9788413390338", title: "Lectura: El club del fuego secreto (El museo de los cuentos)", subject: "Lectura", grade: "3º Primaria", price: 12.00, publisher: "ENCUENTRO", required: true },

  // 4º Primaria
  { id: "9788414069547", title: "Lengua Castellana y Literatura 4º Primaria", subject: "Lengua", grade: "4º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414069646", title: "Matemáticas 4º Primaria (Madrid, Can, LRj, Val)", subject: "Matemáticas", grade: "4º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414069738", title: "Ciencias de la Naturaleza 4º Primaria", subject: "Naturales", grade: "4º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414069813", title: "Ciencias Sociales 4º Primaria", subject: "Sociales", grade: "4º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414073032", title: "Religión 4º Primaria", subject: "Religión", grade: "4º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9791388230042", title: "Time Travellers 2nd Ed Student's Book 4 Red Series", subject: "Inglés", grade: "4º Primaria", price: 33.38, publisher: "MILTON", required: true },
  { id: "9788419716552", title: "Bookroom Bites 4º Explore! Blue Primaria con Read&Play", subject: "Inglés", grade: "4º Primaria", price: 25.65, publisher: "MILTON", required: true },
  { id: "9788413189741", title: "Lectura: Cuando juegan las palabras", subject: "Lectura", grade: "4º Primaria", price: 9.45, publisher: "SM", required: true },
  { id: "9788491077794", title: "Lectura: Hermanos hasta en la sopa", subject: "Lectura", grade: "4º Primaria", price: 10.40, publisher: "SM", required: true },
  { id: "9788426362117", title: "Lectura: El bosque de los desaparecidos", subject: "Lectura", grade: "4º Primaria", price: 11.59, publisher: "EDELVIVES", required: true },
  { id: "9788467594409", title: "Lectura: El diablo de las aguas frías", subject: "Lectura", grade: "4º Primaria", price: 10.40, publisher: "SM", required: true },
  { id: "9788491825340", title: "La foto de los diez mil me gusta", subject: "Lectura", grade: "4º Primaria", price: 10.40, publisher: "SM", required: true },

  // 5º Primaria
  { id: "9788414069974", title: "Lengua Castellana y Literatura 5º Primaria VCC", subject: "Lengua", grade: "5º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414070079", title: "Matemáticas 5º Primaria (Madrid, Can, LRj, Val)", subject: "Matemáticas", grade: "5º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414070208", title: "Ciencias de la Naturaleza 5º Primaria", subject: "Naturales", grade: "5º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414070284", title: "Ciencias Sociales 5º Primaria", subject: "Sociales", grade: "5º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414073049", title: "Religión 5º Primaria", subject: "Religión", grade: "5º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9791388230059", title: "Time Travellers 2nd Ed Student's Book 5 Red Series", subject: "Inglés", grade: "5º Primaria", price: 33.38, publisher: "MILTON", required: true },
  { id: "9788419716569", title: "Bookroom Bites 5º Discover! Blue Primaria", subject: "Inglés", grade: "5º Primaria", price: 25.65, publisher: "MILTON", required: true },
  { id: "5ep-biblia", title: "Biblia CEE", subject: "Religión", grade: "5º Primaria", price: 9.03, publisher: "CEE", required: true },
  { id: "9788467582673", title: "Lectura: Detectives en chanclas (Proyecto Loran)", subject: "Lectura", grade: "5º Primaria", price: 10.40, publisher: "SM LITERATURA", required: true },
  { id: "9788491826729", title: "Lectura: Los escribidores de cartas", subject: "Lectura", grade: "5º Primaria", price: 10.40, publisher: "SM LITERATURA", required: true },
  { id: "9788467579208", title: "Lectura: Corazón de metal", subject: "Lectura", grade: "5º Primaria", price: 10.40, publisher: "SM LITERATURA", required: true },
  { id: "9788467594355", title: "Lectura: La revolución de los balones", subject: "Lectura", grade: "5º Primaria", price: 10.40, publisher: "SM LITERATURA", required: true },
  { id: "9788491072706", title: "Lectura: Un día en el museo", subject: "Lectura", grade: "5º Primaria", price: 10.40, publisher: "SM LITERATURA", required: true },

  // 6º Primaria
  { id: "9788414070444", title: "Lengua Castellana y Literatura 6º Primaria", subject: "Lengua", grade: "6º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414070499", title: "Matemáticas 6º Primaria", subject: "Matemáticas", grade: "6º Primaria", price: 43.98, publisher: "EDELVIVES", required: true },
  { id: "9788414070581", title: "Ciencias de la Naturaleza 6º Primaria", subject: "Naturales", grade: "6º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414070703", title: "Ciencias Sociales 6º Primaria", subject: "Sociales", grade: "6º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9788414073056", title: "Religión 6º Primaria", subject: "Religión", grade: "6º Primaria", price: 31.40, publisher: "EDELVIVES", required: true },
  { id: "9791388230066", title: "Time Travellers 2nd Ed Student's Book 6 Red Series", subject: "Inglés", grade: "6º Primaria", price: 33.38, publisher: "MILTON", required: true },
  { id: "9788419716576", title: "Bookroom Bites 6º Investigate! Blue Primaria con Read&Play incluida", subject: "Inglés", grade: "6º Primaria", price: 25.65, publisher: "MILTON", required: true },
  { id: "9788467591354", title: "Lectura: El Conde Lucanor", subject: "Lectura", grade: "6º Primaria", price: 12.30, publisher: "SM LITERATURA", required: true },
  { id: "9788478887194", title: "Lectura: El Principito (Edición Acuarelas)", subject: "Lectura", grade: "6º Primaria", price: 12.30, publisher: "SALAMANDRA", required: true },
  { id: "9788467585995", title: "Lectura: El Quijote (Versión adaptada)", subject: "Lectura", grade: "6º Primaria", price: 12.30, publisher: "SM LITERATURA", required: true },
  { id: "9788411822046", title: "Lectura: Lazarillo de Tormes", subject: "Lectura", grade: "6º Primaria", price: 12.30, publisher: "SM LITERATURA", required: true },
  { id: "9788411822800", title: "Lectura: El increíble viaje de William Parri", subject: "Lectura", grade: "6º Primaria", price: 10.40, publisher: "SM LITERATURA", required: true },

  // 1º ESO
  { id: "eso1-1", title: "Geografía e Historia: Construyendo Mundos", subject: "Sociales", grade: "1º ESO", price: 42.90, publisher: "Santillana", required: true },
  { id: "eso1-2", title: "Matemáticas 1 ESO", subject: "Matemáticas", grade: "1º ESO", price: 41.50, publisher: "Anaya", required: true },
  { id: "eso1-3", title: "Biología y Geología: Revuela", subject: "Biología", grade: "1º ESO", price: 39.95, publisher: "SM", required: true },
  { id: "eso1-4", title: "Inglés: Options 1 Student's Book", subject: "Inglés", grade: "1º ESO", price: 34.80, publisher: "Burlington", required: true },

  // 2º ESO
  { id: "eso2-1", title: "Física y Química 2 ESO", subject: "Física", grade: "2º ESO", price: 39.95, publisher: "SM", required: true },
  { id: "eso2-2", title: "Lengua Castellana y Literatura", subject: "Lengua", grade: "2º ESO", price: 41.50, publisher: "Santillana", required: true },
  { id: "eso2-3", title: "Matemáticas 2 ESO", subject: "Matemáticas", grade: "2º ESO", price: 41.50, publisher: "Anaya", required: true },

  // 3º ESO
  { id: "eso3-1", title: "Geografía e Historia 3 ESO", subject: "Sociales", grade: "3º ESO", price: 43.50, publisher: "Anaya", required: true },
  { id: "eso3-2", title: "Biología y Geología 3 ESO", subject: "Biología", grade: "3º ESO", price: 42.10, publisher: "Santillana", required: true },
  { id: "eso3-3", title: "Inglés: Options 3 Student's Book", subject: "Inglés", grade: "3º ESO", price: 35.90, publisher: "Burlington", required: true },

  // 4º ESO
  { id: "eso4-1", title: "Lengua Castellana y Literatura", subject: "Lengua", grade: "4º ESO", price: 44.50, publisher: "SM", required: true },
  { id: "eso4-2", title: "Historia 4 ESO", subject: "Sociales", grade: "4º ESO", price: 44.50, publisher: "Santillana", required: true },
  { id: "eso4-3", title: "Matemáticas Académicas 4 ESO", subject: "Matemáticas", grade: "4º ESO", price: 43.90, publisher: "Anaya", required: true },

  // 1º Bachillerato
  { id: "bach1-1", title: "Lengua Castellana y Literatura I", subject: "Lengua", grade: "1º Bachillerato", price: 48.95, publisher: "Sansy", required: true },
  { id: "bach1-2", title: "Filosofía 1º Bachillerato", subject: "Filosofía", grade: "1º Bachillerato", price: 46.50, publisher: "Diálogo", required: true },
  { id: "bach1-3", title: "Inglés: Mindset 1 Student's Book", subject: "Inglés", grade: "1º Bachillerato", price: 38.90, publisher: "Burlington", required: true },

  // 2º Bachillerato
  { id: "bach2-1", title: "Historia de España 2º Bach", subject: "Sociales", grade: "2º Bachillerato", price: 49.95, publisher: "Anaya", required: true },
  { id: "bach2-2", title: "Lengua Castellana y Literatura II", subject: "Lengua", grade: "2º Bachillerato", price: 48.95, publisher: "Sansy", required: true },
  { id: "bach2-3", title: "Historia de la Filosofía", subject: "Filosofía", grade: "2º Bachillerato", price: 46.50, publisher: "SM", required: true }
];

const DEFAULT_RESERVATIONS = [
  {
    id: "RES-2026-001",
    studentName: "Lucas García Pérez",
    studentGrade: "1º Primaria",
    parentName: "María Pérez Ramos",
    parentEmail: "maria.perez@example.com",
    parentPhone: "612345678",
    books: ["9788414068274", "9788414068397", "9788414068601"],
    total: 141.40,
    status: "Confirmado",
    createdAt: "2026-06-02T10:15:30Z"
  },
  {
    id: "RES-2026-002",
    studentName: "Sofía Martínez Ruiz",
    studentGrade: "4º Primaria",
    parentName: "Carlos Martínez Soler",
    parentEmail: "carlos.martinez@example.com",
    parentPhone: "622987654",
    books: ["9788414069547", "9788414069646"],
    total: 104.60,
    status: "Pendiente",
    createdAt: "2026-06-03T17:40:22Z"
  },
  {
    id: "RES-2026-003",
    studentName: "Mateo Fernández Gómez",
    studentGrade: "1º ESO",
    parentName: "Laura Gómez Sanz",
    parentEmail: "laura.gomez@example.com",
    parentPhone: "688112233",
    books: ["eso1-1", "eso1-2", "eso1-4"], // Desmarcó biología
    total: 119.20,
    status: "Preparado",
    createdAt: "2026-06-04T09:05:11Z"
  },
  {
    id: "RES-2026-004",
    studentName: "Emma Rodríguez Ortiz",
    studentGrade: "Infantil 3 años",
    parentName: "Javier Rodríguez Cid",
    parentEmail: "javier.rodriguez@example.com",
    parentPhone: "600778899",
    books: ["9788426391834", "9788426391858", "entusiasmat-3", "glp-3"],
    students: [
      {
        studentName: "Emma Rodríguez Ortiz",
        studentGrade: "Infantil 3 años",
        books: ["9788426391834", "9788426391858", "entusiasmat-3", "glp-3"],
        subtotal: 139.90
      }
    ],
    total: 139.90,
    status: "Pendiente",
    createdAt: "2026-06-04T12:00:00Z"
  }
];

const COURSES = [
  "Infantil 3 años", "Infantil 4 años", "Infantil 5 años",
  "1º Primaria", "2º Primaria", "3º Primaria", "4º Primaria", "5º Primaria", "6º Primaria",
  "1º ESO", "2º ESO", "3º ESO", "4º ESO",
  "1º Bachillerato", "2º Bachillerato"
];

// ==========================================
// GESTOR DE ALMACENAMIENTO (LOCALSTORAGE)
// ==========================================
const DB = {
  getSettings() {
    const data = localStorage.getItem("sb_settings");
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },
  saveSettings(settings) {
    localStorage.setItem("sb_settings", JSON.stringify(settings));
    if (supabaseClient) {
      supabaseClient.from('settings').upsert({
        id: 1,
        school_name: settings.schoolName,
        school_year: settings.schoolYear,
        deadline_date: settings.deadlineDate,
        contact_email: settings.contactEmail,
        contact_phone: settings.contactPhone,
        custom_receipt_message: settings.customReceiptMessage
      }).then(({ error }) => { if (error) console.error("Error upserting settings:", error); });
    }
  },
  getBooks() {
    const data = localStorage.getItem("sb_books");
    return data ? JSON.parse(data) : DEFAULT_BOOKS;
  },
  saveBooks(books) {
    localStorage.setItem("sb_books", JSON.stringify(books));
    if (supabaseClient) {
      supabaseClient.from('books').upsert(books.map(b => {
        const payload = {
          id: b.id,
          title: b.title,
          subject: b.subject,
          grade: b.grade,
          price: b.price,
          publisher: b.publisher,
          required: b.required
        };
        if (b.retailPrice !== undefined && b.retailPrice !== null) {
          payload.retail_price = b.retailPrice;
        }
        return payload;
      })).then(({ error }) => { if (error) console.error("Error upserting books:", error); });
    }
  },
  getReservations() {
    const data = localStorage.getItem("sb_reservations");
    return data ? JSON.parse(data) : DEFAULT_RESERVATIONS;
  },
  saveReservations(reservations) {
    localStorage.setItem("sb_reservations", JSON.stringify(reservations));
    if (supabaseClient) {
      supabaseClient.from('reservations').upsert(reservations.map(r => ({
        id: r.id,
        student_name: r.studentName,
        student_grade: r.studentGrade,
        parent_name: r.parentName,
        parent_email: r.parentEmail,
        parent_phone: r.parentPhone,
        books: r.books,
        students: r.students,
        total: r.total,
        status: r.status,
        created_at: r.createdAt
      }))).then(({ error }) => { if (error) console.error("Error upserting reservations:", error); });
    }
  },
  getEmails() {
    const data = localStorage.getItem("sb_emails");
    return data ? JSON.parse(data) : [];
  },
  saveEmails(emails) {
    localStorage.setItem("sb_emails", JSON.stringify(emails));
    if (supabaseClient) {
      supabaseClient.from('emails').upsert(emails.map(e => ({
        id: e.id,
        to_email: e.to,
        subject: e.subject,
        body: e.body,
        sent_at: e.sentAt
      }))).then(({ error }) => { if (error) console.error("Error upserting emails:", error); });
    }
  },
  init() {
    // Si la base de datos de libros es antigua (contiene ids como pri1-1), la limpiamos para forzar la recarga oficial de Primaria
    const oldBooks = localStorage.getItem("sb_books");
    if (oldBooks && oldBooks.includes("pri1-1")) {
      localStorage.removeItem("sb_books");
      localStorage.removeItem("sb_reservations");
    }

    if (!localStorage.getItem("sb_settings")) {
      this.saveSettings(DEFAULT_SETTINGS);
    } else {
      try {
        const current = JSON.parse(localStorage.getItem("sb_settings"));
        if (current && current.contactEmail === "libros@sanbuenaventura.org") {
          current.contactEmail = "administracion@sanbuenaventura.org";
          this.saveSettings(current);
        }
      } catch (e) {
        console.error("Error migrating settings:", e);
      }
    }
    if (!localStorage.getItem("sb_books")) {
      this.saveBooks(DEFAULT_BOOKS);
    } else {
      try {
        const currentBooks = JSON.parse(localStorage.getItem("sb_books")) || [];
        let modified = false;
        DEFAULT_BOOKS.forEach(defaultBook => {
          const idx = currentBooks.findIndex(b => b.id === defaultBook.id);
          if (idx === -1) {
            currentBooks.push(defaultBook);
            modified = true;
          } else {
            let itemModified = false;
            if (currentBooks[idx].price !== defaultBook.price) {
              currentBooks[idx].price = defaultBook.price;
              itemModified = true;
            }
            if (currentBooks[idx].retailPrice !== defaultBook.retailPrice) {
              currentBooks[idx].retailPrice = defaultBook.retailPrice;
              itemModified = true;
            }
            if (currentBooks[idx].notSoldInSchool !== defaultBook.notSoldInSchool) {
              currentBooks[idx].notSoldInSchool = defaultBook.notSoldInSchool;
              itemModified = true;
            }
            if (itemModified) {
              modified = true;
            }
          }
        });
        // Asegurar que todos los libros tengan `required: true` para que todo sea seleccionable/requerido por defecto internamente, excepto los que no se venden en el colegio
        currentBooks.forEach(b => {
          if (!b.notSoldInSchool && b.required !== true) {
            b.required = true;
            modified = true;
          }
        });
        if (modified) {
          this.saveBooks(currentBooks);
        }
      } catch (e) {
        console.error("Error syncing default catalog books:", e);
      }
    }
    if (!localStorage.getItem("sb_reservations")) {
      this.saveReservations(DEFAULT_RESERVATIONS);
    }
    if (!localStorage.getItem("sb_emails")) {
      this.saveEmails([]);
    }
  }
};

DB.init();

// ==========================================
// ESTADO GLOBAL DE LA APP
// ==========================================
const state = {
  view: "families", // "families" | "admin"
  adminAuthenticated: false,
  adminRole: null, // "admin" | "lotes"
  adminTab: "dashboard", // "dashboard" | "reservations" | "catalog" | "settings" | "comms"
  
  // Estado del formulario de reserva
  familyTab: "booking", // "booking" | "lookup"
  lookupForm: {
    resId: "",
    email: "",
    searchResult: null,
    errorMsg: "",
    changeMessage: "",
    changeSent: false
  },
  bookingForm: {
    step: 1,
    students: [
      {
        id: 1,
        studentName: "",
        studentGrade: COURSES[3], // 1º Primaria por defecto
        selectedBooks: []
      }
    ],
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    termsAccepted: false,
    privacyAccepted: false,
    successReservation: null // Objeto de la reserva finalizada
  },

  // Estado de administración
  admin: {
    resSearch: "",
    resGradeFilter: "",
    resStatusFilter: "",
    selectedResId: null, // Para el modal de detalles de reserva
    catGradeFilter: "",
    editingBook: null, // Objeto libro si está en modal de edición, o 'new' si crea
    editingRes: null, // Objeto reserva si está en edición
    
    // Filtros de comunicaciones
    commsTemplate: "confirmacion",
    commsSubject: "",
    commsBody: "",
    commsTarget: "all", // "all" | "pending" | "prepared" | specific reservation ID
    
    // Acciones masivas
    selectedResIds: [],
    selectedEmailId: null
  }
};

// Cargar libros del grado por defecto al inicio
function resetBookingForm() {
  state.bookingForm = {
    step: 1,
    students: [
      {
        id: Date.now(),
        studentName: "",
        studentGrade: "1º Primaria",
        selectedBooks: []
      }
    ],
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    termsAccepted: false,
    privacyAccepted: false,
    successReservation: null
  };
  updateDefaultSelectedBooks();
}

function updateDefaultSelectedBooks() {
  const books = DB.getBooks();
  state.bookingForm.students.forEach(student => {
    if (student.selectedBooks.length === 0) {
      const filtered = books.filter(b => b.grade === student.studentGrade && !b.notSoldInSchool);
      student.selectedBooks = filtered.map(b => b.id);
    }
  });
}

// Inicializar libros por defecto
updateDefaultSelectedBooks();

// ==========================================
// RENDERIZADOR Y RUTAS
// ==========================================
function setView(view) {
  state.view = view;
  if (view === "families") {
    resetBookingForm();
  }
  render();
}

function setAdminTab(tab) {
  if (state.adminRole === "lotes" && tab !== "reservations" && tab !== "help") {
    state.adminTab = "reservations";
  } else {
    state.adminTab = tab;
  }
  
  if (state.adminTab === "comms") {
    const settings = DB.getSettings();
    if (!state.admin.commsSubject) {
      state.admin.commsTemplate = "confirmacion";
      state.admin.commsSubject = "Confirmación de Reserva de Libros - " + settings.schoolName;
      state.admin.commsBody = `Estimado/a {tutor},\n\nLe confirmamos que hemos recibido correctamente la reserva de libros para {alumno(s)} ({curso(s)}).\n\nEl importe total de {total} € se cargará en su recibo escolar del mes de Septiembre. No tiene que realizar ningún pago ahora.\n\nPor favor, no conteste a este mail. Si necesita realizar cualquier trámite debe dirigirse a administracion@sanbuenaventura.org.\n\nUn cordial saludo,\nAdministración del Colegio San Buenaventura`;
    }
  }
  render();
}

// ==========================================
// TEMPLATES HTML
// ==========================================

// Header
function renderHeader() {
  const settings = DB.getSettings();
  const isDark = document.documentElement.getAttribute("data-theme") === 'dark';
  return `
    <header class="main-header">
      <div class="header-container">
        <div class="logo-area" onclick="setView('families')">
          <img src="${window.location.pathname.endsWith('previsualizacion-san-buenaventura.html') ? 'school-book-reservations/csblogo.png' : 'csblogo.png'}" alt="Logo Colegio San Buenaventura" class="school-logo">
          <div>
            <h1>${settings.schoolName}</h1>
            <p class="subtitle">Reserva de Libros · Curso ${settings.schoolYear}</p>
          </div>
        </div>
        <nav class="main-nav" style="display:flex; align-items:center;">
          <button class="theme-toggle-btn" onclick="toggleTheme()" title="Cambiar tema claro/oscuro">
            ${isDark 
              ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="vertical-align:middle;">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                 </svg>`
              : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="vertical-align:middle;">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                 </svg>`
            }
          </button>
          ${state.view === "families" 
            ? `<button class="btn btn-outline" onclick="setView('admin')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px; vertical-align:middle;">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>Acceso Colegio
               </button>` 
            : `<button class="btn btn-outline" onclick="setView('families')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px; vertical-align:middle;">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>Portal Familias
               </button>`
          }
        </nav>
      </div>
    </header>
  `;
}

// Footer
function renderFooter() {
  const settings = DB.getSettings();
  return `
    <footer class="main-footer">
      <div class="footer-container">
        <p>&copy; 2026 ${settings.schoolName}. Todos los derechos reservados.</p>
        <p>¿Necesita ayuda? Contacte en <a href="mailto:${settings.contactEmail}">${settings.contactEmail}</a> o llame al <a href="tel:${settings.contactPhone}">${settings.contactPhone}</a></p>
      </div>
    </footer>
  `;
}

window.setFamilyTab = function(tab) {
  state.familyTab = tab;
  if (tab === 'lookup') {
    state.lookupForm.resId = "";
    state.lookupForm.email = "";
    state.lookupForm.searchResult = null;
    state.lookupForm.errorMsg = "";
    state.lookupForm.changeMessage = "";
    state.lookupForm.changeSent = false;
  }
  render();
};

// Wizard de Familias
function renderFamiliesPortal() {
  const form = state.bookingForm;
  const settings = DB.getSettings();

  // Si ya se ha guardado con éxito la reserva
  if (form.successReservation) {
    return renderSuccessScreen();
  }

  let stepContent = "";
  if (form.step === 1) {
    stepContent = renderStep1();
  } else if (form.step === 2) {
    stepContent = renderStep2();
  } else if (form.step === 3) {
    stepContent = renderStep3();
  }

  return `
    <main class="main-content">
      <!-- Menú de pestañas públicas -->
      <div class="family-nav-bar">
        <button class="family-nav-tab ${state.familyTab === 'booking' ? 'active' : ''}" onclick="setFamilyTab('booking')">Nueva Reserva</button>
        <button class="family-nav-tab ${state.familyTab === 'lookup' ? 'active' : ''}" onclick="setFamilyTab('lookup')">Consultar Estado</button>
      </div>

      ${state.familyTab === 'booking' 
        ? `
          <section class="info-hero">
            <div class="hero-card">
              <h2>Reserva de libros para el próximo curso</h2>
              <p>Rellene esta solicitud para reservar los libros oficiales del <strong>Colegio San Buenaventura</strong>. La facturación se realizará a través de su recibo escolar en Septiembre, por lo que <strong>no debe abonar nada ahora</strong>.</p>
            </div>
          </section>

          <section class="wizard-container">
            <div class="wizard-progress">
              <div class="progress-step ${form.step >= 1 ? 'active' : ''}">
                <span class="step-num">1</span>
                <span class="step-label">Datos Alumno</span>
              </div>
              <div class="progress-line ${form.step >= 2 ? 'filled' : ''}"></div>
              <div class="progress-step ${form.step >= 2 ? 'active' : ''}">
                <span class="step-num">2</span>
                <span class="step-label">Selección Libros</span>
              </div>
              <div class="progress-line ${form.step >= 3 ? 'filled' : ''}"></div>
              <div class="progress-step ${form.step >= 3 ? 'active' : ''}">
                <span class="step-num">3</span>
                <span class="step-label">Confirmación</span>
              </div>
            </div>

            <div class="wizard-card card-shadow">
              ${stepContent}
            </div>
          </section>
        `
        : renderLookupTab()
      }
    </main>
  `;
}

// Paso 1: Formulario Datos
function renderStep1() {
  const form = state.bookingForm;
  return `
    <h3 class="form-title">Paso 1: Datos del alumno y contacto</h3>
    <p class="form-subtitle">Introduzca los datos de cada uno de los alumnos para los que desea reservar libros.</p>
    
    <form id="form-step1" onsubmit="handleStep1Submit(event)">
      <div id="students-container">
        ${form.students.map((student, index) => `
          <div class="student-entry-block" data-index="${index}">
            <div class="student-block-header">
              <h4>Ficha Alumno #${index + 1}</h4>
              ${form.students.length > 1 ? `
                <button type="button" class="btn-delete-student" onclick="removeStudentCard(${index})">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Eliminar
                </button>
              ` : ''}
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="studentName-${index}">Nombre completo del Alumno *</label>
                <input type="text" id="studentName-${index}" required value="${student.studentName}" oninput="handleStudentNameChange(${index}, event)" placeholder="Ej. Juan Gómez Pérez">
              </div>
              <div class="form-group col-6">
                <label for="studentGrade-${index}">Curso del alumno (Próximo Año) *</label>
                <select id="studentGrade-${index}" onchange="handleStudentGradeChange(${index}, event)">
                  ${COURSES.map(c => `<option value="${c}" ${student.studentGrade === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <button type="button" class="btn btn-outline btn-add-student" onclick="addStudentCard()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="margin-right:8px; vertical-align:middle;">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Añadir Hermano / Alumno Adicional
      </button>

      <div class="form-group" style="margin-top: 24px; border-top: 1px solid var(--border); padding-top: 20px;">
        <h4 style="font-family: var(--font-title); color: var(--primary); font-size: 15px; margin-bottom: 12px;">Datos de contacto del Tutor</h4>
        <div class="form-group">
          <label for="parentName">Nombre completo del Padre, Madre o Tutor *</label>
          <input type="text" id="parentName" required value="${form.parentName}" placeholder="Ej. Luisa Pérez Ramos">
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for="parentEmail">Correo electrónico *</label>
            <input type="email" id="parentEmail" required value="${form.parentEmail}" placeholder="Ej. tutor@correo.com">
          </div>
          <div class="form-group col-6">
            <label for="parentPhone">Teléfono de contacto *</label>
            <input type="tel" id="parentPhone" required value="${form.parentPhone}" placeholder="Ej. 600123456" pattern="[0-9+ ]{9,13}">
          </div>
        </div>
      </div>

      <div class="wizard-actions">
        <span>* Campos obligatorios</span>
        <button type="submit" class="btn btn-primary">
          Siguiente: Elegir Libros
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 8px;">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </form>
  `;
}

// Paso 2: Selección Libros
function renderStep2() {
  const form = state.bookingForm;
  const allBooks = DB.getBooks();

  let totalSelectedCount = 0;
  let totalFamilyPrice = 0;

  const sectionsHtml = form.students.map((student, studentIdx) => {
    const courseBooks = allBooks.filter(b => b.grade === student.studentGrade);
    const selectedCount = student.selectedBooks.filter(id => courseBooks.some(b => b.id === id)).length;
    const studentTotal = courseBooks
      .filter(b => student.selectedBooks.includes(b.id))
      .reduce((sum, b) => sum + b.price, 0);

    totalSelectedCount += student.selectedBooks.length;
    totalFamilyPrice += studentTotal;

    return `
      <div class="student-wizard-section">
        <span class="student-section-title">Libros de ${student.studentName || 'Alumno ' + (studentIdx + 1)} (${student.studentGrade})</span>
        
        ${courseBooks.length === 0 ? `
          <div class="empty-state-small" style="padding: 20px; text-align: center; border: 1px dashed var(--border); border-radius: var(--radius-sm); margin-top:8px;">
            <p style="color:var(--text-muted); font-size:13px;">No se han encontrado libros asignados a este curso en el catálogo.</p>
          </div>
        ` : `
          <div class="book-selection-list" style="margin-top: 8px;">
            ${courseBooks.map(book => {
              const isChecked = student.selectedBooks.includes(book.id);
              const cardStyle = book.notSoldInSchool 
                ? 'style="background-color: var(--bg-light); border-color: var(--border); cursor: default; opacity: 0.85;"' 
                : '';
              const clickHandler = book.notSoldInSchool 
                ? '' 
                : `onclick="toggleBookSelection(${studentIdx}, '${book.id}')"`;
                
              return `
                <div class="book-item-card ${isChecked && !book.notSoldInSchool ? 'selected' : ''}" ${cardStyle} ${clickHandler}>
                  <div class="book-check">
                    ${book.notSoldInSchool 
                      ? `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="color: var(--text-muted); display: block;">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                      `
                      : `<input type="checkbox" id="chk-${studentIdx}-${book.id}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleBookSelection(${studentIdx}, '${book.id}')">`
                    }
                  </div>
                  <div class="book-details">
                    <div class="book-header-line">
                      <span class="book-subject">${book.subject}</span>
                    </div>
                    <h4 class="book-title">${book.title}</h4>
                    <p class="book-publisher">Editorial: ${book.publisher}</p>
                  </div>
                  <div class="book-price" style="display:flex; flex-direction:column; align-items:flex-end; gap:2px; justify-content:center; text-align:right;">
                    ${book.notSoldInSchool 
                      ? `<span style="font-weight:600; color:var(--text-muted); font-size:12px;">No se vende en el colegio</span>`
                      : `<span style="font-weight:700; color:var(--primary);">${book.price.toFixed(2)} €</span>${book.retailPrice ? `<span style="font-size:10px; text-decoration:line-through; color:var(--text-muted); font-weight:normal; display:block;">Fuera del cole: ${book.retailPrice.toFixed(2)} €</span>` : ''}`
                    }
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          <div style="text-align: right; margin-top: 8px; font-size: 13px; color: var(--text-muted);">
            Subtotal: <strong style="color:var(--primary); font-size:14px;">${studentTotal.toFixed(2)} €</strong> (${selectedCount} de ${courseBooks.length} seleccionados)
          </div>
        `}
      </div>
    `;
  }).join('');

  return `
    <h3 class="form-title">Paso 2: Selección de libros</h3>
    <p class="form-subtitle">Por defecto vienen seleccionados todos los libros del curso. Marque o desmarque según las necesidades de cada alumno.</p>

    <div class="students-books-wrapper">
      ${sectionsHtml}
    </div>

    <div class="booking-summary-bar">
      <div>
        <span>Total libros seleccionados: <strong>${totalSelectedCount}</strong></span>
      </div>
      <div class="total-price-display">
        <span>Importe Total Familiar:</span>
        <span class="price-val">${totalFamilyPrice.toFixed(2)} €</span>
      </div>
    </div>

    <div class="wizard-actions">
      <button type="button" class="btn btn-outline" onclick="goToStep(1)">Atrás</button>
      <button type="button" class="btn btn-primary" onclick="goToStep(3)">
        Siguiente: Confirmar Reserva
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 8px;">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  `;
}

// Paso 3: Confirmación
function renderStep3() {
  const form = state.bookingForm;
  const allBooks = DB.getBooks();
  
  let finalTotal = 0;
  let hasOptionalBooksInvolved = false;

  const summaryHtml = form.students.map((student, studentIdx) => {
    const courseBooks = allBooks.filter(b => b.grade === student.studentGrade);
    const selectedBooksDetails = courseBooks.filter(b => student.selectedBooks.includes(b.id));
    const studentTotal = selectedBooksDetails.reduce((sum, b) => sum + b.price, 0);
    finalTotal += studentTotal;

    return `
      <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px dashed var(--border);">
        <h5 style="font-size:14px; color:var(--primary); margin-bottom:8px;">${student.studentName || 'Alumno ' + (studentIdx + 1)} (${student.studentGrade})</h5>
        <div class="summary-books-list">
          ${selectedBooksDetails.length === 0 
            ? `<p class="no-books-msg" style="font-size:12px; color:var(--text-muted);">No ha seleccionado ningún libro para este alumno.</p>`
            : selectedBooksDetails.map(b => `
                <div class="summary-book-item">
                  <span>${b.title} (${b.subject})</span>
                  <strong>${b.price.toFixed(2)} €</strong>
                </div>
              `).join('')
          }
          <div style="text-align:right; font-size:12px; font-weight:600; margin-top:4px;">
            Subtotal Alumno: ${studentTotal.toFixed(2)} €
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <h3 class="form-title">Paso 3: Revise su solicitud</h3>
    <p class="form-subtitle">Por favor, verifique que toda la información es correcta antes de confirmar la reserva.</p>

    <div class="summary-grid">
      <div class="summary-section">
        <h4>Datos del Familiar / Tutor</h4>
        <ul class="summary-list">
          <li><span>Tutor Legal:</span> <strong>${form.parentName}</strong></li>
          <li><span>Email:</span> <strong>${form.parentEmail}</strong></li>
          <li><span>Teléfono:</span> <strong>${form.parentPhone}</strong></li>
          <li><span>Nº Alumnos:</span> <strong>${form.students.length} alumnos</strong></li>
        </ul>
      </div>

      <div class="summary-section">
        <h4>Desglose por Alumno</h4>
        <div>
          ${summaryHtml}
          <div class="summary-total-row" style="margin-top:12px;">
            <span>Total Familiar:</span>
            <span class="total-val">${finalTotal.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>

    <div class="terms-area" style="display:flex; flex-direction:column; gap:12px;">
      <label class="checkbox-label" style="display:flex; align-items:flex-start; gap:8px; font-size:13px;">
        <input type="checkbox" id="termsCheck" ${form.termsAccepted ? 'checked' : ''} onchange="handleTermsToggle(event)" style="margin-top: 3px;">
        <span>Acepto las condiciones de la reserva. Entiendo que los libros se entregarán en Septiembre y que el cobro se cargará a través del recibo mensual bancario habitual del colegio.</span>
      </label>
      <label class="checkbox-label" style="display:flex; align-items:flex-start; gap:8px; font-size:13px; margin-top: 6px;">
        <input type="checkbox" id="privacyCheck" ${form.privacyAccepted ? 'checked' : ''} onchange="handlePrivacyToggle(event)" style="margin-top: 3px;">
        <span>He leído y acepto la <a href="https://drive.google.com/file/d/1LARo4uZu19J6sDcrCofKq_fjkdmz6FHd/view?usp=sharing" target="_blank" style="color:var(--primary); font-weight:600; text-decoration:underline;">Información Detallada sobre Protección de Datos y Privacidad</a> del Colegio San Buenaventura.</span>
      </label>
    </div>

    <div class="wizard-actions">
      <button type="button" class="btn btn-outline" onclick="goToStep(2)">Atrás</button>
      <button type="button" class="btn btn-primary btn-success" id="btn-submit-booking" onclick="submitBookingReservation()" ${!(form.termsAccepted && form.privacyAccepted) ? 'disabled' : ''}>
        Confirmar y Finalizar Reserva
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 8px;">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
    </div>
  `;
}

// Pantalla éxito
function renderSuccessScreen() {
  const form = state.bookingForm;
  const res = form.successReservation;
  const settings = DB.getSettings();

  const studentsDetails = res.students || [{
    studentName: res.studentName,
    studentGrade: res.studentGrade,
    subtotal: res.total,
    books: res.books
  }];

  return `
    <main class="main-content">
      <div class="success-container card-shadow">
        <div class="success-icon-badge">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        
        <h2>¡Reserva realizada con éxito!</h2>
        <p class="success-subtitle">Su solicitud ha quedado registrada en el sistema del colegio.</p>

        <div class="receipt-box">
          <div class="receipt-header">
            <h3>Copia de su Reserva</h3>
            <span class="receipt-id">${res.id}</span>
          </div>
          <div class="receipt-body">
            <p><strong>Tutor:</strong> ${res.parentName}</p>
            <p><strong>Contacto:</strong> ${res.parentEmail} | Tel: ${res.parentPhone}</p>
            <p><strong>Fecha:</strong> ${new Date(res.createdAt).toLocaleString("es-ES")}</p>
            <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--border);">
            
            ${studentsDetails.map((student, idx) => `
              <p style="margin-bottom:4px;">
                <strong>Alumno #${idx + 1}:</strong> ${student.studentName} (${student.studentGrade})<br>
                <small style="color:var(--text-muted);">${student.books.length} libros reservados - Subtotal: ${student.subtotal.toFixed(2)} €</small>
              </p>
            `).join('')}
            
            <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--border);">
            <p class="receipt-total">Importe Total Estimado: ${res.total.toFixed(2)} €</p>
          </div>
        </div>

        <div class="receipt-info-alert" style="flex-direction: column; align-items: flex-start; gap: 8px; width: 100%;">
          <div style="display:flex; gap: 10px; align-items: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p style="margin:0;">${settings.customReceiptMessage}</p>
          </div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.08); font-size: 13px; color: var(--primary); width: 100%; text-align: left;">
            <strong>Importante:</strong> Para cualquier cambio o solicitud en su reserva, por favor escriba directamente a <a href="mailto:administracion@sanbuenaventura.org" style="color:var(--accent-hover); text-decoration:underline; font-weight: 600;">administracion@sanbuenaventura.org</a>.
          </div>
        </div>

        <div class="success-actions">
          <button class="btn btn-primary" onclick="resetBookingForm(); setView('families');">
            Hacer otra reserva (Nuevo alumno)
          </button>
          <button class="btn btn-outline" onclick="window.print();">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px; vertical-align:middle;">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>Imprimir Recibo
          </button>
        </div>
      </div>
    </main>
  `;
}

// ==========================================
// FORMULARIOS Y EVENTOS DE RESERVA
// ==========================================
window.handleStudentNameChange = function(index, e) {
  state.bookingForm.students[index].studentName = e.target.value;
};

window.handleStudentGradeChange = function(index, e) {
  state.bookingForm.students[index].studentGrade = e.target.value;
  // Cargar libros por defecto de ese curso
  const books = DB.getBooks();
  const gradeBooks = books.filter(b => b.grade === e.target.value && !b.notSoldInSchool);
  state.bookingForm.students[index].selectedBooks = gradeBooks.map(b => b.id);
  render();
};

window.addStudentCard = function() {
  state.bookingForm.students.push({
    id: Date.now() + Math.random(),
    studentName: "",
    studentGrade: "1º Primaria",
    selectedBooks: []
  });
  // Cargar libros por defecto del nuevo estudiante
  const books = DB.getBooks();
  const gradeBooks = books.filter(b => b.grade === "1º Primaria" && !b.notSoldInSchool);
  state.bookingForm.students[state.bookingForm.students.length - 1].selectedBooks = gradeBooks.map(b => b.id);
  render();
};

window.removeStudentCard = function(index) {
  if (state.bookingForm.students.length > 1) {
    state.bookingForm.students.splice(index, 1);
    render();
  }
};

window.handleStep1Submit = function(e) {
  e.preventDefault();
  state.bookingForm.parentName = document.getElementById("parentName").value.trim();
  state.bookingForm.parentEmail = document.getElementById("parentEmail").value.trim();
  state.bookingForm.parentPhone = document.getElementById("parentPhone").value.trim();

  // Asegurar nombres de alumnos
  state.bookingForm.students.forEach((student, index) => {
    const input = document.getElementById(`studentName-${index}`);
    if (input) {
      student.studentName = input.value.trim();
    }
  });

  goToStep(2);
};

window.goToStep = function(step) {
  state.bookingForm.step = step;
  render();
};

window.toggleBookSelection = function(studentIdx, bookId) {
  const books = DB.getBooks();
  const book = books.find(b => b.id === bookId);
  if (book && book.notSoldInSchool) return;

  const student = state.bookingForm.students[studentIdx];
  const index = student.selectedBooks.indexOf(bookId);
  if (index > -1) {
    student.selectedBooks.splice(index, 1);
  } else {
    student.selectedBooks.push(bookId);
  }
  render();
};

window.handleTermsToggle = function(e) {
  state.bookingForm.termsAccepted = e.target.checked;
  const btn = document.getElementById("btn-submit-booking");
  if (btn) {
    btn.disabled = !(state.bookingForm.termsAccepted && state.bookingForm.privacyAccepted);
  }
};

window.handlePrivacyToggle = function(e) {
  state.bookingForm.privacyAccepted = e.target.checked;
  const btn = document.getElementById("btn-submit-booking");
  if (btn) {
    btn.disabled = !(state.bookingForm.termsAccepted && state.bookingForm.privacyAccepted);
  }
};

// Función auxiliar para registrar correos virtuales en el simulador
function sendSimulatedEmail(to, subject, body) {
  const emails = DB.getEmails();
  const newEmail = {
    id: `EMAIL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    to: to,
    subject: subject,
    body: body,
    sentAt: new Date().toISOString()
  };
  emails.push(newEmail);
  DB.saveEmails(emails);
  return newEmail;
}

window.submitBookingReservation = function() {
  const form = state.bookingForm;
  if (!form.termsAccepted || !form.privacyAccepted) return;

  const allBooks = DB.getBooks();

  // Mapear desglose de alumnos
  const reservationStudents = form.students.map(s => {
    const selectedBooksDetails = allBooks.filter(b => s.selectedBooks.includes(b.id));
    const subtotal = selectedBooksDetails.reduce((sum, b) => sum + b.price, 0);
    return {
      studentName: s.studentName,
      studentGrade: s.studentGrade,
      books: s.selectedBooks,
      subtotal: subtotal
    };
  });

  const total = reservationStudents.reduce((sum, s) => sum + s.subtotal, 0);

  // Campos para compatibilidad hacia atrás
  const allNames = reservationStudents.map(s => s.studentName).join(", ");
  const allGrades = [...new Set(reservationStudents.map(s => s.studentGrade))].join(", ");
  const allBookIds = [];
  reservationStudents.forEach(s => allBookIds.push(...s.books));

  // Generar ID correlativo
  const currentReservations = DB.getReservations();
  let nextNum = 1;
  if (currentReservations.length > 0) {
    const numbers = currentReservations.map(r => {
      const match = r.id.match(/RES-2026-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    nextNum = Math.max(...numbers) + 1;
  }
  const nextId = `RES-2026-${String(nextNum).padStart(3, '0')}`;

  const newReservation = {
    id: nextId,
    studentName: allNames,
    studentGrade: allGrades,
    parentName: form.parentName,
    parentEmail: form.parentEmail,
    parentPhone: form.parentPhone,
    books: allBookIds,
    students: reservationStudents, // Desglose completo
    total: total,
    status: "Pendiente",
    createdAt: new Date().toISOString()
  };

  currentReservations.push(newReservation);
  DB.saveReservations(currentReservations);

  // Enviar email virtual de confirmación
  sendSimulatedEmail(
    form.parentEmail,
    `Confirmación de Reserva de Libros - Colegio San Buenaventura`,
    `Estimado/a ${form.parentName},\n\nLe confirmamos que hemos recibido correctamente la reserva de libros para: ${allNames} (${allGrades}).\n\nEl importe total de ${total.toFixed(2)} € se cargará en su recibo escolar del mes de Septiembre. No tiene que realizar ningún pago ahora.\n\nPor favor, no conteste a este mail. Si necesita realizar cualquier trámite debe dirigirse a administracion@sanbuenaventura.org.\n\nUn cordial saludo,\nAdministración del Colegio San Buenaventura`
  );

  state.bookingForm.successReservation = newReservation;
  render();
};


// ==========================================
// PORTAL DE ADMINISTRACIÓN
// ==========================================
function renderAdminPortal() {
  if (!state.adminAuthenticated) {
    return renderAdminLogin();
  }

  return `
    <div class="admin-layout">
      <!-- Barra lateral de navegación Admin -->
      <aside class="admin-sidebar">
        <div class="admin-profile">
          <div class="admin-avatar">${state.adminRole === 'lotes' ? 'L' : 'A'}</div>
          <div>
            <h3>${state.adminRole === 'lotes' ? 'Logística' : 'Administración'}</h3>
            <p class="role">${state.adminRole === 'lotes' ? 'Logística de Lotes' : 'Gestor de Colegio'}</p>
          </div>
        </div>
        <nav class="sidebar-nav">
          ${state.adminRole === 'lotes' ? '' : `
          <button class="nav-item ${state.adminTab === 'dashboard' ? 'active' : ''}" onclick="setAdminTab('dashboard')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </button>
          `}
          <button class="nav-item ${state.adminTab === 'reservations' ? 'active' : ''}" onclick="setAdminTab('reservations')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Reservas / Pedidos
          </button>
          ${state.adminRole === 'lotes' ? '' : `
          <button class="nav-item ${state.adminTab === 'catalog' ? 'active' : ''}" onclick="setAdminTab('catalog')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Catálogo de Libros
          </button>
          <button class="nav-item ${state.adminTab === 'comms' ? 'active' : ''}" onclick="setAdminTab('comms')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>Comunicaciones
          </button>
          <button class="nav-item ${state.adminTab === 'settings' ? 'active' : ''}" onclick="setAdminTab('settings')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>Configuración Colegio
          </button>
          `}
          <button class="nav-item ${state.adminTab === 'help' ? 'active' : ''}" onclick="setAdminTab('help')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Ayuda / Manuales
          </button>
        </nav>
        <div style="margin-top:auto; padding: 16px;">
          <button class="btn btn-outline" style="width:100%; border-color: rgba(255,255,255,0.2); color: #fff;" onclick="handleLogout()">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <!-- Contenedor de Contenidos Admin -->
      <main class="admin-main">
        ${renderAdminTabContent()}
      </main>
    </div>
    
    <!-- Modales de Admin (si están activos) -->
    ${renderAdminModals()}
  `;
}

// Login de Admin
function renderAdminLogin() {
  return `
    <main class="main-content flex-center">
      <div class="login-card card-shadow">
        <div class="login-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32" class="login-icon">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <h2>Acceso Colegio</h2>
          <p>Identifíquese para gestionar los pedidos y libros del centro.</p>
        </div>
        <form onsubmit="handleLoginSubmit(event)">
          <div class="form-group">
            <label for="adminPass">Contraseña de Acceso</label>
            <input type="password" id="adminPass" required placeholder="Clave (Admin: admin123, Lotes: lotes123)">
            <p id="login-error" class="error-text hide">Contraseña incorrecta. Inténtelo de nuevo.</p>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top:16px;">
            Entrar al Panel
          </button>
        </form>
      </div>
    </main>
  `;
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const pass = document.getElementById("adminPass").value;
  if (pass === "admin123" || pass === "admin") {
    state.adminAuthenticated = true;
    state.adminRole = "admin";
    state.adminTab = "dashboard";
    render();
  } else if (pass === "lotes123" || pass === "lotes") {
    state.adminAuthenticated = true;
    state.adminRole = "lotes";
    state.adminTab = "reservations";
    render();
  } else {
    document.getElementById("login-error").classList.remove("hide");
  }
}

function handleLogout() {
  state.adminAuthenticated = false;
  state.adminRole = null;
  render();
}

// Contenido de la pestaña activa en Admin
function renderAdminTabContent() {
  switch (state.adminTab) {
    case "dashboard":
      return renderAdminDashboard();
    case "reservations":
      return renderAdminReservations();
    case "catalog":
      return renderAdminCatalog();
    case "comms":
      return renderAdminComms();
    case "settings":
      return renderAdminSettings();
    case "help":
      return renderAdminHelp();
    default:
      return "";
  }
}

// Pestaña Admin: Ayuda y Documentación
function renderAdminHelp() {
  const isLotes = state.adminRole === "lotes";
  
  if (isLotes) {
    return `
      <div class="admin-section-header">
        <h2>Manual del Gestor de Lotes / Almacén</h2>
        <p>Instrucciones de trabajo logístico para la preparación de pedidos</p>
      </div>
      
      <div class="dashboard-chart-card card-shadow" style="padding: 24px; line-height: 1.6; max-width: 800px; background-color: var(--card-bg); border-radius: var(--radius-md); border: 1.5px solid var(--border); margin-top: 20px;">
        <div style="margin-bottom: 20px; border-bottom: 1.5px solid var(--border); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: var(--primary); font-family: var(--font-title);">Guía de Operación en Almacén</h3>
          <a href="https://github.com/josemanuelsantos-svg/school-book-reservations/blob/main/docs/manual_gestor_lotes.md" target="_blank" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 6px 12px;">Ver en GitHub</a>
        </div>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 16px; margin-bottom: 6px; font-size: 15px;">1. Acceso y Restricciones</h4>
        <p style="margin-bottom: 14px; font-size: 13px; color: var(--text);">Como preparador de lotes, su panel está simplificado para facilitar la preparación rápida de cajas físicas. No tiene acceso a datos financieros, configuración global ni edición de libros.</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 16px; margin-bottom: 6px; font-size: 15px;">2. Paso a Paso para la Preparación</h4>
        <ol style="margin-left: 20px; margin-bottom: 14px; font-size: 13px; color: var(--text); display: flex; flex-direction: column; gap: 8px;">
          <li>Vaya a la pestaña <strong>"Reservas / Pedidos"</strong> en la barra lateral.</li>
          <li>Use el buscador para encontrar un pedido por nombre de alumno o tutor, o filtre por un curso específico.</li>
          <li>Haga clic en la reserva en la lista para ver los libros solicitados.</li>
          <li>Recoja físicamente los libros de las estanterías del almacén del colegio y colóquelos dentro de la caja física etiquetada con el Código de Reserva (ej: <code>RES-2026-003</code>).</li>
          <li>Si desea pegar la lista detallada en la tapa de la caja, pulse el botón <strong>"Imprimir Recibo"</strong>.</li>
        </ol>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 16px; margin-bottom: 6px; font-size: 15px;">3. Notificación de Lote Preparado</h4>
        <p style="margin-bottom: 14px; font-size: 13px; color: var(--text);">Cuando todos los libros estén en la caja, pulse el botón verde <strong>"Avisar Recogida"</strong>. El sistema cambiará automáticamente el estado del lote a <strong>"Preparado"</strong> y registrará la notificación de correo para que secretaría avise a los padres.</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 16px; margin-bottom: 6px; font-size: 15px;">4. Entrega al Tutor</h4>
        <p style="margin-bottom: 14px; font-size: 13px; color: var(--text);">Cuando vengan a retirar los libros en el inicio de curso, localice su caja física en el almacén y marque el estado de la reserva como <strong>"Entregado"</strong> en este sistema para finalizar.</p>
      </div>
    `;
  }
  
  if (!state.helpTab) {
    state.helpTab = "admin";
  }
  
  let helpContent = "";
  if (state.helpTab === "admin") {
    helpContent = `
      <div style="margin-bottom: 16px; border-bottom: 1.5px solid var(--border); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: var(--primary); font-family: var(--font-title); font-size: 16px;">Manual del Administrador General</h3>
        <a href="https://github.com/josemanuelsantos-svg/school-book-reservations/blob/main/docs/manual_administrador.md" target="_blank" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 6px 12px;">Ver en GitHub</a>
      </div>
      <div style="font-size: 13px; display: flex; flex-direction: column; gap: 14px; color: var(--text); line-height: 1.6;">
        <p>Este panel le permite gestionar todo el proceso de reserva, catálogo y comunicaciones del Colegio San Buenaventura.</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-bottom: 4px; font-size: 14px;">Dashboard y Analíticas</h4>
        <p>El panel de control muestra en tiempo real las métricas globales e interactúa con gráficos dinámicos de Chart.js:</p>
        <ul style="margin-left: 20px; display: flex; flex-direction: column; gap: 4px;">
          <li><strong>Evolución Temporal</strong>: Gráfico de líneas con el ritmo de reservas diarias.</li>
          <li><strong>Estado de Lotes por Nivel</strong>: Gráfico de barras apiladas que clasifica el progreso por niveles.</li>
          <li><strong>Editorial Donut</strong>: Desglose del coste acumulado que corresponde a cada proveedor de libros.</li>
          <li><strong>Exportar Previsión (CSV)</strong>: Descarga el consolidado de libros requeridos para realizar el pedido de compra global a las editoriales.</li>
        </ul>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 10px; margin-bottom: 4px; font-size: 14px;">Gestión de Catálogo y Ajustes</h4>
        <p>En la pestaña <strong>Configuración Colegio</strong> puede fijar la fecha límite de reserva y correos de contacto de ayuda. En <strong>Catálogo de Libros</strong> puede dar de alta nuevos ejemplares, cambiar precios e ISBN.</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 10px; margin-bottom: 4px; font-size: 14px;">Comunicaciones y Plantillas</h4>
        <p>Configure las plantillas de correo para avisar la recepción o la recogida. Use las variables automáticas <code>{tutor}</code>, <code>{alumno(s)}</code>, <code>{total}</code>, <code>{codigo}</code> y <code>{curso(s)}</code> para personalizar los emails de forma automática.</p>
      </div>
    `;
  } else if (state.helpTab === "parents") {
    helpContent = `
      <div style="margin-bottom: 16px; border-bottom: 1.5px solid var(--border); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: var(--primary); font-family: var(--font-title); font-size: 16px;">Manual del Portal de Familias</h3>
        <a href="https://github.com/josemanuelsantos-svg/school-book-reservations/blob/main/docs/manual_padres.md" target="_blank" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 6px 12px;">Ver en GitHub</a>
      </div>
      <div style="font-size: 13px; display: flex; flex-direction: column; gap: 14px; color: var(--text); line-height: 1.6;">
        <p>Instrucciones de cara a los padres de alumnos para rellenar la reserva y consultar su estado.</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-bottom: 4px; font-size: 14px;">El Asistente Público</h4>
        <p>Permite añadir varios alumnos a la vez y seleccionar asignaturas opcionales en tiempo real sin pagos por adelantado (el importe total se carga en el recibo de Septiembre).</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 10px; margin-bottom: 4px; font-size: 14px;">Portal de Autoconsulta</h4>
        <p>Los tutores pueden entrar a la sección de consulta con su Código de Reserva e Email para ver la preparación de sus libros, imprimir el recibo en PDF, compartir por WhatsApp o solicitar cambios directamente desde el formulario controlado.</p>
      </div>
    `;
  } else if (state.helpTab === "lotes") {
    helpContent = `
      <div style="margin-bottom: 16px; border-bottom: 1.5px solid var(--border); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: var(--primary); font-family: var(--font-title); font-size: 16px;">Manual de Operario de Lotes / Almacén</h3>
        <a href="https://github.com/josemanuelsantos-svg/school-book-reservations/blob/main/docs/manual_gestor_lotes.md" target="_blank" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 6px 12px;">Ver en GitHub</a>
      </div>
      <div style="font-size: 13px; display: flex; flex-direction: column; gap: 14px; color: var(--text); line-height: 1.6;">
        <p>Instrucciones de trabajo para el personal que empaqueta físicamente los libros en las cajas.</p>
        <p>Detalla el flujo de localización del lote en almacén, la ordenación física de los libros de texto, el uso del botón <strong>"Avisar Recogida"</strong> para notificar por email que ya pueden recoger la caja, y el marcaje final como <strong>"Entregado"</strong> al entregarlo a los padres.</p>
      </div>
    `;
  } else if (state.helpTab === "technical") {
    helpContent = `
      <div style="margin-bottom: 16px; border-bottom: 1.5px solid var(--border); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: var(--primary); font-family: var(--font-title); font-size: 16px;">Documentación de Arquitectura Técnica</h3>
        <a href="https://github.com/josemanuelsantos-svg/school-book-reservations/blob/main/docs/manual_tecnico_completo.md" target="_blank" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 6px 12px;">Ver en GitHub</a>
      </div>
      <div style="font-size: 13px; display: flex; flex-direction: column; gap: 14px; color: var(--text); line-height: 1.6;">
        <p>Guía técnica exhaustiva que cubre la arquitectura interna SPA del portal, la base de datos Supabase, la persistencia local, el renderizado de Chart.js y la compilación unificada.</p>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-bottom: 4px; font-size: 14px;">Esquema de Tablas (Supabase)</h4>
        <ul style="margin-left: 20px; display: flex; flex-direction: column; gap: 4px;">
          <li><code>settings</code>: ID 1. Guarda año escolar, fecha límite y contacto.</li>
          <li><code>books</code>: Catálogo oficial de libros ofertados.</li>
          <li><code>reservations</code>: Pedidos de familias con desglose JSON.</li>
          <li><code>emails</code>: Historial simulado de notificaciones de salida.</li>
        </ul>
        
        <h4 style="color: var(--primary); font-family: var(--font-title); margin-top: 10px; margin-bottom: 4px; font-size: 14px;">Compilación unificada (sync.py)</h4>
        <p>Combina <code>styles.css</code> y <code>app.js</code> en el archivo autoejecutable <code>previsualizacion-san-buenaventura.html</code> para despliegues portátiles rápidos.</p>
      </div>
    `;
  }

  return `
    <div class="admin-section-header">
      <h2>Ayuda y Documentación</h2>
      <p>Manuales de uso y documentación técnica del sistema de reserva de libros</p>
    </div>
    
    <div style="display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
      <!-- Menú de pestañas de manuales -->
      <div class="dashboard-chart-card card-shadow" style="flex: 1; min-width: 200px; padding: 16px; max-width: 250px; background-color: var(--card-bg); border-radius: var(--radius-md); border: 1.5px solid var(--border); display: flex; flex-direction: column; height: fit-content;">
        <h4 style="margin-bottom: 12px; color: var(--text-muted); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Manuales de Usuario</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn ${state.helpTab === 'admin' ? 'btn-primary' : 'btn-outline'}" onclick="setHelpTab('admin')" style="justify-content: flex-start; text-align: left; font-size: 12.5px; padding: 8px 12px; height: auto; width: 100%;">
            Administrador
          </button>
          <button class="btn ${state.helpTab === 'parents' ? 'btn-primary' : 'btn-outline'}" onclick="setHelpTab('parents')" style="justify-content: flex-start; text-align: left; font-size: 12.5px; padding: 8px 12px; height: auto; width: 100%;">
            Portal de Padres
          </button>
          <button class="btn ${state.helpTab === 'lotes' ? 'btn-primary' : 'btn-outline'}" onclick="setHelpTab('lotes')" style="justify-content: flex-start; text-align: left; font-size: 12.5px; padding: 8px 12px; height: auto; width: 100%;">
            Gestor de Lotes
          </button>
          <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0; width: 100%;">
          <h4 style="margin-bottom: 6px; color: var(--text-muted); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Mantenimiento</h4>
          <button class="btn ${state.helpTab === 'technical' ? 'btn-primary' : 'btn-outline'}" onclick="setHelpTab('technical')" style="justify-content: flex-start; text-align: left; font-size: 12.5px; padding: 8px 12px; height: auto; width: 100%;">
            Guía Técnica
          </button>
        </div>
      </div>
      
      <!-- Contenido del manual activo -->
      <div class="dashboard-chart-card card-shadow" style="flex: 3; min-width: 300px; padding: 24px; line-height: 1.6; background-color: var(--card-bg); border-radius: var(--radius-md); border: 1.5px solid var(--border);">
        ${helpContent}
      </div>
    </div>
  `;
}

window.setHelpTab = function(tab) {
  state.helpTab = tab;
  render();
};

// Pestaña Admin 1: Dashboard
function renderAdminDashboard() {
  const reservations = DB.getReservations();
  const books = DB.getBooks();

  // Estadísticas clave
  const totalCount = reservations.length;
  const totalRevenue = reservations.reduce((sum, r) => sum + r.total, 0);
  
  const pendingCount = reservations.filter(r => r.status === "Pendiente").length;
  const confirmedCount = reservations.filter(r => r.status === "Confirmado").length;
  const preparedCount = reservations.filter(r => r.status === "Preparado").length;
  const deliveredCount = reservations.filter(r => r.status === "Entregado").length;

  // Calcular reservas por curso
  const courseCounts = {};
  COURSES.forEach(c => {
    courseCounts[c] = 0;
  });
  reservations.forEach(r => {
    if (r.students && Array.isArray(r.students) && r.students.length > 0) {
      r.students.forEach(s => {
        if (courseCounts[s.studentGrade] !== undefined) {
          courseCounts[s.studentGrade]++;
        } else {
          courseCounts[s.studentGrade] = (courseCounts[s.studentGrade] || 0) + 1;
        }
      });
    } else {
      const grades = (r.studentGrade || "").split(", ");
      grades.forEach(g => {
        if (courseCounts[g] !== undefined) {
          courseCounts[g]++;
        } else {
          courseCounts[g] = (courseCounts[g] || 0) + 1;
        }
      });
    }
  });

  // Libros más reservados
  const bookCounts = {};
  reservations.forEach(r => {
    r.books.forEach(bId => {
      bookCounts[bId] = (bookCounts[bId] || 0) + 1;
    });
  });

  const sortedBookCounts = Object.entries(bookCounts)
    .map(([id, count]) => {
      const book = books.find(b => b.id === id);
      return {
        title: book ? book.title : "Libro Eliminado",
        grade: book ? book.grade : "-",
        count
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Reservas por Nivel (Infantil, Primaria, ESO, Bachillerato)
  const gradeLevels = { Infantil: 0, Primaria: 0, ESO: 0, Bachillerato: 0 };
  reservations.forEach(r => {
    if (r.studentGrade.includes("Infantil")) gradeLevels.Infantil++;
    else if (r.studentGrade.includes("Primaria")) gradeLevels.Primaria++;
    else if (r.studentGrade.includes("ESO")) gradeLevels.ESO++;
    else if (r.studentGrade.includes("Bachillerato")) gradeLevels.Bachillerato++;
  });

  // Calcular previsiones de stock requeridas consolidando reservas
  const forecast = {};
  books.forEach(b => {
    forecast[b.id] = { book: b, count: 0 };
  });
  reservations.forEach(r => {
    r.books.forEach(bId => {
      if (forecast[bId]) {
        forecast[bId].count++;
      }
    });
  });

  const activeForecast = Object.values(forecast)
    .filter(item => item.count > 0)
    .sort((a, b) => a.book.grade.localeCompare(b.book.grade) || a.book.title.localeCompare(b.book.title));

  const forecastRowsHtml = activeForecast.length === 0
    ? `<tr><td colspan="7" class="empty-table-cell">No se han registrado reservas de libros de texto.</td></tr>`
    : activeForecast.map(item => {
        const b = item.book;
        const subtotal = b.price * item.count;
        return `
          <tr>
            <td><span class="badge badge-outline">${b.grade}</span></td>
            <td><strong>[${b.subject}]</strong></td>
            <td>${b.title}</td>
            <td>${b.publisher}</td>
            <td style="text-align:right;">${b.price.toFixed(2)} €</td>
            <td style="text-align:center; font-weight:700; color:var(--primary-light);">${item.count} ud.</td>
            <td style="text-align:right; font-weight:700;">${subtotal.toFixed(2)} €</td>
          </tr>
        `;
      }).join('');

  return `
    <div class="admin-section-header">
      <h2>Panel General</h2>
      <p>Estadísticas del proceso de reserva en tiempo real</p>
    </div>

    <!-- Tarjetas de métricas -->
    <div class="metrics-grid">
      <div class="metric-card card-shadow">
        <div class="metric-icon bg-indigo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="metric-value">${totalCount}</div>
        <div class="metric-label">Reservas Totales</div>
      </div>

      <div class="metric-card card-shadow">
        <div class="metric-icon bg-amber">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div class="metric-value">${totalRevenue.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €</div>
        <div class="metric-label">Importe Total Solicitado</div>
      </div>

      <div class="metric-card card-shadow">
        <div class="metric-icon bg-emerald">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div class="metric-value">${confirmedCount + preparedCount + deliveredCount}</div>
        <div class="metric-label">Reservas Confirmadas/Listas</div>
      </div>

      <div class="metric-card card-shadow">
        <div class="metric-icon bg-red">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div class="metric-value">${pendingCount}</div>
        <div class="metric-label">Pendientes de Confirmar</div>
      </div>
    </div>

    <!-- Fila de Gráficos y Tablas: Fila 1 -->
    <div class="dashboard-grid">
      <!-- Evolución Temporal (Line Chart) -->
      <div class="dashboard-chart-card card-shadow">
        <h3>Evolución Temporal de Reservas</h3>
        <div class="chart-container-js">
          <canvas id="chartTrend"></canvas>
        </div>
      </div>

      <!-- Ranking de Libros (Mantenido) -->
      <div class="dashboard-chart-card card-shadow">
        <h3>Libros Más Reservados</h3>
        <div class="ranking-list">
          ${sortedBookCounts.length === 0 
            ? `<div class="empty-state-small">No hay reservas para mostrar rankings.</div>`
            : sortedBookCounts.map((item, idx) => `
                <div class="ranking-item">
                  <span class="ranking-num">${idx + 1}</span>
                  <div class="ranking-details">
                    <span class="ranking-title">${item.title}</span>
                    <span class="ranking-sub">${item.grade}</span>
                  </div>
                  <span class="ranking-badge bg-indigo">${item.count} ud.</span>
                </div>
              `).join('')
          }
        </div>
      </div>
    </div>

    <!-- Fila de Gráficos: Fila 2 -->
    <div class="dashboard-grid" style="margin-top: 24px;">
      <!-- Estado de Lotes por Nivel (Stacked Bar Chart) -->
      <div class="dashboard-chart-card card-shadow">
        <h3>Estado de Lotes por Nivel</h3>
        <div class="chart-container-js">
          <canvas id="chartStatus"></canvas>
        </div>
      </div>

      <!-- Distribución Económica por Editorial (Donut Chart) -->
      <div class="dashboard-chart-card card-shadow">
        <h3>Distribución Económica por Editorial</h3>
        <div class="chart-container-js">
          <canvas id="chartPublishers"></canvas>
        </div>
      </div>
    </div>

    <!-- Tabla de reservas por curso -->
    <div class="dashboard-chart-card card-shadow" style="margin-top: 24px;">
      <h3 style="margin-bottom: 16px;">Alumnos Reservados por Curso</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 12px;">
        ${COURSES.map(c => {
          const count = courseCounts[c] || 0;
          return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding: 12px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); background-color: var(--bg-card); transition: var(--transition);">
              <span style="font-size:13px; font-weight:600; color:var(--text);">${c}</span>
              <span class="badge ${count > 0 ? 'badge-required' : 'badge-outline'}" style="font-size:12px; font-weight:700; padding:4px 8px; border-radius:12px; ${count > 0 ? 'background-color:var(--primary); color:white;' : ''}">${count} alumnos</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Tabla consolidada de previsión de compras (Stock consolidado) -->
    <div class="dashboard-chart-card card-shadow" style="margin-top: 24px; max-width: 100%;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid var(--border); padding-bottom:12px; margin-bottom:16px;">
        <h3 style="border-bottom:none; margin-bottom:0;">Previsiones de Compra y Stock Requerido</h3>
        <button class="btn btn-outline" onclick="exportStockForecastCSV()" style="padding:6px 12px; font-size:12px; height:32px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" style="margin-right:6px; vertical-align:middle;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar Previsión (CSV)
        </button>
      </div>
      <div class="table-container" style="box-shadow:none; border: 1px solid var(--border); max-height: 350px; overflow-y: auto; margin-top:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Asignatura</th>
              <th>Título del Libro</th>
              <th>Editorial</th>
              <th style="text-align:right;">Precio</th>
              <th style="text-align:center;">Unidades Reservadas</th>
              <th style="text-align:right;">Importe Consolidado</th>
            </tr>
          </thead>
          <tbody>
            ${forecastRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Vinculación del CSV exporter de Previsión de stock
window.exportStockForecastCSV = function() {
  const reservations = DB.getReservations();
  const books = DB.getBooks();

  const forecast = {};
  books.forEach(b => {
    forecast[b.id] = { book: b, count: 0 };
  });
  reservations.forEach(r => {
    r.books.forEach(bId => {
      if (forecast[bId]) {
        forecast[bId].count++;
      }
    });
  });

  const activeForecast = Object.values(forecast)
    .filter(item => item.count > 0)
    .sort((a, b) => a.book.grade.localeCompare(b.book.grade) || a.book.title.localeCompare(b.book.title));

  let csvContent = "data:text/csv;charset=utf-8,Curso,Asignatura,Titulo,Editorial,Precio,Unidades Reservadas,Importe Consolidado\n";

  activeForecast.forEach(item => {
    const b = item.book;
    const subtotal = b.price * item.count;
    csvContent += `"${b.grade}","${b.subject}","${b.title}","${b.publisher}",${b.price.toFixed(2)},${item.count},${subtotal.toFixed(2)}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "prevision_compras_colegio.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Gráfico circular en SVG
function renderSvgChart(levels, total) {
  if (total === 0) {
    return `<div class="empty-state-small">No hay datos suficientes para generar el gráfico.</div>`;
  }
  
  // Calcular porcentajes
  const infPct = (levels.Infantil / total) * 100;
  const priPct = (levels.Primaria / total) * 100;
  const esoPct = (levels.ESO / total) * 100;
  const bachPct = (levels.Bachillerato / total) * 100;

  return `
    <div class="svg-chart-wrapper">
      <svg class="donut-chart" viewBox="0 0 100 100" width="160" height="160">
        <!-- Fondo -->
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" stroke-width="12" />
        
        <!-- Infantil (Azul) -->
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" stroke-width="12" 
          stroke-dasharray="${infPct} ${100 - infPct}" stroke-dashoffset="25" />
        
        <!-- Primaria (Verde) -->
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" stroke-width="12" 
          stroke-dasharray="${priPct} ${100 - priPct}" stroke-dashoffset="${25 - infPct}" />
        
        <!-- ESO (Naranja) -->
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" stroke-width="12" 
          stroke-dasharray="${esoPct} ${100 - esoPct}" stroke-dashoffset="${25 - infPct - priPct}" />
        
        <!-- Bachillerato (Rojo) -->
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" stroke-width="12" 
          stroke-dasharray="${bachPct} ${100 - bachPct}" stroke-dashoffset="${25 - infPct - priPct - esoPct}" />
      </svg>
      
      <div class="chart-legend">
        <div class="legend-item"><span class="color-dot bg-blue"></span> Infantil: <strong>${levels.Infantil}</strong> (${infPct.toFixed(0)}%)</div>
        <div class="legend-item"><span class="color-dot bg-emerald"></span> Primaria: <strong>${levels.Primaria}</strong> (${priPct.toFixed(0)}%)</div>
        <div class="legend-item"><span class="color-dot bg-amber"></span> ESO: <strong>${levels.ESO}</strong> (${esoPct.toFixed(0)}%)</div>
        <div class="legend-item"><span class="color-dot bg-red"></span> Bachillerato: <strong>${levels.Bachillerato}</strong> (${bachPct.toFixed(0)}%)</div>
      </div>
    </div>
  `;
}

// Pestaña Admin 2: Reservas
function renderAdminReservations() {
  const reservations = DB.getReservations();
  const search = state.admin.resSearch.toLowerCase();
  const grade = state.admin.resGradeFilter;
  const status = state.admin.resStatusFilter;

  // Filtrar
  const filteredReservations = reservations.filter(r => {
    const matchesSearch = r.studentName.toLowerCase().includes(search) || 
                          r.parentName.toLowerCase().includes(search) || 
                          r.id.toLowerCase().includes(search);
    const matchesGrade = grade === "" || r.studentGrade === grade;
    const matchesStatus = status === "" || r.status === status;
    return matchesSearch && matchesGrade && matchesStatus;
  }).reverse(); // Más nuevas primero

  const selectedIds = state.admin.selectedResIds;
  const allSelectedOnPage = filteredReservations.length > 0 && filteredReservations.every(r => selectedIds.includes(r.id));

  // Barra flotante de acciones masivas
  let bulkActionsHtml = "";
  if (selectedIds.length > 0) {
    bulkActionsHtml = `
      <div class="bulk-actions-bar card-shadow">
        <div>
          <span>${selectedIds.length} reserva(s) seleccionada(s)</span>
        </div>
        <div class="actions">
          <select id="bulkActionSelect" onchange="handleBulkAction(this.value); this.value='';">
            <option value="">-- Acciones en Bloque --</option>
            <option value="Pendiente">Marcar como "Pendiente"</option>
            <option value="Confirmado">Marcar como "Confirmado"</option>
            <option value="Preparado">Marcar como "Preparado"</option>
            <option value="Entregado">Marcar como "Entregado"</option>
            <option value="email_recogida">Avisar Recogida (Enviar Email)</option>
            ${state.adminRole === 'lotes' ? '' : '<option value="delete">Eliminar Reservas</option>'}
          </select>
        </div>
      </div>
    `;
  }

  return `
    <div class="admin-section-header row-space">
      <div>
        <h2>Listado de Reservas</h2>
        <p>Gestión de las solicitudes recibidas por las familias</p>
      </div>
      <div>
        <button class="btn btn-outline" onclick="exportReservationsCSV()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px; vertical-align:middle;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>Exportar CSV
        </button>
      </div>
    </div>

    <!-- Barra de Filtros -->
    <div class="filters-bar card-shadow">
      <div class="filter-input-wrapper flex-grow">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="resSearchInput" placeholder="Buscar por Alumno, Tutor o Reserva ID..." value="${state.admin.resSearch}" oninput="handleResFilterChange(event, 'resSearch')">
      </div>
      
      <div class="filter-select">
        <select id="resGradeSelect" onchange="handleResFilterChange(event, 'resGradeFilter')">
          <option value="">Todos los cursos</option>
          ${COURSES.map(c => `<option value="${c}" ${grade === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>

      <div class="filter-select">
        <select id="resStatusSelect" onchange="handleResFilterChange(event, 'resStatusFilter')">
          <option value="">Todos los estados</option>
          <option value="Pendiente" ${status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="Confirmado" ${status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
          <option value="Preparado" ${status === 'Prepared' || status === 'Preparado' ? 'selected' : ''}>Preparado</option>
          <option value="Entregado" ${status === 'Entregado' ? 'selected' : ''}>Entregado</option>
        </select>
      </div>
    </div>

    <!-- Barra de acciones flotante -->
    ${bulkActionsHtml}

    <!-- Tabla de Reservas -->
    <div class="table-container card-shadow" style="margin-top:0;">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px; text-align:center;">
              <input type="checkbox" ${allSelectedOnPage ? 'checked' : ''} onchange="toggleSelectAllReservations(event)">
            </th>
            <th>Reserva ID</th>
            <th>Alumno</th>
            <th>Curso</th>
            <th>Familiar</th>
            <th>Fecha</th>
            <th>Libros</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${filteredReservations.length === 0 
            ? `<tr><td colspan="10" class="empty-table-cell">No se encontraron reservas con los filtros seleccionados.</td></tr>`
            : filteredReservations.map(r => {
                const isChecked = selectedIds.includes(r.id);
                return `
                  <tr class="${isChecked ? 'row-selected' : ''}">
                    <td style="text-align:center;">
                      <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleSelectReservation('${r.id}', event)">
                    </td>
                    <td><strong>${r.id}</strong></td>
                    <td>${r.studentName}</td>
                    <td><span class="badge badge-outline">${r.studentGrade}</span></td>
                    <td>
                      <div class="table-contact-cell">
                        <span>${r.parentName}</span>
                        <small>${r.parentPhone}</small>
                      </div>
                    </td>
                    <td>${new Date(r.createdAt).toLocaleDateString("es-ES")}</td>
                    <td>${r.books.length}</td>
                    <td><strong>${r.total.toFixed(2)} €</strong></td>
                    <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
                    <td>
                      <button class="btn btn-icon-only" onclick="showReservationDetails('${r.id}')" title="Ver Detalles">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')
          }
        </tbody>
      </table>
    </div>
  `;
}

window.handleResFilterChange = function(e, field) {
  state.admin[field] = e.target.value;
  // Limpiar seleccionados al cambiar filtros para evitar errores
  state.admin.selectedResIds = [];
  render();
};

window.toggleSelectAllReservations = function(e) {
  const isChecked = e.target.checked;
  const reservations = DB.getReservations();
  const search = state.admin.resSearch.toLowerCase();
  const grade = state.admin.resGradeFilter;
  const status = state.admin.resStatusFilter;

  const filtered = reservations.filter(r => {
    const matchesSearch = r.studentName.toLowerCase().includes(search) || 
                          r.parentName.toLowerCase().includes(search) || 
                          r.id.toLowerCase().includes(search);
    const matchesGrade = grade === "" || r.studentGrade === grade;
    const matchesStatus = status === "" || r.status === status;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  if (isChecked) {
    state.admin.selectedResIds = filtered.map(r => r.id);
  } else {
    state.admin.selectedResIds = [];
  }
  render();
};

window.toggleSelectReservation = function(id, e) {
  const index = state.admin.selectedResIds.indexOf(id);
  if (e.target.checked) {
    if (index === -1) {
      state.admin.selectedResIds.push(id);
    }
  } else {
    if (index > -1) {
      state.admin.selectedResIds.splice(index, 1);
    }
  }
  render();
};

window.handleBulkAction = function(action) {
  if (!action) return;
  const ids = state.admin.selectedResIds;
  if (ids.length === 0) return;

  const reservations = DB.getReservations();

  if (action === "delete") {
    if (state.adminRole === "lotes") {
      alert("Acceso denegado: El personal de lotes no puede eliminar reservas.");
      return;
    }
    if (confirm(`¿Está seguro de que desea eliminar las ${ids.length} reservas seleccionadas?`)) {
      const updated = reservations.filter(r => !ids.includes(r.id));
      DB.saveReservations(updated);
      state.admin.selectedResIds = [];
      alert("Reservas eliminadas correctamente.");
    }
  } else if (action === "email_recogida") {
    if (confirm(`¿Desea enviar emails simulados de recogida a los tutores de las ${ids.length} reservas seleccionadas? (También cambiará sus estados a "Preparado")`)) {
      const settings = DB.getSettings();
      const emailSubject = "Libros listos para recoger - " + settings.schoolName;
      
      ids.forEach(id => {
        const r = reservations.find(item => item.id === id);
        if (r) {
          r.status = "Preparado";
          const emailBody = `Estimado/a ${r.parentName || ''},\n\nNos complace informarle de que el lote de libros reservados para ${r.studentName || ''} ya está preparado.\n\nPuede pasar a recogerlo por la secretaría del centro en horario de 9:00 a 14:00.\n\nAtentamente,\nAdministración del Colegio San Buenaventura`;
          sendSimulatedEmail(r.parentEmail || '', emailSubject, emailBody);
        }
      });
      
      DB.saveReservations(reservations);
      state.admin.selectedResIds = [];
      alert(`Se han cambiado los estados y se han enviado ${ids.length} avisos virtuales de recogida.`);
    }
  } else {
    // Pendiente, Confirmado, Preparado, Entregado
    ids.forEach(id => {
      const r = reservations.find(item => item.id === id);
      if (r) {
        r.status = action;
      }
    });
    DB.saveReservations(reservations);
    state.admin.selectedResIds = [];
    alert(`Se ha cambiado el estado de ${ids.length} reservas a "${action}".`);
  }
  render();
};

window.showReservationDetails = function(id) {
  state.admin.selectedResId = id;
  render();
};

window.closeReservationDetails = function() {
  state.admin.selectedResId = null;
  render();
};

window.changeReservationStatus = function(id, newStatus) {
  const reservations = DB.getReservations();
  const index = reservations.findIndex(r => r.id === id);
  if (index > -1) {
    reservations[index].status = newStatus;
    DB.saveReservations(reservations);
    state.admin.selectedResId = id; // Mantener modal abierto con nuevo estado
    render();
  }
};

window.exportReservationsCSV = function() {
  const reservations = DB.getReservations();
  const books = DB.getBooks();

  let csvContent = "data:text/csv;charset=utf-8,ID Reserva,Fecha,Alumno,Curso,Tutor,Email,Telefono,Num Libros,Total,Estado\n";
  
  reservations.forEach(r => {
    const date = new Date(r.createdAt).toLocaleDateString("es-ES");
    csvContent += `"${r.id}","${date}","${r.studentName}","${r.studentGrade}","${r.parentName}","${r.parentEmail}","${r.parentPhone}",${r.books.length},${r.total.toFixed(2)},"${r.status}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "reservas_libros_san_buenaventura.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


// Pestaña Admin 3: Catálogo
function renderAdminCatalog() {
  const books = DB.getBooks();
  const filterGrade = state.admin.catGradeFilter;

  const filteredBooks = filterGrade === "" 
    ? books 
    : books.filter(b => b.grade === filterGrade);

  return `
    <div class="admin-section-header row-space">
      <div>
        <h2>Catálogo de Libros</h2>
        <p>Añada, edite o retire libros del inventario del colegio</p>
      </div>
      <div>
        <button class="btn btn-primary" onclick="openBookModal('new')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px; vertical-align:middle;">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>Nuevo Libro
        </button>
      </div>
    </div>

    <!-- Filtro Catálogo -->
    <div class="filters-bar card-shadow">
      <div style="display:flex; align-items:center; gap: 8px;">
        <label for="catGradeSelect">Filtrar por curso:</label>
        <div class="filter-select">
          <select id="catGradeSelect" onchange="handleCatFilterChange(event)">
            <option value="">Todos los cursos</option>
            ${COURSES.map(c => `<option value="${c}" ${filterGrade === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="subtext">
        Libros en catálogo: <strong>${filteredBooks.length}</strong>
      </div>
    </div>

    <!-- Listado del Catálogo -->
    <div class="table-container card-shadow">
      <table class="data-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Asignatura</th>
            <th>Título del Libro</th>
            <th>Editorial</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${filteredBooks.length === 0 
            ? `<tr><td colspan="6" class="empty-table-cell">No hay libros registrados en este curso.</td></tr>`
            : filteredBooks.map(b => `
                <tr>
                  <td><span class="badge badge-outline">${b.grade}</span></td>
                  <td><strong>${b.subject}</strong></td>
                  <td>${b.title}</td>
                  <td>${b.publisher}</td>
                  <td>
                    ${b.notSoldInSchool 
                      ? `<span style="color:var(--text-muted); font-size:12px; font-weight:600; white-space:nowrap;">No se vende en el cole</span>`
                      : `<strong>${b.price.toFixed(2)} €</strong>${b.retailPrice ? `<br><small style="color:var(--text-muted); text-decoration:line-through; white-space:nowrap;">Fuera: ${b.retailPrice.toFixed(2)} €</small>` : ''}`
                    }
                  </td>
                  <td>
                    <div style="display:flex; gap: 4px;">
                      <button class="btn btn-icon-only" onclick="openBookModal('${b.id}')" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button class="btn btn-icon-only btn-danger-text" onclick="deleteBook('${b.id}')" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')
          }
        </tbody>
      </table>
    </div>
  `;
}

window.handleCatFilterChange = function(e) {
  state.admin.catGradeFilter = e.target.value;
  render();
};

window.openBookModal = function(bookId) {
  if (state.adminRole === "lotes") {
    alert("Acceso denegado: El personal de lotes no puede gestionar el catálogo.");
    return;
  }
  if (bookId === "new") {
    state.admin.editingBook = { id: "", title: "", subject: "", grade: COURSES[0], price: 0, retailPrice: null, publisher: "", required: true, notSoldInSchool: false };
  } else {
    const books = DB.getBooks();
    state.admin.editingBook = { ...books.find(b => b.id === bookId) };
  }
  render();
};

window.closeBookModal = function() {
  state.admin.editingBook = null;
  render();
};

window.deleteBook = function(id) {
  if (state.adminRole === "lotes") {
    alert("Acceso denegado: El personal de lotes no puede gestionar el catálogo.");
    return;
  }
  if (confirm("¿Está seguro de que desea eliminar este libro? Esto no borrará las reservas ya realizadas que lo contengan, pero ya no aparecerá para nuevas reservas.")) {
    let books = DB.getBooks();
    books = books.filter(b => b.id !== id);
    DB.saveBooks(books);
    render();
  }
};

window.saveBook = function(e) {
  e.preventDefault();
  if (state.adminRole === "lotes") {
    alert("Acceso denegado: El personal de lotes no puede gestionar el catálogo.");
    return;
  }
  const idInput = document.getElementById("edit-book-id").value;
  const title = document.getElementById("edit-book-title").value.trim();
  const subject = document.getElementById("edit-book-subject").value.trim();
  const grade = document.getElementById("edit-book-grade").value;
  const publisher = document.getElementById("edit-book-publisher").value.trim();
  const notSoldInSchool = document.getElementById("edit-book-not-sold").checked;
  const price = notSoldInSchool ? 0 : parseFloat(document.getElementById("edit-book-price").value);
  const retailPriceInput = document.getElementById("edit-book-retail-price").value;
  const retailPrice = notSoldInSchool ? null : (retailPriceInput !== "" ? parseFloat(retailPriceInput) : null);
  const required = true;

  const books = DB.getBooks();

  if (idInput === "") {
    // Es nuevo libro
    const newId = "book-" + Date.now();
    const newBook = { id: newId, title, subject, grade, publisher, price, retailPrice, notSoldInSchool, required };
    books.push(newBook);
  } else {
    // Editar existente
    const idx = books.findIndex(b => b.id === idInput);
    if (idx > -1) {
      books[idx] = { id: idInput, title, subject, grade, publisher, price, retailPrice, notSoldInSchool, required };
    }
  }

  DB.saveBooks(books);
  state.admin.editingBook = null;
  render();
};

window.openEditReservation = function(id) {
  if (state.adminRole === "lotes") {
    alert("Acceso denegado: El personal de lotes no puede modificar reservas.");
    return;
  }
  const reservations = DB.getReservations();
  const res = reservations.find(r => r.id === id);
  if (res) {
    const clone = JSON.parse(JSON.stringify(res));
    if (!clone.students) {
      clone.students = [
        {
          studentName: clone.studentName,
          studentGrade: clone.studentGrade,
          books: clone.books,
          subtotal: clone.total
        }
      ];
    }
    state.admin.editingRes = clone;
    state.admin.selectedResId = null; // Cerrar vista detalles
    render();
  }
};

window.closeEditReservation = function() {
  const resId = state.admin.editingRes ? state.admin.editingRes.id : null;
  state.admin.editingRes = null;
  if (resId) {
    state.admin.selectedResId = resId; // Volver a vista detalles
  }
  render();
};

window.handleEditResStudentNameChange = function(studentIdx, e) {
  state.admin.editingRes.students[studentIdx].studentName = e.target.value;
};

window.handleEditResStudentGradeChange = function(studentIdx, e) {
  const newGrade = e.target.value;
  const student = state.admin.editingRes.students[studentIdx];
  student.studentGrade = newGrade;
  
  // Recargar libros por defecto
  const books = DB.getBooks();
  const gradeBooks = books.filter(b => b.grade === newGrade && !b.notSoldInSchool);
  student.books = gradeBooks.map(b => b.id);
  render();
};

window.toggleEditResStudentBook = function(studentIdx, bookId) {
  const student = state.admin.editingRes.students[studentIdx];
  const index = student.books.indexOf(bookId);
  if (index > -1) {
    student.books.splice(index, 1);
  } else {
    student.books.push(bookId);
  }
  render();
};

window.addEditResStudent = function() {
  state.admin.editingRes.students.push({
    studentName: "",
    studentGrade: "1º Primaria",
    books: []
  });
  const books = DB.getBooks();
  const gradeBooks = books.filter(b => b.grade === "1º Primaria" && !b.notSoldInSchool);
  state.admin.editingRes.students[state.admin.editingRes.students.length - 1].books = gradeBooks.map(b => b.id);
  render();
};

window.removeEditResStudent = function(studentIdx) {
  if (state.admin.editingRes.students.length > 1) {
    state.admin.editingRes.students.splice(studentIdx, 1);
    render();
  }
};

window.sendPickupNotification = function(resId) {
  const reservations = DB.getReservations();
  const r = reservations.find(item => item.id === resId);
  if (r) {
    r.status = "Preparado";
    DB.saveReservations(reservations);
    
    // Registrar email virtual en simulador
    const settings = DB.getSettings();
    const emailSubject = "Libros listos para recoger - " + settings.schoolName;
    const emailBody = `Estimado/a ${r.parentName || ''},\n\nNos complace informarle de que el lote de libros reservados para ${r.studentName || ''} ya está preparado.\n\nPuede pasar a recogerlo por la secretaría del centro en horario de 9:00 a 14:00.\n\nAtentamente,\nAdministración del Colegio San Buenaventura`;
    
    sendSimulatedEmail(r.parentEmail || '', emailSubject, emailBody);
    
    alert(`Se ha cambiado el estado del pedido a "Preparado" y se ha enviado un email de aviso a ${r.parentEmail}.`);
    render();
  }
};

window.saveEditRes = function(e) {
  e.preventDefault();
  const editRes = state.admin.editingRes;
  const reservations = DB.getReservations();
  const index = reservations.findIndex(r => r.id === editRes.id);
  
  if (index > -1) {
    editRes.parentName = document.getElementById("edit-res-parentName").value.trim();
    editRes.parentEmail = document.getElementById("edit-res-parentEmail").value.trim();
    editRes.parentPhone = document.getElementById("edit-res-parentPhone").value.trim();
    
    // Obtener nombres de alumnos actualizados
    editRes.students.forEach((s, idx) => {
      const input = document.getElementById(`edit-res-studentName-${idx}`);
      if (input) {
        s.studentName = input.value.trim();
      }
    });

    const books = DB.getBooks();
    
    // Calcular subtotales
    editRes.students.forEach(s => {
      const studentBooks = books.filter(b => s.books.includes(b.id));
      s.subtotal = studentBooks.reduce((sum, b) => sum + b.price, 0);
    });
    
    // Calcular gran total
    const total = editRes.students.reduce((sum, s) => sum + s.subtotal, 0);
    editRes.total = total;
    
    // Concatenar campos
    editRes.studentName = editRes.students.map(s => s.studentName).join(", ");
    editRes.studentGrade = [...new Set(editRes.students.map(s => s.studentGrade))].join(", ");
    
    const allBookIds = [];
    editRes.students.forEach(s => allBookIds.push(...s.books));
    editRes.books = allBookIds;
    
    reservations[index] = editRes;
    DB.saveReservations(reservations);
  }
  
  state.admin.editingRes = null;
  state.admin.selectedResId = editRes.id;
  render();
};


// Pestaña Admin 4: Ajustes
function renderAdminSettings() {
  const settings = DB.getSettings();
  return `
    <div class="admin-section-header">
      <h2>Ajustes del Colegio</h2>
      <p>Configure los datos de contacto y el plazo límite para el portal de familias</p>
    </div>

    <div class="settings-card card-shadow">
      <form onsubmit="handleSettingsSave(event)">
        <div class="form-group">
          <label for="schoolName">Nombre de la Institución *</label>
          <input type="text" id="schoolName" required value="${settings.schoolName}">
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for="schoolYear">Curso Escolar (Etiqueta) *</label>
            <input type="text" id="schoolYear" required value="${settings.schoolYear}" placeholder="Ej. 2026/2027">
          </div>
          <div class="form-group col-6">
            <label for="deadlineDate">Fecha Plazo de Reserva *</label>
            <input type="date" id="deadlineDate" required value="${settings.deadlineDate}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for="contactEmail">Correo de Contacto *</label>
            <input type="email" id="contactEmail" required value="${settings.contactEmail}">
          </div>
          <div class="form-group col-6">
            <label for="contactPhone">Teléfono de Contacto *</label>
            <input type="text" id="contactPhone" required value="${settings.contactPhone}">
          </div>
        </div>

        <div class="form-group">
          <label for="customReceiptMessage">Instrucciones del Recibo de Solicitud</label>
          <textarea id="customReceiptMessage" rows="4">${settings.customReceiptMessage}</textarea>
          <p class="field-help">Este mensaje se mostrará al finalizar la solicitud y en la hoja de impresión para informar a los padres.</p>
        </div>

        <div class="settings-actions">
          <button type="submit" class="btn btn-primary">
            Guardar Configuración
          </button>
          <span id="settings-save-success" class="settings-success-indicator hide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align:middle; margin-right:4px;">
              <polyline points="20 6 9 17 4 12"/>
            </svg>Guardado correctamente
          </span>
        </div>
      </form>
    </div>
  `;
}

window.handleSettingsSave = function(e) {
  e.preventDefault();
  if (state.adminRole === "lotes") {
    alert("Acceso denegado: El personal de lotes no puede cambiar la configuración.");
    return;
  }
  const settings = {
    schoolName: document.getElementById("schoolName").value.trim(),
    schoolYear: document.getElementById("schoolYear").value.trim(),
    deadlineDate: document.getElementById("deadlineDate").value,
    contactEmail: document.getElementById("contactEmail").value.trim(),
    contactPhone: document.getElementById("contactPhone").value.trim(),
    customReceiptMessage: document.getElementById("customReceiptMessage").value.trim()
  };

  DB.saveSettings(settings);
  
  const successIndicator = document.getElementById("settings-save-success");
  if (successIndicator) {
    successIndicator.classList.remove("hide");
    setTimeout(() => {
      successIndicator.classList.add("hide");
    }, 2500);
  }
  
  // Re-render para actualizar el header
  render();
};

// Pestaña Admin: Comunicaciones y envío virtual (Simulador)
function renderAdminComms() {
  const emails = DB.getEmails();
  const reservations = DB.getReservations();
  const admin = state.admin;

  return `
    <div class="admin-section-header">
      <h2>Simulador de Comunicaciones</h2>
      <p>Redacte correos electrónicos y simule el envío a las familias del centro</p>
    </div>

    <div class="comms-grid">
      <!-- Columna Izquierda: Redacción -->
      <div class="comms-editor-card card-shadow">
        <h3>Redactar Nuevo Comunicado</h3>
        <form onsubmit="handleSendComms(event)">
          <div class="form-group">
            <label for="commsTemplate">Plantilla Predefinida</label>
            <select id="commsTemplate" onchange="handleCommsTemplateChange(event)">
              <option value="confirmacion" ${admin.commsTemplate === 'confirmacion' ? 'selected' : ''}>Confirmación de Pedido</option>
              <option value="recogida" ${admin.commsTemplate === 'recogida' ? 'selected' : ''}>Aviso de Recogida (Listo)</option>
              <option value="plazo" ${admin.commsTemplate === 'plazo' ? 'selected' : ''}>Aviso Plazo Límite</option>
            </select>
          </div>

          <div class="form-group">
            <label for="commsTarget">Destinatarios (Tutor Legal)</label>
            <select id="commsTarget" onchange="state.admin.commsTarget = this.value; render();">
              <option value="all" ${admin.commsTarget === 'all' ? 'selected' : ''}>Todos los Tutores (${reservations.length})</option>
              <option value="pending" ${admin.commsTarget === 'pending' ? 'selected' : ''}>Tutores con Pedidos "Pendientes" (${reservations.filter(r => r.status === 'Pendiente').length})</option>
              <option value="prepared" ${admin.commsTarget === 'prepared' ? 'selected' : ''}>Tutores con Pedidos "Preparados" (${reservations.filter(r => r.status === 'Preparado').length})</option>
              <optgroup label="Pedido Individual">
                ${reservations.map(r => `<option value="${r.id}" ${admin.commsTarget === r.id ? 'selected' : ''}>${r.id} - ${r.parentName || ''} (${(r.studentName || '').substring(0, 20)}...)</option>`).join('')}
              </optgroup>
            </select>
          </div>

          <div class="form-group">
            <label for="commsSubject">Asunto del Correo *</label>
            <input type="text" id="commsSubject" required value="${admin.commsSubject || ''}" oninput="state.admin.commsSubject = this.value">
          </div>

          <div class="form-group">
            <label for="commsBody">Cuerpo del Mensaje *</label>
            <textarea id="commsBody" rows="8" required oninput="state.admin.commsBody = this.value" style="font-family: var(--font-body); font-size: 13px; line-height: 1.5; width:100%;">${admin.commsBody || ''}</textarea>
            <p class="field-help" style="margin-top: 4px;">
              Puedes usar variables dinámicas que se sustituirán al enviar:<br>
              <code>{tutor}</code>, <code>{alumno(s)}</code>, <code>{curso(s)}</code>, <code>{total}</code>.
            </p>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; gap:8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Simular Envío Masivo / Individual
          </button>
        </form>
      </div>

      <!-- Columna Derecha: Historial de envíos -->
      <div class="comms-history-card card-shadow">
        <h3>Bandeja de Salida Virtual (Historial)</h3>
        
        <div class="email-history-list">
          ${emails.length === 0 ? `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="margin-bottom: 12px; opacity: 0.5;">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p style="font-size: 13px;">No se ha enviado ningún correo virtual todavía.</p>
            </div>
          ` : emails.map(email => `
            <div class="email-history-item" style="padding: 12px; margin-bottom: 10px; border: 1px solid var(--border); border-radius: var(--radius-sm); background-color: var(--bg-card);">
              <div class="email-item-header" style="display: flex; justify-content: space-between; font-size: 12px;">
                <span>Para: <strong>${email.to}</strong></span>
                <span class="badge-email-sent" style="background-color: #d1fae5; color: #059669; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;">Enviado</span>
              </div>
              <div class="email-item-header" style="margin-top: 2px; font-size: 11px; color: var(--text-muted);">
                <span>${new Date(email.sentAt).toLocaleString("es-ES")}</span>
              </div>
              <div class="email-item-subject" style="margin-top: 6px; font-weight: 600; font-size: 13px; color: var(--text);">${email.subject}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-top: 4px; border-top: 1px solid var(--border); padding-top: 6px; margin-bottom: 8px;">
                ${email.body}
              </div>
              <div style="text-align: right;">
                <button type="button" class="btn btn-outline btn-sm" onclick="showEmailDetails('${email.id}')">Ver Detalle</button>
              </div>
            </div>
          `).reverse().join('')}
        </div>
      </div>
    </div>
  `;
}

window.handleCommsTemplateChange = function(e) {
  const template = e.target.value;
  state.admin.commsTemplate = template;
  const settings = DB.getSettings();
  
  if (template === "confirmacion") {
    state.admin.commsSubject = "Confirmación de Reserva de Libros - " + settings.schoolName;
    state.admin.commsBody = `Estimado/a {tutor},\n\nLe confirmamos que hemos recibido correctamente la reserva de libros para {alumno(s)} ({curso(s)}).\n\nEl importe total de {total} € se cargará en su recibo escolar del mes de Septiembre. No tiene que realizar ningún pago ahora.\n\nPor favor, no conteste a este mail. Si necesita realizar cualquier trámite debe dirigirse a administracion@sanbuenaventura.org.\n\nUn cordial saludo,\nAdministración del Colegio San Buenaventura`;
  } else if (template === "recogida") {
    state.admin.commsSubject = "Libros listos para recoger - " + settings.schoolName;
    state.admin.commsBody = `Estimado/a {tutor},\n\nNos complace informarle de que el lote de libros reservados para {alumno(s)} ya está preparado.\n\nPuede pasar a recogerlo por la secretaría del centro en horario de 9:00 a 14:00.\n\nAtentamente,\nAdministración del Colegio San Buenaventura`;
  } else if (template === "plazo") {
    state.admin.commsSubject = "Recordatorio: Plazo de Reserva de Libros - " + settings.schoolName;
    state.admin.commsBody = `Estimadas familias,\n\nLes recordamos que el plazo límite para realizar la reserva de libros de texto para el curso 2026/2027 finaliza el próximo ${new Date(settings.deadlineDate).toLocaleDateString("es-ES")}.\n\nPor favor, realicen su solicitud a la mayor brevedad a través del portal oficial.\n\nUn saludo,\nAdministración del Colegio San Buenaventura`;
  }
  
  render();
};

window.handleSendComms = function(e) {
  e.preventDefault();
  
  // Obtener valores directamente del DOM para máxima robustez
  const subjectEl = document.getElementById("commsSubject");
  const bodyEl = document.getElementById("commsBody");
  const targetEl = document.getElementById("commsTarget");
  
  const subject = subjectEl ? subjectEl.value.trim() : "";
  const body = bodyEl ? bodyEl.value.trim() : "";
  const target = targetEl ? targetEl.value : "all";
  
  // Sincronizar estado
  state.admin.commsSubject = subject;
  state.admin.commsBody = body;
  state.admin.commsTarget = target;
  
  const reservations = DB.getReservations();
  let recipients = [];
  
  if (target === "all") {
    recipients = reservations;
  } else if (target === "pending") {
    recipients = reservations.filter(r => r.status === "Pendiente");
  } else if (target === "prepared") {
    recipients = reservations.filter(r => r.status === "Preparado");
  } else {
    const single = reservations.find(r => r.id === target);
    if (single) recipients = [single];
  }
  
  if (recipients.length === 0) {
    alert("No se encontraron tutores destinatarios para el envío.");
    return;
  }
  
  recipients.forEach(r => {
    let customizedBody = body
      .replace(/{tutor}/g, r.parentName || "")
      .replace(/{alumno\(s\)}/g, r.studentName || "")
      .replace(/{curso\(s\)}/g, r.studentGrade || "")
      .replace(/{total}/g, (typeof r.total === 'number' && !isNaN(r.total)) ? r.total.toFixed(2) : parseFloat(r.total || 0).toFixed(2));
      
    sendSimulatedEmail(r.parentEmail || "", subject, customizedBody);
  });
  
  alert(`¡Simulación completada! Se han enviado ${recipients.length} correo(s) virtual(es).`);
  render();
};

window.showEmailDetails = function(id) {
  state.admin.selectedEmailId = id;
  render();
};

window.closeEmailDetails = function() {
  state.admin.selectedEmailId = null;
  render();
};

window.resendSimulatedEmail = function(id) {
  const emails = DB.getEmails();
  const email = emails.find(e => e.id === id);
  if (email) {
    const newEmail = {
      id: `EMAIL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      to: email.to,
      subject: email.subject.startsWith("[REENVÍO]") ? email.subject : `[REENVÍO] ${email.subject}`,
      body: email.body,
      sentAt: new Date().toISOString()
    };
    emails.push(newEmail);
    DB.saveEmails(emails);
    alert(`Correo reenviado con éxito a ${email.to}`);
    state.admin.selectedEmailId = null;
    render();
  } else {
    alert("No se encontró el correo a reenviar.");
  }
};

// Modales de Administración (Detalles y Alta/Edición Libro)
function renderAdminModals() {
  let modalContent = "";

  // 1. Modal detalles de reserva
  if (state.admin.selectedResId) {
    const reservations = DB.getReservations();
    const books = DB.getBooks();
    const r = reservations.find(item => item.id === state.admin.selectedResId);

    if (r) {
      const students = r.students || [{
        studentName: r.studentName,
        studentGrade: r.studentGrade,
        books: r.books,
        subtotal: r.total
      }];

      let studentsBooksHtml = "";
      students.forEach((student, idx) => {
        const studentBooks = books.filter(b => student.books.includes(b.id));
        studentsBooksHtml += `
          <div style="margin-bottom:14px; border-bottom: 1px dashed var(--border); padding-bottom:10px;">
            <h5 style="color:var(--primary); font-size:13px; margin-bottom:6px;">
              Alumno #${idx + 1}: <strong>${student.studentName}</strong> <span class="badge badge-outline" style="margin-left:6px;">${student.studentGrade}</span>
            </h5>
            ${studentBooks.length === 0 ? `
              <p style="font-size:12px; color:var(--text-muted); padding-left:12px;">No tiene libros reservados.</p>
            ` : studentBooks.map(b => `
              <div class="modal-book-item" style="padding-left:12px; margin-bottom:4px;">
                <div>
                  <strong>[${b.subject}]</strong> ${b.title}
                  <small style="display:block; color:#64748b;">Editorial: ${b.publisher}</small>
                </div>
                <strong>${b.price.toFixed(2)} €</strong>
              </div>
            `).join('')}
            <div style="text-align:right; font-size:12px; color:var(--text-muted); font-weight:600; margin-top:6px;">
              Subtotal Alumno: ${student.subtotal.toFixed(2)} €
            </div>
          </div>
        `;
      });

      modalContent = `
        <div class="modal-overlay" onclick="closeReservationDetails()">
          <div class="modal-card card-shadow" onclick="event.stopPropagation()" style="max-width: 600px;">
            <div class="modal-header">
              <h3>Detalles de la Reserva ${r.id}</h3>
              <button class="btn-close-modal" onclick="closeReservationDetails()">&times;</button>
            </div>
            <div class="modal-body" style="max-height: 65vh; overflow-y: auto;">
              <div class="modal-details-grid">
                <div>
                  <h4 class="modal-subheading">Información de los Alumnos</h4>
                  <p><strong>Nº Alumnos:</strong> ${students.length}</p>
                  <p><strong>Cursos:</strong> ${r.studentGrade}</p>
                </div>
                <div>
                  <h4 class="modal-subheading">Datos del Tutor</h4>
                  <p><strong>Nombre:</strong> ${r.parentName}</p>
                  <p><strong>Email:</strong> <a href="mailto:${r.parentEmail}">${r.parentEmail}</a></p>
                  <p><strong>Teléfono:</strong> <a href="tel:${r.parentPhone}">${r.parentPhone}</a></p>
                </div>
              </div>

              <h4 class="modal-subheading" style="margin-top:16px;">Libros Reservados</h4>
              <div class="modal-books-list" style="padding:14px;">
                ${studentsBooksHtml}
                <div class="modal-total-line" style="margin-top: 10px;">
                  <span>Importe total reservado:</span>
                  <strong>${r.total.toFixed(2)} €</strong>
                </div>
              </div>

              <div class="status-change-area">
                <h4 class="modal-subheading">Estado del Pedido</h4>
                <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
                  <button class="btn btn-status btn-status-pendiente ${r.status === 'Pendiente' ? 'active' : ''}" onclick="changeReservationStatus('${r.id}', 'Pendiente')">Pendiente</button>
                  <button class="btn btn-status btn-status-confirmado ${r.status === 'Confirmado' ? 'active' : ''}" onclick="changeReservationStatus('${r.id}', 'Confirmado')">Confirmado</button>
                  <button class="btn btn-status btn-status-preparado ${r.status === 'Preparado' ? 'active' : ''}" onclick="changeReservationStatus('${r.id}', 'Preparado')">Preparado</button>
                  <button class="btn btn-status btn-status-entregado ${r.status === 'Entregado' ? 'active' : ''}" onclick="changeReservationStatus('${r.id}', 'Entregado')">Entregado</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              ${state.adminRole === 'lotes' ? '' : `<button class="btn btn-primary" style="background-color: var(--accent); margin-right: 8px;" onclick="openEditReservation('${r.id}')">Editar Pedido</button>`}
              
              ${r.status === 'Pendiente' || r.status === 'Confirmado' ? `
                <button class="btn btn-success" style="margin-right: auto;" onclick="sendPickupNotification('${r.id}')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="margin-right:6px; vertical-align:middle;">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Avisar Recogida
                </button>
              ` : `<div style="margin-right: auto;"></div>`}

              <button class="btn btn-outline" onclick="closeReservationDetails()">Cerrar</button>
              <button class="btn btn-primary" onclick="window.print()">Imprimir Ficha</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 2. Modal agregar/editar libro
  if (state.admin.editingBook) {
    const book = state.admin.editingBook;
    const isNew = book.id === "";

    modalContent += `
      <div class="modal-overlay" onclick="closeBookModal()">
        <div class="modal-card card-shadow" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h3>${isNew ? 'Registrar Nuevo Libro' : 'Editar Datos del Libro'}</h3>
            <button class="btn-close-modal" onclick="closeBookModal()">&times;</button>
          </div>
          <form onsubmit="saveBook(event)">
            <input type="hidden" id="edit-book-id" value="${book.id}">
            <div class="modal-body">
              <div class="form-group">
                <label for="edit-book-title">Título del Libro *</label>
                <input type="text" id="edit-book-title" required value="${book.title}" placeholder="Ej. Lengua Castellana 1º ESO">
              </div>

              <div class="form-row">
                <div class="form-group col-6">
                  <label for="edit-book-subject">Asignatura *</label>
                  <input type="text" id="edit-book-subject" required value="${book.subject}" placeholder="Ej. Lengua, Matemáticas, Inglés">
                </div>
                <div class="form-group col-6">
                  <label for="edit-book-publisher">Editorial *</label>
                  <input type="text" id="edit-book-publisher" required value="${book.publisher}" placeholder="Ej. Santillana, SM, Anaya">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-6">
                  <label for="edit-book-grade">Curso escolar *</label>
                  <select id="edit-book-grade">
                    ${COURSES.map(c => `<option value="${c}" ${book.grade === c ? 'selected' : ''}>${c}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group col-6">
                  <label for="edit-book-price">Precio CSB (en el cole) (€) *</label>
                  <input type="number" id="edit-book-price" required step="0.01" min="0" value="${book.price || 0}">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-12">
                  <label for="edit-book-retail-price">Precio fuera del colegio (con IVA) (€) <small style="color:var(--text-muted); font-weight:normal;">(Opcional)</small></label>
                  <input type="number" id="edit-book-retail-price" step="0.01" min="0" value="${book.retailPrice !== undefined && book.retailPrice !== null ? book.retailPrice : ''}" placeholder="Ej. 36.80">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-12" style="display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" id="edit-book-not-sold" ${book.notSoldInSchool ? 'checked' : ''} style="width:auto; margin-bottom:0;">
                  <label for="edit-book-not-sold" style="margin-bottom:0; font-weight:normal; cursor:pointer;">Este libro no se vende en el colegio (informativo, sin opción de compra)</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="closeBookModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar Libro</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // 3. Modal editar reserva (pedido con soporte para hermanos)
  if (state.admin.editingRes) {
    const res = state.admin.editingRes;
    const books = DB.getBooks();
    
    // Calcular gran total
    let grandTotal = 0;
    const studentsHtml = res.students.map((student, studentIdx) => {
      const gradeBooks = books.filter(b => b.grade === student.studentGrade);
      const subtotal = gradeBooks
        .filter(b => student.books.includes(b.id))
        .reduce((sum, b) => sum + b.price, 0);
      grandTotal += subtotal;

      return `
        <div class="student-entry-block" style="padding:16px; margin-bottom:12px;">
          <div class="student-block-header">
            <h4>Datos Alumno #${studentIdx + 1}</h4>
            ${res.students.length > 1 ? `
              <button type="button" class="btn-delete-student" onclick="removeEditResStudent(${studentIdx})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Eliminar Alumno
              </button>
            ` : ''}
          </div>
          
          <div class="form-row">
            <div class="form-group col-6">
              <label for="edit-res-studentName-${studentIdx}">Nombre del Alumno *</label>
              <input type="text" id="edit-res-studentName-${studentIdx}" required value="${student.studentName}" oninput="handleEditResStudentNameChange(${studentIdx}, event)">
            </div>
            <div class="form-group col-6">
              <label for="edit-res-studentGrade-${studentIdx}">Curso Escolar *</label>
              <select id="edit-res-studentGrade-${studentIdx}" onchange="handleEditResStudentGradeChange(${studentIdx}, event)">
                ${COURSES.map(c => `<option value="${c}" ${student.studentGrade === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          </div>

          <label style="margin-top:8px;">Libros Reservados</label>
          <div class="modal-books-list" style="max-height: 150px; overflow-y: auto; padding: 6px 12px; background-color:#fff;">
            ${gradeBooks.length === 0 
              ? `<p class="no-books-msg" style="padding:6px; font-size:12px;">No hay libros registrados para este curso.</p>`
              : gradeBooks.map(b => {
                  const isChecked = student.books.includes(b.id);
                  return `
                    <label class="checkbox-label" style="display:flex; align-items:center; justify-content:space-between; padding: 4px 0; border-bottom: 1px dashed var(--border); font-weight: normal; font-size:12px; cursor:pointer;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleEditResStudentBook(${studentIdx}, '${b.id}')">
                        <span><strong>[${b.subject}]</strong> ${b.title}</span>
                      </div>
                      <strong>${b.price.toFixed(2)} €</strong>
                    </label>
                  `;
                }).join('')
            }
          </div>
          <div style="text-align:right; font-size:12px; color:var(--text-muted); font-weight:600; margin-top:4px;">
            Subtotal: ${subtotal.toFixed(2)} €
          </div>
        </div>
      `;
    }).join('');

    modalContent += `
      <div class="modal-overlay" onclick="closeEditReservation()">
        <div class="modal-card card-shadow" onclick="event.stopPropagation()" style="max-width: 650px;">
          <div class="modal-header">
            <h3>Editar Pedido ${res.id}</h3>
            <button class="btn-close-modal" onclick="closeEditReservation()">&times;</button>
          </div>
          <form onsubmit="saveEditRes(event)">
            <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
              
              <h4 class="modal-subheading">Datos del Familiar / Tutor</h4>
              <div class="form-group">
                <label for="edit-res-parentName">Nombre del Tutor *</label>
                <input type="text" id="edit-res-parentName" required value="${res.parentName}">
              </div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="edit-res-parentEmail">Email *</label>
                  <input type="email" id="edit-res-parentEmail" required value="${res.parentEmail}">
                </div>
                <div class="form-group col-6">
                  <label for="edit-res-parentPhone">Teléfono *</label>
                  <input type="tel" id="edit-res-parentPhone" required value="${res.parentPhone}">
                </div>
              </div>

              <h4 class="modal-subheading" style="margin-top: 16px;">Alumnos / Hermanos en la Reserva</h4>
              <div class="edit-res-students-container">
                ${studentsHtml}
              </div>

              <button type="button" class="btn btn-outline" style="border-style:dashed; width:100%; margin-top:4px; margin-bottom:12px;" onclick="addEditResStudent()">
                + Añadir Alumno / Hermano
              </button>

              <div class="modal-total-line" style="margin-top:16px;">
                <span>Total Estimado Familiar:</span>
                <strong style="font-size:16px; color:var(--primary-light);">${grandTotal.toFixed(2)} €</strong>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="closeEditReservation()">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // 4. Modal de detalles de correo virtual
  if (state.admin.selectedEmailId) {
    const emails = DB.getEmails();
    const email = emails.find(e => e.id === state.admin.selectedEmailId);
    if (email) {
      modalContent += `
        <div class="modal-overlay" onclick="closeEmailDetails()">
          <div class="modal-card card-shadow" onclick="event.stopPropagation()" style="max-width: 600px;">
            <div class="modal-header">
              <h3>Detalles del Correo Virtual</h3>
              <button class="btn-close-modal" onclick="closeEmailDetails()">&times;</button>
            </div>
            <div class="modal-body" style="max-height: 65vh; overflow-y: auto;">
              <div style="font-size: 13px; line-height: 1.6; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 12px;">
                <p style="margin: 4px 0;"><strong>Fecha de Envío:</strong> ${new Date(email.sentAt).toLocaleString("es-ES")}</p>
                <p style="margin: 4px 0;"><strong>Remitente (Email):</strong> ${email.to === "administracion@sanbuenaventura.org" ? "Tutor (Familia)" : "libros@sanbuenaventura.org"}</p>
                <p style="margin: 4px 0;"><strong>Destinatario (Email):</strong> <a href="mailto:${email.to}">${email.to}</a></p>
                <p style="margin: 4px 0;"><strong>Asunto:</strong> ${email.subject}</p>
              </div>
              <h4 class="modal-subheading" style="margin-top: 12px; margin-bottom: 8px; font-size: 13px;">Cuerpo del Mensaje</h4>
              <div style="background-color: var(--bg-body); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border); white-space: pre-wrap; font-family: var(--font-body); font-size: 12px; line-height: 1.5; color: var(--text);">
                ${email.body}
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 8px;">
              <button class="btn btn-outline" onclick="closeEmailDetails()">Cerrar</button>
              <button class="btn btn-success" onclick="resendSimulatedEmail('${email.id}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="margin-right:6px; vertical-align:middle;">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Reenviar Correo
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  return modalContent;
}

// ==========================================
// RENDERIZADOR GENERAL DE INTERFAZ
// ==========================================
function render() {
  const root = document.getElementById("app-root");
  if (!root) return;

  const headerHtml = renderHeader();
  const footerHtml = renderFooter();
  let mainHtml = "";

  if (state.view === "families") {
    mainHtml = renderFamiliesPortal();
  } else if (state.view === "admin") {
    mainHtml = renderAdminPortal();
  }

  root.innerHTML = `
    <div class="app-layout-wrapper">
      ${headerHtml}
      ${mainHtml}
      ${footerHtml}
    </div>
  `;

  if (state.view === "admin" && state.adminTab === "dashboard") {
    setTimeout(() => {
      if (typeof initInteractiveCharts === "function") {
        initInteractiveCharts();
      }
    }, 0);
  }
}

// ==========================================
// FUNCIONES DEL PORTAL DE AUTOCONSULTA
// ==========================================
window.renderLookupTab = function() {
  const form = state.lookupForm;
  if (!form.searchResult) {
    return `
      <section class="wizard-container" style="max-width: 500px; margin: 0 auto;">
        <div class="wizard-card card-shadow" style="padding: 24px;">
          <h3 style="font-family: var(--font-title); color: var(--primary); font-size: 18px; margin-bottom: 8px; text-align: center;">Consultar Estado de Reserva</h3>
          <p style="font-size: 13px; color: var(--text-muted); text-align: center; margin-bottom: 20px;">
            Introduzca los datos de su reserva para comprobar el estado de preparación de sus libros.
          </p>

          <form onsubmit="handleLookupSubmit(event)">
            <div class="form-group">
              <label for="lookupResId">Código de Reserva *</label>
              <input type="text" id="lookupResId" required placeholder="Ej. RES-2026-001" value="${form.resId}" style="width: 100%;" oninput="state.lookupForm.resId = this.value.toUpperCase()">
            </div>

            <div class="form-group">
              <label for="lookupEmail">Correo electrónico del Tutor *</label>
              <input type="email" id="lookupEmail" required placeholder="Ej. tutor@correo.com" value="${form.email}" style="width: 100%;" oninput="state.lookupForm.email = this.value">
            </div>

            ${form.errorMsg ? `<p style="color:var(--danger); font-size: 13px; font-weight:600; margin-bottom: 16px; text-align:center;">${form.errorMsg}</p>` : ''}

            <button type="submit" class="btn btn-primary" style="width: 100%; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Buscar Reserva
            </button>
          </form>
        </div>
      </section>
    `;
  }

  const res = form.searchResult;
  const settings = DB.getSettings();
  let statusVal = 1;
  let progressWidth = "0%";
  
  if (res.status === "Pendiente") {
    statusVal = 1;
    progressWidth = "0%";
  } else if (res.status === "Confirmado") {
    statusVal = 2;
    progressWidth = "33%";
  } else if (res.status === "Preparado") {
    statusVal = 3;
    progressWidth = "66%";
  } else if (res.status === "Entregado") {
    statusVal = 4;
    progressWidth = "100%";
  }

  const studentsDetails = res.students || [{
    studentName: res.studentName,
    studentGrade: res.studentGrade,
    subtotal: res.total,
    books: res.books
  }];

  return `
    <section class="wizard-container" style="max-width: 650px; margin: 0 auto;">
      <div class="wizard-card card-shadow" style="padding: 28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; border-bottom:1px solid var(--border); padding-bottom:12px;">
          <h3 style="font-family: var(--font-title); color: var(--primary); font-size: 18px; margin: 0;">Estado de la Reserva</h3>
          <button class="btn btn-outline btn-sm" onclick="closeLookupResult()">Volver a Buscar</button>
        </div>

        <div class="receipt-header" style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
          <span>Código: <strong style="color:var(--primary);">${res.id}</strong></span>
          <span class="badge" style="background-color: var(--primary-light); color:#fff;">${res.status}</span>
        </div>

        <!-- Timeline del Estado -->
        <div class="status-timeline">
          <div class="timeline-progress-bar" style="width: ${progressWidth};"></div>
          <div class="timeline-step ${statusVal >= 1 ? (statusVal > 1 ? 'completed' : 'active') : ''}">
            <div class="timeline-node">1</div>
            <div class="timeline-label">Recibido</div>
          </div>
          <div class="timeline-step ${statusVal >= 2 ? (statusVal > 2 ? 'completed' : 'active') : ''}">
            <div class="timeline-node">2</div>
            <div class="timeline-label">Confirmado</div>
          </div>
          <div class="timeline-step ${statusVal >= 3 ? (statusVal > 3 ? 'completed' : 'active') : ''}">
            <div class="timeline-node">3</div>
            <div class="timeline-label">Preparado</div>
          </div>
          <div class="timeline-step ${statusVal >= 4 ? (statusVal > 4 ? 'completed' : 'active') : ''}">
            <div class="timeline-node">4</div>
            <div class="timeline-label">Entregado</div>
          </div>
        </div>

        ${res.status === 'Preparado' ? `
          <div class="receipt-info-alert" style="margin-top: 24px; margin-bottom: 24px; background-color:#ecfdf5; border-color:#10b981; color:#065f46; display:flex; gap:10px; align-items:center; border-radius: var(--radius-sm); border:1px solid #10b981; padding: 14px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <p style="margin:0; font-size:13px; font-weight:600; text-align:left;">
              ¡Tu lote de libros ya está preparado! Puedes pasar a recogerlo por la secretaría del centro en horario de 9:00 a 14:00.
            </p>
          </div>
        ` : ''}

        <!-- Caja del Recibo -->
        <div class="receipt-box" style="margin-top: 20px;">
          <div class="receipt-header">
            <h3>Copia de su Reserva</h3>
            <span class="receipt-id">${res.id}</span>
          </div>
          <div class="receipt-body">
            <p><strong>Tutor:</strong> ${res.parentName}</p>
            <p><strong>Contacto:</strong> ${res.parentEmail} | Tel: ${res.parentPhone}</p>
            <p><strong>Fecha:</strong> ${new Date(res.createdAt).toLocaleString("es-ES")}</p>
            <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--border);">
            
            ${studentsDetails.map((student, idx) => `
              <p style="margin-bottom:4px;">
                <strong>Alumno #${idx + 1}:</strong> ${student.studentName} (${student.studentGrade})<br>
                <small style="color:var(--text-muted);">${student.books.length} libros reservados - Subtotal: ${student.subtotal.toFixed(2)} €</small>
              </p>
            `).join('')}
            
            <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--border);">
            <p class="receipt-total">Importe Total Estimado: ${res.total.toFixed(2)} €</p>
          </div>
        </div>

        <!-- Compartir y PDF -->
        <div style="display:flex; gap:12px; margin-top:24px;" class="success-actions">
          <button class="btn btn-outline" onclick="window.print();" style="flex:1;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px; vertical-align:middle;">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>Guardar PDF / Imprimir
          </button>
          
          <button class="btn btn-success" onclick="shareReservationWhatsApp('${res.id}')" style="flex:1; background-color:#25d366; border-color:#25d366; color:white; gap:8px;">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="vertical-align:middle;">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.164-1.354a9.938 9.938 0 004.846 1.254h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.67-1.04-5.18-2.93-7.071A9.925 9.925 0 0012.012 2zm5.72 14.123c-.313.882-1.815 1.636-2.5 1.7-1.74.16-3.858-.55-5.918-2.613-2.062-2.062-2.772-4.18-2.612-5.92.064-.684.818-2.186 1.7-2.5.38-.135.534-.1.685.22.152.32.748 1.82.812 1.95.064.13.064.28 0 .412-.064.13-.13.25-.216.35-.084.102-.182.203-.264.3-.095.1-.19.21-.085.39.105.18.47 1.213 1.01 1.696.696.62 1.277.81 1.458.892.18.083.284.067.39-.05.105-.12.457-.532.583-.715.127-.183.254-.15.422-.085.168.065 1.066.502 1.25.594.184.092.3.138.344.218.045.08.045.47-.268 1.354z"/>
            </svg>Compartir por WhatsApp
          </button>
        </div>

        <!-- Acordeón de Solicitud de Cambio -->
        <div style="margin-top:28px; border-top:1.5px solid var(--border); padding-top:16px; text-align:center;">
          ${form.changeSent ? `
            <div style="background-color: var(--accent-light); padding:10px; border-radius: var(--radius-sm); border: 1px solid var(--accent); color: var(--accent-hover); font-size:13px; font-weight:600;">
              ✓ Su solicitud de cambio ha sido enviada al personal de administración del centro.
            </div>
          ` : `
            <button class="change-request-btn" onclick="document.getElementById('change-request-box').style.display='block'; this.style.display='none';">
              ¿Desea solicitar un cambio o cancelación de su reserva?
            </button>
            <div id="change-request-box" style="display:none; text-align:left; margin-top:10px; animation: slideUp 0.25s ease-out;">
              <label for="changeRequestMsg" style="font-size:12px; font-weight:600; color:var(--text-muted); margin-bottom:6px;">Detalle los cambios que necesita solicitar *</label>
              <textarea id="changeRequestMsg" rows="3" required style="width:100%; font-family:var(--font-body); font-size:13px; padding:8px; border:1.5px solid var(--border); border-radius:var(--radius-sm); resize:none;" placeholder="Ej. Deseo cancelar el libro de Religión de 1º Primaria de Lucas."></textarea>
              <div style="display:flex; gap:8px; margin-top:10px; justify-content:flex-end;">
                <button class="btn btn-outline btn-sm" onclick="document.getElementById('change-request-box').style.display='none'; document.querySelector('.change-request-btn').style.display='inline-block';">Cancelar</button>
                <button class="btn btn-primary btn-sm" onclick="requestReservationChange()">Enviar Solicitud</button>
              </div>
            </div>
          `}
        </div>
      </div>
    </section>
  `;
};

window.handleLookupSubmit = function(e) {
  e.preventDefault();
  const resId = document.getElementById("lookupResId").value.trim().toUpperCase();
  const email = document.getElementById("lookupEmail").value.trim().toLowerCase();
  
  state.lookupForm.resId = resId;
  state.lookupForm.email = email;
  state.lookupForm.errorMsg = "";
  
  const reservations = DB.getReservations();
  const found = reservations.find(r => r.id === resId && r.parentEmail.trim().toLowerCase() === email);
  
  if (found) {
    state.lookupForm.searchResult = found;
  } else {
    state.lookupForm.searchResult = null;
    state.lookupForm.errorMsg = "No se ha encontrado ninguna reserva activa con ese Código e Email de tutor.";
  }
  render();
};

window.closeLookupResult = function() {
  state.lookupForm.searchResult = null;
  state.lookupForm.changeSent = false;
  render();
};

window.shareReservationWhatsApp = function(id) {
  const res = state.lookupForm.searchResult;
  if (!res) return;
  
  const allNames = res.studentName;
  const statusLabel = res.status === 'Preparado' ? 'LISTO PARA RECOGER' : res.status.toUpperCase();
  const text = `Hola, te comparto los detalles de mi reserva de libros en el Colegio San Buenaventura:\n\n*Código de Reserva:* ${res.id}\n*Estado:* ${statusLabel}\n*Alumnos:* ${allNames}\n*Importe Total:* ${res.total.toFixed(2)} €\n\nConsulta más detalles en el portal oficial del centro.`;
  
  const encodedText = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
};

window.requestReservationChange = function() {
  const res = state.lookupForm.searchResult;
  if (!res) return;
  
  const textarea = document.getElementById("changeRequestMsg");
  if (!textarea || !textarea.value.trim()) {
    alert("Por favor, describa los cambios que solicita.");
    return;
  }
  
  const message = textarea.value.trim();
  
  // Registrar email virtual dirigido a administración
  const emailSubject = `[SOLICITUD DE CAMBIO] Reserva ${res.id} - Tutor: ${res.parentName}`;
  const emailBody = `Se ha recibido una solicitud de modificación o cancelación de reserva a través del portal de autoconsulta:\n\n*Código de Reserva:* ${res.id}\n*Tutor:* ${res.parentName}\n*Contacto:* ${res.parentEmail} | Tel: ${res.parentPhone}\n\n*MENSAJE DE LA FAMILIA:*\n"${message}"\n\n---\nPor favor, tramite esta solicitud editando la reserva en el panel de administración correspondiente.`;
  
  sendSimulatedEmail("administracion@sanbuenaventura.org", emailSubject, emailBody);
  
  state.lookupForm.changeSent = true;
  render();
};

// Inicialización de Gráficos Interactivos con Chart.js
window.initInteractiveCharts = function() {
  if (!window.myCharts) {
    window.myCharts = {};
  }

  // 1. Destruir instancias previas para evitar conflictos de canvas
  if (window.myCharts.chartTrend) {
    window.myCharts.chartTrend.destroy();
    window.myCharts.chartTrend = null;
  }
  if (window.myCharts.chartStatus) {
    window.myCharts.chartStatus.destroy();
    window.myCharts.chartStatus = null;
  }
  if (window.myCharts.chartPublishers) {
    window.myCharts.chartPublishers.destroy();
    window.myCharts.chartPublishers = null;
  }

  const canvasTrend = document.getElementById("chartTrend");
  const canvasStatus = document.getElementById("chartStatus");
  const canvasPublishers = document.getElementById("chartPublishers");

  if (!canvasTrend || !canvasStatus || !canvasPublishers) {
    return;
  }

  // Leer estilos computados del tema activo
  const computedStyle = getComputedStyle(document.body);
  const textColor = computedStyle.getPropertyValue('--text').trim() || '#1e293b';
  const mutedColor = computedStyle.getPropertyValue('--text-muted').trim() || '#64748b';
  const borderColor = computedStyle.getPropertyValue('--border').trim() || '#e2e8f0';
  const fontFamily = computedStyle.getPropertyValue('--font-body').trim() || 'sans-serif';
  const cardBgColor = computedStyle.getPropertyValue('--card-bg').trim() || '#ffffff';

  const reservations = DB.getReservations();
  const books = DB.getBooks();
  const isDark = document.documentElement.getAttribute("data-theme") === 'dark';

  // --- 1. Gráfico de Línea: Evolución Temporal ---
  const trendData = {};
  reservations.forEach(r => {
    if (!r.createdAt) return;
    const dateStr = r.createdAt.substring(0, 10);
    trendData[dateStr] = (trendData[dateStr] || 0) + 1;
  });

  const sortedDates = Object.keys(trendData).sort();
  const labelsTrend = sortedDates.map(d => {
    const [year, month, day] = d.split('-');
    return `${day}/${month}`;
  });
  const valuesTrend = sortedDates.map(d => trendData[d]);

  const finalLabelsTrend = labelsTrend.length ? labelsTrend : ["Sin datos"];
  const finalValuesTrend = valuesTrend.length ? valuesTrend : [0];

  const trendLineColor = isDark ? '#38bdf8' : '#112a46';
  const trendFillColor = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(17, 42, 70, 0.08)';

  window.myCharts.chartTrend = new Chart(canvasTrend, {
    type: 'line',
    data: {
      labels: finalLabelsTrend,
      datasets: [{
        label: 'Reservas',
        data: finalValuesTrend,
        borderColor: trendLineColor,
        backgroundColor: trendFillColor,
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#c59b27',
        pointBorderColor: trendLineColor,
        pointHoverBackgroundColor: trendLineColor,
        pointHoverBorderColor: '#c59b27',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#112a46',
          titleFont: { family: fontFamily, size: 13, weight: 'bold' },
          bodyFont: { family: fontFamily, size: 12 },
          padding: 10,
          cornerRadius: 6,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} ${context.parsed.y === 1 ? 'reserva' : 'reservas'}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: borderColor,
            drawBorder: false
          },
          ticks: {
            color: mutedColor,
            font: { family: fontFamily, size: 11 }
          }
        },
        y: {
          grid: {
            color: borderColor,
            drawBorder: false
          },
          ticks: {
            color: mutedColor,
            font: { family: fontFamily, size: 11 },
            stepSize: 1,
            precision: 0
          },
          min: 0
        }
      }
    }
  });

  // --- 2. Gráfico de Barras Apiladas: Estado de Lotes por Nivel ---
  const levels = ["Infantil", "Primaria", "ESO", "Bachillerato"];
  const statusByLevel = {
    "Infantil": { "Pendiente": 0, "Confirmado": 0, "Preparado": 0, "Entregado": 0 },
    "Primaria": { "Pendiente": 0, "Confirmado": 0, "Preparado": 0, "Entregado": 0 },
    "ESO":      { "Pendiente": 0, "Confirmado": 0, "Preparado": 0, "Entregado": 0 },
    "Bachillerato": { "Pendiente": 0, "Confirmado": 0, "Preparado": 0, "Entregado": 0 }
  };

  function getLevelFromGrade(grade) {
    if (!grade) return null;
    if (grade.includes("Infantil")) return "Infantil";
    if (grade.includes("Primaria")) return "Primaria";
    if (grade.includes("ESO")) return "ESO";
    if (grade.includes("Bachillerato")) return "Bachillerato";
    return null;
  }

  reservations.forEach(r => {
    const status = r.status || "Pendiente";
    const levelsInReservation = new Set();
    
    if (r.students && Array.isArray(r.students) && r.students.length > 0) {
      r.students.forEach(s => {
        const lvl = getLevelFromGrade(s.studentGrade);
        if (lvl) levelsInReservation.add(lvl);
      });
    } else {
      const grades = (r.studentGrade || "").split(", ");
      grades.forEach(g => {
        const lvl = getLevelFromGrade(g);
        if (lvl) levelsInReservation.add(lvl);
      });
    }
    
    levelsInReservation.forEach(lvl => {
      if (statusByLevel[lvl] && statusByLevel[lvl][status] !== undefined) {
        statusByLevel[lvl][status]++;
      }
    });
  });

  const datasetPendiente = levels.map(l => statusByLevel[l]["Pendiente"]);
  const datasetConfirmado = levels.map(l => statusByLevel[l]["Confirmado"]);
  const datasetPreparado = levels.map(l => statusByLevel[l]["Preparado"]);
  const datasetEntregado = levels.map(l => statusByLevel[l]["Entregado"]);

  window.myCharts.chartStatus = new Chart(canvasStatus, {
    type: 'bar',
    data: {
      labels: levels,
      datasets: [
        {
          label: 'Pendiente',
          data: datasetPendiente,
          backgroundColor: '#ef4444',
          borderRadius: 4
        },
        {
          label: 'Confirmado',
          data: datasetConfirmado,
          backgroundColor: isDark ? '#3b82f6' : '#1e3e62',
          borderRadius: 4
        },
        {
          label: 'Preparado',
          data: datasetPreparado,
          backgroundColor: '#c59b27',
          borderRadius: 4
        },
        {
          label: 'Entregado',
          data: datasetEntregado,
          backgroundColor: '#059669',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            font: { family: fontFamily, size: 11 },
            boxWidth: 12
          }
        },
        tooltip: {
          backgroundColor: '#112a46',
          titleFont: { family: fontFamily, size: 13, weight: 'bold' },
          bodyFont: { family: fontFamily, size: 12 },
          padding: 10,
          cornerRadius: 6
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: mutedColor,
            font: { family: fontFamily, size: 11 }
          }
        },
        y: {
          stacked: true,
          grid: {
            color: borderColor,
            drawBorder: false
          },
          ticks: {
            color: mutedColor,
            font: { family: fontFamily, size: 11 },
            stepSize: 1,
            precision: 0
          },
          min: 0
        }
      }
    }
  });

  // --- 3. Gráfico Donut: Distribución de Costes por Editorial ---
  const publisherRevenue = {};
  reservations.forEach(r => {
    if (r.status === "Cancelado") return;
    r.books.forEach(bId => {
      const book = books.find(b => b.id === bId);
      if (book) {
        const pub = book.publisher || "Otros";
        const price = book.price || 0;
        publisherRevenue[pub] = (publisherRevenue[pub] || 0) + price;
      }
    });
  });

  const sortedPubs = Object.entries(publisherRevenue)
    .sort((a, b) => b[1] - a[1]);
  const labelsPublishers = sortedPubs.map(p => p[0]);
  const valuesPublishers = sortedPubs.map(p => p[1]);

  const finalLabelsPubs = labelsPublishers.length ? labelsPublishers : ["Sin datos"];
  const finalValuesPubs = valuesPublishers.length ? valuesPublishers : [0];

  const publisherColors = [
    '#112a46',
    '#c59b27',
    '#059669',
    '#3b82f6',
    '#8b5cf6',
    '#f59e0b',
    '#ec4899',
    '#06b6d4',
    '#64748b'
  ];

  window.myCharts.chartPublishers = new Chart(canvasPublishers, {
    type: 'doughnut',
    data: {
      labels: finalLabelsPubs,
      datasets: [{
        data: finalValuesPubs,
        backgroundColor: publisherColors.slice(0, finalLabelsPubs.length),
        borderWidth: 2,
        borderColor: cardBgColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: textColor,
            font: { family: fontFamily, size: 10 },
            boxWidth: 10,
            padding: 8
          }
        },
        tooltip: {
          backgroundColor: '#112a46',
          titleFont: { family: fontFamily, size: 12, weight: 'bold' },
          bodyFont: { family: fontFamily, size: 12 },
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            label: function(context) {
              const val = context.parsed;
              return ` Importe: ${val.toFixed(2)} €`;
            }
          }
        }
      },
      cutout: '60%'
    }
  });
};

async function syncFromSupabase() {
  if (!supabaseClient) return;
  try {
    // 1. Cargar Ajustes
    const { data: dbSettings } = await supabaseClient.from('settings').select('*').eq('id', 1).maybeSingle();
    if (dbSettings) {
      const mappedSettings = {
        schoolName: dbSettings.school_name,
        schoolYear: dbSettings.school_year,
        deadlineDate: dbSettings.deadline_date,
        contactEmail: dbSettings.contact_email,
        contactPhone: dbSettings.contact_phone,
        customReceiptMessage: dbSettings.custom_receipt_message
      };
      localStorage.setItem("sb_settings", JSON.stringify(mappedSettings));
    }

    // 2. Cargar Libros
    const { data: dbBooks } = await supabaseClient.from('books').select('*');
    if (dbBooks && dbBooks.length > 0) {
      const mappedBooks = dbBooks.map(b => ({
        id: b.id,
        title: b.title,
        subject: b.subject,
        grade: b.grade,
        price: (b.price !== null && b.price !== undefined) ? (typeof b.price === 'number' ? b.price : parseFloat(b.price)) : 0,
        retailPrice: (b.retail_price !== null && b.retail_price !== undefined) ? (typeof b.retail_price === 'number' ? b.retail_price : parseFloat(b.retail_price)) : null,
        publisher: b.publisher,
        required: b.required,
        notSoldInSchool: (b.price === 0 || b.price === 0.0)
      }));
      localStorage.setItem("sb_books", JSON.stringify(mappedBooks));
    }

    // 3. Cargar Reservas
    const { data: dbReservations } = await supabaseClient.from('reservations').select('*');
    if (dbReservations) {
      const mappedReservations = dbReservations.map(r => ({
        id: r.id,
        studentName: r.student_name,
        studentGrade: r.student_grade,
        parentName: r.parent_name,
        parentEmail: r.parent_email,
        parentPhone: r.parent_phone,
        books: r.books,
        students: r.students,
        total: (r.total !== null && r.total !== undefined) ? (typeof r.total === 'number' ? r.total : parseFloat(r.total)) : 0,
        status: r.status,
        createdAt: r.created_at
      }));
      localStorage.setItem("sb_reservations", JSON.stringify(mappedReservations));
    }

    // 4. Cargar Correos
    const { data: dbEmails } = await supabaseClient.from('emails').select('*');
    if (dbEmails) {
      const mappedEmails = dbEmails.map(e => ({
        id: e.id,
        to: e.to_email,
        subject: e.subject,
        body: e.body,
        sentAt: e.sent_at
      }));
      localStorage.setItem("sb_emails", JSON.stringify(mappedEmails));
    }

    // Volver a renderizar la UI con la base de datos fresca de la nube
    render();
  } catch (error) {
    console.error("Error al sincronizar desde Supabase:", error);
  }
}

// Inicializar la App en pantalla
document.addEventListener("DOMContentLoaded", () => {
  render();
  syncFromSupabase();
});
