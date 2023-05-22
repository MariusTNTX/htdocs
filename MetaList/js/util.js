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
    <li><a class="dropdown-item" href="favoritos.html"><i class="bi bi-heart-fill text-red me-2"></i>Favoritos</a></li>
    <li id="adminOption" class="d-none"><a class="dropdown-item" href="administracion.html"><i class="bi bi-star-fill me-2"></i>Administración</a></li>
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
        <div class="less2 p-0 d-inline-block"><button class="btn btn-secondary" id="alertCancel">Cancelar</button></div>
        <div class="less2 p-0 d-inline-block ms-1"><button class="btn btn-primary" id="alertAcept">Aceptar</button></div>
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
          <div class="less2 p-0 d-inline-block ms-1"><button class="btn btn-primary" id="alertAcept">Aceptar</button></div>
        </div>
      </form>
    </div>`;
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
  try{
    num = num.split('').reverse().join('');
    let resultado = "";
    for(let i=0; i<num.length; i++){
      if(i%3==0 && i!=0) resultado = num[i]+'.'+resultado;
      else resultado = num[i]+resultado;
    }
    return resultado;
  } catch(e){
    return "???";
  }
}

function calcularEdad(fecha) {
  console.log("Calcular Edad:",fecha);
  divis = fecha.split("-");
  if(divis[0]=="null") return "Edad Desconocida";
  else {
    if(divis[1]=="null") fecha = divis[0]+"-1-1";
    else if(divis[2]=="null") fecha = divis[0]+divis[1]+"-1";
    var hoy = new Date();
    var fechaNacimiento = new Date(fecha);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad+" años";
  }
}

function getURLParameters(){
  let params = new URLSearchParams(window.location.search);
  let parametros = {};
  for (let [key, value] of params.entries()) {
    parametros[key] = value;
  }
  return parametros;
}

function getHistoryStage(anio){
  let etapas = ['Proto-Metal','Periodo de formación','Periodo mainstream de los 80s','Periodo underground','Renacimiento de los 2000','Periodo alternativo','Etapa Moderna'];
  if(anio<=1969) return etapas[0];
  else if(anio<=1979) return etapas[1];
  else if(anio<=1990) return etapas[2];
  else if(anio<=1996) return etapas[3];
  else if(anio<=2003) return etapas[4];
  else if(anio<=2008) return etapas[5];
  else return etapas[5];
}

function getStages(stages){
  console.log("getStages",stages)
  let txt="";
  for(let stage of stages){
    txt += (txt.length>0)?" | ":"";
    if(stage.anioInicio==stage.anioFin) txt += stage.anioInicio;
    else if(stage.anioFin==null) txt += stage.anioInicio+" - Actualidad";
    else txt += stage.anioInicio+" - "+stage.anioFin;
  }
  return txt;
}

function getBandLyricThemes(themes){
  console.log("getBandLyricThemes",themes)
  let txt="";
  for(let theme of themes){
    txt += (txt.length>0)?" | ":"";
    txt += theme.tema;
  }
  return txt;
}

async function setHeart(params){
  console.log("SET HEART")
  let elm = params.element;
  let heart1 = document.getElementById("heart1");
  let heart2 = document.getElementById("heart2");
  let elemento = (elm=='band')?'bandas_favoritas':'albumes_favoritos';
  let parametros = (elm=='band')?[['nombreBanda',params.band]]:[['nombreBanda',params.band],['nombreAlbum',params.album]];
  console.log("BÚSQUEDA DE FAVORITOS:")
  if(sessionStorage.getItem("email")){
    let favs = await list(elemento,true,['emailUsuario',sessionStorage.getItem("email")],...parametros);
    if(favs.response.length>0){
      sessionStorage.setItem('favorito','SI');
      heart1.classList.add("hid");
      heart2.classList.remove("hid");
    } else sessionStorage.setItem('favorito','NO');
  } else {
    heart1.classList.remove("hid");
    heart2.classList.add("hid");
  }
}

async function loadRandomElement(element){
  if(element=='Band'){
    let banda = await list("bandas",true,['escuchasBanda_Min',1],['order','RAND()'],['limit',1]);
    banda = banda.response;
    location.href = `visor.html?element=band&band=${banda[0].banda}`;
  } else if(element=='Album'){
    let album = await list("albumes",true,['escuchasAlbum_Min',1],['order','RAND()'],['limit',1]);
    album = album.response;
    location.href = `visor.html?element=album&band=${album[0].banda}&album=${album[0].album}`;
  } else if(element=='Label'){
    let label = await list("discograficas",true,['estatusDiscografica_Like','a'],['order','RAND()'],['limit',1]);
    label = label.response;
    location.href = `visor.html?element=label&label=${label[0].discografica}`;
  } else if(element=='Musician'){
    let musician = await list("musicos",true,['sexoMusico_Like','e'],['order','RAND()'],['limit',1]);
    musician = musician.response;
    location.href = `visor.html?element=musician&musician=${musician[0].musico}`;
  }
}

//Asignación de eventos de carga de elementos aleatorios
for(let a of document.querySelectorAll(".randomElement")){
  a.addEventListener("click",(e)=>{
    e.preventDefault();
    loadRandomElement(e.target.id.replace("random",""));
  });
}

//Asignación de URL al botón de regreso a la parte superior
document.querySelector(".back-to-top").href=(location.href.includes("#"))?location.href:location.href+"#";