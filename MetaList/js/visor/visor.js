let image1Elm = document.getElementById("image1");
let topGenresElm = document.getElementById("topGenres");
let topSongsElm = document.getElementById("topSongs");
let description1Elm = document.getElementById("description1");
let linksElm = document.getElementById("links");
let headElm = document.getElementById("head");
let heartElm = document.getElementById("heart");
let image2Elm = document.getElementById("image2");
let mainInfoElm = document.getElementById("mainInfo");
let recordingElm = document.getElementById("recording");
let topMusiciansElm = document.getElementById("topMusicians");
let description2Elm = document.getElementById("description2");
let topAlbumsElm = document.getElementById("topAlbums");
let topBandsElm = document.getElementById("topBands");

// Gestión de Likes (trasladar a función head)
let heart1 = document.getElementById("heart1");
let heart2 = document.getElementById("heart2");
heart1.addEventListener("click",()=>{
    heart1.classList.add("hid");
    heart2.classList.remove("hid");
});
heart2.addEventListener("click",()=>{
    heart1.classList.remove("hid");
    heart2.classList.add("hid");
});

let params = getURLParameters();
let element = params.element;

let metadata = {
  album: {
    requests: [
      {element: ['albumes_plus'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['discograficas'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['estudios_grabacion'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['generos_albumes'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band'],['order','estrellasGeneroAlbum_Desc']]},
      {element: ['roles_musicos_albumes'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['musicos'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['canciones_albumes'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band'],['order','estrellasCancion_Desc']]}
    ],
    cards: [head, image, mainInfo, recording, topGenres, topMusicians, topSongs, description, links]
  },
  band: {},
  label: {},
  musician: {}
};

setFullData();

async function setFullData(){
  //OBTENCIÓN DE TODOS LOS DATOS NECESARIOS DE LA API (array 1)
  let data = {}, cards = metadata[element].cards;
  for(let elm of metadata[element].requests){
    data[elm.element] = await getData(elm.element, elm.params);
  }
  //RECORRIDO DE ETIQUETAS: IMPRESIÓN HTML (array 2)
  cards.forEach(func=>func(element, data));
}

async function getData(elm, keys){
  keys.forEach(k=>{
    if(k[1].includes('params.')) k[1]=params[k[1].split('.')[1]];
  })
  let resp = await list(elm, true, ...keys);
  return resp.response;
}

function head(elm, data){
  console.log("head",elm,data);
  if(elm=='album'){
    headElm.innerHTML = `<h1>${data.albumes_plus[0].album} - <a href="visor.html?element=band&band=${data.albumes_plus[0].banda}">${data.albumes_plus[0].banda}</a></h1>`;
  } else if(elm=='band'){

  } else if(elm=='label'){

  } else if(elm=='musician'){

  }
}

function image(elm, data){
  console.log("image",elm,data);
  image1Elm.src=data.albumes_plus[0].imagen;
  image2Elm.src=data.albumes_plus[0].imagen;
}

function mainInfo(elm, data){
  console.log("mainInfo",elm,data);
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let tipoEsp = {Estudio: "Álbum de Estudio",EP:"EP",Recopilatorio:"Álbum Recopilatorio",BoxSet:"Box Set",En_Vivo:"DVD en Directo",Demo:"Demo",Single:"Single",Video:"Video",Split:"Split",Colaboración:"Álbum Colaborativo"};
  
  if(elm=='album'){
    let album = data.albumes_plus[0];
    mainInfoElm.innerHTML=`
    <li><strong>Tipo de Álbum</strong>: ${(album.tipo)?tipoEsp[album.tipo.replaceAll(" ","_")]:"Tipo Desconocido"}</li>
    <li><strong>Fecha</strong>: ${(album.dia)?album.dia+" de ":""}${(album.mes)?mesEsp[parseInt(album.mes)]+" de ":""}${(album.anio)?album.anio:"Fecha Desconocida"}</li>
    <li><strong>Escuchas Spotify</strong>: ${addPoints(album.escuchas)}</li>
    <li><strong>Etapa Histórica</strong>: ${getStage(album.anio)}</li>
    <li><strong>Duración</strong>: ${secToTime(album.duracion)}</li>
    <li><strong>Puntuación</strong>: ${addPoints(album.puntuacion)}</li>`;
  } else if(elm=='band'){

  } else if(elm=='label'){

  } else if(elm=='musician'){
    
  }
}

function recording(elm, data){
  console.log("recording",elm,data);
  let labels = data.discograficas, studios = data.estudios_grabacion, txt;
  if(elm=='album'){
    txt=`<ul><li><strong>Discográficas</strong>: <ul>`;
    for(let label of labels){
      txt+=`<li><i class="bx bx-chevron-right"></i><a href="element=label$label=${label.discografica}">${label.discografica}</a> - ${(label.direccion)?label.direccion+", ":""}${(label.pais)?label.pais:"Origen Desconocido"}</li>`;
    }
    txt+= `</ul></li><li><strong>Estudios de Grabación</strong>: <ul>`;
    for(let studio of studios){
      txt+=`<li><i class="bx bx-chevron-right"></i>${studio.estudio} - ${(studio.direccion)?studio.direccion+", ":""}${(studio.pais)?studio.pais:"Origen Desconocido"}</li>`;
    }
    txt+= `</ul></li></ul>`;
  } else if(elm=='band'){

  } else if(elm=='label'){

  } else if(elm=='musician'){
    
  }
  recordingElm.innerHTML=txt;
}

function lyricThemes(elm, data){
  console.log("lyricThemes",elm,data);
  if(elm=='band'){

  } else if(elm=='musician'){
    
  }
}

function description(elm, data){
  console.log("description",elm,data);
  description1Elm.innerHTML=data.albumes_plus[0].descripcion;
  description2Elm.innerHTML=data.albumes_plus[0].descripcion;
}

function links(elm, data){
  console.log("links",elm,data);
  if(elm=='album'){
    linksElm.innerHTML=`<li><strong>Amazon</strong>: <a href="${data.albumes_plus[0].linkAmazon}" target="_blank">${data.albumes_plus[0].album}</a></li>`;
  } else if(elm=='band'){

  } else if(elm=='label'){

  }
}
function topAlbums(elm, data){
  console.log("topAlbums",elm,data);
  if(elm=='band'){

  } else if(elm=='label'){

  } else if(elm=='musician'){
    
  }
}
function topBands(elm, data){
  console.log("topBands",elm,data);
  if(elm=='label'){

  } else if(elm=='musician'){
    
  }
}
function topMusicians(elm, data){
  console.log("topMusicians",elm,data);
  let txt="";
  if(elm=='album'){
    let musiciansFull = data.roles_musicos_albumes;
    let musiciansList = data.musicos;
    for(let musician of musiciansList){
      console.log("musician antes de roles",musician)
      let roles="";
      musiciansFull.forEach(m=>{
        if(m.musico==musician.musico){
          roles += (roles.length==0)?"":", ";
          roles += m.rol;
        }
      });
      console.log("roles",roles)
      console.log("musician tras roles: ",musician)
      txt+=`
      <div class="col-auto py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${musician.imagen}" class="rounded-1" alt="Imagen del músico ${musician.musico}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6"><a href="visor.html?element=musician&musician=${musician.musico}">${musician.musico}</a></p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${roles}</p>
          </div>
        </div>
      </div>`;
    }
  } else if(elm=='band'){

  } else if(elm=='label'){

  }
  topMusiciansElm.innerHTML=txt;
}
function topGenres(elm, data){
  console.log("topGenres",elm,data);
  let txt="";
  if(elm=='album'){
    for(let genre of data.generos_albumes){
      txt+=`<li>
              <i class="bi bi-star${(genre.estrellas>=1)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas>=2)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas>=3)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas>=4)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas==5)?"-fill":""}"></i>
              ${genre.genero}
            </li>`;
    }
  } else if(elm=='band'){

  }
  topGenresElm.innerHTML=txt;
}
function topSongs(elm, data){
  console.log("topSongs",elm,data);
  let txt="";
  if(elm=='album'){
    for(let song of data.canciones_albumes){
      txt+=`<li>
              <i class="bi bi-star${(song.estrellas>=1)?"-fill":""}"></i>
              <i class="bi bi-star${(song.estrellas>=2)?"-fill":""}"></i>
              <i class="bi bi-star${(song.estrellas==3)?"-fill":""}"></i>
              ${song.cancion}
            </li>`;
    }
    txt+=`<div class="mt-4">${data.albumes_plus[0].linkSpotify}</div>`;
  } else if(elm=='band'){

  } else if(elm=='label'){

  } else if(elm=='musician'){
    
  }
  topSongsElm.innerHTML=txt;
}