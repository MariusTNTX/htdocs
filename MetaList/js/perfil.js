/* Redirección en caso de no haber usuario logeado */
if(!sessionStorage.getItem("email")) location.href="index.html";

/* Variables DOM */
let fechaUsuario = document.getElementById("fechaUsuario");
let fotoUsuario = document.getElementById("fotoUsuario");
let nombreUsuario = document.getElementById("nombreUsuario");
let emailUsuario = document.getElementById("emailUsuario");
let opcFoto1 = document.getElementById("opcFoto1");
let perfilForm = document.getElementById("perfilForm");
let fotoSpinner = document.getElementById("fotoSpinner");
let inputFoto = document.getElementById("inputFoto");
let opcFoto2 = document.getElementById("opcFoto2");
let opcUsuario1 = document.getElementById("opcUsuario1");
let contraOriginal = document.getElementById("contraOriginal");
let loginPassEye1 = document.getElementById("loginPassEye1");
let contraNueva1 = document.getElementById("contraNueva1");
let loginPassEye2 = document.getElementById("loginPassEye2");
let contraNueva2 = document.getElementById("contraNueva2");
let cambiarPass = document.getElementById("cambiarPass");
let forgPass = document.getElementById("forgPass");
let crt = document.getElementById("crt");
let may = document.getElementById("may");
let min = document.getElementById("min");
let num = document.getElementById("num");
let esp = document.getElementById("esp");
/* Expresiones Regulares */
let expresionUsuario = new RegExp(/^[\wñç'ª\.@áéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ]{3,12}$/i);
let exprPass1 = new RegExp(/.{10}/);
let exprPass2 = new RegExp(/[A-ZÑÇÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛ]{1,}/);
let exprPass3 = new RegExp(/[a-zñçáéíóúàèìòùäëïöüâêîôû]{1,}/);
let exprPass4 = new RegExp(/\d{1,}/);
let exprPass5 = new RegExp(/[ºª!|"@·#$~%€&¬()=?'¿¡`^\[\+\*\]´¨{}<>,;.:\-_]{1,}/);
let expresionFoto = new RegExp(/(pjp)|(jpg)|(pjpeg)|(jpeg)|(jfif)|(png)|(webp)/);
/* Estado Opción Usuario e Imagen */
let userOnEdit = false, prevImage = false, fotoAnterior = null, nombreProv = "";
/* Criterios contraseña */
let criterios = [[exprPass1,crt],[exprPass2,may],[exprPass3,min],[exprPass4,num],[exprPass5,esp]];
/* Estado de Validación General */
let validacion = {pass0: false, pass1: false, pass2: false};

/* Fecha */
fechaUsuario.innerHTML = new Date(sessionStorage.getItem("fecha").replace(' ', 'T')).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/-/g, '/').replace(',', '');
/* Foto */
fotoUsuario.src = sessionStorage.getItem("foto");
if(sessionStorage.getItem("foto")==defaultFoto) prevImage = false;
else prevImage = true;
/* Usuario */
nombreUsuario.value = sessionStorage.getItem("usuario");
/* Email */
emailUsuario.textContent = sessionStorage.getItem("email");

//---------

/* Evento Actualizar Imagen */
opcFoto1.addEventListener("click",()=>{
  inputFoto.showPicker();
});

/* Evento Eliminar Imagen */
opcFoto2.addEventListener("click", async ()=>{
  sessionStorage.setItem("foto",defaultFoto);
  fotoUsuario.src = sessionStorage.getItem("foto");
  await deleteFormData("usuarios", true, sessionStorage.getItem("email"));
});

/* Evento Change de la Imagen */
inputFoto.addEventListener("change", async ()=>{
  //Almacenado de la Foto
  let nombreFoto = null, fd, ext = (inputFoto.files[0]) ? inputFoto.files[0].name.substring(inputFoto.files[0].name.lastIndexOf(".")+1) : "";

  if(inputFoto.files.length>0 && expresionFoto.test(ext)){
    fd = new FormData(perfilForm);
    nombreFoto = ""+new Date().getTime()+new Date().getMilliseconds()+"."+ext;
    sessionStorage.setItem("foto",path+"/MetaListStorage/userProfilePictures/"+nombreFoto);
  } else if(inputFoto.files.length>0 && !expresionFoto.test(ext)) showAlert("ERROR",'Los archivos con la estensión ".'+ext+'" no están permitidos');
  else sessionStorage.setItem("foto",defaultFoto);

  if((inputFoto.files.length>0 && expresionFoto.test(ext)) || inputFoto.files.length==0){
    //Envío de información a la API
    let fotoActual = (inputFoto.files.length>0) ? inputFoto.files[0].name : null;
    if(fotoAnterior!=fotoActual && fotoActual!=null){
      if(!prevImage) await setFormData("usuarios", true, fd, nombreFoto, sessionStorage.getItem("email"));
      else await replaceFormData("usuarios", true, fd, nombreFoto, sessionStorage.getItem("email"));
      showSpinner();
    }
    //Actualización de foto
    fotoAnterior = fotoActual;
    prevImage = fotoActual!=null;
  }
});

/* Mostrar Spinner */
function showSpinner(){
  fotoSpinner.classList.remove("d-none");
  let id = setInterval(() => {
    fotoSpinner.classList.add("d-none");
    fotoUsuario.src = sessionStorage.getItem("foto");
    document.getElementById("userImgMini").src = sessionStorage.getItem("foto");
    clearInterval(id);
  }, 2000);
}

/* Evento Activar Edición de Usuario */
opcUsuario1.addEventListener("click",()=>{
  if(!userOnEdit){ //Iniciar Edición
    nombreUsuario.classList.add("border-success") //Pone el marco en verde
    nombreUsuario.removeAttribute("disabled") //Permite la edición
    opcUsuario1.firstElementChild.classList.add("d-none"); //Cambia la imagen del botón a la de guardar
    opcUsuario1.lastElementChild.classList.remove("d-none");
    userOnEdit = true; //Activa el estado de edición de nombre de usuario
    nombreUsuario.focus(); //Pone el foco en el input
    nombreUsuario.selectionStart = nombreUsuario.value.length;
    nombreUsuario.addEventListener("blur",removeUserEdit); //Inserta evento Blur de Desactivar Edición de Usuario
    nombreUsuario.addEventListener("keyup",validUsuario); //Inicia la validación del campo usuario
  } else { //Guardar Cambios
    put("usuarios", false, [{id: {emailUsuario: sessionStorage.getItem("email")}, nombreUsuario: nombreProv}]); //Subida al servidor
    sessionStorage.setItem("usuario",nombreProv); //Actualización de la sesión
    document.getElementById("userName").textContent = nombreProv; //Actualización del Perfil superior
    removeUserEdit();
  }
});

/* Validacion usuario */
function validUsuario(){
  nombreProv = nombreUsuario.value;
  if(nombreUsuario.value.length==0) showInvalidNumber(nombreUsuario,1);
  else if(nombreUsuario.value.length<3) showInvalidNumber(nombreUsuario,2);
  else if(!expresionUsuario.test(nombreUsuario.value)) showInvalidNumber(nombreUsuario,3);
  else if(nombreUsuario.value == sessionStorage.getItem("usuario")) showInvalidNumber(nombreUsuario,4);
  else hideInvalidNumbers(nombreUsuario);
}

/* Evento Desactivar Edición de Usuario */
function removeUserEdit(){
  hideInvalidNumbers(nombreUsuario); //Quita los mensajes de validación
  nombreUsuario.classList.remove("border-danger"); //Quita el marco rojo y verde
  nombreUsuario.classList.remove("border-success");
  nombreUsuario.setAttribute("disabled","true"); //Prohibe la edición
  opcUsuario1.firstElementChild.classList.remove("d-none"); //Cambia la imagen del botón al lápiz
  opcUsuario1.lastElementChild.classList.add("d-none");
  nombreUsuario.removeEventListener("blur",removeUserEdit); //Quita el evento blur
  nombreUsuario.removeEventListener("keyup",validUsuario); //Quita la validación del campo usuario
  let id = setInterval(() => { //Se esperan unos milisegundos para evitar que el estado de edición se desactive antes de guardar
    userOnEdit = false; //Desactiva el estado de edición de nombre de usuario
    nombreUsuario.value = sessionStorage.getItem("usuario"); //Establece el nombre guardado en sesión
    clearInterval(id);
  }, 100);
}

/* Eventos Mostrar/Ocultar Contraseña */
addShowPassSwitch(loginPassEye1, contraOriginal);
addShowPassSwitch(loginPassEye2, contraNueva1);

function showInvalidNumber(elm, num){
  if(elm == nombreUsuario) nombreUsuario.classList.add("is-invalid");
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  document.getElementById(id+num).classList.remove("d-none");
  elm.classList.add("border-danger");
  elm.classList.remove("border-success");
  elm.parentElement.classList.replace("mb-3","mb-5");
}

function hideInvalidNumbers(elm){
  if(elm == nombreUsuario) nombreUsuario.classList.remove("is-invalid");
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  elm.classList.remove("border-danger");
  if(elm != contraNueva1) elm.classList.add("border-success");
  elm.parentElement.classList.replace("mb-5","mb-3");
}

/* Validación Contraseña Original */
contraOriginal.addEventListener("blur", async ()=>{
  validacion.pass0 = false;
  if(contraOriginal.value.length>0){
    let passVerif = await checkPassword(sessionStorage.getItem("email"), contraOriginal.value, true);
    if(passVerif[0].coincidence && passVerif[0].verify){
      hideInvalidNumbers(contraOriginal);
      contraNueva1.removeAttribute("disabled");
      if(validacion.pass1) contraNueva2.removeAttribute("disabled");
      loginPassEye2.classList.remove("d-none");
      loginPassEye1.classList.add("text-success");
      validacion.pass0 = true;
    } else {
      contraNueva1.setAttribute("disabled","true");
      contraNueva2.setAttribute("disabled","true");
      loginPassEye2.classList.add("d-none");
      loginPassEye1.classList.remove("text-success");
      showInvalidNumber(contraOriginal,2);
    }
  } else showInvalidNumber(contraOriginal,1);
  validar();
});

/* Validación Nueva Contraseña 1 */
contraNueva1.addEventListener("keyup",()=>{
  validacion.pass1 = false;
  let full = true;
  for(let criterio of criterios){
    if(criterio[0].test(contraNueva1.value)) criterio[1].classList.add("text-success");
    else {
      criterio[1].classList.remove("text-success");
      full = false;
    }
  }
  if(full && contraNueva1.value != contraOriginal.value){
    hideInvalidNumbers(contraNueva1);
    contraNueva1.classList.add("border-success");
    contraNueva2.removeAttribute("disabled");
    loginPassEye2.classList.add("text-success");
    validacion.pass1 = true;
  } else {
    contraNueva2.setAttribute("disabled","true");
    contraNueva1.classList.remove("border-success");
    contraNueva1.classList.add("border-danger");
    loginPassEye2.classList.remove("text-success");
    if(contraNueva1.value == contraOriginal.value) showInvalidNumber(contraNueva1,1);
    else hideInvalidNumbers(contraNueva1);
  }
  validar();
  validPassRepeat();
});

/* Validación Contraseña 2 */
contraNueva2.addEventListener("keyup",()=> validPassRepeat());

//Función Validar Coincidencia entre Contraseñas
function validPassRepeat(){
  validacion.pass2=false;
  if(contraNueva1.value.length>0 && contraNueva2.value==contraNueva1.value){
    /* contraNueva1.classList.add("border-success"); */
    contraNueva2.classList.remove("border-danger");
    contraNueva2.classList.add("border-success");
    /* loginPassEye2.classList.add("text-success"); */
    validacion.pass2 = true;
  } else {
    /* contraNueva1.classList.remove("border-success"); */
    contraNueva2.classList.remove("border-success");
    /* loginPassEye2.classList.remove("text-success"); */
    if(!contraNueva2.hasAttribute("disabled")) contraNueva2.classList.add("border-danger");
  }
  validar();
}

function validar(){
  if(validacion.pass0 && validacion.pass1 && validacion.pass2){
    cambiarPass.removeAttribute("disabled");
  } else cambiarPass.setAttribute("disabled","true");
}

/* Botón Cambiar Contraseña */
cambiarPass.addEventListener("click",async ()=>{
  let response = await changePassword(sessionStorage.getItem("email"),contraOriginal.value,contraNueva1.value,true);
  console.log(response);
  if(!response[0].verify) showAlert("ERROR","La contraseña original no es correcta. No se pudieron efectuar los cambios");
  else {
    showAlert("SUCCESS","Tu contraseña ha sido actualizada correctamente");
    contraOriginal.value="";
    contraNueva1.value="";
    contraNueva1.setAttribute("disabled","true");
    contraNueva2.value="";
    contraNueva2.setAttribute("disabled","true");
    loginPassEye2.classList.remove("text-success");
    loginPassEye2.classList.add("d-none");
    loginPassEye1.classList.remove("text-success");
    hideInvalidNumbers(contraOriginal);
    hideInvalidNumbers(contraNueva1);
    hideInvalidNumbers(contraNueva2);
    contraOriginal.classList.remove("border-success","border-danger");
    contraNueva1.classList.remove("border-success","border-danger");
    contraNueva2.classList.remove("border-success","border-danger");
    crt.classList.remove("text-success");
    may.classList.remove("text-success");
    min.classList.remove("text-success");
    num.classList.remove("text-success");
    esp.classList.remove("text-success");
  }
});

/* He olvidado mi contraseña */
forgPass.addEventListener("click",(e)=>{
  e.preventDefault();
  showInput("WARNING","Para poder acceder a tu cuenta debes recibir tu nueva contraseña provisional. Indica tu dirección de correo electrónico:","Correo Electrónico",(input)=>{
    showConfirm("WARNING","¿Deseas sustituir tu contraseña actual por la nueva contraseña que recibirás al email indicado ("+input+")?", async (input2)=>{
      showAlert("INFO","En breves momentos recibirás tu nueva contraseña en la dirección de correo indicada. Podrás cambiarla en tu perfil de usuario cuando inicies sesión");
      let result = await sendNewPass(input2,true);
      console.log(result);
    }, input);
  });
});