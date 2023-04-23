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
/* Expresiones Regulares */
let expresionUsuario = new RegExp(/^[\wñç'ª\.@áéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ]{3,12}$/i);
let expresionCorreo = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
let exprPass1 = new RegExp(/.{10}/);
let exprPass2 = new RegExp(/[A-ZÑÇÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛ]{1,}/);
let exprPass3 = new RegExp(/[a-zñçáéíóúàèìòùäëïöüâêîôû]{1,}/);
let exprPass4 = new RegExp(/\d{1,}/);
let exprPass5 = new RegExp(/[ºª!|"@·#$~%€&¬()=?'¿¡`^\[\+\*\]´¨{}<>,;.:\-_]{1,}/);
let expresionFoto = new RegExp(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ ]/g);
/* Criterios contraseña */
let criterios = [[exprPass1,crt],[exprPass2,may],[exprPass3,min],[exprPass4,num],[exprPass5,esp]];
/* Estado de Validación General */
let validacion = {user: false, email: false, pass1: false, pass2: false, terms: false};

/* Eventos Mostrar/Ocultar Contraseña */
addShowPassSwitch(loginPassEye1, pass1);
addShowPassSwitch(loginPassEye2, pass2);

function showInvalidNumber(elm, num){
  let id = "val"+elm.id[0].toUpperCase()+elm.id.substring(1);
  for(let frase of document.querySelectorAll("."+id)) frase.classList.add("d-none");
  document.getElementById(id+num).classList.remove("d-none");
  elm.classList.add("is-invalid");
  usuario.classList.remove("border-success");
}

/* Validacion usuario */
usuario.addEventListener("blur",()=>{
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
    validacion.pass1=true;
    validar();
  }
  else pass2.setAttribute("disabled","true");
  validPassRepeat();
});

/* Validación Contraseña 2 */
pass2.addEventListener("keyup",()=> validPassRepeat());

//Función Validar Coincidencia entre Contraseñas
function validPassRepeat(){
  if(pass2.value==pass1.value){
    pass1.classList.add("border-success");
    pass2.classList.add("border-success");
    loginPassEye1.classList.add("text-success");
    loginPassEye2.classList.add("text-success");
    validacion.pass2=true;
    validar();
  } else {
    pass1.classList.remove("border-success");
    pass2.classList.remove("border-success");
    loginPassEye1.classList.remove("text-success");
    loginPassEye2.classList.remove("text-success");
    validacion.pass2=false;
    validar();
  }
}

/* Validación Términos y Condiciones */
check2.addEventListener("change",()=>{
  if(check2.checked){
    validacion.terms=true;
    validar();
  } 
  else {
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

/* Iniciar verificación: */
  // Se inserta o actualiza el ususario en bbdd con la hora
  // Se genera un codigo en cliente y se envia al servidor para enviar el correo
  // Se inicia el temporizador
  botonVerificar1.addEventListener("click", async ()=>{
    //Se incluye el usuario provisional si no existe en la base de datos, si existe se actualizan los datos
    let data = await list("usuarios",true,["emailUsuario",correo.value]);
    if(data.response.length==0){
      post("usuarios",true,[{
        nombreUsuario: usuario.value,
        emailUsuario: correo.value,
        contraUsuario: pass1.value,
        fotoUsuario: (foto.files.length==0) ? null : correo.value.replace(expresionFoto,'_')+"-"+usuario.value.replace(expresionFoto,'_')+"-"+foto.files[0].name,
        notificacionesUsuario: (check1.checked) ? "SI" : "NO",
        nivelPermisosUsuario: 0
      }]);
    } else if(data.response[0].permisos==0){ //PENDIENTEEEEEEEE

    } 
    
    //Si incluye foto se sube al servidor
    if(foto.files.length>0){
      let fd = new FormData();
      fd.append("foto", foto.files[0]);
    }
  });

/* Verificar codigo y actualizar o no en bbdd */
/* Cancelar Verificación */