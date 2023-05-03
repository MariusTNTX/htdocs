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

/* Fecha */
let fec = new Date(sessionStorage.getItem("fecha"));
fechaUsuario.innerHTML = fec.getDate() + "/" + (fec.getMonth()+1) + "/" + fec.getFullYear();
/* Foto */
fotoUsuario.src = sessionStorage.getItem("foto");
/* Usuario */
nombreUsuario.value = sessionStorage.getItem("usuario");
/* Email */
emailUsuario.value = sessionStorage.getItem("email");

//---------

/* Eventos Mostrar/Ocultar Contraseña */
addShowPassSwitch(loginPassEye1, contraOriginal);
addShowPassSwitch(loginPassEye2, contraNueva1);

function showInvalidNumber(elm, num){
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  document.getElementById(id+num).classList.remove("d-none");
  elm.classList.add("is-invalid");
  elm.classList.remove("border-success");
}

/* Validacion usuario */
nombreUsuario.addEventListener("blur",()=>{
  console.log("blur nombreUsuario")
  if(nombreUsuario.value.length==0) showInvalidNumber(nombreUsuario,1);
  else if(nombreUsuario.value.length<3) showInvalidNumber(nombreUsuario,2);
  else if(!expresionUsuario.test(nombreUsuario.value)) showInvalidNumber(nombreUsuario,3);
  else {
    nombreUsuario.classList.remove("is-invalid");
    nombreUsuario.classList.add("border-success");
  }
});

/* Validación Contraseña Original */
contraOriginal.addEventListener("blur", async ()=>{
  if(contraOriginal.value.length>0){
    let passVerif = await checkPassword(sessionStorage.getItem("email"), contraOriginal.value, true);
    if(passVerif[0].coincidence && passVerif[0].verify){
      contraOriginal.classList.remove("is-invalid");
      contraOriginal.classList.add("border-success");
      contraOriginal.classList.remove("border-danger");
      contraNueva1.removeAttribute("disabled");
      loginPassEye1.classList.add("text-success");
    } else {
      contraNueva1.setAttribute("disabled","true");
      contraNueva1.classList.remove("border-success");
      contraOriginal.classList.add("border-danger");
      loginPassEye1.classList.remove("text-success");
      showInvalidNumber(contraOriginal,2);
    }
  } else showInvalidNumber(contraOriginal,1);
});

/* Validación Nueva Contraseña 1 */
contraNueva1.addEventListener("keyup",()=>{
  let full = true;
  for(let criterio of criterios){
    if(criterio[0].test(contraNueva1.value)) criterio[1].classList.add("text-success");
    else {
      criterio[1].classList.remove("text-success");
      full = false;
    }
  }
  if(full){
    contraNueva2.removeAttribute("disabled");
    contraNueva1.classList.add("border-success");
    contraNueva1.classList.remove("border-danger");
  } else {
    contraNueva2.setAttribute("disabled","true");
    contraNueva1.classList.remove("border-success");
    contraNueva1.classList.add("border-danger");
  }
  validPassRepeat();
});

/* Validación Contraseña 2 */
contraNueva2.addEventListener("keyup",()=> validPassRepeat());

//Función Validar Coincidencia entre Contraseñas
function validPassRepeat(){
  if(contraNueva1.value.length>0 && contraNueva2.value==contraNueva1.value){
    contraNueva1.classList.add("border-success");
    contraNueva2.classList.remove("border-danger");
    contraNueva2.classList.add("border-success");
    loginPassEye1.classList.add("text-success");
  } else {
    contraNueva1.classList.remove("border-success");
    contraNueva2.classList.remove("border-success");
    loginPassEye1.classList.remove("text-success");
    if(!contraNueva2.hasAttribute("disabled")) contraNueva2.classList.add("border-danger");
  }
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
