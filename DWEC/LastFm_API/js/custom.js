/* //ELIMINAR DUPLICADOS:
let result = data.filter((item,index)=>{
  return data.indexOf(item) === index;
}) */

/* ELEMENTOS DEL DOM */
var elementos = document.getElementById("elementosBusqueda");

var filtroAlbum = document.getElementById("filtroAlbum").parentElement;
var filtroArtista = document.getElementById("filtroArtista").parentElement;
var filtroGenero = document.getElementById("filtroGenero").parentElement;
var filtroCancion = document.getElementById("filtroCancion").parentElement;
var filtroAnio = document.getElementById("filtroAnio").parentElement;

var fechaLanz = document.getElementById("fechaLanz");
var oyentes = document.getElementById("oyentes");
var reprod = document.getElementById("reprod");
var reach = document.getElementById("reach");
var taggings = document.getElementById("taggings");
var duracion = document.getElementById("duracion");

var botonBuscar = document.getElementById("botonBuscar");

var relacElementos = {
  albumes: {
    filtrosTrue: [filtroArtista,filtroGenero,filtroAnio],
    filtrosFalse: [filtroAlbum,filtroCancion],
    ordenTrue: [fechaLanz,oyentes,reprod,duracion],
    ordenFalse: [reach,taggings]
  },
  artistas: {
    filtrosTrue: [filtroGenero],
    filtrosFalse: [filtroAlbum,filtroArtista,filtroCancion,filtroAnio],
    ordenTrue: [oyentes,reprod],
    ordenFalse: [fechaLanz,reach,taggings,duracion]
  },
  generos: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroCancion],
    filtrosFalse: [filtroGenero,filtroAnio],
    ordenTrue: [reach,taggings],
    ordenFalse: [fechaLanz,oyentes,reprod,duracion]
  },
  canciones: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroGenero,filtroAnio],
    filtrosFalse: [filtroCancion],
    ordenTrue: [oyentes,reprod,duracion],
    ordenFalse: [fechaLanz,reach,taggings]
  }
}

/* FUNCIÓN IMPRIMIR ARTISTAS */
var printArtists = async function(){
  /* ResultList */
  var resultList = document.getElementById("resultList");
  resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
  resultList = resultList.firstElementChild;
  
  /* Obtención del JSON TopArtist */
  var response = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=9");
  response = await response.json();
  response = response.artists.artist;

  /* Nueva Forma */
  for(let art of response){
    resultList.innerHTML += await printArtist(art.url,art.name,art.listeners,art.playcount);
  }
}

/* FUNCIÓN IMPRIMIR TARJETA ARTISTA */
var printArtist = async function(linkBand,band,oyentes,reprod){
  /* Obtención de géneros y descripción */
  var response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${band}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
  response = await response.json();
  response = response.artist;
  //let url = await getImageURL(band);

  /* Devolución del Elemento */
  let id = band.replaceAll(" ","_");
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
          for(var tag of response.tags.tag) txt += `<div class="col-auto"><a href="${tag.url}" target="_blank">${tag.name}</a></div>`;
        txt += `
        </div>
        <div><b>Descripción</b>:</div>
        <div>
          <p>${response.bio.summary}</p>
        </div>
      </div>
      <div class="card-footer text-center bg-white m-0 p-0">
        <button class="btn btn-primary w-100 rounded-0 rounded-bottom btnModalartist" data-bs-toggle="modal" href="#${id}" role="button">Más Información</button>
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
          <div>Spinner de Imágen</div>
          <div>El resto de la info</div>
        </div>
      </div>
    </div>
  </div>`;
  return txt;
}

/* FUNCIÓN RECUPERAR IMAGEN ARTISTA */
var getImageURL = async function(title){
  //Obtencion de PageId
  var response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${title}`);
  response = await response.json();
  let pageid = response.query.search[0].pageid;
  //Obtención de SRC
  var response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&utf8&prop=revisions&rvprop=content&rvparse&pageids=${pageid}`);
  response = await response.json();
  response = response.query.pages[pageid].revisions[0]['*'];
  //Obtener primera posición de //upload
  let p1 = response.indexOf("//upload.wikimedia.org/wikipedia/commons/thumb/");
  //Obtener primera posición de " desde la posición anterior
  let p2 = response.indexOf("\"",p1);
  //Recortar y obtener la porción de string con esas posiciones
  let url = response.substring(p1,p2);
  //Eliminar último fragmento
  url = url.substring(0,url.lastIndexOf("/"));
  //Eliminar thumb/ y Añadir https:
  return 'https:'+url.replace("thumb/","");
}