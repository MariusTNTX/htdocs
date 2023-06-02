/* LISTAS */
let albumTypes = ["Estudio", "EP", "Recopilatorio", "Boxset", "En Vivo", "Demo", "Single", "Video", "Split"];
let genres = ["Alternative Metal", "Black Metal", "Crossover Thrash Metal", "Deathcore", "Death Metal", "Djent", "Doom Metal", "Extreme Metal", "Folk Metal", "Glam Metal", "Groove Metal", "Gothic Metal", "Grindcore", "Heavy Metal", "Industrial Metal", "Melodic Death Metal", "Metalcore", "Nu Metal", "NWOBHM", "Power Metal", "Progressive Metal", "Sludge Metal", "Speed Metal", "Stoner Metal", "Symphonic Metal", "Technical Death Metal", "Thrash Metal", "Viking Metal"];
let countries = ["Alemania", "Australia", "Austria", "Bahamas", "Bélgica", "Bielorrusia", "Bolivia", "Brasil", "Canadá", "Chequia", "Chile", "Colombia", "Cuba", "Dinamarca", "El Salvador", "España", "Estados Unidos", "Finlandia", "Francia", "Grecia", "Italia", "Jamaica", "Japón", "Malasia", "Mexico", "Nepal", "Noruega", "Países Bajos", "Polonia", "Puerto Rico", "Reino Unido", "República Checa", "Rusia", "Sudafrica", "Suecia", "Suiza", "Turquía"];
let statusList = ["En Activo", "Disueltos", "En Hiato"];
let phases = ["En Activo", "En Hiato"];
let sexList = ["Hombre", "Mujer"];

