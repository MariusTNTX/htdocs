let dniAlumno = document.getElementById("dniAlumno");
let nieAlumno = document.getElementById("nieAlumno");
let btnAlumno = document.getElementById("btnAlumno");
let dniProfesor = document.getElementById("dniProfesor");
let btnProfesor = document.getElementById("btnProfesor");

//Si hay sesión iniciada se autocompletan los campos correspondientes
if(sessionStorage.getItem("tipoUsuario")){
  console.log("Sesión detectada")
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
    //Si las credenciales son válidas se cambia el location a perfil.html
    if(e.target.id=='btnAlumno'){
      getAlumnos('','','',dniAlumno.value,nieAlumno.value).then(data => {
        if(data.length==1){
          //Se meten los datos en la sesión
          sessionStorage.setItem("tipoUsuario","Alumno");
          sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
          sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
          sessionStorage.setItem("dniUsuario",data[0].DNI);
          sessionStorage.setItem("nieUsuario",data[0].NIE);
          //Se redirecciona a perfil
          location.href="perfil.html";
          console.log(data);
        //Si no son válidas las credenciales se avisa con un alert
        } else alert("Credenciales Incorrectas");
      });
    } else if(e.target.id=='btnProfesor'){
      getProfesores('','',dniProfesor.value,'').then(data => {
        if(data.length==1){
          //Se meten los datos en la sesión
          sessionStorage.setItem("tipoUsuario","Profesor");
          sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
          sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
          sessionStorage.setItem("dniUsuario",data[0].DNI);
          //Se redirecciona a perfil
          location.href="perfil.html";
          console.log(data);
        //Si no son válidas las credenciales se avisa con un alert
        } else alert("Credenciales Incorrectas");
      });
    }
  });
}
