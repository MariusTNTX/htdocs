async function getLabelCard(label){
  console.log(label);
  let statusColor="text-secondary";
  switch(label.estatus){
    case 'En Activo': statusColor="text-success";
    break;
    case 'Inactivo': statusColor="text-red";
    break;
  }
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-discogs1","filter-discogs2");
  let txt = `
    <div class="card h-100 shadow-sm bg-light">
      <div class="div-card-img-top label">
        <img src="${(label.imagen)?label.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Logotipo de la discográfica '${label.discografica}'">
      </div>
      <div class="card-body text-center">
        <h5 class="card-title"><a href="visor.html?element=label&label=${encodeURIComponent(label.discografica)}">${label.discografica}</a></h5>
        <hr>
        <h6 class="card-title">${(label.direccion)?label.direccion+", ":""}${(label.pais)?label.pais:"Origen Desconocido"}</h6>
        <h6 class="card-title"><i class="bi bi-circle-fill ${statusColor}"></i> ${(label.estatus)?label.estatus:"Estatus Desconocido"}</h6>
        <hr>
        <div class="row justify-content-center">
          <div class="col-auto text-start">
            <p class="mb-0"><i class="bi bi-award-fill text-dark"></i> <b>Puntos</b>: ${addPoints(label.puntuacion)}</p>
            <p class="mb-0"><i class="bi bi-eye-fill text-primary"></i> <b>Visitas</b>: ${addPoints(label.visitas)}</p>
          </div>
        </div>

        <div class="accordion accordion-flush mt-3" id="accordion${label.puntuacion+label.escuchas}">
            <div class="accordion-item shadow-sm">
              <h2 class="accordion-header" id="flush-heading${label.puntuacion+label.escuchas}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${label.puntuacion+label.escuchas}" aria-expanded="false" aria-controls="flush-collapse${label.puntuacion+label.escuchas}">
                  Más Estadísticas
                </button>
              </h2>
              <div id="flush-collapse${label.puntuacion+label.escuchas}" class="accordion-collapse collapse" aria-labelledby="flush-heading${label.puntuacion+label.escuchas}" data-bs-parent="#accordion${label.puntuacion+label.escuchas}">
                <div class="row justify-content-center accordion-body stats">
                  <div class="col-auto text-start">
                    <p class="mb-0"><b>Álbumes</b>: ${addPoints(label.albumes)}</p>
                    <p class="mb-0"><b>Discográficas</b>: ${addPoints(label.bandas)}</p>
                    <p class="mb-0"><b>Canciones</b>: ${addPoints(label.canciones)}</p>
                    <p class="mb-0"><b>Estudios</b>: ${addPoints(label.estudios)}</p>
                    <p class="mb-0"><b>Géneros</b>: ${addPoints(label.generos)}</p>
                    <p class="mb-0"><b>Músicos</b>: ${addPoints(label.musicos)}</p>
                    <p class="mb-0"><b>Temáticas</b>: ${addPoints(label.temas)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>`;
  card.innerHTML = txt;
  
  /* card.querySelector(".card-img-top").addEventListener("load",(e)=>{
    if(e.target.clientHeight>329){
      e.target.style="margin:0 auto;height:329px;width:fit-content";
    } else if(e.target.clientHeight<329 && e.target.clientHeight!=0) {
      let pad = parseInt((329 - e.target.clientHeight) / 2);
      e.target.style=`padding: ${pad}px 0`;
    }
  }); */
  
  return card;
}