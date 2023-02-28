let nomApes = document.getElementById("nomApes");
let tbodyReservas = document.getElementById("tbodyReservas");
let tbodyPrestAct = document.getElementById("tbodyPrestAct");
let tbodyHistPrest = document.getElementById("tbodyHistPrest");
let btnLogout = document.getElementById("btnLogout");
let btnAnular = document.getElementById("btnAnular");
let btnReservar = document.getElementById("btnReservar");
let camposAnular = document.getElementById("camposAnular");
let camposReservar = document.getElementById("camposReservar");

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
    //Redireccionar al login
    location.href = "index.html";
  }
});

//RESERVAS ACTIVAS
getReservas('',sessionStorage.getItem("dniUsuario"),'').then(data =>{
  console.log(data);
  for(let dat of data){
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
  //BOTONES ANULAR TABLA
  for(let btn of document.querySelectorAll(".btn-Anular")){
    btn.addEventListener("click",(e)=>{
      let codigo = e.target.parentElement.parentElement.firstElementChild.textContent;
      //Se recupera toda la info de la reserva seleccionada con dni y codigo y se imprimen en el modal anular
      getReservas(codigo,sessionStorage.getItem("dniUsuario"),'').then(data =>{
        console.log(data);
        if(data.length==1){
          //Se imprimen los datos del libro en el modal
          let corresp = [data[0].TITULO,data[0].AUTOR,data[0].MATERIA,data[0].DEPARTAMENTO,data[0].CENTRO,data[0].COD_LIBRO.substring(0,data[0].COD_LIBRO.length-2),data[0].COD_LIBRO.substr(-1),data[0].EDITORIAL,data[0].A_EDICION,data[0].ESTADO,data[0].USUARIO];
          for(let i=0; i<11; i++){
            camposAnular.children[i].children[1].textContent = corresp[i];
          }
        } else alert("Error al recuperar los datos de ésta reserva");
      });
    });
  }
  //BOTÓN ANULAR MODAL
  btnAnular.addEventListener("click",()=>{
    let codigo = camposAnular.children[5].children[1].textContent+'_'+camposAnular.children[6].children[1].textContent;
    deleteReserva(codigo,'').then(data =>{
      if(data[0] && data[0]=='Delete Exitoso'){
        alert("La reserva ha sido eliminada con éxito");
        location.href="perfil.html";
      } else alert("Error al eliminar la reserva");
    });
  });
});

//PRÉSTAMOS ACTIVOS
getPrestamos('',sessionStorage.getItem("dniUsuario"),'','','No').then(data =>{
  console.log(data);
  for(let dat of data){
    tbodyPrestAct.innerHTML += `
    <tr class="align-middle">
      <td class="d-none">${dat.COD_LIBRO}</td>
      <td>${dat.TITULO}</td>
      <td>${dat.DEPARTAMENTO}</td>
      <td>${dat.CENTRO}</td>
      <td>${dat.FECHA_DEVOL}</td>
    </tr>`; //<td><button type="button" class="btn btn-primary btn-Renovar" data-bs-toggle="modal" data-bs-target="#modalAnular">Anular</button></td>
  }
});

//HISTORIAL DE PRÉSTAMOS
getPrestamos('',sessionStorage.getItem("dniUsuario"),'','','Si').then(data =>{
  console.log(data);
  for(let dat of data){
    tbodyHistPrest.innerHTML += `
    <tr class="align-middle">
      <td>${dat.TITULO}</td>
      <td>${dat.COD_LIBRO.substring(0,dat.COD_LIBRO.length-2)}</td>
      <td class="d-none">${dat.COD_LIBRO.substr(-1)}</td>
      <td>${dat.AUTOR}</td>
      <td>${dat.MATERIA}</td>
      <td>${dat.DEPARTAMENTO}s</td>
      <td>${dat.CENTRO}</td>
      <td>${dat.EDITORIAL}</td>
      <td>${dat.A_EDICION}</td>
      <td>${dat.ESTADO}</td>
      <td>${dat.USUARIO}</td>
      <td><button type="button" class="btn btn-primary btn-Reservar" data-bs-toggle="modal" data-bs-target="#modalReserva">Reservar</button></td>
    </tr>`;
  }
  //BOTONES RESERVAR TABLA
  for(btn of document.querySelectorAll("btn-Reservar")){
    btn.addEventListener("click",(e)=>{
      //Se imprimen los datos del libro a reservar en el modal siguiente
      let corresp = [0,3,4,5,6,1,2,7,8,9,10];
      for(let i=0; i<10; i++){
        camposReserva.children[i].children[1].textContent = btn.parentElement.parentElement.children[corresp[i]].textContent;
      }
      //Si hay un usuario logeado se verifica que no tenga suficientes reservas/préstamos o que no lo tenga ya
      if(sessionStorage.getItem("tipoUsuario")){
        getLibrosUsuario(sessionStorage.getItem("dniUsuario")).then(data => {
          //Si al recuperar las reservas tiene menos de dos reservas se genera click y se autocompletan los campos del login
          console.log(data)
          if((data.reservas.length + data.prestamos.length)<2){
            //Si tiene un libro y coincide no le dejará reservarlo
            console.log("ISBN:")
            console.log(btn.parentElement.parentElement.children[1].textContent)
            if((data.reservas.length==1 && data.reservas[0].COD_LIBRO==btn.parentElement.parentElement.children[1].textContent) ||
              (data.prestamos.length==1 && data.reservas[0].COD_LIBRO==btn.parentElement.parentElement.children[1].textContent)){
              alert("No puedes reservar: Ya tienes una reserva o préstamo en curso con éste ejemplar");
            } else {
              btn.parentElement.nextElementSibling.dispatchEvent(new Event("click"));
              if(sessionStorage.getItem("tipoUsuario")=='Alumno'){
                dniAlumno.value = sessionStorage.getItem("dniUsuario");
                nieAlumno.value = sessionStorage.getItem("nieUsuario");
              } else if(sessionStorage.getItem("tipoUsuario")=='Profesor'){
                dniProfesor.value = sessionStorage.getItem("dniUsuario");
              }
            }
            //Si al recuperar las reservas tiene dos reservas no se genera click y se avisará con alert
          } else alert("No puedes reservar: Tienes demasiadas reservas y/o préstamos en curso");
        });
      } else btn.parentElement.nextElementSibling.dispatchEvent(new Event("click"));
    });
  }

  //BOTÓN RESERVAR MODAL
  btnReservar.addEventListener("click",()=>{

  });
});

