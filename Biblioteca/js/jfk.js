/* Títulos */
let depart = document.getElementById("depart");
let jfk = document.getElementById("jfk");
/* Modales */
let modalAltaILibros = document.getElementById("modalAltaILibros");
let modalAltaMLibros = document.getElementById("modalAltaMLibros");
let modalModifLibros = document.getElementById("modalModifLibrosk");
let modalRecogida = document.getElementById("modalRecogida");
let modalDevolucion = document.getElementById("modalDevolucion");
/* Botones */
let btnLogout = document.getElementById("btnLogout");
let altaILibros = document.getElementById("altaILibros");
let altaMLibros = document.getElementById("altaMLibros");
let modifLibros = document.getElementById("modifLibros");
let recogida = document.getElementById("recogida");
let devolucion = document.getElementById("devolucion");

//Si se intenta acceder a administración sin estar logeado se redirige al login
if(!sessionStorage.getItem("tipoUsuario") || sessionStorage.getItem("tipoUsuario")!='jfk') location.href="loginAdmin.html";
else{
  jfk.textContent = sessionStorage.getItem("nombreUsuario")+' '+sessionStorage.getItem("apellidosUsuario");
  depart.textContent = sessionStorage.getItem("departUsuario");
} 