/* CAMPOS */
let campos = {
  anioAlbum: { type: "interval", name: "Año de Lanzamiento", reqName: "anioAlbum", min: 1968, max: new Date().getFullYear(), sufix: "", step: 1 },
  escuchasAlbum: { type: "interval", name: "Escuchas de Álbum", reqName: "escuchasAlbum", min: 0, max: 1000000, sufix: "k", step: 10 },
  escuchasBanda: { type: "interval", name: "Escuchas de Banda", reqName: "escuchasBanda", min: 0, max: 1000000, sufix: "k", step: 10 },
  visitasAlbum: { type: "interval", name: "Visitas de Álbum", reqName: "visitasAlbum", min: 0, max: 1000, sufix: "", step: 1 },
  visitasBanda: { type: "interval", name: "Visitas de Banda", reqName: "visitasBanda", min: 0, max: 1000, sufix: "", step: 10 },
  visitasDiscografica: { type: "interval", name: "Visitas de Discográfica", reqName: "visitasDiscografica", min: 0, max: 1000, sufix: "", step: 10 },
  visitasMusico: { type: "interval", name: "Visitas de Músico", reqName: "visitasMusico", min: 0, max: 1000, sufix: "", step: 10 },
  duracionAlbum: { type: "interval", name: "Duración", reqName: "duracionAlbum", min: 0, max: 6000, sufix: "", step: 5 },
  estrellasCancionAlbum: { type: "interval", name: "Estrellas de Canción", reqName: "estrellasCancionAlbum", min: 0, max: 3, sufix: "", step: 1 },
  estrellasGeneroAlbum: { type: "interval", name: "Estrellas de Género de Álbum", reqName: "estrellasGeneroAlbum", min: 0, max: 5, sufix: "", step: 1 },
  estrellasGeneroBanda: { type: "interval", name: "Estrellas de Género de Banda", reqName: "estrellasGeneroBanda", min: 0, max: 5, sufix: "", step: 1 },
  anioNacimientoMusico: { type: "interval", name: "Año de Nacimiento", reqName: "anioNacimientoMusico", min: 1940, max: new Date().getFullYear(), sufix: "", step: 1 },
  anioDefuncionMusico: { type: "interval", name: "Año de Defunción", reqName: "anioDefuncionMusico", min: 1940, max: new Date().getFullYear(), sufix: "", step: 1 },
  anioInicioEtapaMusico: { type: "interval", name: "Año de Inicio de Músico en una Banda", reqName: "anioInicioEtapaMusico", min: 1940, max: new Date().getFullYear(), sufix: "", step: 1 },
  anioFinEtapaMusico: { type: "interval", name: "Año de Fin de Músico en una Banda", reqName: "anioFinEtapaMusico", min: 1940, max: new Date().getFullYear(), sufix: "", step: 1 },
  estrellasMaximasAlbum: { type: "interval", name: "Estrellas Máximas de Género de Álbum", reqName: "estrellasMaximasAlbum", min: 0, max: 5, sufix: "", step: 1 },
  puntuacionAlbum: { type: "interval", name: "Puntuación de álbum", reqName: "puntuacionAlbum", min: 0, max: 5000000000, sufix: "P", step: 500 },
  numeroLikesAlbum: { type: "interval", name: "Número de Likes de Álbum", reqName: "numeroLikesAlbum", min: 0, max: 1000, sufix: "", step: 1 },
  numeroCancionesAlbum: { type: "interval", name: "Número de Canciones de Álbum", reqName: "numeroCancionesAlbum", min: 0, max: 30, sufix: "", step: 1 },
  numeroEstudiosAlbum: { type: "interval", name: "Número de Estudios de Grabación de Álbum", reqName: "numeroEstudiosAlbum", min: 0, max: 20, sufix: "", step: 1 },
  numeroGenerosAlbum: { type: "interval", name: "Número de Géneros de Álbum", reqName: "numeroGenerosAlbum", min: 0, max: 20, sufix: "", step: 1 },
  numeroMusicosAlbum: { type: "interval", name: "Número de Músicos de Álbum", reqName: "numeroMusicosAlbum", min: 0, max: 30, sufix: "", step: 1 },
  estrellasMaximasBanda: { type: "interval", name: "Estrellas Máximas de Género de Banda", reqName: "estrellasMaximasBanda", min: 0, max: 5, sufix: "", step: 1 },
  puntuacionBanda: { type: "interval", name: "Puntuación de Banda", reqName: "puntuacionBanda", min: 0, max: 200000000, sufix: "P", step: 100 },
  numeroAlbumesBanda: { type: "interval", name: "Número de Álbumes de Banda", reqName: "numeroAlbumesBanda", min: 0, max: 50, sufix: "", step: 1 },
  numeroLikesBandas: { type: "interval", name: "Número de Likes de Banda", reqName: "numeroLikesBandas", min: 0, max: 1000, sufix: "", step: 1 },
  numeroCancionesBanda: { type: "interval", name: "Número de Canciones de Banda", reqName: "numeroCancionesBanda", min: 0, max: 50, sufix: "", step: 1 },
  numeroDiscograficasBanda: { type: "interval", name: "Número de Discográficas de Banda", reqName: "numeroDiscograficasBanda", min: 0, max: 20, sufix: "", step: 1 },
  numeroEstudiosBanda: { type: "interval", name: "Número de Estudios de Grabación de Banda", reqName: "numeroEstudiosBanda", min: 0, max: 30, sufix: "", step: 1 },
  numeroGenerosBanda: { type: "interval", name: "Número de Géneros de Banda", reqName: "numeroGenerosBanda", min: 0, max: 20, sufix: "", step: 1 },
  numeroMusicosBanda: { type: "interval", name: "Número de Músicos de Banda", reqName: "numeroMusicosBanda", min: 0, max: 50, sufix: "", step: 1 },
  numeroTemasBanda: { type: "interval", name: "Número de Temas de Letra de Banda", reqName: "numeroTemasBanda", min: 0, max: 20, sufix: "", step: 1 },
  puntuacionDiscografica: { type: "interval", name: "Puntuación de Discográfica", reqName: "puntuacionDiscografica", min: 0, max: 20000000000, sufix: "P", step: 1000 },
  numeroAlbumesDiscografica: { type: "interval", name: "Número de Álbumes de Discográfica", reqName: "numeroAlbumesDiscografica", min: 0, max: 100, sufix: "", step: 1 },
  numeroBandasDiscografica: { type: "interval", name: "Número de Bandas de Discográfica", reqName: "numeroBandasDiscografica", min: 0, max: 50, sufix: "", step: 1 },
  numeroCancionesDiscografica: { type: "interval", name: "Número de Canciones de Discográfica", reqName: "numeroCancionesDiscografica", min: 0, max: 300, sufix: "", step: 1 },
  numeroEstudiosDiscografica: { type: "interval", name: "Número de Estudios de Discográfica", reqName: "numeroEstudiosDiscografica", min: 0, max: 100, sufix: "", step: 1 },
  numeroGenerosDiscografica: { type: "interval", name: "Número de Géneros de Discográfica", reqName: "numeroGenerosDiscografica", min: 0, max: 30, sufix: "", step: 1 },
  numeroMusicosDiscografica: { type: "interval", name: "Número de Músicos de Discográfica", reqName: "numeroMusicosDiscografica", min: 0, max: 200, sufix: "", step: 1 },
  numeroTemasDiscografica: { type: "interval", name: "Número de Temas de Letra de Discográfica", reqName: "numeroTemasDiscografica", min: 0, max: 100, sufix: "", step: 1 },
  puntuacionMusico: { type: "interval", name: "Puntuación de Músico", reqName: "puntuacionMusico", min: 0, max: 50000000000, sufix: "P", step: 1000 },
  numeroAlbumesMusico: { type: "interval", name: "Número de Álbumes de Músico", reqName: "numeroAlbumesMusico", min: 0, max: 50, sufix: "", step: 1 },
  numeroBandasMusico: { type: "interval", name: "Número de Bandas de Músico", reqName: "numeroBandasMusico", min: 0, max: 10, sufix: "", step: 1 },
  numeroRolesMusico: { type: "interval", name: "Número de Roles de Músico", reqName: "numeroRolesMusico", min: 0, max: 30, sufix: "", step: 1 },
  numeroCancionesMusico: { type: "interval", name: "Número de Canciones de Músico", reqName: "numeroCancionesMusico", min: 0, max: 50, sufix: "", step: 1 },
  numeroDiscograficasMusico: { type: "interval", name: "Número de Discográficas de Músico", reqName: "numeroDiscograficasMusico", min: 0, max: 10, sufix: "", step: 1 },
  numeroEstudiosMusico: { type: "interval", name: "Número de Estudios de Grabación de Músico", reqName: "numeroEstudiosMusico", min: 0, max: 30, sufix: "", step: 1 },
  numeroGenerosMusico: { type: "interval", name: "Número de Géneros de Músico", reqName: "numeroGenerosMusico", min: 0, max: 20, sufix: "", step: 1 },
  numeroTemasMusico: { type: "interval", name: "Número de Temas de Letra de Músico", reqName: "numeroTemasMusico", min: 0, max: 30, sufix: "", step: 1 },

  tipoAlbum: { type: "check", name: "Tipo de Álbum", reqName: "tipoAlbum", list: albumTypes },
  paisBanda: { type: "check", name: "País de Banda", reqName: "paisBanda", list: countries },
  paisDiscografica: { type: "check", name: "País de Discográfica", reqName: "paisDiscografica", list: countries },
  paisMusico: { type: "check", name: "País de Músico", reqName: "paisMusico", list: countries },
  nombreGeneroAlbum: { type: "check", name: "Géneros de Álbum", reqName: "nombreGeneroAlbum", list: genres },
  nombreGeneroBanda: { type: "check", name: "Géneros de Banda", reqName: "nombreGeneroBanda", list: genres },
  estatusBanda: { type: "check", name: "Estatus Actual de Banda", reqName: "estatusBanda", list: statusList },
  estatusDiscografica: { type: "check", name: "Estatus Actual de Discográfica", reqName: "estatusDiscografica", list: statusList },
  tipoEtapa: { type: "check", name: "Etapa de Banda", reqName: "tipoEtapa", list: phases },
  sexoMusico: { type: "check", name: "Sexo de Músico", reqName: "sexoMusico", list: sexList },

  nombreAlbum: { type: "text", name: "Título de Álbum", reqName: "nombreAlbum" },
  nombreBanda: { type: "text", name: "Nombre de Banda", reqName: "nombreBanda" },
  nombreDiscografica: { type: "text", name: "Nombre de Discográfica", reqName: "nombreDiscografica" },
  nombreMusico: { type: "text", name: "Nombre de Músico de Álbum", reqName: "nombreMusico" },
  nombreAlbumRol: { type: "text", name: "Título de Álbum", reqName: "nombreAlbumRol" },
  nombreBandaRol: { type: "text", name: "Nombre de Banda", reqName: "nombreBandaRol" },
  nombreMusicoRol: { type: "text", name: "Nombre de Músico de Álbum", reqName: "nombreMusicoRol" },
  nombreMusicoEtapa: { type: "text", name: "Nombre de Músico de Banda", reqName: "nombreMusicoEtapa" },
  rolMusico: { type: "text", name: "Rol de Músico", reqName: "rolMusico" },
  temaLetraBanda: { type: "text", name: "Tema de Letra", reqName: "temaLetraBanda" },
  nombreCancion: { type: "text", name: "Nombre de Canción", reqName: "nombreCancion" },
  nombreEstudioAlbum: { type: "text", name: "Nombre de Estudio de Grabación", reqName: "nombreEstudioAlbum" },
}

