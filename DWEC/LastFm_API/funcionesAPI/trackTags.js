/* FUNCIÓN IMPRIMIR GÉNEROS DE UNA CANCIÓN */
var trackTags = async function(cancion, orden, direc){
  try{
    /* Deshabilitar el botón */
    botonBuscar.setAttribute("disabled","true");
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
      console.log(`http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artist}&track=${cancion}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=50`)
      response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artist}&track=${cancion}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&autocorrect=1&limit=50`);
      response = await response.json();
      response = response.toptags.tag;
      console.log(response)
      /* Obtención del JSON Completo */
      for(let i=0; i<response.length; i++){
        try{
          /* Verificar undefined */
          if(typeof(response[i])==='undefined'){
            console.log("ALBUM ELIMINADO");
            response.splice(i,1);
            i--;
            continue;
          }
          let url = response[i].url;
          /* Obtener info del género */
          console.log(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=1`)
          response[i] = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${response[i].name}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=1`);
          response[i] = await response[i].json();
          response[i] = response[i].tag;
          /* Verificar undefined */
          if(typeof(response[i])==='undefined'){
            console.log("ALBUM ELIMINADO");
            response.splice(i,1);
            i--;
            continue;
          }
          response[i].url = url;
          /* Sustituir undefined por valores por defecto */
          if(response[i].wiki==undefined) response[i].wiki = {published: 0, summary: ""};
          if(response[i].wiki.summary==undefined) response[i].wiki.summary="";
        } catch (error) {
          console.error('Error en FETCH secundario');
        }
      }
      console.log(response)
      /* Si hay menos de 12 resultados se corrige maxResults*/
      totalResults = response.length;
      if(totalResults<maxResults) maxResults = totalResults;
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
        try {
          await printTag(response[i].url,response[i].name,response[i].reach+'',response[i].total+'',response[i].wiki.summary);
        } catch (error) {
          console.error("Error en función PRINT");
        }
      }
      /* Crear eventos de los botones */
      crearEventosModal("Artist");
      //Se actualiza numResults y se aumenta maxResults a +12 o a totalResults
      numResults = maxResults;
      maxResults = (maxResults+12 > totalResults) ? totalResults : maxResults+12;
    }
  } catch (error) {
    console.error("Error en TRACKTAGS");
    resultList.innerHTML = `<div class="row"><div class="col-12 text-center"><img style="max-width: 80px" src="died.png" alt="died"></div></div>`;
  } finally {
    /* Habilitar el botón */
    botonBuscar.removeAttribute("disabled");
  }
}