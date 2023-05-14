let tiposAlert = {
  success: {i: "bi-check-circle-fill", bg: "bg-success bg-gradient", color: "text-white"},
  info: {i: "bi-info-circle-fill", bg: "bg-primary bg-gradient", color: "text-white"},
  warning: {i: "bi-exclamation-triangle-fill", bg: "bg-warning bg-gradient", color: "text-dark"},
  error: {i: "bi-x-octagon-fill", bg: "bg-danger bg-gradient", color: "text-white"},
  input: {i: "bi-question-diamond-fill", bg: "bg-dark bg-gradient", color: "text-white"},
}

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
    <div class="text-center mb-2"><button type="submit" class="btn btn-primary" id="loginButton">Iniciar Sesión</button></div>
    <div class="mb-3 text-center">
      <a href="#" id="forgPass">He olvidado mi contraseña</a>
    </div>
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
  document.getElementById("alertTemplate").innerHTML=`
    <button class="btn btn-primary d-none" id="alertStart" type="button" data-bs-toggle="offcanvas" data-bs-target="#alertBack" aria-controls="alertBack"></button>
    <div class="offcanvas offcanvas-top ${tiposAlert[tipo].bg} m-3 rounded shadow" tabindex="-1" id="alertBack" data-bs-scroll="true" data-bs-backdrop="false" aria-labelledby="alertBackLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title ${tiposAlert[tipo].color} me-3 fs-6" id="alertBackLabel">
          <i class="bi ${tiposAlert[tipo].i} align-middle me-2" id="alertIcon"></i>
          <span id="alertText">${txt}</span>
        </h5>
        <button type="button" class="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
    </div>
  `;
  document.getElementById("alertStart").dispatchEvent(new Event("click"));
}

function showConfirm(tipo,txt,yesFunc=null,data=null){
  tipo = tipo.trim().toLowerCase();
  document.getElementById("alertTemplate").innerHTML=`
    <button class="btn btn-primary d-none" id="alertStart" type="button" data-bs-toggle="offcanvas" data-bs-target="#alertBack" aria-controls="alertBack"></button>
    <div class="offcanvas offcanvas-top ${tiposAlert[tipo].bg} m-3 rounded shadow" tabindex="-1" id="alertBack" data-bs-scroll="true" data-bs-backdrop="false" aria-labelledby="alertBackLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title ${tiposAlert[tipo].color} me-3 fs-6" id="alertBackLabel">
          <i class="bi ${tiposAlert[tipo].i} align-middle me-2" id="alertIcon"></i>
          <span id="alertText">${txt}</span>
        </h5>
        <button type="button" class="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body pt-0 text-end">
        <div class="less p-0 d-inline-block"><button class="btn btn-secondary" id="alertCancel">Cancelar</button></div>
        <div class="more p-0 d-inline-block ms-1"><button class="btn btn-primary" id="alertAcept">Aceptar</button></div>
      </div>
    </div>
  `;
  document.getElementById("alertStart").dispatchEvent(new Event("click"));
  document.getElementById("alertAcept").addEventListener("click",()=>{
    document.querySelector(".offcanvas-header .btn-close").dispatchEvent(new Event("click"));
    if(yesFunc && data) yesFunc(data);
    else if(yesFunc) yesFunc();
  });
  document.getElementById("alertCancel").addEventListener("click",()=>{
    document.querySelector(".offcanvas-header .btn-close").dispatchEvent(new Event("click"));
  });
}

function showInput(tipo,txt,placeholder="",yesFunc=null,data=null){
  tipo = tipo.trim().toLowerCase();
  document.getElementById("alertTemplate").innerHTML=`
    <button class="btn btn-primary d-none" id="alertStart" type="button" data-bs-toggle="offcanvas" data-bs-target="#alertBack" aria-controls="alertBack"></button>
    <div class="offcanvas offcanvas-top ${tiposAlert[tipo].bg} m-3 rounded shadow" tabindex="-1" id="alertBack" data-bs-scroll="true" data-bs-backdrop="false" aria-labelledby="alertBackLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title ${tiposAlert[tipo].color} me-3 fs-6" id="alertBackLabel">
          <i class="bi ${tiposAlert[tipo].i} align-middle me-2" id="alertIcon"></i>
          <span id="alertText">${txt}</span>
        </h5>
        <button type="button" class="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <form class="offcanvas-body pt-0" id="alertForm">
        <div class="mb-3 mt-1">
          <input type="text" class="form-control mx-auto" id="alertInput" placeholder="${placeholder}" required>
        </div>
        <div class="text-end">
          <div class="more p-0 d-inline-block ms-1"><button class="btn btn-primary" id="alertAcept">Aceptar</button></div>
        </div>
      </form>
    </div>
  `;
  document.getElementById("alertStart").dispatchEvent(new Event("click"));
  document.getElementById("alertForm").addEventListener("submit",(e)=>e.preventDefault());
  document.getElementById("alertAcept").addEventListener("click",(e)=>{
    if(document.getElementById("alertInput").value.length>0){
      e.preventDefault();
      document.querySelector(".offcanvas-header .btn-close").dispatchEvent(new Event("click"));
      if(yesFunc) yesFunc(document.getElementById("alertInput").value);
    }
  });
}

function secToTime(segs){
  let horas = Math.floor(segs / 3600);
  let minutos = Math.floor((segs % 3600) / 60);
  let segundos = segs % 60;
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;
  if(horas!=='00') return horas + ":" + minutos + ":" + segundos;
  else return minutos + ":" + segundos;
}

function addPoints(num){
  num = num.split('').reverse().join('');
  let resultado = "";
  for(let i=0; i<num.length; i++){
    if(i%3==0 && i!=0) resultado = num[i]+'.'+resultado;
    else resultado = num[i]+resultado;
  }
  return resultado;
}