let metadata = {
  albums: {
    mainSearch: campos.nombreAlbum,
    checks: [],
    intervals: [campos.anioAlbum, campos.puntuacionAlbum, campos.escuchasAlbum, campos.visitasAlbum, campos.visitasBanda, /* campos.duracionAlbum, */
    campos.estrellasCancionAlbum, campos.estrellasGeneroAlbum, campos.estrellasGeneroBanda, campos.estrellasMaximasAlbum,
    campos.numeroLikesAlbum, campos.numeroCancionesAlbum, campos.numeroEstudiosAlbum, campos.numeroGenerosAlbum, campos.numeroMusicosAlbum],
    categories: [campos.tipoAlbum, campos.nombreGeneroAlbum, campos.nombreGeneroBanda, campos.paisBanda],
    reductions: [campos.nombreBanda, campos.nombreDiscografica, campos.nombreEstudioAlbum, campos.nombreMusicoRol, campos.nombreMusicoEtapa,
    campos.rolMusico, campos.temaLetraBanda, campos.nombreCancion],
  },
  bands: {
    mainSearch: campos.nombreBanda,
    checks: [],
    intervals: [campos.escuchasBanda, campos.visitasBanda, campos.visitasAlbum, campos.anioAlbum, campos.escuchasAlbum, /* campos.duracionAlbum, */
    campos.estrellasGeneroAlbum, campos.estrellasGeneroBanda, campos.estrellasMaximasBanda, campos.puntuacionBanda, campos.numeroAlbumesBanda,
    campos.numeroLikesBandas, campos.numeroCancionesBanda, campos.numeroDiscograficasBanda, campos.numeroEstudiosBanda, campos.numeroGenerosBanda,
    campos.numeroMusicosBanda, campos.numeroTemasBanda],
    categories: [campos.paisBanda, campos.estatusBanda, campos.tipoEtapa, campos.nombreGeneroAlbum, campos.nombreGeneroBanda],
    reductions: [campos.nombreAlbum, campos.nombreDiscografica, campos.nombreEstudioAlbum, campos.nombreMusicoEtapa, campos.nombreMusicoRol,
    campos.rolMusico, campos.temaLetraBanda],
  },
  labels: {
    mainSearch: campos.nombreDiscografica,
    checks: [],
    intervals: [campos.visitasDiscografica, campos.puntuacionDiscografica, campos.numeroAlbumesDiscografica, campos.numeroBandasDiscografica,
    campos.numeroCancionesDiscografica, campos.numeroEstudiosDiscografica, campos.numeroGenerosDiscografica, campos.numeroMusicosDiscografica,
    campos.numeroTemasDiscografica],
    categories: [campos.paisDiscografica, campos.estatusDiscografica],
    reductions: [campos.nombreAlbum, campos.nombreBanda],
  },
  musicians: {
    mainSearch: campos.nombreMusico,
    checks: [],
    intervals: [campos.anioNacimientoMusico, campos.anioDefuncionMusico, campos.visitasMusico, campos.anioInicioEtapaMusico, campos.anioFinEtapaMusico,
    campos.puntuacionMusico, campos.numeroAlbumesMusico, campos.numeroBandasMusico, campos.numeroRolesMusico, campos.numeroCancionesMusico,
    campos.numeroDiscograficasMusico, campos.numeroEstudiosMusico, campos.numeroGenerosMusico, campos.numeroTemasMusico],
    categories: [campos.sexoMusico, campos.paisMusico],
    reductions: [campos.nombreBandaRol, campos.nombreAlbumRol, campos.rolMusico],
  }
};

