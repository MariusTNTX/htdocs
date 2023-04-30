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
    <li><a class="dropdown-item" href="#" id="logOut"><i class="bi bi-door-closed-fill me-2"></i>Cerrar Sesión</a></li>
  </ul>
`;

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

