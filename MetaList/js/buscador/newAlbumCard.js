async function getAlbumCard(album){
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let tipoEsp = {Estudio: "Álbum de Estudio",EP:"EP",Recopilatorio:"Álbum Recopilatorio",BoxSet:"Box Set",En_Vivo:"DVD en Directo",Demo:"Demo",Single:"Single",Video:"Video",Split:"Split",Colaboración:"Álbum Colaborativo"};
  console.log("Álbum (previo a generos): ",album)
  let generos = await list("generos_albumes",true,["nombreAlbum",album.album],["nombreBanda",album.banda],["order","estrellasGeneroAlbum_Desc"]);
  console.log("Generos: ",generos)
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-albumes1","filter-albumes2");
  let txt = `
      <div class="card h-100 shadow-sm bg-light">
        <div class="div-card-img-top album">
          <img src="${(album.imagen)?album.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Portada del álbum '${album.album}'">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title"><a href="album.html?banda=${album.banda}&album=${album.album}">${album.album}</a></h5>
          <h6 class="card-title"><a href="banda.html?banda=${album.banda}">${album.banda}</a></h6>
          <hr>
          <h6 class="card-title">${(album.tipo)?tipoEsp[album.tipo.replaceAll(" ","_")]:"Tipo Desconocido"}</h6>
          <h6 class="card-title">${(album.dia)?album.dia+" de ":""}${(album.mes)?mesEsp[parseInt(album.mes)]+" de ":""}${(album.anio)?album.anio:"Fecha Desconocida"}</h6>
          <h6 class="card-title">${(album.duracion)?secToTime(album.duracion):"Duración Desconocida"}</h6>
          <hr>
          <div class="row justify-content-center">
            <div class="col-auto text-start">
              <p class="mb-0"><i class="bi bi-award-fill text-dark"></i> <b>Puntos</b>: ${addPoints(album.puntuacion)}</p>
              <p class="mb-0"><i class="bi bi-eye-fill text-primary"></i> <b>Visitas</b>: ${addPoints(album.visitas)}</p>
              <p class="mb-0"><i class="bi bi-heart-fill"></i> <b>Likes</b>: ${addPoints(album.likes)}</p>
              <p class="mb-0"><i class="bi bi-spotify text-success"></i> <b>Escuchas</b>: ${addPoints(album.escuchas)}</p>
            </div>
          </div>`;
  
  if(generos.response.length>0){
    txt += `<hr>
            <div class="row justify-content-center">
              <div class="col-auto text-start">`;
    for(let genero of generos.response){
      txt += `
                <p class="mb-0">
                  <i class="bi bi-star${(genero.estrellas>=1)?"-fill":""}">
                  </i><i class="bi bi-star${(genero.estrellas>=2)?"-fill":""}">
                  </i><i class="bi bi-star${(genero.estrellas>=3)?"-fill":""}">
                  </i><i class="bi bi-star${(genero.estrellas>=4)?"-fill":""}">
                  </i><i class="bi bi-star${(genero.estrellas==5)?"-fill":""}"></i>
                  ${genero.genero}
                </p>
      `;
    }
    txt += `</div></div>`;
  }
  txt += `<div class="accordion accordion-flush mt-3" id="accordion${album.puntuacion+album.escuchas}">
            <div class="accordion-item shadow-sm">
              <h2 class="accordion-header" id="flush-heading${album.puntuacion+album.escuchas}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${album.puntuacion+album.escuchas}" aria-expanded="false" aria-controls="flush-collapse${album.puntuacion+album.escuchas}">
                  Más Estadísticas
                </button>
              </h2>
              <div id="flush-collapse${album.puntuacion+album.escuchas}" class="accordion-collapse collapse" aria-labelledby="flush-heading${album.puntuacion+album.escuchas}" data-bs-parent="#accordion${album.puntuacion+album.escuchas}">
                <div class="row justify-content-center accordion-body stats">
                  <div class="col-auto text-start">
                    <p class="mb-0"><b>Canciones</b>: ${addPoints(album.canciones)}</p>
                    <p class="mb-0"><b>Estudios</b>: ${addPoints(album.estudios)}</p>
                    <p class="mb-0"><b>Géneros</b>: ${addPoints(album.generos)}</p>
                    <p class="mb-0"><b>Músicos</b>: ${addPoints(album.musicos)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  
  txt += `</div></div>`;
  card.innerHTML = txt;
  console.log("Card: ",card)

  return card;
}