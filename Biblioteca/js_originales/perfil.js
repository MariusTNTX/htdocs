let nomApes = document.getElementById("nomApes");
let tbodyReservas = document.getElementById("tbodyReservas");
let tbodyPrestAct = document.getElementById("tbodyPrestAct");
let tbodyHistPrest = document.getElementById("tbodyHistPrest");
let btnLogout = document.getElementById("btnLogout");
let btnAnular = document.getElementById("btnAnular");
let btnReservar = document.getElementById("btnReservar");
let camposAnular = document.getElementById("camposAnular");
let camposReserva = document.getElementById("camposReserva");

eliminarSesionAdmin();

//Si se intenta acceder a perfil sin estar logeado se redirige al login
if(!sessionStorage.getItem("tipoUsuario")) location.href="login.html";

//Se almacena nombre y apellidos
nomApes.textContent = sessionStorage.getItem("nombreUsuario")+" "+sessionStorage.getItem("apellidosUsuario");

//CERRAR SESIÓN
btnLogout.addEventListener("click",()=>{
  //Preugntar por confirmación
  if(confirm("¿Seguro que deseas cerrar la sesión?")){
    //Eliminar datos de la sesión
    if(sessionStorage.getItem("tipoUsuario")=='Alumno') sessionStorage.removeItem("nieUsuario");
    sessionStorage.removeItem("tipoUsuario");
    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("apellidosUsuario");
    sessionStorage.removeItem("dniUsuario");
    sessionStorage.removeItem("nieUsuario");
    //Redireccionar al login
    location.href = "index.html";
  }
});

//RESERVAS ACTIVAS
getReservas('',sessionStorage.getItem("dniUsuario"),'','').then(data =>{
  tbodyReservas.innerHTML="";
  for(let dat of data){
    if(dat.PENDIENTE=='No'){
      tbodyReservas.innerHTML += `
      <tr class="align-middle">
        <td class="d-none">${dat.COD_LIBRO}</td>
        <td>${dat.TITULO}</td>
        <td>${dat.DEPARTAMENTO}</td>
        <td>${dat.CENTRO}</td>
        <td>${dat.FECHA_FIN}</td>
        <td><button type="button" class="btn btn-primary btn-Anular" data-bs-toggle="modal" data-bs-target="#modalAnular">Anular</button></td>
      </tr>`;
    }
  }
  //BOTONES ANULAR TABLA
  for(let btn of document.querySelectorAll(".btn-Anular")){
    btn.addEventListener("click",(e)=>{
      let codigo = e.target.parentElement.parentElement.firstElementChild.textContent;
      //Se recupera toda la info de la reserva seleccionada con dni y codigo y se imprimen en el modal anular
      getReservas(codigo,sessionStorage.getItem("dniUsuario"),'','').then(data =>{
        if(data.length==1){
          //Se imprimen los datos del libro en el modal
          let corresp = [data[0].TITULO,data[0].AUTOR,data[0].MATERIA,data[0].DEPARTAMENTO,data[0].CENTRO,data[0].COD_LIBRO.substring(0,data[0].COD_LIBRO.length-2),data[0].COD_LIBRO.substr(-1),data[0].EDITORIAL,data[0].A_EDICION,data[0].ESTADO,data[0].USUARIO];
          for(let i=0; i<11; i++){
            camposAnular.children[i].children[1].textContent = corresp[i];
          }
        } else alert("Error al recuperar los datos de ésta reserva");
      }).catch(error=>alert("Error al procesar la petición de información sobre reservas"));
    });
  }
  //BOTÓN ANULAR MODAL
  btnAnular.addEventListener("click",()=>{
    let codigo = camposAnular.children[5].children[1].textContent+'_'+camposAnular.children[6].children[1].textContent;
    if(confirm("¿Seguro que deseas anular la reserva? El ejemplar volverá a estar disponible al público")){
      deleteReserva(codigo,'').then(data =>{
        if(data[0] && data[0]=='Delete Exitoso'){
          alert("La reserva ha sido eliminada con éxito");
          location.href="perfil.html";
        } else alert("Error al eliminar la reserva");
      }).catch(error=>alert("Error al procesar la petición de borrado de la reserva"));
    }
  });
}).catch(error=>alert("Error al procesar la petición de información sobre reservas"));

