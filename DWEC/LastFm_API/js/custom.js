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
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printArtist(response[i].url,response[i].name);
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 100) ? 100 : maxResults+12;
  }
}

/* FUNCIÓN IMPRIMIR ARTISTAS DE UN GÉNERO */
var tagTopArtists = async function(genero, orden, direc){
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del Spinner */
    resultList.innerHTML = `<div class="d-flex justify-content-center" id="spinnerPrincipal"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
    /* Obtención del JSON Inicial*/
    response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${genero}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=30`);
    response = await response.json();
    response = response.topartists.artist;
    console.log(response)
    /* Obtención del JSON Completo */
    for(let i in response){
      response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
      response[i] = await response[i].json();
      response[i] = response[i].artist;
    }
    console.log(response)
    /* Aplicación de criterios de ordenación (si los hay) */
    if(orden.length>0){
      if(direc.length>0) var ret = (direc=='Descendente') ? 1 : -1;
      response.sort((a, b) => {
        if(parseInt(a.stats[orden]) > parseInt(b.stats[orden])) return -ret;
        if(parseInt(a.stats[orden]) < parseInt(b.stats[orden])) return ret;
        return 0;
      });
      console.log(response)
    }
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
  }
  /* Inserción de Etiquetas */
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printArtist(response[i].url,response[i].name,response[i].stats.listeners,response[i].stats.playcount,response[i].tags.tag,response[i].bio.summary);
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 30) ? 30 : maxResults+12;
  }
}

/* FUNCIÓN IMPRIMIR TOP DE GÉNEROS */
var chartTopTags = async function(general, orden, direc){
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
    /* Obtención del JSON */
    response = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=100");
    response = await response.json();
    response = response.tags.tag;
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
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printTag(response[i].url,response[i].name,response[i].reach,response[i].taggings);
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 100) ? 100 : maxResults+12;
  }
}

/* FUNCIÓN IMPRIMIR GÉNEROS DE UN ÁLBUMS */
var albumTags = async function(album, orden, direc){
  /* Corrección de Taggings */
  if(orden=='taggings') orden='total';
  /* Separación entre artista y álbum */
  let artist = album.split(' - ')[0];
  album = album.split(' - ')[1];
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del Spinner */
    resultList.innerHTML = `<div class="d-flex justify-content-center" id="spinnerPrincipal"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
    /* Obtención del JSON Inicial*/
    response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.gettoptags&artist=${artist}&album=${album}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=30`);
    response = await response.json();
    response = response.toptags.tag;
    console.log(response)
    /* Obtención del JSON Completo */
    for(let i in response){
      let url = response[i].url;
      response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
      response[i] = await response[i].json();
      response[i] = response[i].tag;
      response[i].url = url;
    }
    console.log(response)
    /* Aplicación de criterios de ordenación (si los hay) */
    if(orden.length>0){
      if(direc.length>0) var ret = (direc=='Descendente') ? 1 : -1;
      response.sort((a, b) => {
        if(parseInt(a[orden]) > parseInt(b[orden])) return -ret;
        if(parseInt(a[orden]) < parseInt(b[orden])) return ret;
        return 0;
      });
      console.log(response)
    }
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
  }
  /* Inserción de Etiquetas */
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printTag(response[i].url,response[i].name,response[i].reach+'',response[i].total+'',response[i].wiki.summary);
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 30) ? 30 : maxResults+12;
  }
}

/* FUNCIÓN IMPRIMIR GÉNEROS DE UN ARTISTA */
var artistTags = async function(artist, orden, direc){
  /* Corrección de Taggings */
  if(orden=='taggings') orden='total';
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del Spinner */
    resultList.innerHTML = `<div class="d-flex justify-content-center" id="spinnerPrincipal"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
    /* Obtención del JSON Inicial*/
    response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=30`);
    response = await response.json();
    response = response.toptags.tag;
    console.log(response)
    /* Obtención del JSON Completo */
    for(let i in response){
      let url = response[i].url;
      response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
      response[i] = await response[i].json();
      response[i] = response[i].tag;
      response[i].url = url;
    }
    console.log(response)
    /* Aplicación de criterios de ordenación (si los hay) */
    if(orden.length>0){
      if(direc.length>0) var ret = (direc=='Descendente') ? 1 : -1;
      response.sort((a, b) => {
        if(parseInt(a[orden]) > parseInt(b[orden])) return -ret;
        if(parseInt(a[orden]) < parseInt(b[orden])) return ret;
        return 0;
      });
      console.log(response)
    }
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
  }
  /* Inserción de Etiquetas */
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printTag(response[i].url,response[i].name,response[i].reach+'',response[i].total+'',response[i].wiki.summary);
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 30) ? 30 : maxResults+12;
  }
}

