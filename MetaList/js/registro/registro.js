/* Variables DOM */
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

/* Eventos Mostrar/Ocultar Contraseña */
addShowPassSwitch(loginPassEye1, pass1);
addShowPassSwitch(loginPassEye2, pass2);

function showInvalidNumber(elm, num){
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  document.getElementById(id+num).classList.remove("d-none");
  elm.classList.add("is-invalid");
}

/* Validacion usuario */
usuario.addEventListener("blur",()=>{
  let expresion = new RegExp(/^[\wñç'ª\.@áéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ]{3,12}$/i);
  if(usuario.value.length==0) showInvalidNumber(usuario,1);
  else if(usuario.value.length<3) showInvalidNumber(usuario,2);
  else if(!expresion.test(usuario.value)) showInvalidNumber(usuario,3);
  else usuario.classList.remove("is-invalid");
});

/* Validacion email (y si no existe o existe sin validar) */
correo.addEventListener("blur",async ()=>{
  let expresion = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  if(correo.value.length==0) showInvalidNumber(correo,1);
  else if(!expresion.test(correo.value)) showInvalidNumber(correo,2);
  else {
    let data = await list("usuarios",true,["emailUsuario",correo.value]);
    if(data.response.length!=0) showInvalidNumber(correo,3);
    else correo.classList.remove("is-invalid");
  }
});

/* Actualizacion de criterios cumplidos de la contraseña (validacion contraseña 1) */
/* Validacion contraseña 2 */
/* Validacion de terminos y condiciones */
/* Deshabilitar botón hasta que esté todo validado */
/* Iniciar verificación: */
  // Se inserta o actualiza el ususario en bbdd con la hora
  // Se genera un codigo en cliente y se envia al servidor para enviar el correo
  // Se inicia el temporizador
/* Verificar codigo y actualizar o no en bbdd */
