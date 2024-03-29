let dniAlumno = document.getElementById("dniAlumno");
let nieAlumno = document.getElementById("nieAlumno");
let btnAlumno = document.getElementById("btnAlumno");
let dniProfesor = document.getElementById("dniProfesor");
let btnProfesor = document.getElementById("btnProfesor");

//Se elimina la sesión del administrador en caso de haberla
eliminarSesionAdmin();

//Si no se accede desde el dominio de origen se redirige a él
checkDomain('login');

//Si hay sesión iniciada se autocompletan los campos correspondientes
if(sessionStorage.getItem("tipoUsuario")){
  if(sessionStorage.getItem("tipoUsuario")=='Alumno'){
    dniAlumno.value = sessionStorage.getItem("dniUsuario");
    nieAlumno.value = sessionStorage.getItem("nieUsuario");
  } else if(sessionStorage.getItem("tipoUsuario")=='Profesor'){
    dniProfesor.value = sessionStorage.getItem("dniUsuario");
  }
}

//BOTONES LOGIN
for(let btn of document.querySelectorAll(".btn-login")){
  btn.addEventListener("click",(e)=>{
    //Se previene el submit
    e.preventDefault();
    //Alumnos
    if(e.target.id=='btnAlumno'){
      //Se verifican las credenciales
      getAlumnos('','','',dniAlumno.value.toUpperCase(),nieAlumno.value).then(data => {
        if(data.length==1){
          //Se verifica que está matriculado
          getMatriculas(dniAlumno.value.toUpperCase(),'','','','','','').then(data=>{
            if(data.length>0){
              //Se meten los datos en la sesión
              sessionStorage.setItem("tipoUsuario","Alumno");
              sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
              sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
              sessionStorage.setItem("dniUsuario",data[0].DNI);
              sessionStorage.setItem("nieUsuario",data[0].NIE);
              //Se redirecciona a perfil
              location.href="perfil.html";
            } else alert("No puedes iniciar sesión: Los alumnos sin matrícula no pueden iniciar sesión");
          }).catch(error=>alert("Error al procesar la petición de información sobre matrículas"));
        //Si no son válidas las credenciales se avisa con un alert
        } else alert("Credenciales Incorrectas");
      }).catch(error=>alert("Error al procesar la petición de información sobre alumnos"));
    //Profesores
    } else if(e.target.id=='btnProfesor'){
      getProfesores('','',dniProfesor.value.toUpperCase(),'').then(data => {
        if(data.length==1){
          //Se meten los datos en la sesión
          sessionStorage.setItem("tipoUsuario","Profesor");
          sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
          sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
          sessionStorage.setItem("dniUsuario",data[0].DNI);
          //Se redirecciona a perfil
          location.href="perfil.html";
        //Si no son válidas las credenciales se avisa con un alert
        } else alert("Credenciales Incorrectas");
      }).catch(error=>alert("Error al procesar la petición de información sobre profesores"));
    }
  });
}