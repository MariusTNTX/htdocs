let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");
let loginButton = document.getElementById("loginButton");
let loginPassEye = document.getElementById("loginPassEye");

//Mostrar Contraseña
addShowPassSwitch(loginPassEye,loginPass);

//BOTÓN LOGIN
loginButton.addEventListener("click",(e)=>{
  e.preventDefault();
  if(loginEmail.value.length>0 && loginPass.value.length>0){
    
  }
});