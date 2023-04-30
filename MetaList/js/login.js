function addShowPassSwitch(loginPassEye, loginPass){
  console.log("addshowpassswitch")
  console.log(loginPassEye)
  console.log(loginPass)
  loginPassEye.addEventListener("click",()=>{
    if(/* passView */ loginPassEye.classList.contains("bi-eye-slash-fill")){
      loginPass.type = "password";
      loginPassEye.classList.replace("bi-eye-slash-fill","bi-eye-fill");
    } else {
      loginPass.type = "text";
      loginPassEye.classList.replace("bi-eye-fill","bi-eye-slash-fill");
    }
  });
}

function showUserOptions(show){
  if(show){
    document.getElementById("dropdownLogin").innerHTML = userOptions;
    document.getElementById("userName").textContent = sessionStorage.getItem("usuario");
    if(sessionStorage.getItem("foto")=="null") document.getElementById("userImgMini").src = "./imagenes/basico/user_MetaList.png";
    else document.getElementById("userImgMini").src = sessionStorage.getItem("foto");
    addLogoutEvent(document.getElementById("logOut"));
  } else {
    document.getElementById("dropdownLogin").innerHTML = loginForm;
    addLoginEvent(document.getElementById("loginButton"));
  }
}

async function login(email="", pass=""){
  console.log("Email="+email+", Pass="+pass);
  if(email.length>0 && pass.length>0){
    let usuarios = await list("usuarios",true,["emailUsuario",email]);
    console.log(usuarios);
    if(usuarios.response.length==1){
      let passVerif = await checkPassword(email, pass, true);
      console.log(passVerif);
      if(passVerif[0].coincidence){
        if(passVerif[0].verify){
          let usuario = usuarios.response[0];
          //Meter datos del usuario en sesión
          sessionStorage.setItem("email",usuario.email);
          sessionStorage.setItem("usuario",usuario.nombre);
          sessionStorage.setItem("foto",usuario.foto);
          sessionStorage.setItem("permisos",usuario.permisos);
          sessionStorage.setItem("notificaciones",usuario.notificaciones);
          sessionStorage.setItem("fecha",usuario.fecha);
          //Cambiar Opciones del Login
          showUserOptions(true);
          //Mensaje de éxito
          showAlert("SUCCESS","Bienvenido/a "+sessionStorage.getItem("usuario"));
        } else showAlert("ERROR","La contraseña indicada es incorrecta. Inténtalo de nuevo");
      } else showAlert("ERROR","No existe ningún usuario con la dirección de correo electrónico especificada");
    } else showAlert("ERROR","No existe ningún usuario con la dirección de correo electrónico especificada");
  } else if(email.length==0 && pass.length==0) showAlert("ERROR","Debes indicar tu dirección de correo electrónico y tu contraseña");
  else if(email.length==0) showAlert("ERROR","Debes indicar tu dirección de correo electrónico");
  else if(pass.length==0) showAlert("ERROR","Debes indicar tu contraseña");
}

function logout(){
  console.log("logout");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("foto");
  sessionStorage.removeItem("permisos");
  sessionStorage.removeItem("notificaciones");
  sessionStorage.removeItem("fecha");
  showUserOptions(false);
  showAlert("INFO","Se ha cerrado la sesión");
}

function addLoginEvent(loginButton){
  console.log("login")
  console.log(loginButton)
  if(loginButton){
    console.log("login in")
    addShowPassSwitch(document.getElementById("loginPassEye"),document.getElementById("loginPass"));
    loginButton.addEventListener("click",(e)=>{
      e.preventDefault();
      login(document.getElementById("loginEmail").value,document.getElementById("loginPass").value);
    });
  } 
}

function addLogoutEvent(logoutButton){
  console.log("LogOut Event");
  console.log(logoutButton);
  if(logoutButton) logoutButton.addEventListener("click",(e)=>{
    e.preventDefault();
    logout();
  });
}

//Si hay un usuario guardado en sesión se muestran las opciones del usuario
if(sessionStorage.getItem("email")) showUserOptions(true);
//Sino se añade el evento del botón login
else addLoginEvent(document.getElementById("loginButton"));