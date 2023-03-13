/* Títulos */
let depart = document.getElementById("depart");
let jfk = document.getElementById("jfk");
/* Modales */
let modalAltaILibros = document.getElementById("modalAltaILibros");
let modalAltaMLibros = document.getElementById("modalAltaMLibros");
let modalModifLibros = document.getElementById("modalModifLibrosk");
let modalRecogida = document.getElementById("modalRecogida");
let modalDevolucion = document.getElementById("modalDevolucion");
/* Bodys y Botones Internos */
let bodyAltaILibros = document.getElementById("bodyAltaILibros");
let altaILibro = document.getElementById("altaILibro");
let bodyModifLibros = document.getElementById("bodyModifLibros");
let buscarModifLibro = document.getElementById("buscarModifLibro");
let modifLibro = document.getElementById("modifLibro");
let borrLibro = document.getElementById("borrLibro");
let tbodyRecog = document.getElementById("tbodyRecog");
let buscarRecog = document.getElementById("buscarRecog");
let buscarDevol = document.getElementById("buscarDevol");
let tbodyDevol = document.getElementById("tbodyDevol");
/* Botones Generales */
let btnLogout = document.getElementById("btnLogout");
let altaILibros = document.getElementById("altaILibros");
let altaMLibros = document.getElementById("altaMLibros");
let modifLibros = document.getElementById("modifLibros");
let recogida = document.getElementById("recogida");
let devolucion = document.getElementById("devolucion");
/* Otros */
let isbn;

//Si se intenta acceder a administración sin estar logeado se redirige al login
if(!sessionStorage.getItem("tipoUsuario") || sessionStorage.getItem("tipoUsuario")!='jfk') location.href="loginAdmin.html";
else{
  jfk.textContent = sessionStorage.getItem("nombreUsuario")+' '+sessionStorage.getItem("apellidosUsuario");
  depart.textContent = sessionStorage.getItem("departUsuario");
} 

//ELIMINAR LAS RESERVAS CADUCADAS DESPUÉS DE UNA SEMANA
deleteReservasCad().then(data=>{
  if(data.length!=1 || data[0]!='Delete Exitoso') alert("Error en el borrado de reservas caducadas");
}).catch(error=>alert("Error al procesar la petición de eliminado de reservas caducadas"));

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
  getDepartamentos('','','','').then(data=>{
    select.innerHTML = "";
    for(let dat of data){
      let selected = "";
      if(dat.CODIGO == sessionStorage.getItem("codDptoUsuario")) selected = " selected";
      select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
    }
  }).catch(error=>alert("Error al procesar la petición de información sobre departamentos"));
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
  select.innerHTML = "";
  getDepartamentos('','','','').then(data=>{
    for(let dat of data){
      let selected = "";
      if(dat.CODIGO == sessionStorage.getItem("codDptoUsuario")) selected = " selected";
      select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
    }
  }).catch(error=>alert("Error al procesar la petición de información sobre departamentos"));
});

//BOTÓN BUSCAR LIBRO (MODIF)
buscarModifLibro.addEventListener("click",()=>{
  bodyModifLibros.children[0].lastElementChild.value = '';
  bodyModifLibros.children[1].lastElementChild.value = '';
  bodyModifLibros.children[2].lastElementChild.value = '';
  bodyModifLibros.children[3].lastElementChild.value = '';
  bodyModifLibros.children[4].lastElementChild.value = '';
  bodyModifLibros.children[5].lastElementChild.value = 'NO';
  bodyModifLibros.children[6].lastElementChild.value = 'ALUMNO';
  bodyModifLibros.children[8].lastElementChild.value = 'BUENO';
  isbn = buscarModifLibro.previousElementSibling.value;
  //Si se introduce un ISBN
  if(isbn.length>=12 && isbn.length<=16){
    getLibros('','',isbn,'','','',sessionStorage.getItem("codDptoUsuario"),'','','').then(data=>{
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
      } else alert("No se encontró un libro con el ISBN "+isbn+" asociado a tu departamento");
    }).catch(error=>alert("Error al procesar la petición de información sobre libros"));
  } else alert("Indica un ISBN válido para buscar");
});

