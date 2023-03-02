/* FUNCIÓN IMPRIMIR ÁLBUMES DE UN GÉNERO*/
var tagTopAlbums = async function(genero, orden, direc){
  try{
    console.log(orden);
    //Sólo si no hay resultados se almacenan 100 resultados
    if(numResults==0){
      /* Definición del Spinner */
      resultList.innerHTML = `<div class="d-flex justify-content-center" id="spinnerPrincipal"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
      /* Obtención del JSON */
      console.log(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genero}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=50`)
      response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genero}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=50`);
      response = await response.json();
      response = response.albums.album;
      console.log(response)
      /* Obtención del JSON Completo */
      for(let i=0; i<response.length; i++){
        try{
          /* Verificar undefined */
          if((response[i])==='undefined' || response[i].name=='(null)'){
            console.log("ALBUM ELIMINADO");
            response.splice(i,1);
            i--;
            continue;
          }
          let artist = response[i].artist.name;
          let urlArtist = response[i].artist.url;
          /* Obtener info del álbum */
          console.log(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${artist}&album=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=1`)
          response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${artist}&album=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=1`);
          response[i] = await response[i].json();
          response[i] = response[i].album;
          /* Verificar undefined */
          if(typeof(response[i])==='undefined'){
            console.log("ALBUM ELIMINADO");
            response.splice(i,1);
            i--;
            continue;
          } 
          response[i].urlArtist = urlArtist;
          response[i].artist = artist;
          /* Sustituir undefined por valores por defecto */
          if(response[i].wiki==undefined) response[i].wiki = {published: 0, summary: ""};
          if(response[i].wiki.published==undefined) response[i].wiki.published=0;
          if(response[i].wiki.summary==undefined) response[i].wiki.summary="  ";
          if(typeof(response[i].tags)!='object') response[i].tags={tag: []};
          if(typeof(response[i].tags.tag)!='object') response[i].tags.tag=[];
          if(typeof(response[i].tracks)!='object') response[i].tracks={track: []};
          if(typeof(response[i].tracks.track)!='object') response[i].tracks.track=[];
          console.log(response[i]);
          /* Dar formato a la fecha o indicar que no existe */
          try {
            let fecha = response[i].wiki.published.trim().substring(0,response[i].wiki.published.indexOf(","));
            console.log(fecha);
            fecha = fecha.split(" ");
            fecha = fecha[1]+' '+fecha[0]+', '+fecha[2];
            console.log(fecha);
            response[i].wiki.published = new Date(fecha).getTime();
          } catch (error) {
            response[i].wiki = {published: 0};
          }
          /* Calcular la duración total del álbum */
          let duration = 0;
          if(response[i].tracks.track[0]!=undefined){
            for(let track of response[i].tracks.track){
              if(track.duration != null) duration += track.duration;
            }
          } else if(response[i].tracks.track.duration!=null){
            duration = response[i].tracks.track.duration;
          } else duration = 0;
          response[i].duration = duration;
        } catch (error) {
          console.error('Error en FETCH secundario');
        }
      }
      /* Si hay menos de 12 resultados se corrige maxResults*/
      totalResults = response.length;
      if(totalResults<maxResults) maxResults = totalResults;
      /* Aplicación de criterios de ordenación (si los hay) */
      if(orden.length>0){
        console.log("EFECTUANDO ORDEN")
        if(direc.length>0) var ret = (direc=='Descendente') ? 1 : -1;
        /* Ordenación para fechas */
        if(orden == 'releasedate'){
          response.sort((a, b) => {
            if(parseInt(a.wiki.published) > parseInt(b.wiki.published)) return -ret;
            if(parseInt(a.wiki.published) < parseInt(b.wiki.published)) return ret;
            return 0;
          });
        /* Ordenación para el resto */
        } else {
          response.sort((a, b) => {
            if(parseInt(a[orden]) > parseInt(b[orden])) return -ret;
            if(parseInt(a[orden]) < parseInt(b[orden])) return ret;
            return 0;
          });
        }
      }
      console.log(response)
      /* Definición del ResultList */
      resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
      resultList = resultList.firstElementChild;
    }
    /* Inserción de Etiquetas */
    if(numResults < maxResults){
      //Se añaden las etiquetas restantes sumando numResults hasta maxResults
      for(let i = numResults; i < maxResults; i++){
        try {
          await printAlbum(response[i].url,response[i].name,response[i].urlArtist,response[i].artist,response[i].listeners,response[i].playcount,response[i].duration,response[i].wiki.published,response[i].wiki.summary,response[i].tags.tag,response[i].tracks.track);
        } catch (error) {
          console.error("Error en función PRINT");
        }
      }
      /* Crear eventos de los botones */
      crearEventosModal("Album");
      //Se actualiza numResults y se aumenta maxResults a +12 o a totalResults
      numResults = maxResults;
      maxResults = (maxResults+12 > totalResults) ? totalResults : maxResults+12;
    }
  } catch (error) {
    console.error("Error en TAGTOPALBUMS");
    resultList.innerHTML = `<div class="row"><div class="col-12 text-center"><img style="max-width: 80px" src="died.png" alt="died"></div></div>`;
  }
}