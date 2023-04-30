let loginForm = `
  <button type="button" class="btn text-white dropdown-toggle py-2 px-4" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    <i class="bi bi-person-fill"></i>
    <span class="d-none d-sm-inline-block" id="userName">Login</span>
  </button>
  <form action="" method="get" class="dropdown-menu dropdown-menu-end p-4 w-50" id="loginForm">
    <div class="mb-3">
      <label for="loginEmail" class="form-label">Email</label>
      <input type="email" class="form-control" id="loginEmail" placeholder="email@ejemplo.com" required>
    </div>
    <div class="mb-3">
      <label for="loginPass" class="form-label">Contraseña</label>
      <div class="position-relative">
        <input type="password" class="form-control" id="loginPass" placeholder="Contraseña" required>
        <i id="loginPassEye" class="bi bi-eye-fill position-absolute top-50 end-0 translate-middle-y me-2"></i>
      </div>
    </div>
    <div class="text-center"><button type="submit" class="btn btn-primary" id="loginButton">Iniciar Sesión</button></div>
    <hr class="mt-4">
    <div id="regist" class="text-center">
      <label for="regist" class="form-label">¿No tienes cuenta?</label>
      <div><a href="./registro.html">Regístrate</a></div>
    </div>
  </form>
`;
let userOptions = `
  <button type="button" class="btn text-white dropdown-toggle py-2 px-4" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    <i class="bi bi-person-fill"></i>
    <span class="d-none d-sm-inline-block" id="userName">Login</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-end" id="userOptions">
    <li><a class="dropdown-item position-relative" href="perfil.html"><i class="bi bi-person-square me-2 text-primary"></i>Perfil
      <div class="position-absolute top-100 end-0 mt-2 me-2 shadow-sm rounded" id="userImgDrop">
        <img src="./imagenes/usuarios/ElUroboro77.webp" class="rounded" id="userImgMini" alt="Foto de Perfil">
      </div>
    </a></li>
    <li><a class="dropdown-item" href="favoritos.html"><i class="bi bi-heart-fill me-2"></i>Favoritos</a></li>
    <li><a class="dropdown-item" href="recomendaciones.html"><i class="bi bi-star-fill me-2"></i>Recomendaciones</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#"><i class="bi bi-door-closed-fill me-2"></i>Cerrar Sesión</a></li>
  </ul>
`;

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

function showAlert(tipo,txt){
  tipo = tipo.trim().toLowerCase();
  let tipos = {
    success: {i: "bi-check-circle-fill", bg: "bg-success bg-gradient", color: "text-white"},
    info: {i: "bi-info-circle-fill", bg: "bg-primary bg-gradient", color: "text-white"},
    warning: {i: "bi-exclamation-triangle-fill", bg: "bg-warning bg-gradient", color: "text-dark"},
    error: {i: "bi-x-octagon-fill", bg: "bg-danger bg-gradient", color: "text-white"},
  }
  document.getElementById("alertTemplate").innerHTML=`
    <button class="btn btn-primary d-none" id="alertStart" type="button" data-bs-toggle="offcanvas" data-bs-target="#alertBack" aria-controls="alertBack"></button>
    <div class="offcanvas offcanvas-top ${tipos[tipo].bg} m-3 rounded shadow" tabindex="-1" id="alertBack" aria-labelledby="alertBackLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title ${tipos[tipo].color} me-3 fs-6" id="alertBackLabel">
          <i class="bi ${tipos[tipo].i} align-middle me-2" id="alertIcon"></i>
          <span id="alertText">${txt}</span>
        </h5>
        <button type="button" class="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
    </div>
  `;
  document.getElementById("alertStart").dispatchEvent(new Event("click"));
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
          document.getElementById("dropdownLogin").innerHTML = userOptions;
          document.getElementById("userName").textContent = sessionStorage.getItem("usuario");
          if(sessionStorage.getItem("foto")=="null") document.getElementById("userImgMini").src = "./imagenes/basico/user_MetaList.png";
          else document.getElementById("userImgMini").src = sessionStorage.getItem("foto");
          //Mensaje de éxito
          showAlert("SUCCESS","Bienvenido/a "+sessionStorage.getItem("usuario"));
        } else showAlert("ERROR","La contraseña indicada es incorrecta. Inténtalo de nuevo");
      } else showAlert("ERROR","No existe ningún usuario con la dirección de correo electrónico especificada");
    } else showAlert("ERROR","No existe ningún usuario con la dirección de correo electrónico especificada");
  } else if(email.length==0 && pass.length==0) showAlert("ERROR","Debes indicar tu dirección de correo electrónico y tu contraseña");
  else if(email.length==0) showAlert("ERROR","Debes indicar tu dirección de correo electrónico");
  else if(pass.length==0) showAlert("ERROR","Debes indicar tu contraseña");
}

document.getElementById("loginButton").addEventListener("click",()=>login(document.getElementById("loginEmail").value,document.getElementById("loginPass").value));