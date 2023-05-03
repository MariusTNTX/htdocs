/* Variables DOM */
let loginFormDrop = document.getElementById("loginForm");
let loginFormButton = document.getElementById("loginFormButton");
let toLoginForm = document.getElementById("toLoginForm");
let regForm  = document.getElementById("regForm");
let usuario = document.getElementById("usuario");
let correo = document.getElementById("correo");
let pass1 = document.getElementById("pass1");
let pass2 = document.getElementById("pass2");
let loginPassEye1 = document.getElementById("loginPassEye1");
let loginPassEye2 = document.getElementById("loginPassEye2");
let crt = document.getElementById("crt");
let may = document.getElementById("may");
let min = document.getElementById("min");
let num = document.getElementById("num");
let esp = document.getElementById("esp");
let foto = document.getElementById("foto");
let check1 = document.getElementById("check1");
let check2 = document.getElementById("check2");
let botonVerificar1 = document.getElementById("botonVerificar1");
let botonVerificar2 = document.getElementById("botonVerificar2");
let modalClose = document.getElementById("modalClose");
let contador = document.getElementById("contador");
let codigoVerificacion = document.getElementById("codigoVerificacion");
let verificarCuenta = document.getElementById("verificarCuenta");
let cancelarProceso = document.getElementById("cancelarProceso");
/* Expresiones Regulares */
let expresionUsuario = new RegExp(/^[\wñç'ª\.@áéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ]{3,12}$/i);
let expresionCorreo = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
let exprPass1 = new RegExp(/.{10}/);
let exprPass2 = new RegExp(/[A-ZÑÇÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛ]{1,}/);
let exprPass3 = new RegExp(/[a-zñçáéíóúàèìòùäëïöüâêîôû]{1,}/);
let exprPass4 = new RegExp(/\d{1,}/);
let exprPass5 = new RegExp(/[ºª!|"@·#$~%€&¬()=?'¿¡`^\[\+\*\]´¨{}<>,;.:\-_]{1,}/);
let expresionFoto = new RegExp(/(pjp)|(jpg)|(pjpeg)|(jpeg)|(jfif)|(png)|(webp)/);
/* Criterios contraseña */
let criterios = [[exprPass1,crt],[exprPass2,may],[exprPass3,min],[exprPass4,num],[exprPass5,esp]];
/* Estado de Validación General */
let validacion = {user: false, email: false, pass1: false, pass2: false, terms: false};
let codigo;
let enVerific = false;

/* Eventos Mostrar/Ocultar Contraseña */
addShowPassSwitch(loginPassEye1, pass1);

function showInvalidNumber(elm, num){
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  document.getElementById(id+num).classList.remove("d-none");
  elm.classList.add("is-invalid");
  elm.classList.remove("border-success");
}

toLoginForm.addEventListener("click",()=>{
  let id = setInterval(()=>{
    loginFormButton.dispatchEvent(new Event("click"));
    clearInterval(id);
  },500);
});

/* Validacion usuario */
usuario.addEventListener("blur",()=>{
  console.log("blur usuario")
  validacion.user=false;
  validar();
  if(usuario.value.length==0) showInvalidNumber(usuario,1);
  else if(usuario.value.length<3) showInvalidNumber(usuario,2);
  else if(!expresionUsuario.test(usuario.value)) showInvalidNumber(usuario,3);
  else {
    usuario.classList.remove("is-invalid");
    usuario.classList.add("border-success");
    validacion.user=true;
    validar();
  }
});

/* Validacion email (y si no existe o existe sin validar) */
correo.addEventListener("blur",async ()=>{
  console.log("blur email")
  validacion.email=false;
  validar();
  if(correo.value.length==0) showInvalidNumber(correo,1);
  else if(!expresionCorreo.test(correo.value)) showInvalidNumber(correo,2);
  else {
    let data = await list("usuarios",true,["emailUsuario",correo.value]);
    if(data.response.length!=0 && data.response[0].permisos!=0) showInvalidNumber(correo,3);
    else {
      correo.classList.remove("is-invalid");
      correo.classList.add("border-success");
      validacion.email=true;
      validar();
    } 
  }
});

/* Validación Contraseña 1 */
pass1.addEventListener("keyup",()=>{
  let full = true;
  for(let criterio of criterios){
    if(criterio[0].test(pass1.value)) criterio[1].classList.add("text-success");
    else {
      criterio[1].classList.remove("text-success");
      full = false;
      validacion.pass1=false;
      validar();
    }
  }
  if(full){
    pass2.removeAttribute("disabled");
    pass1.classList.remove("border-danger");
    validacion.pass1=true;
    validar();
  } else {
    pass2.setAttribute("disabled","true");
    pass1.classList.remove("border-success");
    pass1.classList.add("border-danger");
  }
  validPassRepeat();
});

/* Validación Contraseña 2 */
pass2.addEventListener("keyup",()=> validPassRepeat());

//Función Validar Coincidencia entre Contraseñas
function validPassRepeat(){
  if(pass1.value.length>0 && pass2.value==pass1.value){
    pass1.classList.add("border-success");
    pass2.classList.remove("border-danger");
    pass2.classList.add("border-success");
    loginPassEye1.classList.add("text-success");
    /* loginPassEye2.classList.add("text-success"); */
    validacion.pass2=true;
    validar();
  } else {
    pass1.classList.remove("border-success");
    pass2.classList.remove("border-success");
    loginPassEye1.classList.remove("text-success");
    /* loginPassEye2.classList.remove("text-success"); */
    if(!pass2.hasAttribute("disabled")) pass2.classList.add("border-danger");
    validacion.pass2=false;
    validar();
  }
}

/* Validación Foto Usuario */
foto.addEventListener("change",()=>{
  let ext = (foto.files[0]) ? foto.files[0].name.substring(foto.files[0].name.lastIndexOf(".")+1) : "";
  if(foto.files.length>0 && !expresionFoto.test(ext)){ //Si hay una foto seleccionada y su formato no es correcto se muestra en rojo con el mensaje de error
    showInvalidNumber(foto, 1);
  } else if(foto.files.length>0 && expresionFoto.test(ext)){ //Si hay una foto seleccionada y su formato es correcto se quitan los mensajes y se muestra en verde
    foto.classList.remove("is-invalid");
    foto.classList.remove("border-danger");
    foto.classList.add("border-success");
  } else { //Si no hay foto se quita el borde y los mensajes
    foto.classList.remove("is-invalid");
    foto.classList.remove("border-danger");
    foto.classList.remove("border-success");
  }
});

/* Validación Términos y Condiciones */
check2.addEventListener("change",()=>{
  if(check2.checked){
    validacion.terms=true;
    validar();
  } else {
    validacion.terms=false;
    validar();
  }
});

function validar(){
  console.log(validacion)
  if(validacion.user && validacion.email && validacion.pass1 && validacion.pass2 && validacion.terms){
    botonVerificar1.removeAttribute("disabled");
  } else botonVerificar1.setAttribute("disabled","true");
}

function iniciarTemp(){
  enVerific = true;
  contador.style.color="inherit";
  codigoVerificacion.removeAttribute("disabled");
  verificarCuenta.removeAttribute("disabled");
  let endTime = new Date().getTime()+1000*60*30, curTime, mins, segs;
  let intId = setInterval(()=>{
    curTime = endTime - new Date().getTime();
    mins = parseInt(curTime / 1000 / 60);
    segs = parseInt((curTime - mins*1000*60)/1000);
    mins = (mins<10) ? "0"+mins : mins;
    segs = (segs<10) ? "0"+segs : segs;
    contador.innerHTML = mins+":"+segs;
    if(curTime<=0 || !enVerific){
      contador.style.color="#dc210e";
      codigoVerificacion.setAttribute("disabled","true");
      verificarCuenta.setAttribute("disabled","true");
      if(curTime<=0) showAlert("ERROR","Se ha superado el tiempo límite para la verificación de tu cuenta. Regístrate de nuevo")
      clearInterval(intId);
    }
  },100);
}

/* Iniciar verificación: */
botonVerificar1.addEventListener("click", async ()=>{
  iniciarTemp(); // Se inicia el temporizador
  //Se prepara el campo foto si lo hay
  let nombreFoto = null, fd;
  if(foto.files.length>0){
    fd = new FormData(regForm);
    nombreFoto = new Date().getTime()+new Date().getMilliseconds()+foto.files[0].name.substring(foto.files[0].name.lastIndexOf("."));
  }
  // -- Se incluye el usuario provisional si no existe en la base de datos, si existe se actualizan los datos
  let data = await list("usuarios",true,["emailUsuario",correo.value]);
  if(data.response.length==0){ //INSERCIÓN
    //Inserción Usuario
    await post("usuarios",true,[{
      nombreUsuario: usuario.value,
      emailUsuario: correo.value,
      contraUsuario: pass1.value,
      notificacionesUsuario: (check1.checked) ? "SI" : "NO",
      nivelPermisosUsuario: 0
    }]);
    //Inserción Foto
    if(foto.files.length>0) await setFormData("usuarios",true,fd,nombreFoto,correo.value);
  } else if(data.response[0].permisos==0){ //ACTUALIZACIÓN
    //Actualización Usuario
    await put("usuarios",true,[{
      id: {emailUsuario: correo.value},
      nombreUsuario: usuario.value,
      contraUsuario: pass1.value,
      notificacionesUsuario: (check1.checked) ? "SI" : "NO",
    }]);
    //Actualización Foto
    if(fd) if(foto.files.length>0) await replaceFormData("usuarios",true,fd,nombreFoto,correo.value);
    else await deleteFormData("usuarios",true,fd,correo.value);
  } 
  // -- Se genera un codigo en cliente y se envia al servidor para enviar el correo
  codigo = "";
  for(let i=0; i<6; i++) codigo += Math.floor(Math.random()*10);
  console.log("Codigo = "+codigo)
  await sendVerifyEmail(correo.value, codigo, true);
});

/* Verificar codigo y actualizar o no en bbdd */
verificarCuenta.addEventListener("click", async ()=>{
  if(codigoVerificacion.value.length>0){
    if(codigoVerificacion.value == codigo){
      //Actualización Usuario
      await put("usuarios",true,[{
        id: {emailUsuario: correo.value},
        nivelPermisosUsuario: 1,
      }]);
      //Redireccionamiento al index
      location.href = "index.html?newLogin";
    } else alert("El código indicado no es correcto. Revisa tu correo o ponte en contacto con un administrador");
  } else alert("Debes indicar el código de verificación procedente del email recibido en la dirección de correo");
});

/* Cancelar Verificación */
cancelarProceso.addEventListener("click",()=>{
  enVerific=false; //Detener Temporizador
  botonVerificar1.textContent = "Intentar de Nuevo"; //Cambiar Botón
  modalClose.dispatchEvent(new Event("click")); //Cerrar Modal
});
