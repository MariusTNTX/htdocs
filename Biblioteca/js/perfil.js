let nomApes = document.getElementById("nomApes");
let tbodyReservas = document.getElementById("tbodyReservas");
let tbodyPrestAct = document.getElementById("tbodyPrestAct");
let tbodyHistPrest = document.getElementById("tbodyHistPrest");
let btnLogout = document.getElementById("btnLogout");

nomApes.textContent = sessionStorage.getItem("nombreUsuario")+" "+sessionStorage.getItem("apellidosUsuario");

//RESERVAS ACTIVAS
getReservas('',sessionStorage.getItem("dniUsuario"),'').then(data =>{
  console.log(data);
  for(let dat of data){
    tbodyReservas.innerHTML += `
    <tr class="align-middle">
      <td>${dat.TITULO}</td>
      <td>${dat.AUTOR}</td>
      <td>${dat.FECHA_FIN}</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAnular">Anular</button></td>
    </tr>`;
  }
});

//PRÉSTAMOS ACTIVOS
getPrestamos('',sessionStorage.getItem("dniUsuario"),'','','No').then(data =>{
  console.log(data);
  for(let dat of data){
    tbodyPrestAct.innerHTML += `
    <tr class="align-middle">
      <td>${dat.TITULO}</td>
      <td>${dat.AUTOR}</td>
      <td>${dat.FECHA_DEVOL}</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAnular">Anular</button></td>
    </tr>`;
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
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva">Reservar</button></td>
    </tr>`;
  }
});

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