//PRÉSTAMOS ACTIVOS
getPrestamos('',sessionStorage.getItem("dniUsuario"),'','','','No').then(data =>{
  tbodyPrestAct.innerHTML="";
  for(let dat of data){
    let color = (dat.PENDIENTE=='Si') ? ' class="text-danger fw-bold"' : '';
    tbodyPrestAct.innerHTML += `
    <tr class="align-middle">
      <td class="d-none">${dat.COD_LIBRO}</td>
      <td>${dat.TITULO}</td>
      <td>${dat.DEPARTAMENTO}</td>
      <td>${dat.CENTRO}</td>
      <td${color}>${dat.FECHA_DEVOL}</td>
    </tr>`;
  }
}).catch(error=>alert("Error al procesar la petición de información sobre préstamos"));

//HISTORIAL DE PRÉSTAMOS
getPrestamos('',sessionStorage.getItem("dniUsuario"),'','','','Si').then(data =>{
  tbodyHistPrest.innerHTML="";
  for(let dat of data){
    let enabled = (dat.DISPONIBLE=='No') ? ' disabled' : '';
    tbodyHistPrest.innerHTML += `
    <tr class="align-middle">
      <td>${dat.TITULO}</td>
      <td>${dat.COD_LIBRO.substring(0,dat.COD_LIBRO.length-2)}</td>
      <td class="d-none">${dat.COD_LIBRO.substr(-1)}</td>
      <td>${dat.AUTOR}</td>
      <td>${dat.MATERIA}</td>
      <td>${dat.DEPARTAMENTO}</td>
      <td>${dat.CENTRO}</td>
      <td>${dat.EDITORIAL}</td>
      <td>${dat.A_EDICION}</td>
      <td>${dat.ESTADO}</td>
      <td>${dat.USUARIO}</td>
      <td><button type="button" class="btn btn-primary btn-Reservar"${enabled}>Reservar</button></td>
      <input type="hidden" data-bs-toggle="modal" data-bs-target="#modalReserva">
    </tr>`;
  }
  //BOTONES RESERVAR TABLA
  for(btn of document.querySelectorAll(".btn-Reservar")){
    btn.addEventListener("click",(e)=>{
      //Se imprimen los datos del libro a reservar en el modal siguiente
      let corresp = [0,3,4,5,6,1,2,7,8,9,10];
      for(let i=0; i<corresp.length; i++){
        camposReserva.children[i].children[1].textContent = btn.parentElement.parentElement.children[corresp[i]].textContent;
      }
      //Se verifica que no tenga suficientes reservas/préstamos o que no lo tenga ya
      getLibrosActUsuario(sessionStorage.getItem("dniUsuario")).then(data => {
        //Si al recuperar las reservas tiene menos de dos reservas se genera click y se autocompletan los campos del login
        if((data.reservas.length + data.prestamos.length)<2){
          //Si tiene un libro y coincide no le dejará reservarlo
          if((data.reservas.length==1 && data.reservas[0].COD_LIBRO==btn.parentElement.parentElement.children[1].textContent+"_"+btn.parentElement.parentElement.children[2].textContent) ||
             (data.prestamos.length==1 && data.prestamos[0].COD_LIBRO==btn.parentElement.parentElement.children[1].textContent+"_"+btn.parentElement.parentElement.children[2].textContent)){
            alert("No puedes reservar: Ya tienes una reserva o préstamo en curso con éste ejemplar");
          } else btn.parentElement.nextElementSibling.dispatchEvent(new Event("click"));
          //Si al recuperar las reservas tiene dos reservas no se genera click y se avisará con alert
        } else alert("No puedes reservar: Tienes demasiadas reservas y/o préstamos en curso");
      }).catch(error=>alert("Error al procesar la petición de información sobre libros activos del usuario"));
    });
  }

  //BOTÓN RESERVAR MODAL
  btnReservar.addEventListener("click",()=>{
    //añadir la nueva reserva al usuario según su dni
    let cod = camposReserva.children[5].children[1].textContent+"_"+camposReserva.children[6].children[1].textContent;
    getFechaRecogida().then(data => {
      let fechaRecog = data[0];
      putReserva(cod,sessionStorage.getItem("dniUsuario"),fechaRecog).then(data =>{
        if(data[0]){
          alert("Tu reserva se ha efectuado con éxito");
          location.href="perfil.html";
        } 
      }).catch(error=>alert("Error al procesar la petición de inserción de la reserva"));
    }).catch(error=>alert("Error al procesar la petición de cálculo de fecha"));
  });
}).catch(error=>alert("Error al procesar la petición de información sobre préstamos"));