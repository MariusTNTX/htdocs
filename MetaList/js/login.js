var defaultFoto = "http://localhost/MetaList/imagenes/basico/user_MetaList.png";

function addShowPassSwitch(loginPassEye, loginPass){
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
    console.log("Permisos: ",parseInt(sessionStorage.getItem("permisos")))
    if(parseInt(sessionStorage.getItem("permisos"))>1) document.getElementById("adminOption").classList.remove("d-none");
    if(sessionStorage.getItem("foto")=="null") document.getElementById("userImgMini").src = defaultFoto;
    else document.getElementById("userImgMini").src = sessionStorage.getItem("foto");
    addLogoutEvent(document.getElementById("logOut"));
  } else {
    document.getElementById("dropdownLogin").innerHTML = loginForm;
    addLoginEvent(document.getElementById("loginButton"));
  }
}

function addForgPass(forgPass){
  forgPass.addEventListener("click",(e)=>{
    e.preventDefault();
    showInput("INFO","Para poder acceder a tu cuenta debes recibir tu nueva contraseña provisional. Indica tu dirección de correo electrónico:","Correo Electrónico",(input)=>{
      showConfirm("INFO","¿Deseas sustituir tu contraseña actual por la nueva contraseña que recibirás al email indicado ("+input+")?", async (input2)=>{
        showAlert("INFO","En breves momentos recibirás tu nueva contraseña en la dirección de correo indicada. Podrás cambiarla en tu perfil de usuario cuando inicies sesión");
        let result = await sendNewPass(input2,true);
        console.log(result);
      }, input);
    });
  });
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
          if(usuario.foto!=null) sessionStorage.setItem("foto",usuario.foto);
          else sessionStorage.setItem("foto",defaultFoto);
          sessionStorage.setItem("permisos",usuario.permisos);
          sessionStorage.setItem("notificaciones",usuario.notificaciones);
          sessionStorage.setItem("fecha",usuario.fecha);
          //Cambiar Opciones del Login
          showUserOptions(true);
          //Cambiar corazón (solo para visores)
          if(location.href.includes("visor.html") && (getURLParameters().element=='band' || getURLParameters().element=='album')){
            setHeart(getURLParameters());
          }
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
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("foto");
  sessionStorage.removeItem("permisos");
  sessionStorage.removeItem("notificaciones");
  sessionStorage.removeItem("fecha");
  if(location.href.includes("perfil.html")) location.href="index.html";
  else {
    if(location.href.includes("visor.html") && (getURLParameters().element=='band' || getURLParameters().element=='album')) setHeart(getURLParameters());
    console.log("logout");
    showUserOptions(false);
    showAlert("INFO","Se ha cerrado la sesión");
  }
}

function addLoginEvent(loginButton){
  if(loginButton){
    addShowPassSwitch(document.getElementById("loginPassEye"),document.getElementById("loginPass"));
    addForgPass(document.getElementById("forgPass"));
    loginButton.addEventListener("click",(e)=>{
      e.preventDefault();
      login(document.getElementById("loginEmail").value,document.getElementById("loginPass").value);
    });
  } 
}

function addLogoutEvent(logoutButton){
  if(logoutButton) logoutButton.addEventListener("click",(e)=>{
    e.preventDefault();
    logout();
  });
}

//Nuevos Usuarios
let url = location.href;
if(url.includes("index.html?")){
  url = url.substring(url.indexOf("?")+1);
  if(url == "newLogin") showAlert("SUCCESS",'Felicidades, ya tienes tu propia cuenta de MetaList. Puedes iniciar sesión en el apartado "Login" con tu email y tu contraseña');
}

//Si hay un usuario guardado en sesión se muestran las opciones del usuario
if(sessionStorage.getItem("email")) showUserOptions(true);
//Sino se añade el evento del botón login
else addLoginEvent(document.getElementById("loginButton"));