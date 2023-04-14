let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");
let loginButton = document.getElementById("loginButton");
let loginPassEye = document.getElementById("loginPassEye");
let passView = false;

//Mostrar Contraseña
loginPassEye.addEventListener("click",()=>{
  if(passView){
    loginPass.type = "password";
    loginPassEye.classList.replace("bi-eye-slash-fill","bi-eye-fill");
    passView=false;
  } else {
    loginPass.type = "text";
    loginPassEye.classList.replace("bi-eye-fill","bi-eye-slash-fill");
    passView=true;
  }
});

//BOTÓN LOGIN
loginButton.addEventListener("click",(e)=>{
  e.preventDefault();
  if(loginEmail.value.length>0 && loginPass.value.length>0){
    
  }
});