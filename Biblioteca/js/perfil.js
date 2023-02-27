let nomApes = document.getElementById("nomApes");
let tbodyReservas = document.getElementById("tbodyReservas");
let tbodyPrestAct = document.getElementById("tbodyPrestAct");
let tbodyHistPrest = document.getElementById("tbodyHistPrest");
let btnLogout = document.getElementById("btnLogout");
let btnAnular = document.getElementById("btnAnular");
/* let btnRenovar = document.getElementById("btnRenovar"); */
let btnReservar = document.getElementById("btnReservar");
let camposAnular = document.getElementById("camposAnular");
/* let camposRenovar = document.getElementById("camposRenovar"); */
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
});

//BOTONES RESERVAR TABLA
for(btn of document.querySelectorAll("btn-Reservar")){
  btn.addEventListener("click",()=>{

  });
}

//BOTÓN RESERVAR MODAL
btnReservar.addEventListener("click",()=>{

});