//BOTÓN ACTUALIZAR LIBRO
modifLibro.addEventListener("click", (e)=>{
  vacio = false;
  e.preventDefault();
  //Se almacenan los valores del libro
  let valuesL = [];
  for(let i=0; i<bodyModifLibros.children.length; i++){
    valuesL[i] = bodyModifLibros.children[i].lastElementChild.value;
    if(valuesL[i]=='') vacio = true;
  }
  //Si no hay ningún valor sin indicar
  if(!vacio){
    //Si confirma la actualización
    if(confirm("¿Quieres actualizar estos campos?")){
      //Se actualiza el libro
      updateLibro(isbn,isbn,valuesL[0],valuesL[1],valuesL[2],valuesL[3],valuesL[4],valuesL[5],valuesL[6],valuesL[7],valuesL[8]).then(data=>{
        if(data.length>0) alert("Libro actualizado");
        else alert("Error al actualizar");
      }).catch(error => alert("Los cambios efectuados sobre el registro no son compatibles con su formato"));
    }
  } else alert("Todos los campos deben estar llenos");
});

//BOTÓN BORRAR LIBRO
borrLibro.addEventListener("click", (e)=>{
  e.preventDefault();
  //Si confirma el borrado
  if(confirm("¿Quieres borrar éste libro?")){
    //Se borra el libro
    deleteLibro(isbn,'','','','','','','','','').then(data=>{
      if(data.length>0){
        bodyModifLibros.children[0].lastElementChild.value = '';
        bodyModifLibros.children[1].lastElementChild.value = '';
        bodyModifLibros.children[2].lastElementChild.value = '';
        bodyModifLibros.children[3].lastElementChild.value = '';
        bodyModifLibros.children[4].lastElementChild.value = '';
        bodyModifLibros.children[5].lastElementChild.value = 'NO';
        bodyModifLibros.children[6].lastElementChild.value = 'ALUMNO';
        bodyModifLibros.children[7].lastElementChild.value = '0';
        bodyModifLibros.children[8].lastElementChild.value = 'BUENO';
        alert("Libro borrado");
      } 
      else alert("Error al borrar el libro");
    }).catch(error=>alert("Error al procesar la petición de borrado del libro"));
  }
});

//BOTÓN BUSCAR RESERVA (RECOGIDA)
buscarRecog.addEventListener("click",()=>{
  tbodyRecog.innerHTML="";
  dni = buscarRecog.previousElementSibling.value.toUpperCase();
  //Si se introduce un DNI
  if(dni.length==9){
    getReservas('',dni,sessionStorage.getItem("codDptoUsuario"),'').then(data=>{
      //Si se encuentra al menos un resultado
      if(data.length>0){
        cod='';
        for(let i=0; i<data.length; i++){
          //Se incluye la información del alumno en sus campos correspondientes
          if(data[i].GRUPO==undefined) data[i].GRUPO='';
          let color = (data[i].PENDIENTE=='Si') ? ' class="text-danger fw-bold"' : '';
          tbodyRecog.innerHTML+=`
          <tr class="align-middle">
            <td${color}>${data[i].FECHA_FIN}</td>
            <td>${data[i].COD_LIBRO.substring(0,data[i].COD_LIBRO.length-2)}</td>
            <td class="d-none">${data[i].COD_LIBRO.substr(-1)}</td>
            <td>${data[i].TITULO}</td>
            <td>${data[i].NOMBRE} ${data[i].APELLIDOS}</td>
            <td class="d-none">${data[i].DNI}</td>
            <td>${data[i].GRUPO}</td>
            <td><a href="php/pdfPrestamo.php?nomAlu=${data[i].NOMBRE}&apeAlu=${data[i].APELLIDOS}&codDpto=${data[i].COD_DPTO}&dni=${data[i].DNI}&dep=${data[i].DEPARTAMENTO}&cen=${data[i].CENTRO}&isbn=${data[i].COD_LIBRO}&tit=${data[i].TITULO}" target="_blank"><input type="button" class="btn btn-primary btnGenRecog" value="Generar PDF"></a></td>
            <td><input type="submit" class="btn btn-primary btnForRecog" value="Formalizar"></td>
          </tr>`;
        }
        //BOTONES FORMALIZAR RECOGIDA
        for(let btn of tbodyRecog.querySelectorAll(".btnForRecog")){
          btn.addEventListener("click",(e)=>{
            e.preventDefault();
            if(confirm("¿Deseas efectuar la recogida? La reserva será sustituida definitivamente por su préstamo correspondiente")){
              //Se genera el préstamo
              putPrestamo(btn.parentElement.parentElement.children[1].textContent+'_'+btn.parentElement.parentElement.children[2].textContent,btn.parentElement.parentElement.children[5].textContent).then(data=>{
                if(data.length>0) alert("Préstamo generado con éxito");
                else alert("Error al generar el préstamo");
              });
              //Se elimina la reserva
              deleteReserva(btn.parentElement.parentElement.children[1].textContent+'_'+btn.parentElement.parentElement.children[2].textContent,'').then(data =>{
                if(data[0] && data[0]=='Delete Exitoso'){
                  alert("Reserva eliminada con éxito");
                  tbodyRecog.innerHTML="";
                } else alert("Error al eliminar la reserva");
              }).catch(error=>alert("Error al procesar la petición de borrado de la reserva"));
            }
          });
        }
      } else alert("No se encontraron reservas asociadas al DNI "+dni);
    }).catch(error=>alert("Error al procesar la petición de información sobre reservas"));
  } else alert("Indica un DNI válido para buscar");
});