/* FUNCIÓN IMPRIMIR GÉNEROS DE UNA CANCIÓN */
var trackTags = async function(cancion, orden, direc){
  /* Corrección de Taggings */
  if(orden=='taggings') orden='total';
  /* Separación entre artista y álbum */
  let artist = cancion.split(' - ')[0];
  cancion = cancion.split(' - ')[1];
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del Spinner */
    resultList.innerHTML = `<div class="d-flex justify-content-center" id="spinnerPrincipal"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
    /* Obtención del JSON Inicial*/
    response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artist}&track=${cancion}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=30`);
    response = await response.json();
    response = response.toptags.tag;
    console.log(response)
    /* Obtención del JSON Completo */
    for(let i in response){
      let url = response[i].url;
      response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
      response[i] = await response[i].json();
      response[i] = response[i].tag;
      response[i].url = url;
    }
    console.log(response)
    /* Aplicación de criterios de ordenación (si los hay) */
    if(orden.length>0){
      if(direc.length>0) var ret = (direc=='Descendente') ? 1 : -1;
      response.sort((a, b) => {
        if(parseInt(a[orden]) > parseInt(b[orden])) return -ret;
        if(parseInt(a[orden]) < parseInt(b[orden])) return ret;
        return 0;
      });
      console.log(response)
    }
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
  }
  /* Inserción de Etiquetas */
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printTag(response[i].url,response[i].name,response[i].reach+'',response[i].total+'',response[i].wiki.summary);
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 30) ? 30 : maxResults+12;
  }
}

/* FUNCIÓN IMPRIMIR TOP DE CANCIONES */
var chartTopTracks = async function(general, orden, direc){
  console.log(numResults)
  //Sólo si no hay resultados se almacenan 100 resultados
  if(numResults==0){
    /* Definición del Spinner */
    resultList.innerHTML = `<div class="d-flex justify-content-center" id="spinnerPrincipal"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
    /* Obtención del JSON */
    response = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=100");
    response = await response.json();
    response = response.tracks.track;
    console.log(response)
    /* Obtención del JSON Completo */
    for(let i in response){
      response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getinfo&track=${response[i].name}&artist=${response[i].artist.name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1`);
      response[i] = await response[i].json();
      response[i] = response[i].track;
    }
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
    /* Definición del ResultList */
    resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
    resultList = resultList.firstElementChild;
  }
  /* Inserción de Etiquetas */
  if(numResults < maxResults){
    //Se añaden las etiquetas restantes sumando numResults hasta maxResults
    for(let i = numResults; i < maxResults; i++){
      await printTrack(response[i].url,response[i].name,response[i].listeners,response[i].playcount,response[i].artist.url,response[i].artist.name,response[i].duration,/* response[i].album.url */'',/* response[i].album.title */'',response[i].toptags.tag,/* response[i].wiki.summary */'');
    }
    //Se actualiza numResults y se aumenta maxResults a +12 o a 100
    numResults = maxResults;
    maxResults = (maxResults+12 > 100) ? 100 : maxResults+12;
  }
  console.log(numResults)
}

/* FUNCIÓN IMPRIMIR CANCIONES DE UN ÁLBUM */
// albumInfo -> Mostrar solo Tracks
var albumTracks = async function(album, orden, direc){}

/* FUNCIÓN IMPRIMIR CANCIONES DE UN ARTISTA */
var artistTopTracks = async function(artist, orden, direc){}

/* FUNCIÓN IMPRIMIR CANCIONES DE UN GÉNERO */
var tagTopTracks = async function(genero, orden, direc){}