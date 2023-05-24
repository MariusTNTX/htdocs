/* ELEMENTOS DOM */
let pageTitle = document.getElementById("pageTitle");
let pageBreadcrumb = document.getElementById("pageBreadcrumb");
let image1Elm = document.getElementById("image1");
let topGenresElm = document.getElementById("topGenres");
let topSongsElm = document.getElementById("topSongs");
let description1Elm = document.getElementById("description1");
let linksElm = document.getElementById("links");
let headElm = document.getElementById("head");
let heartElm = document.getElementById("heart");
let heartElm1 = document.getElementById("heart1");
let heartElm2 = document.getElementById("heart2");
let image2Elm = document.getElementById("image2");
let mainInfoElm = document.getElementById("mainInfo");
let recordingElm = document.getElementById("recording");
let topMusiciansElm = document.getElementById("topMusicians");
let description2Elm = document.getElementById("description2");
let topAlbumsElm = document.getElementById("topAlbums");
let topBandsElm = document.getElementById("topBands");

let params = getURLParameters();
let element = params.element;

let metadata = {
  album: {
    requests: [
      {element: ['albumes'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['discograficas'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['estudios_grabacion'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band']]},
      {element: ['generos_albumes'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band'],['order','estrellasGeneroAlbum_Desc']]},
      {element: ['roles_musicos_albumes'], params: [['nombreAlbumRol','params.album'],['nombreBandaRol','params.band']]},
      {element: ['musicos'], params: [['nombreAlbumRol','params.album'],['nombreBandaRol','params.band']]},
      {element: ['canciones_albumes'], params: [['nombreAlbum','params.album'],['nombreBanda','params.band'],['order','estrellasCancion_Desc']]}
    ],
    cards: [head, image, mainInfo, recording, topGenres, topMusicians, topSongs, description, links]
  },
  band: {
    requests: [
      {element: ['bandas'], params: [['nombreBanda','params.band']]},
      {element: ['etapas_bandas'], params: [['nombreBanda','params.band'],['order','anioInicioEtapaBanda']]},
      {element: ['discograficas'], params: [['nombreBanda','params.band']]},
      {element: ['estudios_grabacion'], params: [['nombreBanda','params.band']]},
      {element: ['temas_letra_bandas'], params: [['nombreBanda','params.band']]},
      {element: ['generos_bandas'], params: [['nombreBanda','params.band'],['order','estrellasGeneroBanda_Desc']]},
      {element: ['musicos_bandas'], params: [['nombreBandaEtapa','params.band'],['order','anioInicioEtapaMusico_Asc']]},
      {element: ['musicos'], params: [['nombreBandaRol','params.band']]},
      {element: ['canciones_albumes'], params: [['nombreBanda','params.band'],['order','estrellasCancion_Desc'],['page','1'],['limit','10']]},
      {element: ['albumes'], params: [['nombreBanda','params.band'],['order','anioAlbum']]}
    ],
    cards: [head, image, mainInfo, recording, topGenres, topMusicians, topSongs, topAlbums, description, links]
  },
  label: {
    requests: [
      {element: ['discograficas'], params: [['nombreDiscografica','params.label']]},
      {element: ['albumes'], params: [['nombreDiscografica','params.label'],['order','anioAlbum']]},
      {element: ['bandas'], params: [['nombreDiscografica','params.label']]},
      {element: ['canciones_albumes'], params: [['nombreDiscografica','params.label'],['order','estrellasCancion_Desc'],['page','1'],['limit','10']]},
    ],
    cards: [head, image, mainInfo, recording, topMusicians, topSongs, topAlbums, topBands, links]
  },
  musician: {
    requests: [
      {element: ['musicos'], params: [['nombreMusico','params.musician']]},
      {element: ['musicos_bandas'], params: [['nombreMusicoEtapa','params.musician'],['order','anioInicioEtapaMusico']]},
      {element: ['roles_musicos_albumes'], params: [['nombreMusicoRol','params.musician']]},
      {element: ['albumes'], params: [['nombreMusicoRol','params.musician'],['order','anioAlbum']]},
      {element: ['bandas'], params: [['nombreMusicoRol','params.musician']]}, /* antes: nombreMusicoEtapa */
      {element: ['canciones_albumes'], params: [['nombreMusicoRol','params.musician'],['order','estrellasCancion_Desc'],['page','1'],['limit','10']]},
    ],
    cards: [head, image, mainInfo, recording, topSongs, topAlbums, topBands, links]
  }
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
    pageTitle.textContent = "Álbum";
    pageBreadcrumb.textContent = "Álbum";
    headElm.innerHTML = `<h1>${data.albumes[0].album} - <a href="visor.html?element=band&band=${data.albumes[0].banda}">${data.albumes[0].banda}</a></h1>`;
    heartElm.classList.remove("d-none");
  } else if(elm=='band'){
    pageTitle.textContent = "Banda";
    pageBreadcrumb.textContent = "Banda";
    headElm.innerHTML = `<h1>${data.bandas[0].banda}</h1>`;
    heartElm.classList.remove("d-none");
  } else if(elm=='label'){
    pageTitle.textContent = "Discográfica";
    pageBreadcrumb.textContent = "Discográfica";
    headElm.innerHTML = `<h1>${data.discograficas[0].discografica}</h1>`;
  } else if(elm=='musician'){
    pageTitle.textContent = "Músico";
    pageBreadcrumb.textContent = "Músico";
    if(!data.musicos[0].anioDefuncion) headElm.innerHTML = `<h1>${data.musicos[0].musico}</h1>`;
    else headElm.innerHTML = `
      <h1>
        <span class="position-relative">
          ${data.musicos[0].musico}
          <span class="position-absolute start-100 top-0"><img class="mb-4" style="height:22px" src="./imagenes/basico/deathCross.png" alt="Símbolo de la cruz"></span>
        </span>
      </h1>`;
  }
  //Corazón de Favoritos
  addHeartEvent();
  if((elm=='band' || elm=='album')) setHeart(params);
  //Visitas
  if(elm=='album') put('albumes',false,[{id:{nombreBanda: data.albumes[0].banda, nombreAlbum: data.albumes[0].album},visitasAlbum: parseInt(data.albumes[0].visitas)+1}]);
  else if(elm=='band') put('bandas',false,[{id:{nombreBanda: data.bandas[0].banda},visitasBanda: parseInt(data.bandas[0].visitas)+1}]);
}

function image(elm, data){
  console.log("image",elm,data);
  if(elm=='album'){
    image1Elm.src=(data.albumes[0].imagen)?data.albumes[0].imagen:"imagenes/basico/user_MetaList.png";
    image2Elm.src=(data.albumes[0].imagen)?data.albumes[0].imagen:"imagenes/basico/user_MetaList.png";
  } else if(elm=='band'){
    image1Elm.src=(data.bandas[0].imagen)?data.bandas[0].imagen:"imagenes/basico/user_MetaList.png";
    image2Elm.src=(data.bandas[0].imagen)?data.bandas[0].imagen:"imagenes/basico/user_MetaList.png";
  } else if(elm=='label'){
    image1Elm.src=(data.discograficas[0].imagen)?data.discograficas[0].imagen:"imagenes/basico/user_MetaList.png";
    image2Elm.src=(data.discograficas[0].imagen)?data.discograficas[0].imagen:"imagenes/basico/user_MetaList.png";
  } else if(elm=='musician'){
    image1Elm.src=(data.musicos[0].imagen)?data.musicos[0].imagen:"imagenes/basico/user_MetaList.png";
    image2Elm.src=(data.musicos[0].imagen)?data.musicos[0].imagen:"imagenes/basico/user_MetaList.png";
  }
}

function mainInfo(elm, data){
  console.log("mainInfo",elm,data);
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let tipoEsp = {Estudio: "Álbum de Estudio",EP:"EP",Recopilatorio:"Álbum Recopilatorio",BoxSet:"Box Set",En_Vivo:"DVD en Directo",Demo:"Demo",Single:"Single",Video:"Video",Split:"Split",Colaboración:"Álbum Colaborativo"};
  let txt="";
  if(elm=='album'){
    let album = data.albumes[0];
    txt= `<li><strong>Tipo de Álbum</strong>: ${(album.tipo)?tipoEsp[album.tipo.replaceAll(" ","_")]:"Tipo Desconocido"}</li>
          <li><strong>Fecha</strong>: ${(album.dia)?album.dia+" de ":""}${(album.mes)?mesEsp[parseInt(album.mes)]+" de ":""}${(album.anio)?album.anio:"Fecha Desconocida"}</li>
          <li><strong>Escuchas Spotify</strong>: ${addPoints(album.escuchas)}</li>
          <li><strong>Etapa Histórica</strong>: ${getHistoryStage(album.anio)}</li>
          <li><strong>Duración</strong>: ${secToTime(album.duracion)}</li>`;
  } else if(elm=='band'){
    let band = data.bandas[0];
    txt= `<li><strong>País</strong>: ${(band.pais)?band.pais:"Desconocido"}</li>
          <li><strong>Origen</strong>: ${(band.origen)?band.origen:"Desconocido"}</li>
          <li><strong>Escuchas Spotify</strong>: ${addPoints(band.escuchas)}</li>
          <li><strong>Estatus</strong>: ${band.estatus}</li>
          <li><strong>Etapas</strong>: ${getStages(data.etapas_bandas)}</li>
          <li><strong>Temas de Letra</strong>: ${getBandLyricThemes(data.temas_letra_bandas)}</li>`;
  } else if(elm=='label'){
    let label = data.discograficas[0];
    txt= `<li><strong>País</strong>: ${(label.pais)?label.pais:"Desconocido"}</li>
          <li><strong>Dirección</strong>: ${(label.direccion)?label.direccion:"Desconocido"}</li>
          <li><strong>Estatus</strong>: ${label.estatus}</li>`;
  } else if(elm=='musician'){
    let musician = data.musicos[0];
    txt= `<li><strong>País</strong>: ${(musician.pais)?musician.pais:"Desconocido"}</li>
          <li><strong>Origen</strong>: ${(musician.origen)?musician.origen:"Desconocido"}</li>
          <li><strong>Sexo</strong>: ${musician.sexo}</li>
          <li><strong>Fecha de Nacimiento</strong>: ${(musician.diaNacimiento)?musician.diaNacimiento+" de ":""}${(musician.mesNacimiento)?mesEsp[parseInt(musician.mesNacimiento)-1]+" de ":""}${(musician.anioNacimiento)?musician.anioNacimiento:"Fecha Desconocida"}</li>
          <li><strong>${(musician.anioDefuncion)?"Fecha de Defunción":"Edad"}</strong>: ${(musician.diaDefuncion)?musician.diaDefuncion+" de ":""}${(musician.mesDefuncion)?mesEsp[parseInt(musician.mesDefuncion)-1]+" de ":""}${(musician.anioDefuncion)?musician.anioDefuncion:calcularEdad(`${musician.anioNacimiento}-${musician.mesNacimiento}-${musician.diaNacimiento}`)}</li>`;
  }
  mainInfoElm.innerHTML=txt;
  mainInfoElm.parentElement.parentElement.classList.remove("d-none");
}

async function recording(elm, data){
  console.log("recording",elm,data);
  let labels = data.discograficas, studios = data.estudios_grabacion, txt="";
  if(elm=='album' || elm=='band'){
    txt=`<ul class="mb-0"><li><strong>Discográficas</strong>: <ul>`;
    for(let label of labels){
      txt+=`<li><i class="bx bx-chevron-right"></i><a href="visor.html?element=label&label=${label.discografica}">${label.discografica}</a> - ${(label.direccion)?label.direccion+", ":""}${(label.pais)?label.pais:"Origen Desconocido"}</li>`;
    }
    txt+= `</ul></li><li><strong>Estudios de Grabación</strong>: <ul>`;
    for(let studio of studios){
      txt+=`<li><i class="bx bx-chevron-right"></i>${studio.estudio} - ${(studio.direccion)?studio.direccion+", ":""}${(studio.pais)?studio.pais:"Origen Desconocido"}</li>`;
    }
    txt+= `</ul></li></ul>`;
    recordingElm.innerHTML=txt;
    recordingElm.parentElement.parentElement.classList.remove("d-none");
  } if(elm=='musician'){
    let roles = [], rolList = data.roles_musicos_albumes.map(item => item.rol);
    rolList.forEach(r => {
      if(!roles.includes(r)) roles.push(r);
    });
    txt+= `<ul class="mb-0"><li><strong>Roles de Grabación</strong>: <ul>`;
    for(let rol of roles){
      txt+=`<li><i class="bx bx-chevron-right"></i>${rol}</li>`;
    }
    txt+= `</ul></li></ul>`;
    recordingElm.innerHTML=txt;
    recordingElm.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='label'){
    let studios = await list('estudios_grabacion',true,['nombreAlbum',data.albumes.map(a=>a.album).join('|')]);
    studios = studios.response.filter((s,i,list)=>i==list.findIndex(s2=>s2.estudio==s.estudio));
    txt=`<ul class="mb-0"><li><strong>Estudios de Grabación</strong>: <ul>`;
    for(let studio of studios){
      txt+=`<li><i class="bx bx-chevron-right"></i>${studio.estudio} - ${(studio.direccion)?studio.direccion+", ":""}${(studio.pais)?studio.pais:"Origen Desconocido"}</li>`;
    }
    txt+= `</ul></li></ul>`;
    recordingElm.innerHTML=txt;
    recordingElm.parentElement.parentElement.classList.remove("d-none");
  }
}

function description(elm, data){
  console.log("description",elm,data);
  if(elm=='album'){
    description1Elm.innerHTML=data.albumes[0].descripcion;
    description2Elm.innerHTML=data.albumes[0].descripcion;
    description1Elm.parentElement.parentElement.classList.remove("d-none");
    description2Elm.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='band'){
    description1Elm.innerHTML=data.bandas[0].descripcion;
    description2Elm.innerHTML=data.bandas[0].descripcion;
    description1Elm.parentElement.parentElement.classList.remove("d-none");
    description2Elm.parentElement.parentElement.classList.remove("d-none");
  }
}

function links(elm, data){
  console.log("links",elm,data);
  let txt="";
  if(elm=='album'){
    txt+=`<li><strong>Amazon</strong>: <a href="${data.albumes[0].linkAmazon}" target="_blank">${data.albumes[0].album}</a></li>`;
  } else if(elm=='band'){
    if(data.bandas[0].linkWeb) txt+=`<li><strong>Página Web</strong>: <a href="${data.bandas[0].linkWeb}" target="_blank">${data.bandas[0].banda}</a></li>`;
    else txt+=`<li><strong>Página Web</strong>: No Disponible</li>`;
  } else if(elm=='label'){
    if(data.discograficas[0].linkWeb) txt+=`<li><strong>Página Web</strong>: <a href="${data.discograficas[0].linkWeb}" target="_blank">${data.discograficas[0].discografica}</a></li>`;
    else txt+=`<li><strong>Página Web</strong>: No Disponible</li>`;
  } else if(elm=='musician'){
    for(let band of data.bandas){
      if(band.linkWeb) txt+=`<li><strong>Página Web${(data.bandas.length>1)?' ('+band.banda+')':""}</strong>: <a href="${band.linkWeb}" target="_blank">${band.banda}</a></li>`;
      else txt+=`<li><strong>Página Web${(data.bandas.length>1)?' ('+band.banda+')':""}</strong>: No Disponible</li>`;
    }
  }
  linksElm.innerHTML=txt;
  linksElm.parentElement.parentElement.parentElement.classList.remove("d-none");
}

function topAlbums(elm, data){
  console.log("topAlbums",elm,data);
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let txt = "";
  let albums = data.albumes;
  if(elm=='band'){
    for(let album of albums.filter(a=>a.tipo!=null)){
      txt+=`
      <div class="col-12 col-md-6 col-xxl-4 py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${(album.imagen)?album.imagen:"imagenes/basico/user_MetaList.png"}" class="rounded-1 shadow" alt="Imagen del álbum ${album.album}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6"><a href="visor.html?element=album&band=${album.banda}&album=${album.album}">${album.album}</a></p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${(album.dia)?album.dia+" de ":""}${(album.mes)?mesEsp[parseInt(album.mes)]+" de ":""}${(album.anio)?album.anio:""}</p>
          </div>
        </div>
      </div>`;
    }
    topAlbumsElm.innerHTML=txt;
    topAlbumsElm.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='musician' || elm=='label'){
    for(let album of albums.filter(a=>a.tipo!=null)){
      txt+=`
      <div class="col-12 col-md-6 col-xxl-4 py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${(album.imagen)?album.imagen:"imagenes/basico/user_MetaList.png"}" class="rounded-1 shadow" alt="Imagen del álbum ${album.album}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6"><a href="visor.html?element=album&band=${album.banda}&album=${album.album}">${(data.bandas.length>1)?album.banda+' - ':''}${album.album}</a></p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${(album.dia)?album.dia+" de ":""}${(album.mes)?mesEsp[parseInt(album.mes)]+" de ":""}${(album.anio)?album.anio:""}</p>
          </div>
        </div>
      </div>`;
    }
    topAlbumsElm.innerHTML=txt;
    topAlbumsElm.parentElement.parentElement.classList.remove("d-none");
  }
}

function topBands(elm, data){
  console.log("topBands",elm,data);
  let txt="", bands = data.bandas;
  if(elm=='label'){
    for(let band of bands){
      txt+=`
      <div class="col-12 col-md-6 col-xxl-4 py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${(band.imagen)?band.imagen:"imagenes/basico/user_MetaList.png"}" class="rounded-1 shadow" alt="Imagen de la banda ${band.banda}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6"><a href="visor.html?element=band&band=${band.banda}">${band.banda}</a></p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${(band.origen)?band.origen+', ':''}${(band.pais)?band.pais:''}</p>
          </div>
        </div>
      </div>`;
    }
    topBandsElm.innerHTML=txt;
    topBandsElm.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='musician'){
    for(let band of bands){
      txt+=`
      <div class="col-12 col-md-6 col-xxl-4 py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${(band.imagen)?band.imagen:"imagenes/basico/user_MetaList.png"}" class="rounded-1 shadow" alt="Imagen de la banda ${band.banda}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6"><a href="visor.html?element=band&band=${band.banda}">${band.banda}</a></p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${(data.musicos_bandas.filter(m=>m.musico==data.musicos[0].musico).length>0)?getStages(data.musicos_bandas.filter(m=>m.musico==data.musicos[0].musico)):data.bandas.filter(b=>b.banda==band.banda)[0].pais}</p>
          </div>
        </div>
      </div>`;
    }
    topBandsElm.innerHTML=txt;
    topBandsElm.parentElement.parentElement.classList.remove("d-none");
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
      <div class="col-12 col-md-6 col-xxl-4 py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${(musician.imagen)?musician.imagen:"imagenes/basico/user_MetaList.png"}" class="rounded-1 shadow" alt="Imagen del músico ${musician.musico}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6">
              <a href="visor.html?element=musician&musician=${musician.musico}" class="position-relative">
                ${musician.musico}
                ${(musician.anioDefuncion)?'<span class="position-absolute start-100 top-0"><img class="mb-2" style="height:13px" src="./imagenes/basico/deathCross.png" alt="Símbolo de la cruz"></span>':''}
              </a>
            </p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${roles}</p>
          </div>
        </div>
      </div>`;
    }
    topMusiciansElm.innerHTML=txt;
    topMusiciansElm.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='band'){
    let musicians = data.musicos;
    let stages = data.musicos_bandas;
    for(let musician of musicians){
      txt+=`
      <div class="col-12 col-md-6 col-xxl-4 py-2 elmCard">
        <div class="row">
          <div class="col-auto pe-0"><img src="${(musician.imagen)?musician.imagen:"imagenes/basico/user_MetaList.png"}" class="rounded-1 shadow" alt="Imagen del músico ${musician.musico}"></div>
          <div class="col-auto ps-2 elmCardText">
            <p class="mb-0 fs-6">
              <a href="visor.html?element=musician&musician=${musician.musico}" class="position-relative">
                ${musician.musico}
                ${(musician.anioDefuncion)?'<span class="position-absolute start-100 top-0"><img class="mb-2" style="height:13px" src="./imagenes/basico/deathCross.png" alt="Símbolo de la cruz"></span>':''}
              </a>
            </p>
            <hr class="mt-1 mb-2">
            <p class="mb-0">${(stages.filter(m=>m.musico==musician.musico).length>0)?getStages(stages.filter(m=>m.musico==musician.musico)):"Productor/a"}</p>
          </div>
        </div>
      </div>`;
    }
    topMusiciansElm.innerHTML=txt;
    topMusiciansElm.parentElement.parentElement.classList.remove("d-none");
  }
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
    topGenresElm.innerHTML=txt;
    topGenresElm.parentElement.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='band'){
    for(let genre of data.generos_bandas){
      txt+=`<li>
              <i class="bi bi-star${(genre.estrellas>=1)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas>=2)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas>=3)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas>=4)?"-fill":""}"></i>
              <i class="bi bi-star${(genre.estrellas==5)?"-fill":""}"></i>
              ${genre.genero}
            </li>`;
    }
    topGenresElm.innerHTML=txt;
    topGenresElm.parentElement.parentElement.parentElement.classList.remove("d-none");
  }
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
    txt+=`<div class="mt-4">${data.albumes[0].linkSpotify}</div>`;
    topSongsElm.innerHTML=txt;
    topSongsElm.parentElement.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='band'){
    for(let song of data.canciones_albumes.filter(b=>data.bandas.map(b=>b.banda).includes(b.banda))){
      txt+=`<li>
              <i class="bi bi-star${(song.estrellas>=1)?"-fill":""}"></i>
              <i class="bi bi-star${(song.estrellas>=2)?"-fill":""}"></i>
              <i class="bi bi-star${(song.estrellas==3)?"-fill":""}"></i>
              ${song.cancion}
            </li>`;
    }
    topSongsElm.innerHTML=txt;
    topSongsElm.parentElement.parentElement.parentElement.classList.remove("d-none");
  } else if(elm=='musician' || elm=='label'){
    for(let song of data.canciones_albumes.filter(b=>data.bandas.map(b=>b.banda).includes(b.banda))){
      txt+=`<li>
              <i class="bi bi-star${(song.estrellas>=1)?"-fill":""}"></i>
              <i class="bi bi-star${(song.estrellas>=2)?"-fill":""}"></i>
              <i class="bi bi-star${(song.estrellas==3)?"-fill":""}"></i>
              ${song.cancion}${(data.bandas.length>1)?" ("+song.banda+")":""}
            </li>`;
    }
    topSongsElm.innerHTML=txt;
    topSongsElm.parentElement.parentElement.parentElement.classList.remove("d-none");
  }
}

function addHeartEvent(){
  heartElm.addEventListener("click", async ()=>{
    let params = getURLParameters();
    if(sessionStorage.getItem("email")){
      if(sessionStorage.getItem('favorito')=='SI'){ //Quitar de favoritos
        heartElm1.classList.remove("hid");
        heartElm2.classList.add("hid");
        sessionStorage.setItem('favorito','NO');
        if(params.element=='band'){
          await remove('bandas_favoritas',true,[
            {"id": {
              "emailUsuarioBandaFavorita": sessionStorage.getItem('email'),
              "nombreBandaFavorita": params.band
            }}
          ]);
        } else {
          await remove('albumes_favoritos',true,[
            {"id": {
              "emailUsuarioAlbumFavorito": sessionStorage.getItem('email'),
              "nombreBandaFavorita": params.band,
              "nombreAlbumFavorito": params.album
            }}
          ]);
        }
      } else { //Añadir a favoritos
        heartElm1.classList.add("hid");
        heartElm2.classList.remove("hid");
        sessionStorage.setItem('favorito','SI');
        if(params.element=='band'){
          await post('bandas_favoritas',true,[
            {
              "emailUsuarioBandaFavorita": sessionStorage.getItem('email'),
              "nombreBandaFavorita": params.band
            }
          ]);
        } else {
          await post('albumes_favoritos',true,[
            {
              "emailUsuarioAlbumFavorito": sessionStorage.getItem('email'),
              "nombreBandaFavorita": params.band,
              "nombreAlbumFavorito": params.album
            }
          ]);
        }
      }
    } else showAlert('ERROR','Debes iniciar sesión para añadir bandas y álbumes a favoritos');
  });
}