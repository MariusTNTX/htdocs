/* Variables DOM */
let fechaUsuario = document.getElementById("fechaUsuario");
let fotoUsuario = document.getElementById("fotoUsuario");
let nombreUsuario = document.getElementById("nombreUsuario");
let emailUsuario = document.getElementById("emailUsuario");
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
/* Criterios contraseña */
let criterios = [[exprPass1,crt],[exprPass2,may],[exprPass3,min],[exprPass4,num],[exprPass5,esp]];
/* Estado de Validación General */
let validacion = {pass0: false, pass1: false, pass2: false};

/* Fecha */
let fec = new Date(sessionStorage.getItem("fecha"));
fechaUsuario.innerHTML = fec.getDate() + "/" + (fec.getMonth()+1) + "/" + fec.getFullYear();
/* Foto */
fotoUsuario.src = sessionStorage.getItem("foto");
/* Usuario */
nombreUsuario.value = sessionStorage.getItem("usuario");
/* Email */
emailUsuario.textContent = sessionStorage.getItem("email");

//---------

/* Eventos Mostrar/Ocultar Contraseña */
addShowPassSwitch(loginPassEye1, contraOriginal);
addShowPassSwitch(loginPassEye2, contraNueva1);

function showInvalidNumber(elm, num){
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  document.getElementById(id+num).classList.remove("d-none");
  elm.classList.add("border-danger");
  elm.classList.remove("border-success");
  elm.parentElement.classList.replace("mb-3","mb-5");
}

function hideInvalidNumbers(elm){
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  elm.classList.remove("border-danger");
  elm.classList.add("border-success");
  elm.parentElement.classList.replace("mb-5","mb-3");
}

/* Validacion usuario */
nombreUsuario.addEventListener("blur",()=>{
  console.log("blur nombreUsuario")
  if(nombreUsuario.value.length==0) showInvalidNumber(nombreUsuario,1);
  else if(nombreUsuario.value.length<3) showInvalidNumber(nombreUsuario,2);
  else if(!expresionUsuario.test(nombreUsuario.value)) showInvalidNumber(nombreUsuario,3);
  else {
    nombreUsuario.classList.remove("border-danger");
    nombreUsuario.classList.add("border-success");
  }
});

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

/* Validación Foto Usuario */
fotoUsuario.addEventListener("change", async ()=>{
  let ext = (fotoUsuario.files[0]) ? fotoUsuario.files[0].name.substring(fotoUsuario.files[0].name.lastIndexOf(".")+1) : "";
  if(fotoUsuario.files.length>0 && !expresionFoto.test(ext)){ //Si hay una foto seleccionada y su formato no es correcto se muestra en rojo con el mensaje de error
    showAlert("ERROR",'Los archivos con la estensión ".'+ext+'" no están permitidos');
  } else if(fotoUsuario.files.length>0 && expresionFoto.test(ext)){ //Si hay una foto seleccionada y su formato es correcto se quitan los mensajes y se muestra en verde
    //TODO Subir a base de datos
    let fd = new FormData(regForm);
    let nombreFoto = new Date().getTime()+new Date().getMilliseconds()+fotoUsuario.files[0].name.substring(fotoUsuario.files[0].name.lastIndexOf("."));
    let data = await list("usuarios",true,["emailUsuario",sessionStorage.getItem("email")]);
    if(!data.response[0].fotoUsuario) await setFormData("usuarios",true,fd,nombreFoto,correo.value);
    else await replaceFormData("usuarios",true,fd,nombreFoto,correo.value);
  }
  /* await deleteFormData("usuarios",true,fd,correo.value); */
});

function validar(){
  console.log(validacion)
  if(validacion.pass0 && validacion.pass1 && validacion.pass2){
    cambiarPass.removeAttribute("disabled");
  } else cambiarPass.setAttribute("disabled","true");
}

/* Botón Cambiar Contraseña */
cambiarPass.addEventListener("click",async ()=>{
  let response = await changePassword(sessionStorage.getItem("email"),contraOriginal.value,contraNueva1.value,true);
  console.log(response);
  if(!response[0].verify) showAlert("ERROR","La contraseña original no es correcta. No se pudieron efectuar los cambios");
  else showAlert("SUCCESS","Tu contraseña ha sido actualizada correctamente");
});