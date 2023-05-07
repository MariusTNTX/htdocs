/* LISTAS */
let albumTypes = ["Estudio","EP","Recopilatorio","Boxset","En Vivo","Demo","Single","Video","Split"];
let genres = ["Alternative Metal","Black Metal","Crossover Thrash Metal","Deathcore","Death Metal","Djent","Doom Metal","Folk Metal","Glam Metal","Groove Metal","Gothic Metal","Grindcore","Heavy Metal","Industrial Metal","Melodic Death Metal","Metalcore","Nu Metal","NWOBHM","Power Metal","Progressive Metal","Sludge Metal","Speed Metal","Stoner Metal","Symphonic Metal","Technical Death Metal","Thrash Metal","Viking Metal"];
let countries = ["Alemania","Australia","Bélgica","Brasil","Canadá","Dinamarca","España","Estados Unidos","Finlandia","Francia","Grecia","Italia","Japón","Noruega","Paises Bajos","Polonia","Reino Unido","Rusia","Suecia","Suiza","Ucrania"];

/* CAMPOS */
let campos = {
  anioAlbum: {type: "interval", name: "Año de Lanzamiento", reqName: "anioAlbum", min: 1968, max: new Date().getFullYear(), sufix: "", step: 1},
  puntuacionAlbum: {type: "interval", name: "Puntuación", reqName: "puntuacionAlbum", min: 0, max: 5000, sufix: "P", step: 50},
  escuchasAlbum: {type: "interval", name: "Escuchas", reqName: "escuchasAlbum", min: 0, max: 1000000, sufix: "k", step: 10},
  visitasAlbum: {type: "interval", name: "Visitas del Álbum", reqName: "visitasAlbum", min: 0, max: 1000, sufix: "", step: 1},
  visitasBanda: {type: "interval", name: "Visitas de la Banda", reqName: "visitasBanda", min: 0, max: 1000, sufix: "", step: 10},
  likesAlbum: {type: "interval", name: "Likes", reqName: "likesAlbum", min: 0, max: 1000, sufix: "", step: 10}, // ¿Cambiar tabla albumes por puntuacion_albumes?
  duracionAlbum: {type: "interval", name: "Duración", reqName: "duracionAlbum", min: 0, max: 6000, sufix: "", step: 5},
  estrellasCancionAlbum: {type: "interval", name: "Estrellas de Canción", reqName: "estrellasCancionAlbum", min: 0, max: 3, sufix: "", step: 1},
  estrellasGeneroAlbum: {type: "interval", name: "Estrellas de Género de Álbum", reqName: "estrellasGeneroAlbum", min: 0, max: 5, sufix: "", step: 1},
  estrellasGeneroBanda: {type: "interval", name: "Estrellas de Género de Banda", reqName: "estrellasGeneroBanda", min: 0, max: 5, sufix: "", step: 1},

  tipoAlbum: {type: "check", name: "Tipo de Álbum", reqName: "tipoAlbum", list: albumTypes},
  paisBanda: {type: "check", name: "Países", reqName: "paisBanda", list: countries},
  nombreGeneroAlbum: {type: "check", name: "Géneros de Álbum", reqName: "nombreGeneroAlbum", list: genres},
  nombreGeneroBanda: {type: "check", name: "Géneros de Banda", reqName: "nombreGeneroBanda", list: genres},

  nombreAlbum: {type: "text", name: "Título del Álbum", reqName: "nombreAlbum"},
  nombreBanda: {type: "text", name: "Banda", reqName: "nombreBanda"},
  nombreDiscografica: {type: "text", name: "Discográfica", reqName: "nombreDiscografica"},
  nombreEstudio: {type: "text", name: "Estudio de Grabación", reqName: "nombreEstudio"},
  nombreMusico: {type: "text", name: "Músico de Álbum", reqName: "nombreMusico"},
  nombreMusicoEtapa: {type: "text", name: "Músico de Banda", reqName: "nombreMusicoEtapa"},
  rolMusico: {type: "text", name: "Rol de Músico", reqName: "rolMusico"},
  temaLetraBanda: {type: "text", name: "Tema de Letra", reqName: "temaLetraBanda"},
  nombreCancion: {type: "text", name: "Nombre de Canción", reqName: "nombreCancion"},
}

let metadata = {
  albums: {
    mainSearch: campos.nombreAlbum,
    checks: [],
    intervals: [campos.anioAlbum, campos.puntuacionAlbum, campos.escuchasAlbum, campos.visitasAlbum, campos.visitasBanda, campos.likesAlbum, 
                campos.duracionAlbum, campos.estrellasCancionAlbum, campos.estrellasGeneroAlbum, campos.estrellasGeneroBanda],
    categories: [campos.tipoAlbum, campos.nombreGeneroAlbum, campos.nombreGeneroBanda, campos.paisBanda],
    reductions: [campos.nombreBanda, campos.nombreDiscografica, campos.nombreEstudio, campos.nombreMusico, campos.nombreMusicoEtapa, 
                campos.rolMusico, campos.temaLetraBanda, campos.nombreCancion],
  }
};

