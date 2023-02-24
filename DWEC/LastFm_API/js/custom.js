/* //ELIMINAR DUPLICADOS:
let result = data.filter((item,index)=>{
  return data.indexOf(item) === index;
}) */

/* VARIABLES BÁSICAS */

//Elemento contenedor de los resultados
var resultList = document.getElementById("resultList");
//Número de resultados mostrados y número máximo a mostrar en cada tramo del scroll
var numResults = 0, maxResults = 12;
//Response del fetch correspondiente
var response;


/* FUNCIÓN IMPRIMIR TOP DE ÁLBUMES */
// chartTopTracks -> Mostrar solo Álbums eliminando los duplicados
var chartTopAlbums = async function(general, orden, direc){}

/* FUNCIÓN IMPRIMIR ÁLBUMES DE UN ARTISTA*/
var artistTopAlbums = async function(artista, orden, direc){}

/* FUNCIÓN IMPRIMIR ÁLBUMES DE UN GÉNERO*/
var tagTopAlbums = async function(genero, orden, direc){}

/* FUNCIÓN IMPRIMIR TOP DE ARTISTAS */
var chartTopArtists = async function(general, orden, direc){
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
    /* Obtención del JSON */
    response = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=100");
    response = await response.json();
    response = response.artists.artist;
    console.log(response)
    /* Aplicación de criterios de ordenación (si los hay) */
    if(orden.length>0){
      if(direc.length>0) var ret = (direc=='Descendente') ? 1 : -1;
      response.sort((a, b) => {
        if(parseInt(a[orden]) > parseInt(b[orden])) return -ret;
        if(parseInt(a[orden]) < parseInt(b[orden])) return ret;
        return 0;
      });
    }
  }
  /* Inserción de Etiquetas */
  /* for(let art of response){
    await printArtist(art.url,art.name,art.listeners,art.playcount);
  } */
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printArtist(response[i].url,response[i].name,response[i].listeners,response[i].playcount);
    }
    //Se actualiza numResults y se aumenta maxResults a +9 o a 100
    numResults = maxResults;
    maxResults = (maxResults+9 > 100) ? 100 : maxResults+9;
  }
}

/* FUNCIÓN IMPRIMIR ARTISTAS DE UN GÉNERO */
var tagTopArtists = async function(genero, orden, direc){}

/* FUNCIÓN IMPRIMIR TOP DE GÉNEROS */
var chartTopTags = async function(general, orden, direc){}

/* FUNCIÓN IMPRIMIR GÉNEROS DE UN ÁLBUMS */
var albumTags = async function(album, orden, direc){}

/* FUNCIÓN IMPRIMIR GÉNEROS DE UN ARTISTA */
var artistTags = async function(artista, orden, direc){}

/* FUNCIÓN IMPRIMIR GÉNEROS DE UNA CANCIÓN */
var trackTags = async function(cancion, orden, direc){}

/* FUNCIÓN IMPRIMIR TOP DE CANCIONES */
var chartTopTracks = async function(general, orden, direc){}

/* FUNCIÓN IMPRIMIR CANCIONES DE UN ÁLBUM */
// albumInfo -> Mostrar solo Tracks
var albumTracks = async function(album, orden, direc){}

/* FUNCIÓN IMPRIMIR CANCIONES DE UN ARTISTA */
var artistTopTracks = async function(artista, orden, direc){}

/* FUNCIÓN IMPRIMIR CANCIONES DE UN GÉNERO */
var tagTopTracks = async function(genero, orden, direc){}