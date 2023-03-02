/* FUNCIÓN IMPRIMIR TOP DE ARTISTAS */
var chartTopArtists = async function(general, orden, direc){
  try{
    //Sólo si no hay resultados se almacenan 100 resultados
    if(numResults==0){
      /* Definición del ResultList */
      resultList.innerHTML = `<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"></div>`;
      resultList = resultList.firstElementChild;
      /* Obtención del JSON */
      console.log("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=100")
      response = await fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json&limit=100");
      response = await response.json();
      response = response.artists.artist;
      for (let i=0; i<response.length; i++) {
        try{
          /* Verificar undefined */
          if(typeof(response[i])==='undefined'){
            console.log("ALBUM ELIMINADO");
            response.splice(i,1);
            i--;
            continue;
          }
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
      }
    }
    /* Inserción de Etiquetas */
    if(numResults < maxResults){
      //Se añaden las etiquetas restantes sumando numResults hasta maxResults
      for(let i = numResults; i < maxResults; i++){
        try {
          await printArtist(response[i].url,response[i].name);
        } catch (error) {
          console.error("Error en función PRINT");
        }
      }
      /* Crear eventos de los botones */
      crearEventosModal("Artist");
      //Se actualiza numResults y se aumenta maxResults a +12 o a 100
      numResults = maxResults;
      maxResults = (maxResults+12 > totalResults) ? totalResults : numResults+12;
    }
  } catch (error) {
    console.error("Error en CHARTTOPARTIST");
    resultList.innerHTML = `<div class="row"><div class="col-12 text-center"><img style="max-width: 80px" src="died.png" alt="died"></div></div>`;
  }
}