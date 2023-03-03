/* FUNCIÓN IMPRIMIR TARJETA ARTISTA */
var printTrack = async function(linkTrack,track,listeners='',playcount='',linkArtist='', artist='', duration='', linkAlbum='', album='', tags='', summary=''){
  /* Obtención de géneros y descripción (si no han sido facilitados) */
  if(listeners==''){
    var responseTrack = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getinfo&track=${track}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
    responseTrack = await responseTrack.json();
    responseTrack = responseTrack.track;
    listeners = responseTrack.listeners;
    playcount = responseTrack.playcount;
    console.log(responseTrack)
  }

  /* Generación del ID */
  let id = `t${listeners}_${playcount}`;

  /* Parseo de la duración */
  let segundos = Math.floor(duration/1000);
  let minutos = Math.floor(segundos/60);
  segundos = segundos - minutos*60;
  if(segundos<10) segundos = '0'+segundos;

  /* Inclusión de puntos a las cifras numéricas */
  let cifra = [listeners,playcount];
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
        <h4 class="card-title"><a href="${linkTrack}" target="_blank" class="text-white">${track}</a></h4>
      </div>
      <div class="card-body pb-3">
        <div><b>Artista</b>: <a href="${linkArtist}" target="_blank">${artist}</a></div>
        <div><b>Álbum</b>: <a href="${linkAlbum}" target="_blank">${album}</a></div>
        <div><b>Oyentes</b>: ${listeners}</div>
        <div><b>Reproducciones</b>: ${playcount}</div>
        <div><b>Duración</b>: ${minutos+':'+segundos}</div>
        <div class="mt-3"><b>Géneros Asociados</b>:</div>
        <div class="row justify-content-evenly my-3">`;
          for(var tag of tags) txt += `<div class="col-auto"><a href="${tag.url}" target="_blank">${tag.name}</a></div>`;
        txt += `
        </div>
        <div><b>Descripción</b>:</div>
        <div><p>${summary}</p></div>
      </div>
      <div class="card-footer text-center bg-white m-0 p-0">
        <button class="btn btn-primary w-100 rounded-0 mb-1 btnModalTrack" id="btn_${id}" data-bs-toggle="modal" href="#${id}" role="button">Imagen Wikipedia</button>
        <p class="d-none">${album}</p>
        <p class="d-none">${artist}</p>
        <button class="btn btn-primary w-100 rounded-0 rounded-bottom btnTraduc">Traducir Descripción</button>
      </div>
    </div>
  </div>

  <div class="modal fade" id="${id}" aria-hidden="true" aria-labelledby="${id}Label" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${id}Label">${artist} - ${album} - ${track}</h1>
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