//BOTÓN BUSCAR PRÉSTAMO (DEVOLUCIÓN)
buscarDevol.addEventListener("click",()=>{
  tbodyDevol.innerHTML="";
  dni = buscarDevol.previousElementSibling.value.toUpperCase();
  //Si se introduce un DNI
  if(dni.length==9){
    getPrestamos('',dni,sessionStorage.getItem("codDptoUsuario"),'','','No').then(data=>{
      //Si se encuentra un resultado
      if(data.length>0){
        cod='';
        for(let i=0; i<data.length; i++){
          //Se incluye la información del alumno en sus campos correspondientes
          if(data[i].GRUPO==undefined) data[i].GRUPO='';
          let color = (data[i].PENDIENTE=='Si') ? ' class="text-danger fw-bold"' : '';
          tbodyDevol.innerHTML+=`
          <tr class="align-middle">
            <td${color}>${data[i].FECHA_DEVOL}</td>
            <td>${data[i].COD_LIBRO.substring(0,data[i].COD_LIBRO.length-2)}</td>
            <td class="d-none">${data[i].COD_LIBRO.substr(-1)}</td>
            <td>${data[i].TITULO}</td>
            <td>${data[i].NOMBRE} ${data[i].APELLIDOS}</td>
            <td>${data[i].GRUPO}</td>
            <td><input type="submit" class="btn btn-primary btnForDevol" value="Formalizar"></td>
          </tr>`;
        }
        //BOTONES FORMALIZAR DEVOLUCIÓN
        for(let btn of tbodyDevol.querySelectorAll(".btnForDevol")){
          btn.addEventListener("click",(e)=>{
            e.preventDefault();
            if(confirm("¿Deseas efectuar la devolución? El préstamo seleccionado se moverá al historial de préstamos")){
              //Se elimina el préstamo
              updatePrestamo(btn.parentElement.parentElement.children[1].textContent+'_'+btn.parentElement.parentElement.children[2].textContent,'','','Si').then(data =>{
                if(data[0] && data[0]=='Update sin Errores'){
                  alert("Devolución efectuada con éxito");
                  tbodyDevol.innerHTML="";
                } else alert("Error al modificar el préstamo");
              }).catch(error=>alert("Error al procesar la petición de actualización del préstamo"));
            }
          });
        }
      } else alert("No se encontraron préstamos sin devolver asociados al DNI "+dni);
    }).catch(error=>alert("Error al procesar la petición de información sobre préstamos"));
  } else alert("Indica un DNI válido para buscar");
});