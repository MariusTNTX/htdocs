async function getMusicianCard(musician){
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  console.log(musician)
  let bandas = await list("musicos_bandas",true,["nombreMusicoEtapa",musician.musico],["order","anioInicioEtapaMusico_Asc"]);
  let roles = await list("roles_musicos_albumes",true,["nombreMusico",musician.musico]);
  let cross = "";
  if(musician.anioDefuncion) cross = `
    <span class="position-absolute top-0 start-100 translate-middle ms-2 mt-1"><img style="height:20px" src="./imagenes/basico/deathCross.png" alt="Símbolo de la cruz"></span>
  `;
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-musicos1","filter-musicos2");
  let txt = `
      <div class="card h-100 shadow-sm bg-light">
        <div class="div-card-img-top musician">
          <img src="${(musician.imagen)?musician.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Imagen del músico '${musician.musico}'">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title"><span class="${(musician.anioDefuncion)?"position-relative":""}"><a href="visor.html?element=musician&musician=${musician.musico}">${musician.musico}</a>${cross}<span></h5>
          <hr>
          <h6 class="card-title">${(musician.sexo)?musician.sexo:"Género No Especificado"}</h6>
          <h6 class="card-title">${(musician.origen)?musician.origen+", ":""}${(musician.pais)?musician.pais:"Origen Desconocido"}</h6>
          <hr>
          <h6 class="card-title">${(musician.diaNacimiento)?musician.diaNacimiento+" de ":""}${(musician.mesNacimiento)?mesEsp[parseInt(musician.mesNacimiento)-1]+" de ":""}${(musician.anioNacimiento)?musician.anioNacimiento:"Fecha Desconocida"}</h6>
          <h6 class="card-title">${(musician.diaDefuncion)?musician.diaDefuncion+" de ":""}${(musician.mesDefuncion)?mesEsp[parseInt(musician.mesDefuncion)-1]+" de ":""}${(musician.anioDefuncion)?musician.anioDefuncion:calcularEdad(`${musician.anioNacimiento}-${musician.mesNacimiento}-${musician.diaNacimiento}`)}</h6>
          <hr>
          <div class="row justify-content-center">
            <div class="col-auto text-start">
              <p class="mb-0"><i class="bi bi-award-fill text-dark"></i> <b>Puntos</b>: ${addPoints(musician.puntuacion)}</p>
              <p class="mb-0"><i class="bi bi-eye-fill text-primary"></i> <b>Visitas</b>: ${addPoints(musician.visitas)}</p>
            </div>
          </div>`;

  if(bandas.response.length>0){
    txt+=`<hr>
          <div class="row justify-content-center">
            <div class="col-auto text-start">`;
    for(let etapa of bandas.response){
      txt += `<p class="mb-0">${(etapa.anioInicio)?etapa.anioInicio:"????"}-${(etapa.anioFin)?etapa.anioFin:"Actualidad"}: ${etapa.banda}</p>`;
    }
    txt += `</div>
          </div>`;
  }
  txt += `<div class="accordion accordion-flush mt-3" id="accordion${musician.puntuacion+musician.escuchas}">
            <div class="accordion-item shadow-sm">
              <h2 class="accordion-header" id="flush-headingRoles${musician.puntuacion+musician.escuchas}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseRoles${musician.puntuacion+musician.escuchas}" aria-expanded="false" aria-controls="flush-collapseRoles${musician.puntuacion+musician.escuchas}">
                  Roles
                </button>
              </h2>
              <div id="flush-collapseRoles${musician.puntuacion+musician.escuchas}" class="accordion-collapse collapse" aria-labelledby="flush-headingRoles${musician.puntuacion+musician.escuchas}" data-bs-parent="#accordion${musician.puntuacion+musician.escuchas}">
                <div class="row justify-content-center accordion-body stats">
                  <div class="col-auto text-start">`;
            if(roles.response.length>0){
              roles = roles.response.filter((alb,index,roles)=>index === roles.findIndex(i => i.rol === alb.rol));
              console.log(roles)
              for(let alb of roles){
                txt += `<p class="mb-0">${alb.rol}</p>`;
              }
            }
            txt+=`</div>
                </div>
              </div>
            </div>
            <div class="accordion-item shadow-sm">
              <h2 class="accordion-header" id="flush-heading${musician.puntuacion+musician.escuchas}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${musician.puntuacion+musician.escuchas}" aria-expanded="false" aria-controls="flush-collapse${musician.puntuacion+musician.escuchas}">
                  Más Estadísticas
                </button>
              </h2>
              <div id="flush-collapse${musician.puntuacion+musician.escuchas}" class="accordion-collapse collapse" aria-labelledby="flush-heading${musician.puntuacion+musician.escuchas}" data-bs-parent="#accordion${musician.puntuacion+musician.escuchas}">
                <div class="row justify-content-center accordion-body stats">
                  <div class="col-auto text-start">
                    <p class="mb-0"><b>Álbumes</b>: ${addPoints(musician.albumes)}</p>
                    <p class="mb-0"><b>Discográficas</b>: ${addPoints(musician.bandas)}</p>
                    <p class="mb-0"><b>Canciones</b>: ${addPoints(musician.canciones)}</p>
                    <p class="mb-0"><b>Músicos</b>: ${addPoints(musician.discograficas)}</p>
                    <p class="mb-0"><b>Estudios</b>: ${addPoints(musician.estudios)}</p>
                    <p class="mb-0"><b>Géneros</b>: ${addPoints(musician.generos)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  txt += `</div></div>`;

  card.innerHTML = txt;
  
  return card;
}