function newFilter(elm) {

  // MAIN SEARCH
  let mainSearch = `
    <input type="text" class="mainTitle ${metadata[elm].mainSearch.reqName} form-control" name="busq" id="mainTitle" placeholder="${metadata[elm].mainSearch.name}">
    <label for="busq">${metadata[elm].mainSearch.name}</label>
  `;

  // INTERVALS
  let intervals = ``;
  for (let intv of metadata[elm].intervals) {
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
  for (let cat of metadata[elm].categories) {
    categories += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="h${cat.reqName}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c${cat.reqName}" aria-expanded="false" aria-controls="c${cat.reqName}">
            ${cat.name}
          </button>
        </h2>
        <div id="c${cat.reqName}" class="accordion-collapse collapse" aria-labelledby="h${cat.reqName}" data-bs-parent="#categoriesAccordion">
          <div class="accordion-body">`;
    for (let c of cat.list) {
      categories += `<div class="form-check"><input type="checkbox" class="category ${cat.reqName} form-check-input" name="${cat.reqName}${c}" id="${c}"><label for="${c}" class="form-check-label">${c}</label></div>`;
    }
    categories += `</div></div></div>`;
  }

  // REDUCTIONS
  let reductions = ``;
  for (let red of metadata[elm].reductions) {
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
  for (let ord of metadata[elm].reductions) order += `<option value="${ord.reqName}">${ord.name}</option>`;
  for (let ord of metadata[elm].intervals) order += `<option value="${ord.reqName}">${ord.name}</option>`;

  // IMPRESIÓN
  document.getElementById("mainSearch").innerHTML = mainSearch;
  document.getElementById("intervalsAccordion").innerHTML = intervals;
  document.getElementById("categoriesAccordion").innerHTML = categories;
  document.getElementById("reductionsAccordion").innerHTML = reductions;
  document.getElementById("order").innerHTML = order;

  // EVENTOS
  for (let range of document.querySelectorAll(".form-range")) {
    range.addEventListener('input', (e) => {
      e.target.parentElement.nextElementSibling.firstElementChild.value = e.target.value;
    });
  }

}