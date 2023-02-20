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
    filtrosTrue: [filtroGenero,filtroAnio],
    filtrosFalse: [filtroAlbum,filtroArtista,filtroCancion],
    ordenTrue: [oyentes,reprod],
    ordenFalse: [fechaLanz,reach,taggings,duracion]
  },
  generos: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroCancion,filtroAnio],
    filtrosFalse: [filtroGenero],
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
  /* Obtención del JSON TopArtist */
  var response = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=9");
  response = await response.json();
  response = response.artists.artist;

  /* Impresión de Resultados */
  var resultList = document.getElementById("resultList");
  var txt = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
  for(var art of response) txt += await printArtist(art.image[2]["#text"],art.url,art.name,art.listeners,art.playcount);
  txt += `</div>`;
  resultList.innerHTML += txt;
}

/* FUNCIÓN IMPRIMIR TARJETA ARTISTA */
var printArtist = async function(img,linkBand,band,oyentes,reprod){
  /* Obtención de géneros y descripción */
  var response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${band}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
  response = await response.json();
  response = response.artist;

  /* Devolución del Elemento */
  var txt = `
  <div class="col">
    <div class="card h-100 text-center">
      <img src="${img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title mb-3"><a href="${linkBand}">${band}</a></h4>
        <div><b>Oyentes</b>: ${oyentes}</div>
        <div><b>Reproducciones</b>: ${reprod}</div>
        <div class="mt-3"><b>Géneros Asociados</b>:</div>
        <div class="row justify-content-evenly my-3">`;
          for(var tag of response.tags.tag) txt += `<div class="col-auto"><a href="${tag.url}">${tag.name}</a></div>`;
        txt += `
        </div>
        <div><b>Descripción</b>:</div>
        <div>
          <p>${response.bio.summary}</p>
        </div>
      </div>
    </div>
  </div>`;
  return txt;
}