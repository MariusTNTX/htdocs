let tituloLibro = document.getElementById("tituloLibro");
let autorLibro = document.getElementById("autorLibro");
let isbnLibro = document.getElementById("isbnLibro");
let editorialLibro = document.getElementById("editorialLibro");
let anioLibro = document.getElementById("anioLibro");
let materiaLibro = document.getElementById("materiaLibro");
let departLibro = document.getElementById("departLibro");
let centroLibro = document.getElementById("centroLibro");
let disponibLibro = document.getElementById("disponibLibro");
let estadoLibro = document.getElementById("estadoLibro");
let buscarLibros = document.getElementById("buscarLibros");
let tbody = document.getElementById("tbody");
let loginAlumnos = document.getElementById("loginAlumnos");
let loginProfesores = document.getElementById("loginProfesores");
let dniAlumno = document.getElementById("dniAlumno");
let nieAlumno = document.getElementById("nieAlumno");
let dniProfesor = document.getElementById("dniProfesor");
let fechaRecog = document.getElementById("fechaRecog");
let botonReservarFinal = document.getElementById("botonReservarFinal");
let datosReserva = document.getElementById("datosReserva");

eliminarSesionAdmin();

// BOTÓN BUSCAR
buscarLibros.addEventListener("click",()=>{
  //Si hay algún campo con información se inicia la búsqueda
  if(tituloLibro.value.length>0 || autorLibro.value.length>0 || isbnLibro.value.length>0 || 
     editorialLibro.value.length>0 || anioLibro.value.length>0 || materiaLibro.selectedIndex>0 ||
     departLibro.selectedIndex>0 || centroLibro.selectedIndex>0 || disponibLibro.selectedIndex>0){
    getLibros(tituloLibro.value,autorLibro.value,isbnLibro.value,editorialLibro.value,anioLibro.value,materiaLibro.value,departLibro.value,centroLibro.value,disponibLibro.value,estadoLibro.value).then(response => {
      //Se imprimen los resultados en la tabla
      tbody.innerHTML = "";
      for(let res of response){
        let disabled = (res.USUARIO=='CONSULTA') ? 'disabled' : '';
        tbody.innerHTML += `
        <tr class="align-middle">
          <td>${res.TITULO}</td>
          <td>${res.COD_LIBRO.substring(0,res.COD_LIBRO.length-2)}</td>
          <td class="d-none">${res.COD_LIBRO.substr(-1)}</td>
          <td>${res.AUTOR}</td>
          <td>${res.MATERIA}</td>
          <td>${res.NOMBRE}</td>
          <td>${res.CENTRO}</td>
          <td>${res.EDITORIAL}</td>
          <td>${res.A_EDICION}</td>
          <td>${res.ESTADO}</td>
          <td>${res.USUARIO}</td>
          <td><button type="button" class="btn btn-primary btn-Reservar" ${disabled}>Reservar</button></td>
          <input type="hidden" data-bs-toggle="modal" data-bs-target="#modalLogin">
        </tr>`
      }

      //BOTONES RESERVAR (TABLA)
      //Se personaliza el login del modal según el usuario
      for(let btn of document.querySelectorAll(".btn-Reservar")){
        btn.addEventListener("click",(e)=>{
          //Se imprimen los datos del libro a reservar en el modal siguiente
          let corresp = [0,3,4,5,6,1,7,8,9,10];
          for(let i=0; i<10; i++){
            datosReserva.children[i].children[1].textContent = btn.parentElement.parentElement.children[corresp[i]].textContent;
          }
          datosReserva.children[5].children[2].textContent = btn.parentElement.parentElement.children[2].textContent;
          //Se muestra el login de usuario o profesor
          let usuario = e.currentTarget.parentElement.previousElementSibling.textContent;
          switch(usuario){
            case 'ALUMNO': 
              loginAlumnos.classList.remove("d-none");
              loginProfesores.classList.add("d-none");
              break;
            case 'PROFESOR': 
              loginAlumnos.classList.add("d-none");
              loginProfesores.classList.remove("d-none");
              break;
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
                if((data.reservas.length==1 && data.reservas[0].COD_LIBRO==btn.parentElement.parentElement.children[1].textContent+"_"+btn.parentElement.parentElement.children[2].textContent) ||
                  (data.prestamos.length==1 && data.prestamos[0].COD_LIBRO==btn.parentElement.parentElement.children[1].textContent+"_"+btn.parentElement.parentElement.children[2].textContent)){
                  alert("No puedes reservar: Ya tienes una reserva o préstamo en curso con éste ejemplar")
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

      // BOTONES LOGIN
      for(let btn of document.querySelectorAll(".btn-login")){
        btn.addEventListener("click",(e)=>{
          //Se previene el submit
          e.preventDefault();
          //Se obtiene un array con los imputs a rellenar según sea alumno o prefesor
          let campos = e.target.parentElement.parentElement.querySelectorAll(".campoLogin");
          //Login de Alumno:
          if(campos.length==2){
            getAlumnos('','','',campos[0].value,campos[1].value).then(data => {
              if(data.length==1){
                //Se meten los datos en la sesión
                sessionStorage.setItem("tipoUsuario","Alumno");
                sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
                sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
                sessionStorage.setItem("dniUsuario",data[0].DNI);
                sessionStorage.setItem("nieUsuario",data[0].NIE);
                console.log(data);
                //Si el numero de reservas no llega a 2 se produce un click en el hidden para continuar
                getLibrosUsuario(sessionStorage.getItem("dniUsuario")).then(data => {
                  if((data.reservas.length + data.prestamos.length)<2){
                    //Se introduce la fecha de recogida calculada por la API
                    getFechaRecogida().then(data => fechaRecog.textContent = data[0]);
                    e.target.parentElement.nextElementSibling.dispatchEvent(new Event("click"));
                  } else alert("No puedes reservar: Tienes demasiadas reservas y/o préstamos en curso");
                });
              } else alert("Credenciales Incorrectas");
            });
          }
          //Login de Profesor:
          else if(campos.length==1){
            getProfesores('','',campos[0].value,'').then(data => {
              if(data.length==1){
                //Se meten los datos en la sesión
                sessionStorage.setItem("tipoUsuario","Profesor");
                sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
                sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
                sessionStorage.setItem("dniUsuario",data[0].DNI);
                console.log(data);
                //Si el numero de reservas no llega a 2 se produce un click en el hidden para continuar
                getLibrosUsuario(sessionStorage.getItem("dniUsuario")).then(data => {
                  if((data.reservas.length + data.prestamos.length)<2){
                    //Se introduce la fecha de recogida calculada por la API
                    getFechaRecogida().then(data => fechaRecog.textContent = data[0]);
                    e.target.parentElement.nextElementSibling.dispatchEvent(new Event("click"));
                  } else alert("No puedes reservar: Tienes demasiadas reservas y/o préstamos en curso");
                });
              } else alert("Credenciales Incorrectas");
            });
          } 
        });
      }

      //BOTÓN RESERVAR (MODAL)
      botonReservarFinal.addEventListener("click",()=>{
        //añadir la nueva reserva al usuario según su dni
        let cod = datosReserva.children[5].children[1].textContent+"_"+datosReserva.children[5].children[2].textContent;
        putReserva(cod,sessionStorage.getItem("dniUsuario"),fechaRecog.textContent).then(data =>{
          if(data[0]) alert("Tu reserva se ha efectuado con éxito. Puedes ver tus reservas accediendo a tu perfil")
        });
      });
    });
  //Si no hay ningún campo rellenado
  } else alert("Debes indicar al menos un criterio de búsqueda");
});