/* FUNCIÓN IMPRIMIR TARJETA ÁLBUM */
var printAlbum = async function(linkAlbum,album,linkArtista='',artista,listeners='',playcount='',duration='',published='',summary='',tags='',tracks=''){
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

  /* Parseo de la Duración */
  let segundos = duration;
  let minutos = Math.floor(segundos/60);
  let horas = Math.floor(minutos/60);
  minutos = minutos - horas*60;
  segundos = segundos - minutos*60 - horas*3600;
  if(horas>0) horas = horas+":";
  else horas = "";
  if(minutos<10) minutos = '0'+minutos;
  if(segundos<10) segundos = '0'+segundos;

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
        <div><b>Artista</b>: <a href="${linkArtista}" target="_blank">${artista}</a></div>
        <div><b>Fecha de Lanzamiento</b>: ${published}</div>
        <div><b>Oyentes</b>: ${listeners}</div>
        <div><b>Reproducciones</b>: ${playcount}</div>
        <div><b>Duración</b>: ${horas}${minutos}:${segundos}</div>
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
        <button class="btn btn-primary w-100 rounded-0 mb-1 btnModalAlbum" id="btn_${id}" data-bs-toggle="modal" href="#${id}" role="button">Imagen Wikipedia</button>
        <p class="d-none">${album}</p>
        <p class="d-none">${artista}</p>
        <button class="btn btn-primary w-100 rounded-0 rounded-bottom btnTraduc">Traducir Descripción</button>
      </div>
    </div>
  </div>

  <div class="modal fade" id="${id}" aria-hidden="true" aria-labelledby="${id}Label" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${id}Label">${artista} - ${album}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="col-12">
              <!-- Imagen -->
              <div class="m-4 text-center" id="imgWiki${id}">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  resultList.innerHTML += txt;
}