function newFilter(elm){

  // MAIN SEARCH
  let mainSearch = `
    <input type="text" class="mainTitle ${metadata[elm].mainSearch.reqName} form-control" name="busq" id="mainTitle" placeholder="${metadata[elm].mainSearch.name}">
    <label for="busq">${metadata[elm].mainSearch.name}</label>
  `;

  // INTERVALS
  let intervals = ``;
  for(let intv of metadata[elm].intervals){
    intervals += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="${intv.reqName}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${intv.reqName}" aria-expanded="false" aria-controls="collapse${intv.reqName}">
            ${intv.name}
          </button>
        </h2>
        <div id="collapse${intv.reqName}" class="accordion-collapse collapse" aria-labelledby="${intv.reqName}"
          data-bs-parent="#intervalsAccordion">
          <div class="accordion-body">
            <div class="row">
              <h6>Desde:</h6>
              <div class="col-12 text-center">
                <input id="${intv.reqName}Desde1" type="range" class="form-range" value="${intv.min}" min="${intv.min}" max="${intv.max}" step="${intv.step}">
              </div>
              <div class="col-6 col-md-12 text-center mx-auto">
                <input type="number" class="interval ${intv.reqName}_Min" name="${intv.reqName}1" id="${intv.reqName}Desde2" min="${intv.min}" max="${intv.max}" step="${intv.step}"> ${intv.sufix}
              </div>
              <h6>Hasta:</h6>
              <div class="col-12 text-center">
                <input id="${intv.reqName}Hasta1" type="range" class="form-range" value="${intv.min}" min="${intv.min}" max="${intv.max}" step="${intv.step}">
              </div>
              <div class="col-6 col-md-12 text-center mx-auto">
                <input type="number" class="interval ${intv.reqName}_Max" name="${intv.reqName}2" id="${intv.reqName}Hasta2" min="${intv.min}" max="${intv.max}" step="${intv.step}"> ${intv.sufix}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // CATEORIES
  let categories = ``;
  for(let cat of metadata[elm].categories){
    categories += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="h${cat.reqName}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c${cat.reqName}" aria-expanded="false" aria-controls="c${cat.reqName}">
            ${cat.name}
          </button>
        </h2>
        <div id="c${cat.reqName}" class="accordion-collapse collapse" aria-labelledby="h${cat.reqName}" data-bs-parent="#categoriesAccordion">
          <div class="accordion-body">`;
    for(let c of cat.list){
      categories+=`<div class="form-check"><input type="checkbox" class="category ${cat.reqName} form-check-input" name="${cat.reqName}${c}" id="${c}"><label for="${c}" class="form-check-label">${c}</label></div>`;
    }
    categories+=`</div></div></div>`;
  }

  // REDUCTIONS
  let reductions = ``;
  for(let red of metadata[elm].reductions){
    reductions += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="h${red.reqName}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#c${red.reqName}" aria-expanded="false" aria-controls="c${red.reqName}">
            ${red.name}
          </button>
        </h2>
        <div id="c${red.reqName}" class="accordion-collapse collapse" aria-labelledby="h${red.reqName}"
          data-bs-parent="#reductionsAccordion">
          <div class="accordion-body">
            <div class="row justify-content-center">
              <div class="col-10 col-md-12">
                <input type="text" class="reduction ${red.reqName} form-control" name="${red.reqName}" id="${red.reqName}">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ORDER
  let order = `<option value=""></option><option value="${metadata[elm].mainSearch.reqName}">${metadata[elm].mainSearch.name}</option>`;
  for(let ord of metadata[elm].reductions) order += `<option value="${ord.reqName}">${ord.name}</option>`;
  for(let ord of metadata[elm].intervals) order += `<option value="${ord.reqName}">${ord.name}</option>`;

  // IMPRESIÓN
  document.getElementById("mainSearch").innerHTML = mainSearch;
  document.getElementById("intervalsAccordion").innerHTML = intervals;
  document.getElementById("categoriesAccordion").innerHTML = categories;
  document.getElementById("reductionsAccordion").innerHTML = reductions;
  document.getElementById("order").innerHTML = order;

  // EVENTOS
  for(let range of document.querySelectorAll(".form-range")){
    range.addEventListener('input', (e)=>{
      e.target.parentElement.nextElementSibling.firstElementChild.value = e.target.value;
    });
  }
  
}