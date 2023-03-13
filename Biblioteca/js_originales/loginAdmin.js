let dniAdmin = document.getElementById("dniAdmin");
let passAdmin = document.getElementById("passAdmin");
let btnAdmin = document.getElementById("btnAdmin");

//Se elimina la sesión del administrador en caso de haberla
eliminarSesionAdmin();

//Si no se accede desde el dominio de origen se redirige a él
checkDomain('index');

//BOTONES LOGIN
btnAdmin.addEventListener("click",(e)=>{
  //Se previene el submit
  e.preventDefault();
  //Si las credenciales son válidas se cambia el location a jfk.html o administrador.html
  getAdmins(dniAdmin.value.toUpperCase(),passAdmin.value).then(data => {
    //Si las credenciales son válidas
    if(data.length==1){
      //Se meten los datos en la sesión
      sessionStorage.setItem("tipoUsuario",data[0].TIPO);
      sessionStorage.setItem("nombreUsuario",data[0].NOMBRE);
      sessionStorage.setItem("apellidosUsuario",data[0].APELLIDOS);
      sessionStorage.setItem("dniUsuario",data[0].DNI);
      sessionStorage.setItem("centroUsuario",data[0].CENTRO);
      sessionStorage.setItem("departUsuario",data[0].DEPARTAMENTO);
      sessionStorage.setItem("codDptoUsuario",data[0].COD_DPTO);
      //Redirigir a Admin o a JFK
      if(data[0].TIPO=='admin') location.href="administracion.html";
      else if(data[0].TIPO=='jfk') location.href="jfk.html";
    //Si no son válidas las credenciales se avisa con un alert
    } else alert("Credenciales Incorrectas");
  }).catch(error=>alert("Error al procesar la petición de información sobre administradores"));
});