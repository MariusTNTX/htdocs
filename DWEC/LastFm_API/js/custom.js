/* //ELIMINAR DUPLICADOS:
let result = data.filter((item,index)=>{
  return data.indexOf(item) === index;
}) */

/* ELEMENTOS DEL DOM */
var elementos = document.getElementById("elementosBusqueda");

var filtrarpor = document.getElementById("filtrarpor");
var filtroAlbum = document.getElementById("filtroAlbum");
var filtroArtista = document.getElementById("filtroArtista");
var filtroGenero = document.getElementById("filtroGenero");
var filtroCancion = document.getElementById("filtroCancion");

var ordenarpor = document.getElementById("ordenarpor");
var fechaLanz = document.getElementById("fechaLanz");
var oyentes = document.getElementById("oyentes");
var reprod = document.getElementById("reprod");
var reach = document.getElementById("reach");
var taggings = document.getElementById("taggings");
var duracion = document.getElementById("duracion");
var ascdesc = document.getElementById("ascdesc");

var botonBuscar = document.getElementById("botonBuscar");

var relacElementos = {
  albumes: {
    filtrosTrue: [filtroArtista,filtroGenero],
    filtrosFalse: [filtroAlbum,filtroCancion],
    ordenTrue: [fechaLanz,oyentes,reprod,duracion],
    ordenFalse: [reach,taggings]
  },
  artistas: {
    filtrosTrue: [filtroGenero],
    filtrosFalse: [filtroAlbum,filtroArtista,filtroCancion],
    ordenTrue: [oyentes,reprod],
    ordenFalse: [fechaLanz,reach,taggings,duracion]
  },
  generos: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroCancion],
    filtrosFalse: [filtroGenero],
    ordenTrue: [reach,taggings],
    ordenFalse: [fechaLanz,oyentes,reprod,duracion]
  },
  canciones: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroGenero],
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

  /* Inserción de Etiquetas */
  for(let art of response){
    resultList.innerHTML += await printArtist(art.url,art.name,art.listeners,art.playcount);
  }

  /* Creación de Eventos */
  for(let btn of document.querySelectorAll(".btnModalArtist")){
    btn.addEventListener("click",(e)=>{
      let id = e.target.id;
      id = id.substring(4).replaceAll("_"," ");
      
    });
  }
}