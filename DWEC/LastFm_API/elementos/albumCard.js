/* FUNCIÓN IMPRIMIR TARJETA ARTISTA */
var printAlbum = async function(linkAlbum,album,artista,listeners='',playcount='',published='',summary='',tags='',tracks=''){
  /* Obtención de géneros y descripción (si no han sido facilitados) */
  if(listeners==''){
    var responseAlb = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${artista}&album=${album}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
    responseAlb = await responseAlb.json();
    responseAlb = responseAlb.album;
    listeners = responseAlb.listeners;
    playcount = responseAlb.playcount;
    published = responseAlb.wiki.published;
    summary = responseAlb.wiki.summary;
    tags = responseAlb.toptags.tag;
    tracks = responseAlb.tracks.track;
    console.log(responseAlb)
  }

  /* Obtención de la Fecha */
  if(published==0) published = 'Desconocido';
  else {
    published = new Date(published);
    published = published.getDate()+"/"+published.getMonth()+"/"+published.getFullYear();
  } 

  /* Generación del ID */
  let id = `a${listeners}_${playcount}`;

  /* Inclusión de puntos a las cifras numéricas */
  let cifra = [listeners,playcount]
  for(let i in cifra){
    let nuevo = '';
    while(cifra[i].length>0){
      if(cifra[i].length>3){
        nuevo = '.'+cifra[i].substr(-3)+nuevo;
        cifra[i] = cifra[i].substring(0,cifra[i].length-3);
      } else {
        nuevo = cifra[i]+nuevo;
        cifra[i] = '';
      }
    }
    cifra[i]=nuevo;
  }
  listeners = cifra[0];
  playcount = cifra[1];

  /* Inserción del Elemento */
  let txt = `
  <div class="col my-4">
    <div class="card h-100 text-center shadow">
      <div class="card-header text-center bg-dark border-bottom border-primary border-5">
        <h4 class="card-title"><a href="${linkAlbum}" target="_blank" class="text-white">${album}</a></h4>
      </div>
      <div class="card-body pb-0">
        <div><b>Artista</b>: ${artista}</div>
        <div><b>Fecha de Lanzamiento</b>: ${published}</div>
        <div><b>Oyentes</b>: ${listeners}</div>
        <div><b>Reproducciones</b>: ${playcount}</div>
        <div class="mt-3"><b>Géneros Asociados</b>:</div>
        <div class="row justify-content-evenly my-3">`;
          for(var tag of tags) txt += `<div class="col-auto"><a href="${tag.url}" target="_blank">${tag.name}</a></div>`;
        txt += `
        </div>
        <div><b>Descripción</b>:</div>
        <div>
          <p>${summary}</p>
        </div>
      </div>
      <div class="card-footer text-center bg-white m-0 p-0">
        <button class="btn btn-primary w-100 rounded-0 rounded-bottom btnModalArtist" id="btn_${id}" data-bs-toggle="modal" href="#${id}" role="button">Más Información</button>
      </div>
    </div>
  </div>

  <div class="modal fade" id="${id}" aria-hidden="true" aria-labelledby="${id}Label" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${id}Label">${album}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-5 border-end">
              <!-- Imagen -->
              <div class="m-4">
                <img class="mh-75 d-none" src="..." alt="...">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Info -->
            <div clss="col-7">
              <!-- Oyentes y reproducciones
              Descripción
              Columna de Géneros
              Columna de Álbumes
              Columna de Canciones
              Columna de Artistas Similares -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  resultList.innerHTML += txt;

  /* Creación de Eventos */
  document.getElementById(`btn_${id}`).addEventListener("click",()=>{

  });
}

/* FUNCIÓN RECUPERAR IMAGEN ARTISTA */
var getImageURL = async function(title){
  //Obtencion de PageId
  var responseURL = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${title}`);
  responseURL = await responseURL.json();
  let pageid = responseURL.query.search[0].pageid;
  //Obtención de SRC
  var responseURL = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&utf8&prop=revisions&rvprop=content&rvparse&pageids=${pageid}`);
  responseURL = await responseURL.json();
  responseURL = responseURL.query.pages[pageid].revisions[0]['*'];
  //Obtener primera posición de //upload
  let p1 = responseURL.indexOf("//upload.wikimedia.org/wikipedia/commons/thumb/");
  //Obtener primera posición de " desde la posición anterior
  let p2 = responseURL.indexOf("\"",p1);
  //Recortar y obtener la porción de string con esas posiciones
  let url = responseURL.substring(p1,p2);
  //Eliminar último fragmento
  url = url.substring(0,url.lastIndexOf("/"));
  //Eliminar thumb/ y Añadir https:
  return 'https:'+url.replace("thumb/","");
}