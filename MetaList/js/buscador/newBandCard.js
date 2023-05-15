async function getBandCard(band){
  console.log(band)
  let generos = await list("generos_bandas",true,["nombreBanda",band.banda],["order","estrellasGeneroBanda_Desc"]);
  let statusColor="text-secondary";
  switch(band.estatus){
    case 'En Activo': statusColor="text-success";
    break;
    case 'Disueltos': statusColor="text-red";
    break;
    case 'En Activo': statusColor="text-warning";
    break;
  }
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-bandas1","filter-bandas2");
  let txt = `
      <div class="card h-100 shadow-sm bg-light">
        <div class="div-card-img-top band">
          <img src="${(band.imagen)?band.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Imagen de la banda '${band.banda}'">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title"><a href="visor.html?element=band&band=${band.banda}">${band.banda}</a></h5>
          <hr>
          <h6 class="card-title">${(band.origen)?band.origen+", ":""}${(band.pais)?band.pais:"Origen Desconocido"}</h6>
          <h6 class="card-title"><i class="bi bi-circle-fill ${statusColor}"></i> ${(band.estatus)?band.estatus:"Estatus Desconocido"}</h6>
          <hr>
          <div class="row justify-content-center">
            <div class="col-auto text-start">
              <p class="mb-0"><i class="bi bi-award-fill text-dark"></i> <b>Puntos</b>: ${addPoints(band.puntuacion)}</p>
              <p class="mb-0"><i class="bi bi-eye-fill text-primary"></i> <b>Visitas</b>: ${addPoints(band.visitas)}</p>
              <p class="mb-0"><i class="bi bi-heart-fill"></i> <b>Likes</b>: ${addPoints(band.likes)}</p>
              <p class="mb-0"><i class="bi bi-spotify text-success"></i> <b>Escuchas</b>: ${addPoints(band.escuchas)}</p>
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
  txt += `<div class="accordion accordion-flush mt-3" id="accordion${band.puntuacion+band.escuchas}">
            <div class="accordion-item shadow-sm">
              <h2 class="accordion-header" id="flush-heading${band.puntuacion+band.escuchas}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${band.puntuacion+band.escuchas}" aria-expanded="false" aria-controls="flush-collapse${band.puntuacion+band.escuchas}">
                  Más Estadísticas
                </button>
              </h2>
              <div id="flush-collapse${band.puntuacion+band.escuchas}" class="accordion-collapse collapse" aria-labelledby="flush-heading${band.puntuacion+band.escuchas}" data-bs-parent="#accordion${band.puntuacion+band.escuchas}">
                <div class="row justify-content-center accordion-body stats">
                  <div class="col-auto text-start">
                    <p class="mb-0"><b>Álbumes</b>: ${addPoints(band.albumes)}</p>
                    <p class="mb-0"><b>Canciones</b>: ${addPoints(band.canciones)}</p>
                    <p class="mb-0"><b>Discográficas</b>: ${addPoints(band.discograficas)}</p>
                    <p class="mb-0"><b>Estudios</b>: ${addPoints(band.estudios)}</p>
                    <p class="mb-0"><b>Géneros</b>: ${addPoints(band.generos)}</p>
                    <p class="mb-0"><b>Músicos</b>: ${addPoints(band.musicos)}</p>
                    <p class="mb-0"><b>Temáticas</b>: ${addPoints(band.temas)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

  txt += `</div></div>`;

  card.innerHTML = txt;
  
  return card;
}