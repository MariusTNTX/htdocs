/* Títulos */
let depart = document.getElementById("depart");
let jfk = document.getElementById("jfk");
/* Modales */
let modalAltaILibros = document.getElementById("modalAltaILibros");
let modalAltaMLibros = document.getElementById("modalAltaMLibros");
let modalModifLibros = document.getElementById("modalModifLibrosk");
let modalRecogida = document.getElementById("modalRecogida");
let modalDevolucion = document.getElementById("modalDevolucion");
/* Bodys */
let bodyAltaILibros = document.getElementById("bodyAltaILibros");
let altaILibro = document.getElementById("altaILibro");
let bodyModifLibros = document.getElementById("bodyModifLibros");
let buscarModifLibro = document.getElementById("buscarModifLibro");
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

//CERRAR SESIÓN
btnLogout.addEventListener("click",()=>{
  //Preugntar por confirmación
  if(confirm("¿Seguro que deseas cerrar la sesión?")){
    //Eliminar datos de la sesión
    sessionStorage.removeItem("tipoUsuario");
    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("apellidosUsuario");
    sessionStorage.removeItem("dniUsuario");
    sessionStorage.removeItem("nieUsuario");
    sessionStorage.removeItem("departUsuario");
    sessionStorage.removeItem("centroUsuario");
    //Redireccionar al login
    location.href = "index.html";
  }
});

//Botón AltaI Libros
altaILibros.addEventListener("click",()=>{
  //Se incluyen los departamentos en el combo box
  let select = bodyAltaILibros.children[8].firstElementChild;
  console.log(select);
  getDepartamentos('','','','').then(data=>{
    console.log(data)
    for(let dat of data){
      let selected = "";
      if(dat.CODIGO == 0) selected = " selected";
      select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
    }
  });
});

//BOTÓN INSERTAR NUEVO LIBRO
altaILibro.addEventListener("click", (e)=>{
  vacio = false;
  e.preventDefault();
  //Se almacenan los valores del libro
  let valuesL = [];
  for(let i=0; i<bodyAltaILibros.children.length; i++){
    valuesL[i] = bodyAltaILibros.children[i].firstElementChild.value;
    if(valuesL[i]=='') vacio = true;
  }
  /* valuesL[3]=tbodyAltaIProf.querySelector("select").value; */
  console.log(valuesL)
  //Si no hay ningún valor sin indicar
  if(!vacio){
    //Si confirma la actualización
    if(confirm("¿Quieres insertar éste libro?")){
      //Se inserta el libro
      putLibro(valuesL[0],valuesL[1],valuesL[2],valuesL[3],valuesL[4],valuesL[5],valuesL[6],valuesL[7],valuesL[8],valuesL[9]).then(data=>{
        if(data.length>0){
          for(let i=0; i<bodyAltaILibros.children.length; i++){
            if(i<6) bodyAltaILibros.children[i].firstElementChild.value='';
            else bodyAltaILibros.children[i].firstElementChild.selectedIndex=0;
          }
          alert("Libro insertado");
        } else alert("Error al insertar");
      }).catch(error => alert("Los datos indicados del libro no son compatibles con su formato"));
    }
  } else alert("Los campos del libro deben estar llenos");
});

//Botón Modif Libros
modifLibros.addEventListener("click",()=>{
  //Se incluyen los departamentos en el combo box
  let select = bodyModifLibros.children[7].lastElementChild;
  console.log(select);
  getDepartamentos('','','','').then(data=>{
    console.log(data)
    for(let dat of data){
      let selected = "";
      if(dat.CODIGO == 0) selected = " selected";
      select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
    }
  });
});

//BOTÓN BUSCAR LIBRO (MODIF)
buscarModifLibro.addEventListener("click",()=>{
  let isbn = buscarModifLibro.previousElementSibling.value;
  //Si se introduce un DNI
  if(isbn.length>=12 && isbn.length<=16){
    getLibros('','',isbn,'','','','','','','').then(data=>{
      console.log(data);
      //Si se encuentra un resultado
      if(data.length==1){
        //Se incluye la información del alumno en sus campos correspondientes
        bodyModifLibros.children[0].lastElementChild.value = data[0].TITULO;
        bodyModifLibros.children[1].lastElementChild.value = data[0].AUTOR;
        bodyModifLibros.children[2].lastElementChild.value = data[0].MATERIA;
        bodyModifLibros.children[3].lastElementChild.value = data[0].EDITORIAL;
        bodyModifLibros.children[4].lastElementChild.value = data[0].A_EDICION;
        bodyModifLibros.children[5].lastElementChild.value = data[0].SOPORTE_M;
        bodyModifLibros.children[6].lastElementChild.value = data[0].USUARIO;
        bodyModifLibros.children[7].lastElementChild.value = data[0].COD_DPTO;
        bodyModifLibros.children[8].lastElementChild.value = data[0].ESTADO;
      } else alert("No se encontró un libro con el ISBN "+isbn);
    });
  } else alert("Indica un ISBN válido para buscar");
});