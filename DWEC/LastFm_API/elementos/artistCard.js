/* FUNCIÓN IMPRIMIR TARJETA ARTISTA */
var printArtist = async function(linkBand,band,oyentes,reprod){
  /* Obtención de géneros y descripción */
  var responseArt = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${band}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
  responseArt = await responseArt.json();
  responseArt = responseArt.artist;

  /* Inserción del Elemento */
  let id = `a${oyentes}_${reprod}`; /* band.replaceAll(" ","_"); */
  let txt = `
  <div class="col my-4">
    <div class="card h-100 text-center shadow">
      <div class="card-header text-center bg-dark border-bottom border-primary border-5">
        <h4 class="card-title"><a href="${linkBand}" target="_blank" class="text-white">${band}</a></h4>
      </div>
      <div class="card-body pb-0">
        <div><b>Oyentes</b>: ${oyentes}</div>
        <div><b>Reproducciones</b>: ${reprod}</div>
        <div class="mt-3"><b>Géneros Asociados</b>:</div>
        <div class="row justify-content-evenly my-3">`;
          for(var tag of responseArt.tags.tag) txt += `<div class="col-auto"><a href="${tag.url}" target="_blank">${tag.name}</a></div>`;
        txt += `
        </div>
        <div><b>Descripción</b>:</div>
        <div>
          <p>${responseArt.bio.summary}</p>
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
          <h1 class="modal-title fs-5" id="${id}Label">${band}</h1>
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